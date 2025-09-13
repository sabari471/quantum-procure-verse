import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MaterialForecasting from "./pages/MaterialForecasting";
import VendorIdentification from "./pages/VendorIdentification";
import ProjectSchedule from "./pages/ProjectSchedule";
import ProcurementPlan from "./pages/ProcurementPlan";
import ProcurementWorkflow from "./pages/ProcurementWorkflow";

// Components
import Sidebar from "./components/Sidebar";
import FloatingChatbot from "./components/FloatingChatbot";

const queryClient = new QueryClient();

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'admin' | 'officer' | null;
  login: (role: 'admin' | 'officer') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'officer' | null>(null);

  const login = (role: 'admin' | 'officer') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 relative">
        <div className="bg-animated-grid min-h-screen">
          {children}
        </div>
        <FloatingChatbot />
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="dark min-h-screen">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/material-forecasting"
                  element={
                    <ProtectedRoute>
                      <MaterialForecasting />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor-identification"
                  element={
                    <ProtectedRoute>
                      <VendorIdentification />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-schedule"
                  element={
                    <ProtectedRoute>
                      <ProjectSchedule />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/procurement-plan"
                  element={
                    <ProtectedRoute>
                      <ProcurementPlan />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/procurement-workflow"
                  element={
                    <ProtectedRoute>
                      <ProcurementWorkflow />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
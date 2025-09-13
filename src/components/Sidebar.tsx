import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Calendar, 
  ClipboardList, 
  Workflow,
  LogOut,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/App";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Material Forecasting", href: "/material-forecasting", icon: Package },
  { name: "Vendor Identification", href: "/vendor-identification", icon: Users },
  { name: "Project Schedule", href: "/project-schedule", icon: Calendar },
  { name: "Procurement Plan", href: "/procurement-plan", icon: ClipboardList },
  { name: "Procurement Workflow", href: "/procurement-workflow", icon: Workflow },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout, userRole } = useAuth();

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-72 glass-card border-r border-border/20 flex flex-col"
    >
      {/* Logo & Header */}
      <div className="p-8 border-b border-border/20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">ProcureNext</h1>
            <p className="text-sm text-muted-foreground capitalize">{userRole} Portal</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <NavLink
                to={item.href}
                className={`block w-full transition-all duration-300 ${
                  isActive 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-primary shadow-glow"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : ""}`} />
                  <span className={isActive ? "text-primary-foreground" : ""}>{item.name}</span>
                </motion.div>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-border/20">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full hover:bg-destructive hover:text-destructive-foreground border-border/40"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'officer'>('admin');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-grid p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* 3D Card Container */}
        <motion.div
          className="card-3d perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ rotateY: 2, rotateX: -2 }}
        >
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-glow mb-4">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Procurement-Ai</h1>
            <p className="text-muted-foreground">Advanced Procurement Management Platform</p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole('admin')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedRole === 'admin'
                    ? 'bg-gradient-primary border-primary shadow-glow text-primary-foreground'
                    : 'border-border/40 hover:border-border hover:bg-secondary/50'
                }`}
              >
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Admin</div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole('officer')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedRole === 'officer'
                    ? 'bg-gradient-primary border-primary shadow-glow text-primary-foreground'
                    : 'border-border/40 hover:border-border hover:bg-secondary/50'
                }`}
              >
                <Users className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Officer</div>
              </motion.button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-secondary/50 border-border/40 focus:border-primary transition-all duration-300"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-secondary/50 border-border/40 focus:border-primary transition-all duration-300"
                required
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full btn-3d text-primary-foreground font-semibold"
              >
                Sign In to {selectedRole === 'admin' ? 'Admin' : 'Officer'} Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>Demo credentials: any email/password combination</p>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-secondary/10 rounded-full blur-xl"
        />
      </motion.div>
    </div>
  );
};

export default Login;
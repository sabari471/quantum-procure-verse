import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { 
  Package, 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const AnimatedSphere = () => (
  <Sphere visible args={[1, 100, 200]} scale={2}>
    <MeshDistortMaterial
      color="#8B5CF6"
      attach="material"
      distort={0.3}
      speed={1.5}
      roughness={0}
    />
  </Sphere>
);

const Dashboard = () => {
  const kpiData = [
    {
      title: "Materials Predicted",
      value: "847",
      subtitle: "items for Q4 2024",
      icon: Package,
      trend: "+12%",
      color: "primary",
    },
    {
      title: "Active Vendors",
      value: "156",
      subtitle: "verified suppliers",
      icon: Users,
      trend: "+5%",
      color: "accent",
    },
    {
      title: "Pending Approvals",
      value: "23",
      subtitle: "awaiting review",
      icon: Clock,
      trend: "-18%",
      color: "warning",
    },
    {
      title: "Total Cost Estimate",
      value: "₹2.4M",
      subtitle: "current quarter",
      icon: DollarSign,
      trend: "+7%",
      color: "success",
    },
  ];

  const recentActivities = [
    { id: 1, action: "Material forecast updated for Transformer T1", time: "2 hours ago", status: "completed" },
    { id: 2, action: "Vendor TechElectric approved for cable supply", time: "4 hours ago", status: "completed" },
    { id: 3, action: "Procurement request #PR-2024-156 submitted", time: "6 hours ago", status: "pending" },
    { id: 4, action: "Cost analysis completed for civil materials", time: "1 day ago", status: "completed" },
    { id: 5, action: "New vendor registration: PowerTech Solutions", time: "2 days ago", status: "review" },
  ];

  const projectProgress = [
    { name: "Substation Alpha", progress: 75, status: "On Track" },
    { name: "Distribution Network Beta", progress: 45, status: "At Risk" },
    { name: "Transmission Line Gamma", progress: 90, status: "Ahead" },
    { name: "Control Center Delta", progress: 30, status: "Delayed" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Procurement Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights and project overview</p>
        </div>
        <div className="w-32 h-32">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="card-3d"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    kpi.trend.startsWith('+') ? 'text-success' : 
                    kpi.trend.startsWith('-') ? 'text-destructive' : ''
                  }`}
                >
                  {kpi.trend}
                </Badge>
              </div>
            </CardContent>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest procurement activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors duration-200"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-success' :
                      activity.status === 'pending' ? 'bg-warning' :
                      'bg-accent'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.status === 'completed' && <CheckCircle className="w-4 h-4 text-success" />}
                    {activity.status === 'pending' && <Clock className="w-4 h-4 text-warning" />}
                    {activity.status === 'review' && <AlertTriangle className="w-4 h-4 text-accent" />}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Project Progress</span>
              </CardTitle>
              <CardDescription>Current status of active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectProgress.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{project.name}</h4>
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          project.status === 'On Track' ? 'border-success text-success' :
                          project.status === 'Ahead' ? 'border-accent text-accent' :
                          project.status === 'At Risk' ? 'border-warning text-warning' :
                          'border-destructive text-destructive'
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <Progress 
                      value={project.progress} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">{project.progress}% complete</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
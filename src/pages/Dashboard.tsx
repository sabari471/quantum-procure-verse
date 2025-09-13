import { motion } from "framer-motion";
import { 
  Package, 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Target
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from "recharts";

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

  const costAnalysisData = [
    { category: "Electrical", budget: 850, spent: 340, remaining: 510 },
    { category: "Civil", budget: 320, spent: 87, remaining: 233 },
    { category: "Safety", budget: 150, spent: 32, remaining: 118 },
    { category: "Control Systems", budget: 200, spent: 89, remaining: 111 },
  ];

  const monthlySpendingData = [
    { month: "Jan", planned: 45, actual: 42 },
    { month: "Feb", planned: 52, actual: 48 },
    { month: "Mar", planned: 48, actual: 51 },
    { month: "Apr", planned: 62, actual: 58 },
    { month: "May", planned: 55, actual: 53 },
    { month: "Jun", planned: 71, actual: 69 },
  ];

  const vendorPerformance = [
    { name: "Excellent", value: 45, color: "#10b981" },
    { name: "Good", value: 35, color: "#3b82f6" },
    { name: "Average", value: 15, color: "#f59e0b" },
    { name: "Poor", value: 5, color: "#ef4444" },
  ];

  const riskMetrics = [
    { category: "Technical", level: 25, trend: "stable" },
    { category: "Financial", level: 40, trend: "increasing" },
    { category: "Schedule", level: 60, trend: "decreasing" },
    { category: "Quality", level: 15, trend: "stable" },
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
          <p className="text-muted-foreground">Real-time insights and comprehensive project analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            <Activity className="w-4 h-4 mr-1" />
            Live Data
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Last Updated: {new Date().toLocaleTimeString()}
          </Badge>
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

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cost Analysis Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Budget Analysis</span>
              </CardTitle>
              <CardDescription>Budget allocation vs spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Bar dataKey="budget" fill="#3b82f6" name="Budget (₹L)" />
                  <Bar dataKey="spent" fill="#10b981" name="Spent (₹L)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Spending Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Spending Trends</span>
              </CardTitle>
              <CardDescription>Monthly planned vs actual spending</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlySpendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Area type="monotone" dataKey="planned" stackId="1" stroke="#3b82f6" fill="#3b82f680" name="Planned (₹L)" />
                  <Area type="monotone" dataKey="actual" stackId="2" stroke="#10b981" fill="#10b98180" name="Actual (₹L)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vendor Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Vendor Performance</span>
              </CardTitle>
              <CardDescription>Performance rating distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={vendorPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {vendorPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Project Status</span>
              </CardTitle>
              <CardDescription>Current progress across all projects</CardDescription>
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

        {/* Risk Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Risk Assessment</span>
              </CardTitle>
              <CardDescription>Current risk levels by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskMetrics.map((risk, index) => (
                  <motion.div
                    key={risk.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{risk.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{risk.level}%</span>
                        <Badge 
                          variant={
                            risk.trend === 'decreasing' ? 'default' :
                            risk.trend === 'stable' ? 'secondary' :
                            'outline'
                          }
                          className="text-xs"
                        >
                          {risk.trend}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={risk.level} 
                      className={`h-2 ${
                        risk.level > 50 ? '[&>div]:bg-destructive' :
                        risk.level > 30 ? '[&>div]:bg-warning' :
                        '[&>div]:bg-success'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest procurement activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
};

export default Dashboard;
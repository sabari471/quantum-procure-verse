import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  PlayCircle,
  Users,
  TrendingUp,
  Filter,
  Download,
  BarChart3,
  Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GanttChart from "@/components/GanttChart";
import TimelineChart from "@/components/Charts/TimelineChart";
import ProgressChart from "@/components/Charts/ProgressChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const ganttTasks = [
  {
    id: 1,
    name: "Procurement Planning",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    duration: 44,
    progress: 100,
    status: "completed" as const,
    color: "#10b981",
    critical: false
  },
  {
    id: 2,
    name: "Tender Process",
    startDate: "2024-03-01",
    endDate: "2024-04-15",
    duration: 45,
    progress: 85,
    status: "active" as const,
    color: "#f59e0b",
    critical: true
  },
  {
    id: 3,
    name: "Order Placement",
    startDate: "2024-04-16",
    endDate: "2024-05-15",
    duration: 29,
    progress: 0,
    status: "pending" as const,
    color: "#6b7280",
    critical: true
  },
  {
    id: 4,
    name: "Material Delivery",
    startDate: "2024-05-16",
    endDate: "2024-08-30",
    duration: 106,
    progress: 0,
    status: "pending" as const,
    color: "#6b7280",
    critical: true
  },
  {
    id: 5,
    name: "Installation & Testing",
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    duration: 105,
    progress: 0,
    status: "pending" as const,
    color: "#6b7280",
    critical: false
  }
];

const timelineEvents = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    date: "2024-01-15",
    status: "completed" as const,
    description: "Initial project planning and team alignment",
    type: "milestone" as const
  },
  {
    id: "2",
    title: "Material Specifications Finalized",
    date: "2024-02-10",
    status: "completed" as const,
    description: "Technical specifications approved by engineering team",
    type: "milestone" as const
  },
  {
    id: "3",
    title: "Vendor Evaluation Complete",
    date: "2024-04-15",
    status: "active" as const,
    description: "Technical and commercial evaluation in progress",
    type: "task" as const
  },
  {
    id: "4",
    title: "First Material Delivery",
    date: "2024-05-16",
    status: "upcoming" as const,
    description: "Expected delivery of transformers and switchgear",
    type: "delivery" as const
  },
  {
    id: "5",
    title: "Installation Begins",
    date: "2024-09-01",
    status: "upcoming" as const,
    description: "On-site installation and commissioning",
    type: "milestone" as const
  }
];

const progressItems = [
  {
    id: "1",
    name: "Substation Alpha",
    progress: 75,
    target: 70,
    status: "on-track" as const,
    trend: "up" as const,
    category: "Electrical"
  },
  {
    id: "2",
    name: "Distribution Network Beta",
    progress: 45,
    target: 60,
    status: "at-risk" as const,
    trend: "down" as const,
    category: "Network"
  },
  {
    id: "3",
    name: "Transmission Line Gamma",
    progress: 90,
    target: 85,
    status: "completed" as const,
    trend: "up" as const,
    category: "Transmission"
  },
  {
    id: "4",
    name: "Control Center Delta",
    progress: 30,
    target: 50,
    status: "delayed" as const,
    trend: "stable" as const,
    category: "Control Systems"
  }
];

const monthlyProgressData = [
  { month: "Jan", planned: 20, actual: 18, cumulative: 18 },
  { month: "Feb", planned: 35, actual: 32, cumulative: 50 },
  { month: "Mar", planned: 50, actual: 48, cumulative: 98 },
  { month: "Apr", planned: 65, actual: 58, cumulative: 156 },
  { month: "May", planned: 80, actual: 62, cumulative: 218 },
  { month: "Jun", planned: 100, actual: 85, cumulative: 303 }
];

const riskDistribution = [
  { name: "Low Risk", value: 45, color: "#10b981" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 20, color: "#ef4444" }
];

const resourceUtilization = [
  { resource: "Engineers", allocated: 12, utilized: 10, efficiency: 83 },
  { resource: "Technicians", allocated: 25, utilized: 23, efficiency: 92 },
  { resource: "Equipment", allocated: 8, utilized: 6, efficiency: 75 },
  { resource: "Supervisors", allocated: 5, utilized: 5, efficiency: 100 }
];

const ProjectSchedule = () => {
  const [selectedView, setSelectedView] = useState<"gantt" | "timeline" | "analytics">("gantt");

  const totalTasks = ganttTasks.length;
  const completedTasks = ganttTasks.filter(t => t.status === 'completed').length;
  const activeTasks = ganttTasks.filter(t => t.status === 'active').length;
  const criticalTasks = ganttTasks.filter(t => t.critical).length;
  const overallProgress = Math.round(ganttTasks.reduce((sum, t) => sum + t.progress, 0) / totalTasks);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Project Schedule</h1>
            <p className="text-muted-foreground">Comprehensive project timeline and progress tracking</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button className="btn-3d flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Schedule</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="card-3d"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Phases</p>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="card-3d"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Phases</p>
                  <p className="text-2xl font-bold">{activeTasks}</p>
                </div>
                <PlayCircle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="card-3d"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Path</p>
                  <p className="text-2xl font-bold">{criticalTasks}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="card-3d"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
          <TabsList className="glass-card p-1 mb-6">
            <TabsTrigger value="gantt" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Gantt Chart</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Timeline & Progress</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gantt" className="space-y-6">
            <GanttChart 
              tasks={ganttTasks}
              title="Project Gantt Chart"
              showControls={true}
            />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TimelineChart 
                events={timelineEvents}
                title="Project Milestones"
              />
              <ProgressChart 
                items={progressItems}
                title="Phase Progress"
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Progress Chart */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Monthly Progress Tracking</CardTitle>
                  <CardDescription>Planned vs Actual Progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyProgressData}>
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
                      <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} name="Planned" />
                      <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Distribution */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Project risk assessment by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Resource Utilization */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                  <CardDescription>Current resource allocation and efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resourceUtilization.map((resource, index) => (
                      <motion.div
                        key={resource.resource}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="p-3 rounded-lg border border-border/40"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{resource.resource}</span>
                          <Badge 
                            variant={resource.efficiency >= 90 ? "default" : resource.efficiency >= 75 ? "secondary" : "outline"}
                          >
                            {resource.efficiency}% efficiency
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>Utilized: {resource.utilized}/{resource.allocated}</span>
                          <span>{resource.efficiency}%</span>
                        </div>
                        <Progress value={resource.efficiency} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Task Completion Trend */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Task Completion Trend</CardTitle>
                  <CardDescription>Weekly task completion rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyProgressData}>
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
                      <Bar dataKey="actual" fill="#3b82f6" name="Tasks Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProjectSchedule;
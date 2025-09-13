import { useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Text } from "@react-three/drei";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  PlayCircle,
  Users,
  TrendingUp,
  Filter,
  Download
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const scheduleData = [
  {
    id: 1,
    phase: "Procurement Planning",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    duration: 44,
    progress: 100,
    status: "completed",
    tasks: [
      { name: "Material Forecasting", duration: 14, status: "completed" },
      { name: "Vendor Identification", duration: 21, status: "completed" },
      { name: "Budget Approval", duration: 9, status: "completed" }
    ],
    dependencies: [],
    critical: false
  },
  {
    id: 2,
    phase: "Tender Process",
    startDate: "2024-03-01",
    endDate: "2024-04-15",
    duration: 45,
    progress: 85,
    status: "active",
    tasks: [
      { name: "RFQ Preparation", duration: 10, status: "completed" },
      { name: "Vendor Quotations", duration: 21, status: "completed" },
      { name: "Technical Evaluation", duration: 14, status: "active" }
    ],
    dependencies: [1],
    critical: true
  },
  {
    id: 3,
    phase: "Order Placement",
    startDate: "2024-04-16",
    endDate: "2024-05-15",
    duration: 29,
    progress: 0,
    status: "pending",
    tasks: [
      { name: "Contract Finalization", duration: 7, status: "pending" },
      { name: "Purchase Orders", duration: 14, status: "pending" },
      { name: "Delivery Scheduling", duration: 8, status: "pending" }
    ],
    dependencies: [2],
    critical: true
  },
  {
    id: 4,
    phase: "Material Delivery",
    startDate: "2024-05-16",
    endDate: "2024-08-30",
    duration: 106,
    progress: 0,
    status: "pending",
    tasks: [
      { name: "Manufacturing", duration: 60, status: "pending" },
      { name: "Quality Testing", duration: 21, status: "pending" },
      { name: "Transportation", duration: 25, status: "pending" }
    ],
    dependencies: [3],
    critical: true
  },
  {
    id: 5,
    phase: "Installation",
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    duration: 105,
    progress: 0,
    status: "pending",
    tasks: [
      { name: "Site Preparation", duration: 21, status: "pending" },
      { name: "Equipment Installation", duration: 56, status: "pending" },
      { name: "Testing & Commissioning", duration: 28, status: "pending" }
    ],
    dependencies: [4],
    critical: false
  }
];

const milestones = [
  { name: "Project Kickoff", date: "2024-01-15", status: "completed" },
  { name: "Vendor Selection", date: "2024-04-15", status: "active" },
  { name: "Material Delivery Start", date: "2024-05-16", status: "pending" },
  { name: "Installation Begin", date: "2024-09-01", status: "pending" },
  { name: "Project Completion", date: "2024-12-15", status: "pending" }
];

const GanttBar3D = ({ position, length, progress, color, critical }: any) => (
  <group position={position}>
    {/* Background bar */}
    <Box args={[length, 0.5, 0.3]}>
      <meshStandardMaterial color={critical ? "#ef4444" : "#374151"} />
    </Box>
    {/* Progress bar */}
    <Box position={[-(length - (length * progress)) / 2, 0, 0.1]} args={[length * progress, 0.5, 0.3]}>
      <meshStandardMaterial color={color} />
    </Box>
  </group>
);

const ProjectSchedule = () => {
  const [viewMode, setViewMode] = useState<"3d" | "table">("3d");
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "#10b981";
      case "active": return "#f59e0b";
      case "pending": return "#6b7280";
      default: return "#6b7280";
    }
  };

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
            <p className="text-muted-foreground">3D Gantt chart and timeline management</p>
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
                  <p className="text-2xl font-bold">{scheduleData.length}</p>
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
                  <p className="text-2xl font-bold">{scheduleData.filter(p => p.status === "active").length}</p>
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
                  <p className="text-2xl font-bold">{scheduleData.filter(p => p.critical).length}</p>
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
                  <p className="text-2xl font-bold">{Math.round(scheduleData.reduce((sum, p) => sum + p.progress, 0) / scheduleData.length)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </motion.div>
        </div>
      </motion.div>

      {/* View Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "3d" | "table")}>
          <TabsList className="glass-card p-1">
            <TabsTrigger value="3d" className="flex items-center space-x-2">
              <span>3D Gantt Chart</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center space-x-2">
              <span>Table View</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="3d" className="mt-6">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Interactive 3D Gantt Chart</CardTitle>
                <CardDescription>Pan, zoom, and interact with your project timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} />
                    <pointLight position={[-10, -10, -5]} intensity={0.3} />
                    
                    {scheduleData.map((phase, index) => (
                      <GanttBar3D
                        key={phase.id}
                        position={[0, index * -1.5, 0]}
                        length={phase.duration / 20}
                        progress={phase.progress / 100}
                        color={getStatusColor(phase.status)}
                        critical={phase.critical}
                      />
                    ))}

                    {/* Phase labels */}
                    {scheduleData.map((phase, index) => (
                      <Text
                        key={`label-${phase.id}`}
                        position={[-6, index * -1.5, 0]}
                        fontSize={0.3}
                        color="#ffffff"
                        anchorX="right"
                        anchorY="middle"
                      >
                        {phase.phase}
                      </Text>
                    ))}

                    <OrbitControls enableZoom={true} enableRotate={true} enablePan={true} />
                  </Canvas>
                </div>
                
                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-success rounded" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-warning rounded" />
                    <span>Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-muted rounded" />
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-destructive rounded" />
                    <span>Critical Path</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table" className="mt-6">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Schedule Table</CardTitle>
                <CardDescription>Detailed view of all project phases and tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduleData.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl border border-border/40 hover:border-border hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-lg">{phase.phase}</h4>
                          {phase.critical && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Critical
                            </Badge>
                          )}
                          <Badge variant="secondary" className={`text-xs ${
                            phase.status === 'completed' ? 'bg-success/20 text-success' :
                            phase.status === 'active' ? 'bg-warning/20 text-warning' :
                            'bg-muted/20 text-muted-foreground'
                          }`}>
                            {phase.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {phase.status === 'active' && <Clock className="w-3 h-3 mr-1" />}
                            {phase.status === 'pending' && <PlayCircle className="w-3 h-3 mr-1" />}
                            {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{phase.startDate} - {phase.endDate}</p>
                          <p className="text-sm font-medium">{phase.duration} days</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>

                      {selectedPhase === phase.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-border/20 pt-3 mt-3"
                        >
                          <h5 className="font-medium mb-2">Tasks</h5>
                          <div className="space-y-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-center justify-between p-2 rounded bg-secondary/20">
                                <div className="flex items-center space-x-2">
                                  {task.status === 'completed' && <CheckCircle className="w-4 h-4 text-success" />}
                                  {task.status === 'active' && <Clock className="w-4 h-4 text-warning" />}
                                  {task.status === 'pending' && <PlayCircle className="w-4 h-4 text-muted-foreground" />}
                                  <span className="text-sm">{task.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{task.duration} days</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Project Milestones</span>
            </CardTitle>
            <CardDescription>Key project deliverables and checkpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors duration-200"
                >
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.status === 'completed' ? 'bg-success shadow-glow' :
                    milestone.status === 'active' ? 'bg-warning animate-pulse' :
                    'bg-muted'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium">{milestone.name}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                  <Badge variant={
                    milestone.status === 'completed' ? 'default' :
                    milestone.status === 'active' ? 'secondary' :
                    'outline'
                  }>
                    {milestone.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectSchedule;
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Workflow, 
  Plus, 
  FileText, 
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Package,
  Users,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const workflowStages = [
  { id: 1, name: "Request Submission", status: "completed", color: "success" },
  { id: 2, name: "Technical Review", status: "completed", color: "success" },
  { id: 3, name: "Budget Approval", status: "active", color: "warning" },
  { id: 4, name: "Vendor Selection", status: "pending", color: "muted" },
  { id: 5, name: "Order Placement", status: "pending", color: "muted" },
  { id: 6, name: "Delivery Tracking", status: "pending", color: "muted" },
];

const procurementRequests = [
  {
    id: "PR-2024-156",
    title: "High Voltage Switchgear Procurement",
    requester: "Rajesh Kumar",
    department: "Electrical Engineering",
    submissionDate: "2024-03-15",
    urgency: "High",
    estimatedCost: 25000000,
    currentStage: 3,
    approver: "Priya Sharma",
    description: "Procurement of 11kV switchgear panels for substation upgrade project",
    specifications: "Indoor type, SF6 insulated, 630A rated current",
    vendor: "PowerTech Solutions",
    status: "In Review"
  },
  {
    id: "PR-2024-157",
    title: "Cable Procurement for Distribution Network",
    requester: "Amit Patel",
    department: "Project Management",
    submissionDate: "2024-03-18",
    urgency: "Medium",
    estimatedCost: 12500000,
    currentStage: 5,
    approver: "Suresh Gupta",
    description: "XLPE cables for 33kV distribution network expansion",
    specifications: "AL/XLPE/SWA/PVC, 3C x 300 sq.mm",
    vendor: "CableTech Industries",
    status: "Order Placed"
  },
  {
    id: "PR-2024-158",
    title: "Protection Relay Systems",
    requester: "Neha Singh",
    department: "Protection & Control",
    submissionDate: "2024-03-20",
    urgency: "Low",
    estimatedCost: 8750000,
    currentStage: 2,
    approver: "Vikram Rao",
    description: "Digital protection relays for transformer protection",
    specifications: "Numerical relay with communication interface",
    vendor: "RelayTech Systems",
    status: "Technical Review"
  }
];

const getUrgencyColor = (urgency: string) => {
  switch (urgency.toLowerCase()) {
    case "high": return "destructive";
    case "medium": return "outline";
    case "low": return "secondary";
    default: return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "order placed": return "default";
    case "in review": return "outline";
    case "technical review": return "secondary";
    default: return "outline";
  }
};

const ProcurementWorkflow = () => {
  const [selectedTab, setSelectedTab] = useState("requests");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [newRequestOpen, setNewRequestOpen] = useState(false);

  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    specifications: "",
    estimatedCost: "",
    urgency: "medium",
    department: "",
    vendor: ""
  });

  const handleSubmitRequest = () => {
    // Handle form submission logic here
    setNewRequestOpen(false);
    setNewRequest({
      title: "",
      description: "",
      specifications: "",
      estimatedCost: "",
      urgency: "medium",
      department: "",
      vendor: ""
    });
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
            <h1 className="text-4xl font-bold gradient-text mb-2">Procurement Workflow</h1>
            <p className="text-muted-foreground">Request submission, approval tracking, and order management</p>
          </div>
          <Dialog open={newRequestOpen} onOpenChange={setNewRequestOpen}>
            <DialogTrigger asChild>
              <Button className="btn-3d flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Request</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl glass-card">
              <DialogHeader>
                <DialogTitle>Submit New Procurement Request</DialogTitle>
                <DialogDescription>
                  Fill in the details for your procurement request
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Request Title</Label>
                    <Input
                      id="title"
                      value={newRequest.title}
                      onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                      placeholder="Enter request title"
                      className="bg-secondary/50 border-border/40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={newRequest.department}
                      onChange={(e) => setNewRequest({...newRequest, department: e.target.value})}
                      placeholder="Your department"
                      className="bg-secondary/50 border-border/40"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    placeholder="Detailed description of the procurement requirement"
                    className="bg-secondary/50 border-border/40"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="specifications">Technical Specifications</Label>
                  <Textarea
                    id="specifications"
                    value={newRequest.specifications}
                    onChange={(e) => setNewRequest({...newRequest, specifications: e.target.value})}
                    placeholder="Technical specifications and requirements"
                    className="bg-secondary/50 border-border/40"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cost">Estimated Cost (₹)</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={newRequest.estimatedCost}
                      onChange={(e) => setNewRequest({...newRequest, estimatedCost: e.target.value})}
                      placeholder="0"
                      className="bg-secondary/50 border-border/40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={newRequest.urgency} onValueChange={(value) => setNewRequest({...newRequest, urgency: value})}>
                      <SelectTrigger className="bg-secondary/50 border-border/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vendor">Preferred Vendor</Label>
                    <Input
                      id="vendor"
                      value={newRequest.vendor}
                      onChange={(e) => setNewRequest({...newRequest, vendor: e.target.value})}
                      placeholder="Optional"
                      className="bg-secondary/50 border-border/40"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setNewRequestOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitRequest} className="btn-3d">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Requests</p>
                  <p className="text-2xl font-bold">{procurementRequests.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold">{procurementRequests.filter(r => r.status === "In Review").length}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
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
                  <p className="text-sm font-medium text-muted-foreground">Orders Placed</p>
                  <p className="text-2xl font-bold">{procurementRequests.filter(r => r.status === "Order Placed").length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
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
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">₹{(procurementRequests.reduce((sum, r) => sum + r.estimatedCost, 0) / 10000000).toFixed(1)}Cr</p>
                </div>
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </motion.div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="glass-card p-1 mb-6">
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Procurement Requests</span>
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center space-x-2">
              <Workflow className="w-4 h-4" />
              <span>Process Tracker</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <div className="space-y-6">
              {procurementRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.01, rotateX: 2 }}
                  className="card-3d p-6 cursor-pointer"
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{request.title}</h3>
                        <Badge variant={getUrgencyColor(request.urgency)}>
                          {request.urgency === 'High' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {request.urgency} Priority
                        </Badge>
                        <Badge variant={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Request ID: {request.id}</p>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{(request.estimatedCost / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Requester</p>
                        <p className="font-medium">{request.requester}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-medium">{request.submissionDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{request.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Vendor</p>
                        <p className="font-medium">{request.vendor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Workflow Progress</span>
                      <span className="text-sm text-muted-foreground">
                        Stage {request.currentStage} of {workflowStages.length}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {workflowStages.map((stage) => (
                        <div
                          key={stage.id}
                          className={`flex-1 h-2 rounded-full ${
                            stage.id <= request.currentStage 
                              ? 'bg-primary shadow-glow' 
                              : stage.id === request.currentStage + 1
                              ? 'bg-warning'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                          {request.approver.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Approver: {request.approver}</p>
                        <p className="text-xs text-muted-foreground">Current stage owner</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tracker">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Procurement Process Timeline</CardTitle>
                <CardDescription>Visual workflow tracking for procurement requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {workflowStages.map((stage, index) => (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center space-x-4"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stage.status === 'completed' ? 'bg-success shadow-glow' :
                        stage.status === 'active' ? 'bg-warning animate-pulse' :
                        'bg-muted'
                      }`}>
                        {stage.status === 'completed' && <CheckCircle className="w-5 h-5 text-white" />}
                        {stage.status === 'active' && <Clock className="w-5 h-5 text-white" />}
                        {stage.status === 'pending' && <div className="w-3 h-3 rounded-full bg-white" />}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold">{stage.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {stage.status === 'completed' && 'Completed successfully'}
                          {stage.status === 'active' && 'Currently in progress'}
                          {stage.status === 'pending' && 'Waiting to start'}
                        </p>
                      </div>
                      
                      <Badge variant={stage.status === 'completed' ? 'default' : stage.status === 'active' ? 'secondary' : 'outline'}>
                        {stage.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProcurementWorkflow;
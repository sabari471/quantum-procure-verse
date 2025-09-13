import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Download, 
  Filter, 
  Search, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ScatterChart, Scatter } from "recharts";

const materialData = [
  { id: 1, material: "Power Transformer 220kV", quantity: 15, unit: "Units", estimatedCost: 45000000, urgency: "High", category: "Electrical", supplier: "PowerTech Solutions" },
  { id: 2, material: "XLPE Cables 33kV", quantity: 25000, unit: "Meters", estimatedCost: 12500000, urgency: "Medium", category: "Electrical", supplier: "CableTech Industries" },
  { id: 3, material: "RCC Poles 11m", quantity: 500, unit: "Units", estimatedCost: 8750000, urgency: "Low", category: "Civil", supplier: "ConcreteCorp Ltd" },
  { id: 4, material: "Control Panels IP65", quantity: 85, unit: "Units", estimatedCost: 6800000, urgency: "High", category: "Electrical", supplier: "ControlSys Pro" },
  { id: 5, material: "Earthing Materials", quantity: 200, unit: "Sets", estimatedCost: 3200000, urgency: "Medium", category: "Safety", supplier: "SafeEarth Solutions" },
  { id: 6, material: "Insulator Strings", quantity: 1200, unit: "Sets", estimatedCost: 2400000, urgency: "Low", category: "Electrical", supplier: "InsulaTech Corp" },
  { id: 7, material: "Steel Structures", quantity: 150, unit: "Tons", estimatedCost: 18000000, urgency: "High", category: "Civil", supplier: "SteelWorks Industries" },
  { id: 8, material: "Protection Relays", quantity: 120, unit: "Units", estimatedCost: 9600000, urgency: "Medium", category: "Electrical", supplier: "RelayTech Systems" },
];

const costAnalysisData = [
  { category: "Electrical", cost: 76800000, color: "#8B5CF6" },
  { category: "Civil", cost: 26750000, color: "#06D6A0" },
  { category: "Safety", cost: 3200000, color: "#F59E0B" },
];

const trendData = [
  { month: "Jan", predicted: 450, actual: 420, variance: -30 },
  { month: "Feb", predicted: 520, actual: 480, variance: -40 },
  { month: "Mar", predicted: 480, actual: 510, variance: 30 },
  { month: "Apr", predicted: 620, actual: 580, variance: -40 },
  { month: "May", predicted: 550, actual: 530, variance: -20 },
  { month: "Jun", predicted: 710, actual: 690, variance: -20 },
];

const materialTrendData = [
  { category: "Transformers", Q1: 45, Q2: 52, Q3: 48, Q4: 62 },
  { category: "Cables", Q1: 125, Q2: 140, Q3: 132, Q4: 158 },
  { category: "Switchgear", Q1: 85, Q2: 92, Q3: 88, Q4: 95 },
  { category: "Protection", Q1: 35, Q2: 42, Q3: 38, Q4: 45 },
];

const supplierAnalysis = [
  { supplier: "PowerTech", reliability: 95, cost: 85, delivery: 92 },
  { supplier: "CableTech", reliability: 88, cost: 92, delivery: 89 },
  { supplier: "SteelWorks", reliability: 90, cost: 78, delivery: 85 },
  { supplier: "ControlSys", reliability: 96, cost: 88, delivery: 94 },
];

const costVarianceData = [
  { material: "Transformers", budgeted: 450, forecasted: 465, variance: 15 },
  { material: "Cables", budgeted: 125, forecasted: 118, variance: -7 },
  { material: "Civil Works", budgeted: 87, forecasted: 92, variance: 5 },
  { material: "Protection", budgeted: 68, forecasted: 71, variance: 3 },
];

const MaterialForecasting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterUrgency, setFilterUrgency] = useState("all");

  const filteredMaterials = materialData.filter(material => {
    const matchesSearch = material.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || material.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesUrgency = filterUrgency === "all" || material.urgency.toLowerCase() === filterUrgency.toLowerCase();
    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const totalCost = filteredMaterials.reduce((sum, material) => sum + material.estimatedCost, 0);

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
            <h1 className="text-4xl font-bold gradient-text mb-2">Material Forecasting</h1>
            <p className="text-muted-foreground">AI-powered material prediction and cost analysis</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </Button>
            <Button className="btn-3d flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Materials</p>
                  <p className="text-2xl font-bold">{filteredMaterials.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
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
                  <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">₹{(totalCost / 10000000).toFixed(1)}Cr</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
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
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold">{filteredMaterials.filter(m => m.urgency === "High").length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-warning" />
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
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{[...new Set(filteredMaterials.map(m => m.category))].length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-3d p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/40"
              />
            </div>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48 bg-secondary/50 border-border/40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="civil">Civil</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterUrgency} onValueChange={setFilterUrgency}>
            <SelectTrigger className="w-48 bg-secondary/50 border-border/40">
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Materials Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Predicted Materials</CardTitle>
              <CardDescription>AI-generated material requirements for upcoming projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMaterials.map((material, index) => (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.01, rotateX: 2 }}
                    className="p-4 rounded-xl border border-border/40 hover:border-border hover:bg-secondary/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{material.material}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {material.quantity.toLocaleString()} {material.unit} • {material.supplier}
                        </p>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className={`${
                            material.urgency === 'High' ? 'border-destructive text-destructive' :
                            material.urgency === 'Medium' ? 'border-warning text-warning' :
                            'border-muted text-muted-foreground'
                          }`}>
                            {material.urgency} Priority
                          </Badge>
                          <Badge variant="secondary">{material.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{(material.estimatedCost / 100000).toFixed(1)}L</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

          {/* Analytics Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Cost Breakdown */}
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Budget breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={costAnalysisData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="cost"
                    >
                      {costAnalysisData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {costAnalysisData.map((item) => (
                    <div key={item.category} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.category}</span>
                      </div>
                      <span className="font-medium">₹{(item.cost / 10000000).toFixed(1)}Cr</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prediction Accuracy */}
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Prediction Accuracy</CardTitle>
                <CardDescription>6-month forecast vs actual</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip formatter={(value: number) => `₹${value}L`} />
                    <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} name="Predicted" />
                    <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Supplier Performance */}
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Supplier Performance</CardTitle>
                <CardDescription>Multi-dimensional supplier analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart data={supplierAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="cost" 
                      type="number" 
                      domain={[70, 100]} 
                      name="Cost Efficiency"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      dataKey="reliability" 
                      type="number" 
                      domain={[80, 100]} 
                      name="Reliability"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name) => [value + '%', name]}
                      labelFormatter={(label) => `Supplier: ${supplierAnalysis.find(s => s.cost === label)?.supplier || ''}`}
                    />
                    <Scatter dataKey="delivery" fill="#3b82f6" name="Delivery Performance" />
                  </ScatterChart>
                </ResponsiveContainer>
                <div className="text-xs text-muted-foreground mt-2">
                  X-axis: Cost Efficiency • Y-axis: Reliability • Bubble size: Delivery Performance
                </div>
              </CardContent>
            </Card>
          </motion.div>
      </div>
    </div>
  );
};

export default MaterialForecasting;
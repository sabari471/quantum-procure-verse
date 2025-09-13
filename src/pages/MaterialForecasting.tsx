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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
  { month: "Jan", predicted: 45000000, actual: 42000000 },
  { month: "Feb", predicted: 52000000, actual: 48000000 },
  { month: "Mar", predicted: 48000000, actual: 51000000 },
  { month: "Apr", predicted: 62000000, actual: 58000000 },
  { month: "May", predicted: 55000000, actual: 53000000 },
  { month: "Jun", predicted: 71000000, actual: 69000000 },
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

          {/* Trend Analysis */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Prediction Accuracy</CardTitle>
              <CardDescription>6-month forecast vs actual</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                  <Bar dataKey="predicted" fill="#8B5CF6" name="Predicted" />
                  <Bar dataKey="actual" fill="#06D6A0" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MaterialForecasting;
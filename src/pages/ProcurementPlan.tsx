import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  ChevronDown, 
  ChevronRight,
  Download, 
  Plus,
  AlertTriangle,
  Clock,
  DollarSign,
  Truck,
  Shield,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const procurementCategories = [
  {
    id: 1,
    category: "Electrical Equipment",
    totalBudget: 85000000,
    spentBudget: 34000000,
    items: [
      {
        id: 101,
        name: "Power Transformers 220kV",
        vendor: "PowerTech Solutions",
        quantity: "15 Units",
        unitCost: 3000000,
        totalCost: 45000000,
        leadTime: "8-10 weeks",
        riskLevel: "Medium",
        status: "Order Placed",
        deliveryDate: "2024-06-15",
        riskMitigation: "Alternative supplier identified, regular quality audits planned"
      },
      {
        id: 102,
        name: "Control Panels IP65",
        vendor: "ControlSys Pro",
        quantity: "85 Units",
        unitCost: 80000,
        totalCost: 6800000,
        leadTime: "4-5 weeks",
        riskLevel: "Low",
        status: "RFQ Stage",
        deliveryDate: "2024-05-20",
        riskMitigation: "Standard product, multiple suppliers available"
      },
      {
        id: 103,
        name: "XLPE Cables 33kV",
        vendor: "CableTech Industries",
        quantity: "25000 Meters",
        unitCost: 500,
        totalCost: 12500000,
        leadTime: "6-7 weeks",
        riskLevel: "High",
        status: "Vendor Selection",
        deliveryDate: "2024-07-10",
        riskMitigation: "Market price volatility - fixed price contract negotiated"
      }
    ]
  },
  {
    id: 2,
    category: "Civil Materials",
    totalBudget: 32000000,
    spentBudget: 8750000,
    items: [
      {
        id: 201,
        name: "RCC Poles 11m",
        vendor: "ConcreteCorp Ltd",
        quantity: "500 Units",
        unitCost: 17500,
        totalCost: 8750000,
        leadTime: "3-4 weeks",
        riskLevel: "Low",
        status: "Delivered",
        deliveryDate: "2024-03-15",
        riskMitigation: "Local supplier, standard specifications"
      },
      {
        id: 202,
        name: "Steel Structures",
        vendor: "SteelWorks Industries",
        quantity: "150 Tons",
        unitCost: 120000,
        totalCost: 18000000,
        leadTime: "10-12 weeks",
        riskLevel: "Medium",
        status: "Manufacturing",
        deliveryDate: "2024-08-30",
        riskMitigation: "Regular progress monitoring, penalty clauses included"
      }
    ]
  },
  {
    id: 3,
    category: "Safety & Protection",
    totalBudget: 15000000,
    spentBudget: 3200000,
    items: [
      {
        id: 301,
        name: "Earthing Systems",
        vendor: "SafeEarth Solutions",
        quantity: "200 Sets",
        unitCost: 16000,
        totalCost: 3200000,
        leadTime: "2-3 weeks",
        riskLevel: "Low",
        status: "Delivered",
        deliveryDate: "2024-02-28",
        riskMitigation: "Critical safety item - backup supplier maintained"
      },
      {
        id: 302,
        name: "Protection Relays",
        vendor: "RelayTech Systems",
        quantity: "120 Units",
        unitCost: 80000,
        totalCost: 9600000,
        leadTime: "6-8 weeks",
        riskLevel: "Medium",
        status: "Technical Review",
        deliveryDate: "2024-09-15",
        riskMitigation: "Technical specifications verified, factory acceptance test planned"
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered": return "default";
    case "order placed": return "default";
    case "manufacturing": return "secondary";
    case "vendor selection": return "outline";
    case "rfq stage": return "outline";
    case "technical review": return "outline";
    default: return "secondary";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "high": return "destructive";
    case "medium": return "outline";
    case "low": return "secondary";
    default: return "secondary";
  }
};

const ProcurementPlan = () => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const totalBudget = procurementCategories.reduce((sum, cat) => sum + cat.totalBudget, 0);
  const totalSpent = procurementCategories.reduce((sum, cat) => sum + cat.spentBudget, 0);
  const totalItems = procurementCategories.reduce((sum, cat) => sum + cat.items.length, 0);

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
            <h1 className="text-4xl font-bold gradient-text mb-2">Procurement Plan</h1>
            <p className="text-muted-foreground">Category-wise procurement strategy and execution plan</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </Button>
            <Button className="btn-3d flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Plan</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold">₹{(totalBudget / 10000000).toFixed(1)}Cr</p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
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
                  <p className="text-sm font-medium text-muted-foreground">Budget Utilized</p>
                  <p className="text-2xl font-bold">₹{(totalSpent / 10000000).toFixed(1)}Cr</p>
                </div>
                <ClipboardList className="w-8 h-8 text-primary" />
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
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{procurementCategories.length}</p>
                </div>
                <Shield className="w-8 h-8 text-accent" />
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
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </motion.div>
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-3d p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Procurement Progress</h3>
            <span className="text-lg font-bold">{Math.round((totalSpent / totalBudget) * 100)}%</span>
          </div>
          <Progress value={(totalSpent / totalBudget) * 100} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₹{(totalSpent / 10000000).toFixed(1)}Cr spent</span>
            <span>₹{((totalBudget - totalSpent) / 10000000).toFixed(1)}Cr remaining</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Category Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {procurementCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * categoryIndex }}
            whileHover={{ scale: 1.01 }}
            className="card-3d"
          >
            <Collapsible
              open={expandedCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors duration-200 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div className="text-left">
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                        <CardDescription>
                          {category.items.length} items • ₹{(category.totalBudget / 10000000).toFixed(1)}Cr budget
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {Math.round((category.spentBudget / category.totalBudget) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ₹{(category.spentBudget / 10000000).toFixed(1)}Cr / ₹{(category.totalBudget / 10000000).toFixed(1)}Cr
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={(category.spentBudget / category.totalBudget) * 100} 
                    className="h-2 mt-4" 
                  />
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * itemIndex }}
                        whileHover={{ scale: 1.01, rotateX: 2 }}
                        className="p-6 rounded-xl border border-border/40 hover:border-border hover:bg-secondary/20 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Vendor:</span>
                                <p className="font-medium">{item.vendor}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Quantity:</span>
                                <p className="font-medium">{item.quantity}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Total Cost:</span>
                                <p className="font-medium">₹{(item.totalCost / 100000).toFixed(1)}L</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Delivery:</span>
                                <p className="font-medium">{item.deliveryDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <Badge variant={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Badge variant={getRiskColor(item.riskLevel)}>
                              {item.riskLevel === 'High' && <AlertTriangle className="w-3 h-3 mr-1" />}
                              {item.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Lead Time: {item.leadTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Truck className="w-4 h-4" />
                            <span>Delivery: {item.deliveryDate}</span>
                          </div>
                        </div>

                        <div className="bg-secondary/20 rounded-lg p-4">
                          <h5 className="font-medium mb-2 flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-accent" />
                            <span>Risk Mitigation Strategy</span>
                          </h5>
                          <p className="text-sm text-muted-foreground">{item.riskMitigation}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProcurementPlan;
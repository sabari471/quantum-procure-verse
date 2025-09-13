import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Building, 
  Filter,
  Search,
  ExternalLink,
  Award,
  Clock,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const vendorData = [
  {
    id: 1,
    name: "PowerTech Solutions",
    category: "Electrical",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    experience: "15+ years",
    specialization: ["Transformers", "Switchgear", "Protection Systems"],
    email: "contact@powertech.in",
    phone: "+91 98765 43210",
    certifications: ["ISO 9001", "ISO 14001", "CE Certified"],
    recentProjects: 156,
    onTimeDelivery: 98,
    description: "Leading manufacturer of power transmission equipment with state-of-the-art manufacturing facilities.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "CableTech Industries",
    category: "Electrical",
    location: "Chennai, Tamil Nadu",
    rating: 4.6,
    experience: "12+ years",
    specialization: ["XLPE Cables", "Control Cables", "Fiber Optic"],
    email: "info@cabletech.co.in",
    phone: "+91 98765 43211",
    certifications: ["BIS Certified", "ISO 9001", "IEC Standards"],
    recentProjects: 203,
    onTimeDelivery: 95,
    description: "Premium cable manufacturer serving transmission and distribution sector across India.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "SteelWorks Industries",
    category: "Civil",
    location: "Pune, Maharashtra",
    rating: 4.7,
    experience: "20+ years",
    specialization: ["Steel Structures", "Fabrication", "Galvanizing"],
    email: "sales@steelworks.in",
    phone: "+91 98765 43212",
    certifications: ["ISO 3834", "AISC Certified", "AWS D1.1"],
    recentProjects: 89,
    onTimeDelivery: 97,
    description: "Heavy structural steel fabricator with advanced manufacturing capabilities and quality assurance.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 4,
    name: "ControlSys Pro",
    category: "Electrical",
    location: "Bangalore, Karnataka",
    rating: 4.9,
    experience: "10+ years",
    specialization: ["Control Panels", "SCADA", "Automation"],
    email: "hello@controlsys.pro",
    phone: "+91 98765 43213",
    certifications: ["UL Listed", "CE Marked", "ISO 9001"],
    recentProjects: 134,
    onTimeDelivery: 99,
    description: "Advanced control system integrator specializing in industrial automation and power system control.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 5,
    name: "ConcreteCorp Ltd",
    category: "Civil",
    location: "Delhi, NCR",
    rating: 4.4,
    experience: "18+ years",
    specialization: ["RCC Poles", "Precast Concrete", "Foundations"],
    email: "projects@concretecorp.in",
    phone: "+91 98765 43214",
    certifications: ["IS Certified", "Green Building", "Quality Mark"],
    recentProjects: 267,
    onTimeDelivery: 92,
    description: "Leading precast concrete manufacturer with sustainable construction solutions.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 6,
    name: "SafeEarth Solutions",
    category: "Safety",
    location: "Hyderabad, Telangana",
    rating: 4.5,
    experience: "8+ years",
    specialization: ["Earthing Systems", "Lightning Protection", "Grounding"],
    email: "info@safeearth.co.in",
    phone: "+91 98765 43215",
    certifications: ["IEEE Standards", "IEC 62305", "IS 3043"],
    recentProjects: 98,
    onTimeDelivery: 96,
    description: "Specialized earthing and lightning protection system provider for critical infrastructure.",
    avatar: "/api/placeholder/100/100"
  }
];

const VendorIdentification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  const filteredVendors = vendorData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === "all" || vendor.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesLocation = filterLocation === "all" || vendor.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

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
            <h1 className="text-4xl font-bold gradient-text mb-2">Vendor Identification</h1>
            <p className="text-muted-foreground">Discover and manage qualified suppliers for your projects</p>
          </div>
          <Button className="btn-3d flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Add New Vendor</span>
          </Button>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Vendors</p>
                  <p className="text-2xl font-bold">{filteredVendors.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
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
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">{(filteredVendors.reduce((sum, v) => sum + v.rating, 0) / filteredVendors.length).toFixed(1)}</p>
                </div>
                <Star className="w-8 h-8 text-warning" />
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
                  <p className="text-2xl font-bold">{[...new Set(filteredVendors.map(v => v.category))].length}</p>
                </div>
                <Building className="w-8 h-8 text-accent" />
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
                  <p className="text-sm font-medium text-muted-foreground">Avg Delivery</p>
                  <p className="text-2xl font-bold">{Math.round(filteredVendors.reduce((sum, v) => sum + v.onTimeDelivery, 0) / filteredVendors.length)}%</p>
                </div>
                <Clock className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters */}
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
                placeholder="Search vendors or specializations..."
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
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-48 bg-secondary/50 border-border/40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Vendor Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="card-3d p-6 cursor-pointer"
            onClick={() => setSelectedVendor(vendor)}
          >
            <div className="flex items-start space-x-4 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={vendor.avatar} alt={vendor.name} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {vendor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{vendor.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{vendor.experience}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Badge variant="secondary">{vendor.category}</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {vendor.specialization.slice(0, 2).map((spec) => (
                  <Badge key={spec} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
                {vendor.specialization.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{vendor.specialization.length - 2} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>{vendor.onTimeDelivery}% on-time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-accent" />
                  <span>{vendor.recentProjects} projects</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/20">
              <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Vendor Detail Modal */}
      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent className="max-w-2xl glass-card">
          {selectedVendor && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedVendor.avatar} alt={selectedVendor.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                      {selectedVendor.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl">{selectedVendor.name}</DialogTitle>
                    <DialogDescription className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedVendor.location}</span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-muted-foreground">{selectedVendor.description}</p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedVendor.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedVendor.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          <span className="text-sm font-medium">{selectedVendor.rating}/5.0</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">On-time Delivery</span>
                        <span className="text-sm font-medium">{selectedVendor.onTimeDelivery}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Projects Completed</span>
                        <span className="text-sm font-medium">{selectedVendor.recentProjects}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.specialization.map((spec: string) => (
                      <Badge key={spec} variant="secondary">{spec}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline" className="border-success text-success">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="btn-3d flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Vendor
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorIdentification;
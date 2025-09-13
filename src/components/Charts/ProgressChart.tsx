import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface ProgressItem {
  id: string;
  name: string;
  progress: number;
  target: number;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface ProgressChartProps {
  items: ProgressItem[];
  title?: string;
}

const ProgressChart = ({ items, title = "Progress Overview" }: ProgressChartProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'on-track': return 'bg-primary text-primary-foreground';
      case 'at-risk': return 'bg-warning text-warning-foreground';
      case 'delayed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-success" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-destructive" />;
      case 'stable': return <Activity className="w-3 h-3 text-muted-foreground" />;
      default: return <Activity className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'completed') return 'bg-success';
    if (status === 'delayed') return 'bg-destructive';
    if (status === 'at-risk') return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 rounded-lg border border-border/40 hover:border-border hover:bg-secondary/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    {getTrendIcon(item.trend)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{item.progress}%</div>
                  <div className="text-xs text-muted-foreground">
                    Target: {item.target}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="relative">
                  <Progress 
                    value={item.progress} 
                    className="h-3"
                  />
                  {/* Target indicator */}
                  <div 
                    className="absolute top-0 w-0.5 h-3 bg-foreground/60"
                    style={{ left: `${item.target}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span className="text-foreground font-medium">Target: {item.target}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Progress vs Target Analysis */}
              <div className="mt-3 p-2 rounded bg-secondary/20">
                <div className="text-xs">
                  {item.progress >= item.target ? (
                    <span className="text-success font-medium">
                      ✓ {item.progress - item.target}% ahead of target
                    </span>
                  ) : (
                    <span className="text-warning font-medium">
                      ⚠ {item.target - item.progress}% behind target
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
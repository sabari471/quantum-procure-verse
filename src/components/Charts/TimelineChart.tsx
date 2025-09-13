import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'active' | 'upcoming';
  description?: string;
  type: 'milestone' | 'task' | 'delivery';
}

interface TimelineChartProps {
  events: TimelineEvent[];
  title?: string;
}

const TimelineChart = ({ events, title = "Project Timeline" }: TimelineChartProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'active':
        return <Clock className="w-4 h-4 text-warning animate-pulse" />;
      case 'upcoming':
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'active': return 'bg-warning';
      case 'upcoming': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative flex items-start space-x-4"
              >
                {/* Timeline Dot */}
                <div className={`relative z-10 w-3 h-3 rounded-full ${getStatusColor(event.status)} shadow-sm`} />
                
                {/* Event Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(event.status)}
                      <Badge variant="outline" className="text-xs">
                        {new Date(event.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  )}
                  <Badge 
                    variant={
                      event.status === 'completed' ? 'default' : 
                      event.status === 'active' ? 'secondary' : 
                      'outline'
                    }
                    className="text-xs mt-2"
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineChart;
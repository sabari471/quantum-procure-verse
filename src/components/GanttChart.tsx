import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Calendar } from "lucide-react";

interface GanttTask {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  progress: number;
  status: 'completed' | 'active' | 'pending';
  color: string;
  dependencies?: number[];
  critical?: boolean;
}

interface GanttChartProps {
  tasks: GanttTask[];
  title?: string;
  showControls?: boolean;
}

const GanttChart = ({ tasks, title = "Project Schedule", showControls = true }: GanttChartProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);

  // Calculate date range
  const allDates = tasks.flatMap(task => [new Date(task.startDate), new Date(task.endDate)]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  // Calculate total project duration in days
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayWidth = Math.max(20, 30 * zoomLevel);
  const chartWidth = totalDays * dayWidth;

  // Generate month headers
  const months = [];
  const currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    months.push({
      name: currentDate.toLocaleString('default', { month: 'short', year: 'numeric' }),
      startDay: Math.floor((currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)),
      days: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // Calculate task positions
  const getTaskPosition = (task: GanttTask) => {
    const startDay = Math.floor((new Date(task.startDate).getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const width = task.duration * dayWidth;
    return { left: startDay * dayWidth, width };
  };

  const getStatusColor = (status: string, critical = false) => {
    if (critical) return '#ef4444'; // Red for critical path
    switch (status) {
      case 'completed': return '#10b981'; // Green
      case 'active': return '#f59e0b'; // Orange
      case 'pending': return '#6b7280'; // Gray
      default: return '#6b7280';
    }
  };

  return (
    <Card className="card-3d w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{title}</span>
          </CardTitle>
          {showControls && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                disabled={zoomLevel >= 2}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Month Headers */}
          <div className="flex border-b border-border mb-4 pb-2" style={{ minWidth: chartWidth + 200 }}>
            <div className="w-48 flex-shrink-0"></div>
            <div className="flex-1 relative">
              {months.map((month, index) => (
                <div
                  key={index}
                  className="absolute top-0 text-sm font-medium text-muted-foreground"
                  style={{
                    left: month.startDay * dayWidth,
                    width: Math.min(month.days * dayWidth, chartWidth - month.startDay * dayWidth)
                  }}
                >
                  {month.name}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="relative" style={{ minWidth: chartWidth + 200 }}>
            {/* Vertical grid lines for months */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-48 flex-shrink-0"></div>
              <div className="flex-1 relative h-full">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className="absolute top-0 bottom-0 border-l border-border/30"
                    style={{ left: month.startDay * dayWidth }}
                  />
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {tasks.map((task, index) => {
                const position = getTaskPosition(task);
                const isHovered = hoveredTask === task.id;

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center"
                    onMouseEnter={() => setHoveredTask(task.id)}
                    onMouseLeave={() => setHoveredTask(null)}
                  >
                    {/* Task Label */}
                    <div className="w-48 flex-shrink-0 pr-4">
                      <div className="text-sm font-medium truncate">{task.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={
                            task.status === 'completed' ? 'default' : 
                            task.status === 'active' ? 'secondary' : 
                            'outline'
                          }
                          className="text-xs"
                        >
                          {task.status}
                        </Badge>
                        {task.critical && (
                          <Badge variant="destructive" className="text-xs">
                            Critical
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Gantt Bar */}
                    <div className="flex-1 relative h-12 flex items-center">
                      <motion.div
                        className="relative h-8 rounded-lg shadow-sm transition-all duration-200"
                        style={{
                          left: position.left,
                          width: position.width,
                          backgroundColor: getStatusColor(task.status, task.critical),
                          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Progress Fill */}
                        <div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `linear-gradient(to right, ${getStatusColor(task.status, task.critical)} 0%, ${getStatusColor(task.status, task.critical)} ${task.progress}%, rgba(255,255,255,0.3) ${task.progress}%, rgba(255,255,255,0.3) 100%)`,
                          }}
                        />
                        
                        {/* Task Name on Bar */}
                        <div className="absolute inset-0 flex items-center px-2">
                          <span className="text-white text-xs font-medium truncate">
                            {task.name}
                          </span>
                        </div>

                        {/* Progress Percentage */}
                        <div className="absolute -top-6 left-0 text-xs text-muted-foreground">
                          {task.progress}%
                        </div>

                        {/* Hover Tooltip */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground p-2 rounded-lg shadow-lg border text-xs whitespace-nowrap z-10"
                          >
                            <div className="font-medium">{task.name}</div>
                            <div>Duration: {task.duration} days</div>
                            <div>Start: {task.startDate}</div>
                            <div>End: {task.endDate}</div>
                            <div>Progress: {task.progress}%</div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Critical Path</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
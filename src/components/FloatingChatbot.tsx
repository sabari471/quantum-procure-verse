import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your procurement assistant. I can help you with vendor information, delivery timelines, cost analysis, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("vendor") || lowerInput.includes("supplier")) {
      return "I can help you find vendors! We have partnerships with 150+ verified suppliers across electrical, civil, and mechanical categories. Would you like me to show vendors for a specific material?";
    }
    
    if (lowerInput.includes("delivery") || lowerInput.includes("timeline")) {
      return "Delivery timelines vary by material: Transformers (6-8 weeks), Cables (2-3 weeks), Cement (1-2 weeks). Which specific material are you asking about?";
    }
    
    if (lowerInput.includes("cost") || lowerInput.includes("price")) {
      return "I can provide cost analysis for any material in our database. Current market trends show 5% increase in steel prices and 3% decrease in cable costs. What specific cost information do you need?";
    }
    
    if (lowerInput.includes("transformer")) {
      return "For transformers, I recommend: PowerTech Solutions (Mumbai) - 6 weeks delivery, TechElectric Corp (Delhi) - 7 weeks delivery. Both are pre-qualified vendors with excellent track records.";
    }
    
    return "I understand you're asking about procurement. I can help with vendor selection, delivery timelines, cost estimates, material specifications, and approval workflows. Could you be more specific about what you need?";
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-card rounded-2xl shadow-depth z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Procurement Assistant</h3>
                  <p className="text-xs text-muted-foreground">AI-powered helper</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="hover:bg-secondary/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 text-sm ${
                        message.isBot
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-gradient-primary text-primary-foreground shadow-glow"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border/20">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about vendors, costs, timelines..."
                  className="flex-1 bg-secondary/50 border-border/40"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-primary hover:shadow-glow"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-primary shadow-glow hover:shadow-depth transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary-foreground" />
            ) : (
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </>
  );
};

export default FloatingChatbot;
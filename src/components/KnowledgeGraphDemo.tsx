import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
  active: boolean;
}

export const KnowledgeGraphDemo = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, x: 20, y: 30, label: "Newton's Laws", active: false },
    { id: 2, x: 60, y: 20, label: "Force = Mass × Acceleration", active: false },
    { id: 3, x: 40, y: 60, label: "Action-Reaction", active: false },
    { id: 4, x: 80, y: 50, label: "Inertia", active: false },
    { id: 5, x: 15, y: 70, label: "Motion", active: false },
    { id: 6, x: 70, y: 80, label: "Velocity", active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => 
        prev.map(node => ({
          ...node,
          active: Math.random() > 0.7
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      className="relative h-64 bg-gradient-secondary overflow-hidden backdrop-blur-md bg-white/10 shadow-lg border border-green-400/20"
      style={{ borderWidth: '0.5px' }}
    >
      <div className="absolute inset-0 p-4">
        <div className="relative w-full h-full">
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(166, 76%, 37%)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <line x1="20%" y1="30%" x2="60%" y2="20%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="60%" y1="20%" x2="80%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="20%" y1="30%" x2="40%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="40%" y1="60%" x2="15%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="80%" y1="50%" x2="70%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" />
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                node.active 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-40 scale-100'
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-500 ${
                node.active
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white border-green-400 shadow-glow'
                  : 'bg-background/20 text-gray-400 border-border'
              }`}>
                {node.label}
              </div>
            </div>
          ))}
          
          {/* Floating particles */}
          <div className="absolute top-4 right-8 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
          <div className="absolute bottom-12 left-12 w-1 h-1 bg-primary rounded-full animate-pulse opacity-40" style={{animationDelay: '0.5s'}} />
          <div className="absolute top-16 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}} />
        </div>
      </div>
      
      <div className="absolute bottom-2 left-4 text-xs text-gray-400">
        Knowledge graph lights up as you speak...
      </div>
    </Card>
  );
};
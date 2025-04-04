
import React, { useState } from 'react';
import { Code, Calendar, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ComingSoonFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: string;
}

const ComingSoonFeatures: React.FC = () => {
  const { toast } = useToast();
  const [preordered, setPreordered] = useState<string[]>([]);

  const features: ComingSoonFeature[] = [
    {
      id: 'intent-training',
      name: 'Intent Training Studio',
      description: 'Entrena tú mismo los flujos de tu Xelia con una interfaz visual y control total del lenguaje.',
      icon: <Code className="h-5 w-5" />,
      price: '199€'
    },
    {
      id: 'rescheduling-flow',
      name: 'Rescheduling Smart Flow',
      description: 'Xelia reagenda automáticamente con base en la disponibilidad real de tus clientes.',
      icon: <Calendar className="h-5 w-5" />,
      price: '149€'
    },
    {
      id: 'passkey-database',
      name: 'Passkey Database Access',
      description: 'Permite a usuarios autenticados consultar o editar datos por voz con máxima seguridad.',
      icon: <Key className="h-5 w-5" />,
      price: '249€'
    }
  ];

  const handlePreorder = (featureId: string, featureName: string) => {
    if (preordered.includes(featureId)) return;
    
    setPreordered(prev => [...prev, featureId]);
    toast({
      title: "Precontratación exitosa",
      description: `Has precontratado ${featureName}. Te notificaremos cuando esté disponible.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature) => {
        const isPreordered = preordered.includes(feature.id);
        return (
          <Card 
            key={feature.id} 
            className="bg-gray-800/60 border border-gray-700 hover:border-gray-600 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Premium spotlight effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-xelia-accent/0 via-xelia-accent/5 to-xelia-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <span className="p-2 rounded-md bg-gray-700 text-xelia-accent">
                  {feature.icon}
                </span>
                <Badge variant="outline" className="border-amber-500 text-amber-400 bg-amber-500/10">
                  Coming Soon
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-white mt-3">{feature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 min-h-[80px]">{feature.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t border-gray-700 pt-4">
              <p className="text-xelia-accent font-semibold">{feature.price}</p>
              <Button 
                variant={isPreordered ? "outline" : "default"}
                className={isPreordered 
                  ? "border-green-600 text-green-400 hover:text-green-500" 
                  : "bg-xelia-accent hover:bg-xelia-accent/90"
                }
                onClick={() => handlePreorder(feature.id, feature.name)}
                disabled={isPreordered}
              >
                {isPreordered ? "Precontratado" : "Precontratar"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ComingSoonFeatures;

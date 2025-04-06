
import React, { useState } from 'react';
import { Code, Calendar, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

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

  const handlePreorder = (featureId: string, featureName: string, price: string) => {
    if (preordered.includes(featureId)) return;
    
    setPreordered(prev => [...prev, featureId]);
    toast({
      title: "Precontratación exitosa",
      description: (
        <div className="flex flex-col gap-2">
          <p>Has precontratado {featureName}. Te notificaremos cuando esté disponible.</p>
          <p className="flex items-center text-amber-500 font-medium">
            <AlertCircle className="h-4 w-4 mr-1" />
            El cargo de {price} se realizará automáticamente cuando la funcionalidad esté disponible.
          </p>
        </div>
      ),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature) => {
        const isPreordered = preordered.includes(feature.id);
        return (
          <Card 
            key={feature.id} 
            className="bg-white border border-xelia-gray-light hover:border-xelia-gray-medium transition-all duration-300 relative overflow-hidden group hover:shadow-md"
          >
            {/* Premium spotlight effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-xelia-accent/0 via-xelia-accent/5 to-xelia-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <span className="p-2 rounded-md bg-white border border-xelia-gray-light text-xelia-accent">
                  {feature.icon}
                </span>
                <Badge variant="outline" className="border-amber-500 text-amber-400 bg-amber-500/10">
                  Coming Soon
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-xelia-gray-dark mt-3">{feature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xelia-gray-dark min-h-[80px]">{feature.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t border-xelia-gray-light pt-4">
              <p className="text-xelia-accent font-semibold">{feature.price}</p>
              <Button 
                variant={isPreordered ? "outline" : "default"}
                className={isPreordered 
                  ? "border-green-600 text-green-400 hover:text-green-500" 
                  : "bg-xelia-accent text-white hover:bg-xelia-accent-dark"
                }
                onClick={() => handlePreorder(feature.id, feature.name, feature.price)}
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

import React from 'react';
import { PencilLine, CreditCard, Package, Timer, Users, Calendar, UserPlus, Activity, Gift, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Separator } from '@/components/ui/separator';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
  active?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, comingSoon = false, active = false }) => {
  return (
    <div className={cn(
      "flex items-start space-x-3 p-4 rounded-md hover:bg-xelia-light transition-colors duration-200",
      active ? "bg-xelia-light" : "bg-transparent",
      comingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    )}>
      <div className="w-8 h-8 rounded-full bg-xelia-accent/10 flex items-center justify-center text-xelia-accent">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-xelia-gray-dark">{title}</h3>
        <p className="text-xs text-xelia-gray-medium">{description}</p>
        {comingSoon && <span className="text-xs text-xelia-accent">Próximamente</span>}
      </div>
    </div>
  );
};

const CustomConfiguration: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-xelia-gray-dark mb-4">
        Elige las funcionalidades de tu Xelia
      </h2>
      <p className="text-sm text-xelia-gray-medium mb-6">
        Selecciona las funcionalidades que quieres que tenga tu Xelia. Puedes
        activar o desactivar funcionalidades en cualquier momento.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureItem
          icon={<PencilLine size={20} />}
          title="Personalización del flujo de conversación"
          description="Define el flujo de conversación de tu Xelia."
        />
        <FeatureItem
          icon={<CreditCard size={20} />}
          title="Integración con sistemas de pago"
          description="Integra tu Xelia con sistemas de pago."
          comingSoon
        />
        <FeatureItem
          icon={<Package size={20} />}
          title="Gestión de envíos"
          description="Gestiona los envíos de tus productos."
          comingSoon
        />
        <FeatureItem
          icon={<Timer size={20} />}
          title="Recordatorios de citas"
          description="Envía recordatorios de citas a tus clientes."
        />
        <FeatureItem
          icon={<Users size={20} />}
          title="Gestión de clientes"
          description="Gestiona tus clientes desde tu Xelia."
        />
        <FeatureItem
          icon={<Calendar size={20} />}
          title="Integración con calendarios"
          description="Integra tu Xelia con calendarios."
          comingSoon
        />
        <FeatureItem
          icon={<UserPlus size={20} />}
          title="Programa de referidos"
          description="Crea un programa de referidos para tus clientes."
          comingSoon
        />
        <FeatureItem
          icon={<Activity size={20} />}
          title="Analíticas avanzadas"
          description="Obtén analíticas avanzadas de tu Xelia."
          comingSoon
        />
        <FeatureItem
          icon={<Gift size={20} />}
          title="Programa de lealtad"
          description="Crea un programa de lealtad para tus clientes."
          comingSoon
        />
        <FeatureItem
          icon={<CheckCircle2 size={20} />}
          title="Automatización de tareas"
          description="Automatiza tareas repetitivas."
        />
      </div>

      <Separator className="my-6" />

      <div className="text-center">
        <p className="text-sm text-xelia-gray-medium">
          ¿Necesitas alguna funcionalidad en especial?{" "}
          <a href="#" className="text-xelia-accent hover:underline">
            ¡Contáctanos!
          </a>
        </p>
      </div>
    </div>
  );
};

export default CustomConfiguration;

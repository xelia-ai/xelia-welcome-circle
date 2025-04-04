
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CircleCheck, Bot, Settings, Building2, Globe, Zap, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IndustrySelection from '@/components/configuration/IndustrySelection';
import WebsiteInput from '@/components/configuration/WebsiteInput';
import CapabilitiesSelection from '@/components/configuration/CapabilitiesSelection';
import IntegrationsSelection from '@/components/configuration/IntegrationsSelection';
import Summary from '@/components/configuration/Summary';
import AgentTypeSelection from '@/components/configuration/AgentTypeSelection';
import AgentPreview from '@/components/configuration/AgentPreview';

type ConfigStep = 'agent-type' | 'industry' | 'website' | 'capabilities' | 'integrations' | 'summary';

const stepInfo = {
  'agent-type': {
    title: 'Elige el tipo de agente',
    description: 'Selecciona el tipo de agente IA que mejor se adapte a tus necesidades.',
    icon: <Bot className="w-5 h-5" />
  },
  'industry': {
    title: 'Selecciona tu industria',
    description: 'Personaliza tu agente según tu industria para obtener mejores resultados.',
    icon: <Building2 className="w-5 h-5" />
  },
  'website': {
    title: 'Ingresa tu sitio web',
    description: 'Xelia analizará tu sitio web para ofrecer mejores respuestas.',
    icon: <Globe className="w-5 h-5" />
  },
  'capabilities': {
    title: 'Selecciona las capacidades',
    description: 'Elige las funcionalidades que necesita tu agente de IA.',
    icon: <Zap className="w-5 h-5" />
  },
  'integrations': {
    title: 'Configura integraciones',
    description: 'Conecta Xelia con tus herramientas y sistemas existentes.',
    icon: <Link className="w-5 h-5" />
  },
  'summary': {
    title: 'Resumen de configuración',
    description: 'Revisa tu configuración antes de finalizar.',
    icon: <Settings className="w-5 h-5" />
  }
};

const Configure = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<ConfigStep>('agent-type');
  const [config, setConfig] = useState({
    agentType: '',
    industry: '',
    industryName: '',
    website: '',
    capabilities: [] as string[],
    integrations: [] as string[]
  });

  const updateConfig = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const goToNextStep = () => {
    switch (currentStep) {
      case 'agent-type':
        setCurrentStep('industry');
        break;
      case 'industry':
        setCurrentStep('website');
        break;
      case 'website':
        setCurrentStep('capabilities');
        break;
      case 'capabilities':
        setCurrentStep('integrations');
        break;
      case 'integrations':
        setCurrentStep('summary');
        break;
      case 'summary':
        // Finish configuration and go to demo
        navigate('/demo');
        break;
    }
  };

  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'industry':
        setCurrentStep('agent-type');
        break;
      case 'website':
        setCurrentStep('industry');
        break;
      case 'capabilities':
        setCurrentStep('website');
        break;
      case 'integrations':
        setCurrentStep('capabilities');
        break;
      case 'summary':
        setCurrentStep('integrations');
        break;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'agent-type':
        return !!config.agentType;
      case 'industry':
        return !!config.industry;
      case 'website':
        return !!config.website;
      case 'capabilities':
        return config.capabilities.length > 0;
      case 'integrations':
        return true; // Integrations are optional
      case 'summary':
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'agent-type':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AgentTypeSelection 
                selectedType={config.agentType} 
                onSelect={(type) => updateConfig('agentType', type)} 
              />
            </div>
            <div className="h-full">
              {config.agentType && (
                <AgentPreview 
                  agentType={config.agentType}
                  industry={config.industry}
                  capabilities={config.capabilities}
                />
              )}
            </div>
          </div>
        );
      case 'industry':
        return (
          <div>
            <IndustrySelection 
              selectedIndustry={config.industry} 
              onSelect={(id, name) => {
                updateConfig('industry', id);
                updateConfig('industryName', name);
              }}
            />
            {config.industry && config.agentType && (
              <div className="mt-6 md:hidden">
                <AgentPreview 
                  agentType={config.agentType}
                  industry={config.industry}
                  capabilities={config.capabilities}
                />
              </div>
            )}
          </div>
        );
      case 'website':
        return <WebsiteInput 
          website={config.website} 
          onChange={(value) => updateConfig('website', value)} 
        />;
      case 'capabilities':
        return <CapabilitiesSelection 
          selectedCapabilities={config.capabilities} 
          onChange={(capabilities) => updateConfig('capabilities', capabilities)} 
        />;
      case 'integrations':
        return <IntegrationsSelection 
          selectedIntegrations={config.integrations} 
          onChange={(integrations) => updateConfig('integrations', integrations)} 
        />;
      case 'summary':
        return <Summary 
          config={config} 
          onEdit={(step: ConfigStep) => setCurrentStep(step)} 
        />;
      default:
        return null;
    }
  };

  const getStepNumber = () => {
    const steps: ConfigStep[] = ['agent-type', 'industry', 'website', 'capabilities', 'integrations', 'summary'];
    return steps.indexOf(currentStep) + 1;
  };

  const totalSteps = 6;
  const progress = ((getStepNumber() - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-xelia-dark via-xelia-dark to-xelia-light py-8 px-4 sm:px-6">
      <div className="max-w-5xl w-full mx-auto flex flex-col flex-grow">
        {/* Header with step info */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-xelia-accent/20 flex items-center justify-center mr-3">
              {stepInfo[currentStep].icon}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">{stepInfo[currentStep].title}</h1>
              <p className="text-gray-400 text-sm">{stepInfo[currentStep].description}</p>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['Tipo', 'Industria', 'Web', 'Capacidades', 'Integraciones', 'Resumen'].map((label, index) => (
              <div 
                key={label} 
                className={`text-xs font-medium ${getStepNumber() > index + 1 ? 'text-xelia-accent' : 
                  getStepNumber() === index + 1 ? 'text-white' : 'text-gray-500'}`}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="w-full bg-xelia-light h-2 rounded-full overflow-hidden">
            <div 
              className="bg-xelia-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Main content area */}
        <div className="frosted-glass rounded-xl p-6 flex-grow mb-6">
          <div className="h-full">
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <div>
            <Button 
              variant="outline" 
              onClick={goToPreviousStep}
              disabled={currentStep === 'agent-type'}
              className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} />
              Anterior
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            Paso {getStepNumber()} de {totalSteps}
          </div>
          
          <div>
            <Button 
              onClick={goToNextStep}
              disabled={!canProceed()}
              className={`flex items-center gap-2 ${
                canProceed() 
                  ? 'bg-xelia-accent hover:bg-xelia-accent-dark shadow-accent' 
                  : 'bg-xelia-accent/50 cursor-not-allowed'
              }`}
            >
              {currentStep === 'summary' ? 'Finalizar' : 'Siguiente'}
              {currentStep === 'summary' ? <Check size={16} /> : <ArrowRight size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configure;

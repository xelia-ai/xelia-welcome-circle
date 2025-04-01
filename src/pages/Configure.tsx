
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IndustrySelection from '@/components/configuration/IndustrySelection';
import WebsiteInput from '@/components/configuration/WebsiteInput';
import CapabilitiesSelection from '@/components/configuration/CapabilitiesSelection';
import IntegrationsSelection from '@/components/configuration/IntegrationsSelection';
import Summary from '@/components/configuration/Summary';

type ConfigStep = 'industry' | 'website' | 'capabilities' | 'integrations' | 'summary';

const Configure = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<ConfigStep>('industry');
  const [config, setConfig] = useState({
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
      case 'industry':
        return <IndustrySelection 
          selectedIndustry={config.industry} 
          onSelect={(id, name) => {
            updateConfig('industry', id);
            updateConfig('industryName', name);
          }}
        />;
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
    switch (currentStep) {
      case 'industry': return 1;
      case 'website': return 2;
      case 'capabilities': return 3;
      case 'integrations': return 4;
      case 'summary': return 5;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-xelia-dark to-xelia-light p-6">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-grow">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['Industria', 'Sitio Web', 'Capacidades', 'Integraciones', 'Resumen'].map((label, index) => (
              <div 
                key={label} 
                className={`text-xs font-medium ${getStepNumber() > index + 1 ? 'text-xelia-accent' : 
                  getStepNumber() === index + 1 ? 'text-white' : 'text-gray-500'}`}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div 
              className="bg-xelia-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${(getStepNumber() - 1) * 25}%` }}
            ></div>
          </div>
        </div>

        {/* Main content area */}
        <div className="bg-xelia-light rounded-xl p-6 shadow-lg flex-grow mb-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            {currentStep === 'industry' && 'Selecciona tu industria'}
            {currentStep === 'website' && 'Ingresa tu sitio web'}
            {currentStep === 'capabilities' && 'Selecciona las capacidades'}
            {currentStep === 'integrations' && 'Configura integraciones'}
            {currentStep === 'summary' && 'Resumen de configuración'}
          </h1>

          <div className="flex flex-row gap-6">
            <div className="flex-grow">
              {renderStepContent()}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            disabled={currentStep === 'industry'}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Anterior
          </Button>
          
          <Button 
            onClick={goToNextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-xelia-accent hover:bg-xelia-accent/90"
          >
            {currentStep === 'summary' ? 'Finalizar' : 'Siguiente'}
            {currentStep === 'summary' ? <Check size={16} /> : <ArrowRight size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Configure;


import { useState, useEffect } from 'react';

interface UseConnectionProps {
  connectionType?: 'whatsapp' | 'calendar' | 'other';
  selectedIntegrations: string[];
  onIntegrationSelect: (integrationId: string) => void;
}

export const useConnection = ({ 
  connectionType, 
  selectedIntegrations, 
  onIntegrationSelect 
}: UseConnectionProps) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');

  const isConnected = () => {
    if (connectionType === 'whatsapp') {
      return selectedIntegrations.includes('whatsapp');
    } else if (connectionType === 'calendar') {
      return selectedIntegrations.some(int => 
        ['google-calendar', 'outlook', 'calendly', 'flireo'].includes(int)
      );
    } else if (selectedIntegration) {
      return selectedIntegrations.includes(selectedIntegration);
    }
    return false;
  };

  useEffect(() => {
    if (connectionType === 'calendar') {
      const calendarIntegrations = ['google-calendar', 'outlook', 'calendly', 'flireo'];
      const found = selectedIntegrations.find(int => calendarIntegrations.includes(int));
      if (found) {
        setSelectedIntegration(found);
      }
    }
  }, [connectionType, selectedIntegrations]);

  const handleConnect = () => {
    const connected = isConnected();
    
    if (connected) {
      if (connectionType === 'whatsapp') {
        onIntegrationSelect('whatsapp');
        setPhoneNumber('');
      } else if (selectedIntegration) {
        onIntegrationSelect(selectedIntegration);
        setSelectedIntegration('');
      }
      return;
    }
    
    setConnecting(true);
    
    setTimeout(() => {
      setConnecting(false);
      
      if (connectionType === 'whatsapp') {
        onIntegrationSelect('whatsapp');
      } else if (selectedIntegration) {
        onIntegrationSelect(selectedIntegration);
      }
    }, 1000);
  };

  const handleSelectIntegration = (value: string) => {
    if (connectionType === 'calendar') {
      const calendarIntegrations = ['google-calendar', 'outlook', 'calendly', 'flireo'];
      calendarIntegrations.forEach(int => {
        if (selectedIntegrations.includes(int)) {
          onIntegrationSelect(int);
        }
      });
    }
    setSelectedIntegration(value);
  };

  return {
    connecting,
    phoneNumber,
    setPhoneNumber,
    selectedIntegration,
    handleSelectIntegration,
    handleConnect,
    isConnected
  };
};

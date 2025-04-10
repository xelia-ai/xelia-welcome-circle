
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PricingSummary from './PricingSummary';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess: () => void;
  config: {
    industryCount: number;
    capabilitiesPrice: number;
    basePrice: number;
    industryPrice: number;
    totalPrice: number;
  };
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  onPaymentSuccess,
  config
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-xelia-light border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Completa tu pago</DialogTitle>
          <DialogDescription className="text-gray-300">
            Activa tu agente Xelia con funcionalidades personalizadas.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <PricingSummary 
            basePrice={config.basePrice}
            industryCount={config.industryCount}
            industryPrice={config.industryPrice}
            capabilitiesPrice={config.capabilitiesPrice}
            totalPrice={config.totalPrice}
          />
          
          {/* Simulated Stripe payment form */}
          <div className="bg-white/5 p-4 rounded-lg space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300 block">Número de tarjeta</label>
              <div className="bg-white/10 p-2 rounded border border-gray-600 text-gray-400">
                4242 4242 4242 4242
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm text-gray-300 block">Fecha de expiración</label>
                <div className="bg-white/10 p-2 rounded border border-gray-600 text-gray-400">
                  12/25
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm text-gray-300 block">CVC</label>
                <div className="bg-white/10 p-2 rounded border border-gray-600 text-gray-400">
                  123
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            className="bg-xelia-accent hover:bg-xelia-accent/90 w-full"
            onClick={onPaymentSuccess}
          >
            Completar pago
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;

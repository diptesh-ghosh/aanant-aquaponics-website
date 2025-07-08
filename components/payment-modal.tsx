'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Shield,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function PaymentModal({ open, onOpenChange, onClose }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate Razorpay integration
      const options = {
        key: 'rzp_test_1234567890', // Replace with actual Razorpay key
        amount: total * 100, // Amount in paise
        currency: 'INR',
        name: 'Aanant Aquaponics Academy',
        description: 'Course Purchase',
        order_id: `order_${Date.now()}`,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: '+919876543210'
        },
        theme: {
          color: '#15803d'
        },
        handler: function (response: any) {
          // Payment successful
          setIsSuccess(true);
          setTimeout(() => {
            clearCart();
            onClose();
            setIsSuccess(false);
            toast.success('Payment successful! Welcome to Aanant Academy!');
          }, 2000);
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would use:
      // const rzp = new (window as any).Razorpay(options);
      // rzp.open();
      
      // For demo purposes, we'll simulate success
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        onClose();
        setIsSuccess(false);
        toast.success('Payment successful! Welcome to Aanant Academy!');
      }, 2000);

    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Welcome to Aanant Aquaponics Academy. Your courses are now available in your dashboard.
            </p>
            <div className="animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
              <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Secure Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p className="text-xs text-gray-500 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit/Debit Card</span>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                    paymentMethod === 'upi' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>UPI</span>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                    paymentMethod === 'netbanking' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span>Net Banking</span>
                </button>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue={user?.name}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@paytm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Secure Payment
                </span>
              </div>
              <p className="text-xs text-green-700">
                Your payment information is encrypted and secure. 
                Powered by Razorpay with bank-level security.
              </p>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-green-700 hover:bg-green-800 text-white"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay ₹{total.toLocaleString()}
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingCart,
  CreditCard,
  Gift
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { PaymentModal } from '@/components/payment-modal';
import { AuthModal } from '@/components/auth-modal';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { items, removeItem, updateQuantity, total, savings, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return '📚';
      case 'bundle':
        return '📦';
      case 'physical':
        return '🔧';
      default:
        return '📄';
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping Cart ({items.length})
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add some courses or equipment to get started
                  </p>
                  <Button onClick={() => onOpenChange(false)}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {getItemTypeIcon(item.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {item.description}
                              </p>
                              <Badge variant="outline" className="mt-2 text-xs">
                                {item.type}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </div>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <div className="text-xs text-gray-500 line-through">
                                  ₹{(item.originalPrice * item.quantity).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="border-t pt-6 space-y-4">
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-green-700">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        <span className="text-sm font-medium">Total Savings</span>
                      </div>
                      <span className="font-medium">
                        ₹{savings.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-700 hover:bg-green-800"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => onOpenChange(false)}
                    >
                      Continue Shopping
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full text-red-600 hover:text-red-700"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="text-center text-xs text-gray-500 pt-4">
                    🔒 Secure checkout powered by Razorpay
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Payment Modal */}
      <PaymentModal 
        open={isPaymentModalOpen} 
        onOpenChange={setIsPaymentModalOpen}
        onClose={() => onOpenChange(false)}
      />

      {/* Auth Modal */}
      <AuthModal 
        open={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen} 
      />
    </>
  );
}
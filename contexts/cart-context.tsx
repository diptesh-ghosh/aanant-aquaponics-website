'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './auth-context';

export interface CartItem {
  id: string;
  type: 'course' | 'bundle' | 'physical';
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  quantity: number;
  metadata?: {
    // Course/Bundle metadata
    duration?: string;
    level?: string;
    includes?: string[];
    // Physical product metadata
    unit?: string;
    farmer?: string;
    aqiCertified?: boolean;
    currentAQI?: number;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, initialQuantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  savings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    // Load cart items from localStorage for non-authenticated users
    if (!user) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
      return;
    }
    
    // Load cart items from Supabase for authenticated users
    const fetchCartItems = async () => {
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select(`
            id,
            quantity,
            products:product_id (id, name, price, original_price, description, images, category),
            produce:produce_id (id, item_name, price, original_price, description, image, category, unit)
          `)
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error fetching cart items:', error);
          return;
        }
        
        if (data) {
          // Transform the data to match CartItem interface
          const cartItems: CartItem[] = data.map(item => {
            if (item.products) {
              return {
                id: item.products.id,
                type: 'physical',
                name: item.products.name,
                price: item.products.price,
                originalPrice: item.products.original_price,
                image: item.products.images?.[0] || '',
                description: item.products.description,
                quantity: item.quantity,
                metadata: {
                  category: item.products.category
                }
              };
            } else if (item.produce) {
              return {
                id: item.produce.id,
                type: 'physical',
                name: item.produce.item_name,
                price: item.produce.price,
                originalPrice: item.produce.original_price,
                image: item.produce.image || '',
                description: item.produce.description,
                quantity: item.quantity,
                metadata: {
                  unit: item.produce.unit,
                  category: item.produce.category
                }
              };
            }
            
            // Fallback (should never happen)
            return {
              id: item.id,
              type: 'physical',
              name: 'Unknown Item',
              price: 0,
              image: '',
              description: '',
              quantity: item.quantity
            };
          });
          
          setItems(cartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    
    fetchCartItems();
  }, [user, supabase]);

  useEffect(() => {
    // Save cart items to localStorage for non-authenticated users
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(items));
      return;
    }
    
    // No need to save to localStorage for authenticated users as we're using Supabase
  }, [items, user]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>, initialQuantity: number = 1) => {
    if (!user) {
      // For non-authenticated users, store in local state
      setItems(prev => {
        const existingItem = prev.find(item => item.id === newItem.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + initialQuantity }
              : item
          );
        }
        return [...prev, { ...newItem, quantity: initialQuantity }];
      });
      return;
    }
    
    // For authenticated users, store in Supabase
    const addToCart = async () => {
      try {
        // Check if item already exists in cart
        const { data: existingItems } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .eq(newItem.type === 'physical' ? 'product_id' : 'produce_id', newItem.id);
        
        if (existingItems && existingItems.length > 0) {
          // Update quantity of existing item
          await supabase
            .from('cart_items')
            .update({ quantity: existingItems[0].quantity + initialQuantity })
            .eq('id', existingItems[0].id);
        } else {
          // Insert new item
          await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: newItem.type === 'physical' ? newItem.id : null,
              produce_id: newItem.type === 'physical' ? null : newItem.id,
              quantity: initialQuantity
            });
        }
        
        // Update local state
        setItems(prev => {
          const existingItem = prev.find(item => item.id === newItem.id);
          if (existingItem) {
            return prev.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + initialQuantity }
                : item
            );
          }
          return [...prev, { ...newItem, quantity: initialQuantity }];
        });
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    };
    
    addToCart();
  };

  const removeItem = (id: string) => {
    if (!user) {
      // For non-authenticated users, update local state
      setItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    
    // For authenticated users, remove from Supabase
    const removeFromCart = async () => {
      try {
        // Find if it's a product or produce
        const item = items.find(item => item.id === id);
        if (!item) return;
        
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq(item.type === 'physical' ? 'product_id' : 'produce_id', id);
        
        // Update local state
        setItems(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    };
    
    removeFromCart();
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    if (!user) {
      // For non-authenticated users, update local state
      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
      return;
    }
    
    // For authenticated users, update in Supabase
    const updateCartItem = async () => {
      try {
        // Find if it's a product or produce
        const item = items.find(item => item.id === id);
        if (!item) return;
        
        const { data: cartItems } = await supabase
          .from('cart_items')
          .select('id')
          .eq('user_id', user.id)
          .eq(item.type === 'physical' ? 'product_id' : 'produce_id', id);
        
        if (cartItems && cartItems.length > 0) {
          await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', cartItems[0].id);
          
          // Update local state
          setItems(prev =>
            prev.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
          );
        }
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
      }
    };
    
    updateCartItem();
  };

  const clearCart = () => {
    if (!user) {
      // For non-authenticated users, clear local state
      setItems([]);
      localStorage.removeItem('cart');
      return;
    }
    
    // For authenticated users, clear from Supabase
    const clearUserCart = async () => {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
        
        // Update local state
        setItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    };
    
    clearUserCart();
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = items.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const savings = originalTotal - total;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount,
      savings
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
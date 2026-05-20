import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext<any>(null);

const initialPastOrders = [
  {
    id: "ord-102",
    restaurant: "Hyderabadi Dum Biryani Palace",
    date: "19 May 2026, 09:12 PM",
    items: "1x Hyderabadi Dum Biryani, 1x Double Chocolate Pastry",
    price: 495,
    status: "Delivered",
    statusColor: "#10B981",
    statusIcon: "checkmark-circle-outline",
  },
  {
    id: "ord-101",
    restaurant: "The Pizza Crust",
    date: "18 May 2026, 02:30 PM",
    items: "2x Classic Margherita, 1x Garlic Breadsticks",
    price: 680,
    status: "Delivered",
    statusColor: "#10B981",
    statusIcon: "checkmark-circle-outline",
  },
];

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [pastOrders, setPastOrders] = useState<any[]>(initialPastOrders);

  // Auto-progress active orders for demonstration
  useEffect(() => {
    if (activeOrders.length === 0) return;

    const interval = setInterval(() => {
      setActiveOrders((prevOrders) => {
        return prevOrders.map((order) => {
          let nextStatus = order.status;
          let nextProgress = order.progress;
          let nextTime = Math.max(0, order.timeLeft - 5);
          let nextIcon = order.statusIcon;
          let nextColor = order.statusColor;

          if (order.status === "Confirmed") {
            nextStatus = "Preparing";
            nextProgress = 0.4;
            nextIcon = "flame-outline";
            nextColor = "#FFB800";
          } else if (order.status === "Preparing") {
            nextStatus = "Driver Arrived";
            nextProgress = 0.6;
            nextIcon = "storefront-outline";
            nextColor = "#FFB800";
          } else if (order.status === "Driver Arrived") {
            nextStatus = "Out for Delivery";
            nextProgress = 0.8;
            nextIcon = "bicycle-outline";
            nextColor = "#FF6B35";
          } else if (order.status === "Out for Delivery") {
            nextStatus = "Delivered";
            nextProgress = 1.0;
            nextIcon = "checkmark-circle-outline";
            nextColor = "#10B981";

            // Let the order stay as Delivered so the live screen is not dismissed automatically
            // Users can manually complete it by pressing "Mark as Completed" on the screen
          }

          return {
            ...order,
            status: nextStatus,
            progress: nextProgress,
            timeLeft: nextTime,
            statusIcon: nextIcon,
            statusColor: nextColor,
          };
        });
      });
    }, 12000); // Progress order every 12 seconds for a realistic quick preview!

    return () => clearInterval(interval);
  }, [activeOrders]);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.name !== name);
    });
  };

  const getItemQuantity = (name: string) => {
    const item = cart.find((i) => i.name === name);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (restaurantName: string, itemsList: any[], totalPrice: number) => {
    const orderId = `ord-${Math.floor(Math.random() * 900) + 100}`;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');

    const itemsSummary = itemsList
      .map((item) => `${item.quantity || 1}x ${item.name}`)
      .join(', ');

    const newOrder = {
      id: orderId,
      restaurant: restaurantName || "Delicious Restaurant",
      date: dateStr,
      items: itemsSummary,
      price: totalPrice,
      status: "Confirmed",
      statusColor: "#FF6B35",
      statusIcon: "receipt-outline",
      progress: 0.2,
      timeLeft: 25,
    };

    setActiveOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setActiveOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const moveToPast = (orderId: string) => {
    setActiveOrders((prevActive) => {
      const order = prevActive.find((o) => o.id === orderId);
      if (order) {
        const completedOrder = {
          ...order,
          status: "Delivered",
          statusColor: "#10B981",
          statusIcon: "checkmark-circle-outline",
          progress: 1.0,
          timeLeft: 0,
        };
        setPastOrders((prevPast) => [completedOrder, ...prevPast]);
      }
      return prevActive.filter((o) => o.id !== orderId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        activeOrders,
        pastOrders,
        addToCart,
        removeFromCart,
        getItemQuantity,
        clearCart,
        placeOrder,
        cancelOrder,
        moveToPast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

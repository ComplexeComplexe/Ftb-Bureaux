import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'message' | 'booking' | 'system';
  title: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simuler des notifications non lues
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'message',
        title: 'Nouveau message',
        content: 'Vous avez reçu un message concernant votre annonce',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: '2',
        type: 'booking',
        title: 'Réservation confirmée',
        content: 'Votre réservation pour Tech Hub Barcelona a été confirmée',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        id: '3',
        type: 'system',
        title: 'Maintenance prévue',
        content: 'Une maintenance est prévue ce soir à 22h',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
    if (!newNotification.read) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const removeNotification = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification
  };
}

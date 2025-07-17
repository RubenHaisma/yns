"use client";

import { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface NotificationToastProps {
  show: boolean;
  onClose: () => void;
}

export function NotificationToast({ show, onClose }: NotificationToastProps) {
  const [currentNotification, setCurrentNotification] = useState(0);
  const t = useTranslations();
  const notifications = t.raw('notifications') || [];

  useEffect(() => {
    if (show) {
      setCurrentNotification(Math.floor(Math.random() * notifications.length));
    }
  }, [show]);

  if (!show) return null;

  const notification = notifications[currentNotification];

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-full duration-300">
      <div className="bg-white rounded-lg shadow-2xl border border-green-100 p-4 max-w-sm">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-green-800">
                {notification.name} uit {notification.city}
              </div>
              <div className="text-sm text-green-600">
                heeft zojuist een {notification.package} geboekt
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="text-xs text-gray-500 flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{notification.time}</span>
        </div>
      </div>
    </div>
  );
}
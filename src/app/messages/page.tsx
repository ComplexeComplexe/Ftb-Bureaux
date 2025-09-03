'use client';

import { useNotifications } from '@/hooks/useNotifications';

export default function MessagesPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-2">
                {unreadCount > 0 ? `${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''}` : 'Aucun message non lu'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn-french-tech-blue"
              >
                Tout marquer lu
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    notification.read 
                      ? 'border-gray-200 bg-gray-50' 
                      : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-sm font-medium ${
                          notification.read ? 'text-gray-600' : 'text-blue-900'
                        }`}>
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-french-tech-red rounded-full"></span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        notification.read ? 'text-gray-600' : 'text-blue-700'
                      }`}>
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.createdAt.toLocaleString('fr-FR')}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-french-tech-blue hover:text-french-tech-blue-600 transition-colors"
                      >
                        Marquer lu
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-gray-400 text-2xl">mail</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun message</h3>
                <p className="text-gray-600">
                  Vous n'avez pas encore reçu de messages.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

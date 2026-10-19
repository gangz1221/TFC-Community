// ====================================================
// SERVICE WORKER UNTUK FCM - THE FAMILY COMMUNITY
// ====================================================

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDvejLxAr6OYRmcd6qZAFNCtehTnM2KCWE",
  authDomain: "tfc-community-a6c19.firebaseapp.com",
  projectId: "tfc-community-a6c19",
  storageBucket: "tfc-community-a6c19.firebasestorage.app",
  messagingSenderId: "297440142421",
  appId: "1:297440142421:web:29346701d49a84bf1d60dc"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handler notifikasi saat HP terkunci / web tidak aktif
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Notifikasi diterima saat background:', payload);
  
  const title = (payload.notification && payload.notification.title) 
    ? payload.notification.title 
    : 'The Family Community';
    
  const body = (payload.notification && payload.notification.body) 
    ? payload.notification.body 
    : 'Ada pengingat baru dari TFC!';
  
  const icon = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikhG4ctfYBNIFs7rdVpvhCnCeb0RyIwbZ63rXWco1dShU_7kQGpUE-FGOMlZn1MP036ecNW2V-vDAABB2Cb6TmIhtL0kQUjA8OPU-Vk8_yeUn208epzUZal_QiNWA5Luayca_Oq9Z719p-DEmJ7Lun4MGhhdIKnsUrJ87PybAM1xPkXFBCQRhY52R4tx_Z/s3264/1000425283.png';
  
  const options = {
    body: body,
    icon: icon,
    badge: icon,
    vibrate: [200, 100, 200, 100, 200],
    tag: 'tfc-reminder',
    requireInteraction: true,
    data: {
      // URL Web App Anda (jika notifikasi diklik, akan buka ini)
      url: (payload.data && payload.data.url) ? payload.data.url : 'https://script.google.com/macros/s/AKfycbymngQ3Vmos2KQXHAR63O2K6M-2vj27birpiP3Gw0oqYRAji5xLA_CLtWjMzMcG83z_fQ/exec'
    }
  };
  
  return self.registration.showNotification(title, options);
});

// Handler saat notifikasi di-klik
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notifikasi diklik:', event);
  event.notification.close();
  
  const urlToOpen = (event.notification.data && event.notification.data.url) 
    ? event.notification.data.url 
    : 'https://script.google.com/macros/s/AKfycbymngQ3Vmos2KQXHAR63O2K6M-2vj27birpiP3Gw0oqYRAji5xLA_CLtWjMzMcG83z_fQ/exec';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Service Worker lifecycle
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker terpasang.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker aktif.');
  event.waitUntil(clients.claim());
});
// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// GANTI DENGAN firebaseConfig MILIKMU (yang kamu kirim sebelumnya)
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

messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Notifikasi diterima:', payload);
  const title = payload.notification?.title || 'TFC';
  const options = {
    body: payload.notification?.body || 'Pengingat dari TFC',
    icon: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikhG4ctfYBNIFs7rdVpvhCnCeb0RyIwbZ63rXWco1dShU_7kQGpUE-FGOMlZn1MP036ecNW2V-vDAABB2Cb6TmIhtL0kQUjA8OPU-Vk8_yeUn208epzUZal_QiNWA5Luayca_Oq9Z719p-DEmJ7Lun4MGhhdIKnsUrJ87PybAM1xPkXFBCQRhY52R4tx_Z/s3264/1000425283.png',
    data: { url: payload.data?.url || '/' }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';
  event.waitUntil(clients.openWindow(urlToOpen));
});
const Notification = require('../models/notiModel')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config({ path: '../../config.env' })

// Giúp người dùng gửi thông báo về service để hoạt động.
exports.sendNotification = async (req, res, next) => {
    try{
        const data = req.body;
        res.status(201).json();
        const payload = JSON.stringify({title: 'Notification' });
        webpush.sendNotification(data, payload).catch(err=> console.error(err));
    } catch {
        return res.status(500).json({ status: 'server error', message: err })
    }
}

// if ('serviceWorker' in navigator) {
//     send().catch(err => console.error(err));
// }

async function send() {
    // // Register Service Worker
    // const register = await navigator.serviceWorker.register("/worker.js", {
    //   scope: "/"
    // });
  
    // Register Push
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    // Send Push Notification
    await fetch("/noti", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    });
  }

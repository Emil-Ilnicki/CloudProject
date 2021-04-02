export default function swDev() {
  function determineAppServerKey() {
    var vapidPublicKey =
      "BDJs0ZuEd9T9M-lzVDHuw5CgNUkDckh1ftm1Nu1tOGqXTjK9z92oG9xjfE8AVQ3oHoa1MJ7jN20YfXFPx_Gkvp0";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("Response ", response);
    return response.pushManager.getSubscription().then(function (subscription) {
      return response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: determineAppServerKey(),
      });
    });
  });
}

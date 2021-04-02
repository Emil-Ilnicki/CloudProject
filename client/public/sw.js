//console.warn("sw file in public folder");
let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/home",
        "/home/edamamRecipes",
        "/home/addrecipes",
        "/index.html",
        "/",
      ]);
    })
  );
});
this.addEventListener("fetch", (event) => {
  console.warn("url", event.request.url);
  var eR = 0;
  var r = 0;
  if (event.request.url === "http://localhost:3000/home" && eR === 0) {
    eR = 1;
    event.waitUntil(
      this.registration.showNotification("Don't Forget!", {
        body: "Make sure to check out the Edamam Recipes to get started!",
        vibrate: [200, 100, 200],
        image: "https://i.imgflip.com/3apw27.png",
      })
    );
  }
  if (
    event.request.url === "http://localhost:3000/home/edamamRecipes" &&
    r === 0
  ) {
    r = 1;
    event.waitUntil(
      this.registration.showNotification("Also Check!", {
        body: "The 'Add Recipe' tab to add your own recipes",
        vibrate: [200, 100, 200],
        image: "https://i.imgflip.com/3apw27.png",
      })
    );
  }
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/") {
      event.waitUntil(
        this.registration.showNotification("No Internet Connection", {
          body: "Some services will not be available to you :(",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
      })
    );
  }
});

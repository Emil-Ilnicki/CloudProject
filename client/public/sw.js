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
        "/home/getRecipes",
        "/home/addRecipes",
        "/home/getExercies",
        "/index.html",
        "/",
      ]);
    })
  );
});
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (
      event.request.url === "http://localhost:3000/" ||
      event.request.url === "http://localhost:3000/home" ||
      event.request.url === "http://localhost:3000/getRecipes" ||
      event.request.url === "http://localhost:3000/addRecipes" ||
      event.request.url === "http://localhost:3000/getExercies" ||
      event.request.url === "http://localhost:3000/manifest.json"
    ) {
      event.waitUntil(
        this.registration.showNotification("No Internet Connection", {
          body: "Some services will not be available to you :(",
          vibrate: [200, 100, 200],
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56WusHkKEiqpCptUL5gKmdHI0hKGaHjqqb9LFzwpdaPj6HRckWq207iwMh_KWIbeeDks&usqp=CAU",
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
  } else {
    if (event.request.url === "http://localhost:3000/home") {
      var ran = Math.random() * 10 + 1;

      if (ran < 5) {
        event.waitUntil(
          this.registration.showNotification("Don't Forget!", {
            body: "Make sure to check out the Edamam Recipes to get started!",
            vibrate: [200, 100, 200],
            image:
              "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/280/280285/a-bowl-of-edamame-that-has-many-health-benefits.jpg?w=1155&h=1444",
          })
        );
      } else if (ran >= 5) {
        event.waitUntil(
          this.registration.showNotification("Also Check!", {
            body:
              "The exercise tab to start reaching that summer body you've dreamed of!",
            vibrate: [200, 100, 200],
            image:
              "https://www.planetfitness.com/sites/default/files/feature-image/xbreak-workout_602724.jpg.pagespeed.ic.v8byD7su-e.jpg",
          })
        );
      }
    }
  }
});

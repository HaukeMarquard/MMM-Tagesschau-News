Module.register("MMM-Tagesschau-News", {
  defaults: {
    updateInterval: 10 * 60 * 1000, // every 10 minutes
    text: "Tomorrow's Weather",
    lat: "",
    lon: "",
    api_key: "",
  },
  start: function () {
    Log.info("Starting Module: " + this.name);
    Log.info("Starting dingens durch hier");
    this.weather = null;
    this.textArray = ["Text 1", "Text 2", "Text 3"];
    this.currentIndex = 0;
    this.updateDom();
    this.showNextText();
  },
  getStyles: function () {
    return ["MMM-Tagesschau-News.css"];
  },
  getWeather: function () {
    this.sendSocketNotification("GET_WEATHER", {
      lat: this.config.lat,
      lon: this.config.lon,
      api_key: this.config.api_key,
    });
    this.updateDom();
  },
  processWeather: function (data) {
    this.weather = data;
    //Datenverarbeitung
    this.updateDom();
  },
  getDom: function () {
    var container = document.createElement("div");
    container.innerText = this.textArray[this.currentIndex];
    container.id = "tagesschau_container";
    return container;
  },
  showNextText: function () {
    Log.log("showNextText wird aufgerufen");

    if (this.currentIndex < this.textArray.length) {
      setTimeout(function () {
        this.currentIndex++;
        this.updateDom();
        // Rufe die Funktion erneut auf, nach einer gewissen Zeit (z.B. 5000 ms für 5 Sekunden)
        setTimeout(this.showNextText, 5000);
      }, 1000); // 1000 ms für 1 Sekunde Ausblendeffekt
    }
  },
  socketNotificationReceived: function (notification, payload) {
    if (notification === "WEATHER_RESULT") {
      Log.log("Data kommt an");
      this.processWeather(payload);
      this.updateDom();
    }
  },
  sheduleUpdate: function () {
    var self = this;
    setInterval(function () {
      self.getWeather();
    }, this.config.updateInterval);
    self.getWeather();
  },
});

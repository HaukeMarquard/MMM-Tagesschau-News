Module.register("MMM-Tagesschau-News", {
  defaults: {
    updateInterval: 1000 * 60 * 60, // every hour
  },
  start: function () {
    this.news = [{ title: "Loading..." }];
    this.index = 0;
    setInterval(() => {
      this.index = (this.index + 1) % this.news.length;
      this.updateDom();
    }, 10000);
    this.getNews();
  },
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.style.width = "800px";
    wrapper.style.backgroundColor = "red";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";

    const header = document.createElement("h2");
    header.innerHTML = `${this.news[this.index].title}`;
    header.style.textAlign = "center";

    const content = document.createElement("p");
    content.innerHTML = `${this.news[this.index].firstSentence}`;
    content.style.textAlign = "center";

    wrapper.appendChild(header);
    wrapper.appendChild(content);
    return wrapper;
  },
  socketNotificationReceived: function (notification, payload) {
    if (notification == "NEWS_RESULT") {
      this.news = payload.news;
      this.updateDom();
    }
  },
  getNews: function () {
    this.sendSocketNotification("GET_NEWS", {});
    this.updateDom();
  },
  sheduleUpdate: function () {
    var self = this;
    setInterval(() => {
      self.getNews();
    }, this.config.updateInterval);
    self.getNews();
  },
});

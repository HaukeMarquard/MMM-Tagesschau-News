Module.register("MMM-Tagesschau-News", {
  defaults: {},
  start: function () {
    this.news = [{ title: "Loading..." }];
    this.index = 0;
    setInterval(() => {
      this.index = (this.index + 1) % this.news.length;
      this.updateDom();
    }, 5000);
    this.getNews();
  },
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = `<h2>${this.news[this.index].title}</h2>`;
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

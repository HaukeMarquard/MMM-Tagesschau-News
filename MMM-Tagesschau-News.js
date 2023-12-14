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
  getStyles: function () {
    return ["MMM-Tagesschau-News.css"];
  },
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.classList.add("tagesschau_news");
    wrapper.classList.add("container");

    const header = document.createElement("h2");
    header.innerHTML = `${this.news[this.index].title}`;
    header.classList.add("tagesschau_news");
    header.classList.add("title");

    const content = document.createElement("p");
    content.innerHTML = `${this.news[this.index].firstSentence}`;
    content.classList.add("tagesschau_news");
    content.classList.add("content");

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

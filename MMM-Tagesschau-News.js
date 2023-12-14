Module.register("MMM-Tagesschau-News", {
  defaults: {},
  start: function () {
    this.news = ["Tagesschau", "Tagesthemen", "Nachtmagazin"];
    this.index = 0;
    setInterval(() => {
      this.index = (this.index + 1) % this.news.length;
      this.updateDom();
    }, 5000);
  },
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = `<h2>${this.news[this.index]}</h2>`;
    return wrapper;
  },
});

Module.register("MMM-Tagesschau-News", {
  defaults: {
    texte: ["Tagesschau", "Tagesthemen", "Nachtmagazin"],
    index: 0,
  },
  start: function () {
    this.news = [];
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

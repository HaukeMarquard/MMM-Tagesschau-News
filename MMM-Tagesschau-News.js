Module.register("MMM-Tagesschau-News", {
  defaults: {
    texte: ["Tagesschau", "Tagesthemen", "Nachtmagazin"],
    index: 0,
  },
  start: function () {
    setInterval(() => {
      this.config.index = (this.config.index + 1) % this.config.texte.length;
      this.updateDom();
    }, 5000);
  },
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = `<h2>${this.config.texte[this.config.index]}</h2>`;
    return wrapper;
  },
});

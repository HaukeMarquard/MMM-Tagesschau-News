Module.register("MMM-Tagesschau-News", {
  defaults: {
    texte: ["Tagesschau", "Tagesthemen", "Nachtmagazin"],
    index: 0,
  },
  start: function () {
    setInterval(() => {
      this.config.index = (this.config.index + 1) % this.config.texte.length;
      this.updateDom(1000); // Add fade out duration of 1000 milliseconds
    }, 5000);
  },
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = `<h2>${this.config.texte[this.config.index]}</h2>`;
    return wrapper;
  },
  updateDom: function (fadeDuration) {
    var self = this;
    fadeDuration = fadeDuration || 0;

    var wrapper = this.getDom();
    wrapper.style.opacity = 0; // Set initial opacity to 0

    setTimeout(function () {
      self.fadeIn(wrapper, fadeDuration); // Fade in the wrapper element
    }, fadeDuration);

    this.dom = wrapper;
  },
  fadeIn: function (element, duration) {
    var self = this;
    var opacity = 0;
    var interval = 50;
    var gap = interval / duration;

    element.style.display = "block"; // Show the element

    function fadeInStep() {
      opacity += gap;
      element.style.opacity = opacity;

      if (opacity >= 1) {
        element.style.opacity = 1; // Set final opacity to 1
        return;
      }

      setTimeout(fadeInStep, interval);
    }

    fadeInStep();
  },
});

const NodeHelper = require("node_helper");
var axios = require("axios");
const Log = require("logger");

module.exports = NodeHelper.create({
  start: function () {},
  get_news: function (payload) {
    var that = this;
    // this.url = `https://api.tomorrow.io/v4/weather/forecast?location=${payload.lat},${payload.lon}&apikey=${payload.api_key}`
    this.url = `https://www.tagesschau.de/api2/news/?regions=15`;
    Log.info(this.url);
    axios.get(this.url).then((response) => {
      that.sendSocketNotification("NEWS_RESULT", response.data);
    });
  },
  socketNotificationReceived: function (notification, payload) {
    if (notification == "GET_NEWS") {
      this.get_news(payload);
    }
  },
});

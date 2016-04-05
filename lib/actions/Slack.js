'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slack = function () {
  function Slack(_ref) {
    var webhookUri = _ref.webhookUri;

    _classCallCheck(this, Slack);

    this.slack = new _slackNode2.default();
    this.slack.setWebhook(webhookUri);
  }

  _createClass(Slack, [{
    key: 'post',
    value: function post(_props) {
      var _this = this;

      var DEFAULT = {
        icon_emoji: "http://www.windowswest.com.au/images/DATA/gallery/large_ferry-style-door-vent-detail-austalimage.jpg",
        channel: "#general",
        username: "Ventfl",
        link_names: 1
      };

      return function (data) {
        var props = (0, _helpers.templateProps)(_props, data);

        _this.slack.webhook(Object.assign({}, DEFAULT, props), function (err, response) {
          console.log(response);
        });
      };
    }
  }]);

  return Slack;
}();

exports.default = Slack;
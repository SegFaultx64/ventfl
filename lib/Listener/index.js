'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _faye = require('faye');

var _faye2 = _interopRequireDefault(_faye);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function () {
  function Listener(_ref) {
    var _this = this;

    var url = _ref.url;

    _classCallCheck(this, Listener);

    this.client = new _faye2.default.Client(url);
    this.listeners = [];

    this.client.subscribe('/events', function (e) {
      var toFire = _this.listeners.filter(function (x) {
        var predicate = x.predicate;


        if (typeof predicate === 'string') {
          return predicate === e.type;
        } else {
          return predicate(e);
        }
      });

      toFire.map(function (listener) {
        return listener.actions.map(function (a) {
          return a(e);
        });
      });
    });
  }

  _createClass(Listener, [{
    key: 'when',
    value: function when(predicate) {
      for (var _len = arguments.length, actions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        actions[_key - 1] = arguments[_key];
      }

      this.listeners.push({ predicate: predicate, actions: actions });
    }
  }]);

  return Listener;
}();

exports.default = Listener;
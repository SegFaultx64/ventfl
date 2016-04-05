'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mailchimp = require('mailchimp');

var _helpers = require('../helpers');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mailchimp = function () {
  function Mailchimp(_ref) {
    var apiKey = _ref.apiKey;

    _classCallCheck(this, Mailchimp);

    try {
      this.api = new _mailchimp.MailChimpAPI(apiKey, { version: '2.0' });
    } catch (error) {
      console.log(error.message);
    }
  }

  _createClass(Mailchimp, [{
    key: 'setUserVars',
    value: function setUserVars(_ref2) {
      var _this = this;

      var email = _ref2.email;
      var list = _ref2.list;
      var merge_vars = _ref2.merge_vars;


      return function (data) {
        _this._getListIDFromName({ name: list }).then(function (id) {
          _this.api.call('lists', 'update-member', {
            id: id,
            email: (0, _helpers.templateProps)({
              email: email
            }, data),
            merge_vars: (0, _helpers.templateProps)(merge_vars, data)
          }, function (error, data) {
            if (error) console.log(error.message);else console.log(JSON.stringify(data)); // Do something with your data!
          });
        });
      };
    }
  }, {
    key: 'subscribeUser',
    value: function subscribeUser(_ref3) {
      var _this2 = this;

      var email = _ref3.email;
      var list = _ref3.list;
      var merge_vars = _ref3.merge_vars;

      var rest = _objectWithoutProperties(_ref3, ['email', 'list', 'merge_vars']);

      return function (data) {
        console.log(data, (0, _helpers.templateProps)({
          email: email
        }, data), (0, _helpers.templateProps)(merge_vars, data));

        _this2._getListIDFromName({ name: list }).then(function (id) {
          _this2.api.call('lists', 'subscribe', _extends({
            id: id,
            email: (0, _helpers.templateProps)({
              email: email
            }, data),
            merge_vars: (0, _helpers.templateProps)(merge_vars, data),
            double_optin: false,
            update_existing: true
          }, rest), function (error, data) {
            if (error) console.log(error.message);else console.log(JSON.stringify(data)); // Do something with your data!
          });
        });
      };
    }
  }, {
    key: '_getListIDFromName',
    value: function _getListIDFromName(_ref4) {
      var _this3 = this;

      var name = _ref4.name;

      return new Promise(function (res, rej) {
        _this3.api.call('lists', 'list', {}, function (err, data) {
          if (err) rej(err);

          res(data.data.find(function (x) {
            return x.name === name;
          }).id);
        });
      });
    }
  }]);

  return Mailchimp;
}();

exports.default = Mailchimp;
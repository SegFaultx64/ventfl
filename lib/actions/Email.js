'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emailTemplates = require('email-templates');

var _helpers = require('../helpers');

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Email = function () {
  function Email(_ref) {
    var transport = _ref.transport;

    _classCallCheck(this, Email);

    this.mailer = _nodemailer2.default.createTransport(transport);
  }

  _createClass(Email, [{
    key: 'sendEmail',
    value: function sendEmail(props) {
      var _this = this;

      var getExtraProps = arguments.length <= 1 || arguments[1] === undefined ? function () {
        return {};
      } : arguments[1];


      return function (data) {
        var _templateProps = (0, _helpers.templateProps)(props, _extends({}, data, getExtraProps()));

        var from = _templateProps.from;
        var to = _templateProps.to;
        var subject = _templateProps.subject;
        var _html = _templateProps.html;
        var template = _templateProps.template;
        var cc = _templateProps.cc;
        var bcc = _templateProps.bcc;


        var html = _html;

        if (template) {
          var templated = new _emailTemplates.EmailTemplate(template);

          templated.render(data, function (err, result) {
            if (err) {
              console.error(err);
              throw err;
            }

            _this.mailer.sendMail({
              from: from,
              to: to,
              subject: subject,
              html: result.html
            }, function (err, info) {});
          });
        } else {
          _this.mailer.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: html,
            cc: cc,
            bcc: bcc
          }, function (err, info) {});
        }
      };
    }
  }]);

  return Email;
}();

exports.default = Email;
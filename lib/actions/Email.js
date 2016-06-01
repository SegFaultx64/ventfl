'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emailTemplate = require('email-template');

var _helpers = require('../helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Email = function () {
  function Email(_ref) {
    var transport = _ref.transport;

    _classCallCheck(this, Email);

    this.mailer = nodemailer.createTransport(transport);
  }

  _createClass(Email, [{
    key: 'sendEmail',
    value: function sendEmail(props) {

      return function (data) {
        var _templateProps = (0, _helpers.templateProps)(props);

        var from = _templateProps.from;
        var to = _templateProps.to;
        var subject = _templateProps.subject;
        var _html = _templateProps.html;
        var template = _templateProps.template;
        var cc = _templateProps.cc;
        var bcc = _templateProps.bcc;


        var html = _html;

        if (template) {
          templated = new _emailTemplate.EmailTemplate(templateDir);

          templated.render(data, function (err, result) {
            if (err) {
              console.error(err);
              throw err;
            }

            transport.sendMail({
              from: from,
              to: to,
              subject: subject,
              html: result.html
            }, function (err, info) {});
          });
        } else {
          transport.sendMail({
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
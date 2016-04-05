'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateProps = templateProps;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function templateProps(_props, data) {
  var props = Object.assign({}, _props);

  _lodash2.default.each(props, function (v, k) {
    if (typeof v === 'string') {
      var compiled = _lodash2.default.template(v);

      props[k] = compiled(data);
    }
  });

  return props;
}
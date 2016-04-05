import _ from 'lodash'

export function templateProps(_props, data) {
  const props = Object.assign({}, _props);

  _.each(props, (v, k) => {
    if (typeof v === 'string') {
      var compiled = _.template(v);

      props[k] = compiled(data)
    }
  })

  return props;
}

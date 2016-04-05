import { MailChimpAPI } from 'mailchimp';
import { templateProps } from '../helpers';

export default class Mailchimp {
  constructor({ apiKey }) {
    try {
      this.api = new MailChimpAPI(apiKey, { version : '2.0' });
    } catch (error) {
      console.log(error.message);
    }
  }

  setUserVars({ email, list, merge_vars }) {

    return (data) => {
      this._getListIDFromName({name: list}).then((id) => {
        this.api.call('lists', 'update-member', {
          id,
          email: templateProps({
            email
          }, data),
          merge_vars: templateProps(merge_vars, data)
        }, function (error, data) {
          if (error)
          console.log(error.message);
          else
          console.log(JSON.stringify(data)); // Do something with your data!
        });
      })
    }

  }

  subscribeUser({ email, list, merge_vars, ...rest }) {

    return (data) => {
      console.log(data, templateProps({
        email
      }, data), templateProps(merge_vars, data));

      this._getListIDFromName({name: list}).then((id) => {
        this.api.call('lists', 'subscribe', {
          id,
          email: templateProps({
            email
          }, data),
          merge_vars: templateProps(merge_vars, data),
          double_optin: false,
          update_existing: true,
          ...rest
        }, function (error, data) {
          if (error)
          console.log(error.message);
          else
          console.log(JSON.stringify(data)); // Do something with your data!
        });
      })
    }

  }

  _getListIDFromName({ name }) {
    return new Promise((res, rej) => {
      this.api.call('lists', 'list', {
      }, function (err, data) {
        if (err)
          rej(err)

        res(data.data.find((x) => x.name === name).id)
      })
    })
  }
}

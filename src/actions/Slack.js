import SlackAPI from 'slack-node'

import { templateProps } from '../helpers';

export default class Slack {
  constructor({ webhookUri }) {
    this.slack = new SlackAPI();
    this.slack.setWebhook(webhookUri);
  }

  post(_props) {

    const DEFAULT = {
      icon_emoji: "http://www.windowswest.com.au/images/DATA/gallery/large_ferry-style-door-vent-detail-austalimage.jpg",
      channel: "#general",
      username: "Ventfl",
      link_names: 1
    }


    return (data) => {
      const props = templateProps(_props, data);
      
      this.slack.webhook(Object.assign({}, DEFAULT, props), function(err, response) {
        console.log(response);
      });
    }
  }
}

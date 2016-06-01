import { EmailTemplate } from 'email-templates'
import { templateProps } from '../helpers';

import nodemailer from 'nodemailer';

export default class Email {
  constructor({ transport }) {
    this.mailer = nodemailer.createTransport(transport);
  }

  sendEmail(props, getExtraProps = (() => { return {} })) {

    return (data) => {
      const { from, to, subject, html: _html, template, cc, bcc } = templateProps(props, {...data, ...getExtraProps()});

      let html = _html;

      if (template) {
        const templated = new EmailTemplate(template)

        templated.render(data, (err, result) => {
          if (err) {
            console.error(err)
            throw err;
          }

          this.mailer.sendMail({
            from,
            to,
            subject,
            html: result.html,
          }, function(err, info) { });
        })
      } else {
        this.mailer.sendMail({
          from,
          to,
          subject,
          html,
          cc,
          bcc
        }, function(err, info) { });
      }
    }

  }
}

import { EmailTemplate } from 'email-templates'
import { templateProps } from '../helpers';

export default class Email {
  constructor({ transport }) {
    this.mailer = nodemailer.createTransport(transport);
  }

  sendEmail(props) {

    return (data) => {
      const { from, to, subject, html: _html, template, cc, bcc } = templateProps(props);

      let html = _html;

      if (template) {
        templated = new EmailTemplate(templateDir)

        templated.render(data, function (err, result) {
          if (err) {
            console.error(err)
            throw err;
          }

          transport.sendMail({
            from,
            to,
            subject,
            html: result.html,
          }, function(err, info) { });
        })
      } else {
        transport.sendMail({
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

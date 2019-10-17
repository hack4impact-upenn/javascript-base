// Import sendgrid
import { MailService } from '@sendgrid/mail'

/**
 * A service for sending an email.
 */
export class EmailService {

  constructor(public subject: string, public body: string, public sender: string) {
    console.log(process.env.SENDGRID_API_KEY);
    MailService.setApiKey(process.env.SENDGRID_API_KEY!);
  }
  
  sendTo(recipients: [string]): Promise<any> {
    // validateEmails(); // TODO
    const msg = {
      to: recipients,
      from: this.sender,
      subject: this.subject,
      html: this.body
    };

    return this.send(msg);
  }

  sendToAtFutureDate(recipients: [string], when: Date): Promise<any> {
    // TODO: momentJS, maybe?
    let timestamp: number = when.getTime() / 1000;
    const msg = {
      to: recipients,
      from: this.sender,
      subject: this.subject,
      html: this.body,
      sendAt: timestamp
    };

    return this.send(msg);
  }
  
  private send(msg: any): Promise<any> {
    let numRecipients: number = msg.to.length;
    if (numRecipients == 0) {
      throw new Error('Empty list of email recipients');
    }
    else if (numRecipients == 1) {
      // If 1 recipient, use send()
      return MailService.send(msg);
    }
    // If > 1 recipient, use sendMultiple() to send multiple individual emails
    return MailService.sendMultiple(msg);
  }

}
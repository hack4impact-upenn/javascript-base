// Import sendgrid
const sgMail = require('@sendgrid/mail');

/**
 * A service for sending an email to one or more recipients.
 */
export default class EmailService {
  public subject: string;
  public body: string;
  public sender: string;

  constructor(subject: string, body: string, sender: string) {
    this.subject = subject;
    this.body = body;
    this.sender = sender;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }
  
  sendTo(recipients: [string]): Promise<any> {
    const msg = {
      to: recipients,
      from: this.sender,
      subject: this.subject,
      html: this.body
    };
    return this.send(msg);
  }

  sendToAtFutureDate(recipients: [string], when: Date): Promise<any> {
    // TODO: look into momentJS for Date conversion based on time zones.
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
    if (!msg) {
      throw new Error('Empty message');
    }

    let numRecipients: number = msg.to.length;
    // validate each email address
    let invalidEmails = msg.to.filter((email: string) => !this.emailIsValid(email));
    if (invalidEmails.length > 0) {
      throw new Error(`Attempted to send email to invalid addresses: ${invalidEmails}`);
    }
    if (numRecipients == 0) {
      throw new Error('Empty list of email recipients');
    }
    else if (numRecipients == 1) {
      return sgMail.send(msg);
    }
    return sgMail.sendMultiple(msg);
  }

  // Verify that the input email matches email regex
  private emailIsValid(email: string) {
   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
 }
}
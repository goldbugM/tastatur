import { injectable } from "@fastr/invert";
import { Env } from "@mkboard/config";
import { Mailer } from "./types.ts";

@injectable({ singleton: true })
export class MailgunConfig {
  readonly domain: string;
  readonly key: string;
  readonly from: string;

  constructor() {
    this.domain = Env.getString("MAIL_DOMAIN", "localhost");
    this.key = Env.getString("MAIL_KEY", "disabled");
    const fromAddress = Env.getString("MAIL_FROM_ADDRESS", "noreply@localhost");
    const fromName = Env.getString("MAIL_FROM_NAME", "Local App");
    this.from = `${fromName} <${fromAddress}>`;
  }
}

@injectable()
export class MailgunMailer extends Mailer {
  constructor(readonly config: MailgunConfig) {
    super();
  }

  async sendMail({
    from = this.config.from,
    to,
    subject,
    text,
    html,
  }: Mailer.Message): Promise<void> {
    // Disabled - external email service removed
    // Email would have been sent to: ${to}
    // Subject: ${subject}
    console.log(`[EMAIL DISABLED] Would send email to: ${to}, Subject: ${subject}`);
    return Promise.resolve();
  }
}

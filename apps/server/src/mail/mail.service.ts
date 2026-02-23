import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

@Injectable()
export class MailService {
  private mailerSend: MailerSend;
  private from: Sender;

  constructor(private config: ConfigService) {
    this.mailerSend = new MailerSend({
      apiKey: this.config.get<string>('MAILERSEND_API_KEY')!,
    });
    this.from = new Sender(
      this.config.get<string>('MAIL_FROM')!,
      this.config.get<string>('MAIL_FROM_NAME', 'Xynoos Vertex'),
    );
  }

  async sendVerificationEmail(
    toEmail: string,
    toName: string,
    token: string,
  ): Promise<void> {
    const frontendUrl = this.config.get<string>('FRONTEND_URL', 'http://localhost:3000');
    const verifyLink = `${frontendUrl}/verify-email?token=${token}`;

    const recipients = [new Recipient(toEmail, toName)];
    const emailParams = new EmailParams()
      .setFrom(this.from)
      .setTo(recipients)
      .setSubject('Verify your Xynoos Vertex account')
      .setHtml(`
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; padding: 40px; border-radius: 12px; border: 1px solid #1f1f1f;">
          <h2 style="color: #fff; margin-bottom: 8px;">Verify your email</h2>
          <p style="color: #737373; margin-bottom: 24px;">Hi <strong style="color: #e5e5e5;">${toName}</strong>, thanks for joining Xynoos Vertex! Click the button below to verify your email address.</p>
          <a href="${verifyLink}" style="display: inline-block; background: #fff; color: #0a0a0a; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-bottom: 24px;">Verify Email</a>
          <p style="color: #525252; font-size: 13px;">Or copy this link:<br><a href="${verifyLink}" style="color: #6ee7b7;">${verifyLink}</a></p>
          <p style="color: #3f3f3f; font-size: 12px; margin-top: 32px;">This link expires in 24 hours. If you did not create this account, you can ignore this email.</p>
        </div>
      `)
      .setText(`Verify your Xynoos Vertex account\n\nHi ${toName},\n\nClick the link below to verify your email:\n${verifyLink}\n\nThis link expires in 24 hours.`);

    await this.mailerSend.email.send(emailParams);
  }

  async sendPasswordResetEmail(
    toEmail: string,
    toName: string,
    token: string,
  ): Promise<void> {
    const frontendUrl = this.config.get<string>('FRONTEND_URL', 'http://localhost:3000');
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    const recipients = [new Recipient(toEmail, toName)];
    const emailParams = new EmailParams()
      .setFrom(this.from)
      .setTo(recipients)
      .setSubject('Reset your Xynoos Vertex password')
      .setHtml(`
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; padding: 40px; border-radius: 12px; border: 1px solid #1f1f1f;">
          <h2 style="color: #fff; margin-bottom: 8px;">Reset your password</h2>
          <p style="color: #737373; margin-bottom: 24px;">Hi <strong style="color: #e5e5e5;">${toName}</strong>, we received a request to reset your password. Click the button below to proceed.</p>
          <a href="${resetLink}" style="display: inline-block; background: #fff; color: #0a0a0a; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-bottom: 24px;">Reset Password</a>
          <p style="color: #525252; font-size: 13px;">Or copy this link:<br><a href="${resetLink}" style="color: #a5b4fc;">${resetLink}</a></p>
          <p style="color: #3f3f3f; font-size: 12px; margin-top: 32px;">This link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
        </div>
      `)
      .setText(`Reset your Xynoos Vertex password\n\nHi ${toName},\n\nClick the link below to reset your password:\n${resetLink}\n\nThis link expires in 1 hour.`);

    await this.mailerSend.email.send(emailParams);
  }
}

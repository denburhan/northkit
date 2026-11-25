import nodemailer from "nodemailer";

type Mail = { to: string; subject: string; text: string };

const transport = process.env.SMTP_URL ? nodemailer.createTransport(process.env.SMTP_URL) : null;

export async function sendMail({ to, subject, text }: Mail) {
  if (!transport) {
    // Dev fallback: no SMTP configured, print instead of sending.
    console.log(`[mail:dev] to=${to} subject=${subject}\n${text}`);
    return;
  }
  await transport.sendMail({ from: process.env.MAIL_FROM ?? "Northkit <no-reply@localhost>", to, subject, text });
}

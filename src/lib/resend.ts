import { Resend } from "resend";
import { config } from "@/config";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === "development") {
  console.group("⚠️ RESEND_API_KEY missing from .env");
  console.error("It's not mandatory but it's required to send emails");
  console.error("Get your API key at https://resend.com/api-keys");
  console.groupEnd();
}

/**
 * Sends an email using Resend.
 *
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email (optional).
 * @param {string | React.ReactElement} html - The HTML content or React component for the email.
 * @param {string} replyTo - The email address to set as the "Reply-To" address (optional).
 * @returns {Promise} A Promise that resolves when the email is sent.
 */
export const sendEmail = async ({
  html,
  replyTo,
  subject,
  text,
  to,
  from,
}: {
  to: string | string[];
  subject: string;
  text?: string;
  html: string | React.ReactElement;
  replyTo?: string;
  from?: string;
}) => {
  try {
    const data = await resend.emails.send({
      from: from || config.resend.fromAdmin,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      react: typeof html === "string" ? undefined : html,
      html: typeof html === "string" ? html : undefined,
      ...(replyTo && { reply_to: replyTo }),
    });

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

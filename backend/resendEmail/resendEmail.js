import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const resendEmail = async (toEmail, subject, htmlContent) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_EMAIL,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      throw new Error(error);
    }

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default resendEmail;

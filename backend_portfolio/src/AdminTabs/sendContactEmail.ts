import { Request, Response } from "express";
import nodemailer from "nodemailer";

const { EMAIL, EMAIL_PASSWORD } = process.env;

if (!EMAIL || !EMAIL_PASSWORD) {
  throw new Error("Missing EMAIL or EMAIL_PASSWORD environment variables");
}

const sendContactEmail = async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;

  const recipientEmail = "akash.sinha.mail@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: recipientEmail,
    from: EMAIL,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
    subject: `Contact from ${name}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send email, please try again later.",
    });
  }
};

export default sendContactEmail;

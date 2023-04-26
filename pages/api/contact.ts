import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

class ApiError extends Error {
  statusCode: number;
  constructor(name: string, statusCode: number, message?: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const email = process.env.GMAIL;
const password = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formValues = req.body;

    if (!formValues.email && !formValues.message)
      return res
        .status(400)
        .json({ message: "Failed: Missing Required Values" });
    try {
      await transporter.sendMail({
        from: formValues.email,
        to: email,
        text: `
        Name: ${formValues.name}
        Email: ${formValues.email}
        Link: ${formValues.link}
        Message: ${formValues.message}`,
        subject: 'Message from csscraftsman',
      });
      return res.status(200).json({ message: "Success: Message sent" });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(400).json({
          error: {
            name: error.name,
            statusCode: error.statusCode,
            message: error.message,
          },
        });
      } else {
        return res.status(400).json({
          message: `Failed: ${error}`,
        });
      }
    }
  }
}

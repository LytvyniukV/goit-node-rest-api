import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SEND_GRID_TOKEN);

const sendMail = async (email, verifyToken) => {
  const mail = await sgMail.send({
    to: email,
    from: "lytvyniuk.vladyslav@gmail.com",
    subject: "Verify your email",
    html: `<p>Please, follow the <a href="http://localhost:3000/api/users/verify/${verifyToken}">link</a> to verify your email</p>`,
    text: `Please, follow the link http://localhost:3000/api/users/verify/${verifyToken} to verify your email`,
  });
  console.log(email);
  return mail;
};

export default sendMail;

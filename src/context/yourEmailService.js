import emailjs from "@emailjs/browser";
import { db } from "./firebase";

function sendEmailNotification  (email , {message})  {
    console.log("Sending email notification...");
  const templateParams = {
    from_name: "Twitter Clone",
    from_email: "akshatgtc@gmail.com",
    to_email: email,
    message: message,
  };

  emailjs
    .send(
      "service_m5wpqnq",
      "template_xk3pp1q",
      templateParams,
      "bKs4oP1IZMlG27n--"
    )
    .then((response) => {
      console.log("Email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};


export {
  sendEmailNotification,
};
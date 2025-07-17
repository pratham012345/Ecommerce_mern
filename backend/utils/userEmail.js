const nodeEmailer = require("nodemailer");
const { product } = require("../controller/product.controller");

const sendEmail = async (userEmail, productArray) => {
  const transporter = nodeEmailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_PASS,
    },
  });

  //Prepare product details in text format
  const productDetials = productArray.map((product, index) => {
    return `${index + 1}.Name: ${product.name}.Price: ${product.price}`;
  });

  //setup email content
  const mailOptions = {
    from: process.env.NODE_EMAIL,
    to: userEmail,
    subject: "Your Order details",
    text: `Thanks For your purchase \n\n here is your product details ${productDetials}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;

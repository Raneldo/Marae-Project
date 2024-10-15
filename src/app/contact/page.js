"use client";
import { useState } from "react";
import "./contact.css";
import msg_icon from "@/assets/msg-icon.png";
import mail_icon from "@/assets/mail-icon.png";
import phone_icon from "@/assets/phone-icon.png";
import location_icon from "@/assets/location-icon.png";
import white_arrow from "@/assets/white-arrow.png";
import Title from "@/components/title/Title";
import Image from "next/image";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d83845b5-2277-42e7-9484-4dd822cea342");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <Title subtitle="Contact us" title="Get in Touch" />
      <div className="contact">
        <div className="contact-col">
          <h3>
            Send us a message <Image src={msg_icon} alt="" />
          </h3>
          <p>
            Feel free to reach out through contact form or find our contact
            information below. Your feedback, questions, and suggestions are
            important to us as we strive to provide exceptional service to our
            community.
          </p>
          <ul>
            <li>
              <Image src={mail_icon} alt="" />
              Contact@gmail.com
            </li>
            <li>
              <Image src={phone_icon} alt="" />
              +64 12 123 1234
            </li>
            <li>
              <Image src={location_icon} alt="" />
              Kelburn Parade, Kelburn
              <br /> Wellington, New Zealand
            </li>
          </ul>
        </div>
        <div className="contact-col">
          <form onSubmit={onSubmit}>
            <label>Your name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
              required
            />
            <label>Write your message here</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message"
              required
            ></textarea>
            <button type="submit" className="btn dark-btn">
              Submit now <Image src={white_arrow} alt="" />
            </button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </>
  );
};

export default Contact;

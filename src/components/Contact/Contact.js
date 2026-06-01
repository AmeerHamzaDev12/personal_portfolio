import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill out all fields before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS configuration.");
      }

      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: "malikhamzahamza598@gmail.com",
              from_name: formData.fullName,
              from_email: formData.email,
              message: formData.message,
            },
          }),
        }
      );

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully. I received it by email.",
        });
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: "Message could not be sent. Please check your EmailJS setup.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message === "Missing EmailJS configuration."
            ? "Add EmailJS env variables before using the form."
            : "Network error while sending. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="contact-section" id="contact">
      <Particle />
      <Container className="contact-content">
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <div className="contact-card">
              <h1 className="project-heading">
                Contact <strong className="purple">Me</strong>
              </h1>
              <p className="contact-subtitle">
                Fill out the form and I will get back to you.
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="contactFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message"
                    required
                  />
                </Form.Group>

                {status.message && (
                  <p
                    className={`contact-status contact-status-${status.type}`}
                    role="status"
                  >
                    {status.message}
                  </p>
                )}

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  username?: string;
  loginUrl?: string;
}

export const WelcomeEmail = ({
  username = "there",
  loginUrl = "https://nextship-saas.vercel.app/login",
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to NextShip - Let's get you started!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to NextShip! 🚀</Heading>
        <Text style={text}>Hi {username},</Text>
        <Text style={text}>
          Thanks for signing up! We're excited to have you on board. NextShip is
          your all-in-one SaaS boilerplate to help you ship faster.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={loginUrl}>
            Get Started
          </Button>
        </Section>
        <Text style={text}>
          If you have any questions or need help, feel free to reach out to our
          support team.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          NextShip - Built with ❤️ for developers
          <br />
          <Link href="https://nextship-saas.vercel.app" style={link}>
            Visit our website
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 48px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 48px",
};

const buttonContainer = {
  padding: "27px 48px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 48px",
};

const link = {
  color: "#556cd6",
  textDecoration: "underline",
};

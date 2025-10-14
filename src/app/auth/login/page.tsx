import { LoginForm } from "@/components/LoginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your account",
  openGraph: {
    title: "Login | My App",
    description: "Log in to your account on My App",
  },
};

export default function Login() {
  return <LoginForm />;
}

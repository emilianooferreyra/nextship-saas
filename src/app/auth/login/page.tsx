import { LoginForm } from "@/components/LoginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - NextShip",
  description: "Sign in to your NextShip account",
  openGraph: {
    title: "Login - NextShip",
    description: "Sign in to your NextShip account",
  },
};

export default function Login() {
  return <LoginForm />;
}

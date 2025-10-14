import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
  openGraph: {
    title: "Register | My App",
    description: "Create a new account on My App",
  },
};

export default function Register() {
  return <RegisterForm />;
}

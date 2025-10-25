import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - NextShip",
  description: "Privacy Policy for NextShip",
};

const PrivacyPolicy = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          {/* Instructions Box */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              How to Generate Your Privacy Policy
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use ChatGPT or Claude to generate a customized privacy policy for
              your project:
            </p>
            <div className="bg-background/50 border border-border rounded-lg p-4 text-xs font-mono overflow-x-auto">
              <pre className="whitespace-pre-wrap">
                {`You are an excellent lawyer.

                I need your help to write a privacy policy for my website:

                Context:
                - Website: [YOUR_DOMAIN]
                - Name: [YOUR_APP_NAME]
                - Description: [YOUR_APP_DESCRIPTION]
                - User data collected: name, email, and payment information
                - Non-personal data: web cookies, analytics
                - Purpose: To provide and improve our services
                - Data sharing: We do not share data with third parties
                - Children's Privacy: We do not collect data from children under 13
                - Updates: Users will be notified by email
                - Contact: [YOUR_EMAIL]

                Please write a simple, clear privacy policy. Add today's date.`}
              </pre>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              💡 <strong>Tip:</strong> Replace the bracketed text with your
              actual information, then paste the AI-generated content below.
            </p>
          </div>

          {/* Template Content */}
          <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground">
                [Replace with your data collection practices]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                [Replace with how you use the collected data]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                3. Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground">
                [Replace with your data sharing policies]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                [Replace with your security measures]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground">
                [Replace with user rights information]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground">
                For privacy-related questions, contact us at:{" "}
                <a
                  href="mailto:privacy@yourdomain.com"
                  className="text-primary hover:underline"
                >
                  privacy@yourdomain.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

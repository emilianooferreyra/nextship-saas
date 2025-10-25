import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - NextShip",
  description: "Terms of Service for NextShip",
};

const TOS = async ({ params }: { params: Promise<{ locale: string }> }) => {
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
              <span className="text-2xl">⚖️</span>
              How to Generate Your Terms of Service
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use ChatGPT or Claude to generate customized terms of service:
            </p>
            <div className="bg-background/50 border border-border rounded-lg p-4 text-xs font-mono overflow-x-auto">
              <pre className="whitespace-pre-wrap">
                {`You are an excellent lawyer.

                I need your help to write Terms of Service for my website:

                Context:
                - Website: [YOUR_DOMAIN]
                - Name: [YOUR_APP_NAME]
                - Description: [YOUR_APP_DESCRIPTION]
                - Contact: [YOUR_EMAIL]
                - Service: SaaS with subscription plans
                - Refund policy: Full refund within 7 days
                - User data: name, email, payment information
                - Privacy Policy: [YOUR_DOMAIN]/privacy-policy
                - Governing Law: [YOUR_COUNTRY/STATE]
                - Updates: Users notified by email

                Please write simple, clear Terms of Service. Add today's date.`}
              </pre>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              💡 <strong>Tip:</strong> Replace the bracketed text with your
              actual information, then paste the AI-generated content below.
            </p>
          </div>

          {/* Template Content */}
          <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                [Replace with your terms acceptance clause]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
              <p className="text-muted-foreground">
                [Replace with service usage terms]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground">
                [Replace with account requirements and responsibilities]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                4. Payment and Refunds
              </h2>
              <p className="text-muted-foreground">
                [Replace with your payment terms and refund policy]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                [Replace with IP ownership terms]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                [Replace with liability limitations]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
              <p className="text-muted-foreground">
                [Replace with your jurisdiction and governing law]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground">
                [Replace with how you handle ToS updates]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                9. Contact Information
              </h2>
              <p className="text-muted-foreground">
                For questions about these terms, contact us at:{" "}
                <a
                  href="mailto:legal@yourdomain.com"
                  className="text-primary hover:underline"
                >
                  legal@yourdomain.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TOS;

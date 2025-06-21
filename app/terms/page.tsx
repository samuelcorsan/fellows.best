import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to ddfellows ("we," "our," or "us"). By accessing or using
            our website at fellows.disam.dev, you agree to these Terms of
            Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
          <p>
            ddfellows is a platform that aggregates and provides information
            about fellowships, grants, accelerators, and competitions. We help
            users discover opportunities and manage their applications.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p>
            When you create an account, you must provide accurate information
            and keep it updated. You are responsible for maintaining the
            security of your account credentials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
          <p>
            Users may submit opportunities to our platform. You retain ownership
            of your content but grant us a license to display and use it on our
            platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p>
            The ddfellows platform, including its design, logos, and content
            created by us, is protected by copyright and other intellectual
            property rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p>
            ddfellows provides information about opportunities but is not
            responsible for the accuracy of third-party content or the outcome
            of any applications.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. Continued use of the platform
            after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a
              href="mailto:samuel@disam.dev"
              className="text-primary hover:underline"
            >
              samuel@disam.dev
            </a>
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t">
        <Link href="/privacy" className="text-primary hover:underline">
          View Privacy Policy
        </Link>
      </div>
    </div>
  );
}

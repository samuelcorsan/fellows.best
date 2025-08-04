import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-muted-foreground mb-6">Last updated: 08/04/2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy explains how fellows.best (&quot;we,&quot;
            &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects
            your personal data in accordance with the General Data Protection
            Regulation (GDPR) and other applicable privacy laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p>We collect and process the following types of personal data:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Account information (email, name) when you register</li>
            <li>Profile information you choose to provide</li>
            <li>Usage data through Vercel Analytics</li>
            <li>Information you submit when adding opportunities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Data
          </h2>
          <p>We process your personal data for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analytics to improve our services</li>
            <li>To send you relevant opportunities (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Third-Party Services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <strong>Vercel Analytics:</strong> For website analytics and
              performance monitoring. This service collects anonymous usage
              data.
            </li>
            <li>
              <strong>Neon.tech:</strong> For database services and data storage.
              Your application data is securely stored and managed through
              Neon&apos;s PostgreSQL database platform.
            </li>
            <li>
              <strong>Better Auth:</strong> For secure authentication services.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Data Storage and Security
          </h2>
          <p>
            Your data is stored securely in the EU region. We implement
            appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure,
            or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Your Rights Under GDPR
          </h2>
          <p>You have the following rights:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Cookies and Tracking
          </h2>
          <p>
            We use essential cookies and Vercel Analytics to improve our
            services. You can control cookie preferences through your browser
            settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. International Transfers
          </h2>
          <p>
            Some of our third-party providers may process data outside the EU.
            We ensure appropriate safeguards are in place through standard
            contractual clauses and adequacy decisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. Contact Information
          </h2>
          <p>
            For privacy-related inquiries or to exercise your rights, contact
            our Data Protection Officer at:
          </p>
          <p className="mt-2">
            Email:{" "}
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
        <Link href="/terms" className="text-primary hover:underline">
          View Terms of Service
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - fellows.best",
  description:
    "Read the terms of service for fellows.best. Understand your rights and responsibilities when using our platform.",
  alternates: {
    canonical: "https://fellows.best/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-muted-foreground mb-6">Last updated: 07/29/2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to fellows.best (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). By accessing or using our website at fellows.best,
            you agree to be bound by these Terms of Service. fellows.best is a
            centralized platform for discovering and tracking fellowships,
            grants, accelerators, and competitions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
          <p>fellows.best provides the following services:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Aggregation of fellowships, grants, accelerators, hackathons,
              residencies, and funding opportunities
            </li>
            <li>Search and filtering functionality for opportunities</li>
            <li>Timeline visualization of deadlines</li>
            <li>Community-driven opportunity submission system</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p>
            When you create an account, you must provide accurate and complete
            information. You are responsible for:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Maintaining the security of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Keeping your contact information and preferences up to date</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. User Content and Submissions
          </h2>
          <p>
            Users may submit opportunities to our platform. By submitting
            content, you:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Confirm that the information is accurate and complete</li>
            <li>
              Grant us a license to display and use the content on our platform
            </li>
            <li>
              Understand that submissions may be moderated or edited by our team
            </li>
            <li>
              Agree not to submit false, misleading, or fraudulent opportunities
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p>
            The fellows.best platform, including its design, logos, features,
            and content created by us, is protected by copyright and other
            intellectual property rights. This includes:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>The timeline visualization system</li>
            <li>Our filtering and search functionality</li>
            <li>The user interface and design</li>
            <li>Our database of aggregated opportunities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p>While we strive to maintain accurate information, fellows.best:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Is not responsible for the accuracy of third-party opportunity
              listings
            </li>
            <li>Does not guarantee the outcome of any applications</li>
            <li>Cannot verify all details of submitted opportunities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Data Usage and Privacy
          </h2>
          <p>
            We collect and process data in accordance with our Privacy Policy.
            This includes:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>User account information</li>
            <li>Usage analytics to improve our service</li>
            <li>Information submitted through the platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. We will notify users of
            significant changes through:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Platform announcements</li>
            <li>Updates to the Last Updated date</li>
          </ul>
          <p className="mt-2">
            Continued use of the platform after changes constitutes acceptance
            of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p>
            For questions about these terms or the platform, contact us at{" "}
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

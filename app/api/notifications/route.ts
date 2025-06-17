import { NextResponse } from "next/server";
import { authClient } from "@/lib/auth-client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const session = await authClient.getSession();
    const userEmail = session?.data?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { opportunityId, opportunityName, enabled, closeDate } =
      await request.json();

    // Store the notification preference in your database here
    // For now, we'll just simulate it

    if (enabled) {
      // Calculate reminder dates
      const deadline = new Date(closeDate);
      const weekBefore = new Date(deadline);
      weekBefore.setDate(deadline.getDate() - 7);
      const dayBefore = new Date(deadline);
      dayBefore.setDate(deadline.getDate() - 1);

      // Schedule emails (in a real app, you'd use a job queue)
      if (new Date() < weekBefore) {
        await resend.emails.send({
          from: "DDFellow <notifications@ddfellow.com>",
          to: userEmail,
          subject: `Reminder: ${opportunityName} deadline in 1 week`,
          html: `
            <h1>Deadline Reminder</h1>
            <p>The deadline for ${opportunityName} is in one week (${deadline.toLocaleDateString()}).</p>
            <p>Don't forget to submit your application!</p>
          `,
        });
      }

      if (new Date() < dayBefore) {
        await resend.emails.send({
          from: "DDFellow <notifications@ddfellow.com>",
          to: userEmail,
          subject: `Reminder: ${opportunityName} deadline tomorrow`,
          html: `
            <h1>Final Reminder</h1>
            <p>The deadline for ${opportunityName} is tomorrow (${deadline.toLocaleDateString()}).</p>
            <p>Make sure to submit your application before it's too late!</p>
          `,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 }
    );
  }
}

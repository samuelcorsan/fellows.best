"use client";

import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/lib/data";

interface CalendarButtonProps {
  opportunity: Opportunity;
}

export function CalendarButton({ opportunity }: CalendarButtonProps) {
  const generateICS = () => {
    const startDate = new Date(opportunity.closeDate || "");
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ddfellow//Calendar//EN",
      "BEGIN:VEVENT",
      `UID:${opportunity.id}@ddfellow.com`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${opportunity.name} - Application Deadline`,
      `DESCRIPTION:Application deadline for ${opportunity.name}. ${opportunity.description}\\n\\nApply at: ${opportunity.applyLink}`,
      `URL:${opportunity.applyLink}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${opportunity.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-deadline.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateGoogleCalendarLink = () => {
    const startDate = new Date(opportunity.closeDate || "");
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${opportunity.name} - Application Deadline`,
      dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(
        endDate
      )}`,
      details: `Application deadline for ${opportunity.name}. ${opportunity.description}\n\nApply at: ${opportunity.applyLink}`,
      location: opportunity.region,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={generateICS}
        className="flex items-center space-x-2"
      >
        <Download className="h-4 w-4" />
        <span>Download .ics</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(generateGoogleCalendarLink(), "_blank")}
        className="flex items-center space-x-2"
      >
        <Calendar className="h-4 w-4" />
        <span>Google Calendar</span>
      </Button>
    </div>
  );
}

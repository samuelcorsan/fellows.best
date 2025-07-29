"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import { Opportunity } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CalendarButtonProps {
  opportunity: Opportunity;
}

export function CalendarButton({ opportunity }: CalendarButtonProps) {
  const formatDateForCalendar = (
    date: Date,
    format: "google" | "outlook" | "yahoo" | "ics" = "ics"
  ) => {
    switch (format) {
      case "google":
      case "outlook":
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      case "yahoo":
        return date.toISOString().replace(/-|:|\.\d{3}/g, "");
      default:
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }
  };

  const generateICS = () => {
    const startDate = new Date(opportunity.closeDate || "");
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//fellows.best//Calendar//EN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${opportunity.id}@fellows.best`,
      `DTSTART:${formatDateForCalendar(startDate)}`,
      `DTEND:${formatDateForCalendar(endDate)}`,
      `SUMMARY:${opportunity.name} - Application Deadline`,
      `DESCRIPTION:Application deadline for ${opportunity.name}. ${opportunity.description}\\n\\nApply at: ${opportunity.applyLink}`,
      `URL:${opportunity.applyLink}`,
      `LOCATION:${opportunity.region}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-PT24H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Application deadline tomorrow",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${opportunity.name.replace(/\s+/g, "-").toLowerCase()}-deadline.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateGoogleCalendarLink = () => {
    const startDate = new Date(opportunity.closeDate || "");
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${opportunity.name} - Application Deadline`,
      dates: `${formatDateForCalendar(startDate, "google")}/${formatDateForCalendar(endDate, "google")}`,
      details: `Application deadline for ${opportunity.name}. ${opportunity.description}\n\nApply at: ${opportunity.applyLink}`,
      location: opportunity.region,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateOutlookOnlineLink = () => {
    const startDate = new Date(opportunity.closeDate || "");
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const params = new URLSearchParams({
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
      subject: `${opportunity.name} - Application Deadline`,
      body: `Application deadline for ${opportunity.name}. ${opportunity.description}\n\nApply at: ${opportunity.applyLink}`,
      location: opportunity.region,
    });

    return `https://outlook.office.com/calendar/action/compose?${params.toString()}`;
  };

  const generateYahooCalendarLink = () => {
    const startDate = new Date(opportunity.closeDate || "");
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const params = new URLSearchParams({
      v: "60",
      title: `${opportunity.name} - Application Deadline`,
      st: formatDateForCalendar(startDate, "yahoo"),
      et: formatDateForCalendar(endDate, "yahoo"),
      desc: `Application deadline for ${opportunity.name}. ${opportunity.description}\n\nApply at: ${opportunity.applyLink}`,
      in_loc: opportunity.region,
    });

    return `https://calendar.yahoo.com/?${params.toString()}`;
  };

  const calendarOptions = [
    {
      name: "Google",
      action: () => window.open(generateGoogleCalendarLink(), "_blank"),
      icon: "/icons/google.png",
      color:
        "bg-[#4285F4]/10 hover:bg-[#4285F4]/20 border-[#4285F4]/20 hover:border-[#4285F4]",
      textColor: "text-[#4285F4]",
      size: "w-12 h-12",
    },
    {
      name: "Outlook",
      action: () => window.open(generateOutlookOnlineLink(), "_blank"),
      icon: "/icons/outlook.png",
      color:
        "bg-[#0078D4]/10 hover:bg-[#0078D4]/20 border-[#0078D4]/20 hover:border-[#0078D4]",
      textColor: "text-[#0078D4]",
      size: "w-12 h-12",
    },
    {
      name: "Yahoo",
      action: () => window.open(generateYahooCalendarLink(), "_blank"),
      icon: "/icons/yahoo.png",
      color:
        "bg-[#6001D2]/10 hover:bg-[#6001D2]/20 border-[#6001D2]/20 hover:border-[#6001D2]",
      textColor: "text-[#6001D2]",
      size: "w-16 h-12",
    },
    {
      name: "Apple",
      action: generateICS,
      icon: "/icons/apple.webp",
      color:
        "bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 border-[#FF3B30]/20 hover:border-[#FF3B30]",
      textColor: "text-[#FF3B30]",
      size: "w-12 h-12",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {calendarOptions.map((option) => (
          <button
            key={option.name}
            onClick={option.action}
            className={cn(
              "group relative flex flex-col items-center p-4 rounded-xl min-h-[100px]",
              "border-2 transition-all duration-300 ease-in-out transform hover:scale-[1.02]",
              "shadow-sm hover:shadow-md",
              option.color
            )}
          >
            <div className="relative mb-3 flex items-center justify-center">
              <div className="absolute inset-0" />
              <Image
                src={option.icon}
                alt={`${option.name} Calendar`}
                className={cn("relative object-contain", option.size)}
                width={option.name === "Yahoo" ? 64 : 48}
                height={48}
                priority
              />
            </div>
            <span
              className={cn(
                "text-sm font-semibold transition-colors duration-300",
                option.textColor
              )}
            >
              {option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

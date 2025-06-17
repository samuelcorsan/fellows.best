"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationToggleProps {
  opportunityId: string;
  opportunityName: string;
}

export function NotificationToggle({
  opportunityId,
  opportunityName,
}: NotificationToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (enabled: boolean) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsEnabled(enabled);
    setIsLoading(false);

    // In a real app, you would store this preference and set up notifications
    console.log(
      `Notification ${enabled ? "enabled" : "disabled"} for ${opportunityName}`
    );
  };

  return (
    <div className="flex items-center space-x-3 p-4 border rounded-lg">
      <div className="flex items-center space-x-2">
        {isEnabled ? (
          <Bell className="h-5 w-5 text-blue-600" />
        ) : (
          <BellOff className="h-5 w-5 text-muted-foreground" />
        )}
        <div>
          <Label
            htmlFor={`notification-${opportunityId}`}
            className="font-medium"
          >
            Deadline Reminder
          </Label>
          <p className="text-sm text-muted-foreground">
            Get notified 1 week and 1 day before the deadline
          </p>
        </div>
      </div>
      <Switch
        id={`notification-${opportunityId}`}
        checked={isEnabled}
        onCheckedChange={handleToggle}
        disabled={isLoading}
      />
    </div>
  );
}

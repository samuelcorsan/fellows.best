"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface NotificationToggleProps {
  opportunityId: string;
  opportunityName: string;
  closeDate?: string | null;
}

export function NotificationToggle({
  opportunityId,
  opportunityName,
  closeDate,
}: NotificationToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const handleToggle = async (enabled: boolean) => {
    try {
      setIsLoading(true);

      if (!session?.user?.email) {
        toast.error("Please sign in to enable notifications");
        return;
      }

      if (!closeDate) {
        toast.error("No deadline set for this opportunity");
        return;
      }

      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opportunityId,
          opportunityName,
          enabled,
          closeDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update notification settings");
      }

      setIsEnabled(enabled);
      toast.success(
        enabled
          ? "Reminder notifications enabled"
          : "Reminder notifications disabled"
      );
    } catch (error) {
      console.error("Error updating notifications:", error);
      toast.error("Failed to update notification settings");
    } finally {
      setIsLoading(false);
    }
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
        disabled={isLoading || !session?.user?.email}
      />
    </div>
  );
}

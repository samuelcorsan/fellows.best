"use client";

import { useState, useEffect } from "react";
import {
  User,
  Bookmark,
  Bell,
  Settings,
  Calendar,
  Heart,
  Upload,
  Award,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpportunityCard } from "@/components/features/OpportunityCard";
import { mockOpportunities } from "@/lib/data";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

interface ParticipatedFellowship {
  id: string;
  name: string;
  organizer: string;
  year: string;
  status: "completed" | "ongoing";
  imageUrl: string;
  description: string;
  category: string;
}

const mockParticipatedFellowships: ParticipatedFellowship[] = [
  {
    id: "1",
    name: "Y Combinator S23",
    organizer: "Y Combinator",
    year: "2023",
    status: "completed",
    imageUrl:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    description: "Completed the 3-month accelerator program with my startup",
    category: "accelerator",
  },
  {
    id: "2",
    name: "Google AI Research Fellowship",
    organizer: "Google Research",
    year: "2024",
    status: "ongoing",
    imageUrl:
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    description: "Currently working on machine learning research project",
    category: "fellowship",
  },
  {
    id: "3",
    name: "TechCrunch Disrupt Winner",
    organizer: "TechCrunch",
    year: "2023",
    status: "completed",
    imageUrl:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    description: "Won first place at Startup Battlefield competition",
    category: "competition",
  },
];

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [userProfile, setUserProfile] = useState({
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "demo@example.com",
    location: "San Francisco, CA",
    interests: ["startups", "AI", "sustainability"],
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("bookmarked-opportunities");
    if (saved) {
      setBookmarkedIds(JSON.parse(saved));
    }
  }, []);

  const bookmarkedOpportunities = mockOpportunities.filter((opp) =>
    bookmarkedIds.includes(opp.id)
  );

  const handleProfileUpdate = (field: string, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (setting: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [setting]: value }));
  };

  const toggleBookmark = (opportunityId: string) => {
    const newBookmarked = bookmarkedIds.includes(opportunityId)
      ? bookmarkedIds.filter((id) => id !== opportunityId)
      : [...bookmarkedIds, opportunityId];

    setBookmarkedIds(newBookmarked);
    localStorage.setItem(
      "bookmarked-opportunities",
      JSON.stringify(newBookmarked)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 dark:from-black dark:via-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-gray-800 to-black flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  {isPending
                    ? "Loading..."
                    : `Welcome back, ${session?.user?.name || "Guest"}!`}
                </h1>
                <p className="text-neutral-600 dark:text-neutral-300 mb-1">
                  Logged in as {session?.user?.email || "demo@example.com"}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  Track your favorite opportunities and never miss a deadline
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                <span>{bookmarkedOpportunities.length} saved</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="bookmarked" className="space-y-6">
            <div className="bg-white dark:bg-black rounded-xl shadow-sm p-1">
              <TabsList className="grid w-full grid-cols-4 bg-transparent">
                <TabsTrigger
                  value="bookmarked"
                  className="flex items-center space-x-2 data-[state=active]:bg-neutral-200 data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-white"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Bookmarked</span>
                </TabsTrigger>
                <TabsTrigger
                  value="participated"
                  className="flex items-center space-x-2 data-[state=active]:bg-neutral-200 data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-white"
                >
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Participated</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center space-x-2 data-[state=active]:bg-neutral-200 data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-white"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center space-x-2 data-[state=active]:bg-neutral-200 data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-white"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="bookmarked" className="space-y-6">
              <div className="bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                        Bookmarked Opportunities
                      </h2>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Keep track of opportunities you're interested in
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {bookmarkedOpportunities.length}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        saved
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {bookmarkedOpportunities.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                        <Bookmark className="h-12 w-12 text-neutral-800 dark:text-neutral-200" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                        No bookmarked opportunities yet
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-md mx-auto">
                        Start bookmarking opportunities you're interested in to
                        keep track of them here.
                      </p>
                      <Button
                        asChild
                        className="bg-gray-900 hover:bg-black text-white"
                      >
                        <a href="/browse">Browse Opportunities</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {bookmarkedOpportunities.map((opportunity) => (
                        <div key={opportunity.id} className="relative">
                          <OpportunityCard
                            opportunity={opportunity}
                            variant="compact"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-3 right-3 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => toggleBookmark(opportunity.id)}
                          >
                            <Heart className="h-4 w-4 fill-gray-800 text-gray-800 dark:fill-gray-200 dark:text-gray-200" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="participated" className="space-y-6">
              <div className="bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                        Fellowship Participated
                      </h2>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Your journey through various programs and competitions
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {mockParticipatedFellowships.length}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        programs
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {mockParticipatedFellowships.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                        <Trophy className="h-12 w-12 text-neutral-800 dark:text-neutral-200" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                        No participated programs yet
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-md mx-auto">
                        Once you participate in fellowships or programs, they'll
                        appear here with your achievements.
                      </p>
                      <Button
                        asChild
                        className="bg-gray-900 hover:bg-black text-white"
                      >
                        <a href="/browse">Find Opportunities</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {mockParticipatedFellowships.map((fellowship) => (
                        <div
                          key={fellowship.id}
                          className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
                              <Image
                                src={fellowship.imageUrl}
                                alt={fellowship.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    fellowship.status === "completed"
                                      ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                                      : "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                                  }`}
                                >
                                  {fellowship.status === "completed"
                                    ? "Completed"
                                    : "Ongoing"}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                                    {fellowship.name}
                                  </h3>
                                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                                    {fellowship.organizer} • {fellowship.year}
                                  </p>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 mt-2 sm:mt-0">
                                  {fellowship.category}
                                </span>
                              </div>
                              <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
                                {fellowship.description}
                              </p>
                              <div className="flex items-center space-x-4">
                                <Button variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Update Photo
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                                >
                                  View Certificate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer">
                        <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                          <Upload className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                          Add New Achievement
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                          Upload photos and details of your latest fellowship or
                          program participation
                        </p>
                        <Button
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Add Achievement
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-neutral-200 dark:border-neutral-700">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    Notification Preferences
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Manage how you receive updates about opportunities
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
                      </div>
                      <div>
                        <Label
                          htmlFor="email-notifications"
                          className="text-base font-medium text-gray-900 dark:text-white"
                        >
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Receive deadline reminders via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        handleNotificationToggle("email", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
                      </div>
                      <div>
                        <Label
                          htmlFor="push-notifications"
                          className="text-base font-medium text-gray-900 dark:text-white"
                        >
                          Push Notifications
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Get browser notifications for urgent deadlines
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        handleNotificationToggle("push", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
                      </div>
                      <div>
                        <Label
                          htmlFor="weekly-digest"
                          className="text-base font-medium text-gray-900 dark:text-white"
                        >
                          Weekly Digest
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Weekly summary of new opportunities
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={notifications.weekly}
                      onCheckedChange={(checked) =>
                        handleNotificationToggle("weekly", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-neutral-200 dark:border-neutral-700">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    Profile Settings
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Manage your account information and preferences
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) =>
                          handleProfileUpdate("name", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) =>
                          handleProfileUpdate("email", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="location"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={userProfile.location}
                      onChange={(e) =>
                        handleProfileUpdate("location", e.target.value)
                      }
                      placeholder="City, Country"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gray-900 hover:bg-black text-white">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-neutral-200 dark:border-neutral-700">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Account Actions
                  </h2>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between p-4 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                        Export Data
                      </h3>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        Download your bookmarks and preferences
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      Export
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                        Delete Account
                      </h3>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

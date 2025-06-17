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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpportunityCard } from "@/components/OpportunityCard";
import { mockOpportunities, Opportunity } from "@/lib/data";
import Image from "next/image";

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
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "demo@example.com",
    location: "San Francisco, CA",
    interests: ["startups", "AI", "sustainability"],
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  // Load bookmarked opportunities from localStorage
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  Logged in as {userProfile.email}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Track your favorite opportunities and never miss a deadline
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{bookmarkedOpportunities.length} saved</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="bookmarked" className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-1">
              <TabsList className="grid w-full grid-cols-4 bg-transparent">
                <TabsTrigger
                  value="bookmarked"
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/50 dark:data-[state=active]:text-blue-300"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Bookmarked</span>
                </TabsTrigger>
                <TabsTrigger
                  value="participated"
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/50 dark:data-[state=active]:text-blue-300"
                >
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Participated</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/50 dark:data-[state=active]:text-blue-300"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/50 dark:data-[state=active]:text-blue-300"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Bookmarked Opportunities */}
            <TabsContent value="bookmarked" className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Bookmarked Opportunities
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        Keep track of opportunities you're interested in
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {bookmarkedOpportunities.length}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        saved
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {bookmarkedOpportunities.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Bookmark className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No bookmarked opportunities yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                        Start bookmarking opportunities you're interested in to
                        keep track of them here.
                      </p>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
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
                            className="absolute top-3 right-3 h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => toggleBookmark(opportunity.id)}
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Fellowship Participated */}
            <TabsContent value="participated" className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Fellowship Participated
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        Your journey through various programs and competitions
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {mockParticipatedFellowships.length}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        programs
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {mockParticipatedFellowships.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Trophy className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No participated programs yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                        Once you participate in fellowships or programs, they'll
                        appear here with your achievements.
                      </p>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <a href="/browse">Find Opportunities</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {mockParticipatedFellowships.map((fellowship) => (
                        <div
                          key={fellowship.id}
                          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
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
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
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
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                    {fellowship.name}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {fellowship.organizer} • {fellowship.year}
                                  </p>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 mt-2 sm:mt-0">
                                  {fellowship.category}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
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
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                >
                                  View Certificate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add New Achievement */}
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer">
                        <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                          <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Add New Achievement
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          Upload photos and details of your latest fellowship or
                          program participation
                        </p>
                        <Button
                          variant="outline"
                          className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          Add Achievement
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Notification Preferences
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Manage how you receive updates about opportunities
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
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

            {/* Profile Settings */}
            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Profile Settings
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
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
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Account Actions
                  </h2>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Export Data
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Download your bookmarks and preferences
                      </p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400">
                        Delete Account
                      </h3>
                      <p className="text-sm text-red-500 dark:text-red-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive">Delete</Button>
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

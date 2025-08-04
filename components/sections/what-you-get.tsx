import { Search, Filter, Calendar, Bell, Users, Clock } from "lucide-react";

export function WhatYouGetSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-medium mb-4">What You Get</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to discover and track fellowship opportunities
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border rounded-lg overflow-hidden relative">
          <div
            className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border lg:border-b-0"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center mb-5">
                <Search className="h-5 w-5 text-primary mr-3" />
                <span className="text-sm font-medium text-primary">
                  Discovery
                </span>
              </div>
              <h3 className="text-xl mb-2">Opportunity Aggregation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Browse fellowships, grants, accelerators, hackathons, and
                funding opportunities from diverse sources all in one
                centralized platform.
              </p>
            </div>
          </div>

          <div
            className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-r-0 lg:border-r lg:border-b-0"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center mb-5">
                <Filter className="h-5 w-5 text-primary mr-3" />
                <span className="text-sm font-medium text-primary">
                  Filtering
                </span>
              </div>
              <h3 className="text-xl mb-2">Advanced Search</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Filter opportunities by region, category, deadline status,
                keywords, and tags to find exactly what matches your interests
                and profile.
              </p>
            </div>
          </div>

          <div
            className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-b border-border md:border-r lg:border-r-0 lg:border-b-0"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center mb-5">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <span className="text-sm font-medium text-primary">
                  Timeline
                </span>
              </div>
              <h3 className="text-xl mb-2">Deadline Visualization</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Visualize upcoming deadlines over weeks and months in an
                interactive timeline view to plan your applications
                strategically.
              </p>
            </div>
          </div>

          <div
            className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-b-0 lg:border-b"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center mb-5">
                <Bell className="h-5 w-5 text-primary mr-3" />
                <span className="text-sm font-medium text-primary">
                  Reminders
                </span>
              </div>
              <h3 className="text-xl mb-2">Smart Alerts</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Save opportunity deadlines directly to your calendar and never
                miss an application window with integrated calendar exports.
              </p>
            </div>
          </div>

          <div
            className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-r-0 md:border-b-0 lg:border-r lg:border-b"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-primary">
                    Dashboard
                  </span>
                </div>
                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-lg font-medium">
                  Soon
                </span>
              </div>
              <h3 className="text-xl mb-2">Personal Tracking</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Save fellowships you've attended in your profile, ask alumni
                for recommendations to join, and build your fellowship network.
              </p>
            </div>
          </div>

          <div
            className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center mb-5">
                <Clock className="h-5 w-5 text-primary mr-3" />
                <span className="text-sm font-medium text-primary">
                  Community
                </span>
              </div>
              <h3 className="text-xl mb-2">Community Driven</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submit new opportunities through our community-driven platform.
                Help others discover amazing fellowships and funding
                opportunities.
              </p>
            </div>
          </div>

          <div
            className="absolute hidden md:block w-full h-px bg-border"
            style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
          ></div>
          <div
            className="absolute hidden lg:block w-3 h-px bg-black dark:bg-white"
            style={{
              left: "33.333%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          <div
            className="absolute hidden lg:block w-px h-3 bg-black dark:bg-white"
            style={{
              left: "33.333%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>

          <div
            className="absolute hidden lg:block w-3 h-px bg-black dark:bg-white"
            style={{
              left: "66.666%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
          <div
            className="absolute hidden lg:block w-px h-3 bg-black dark:bg-white"
            style={{
              left: "66.666%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
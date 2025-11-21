"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Github, ArrowRight, Code, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";

export function ContributeSection() {
  const [step, setStep] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 20, y: 20 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSubmitUi, setShowSubmitUi] = useState(false);
  const [submitBtnEffect, setSubmitBtnEffect] = useState(false);
  const [contributeBtnEffect, setContributeBtnEffect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const textOptions = [
    "https://vercel.com/open-source-program",
    "https://f.inc",
    "https://zfellows.com",
    "https://a16z.com",
  ];

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let isMounted = true;

    const runAnimation = async () => {
      if (!isMounted) return;

      setStep(0);
      setShowSubmitUi(false);
      setInputValue("");
      setCursorVisible(false);
      setCursorPos({ x: 10, y: 15 });
      setSubmitBtnEffect(false);
      setContributeBtnEffect(false);
      setShowSuccess(false);

      await wait(1000);
      if (!isMounted) return;
      setCursorVisible(true);
      await wait(500);
      if (!isMounted) return;
      setCursorPos({ x: 88, y: 15 });

      await wait(1000);
      if (!isMounted) return;
      setClickEffect(true);
      setContributeBtnEffect(true);
      await wait(200);
      if (!isMounted) return;
      setClickEffect(false);
      await wait(100);
      if (!isMounted) return;
      setContributeBtnEffect(false);

      await wait(300);
      if (!isMounted) return;
      setShowSubmitUi(true);

      await wait(100);
      if (!isMounted) return;
      setCursorPos({ x: 50, y: 50 });

      await wait(1000);
      if (!isMounted) return;
      const text = textOptions[Math.floor(Math.random() * textOptions.length)];
      for (let i = 0; i <= text.length; i++) {
        if (!isMounted) return;
        setInputValue(text.slice(0, i));
        await wait(50 + Math.random() * 50);
      }

      await wait(500);
      if (!isMounted) return;
      setCursorPos({ x: 85, y: 53 });

      await wait(800);
      if (!isMounted) return;
      setClickEffect(true);
      setSubmitBtnEffect(true);
      await wait(200);
      if (!isMounted) return;
      setClickEffect(false);
      await wait(100);
      if (!isMounted) return;
      setSubmitBtnEffect(false);
      setShowSuccess(true);

      await wait(2500);
      if (!isMounted) return;
      runAnimation();
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, [hasAnimated]);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <section
      ref={sectionRef}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
        <div className="order-2 lg:order-1 space-y-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            Open Source
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built by the community, <br className="hidden lg:block" />
            for the community.
          </h2>
          <p className="text-lg text-muted-foreground">
            fellows.best is completely open source. We believe in transparency
            and collaboration. Check out our code, report bugs, suggest
            features, or contribute directly to the codebase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild className="group">
              <Link
                href="https://github.com/samuelcorsan/fellows.best"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          className={`order-1 lg:order-2 relative mx-auto w-full max-w-[500px] lg:max-w-none perspective-1000 px-4 lg:px-0 transition-all duration-700 ease-out transform ${isInView ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"}`}
        >
          <div className="relative rounded-xl border bg-background shadow-2xl overflow-hidden h-[400px] flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded-md bg-background border flex items-center px-3 text-xs text-muted-foreground gap-2 truncate">
                  <Github className="h-3 w-3 shrink-0" />
                  <span className="truncate">
                    github.com/samuelcorsan/fellows.best
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex-1 bg-card/50 overflow-hidden">
              <div
                className={`absolute inset-0 p-6 transition-all duration-500 transform ${showSubmitUi ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border bg-background">
                      <img
                        src="https://github.com/samuelcorsan.png"
                        alt="samuelcorsan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate">
                        fellows.best
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        The open source fellowship platform
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <div className="h-8 w-20 bg-muted/50 rounded hidden sm:block" />
                    <div
                      className={`h-8 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded hidden sm:flex items-center justify-center shadow-sm transition-all ${contributeBtnEffect ? "scale-95 opacity-90" : ""}`}
                    >
                      Contribute
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden bg-background mb-6">
                  <div className="px-4 py-3 border-b bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full overflow-hidden">
                        <img
                          src="https://github.com/samuelcorsan.png"
                          alt="samuelcorsan"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-medium">samuelcorsan</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      last month
                    </div>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="px-4 py-3 border-b last:border-0 flex items-center gap-3"
                    >
                      <Code className="h-4 w-4 text-muted-foreground" />
                      <div className="h-3 w-24 bg-muted/50 rounded" />
                      <div className="ml-auto h-3 w-12 bg-muted/30 rounded" />
                    </div>
                  ))}
                </div>

                <div className="border rounded-lg p-4 bg-background relative overflow-hidden flex-1 min-h-[180px]">
                  <div className="h-5 w-32 bg-primary/10 rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-muted/50 rounded" />
                    <div className="h-2 w-[80%] bg-muted/50 rounded" />
                    <div className="h-2 w-[90%] bg-muted/50 rounded" />
                  </div>
                </div>
              </div>

              <div
                className={`absolute inset-0 p-6 transition-all duration-500 transform ${showSubmitUi ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
              >
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold">Submit an Opportunity</h3>
                    <p className="text-xs text-muted-foreground">
                      Help others discover amazing opportunities
                    </p>
                  </div>

                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium leading-none">
                        Short on time?
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Paste the URL and we'll handle the rest.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-9 rounded-md border bg-background px-3 py-1 text-xs shadow-sm flex items-center">
                        {inputValue || (
                          <span className="text-muted-foreground">
                            https://example.com/opportunity
                          </span>
                        )}
                        {inputValue && (
                          <span className="ml-0.5 animate-pulse">|</span>
                        )}
                      </div>
                      <div
                        className={`h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium shadow transition-all ${submitBtnEffect ? "scale-95 opacity-90" : ""}`}
                      >
                        Submit URL
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or fill out the full form
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 opacity-50">
                    <div className="h-4 w-24 bg-foreground/20 rounded" />
                    <div className="h-9 w-full border rounded-md bg-background/50" />
                  </div>
                </div>

                <div
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-md shadow-lg flex items-center gap-2 text-xs font-medium transition-all duration-500 ${showSuccess ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Opportunity submitted!
                </div>
              </div>

              <div
                className="absolute pointer-events-none z-50 transition-all duration-[1000ms] ease-in-out"
                style={{
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                  opacity: cursorVisible ? 1 : 0,
                  transform: `translate(-10%, -10%) scale(${clickEffect ? 0.9 : 1})`,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-xl"
                >
                  <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7116 11.6917L7.72688 11.6917L5.65376 12.3673Z"
                    fill="black"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
                {clickEffect && (
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/30 rounded-full animate-ping opacity-75" />
                )}
              </div>
            </div>
          </div>

          <div className="absolute -z-10 top-10 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-10 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Search, Globe, Database, ArrowRight, CheckCircle2 } from "lucide-react";

export function ScrapingSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            Automated Discovery
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            We scour the entire internet <br className="hidden lg:block" />
            so you don't have to.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Our intelligent bots continuously scan university pages, company careers sites, and funding portals 24/7. When a new fellowship or grant appears, we index it instantly.
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Global Coverage</h3>
                <p className="text-sm text-muted-foreground">Monitoring thousands of sources worldwide</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Real-time Indexing</h3>
                <p className="text-sm text-muted-foreground">Opportunities added minutes after publication</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg relative">
          <div className="relative aspect-square md:aspect-[4/3] bg-muted/30 rounded-2xl border border-border overflow-hidden">
            
            <div className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
                backgroundSize: '20px 20px',
                opacity: 0.4
              }}
            />

            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-primary z-20 shadow-[0_0_20px_rgba(var(--primary),0.5)]"
              animate={{
                top: ["10%", "90%", "10%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                ease: "linear",
                repeat: Infinity,
              }}
            />

            <div 
              className="absolute left-8 top-8 bottom-8 w-48 flex flex-col gap-4 overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-lg p-3 shadow-sm h-24 flex flex-col gap-2"
                  initial={{ opacity: 0.5, x: 0 }}
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                    borderColor: ["var(--border)", "var(--primary)", "var(--border)"]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <div className="h-2 w-20 bg-muted rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-muted/50 rounded" />
                    <div className="h-1.5 w-3/4 bg-muted/50 rounded" />
                    <div className="h-1.5 w-full bg-muted/50 rounded" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48">
              <motion.div
                className="bg-card border border-primary/20 rounded-xl p-4 shadow-xl z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: [20, 0, 0, -20],
                  y: [0, 0, -100, -100] // Move up to "store" it
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.1, 0.8, 1],
                  delay: 1.5 // Sync with scan
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">New</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-foreground/80 rounded" />
                  <div className="h-1.5 w-full bg-muted-foreground/30 rounded" />
                  <div className="flex gap-1 mt-2">
                    <div className="h-4 w-12 bg-muted rounded" />
                    <div className="h-4 w-12 bg-muted rounded" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-full top-1/2 w-16 h-[2px] bg-primary origin-right"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.1, 0.3, 0.4],
                  delay: 1.5
                }}
              />
            </div>

            <motion.div 
              className="absolute bottom-4 right-4 bg-background/80 backdrop-blur border border-border rounded-full px-3 py-1 text-xs font-mono flex items-center gap-2"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 2.3 // When card is "processed"
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Scanning active...
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}



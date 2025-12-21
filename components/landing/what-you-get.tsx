"use client";

import { useRef, useEffect } from "react";
import {
  Search,
  Filter,
  Bell,
  Users,
  Clock,
} from "lucide-react";

const cards = [
  {
    icon: Search,
    title: "Opportunity Aggregation",
    subtitle: "Browse fellowships, grants, accelerators, hackathons, and funding opportunities from diverse sources all in one centralized platform.",
    category: "Discovery",
    span: "col-span-2 row-span-2", // Large card
    image: "https://res.cloudinary.com/disamtech/image/upload/v1766317468/fellows/mockups/yviwphvmvcem7ewrkrpf.png",
  },
  {
    icon: Filter,
    title: "Advanced Search",
    subtitle: "Filter opportunities by region, category, deadline status, keywords, and tags to find exactly what matches your interests and profile.",
    category: "Filtering",
    span: "col-span-2 row-span-2", // Large card at top right
    image: "https://res.cloudinary.com/disamtech/image/upload/v1766319991/fellows/mockups/n58tm0uiflksugnbevgs.png",
  },
  {
    icon: Clock,
    title: "Community Driven",
    subtitle: "Submit new opportunities through our community-driven platform. Help others discover amazing fellowships and funding opportunities.",
    category: "Community",
    span: "col-span-2 row-span-1", // Wide card on left
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    subtitle: "Save opportunity deadlines directly to your calendar and never miss an application window with integrated calendar exports.",
    category: "Reminders",
    span: "col-span-1 row-span-1", // Small card on right
  },
  {
    icon: Users,
    title: "Personal Tracking",
    subtitle: "Save fellowships you've attended in your profile, ask alumni for recommendations to join, and build your fellowship network.",
    category: "Dashboard",
    badge: "Soon",
    span: "col-span-1 row-span-1", // Small card on right
    hideOnMobile: true, // Hide on mobile
  },
];

const cardStyles = `
  #cards-container {
    --bg-color: rgb(20, 20, 20);
    --card-color: rgb(23, 23, 23);
  }

  #cards-container #cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    gap: 12px;
    max-width: 1120px;
    width: 100%;
  }

  #cards-container #cards:hover > .card::after {
    opacity: 1;
  }

  #cards-container .card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Bento grid spans */
  #cards-container .card.col-span-2 {
    grid-column: span 2 !important;
  }

  #cards-container .card.row-span-2 {
    grid-row: span 2 !important;
  }

  #cards-container .card.col-span-1 {
    grid-column: span 1;
  }

  #cards-container .card.row-span-1 {
    grid-row: span 1;
  }

  #cards-container .card:hover::before {
    opacity: 1;
  }

  #cards-container .card::before,
  #cards-container .card::after {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
  }

  #cards-container .card::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    z-index: 3;
  }

  #cards-container .card::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
    );
    z-index: 1;
  }

  #cards-container .card > .card-content {
    background-color: var(--card-color);
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    inset: 1px;
    padding: 32px;
    padding-top: 32px;
    position: absolute;
    z-index: 2;
    justify-content: flex-start;
    align-items: stretch;
    overflow: hidden;
  }

  #cards-container .card-info-wrapper {
    align-items: flex-start;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
  }

  #cards-container .card-info {
    width: 100%;
  }

  #cards-container .card-info-title {
    flex: 1;
    width: 100%;
  }

  #cards-container .card-info-title .category-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  #cards-container .card-info-title .category-label > svg {
    width: 20px;
    height: 20px;
    color: hsl(var(--primary));
    flex-shrink: 0;
  }

  #cards-container .card-info-title .category-label > span:first-of-type {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--primary));
  }

  #cards-container .card-info-title .category-label .ml-auto {
    margin-left: auto;
  }

  #cards-container .card-info-title > h3 {
    font-size: 1.25rem;
    line-height: 1.3;
    color: rgb(240, 240, 240);
    font-family: "Rubik", sans-serif;
    font-weight: 400;
    margin: 0px;
    margin-bottom: 8px;
  }

  #cards-container .card-info-title > h4 {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    margin-top: 0px;
    font-family: "Rubik", sans-serif;
    font-weight: 400;
    line-height: 1.5;
  }

  #cards-container .card-image {
    width: 100%;
    height: auto;
    margin-top: 16px;
    border-radius: 8px;
    object-fit: cover;
    max-height: 400px;
    transform: scale(1.6) translateY(40px) translateX(-10px);
    transform-origin: center center;
    object-position: center;
  }

  #cards-container .card-image-search {
    transform: scale(1.1) translateY(-10px) translateX(-10px);
  }

  /* Tablet and smaller desktop */
  @media (max-width: 1024px) {
    #cards-container #cards {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    #cards-container .card.col-span-2 {
      grid-column: span 2;
    }

    #cards-container .card.row-span-2 {
      grid-row: span 2;
    }
  }

  /* Mobile landscape and small tablets */
  @media (max-width: 768px) {
    #cards-container #cards {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 220px;
      gap: 8px;
    }

    #cards-container .card.col-span-2 {
      grid-column: span 2;
    }

    #cards-container .card.row-span-2 {
      grid-row: span 1;
    }

    #cards-container .card.hide-mobile {
      display: none;
    }

    #cards-container .card > .card-content {
      padding: 20px;
    }

    #cards-container .card-info-title > h3 {
      font-size: 1.2rem;
    }

    #cards-container .card-info-title > h4 {
      font-size: 0.7rem;
    }

    #cards-container .card-image {
      margin-top: 12px;
      max-height: 250px;
      transform: scale(1.05);
    }

    #cards-container .card-image-search {
      transform: scale(1.0) translateY(-5px);
    }
  }

  /* Mobile portrait */
  @media (max-width: 640px) {
    #cards-container #cards {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      gap: 8px;
    }

    #cards-container .card {
      min-height: 200px;
    }

    #cards-container .card.col-span-2 {
      grid-column: span 1;
    }

    #cards-container .card.row-span-2 {
      grid-row: span 1;
    }

    #cards-container .card.hide-mobile {
      display: none;
    }

    #cards-container .card > .card-content {
      padding: 16px;
    }

    #cards-container .card-info-title .category-label {
      margin-bottom: 8px;
    }

    #cards-container .card-info-title .category-label > svg {
      width: 18px;
      height: 18px;
    }

    #cards-container .card-info-title .category-label > span:first-of-type {
      font-size: 0.8rem;
    }

    #cards-container .card-info-title > h3 {
      font-size: 1.15rem;
      margin-bottom: 6px;
    }

    #cards-container .card-info-title > h4 {
      font-size: 0.7rem;
      line-height: 1.4;
    }

    #cards-container .card-image {
      margin-top: 12px;
      max-height: 220px;
      transform: scale(1.05);
    }
  }

  /* Small mobile */
  @media (max-width: 480px) {
    #cards-container #cards {
      gap: 6px;
    }

    #cards-container .card {
      min-height: 190px;
    }

    #cards-container .card.hide-mobile {
      display: none;
    }

    #cards-container .card > .card-content {
      padding: 12px;
    }

    #cards-container .card-info-title .category-label > svg {
      width: 16px;
      height: 16px;
    }

    #cards-container .card-info-title > h3 {
      font-size: 1.1rem;
    }

    #cards-container .card-info-title > h4 {
      font-size: 0.65rem;
    }

    #cards-container .card-image {
      margin-top: 10px;
      max-height: 180px;
      transform: scale(1.03);
    }
  }
`;

export function WhatYouGetSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return;

      const cardElements = Array.from(
        cardsRef.current.getElementsByClassName("card")
      );
      for (const card of cardElements) {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };

    const cardsElement = cardsRef.current;
    if (cardsElement) {
      cardsElement.addEventListener("mousemove", handleMouseMove);
      return () => {
        cardsElement.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cardStyles }} />
      <section id="cards-container" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-2 sm:mb-3 md:mb-4 px-4">What You Get</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to discover and track fellowship opportunities
          </p>
        </div>

        <div className="flex justify-center">
          <div id="cards" ref={cardsRef}>
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className={`card ${card.span} ${card.hideOnMobile ? 'hide-mobile' : ''}`}>
                  <div className="card-content">
                    <div className="card-info-wrapper">
                      <div className="card-info">
                        <div className="card-info-title">
                          <div className="category-label">
                            <Icon />
                            <span>{card.category}</span>
                            {card.badge && (
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded ml-auto">
                                {card.badge}
                              </span>
                            )}
                          </div>
                          <h3>{card.title}</h3>
                          <h4>{card.subtitle}</h4>
                        </div>
                      </div>
                    </div>
                    {card.image && (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className={`card-image ${card.title === "Advanced Search" ? "card-image-search" : ""}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}


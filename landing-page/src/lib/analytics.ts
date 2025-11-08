// Google Analytics 4
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Tipos de eventos
export type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Pageview
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Event tracking
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos pré-configurados para a landing page
export const trackFormStart = () => {
  event({
    action: "form_start",
    category: "engagement",
    label: "research_form",
  });
};

export const trackFormSubmit = () => {
  event({
    action: "form_submit",
    category: "conversion",
    label: "research_signup",
  });
};

export const trackCTAClick = (location: string) => {
  event({
    action: "cta_click",
    category: "engagement",
    label: location,
  });
};

export const trackSectionView = (section: string) => {
  event({
    action: "section_view",
    category: "engagement",
    label: section,
  });
};

// Meta Pixel (Facebook Pixel)
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export const fbPageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const fbEvent = (name: string, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};

// Declarações de tipo para TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    fbq: (command: string, event: string, options?: Record<string, any>) => void;
  }
}

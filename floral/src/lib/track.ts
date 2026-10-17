// Funnel events: consult_started, consult_completed, brief_sent.
// Phase 1 ships without a tracker. To measure, define window.kellyTrack (e.g. a Plausible or
// Umami call) in Base.astro and every event below will flow to it.
declare global {
  interface Window { kellyTrack?: (event: string, props?: Record<string, string>) => void }
}

export function track(event: string, props?: Record<string, string>): void {
  try {
    window.kellyTrack?.(event, props);
  } catch {
    /* analytics must never break the page */
  }
}

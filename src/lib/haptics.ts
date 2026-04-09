// Lightweight haptic feedback for the web.
//
// Uses the Web Vibration API (navigator.vibrate). It works on Android
// browsers (Chrome/Firefox/Edge) but is intentionally a no-op on iOS Safari
// and desktop browsers, where the API does not exist. The visual press
// feedback (CSS .btn-press) handles the cross-platform side of things.
//
// HIG-inspired naming: light / medium / heavy / success.
// Patterns are kept short — long buzzes feel cheap on the web.

type HapticKind = "light" | "medium" | "heavy" | "success";

const PATTERNS: Record<HapticKind, number | number[]> = {
  light: 8,
  medium: 16,
  heavy: 28,
  success: [10, 40, 14],
};

function canVibrate(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.vibrate !== "function") return false;
  // Respect users who have asked the OS to dial down motion.
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return !reduced;
}

export function haptic(kind: HapticKind = "light"): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(PATTERNS[kind]);
  } catch {
    // Silently swallow — vibration must never break a click handler.
  }
}

// Small click handler factory: keeps onClick props tidy.
// Usage: <button onClick={withHaptic("medium", handleSubmit)}>
export function withHaptic<E extends { preventDefault?: () => void }>(
  kind: HapticKind,
  handler?: (e: E) => void,
): (e: E) => void {
  return (e: E) => {
    haptic(kind);
    handler?.(e);
  };
}

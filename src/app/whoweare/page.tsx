import type { Metadata } from "next";
import WhoWeAreContent from "./WhoWeAreContent";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "The Karica team: founders and people building the platform for the energy transition.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function WhoWeArePage() {
  return <WhoWeAreContent />;
}

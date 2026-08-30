import type { Metadata } from "next";
import { PresentationViewer } from "@/components/presentation-viewer";

export const metadata: Metadata = {
  title: "ContextSE · Hackathon Presentation",
};

export default function PresentationPage() {
  return <PresentationViewer />;
}

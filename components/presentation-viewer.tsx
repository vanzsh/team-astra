"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Maximize2, Minimize2 } from "lucide-react";

const deck = "/presentation/Context-SE-Hackathon-Pitch.pdf";
const totalSlides = 6;

export function PresentationViewer() {
  const [slide, setSlide] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const page = useRef<HTMLElement>(null);

  function move(delta: number) {
    setSlide((current) => Math.min(totalSlides, Math.max(1, current + delta)));
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight" || event.key === " ") move(1);
    };
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  async function toggleFullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await page.current?.requestFullscreen();
  }

  return (
    <main className="presentation-page" ref={page}>
      <header className="presentation-header">
        <Link href="/"><ArrowLeft />ContextSE</Link>
        <span>Slide {slide} of {totalSlides}</span>
        <div><a href="/presentation/Context-SE-Hackathon-Pitch.pptx" download><Download />PPTX</a><button onClick={() => void toggleFullscreen()} aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}>{fullscreen ? <Minimize2 /> : <Maximize2 />}</button></div>
      </header>
      <section className="presentation-stage">
        <iframe key={slide} src={`${deck}#page=${slide}&toolbar=0&navpanes=0&view=FitH`} title={`ContextSE presentation, slide ${slide}`} />
      </section>
      <footer className="presentation-controls">
        <button onClick={() => move(-1)} disabled={slide === 1}><ChevronLeft />Previous</button>
        <div>{Array.from({ length: totalSlides }, (_, index) => <button key={index} className={slide === index + 1 ? "active" : ""} onClick={() => setSlide(index + 1)} aria-label={`Go to slide ${index + 1}`} />)}</div>
        <button onClick={() => move(1)} disabled={slide === totalSlides}>Next<ChevronRight /></button>
      </footer>
    </main>
  );
}

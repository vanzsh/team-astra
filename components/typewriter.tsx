"use client";

import { useEffect, useState } from "react";

export function Typewriter({ text }: { text: string }) {
  const [visible, setVisible] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(text);
      return;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisible(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 20);
    return () => window.clearInterval(timer);
  }, [text]);

  return <span aria-label={text}><span aria-hidden="true">{visible}</span>{visible.length < text.length && <i className="typewriter-cursor" aria-hidden="true" />}</span>;
}

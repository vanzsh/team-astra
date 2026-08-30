"use client";

import { Download, ExternalLink, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Source, TruthKind } from "@/lib/contracts";

type DocumentPreviewProps = {
  filename: string;
  format: Source["format"];
  side: string;
  content: string;
  truth?: TruthKind;
  url?: string;
  onClose: () => void;
};

export function DocumentPreview({ filename, format, side, content, truth, url, onClose }: DocumentPreviewProps) {
  function download() {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: format === "html" ? "text/html" : "text/plain" }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const html = format === "html" ? `<!doctype html><html><head><meta charset="utf-8"><style>body{max-width:720px;margin:48px auto;padding:0 32px;color:#171717;font:16px/1.65 Arial,sans-serif}h1{font-size:32px;letter-spacing:-1px}h2{margin-top:32px;font-size:18px}aside{margin-top:28px;padding:16px;border-left:3px solid #171717;background:#f5f5f5}</style></head><body>${content}</body></html>` : undefined;

  return (
    <div className="document-layer" role="dialog" aria-modal="true" aria-label={`Preview ${filename}`}>
      <div className="document-viewer">
        <header className="document-toolbar">
          <div><span className="document-icon"><FileText /></span><span><strong>{filename}</strong><small>{side} · {format.toUpperCase()}{truth ? ` · ${truth.replace("_", " ")}` : ""}</small></span></div>
          <div>{url && <a href={url} target="_blank" rel="noreferrer">Open source <ExternalLink /></a>}{(format === "markdown" || format === "text" || format === "html") && <Button variant="outline" size="sm" onClick={download}><Download />Download</Button>}<Button variant="ghost" size="icon" onClick={onClose} aria-label="Close preview"><X /></Button></div>
        </header>
        <main className="document-canvas">
          {format === "html" ? <iframe title={filename} sandbox="" srcDoc={html} /> : format === "image" ? <img src={content || url} alt={filename} /> : <article className={`document-paper ${format}`}><div className="file-ribbon">{format === "pdf" ? "PDF · Full document preview" : "Original document"}</div><pre>{content}</pre></article>}
        </main>
      </div>
    </div>
  );
}

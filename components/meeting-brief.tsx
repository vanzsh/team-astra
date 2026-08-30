"use client";

import { Download, Printer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AccountWorkspace } from "@/lib/contracts";
import { buildMeetingBriefHtml } from "@/lib/meeting-brief";

type MeetingBriefProps = {
  workspace: AccountWorkspace;
  persona: string;
  onClose: () => void;
};

export function MeetingBrief({ workspace, persona, onClose }: MeetingBriefProps) {
  const date = new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date());

  function downloadBrief() {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([buildMeetingBriefHtml(workspace, persona, date)], { type: "text/html" }));
    link.download = "gulf-logistics-meeting-brief.html";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="modal-layer brief-layer" role="dialog" aria-modal="true" aria-label={`${workspace.name} meeting brief`}>
      <div className="brief-modal">
        <div className="brief-toolbar">
          <div><strong>Meeting brief</strong><span>Ready to share</span></div>
          <div><Button variant="outline" onClick={() => window.print()}><Printer /> Print / PDF</Button><Button onClick={downloadBrief}><Download /> Download HTML</Button><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close brief"><X /></Button></div>
        </div>
        <article className="brief-sheet">
          <header>
            <span className="eyebrow">CONTEXTSE · MEETING BRIEF · {date.toUpperCase()}</span>
            <h1>{workspace.name} <i>×</i> {workspace.sellerProduct}</h1>
            <p>{persona} conversation · Exception-first control tower story</p>
          </header>
          <section className="brief-summary">
            <div><span>Meeting objective</span><p>{workspace.strategy.objective}</p></div>
            <div><span>Core thesis</span><p>{workspace.strategy.thesis}</p></div>
          </section>
          <section>
            <h2>Recommended demo sequence</h2>
            <ol className="brief-sequence">
              {workspace.strategy.moments.map((moment, index) => (
                <li key={moment.title}><b>{index + 1}</b><div><strong>{moment.title}</strong><p>{moment.why}</p><small>{moment.capability}</small></div></li>
              ))}
            </ol>
          </section>
          <div className="brief-columns">
            <section><h2>Questions to validate</h2><ul><li>Which GCC-to-Europe lanes create the most coordination overhead?</li><li>How are priority exceptions shared across regional teams today?</li><li>Which operational KPIs matter most in the executive review?</li></ul></section>
            <section><h2>Evidence posture</h2><ul><li>{workspace.sellerProduct} capabilities: approved {workspace.sellerCompany} context</li><li>{workspace.name} profile: synthetic fixture</li><li>Account priorities: ContextSE inference</li></ul></section>
          </div>
          <footer><strong>Synthetic account notice</strong> {workspace.name} and all operational examples are synthetic. {workspace.sellerProduct} capabilities come from approved {workspace.sellerCompany} source material.</footer>
        </article>
      </div>
    </div>
  );
}

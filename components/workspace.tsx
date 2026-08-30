"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { ArrowUp, Bot, Check, ChevronRight, CircleDot, Database, FileText, Globe2, Layers3, MessageSquareText, PanelLeft, PanelRight, Play, RefreshCw, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingBrief } from "@/components/meeting-brief";
import { RelayDemo } from "@/components/relay-demo";
import { backendMode, converse, persistApproval, researchProspect } from "@/lib/backend";
import type { AgentAction, ConversationMessage, Source, TruthKind } from "@/lib/contracts";
import { gulfLinkWorkspace } from "@/lib/fixtures";

type View = "context" | "agent" | "outputs";
type Modal = "demo" | "brief" | null;

const prompts = ["What should I show them?", "What evidence supports this?", "What are you least confident about?"];
const truthLabels: Record<TruthKind, string> = { FACT: "Fact", SELLER_CONTEXT: "Seller context", INFERENCE: "Inference", SYNTHETIC: "Synthetic" };

function TruthTag({ value }: { value: TruthKind }) {
  return <span className={`truth-tag ${value.toLowerCase()}`}>{truthLabels[value]}</span>;
}

function SourceRail({ sources, onSelect, onResearch, researching, researchNote }: { sources: Source[]; onSelect: (source: Source) => void; onResearch: () => void; researching: boolean; researchNote: string }) {
  const groups = [
    { id: "seller", label: "Our company", caption: "Relay · approved context" },
    { id: "prospect", label: "Their company", caption: "GulfLink · account context" },
  ] as const;

  return (
    <aside className="rail context-rail">
      <div className="rail-heading"><div><span>Context</span><strong>Sources</strong></div><span className="artifact-count">{sources.length}</span></div>
      <div className="source-scroll">
        {groups.map((group) => (
          <section className="source-group" key={group.id}>
            <div className="source-group-label"><span>{group.label}</span><small>{group.caption}</small></div>
            {sources.filter((source) => source.group === group.id).map((source) => (
              <button className="source-item" key={source.id} onClick={() => onSelect(source)}>
                <span className="source-icon">{source.group === "seller" ? <Database /> : <Globe2 />}</span>
                <span className="source-copy"><strong>{source.title}</strong><small>{source.detail}</small><TruthTag value={source.truth} /></span>
                <ChevronRight className="source-chevron" />
              </button>
            ))}
          </section>
        ))}
      </div>
      <div className="research-card">
        <div><CircleDot /><span><strong>{researching ? "Researching account" : "Fixture research loaded"}</strong><small>{researchNote}</small></span></div>
        <Button variant="outline" size="sm" onClick={onResearch} disabled={researching}><RefreshCw className={researching ? "spin" : ""} />{researching ? "Working" : "Re-run research"}</Button>
      </div>
    </aside>
  );
}

function OutputRail({ approved, generating, onOpenPersonalized, onOpenGeneric, onOpenBrief }: { approved: boolean; generating: boolean; onOpenPersonalized: () => void; onOpenGeneric: () => void; onOpenBrief: () => void }) {
  const artifacts = [
    { title: "Personalized Relay demo", detail: "Interactive web experience", icon: <Play />, action: onOpenPersonalized },
    { title: "COO meeting brief", detail: "Printable + HTML download", icon: <FileText />, action: onOpenBrief },
  ];

  return (
    <aside className="rail output-rail">
      <div className="rail-heading"><div><span>Account</span><strong>Outputs</strong></div><span className="artifact-count">{approved ? 2 : 0}/2</span></div>
      <div className="output-scroll">
        <div className="output-summary"><span>WORK PRODUCT</span><strong>{generating ? "Building approved outputs…" : approved ? "Ready for the opportunity" : "Recommendation ready"}</strong><p>{approved ? "Both artifacts use the approved exception-first strategy." : "Approve the strategy to generate account-ready work."}</p></div>
        {artifacts.map((artifact) => (
          <article className={`artifact ${approved ? "ready" : "pending"}`} key={artifact.title}>
            <div className="artifact-top"><span className="artifact-icon">{artifact.icon}</span><span className={`artifact-state ${approved ? "ready" : ""}`}>{generating ? "Generating" : approved ? "Ready" : "Queued"}</span></div>
            <strong>{artifact.title}</strong><p>{artifact.detail}</p>
            <Button variant={approved ? "outline" : "ghost"} size="sm" disabled={!approved || generating} onClick={artifact.action}>{approved ? "Open artifact" : "Awaiting approval"}<ChevronRight /></Button>
          </article>
        ))}
        <button className="before-card" onClick={onOpenGeneric}><span>BEFORE VIEW</span><strong>Generic Relay demo</strong><small>Open the baseline to compare</small><ChevronRight /></button>
      </div>
      <div className="truth-legend"><ShieldCheck /><span><strong>Truth-aware output</strong><small>Prospect claims retain evidence. Demo operations are synthetic.</small></span></div>
    </aside>
  );
}

export function Workspace() {
  const [mobileView, setMobileView] = useState<View>("agent");
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [modal, setModal] = useState<Modal>(null);
  const [demoMode, setDemoMode] = useState<"generic" | "personalized">("personalized");
  const [persona, setPersona] = useState("COO");
  const [approved, setApproved] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [researching, setResearching] = useState(false);
  const [researchNote, setResearchNote] = useState("4 sources · all truth-labeled");
  const [sources, setSources] = useState(gulfLinkWorkspace.sources);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messageId = useRef(0);
  const sourceById = useMemo(() => new Map(sources.map((source) => [source.id, source])), [sources]);

  async function runResearch() {
    if (researching) return;
    setResearching(true);
    setResearchNote("Reviewing public web and seller context…");
    await new Promise((resolve) => setTimeout(resolve, 650));
    setResearchNote("Mapping priorities to Relay capabilities…");
    const result = await researchProspect(gulfLinkWorkspace.domain);
    await new Promise((resolve) => setTimeout(resolve, 550));
    if (result.status === "ok" && result.source) {
      setSources((current) => [...current.filter((source) => source.id !== result.source?.id), result.source as Source]);
    }
    setResearching(false);
    setResearchNote(result.status === "ok" ? "Live Context.dev source added" : "Fixture retained · external research unavailable");
  }

  async function approve(open?: Modal) {
    if (!approved) {
      setGenerating(true);
      await Promise.all([persistApproval(gulfLinkWorkspace, persona), new Promise((resolve) => setTimeout(resolve, 900))]);
      setApproved(true);
      setGenerating(false);
    }
    if (open) setModal(open);
  }

  function openDemo(mode: "generic" | "personalized") {
    setDemoMode(mode);
    setModal("demo");
  }

  async function performAction(action: AgentAction) {
    if (action.type === "focus_persona") setPersona(action.persona);
    if (action.type === "approve_strategy") await approve();
    if (action.type === "generate_demo") {
      setDemoMode("personalized");
      await approve("demo");
    }
    if (action.type === "create_brief") await approve("brief");
    if (action.type === "research") await runResearch();
  }

  async function sendPrompt(text: string) {
    const value = text.trim();
    if (!value || sending) return;
    const userMessage: ConversationMessage = { id: `user-${messageId.current++}`, role: "user", content: value };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setSending(true);
    const response = await converse({ ...gulfLinkWorkspace, sources }, persona, messages, value);
    const assistantMessage: ConversationMessage = { id: `assistant-${messageId.current++}`, role: "assistant", content: response.answer, citations: response.citations, live: response.live };
    setMessages((current) => [...current, assistantMessage]);
    setSending(false);
    await performAction(response.action);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendPrompt(input);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="contextse-brand"><span>C</span><strong>ContextSE</strong></div>
        <div className="account-switcher"><span className="account-monogram">GL</span><span><strong>GulfLink Logistics</strong><small>Account workspace · Synthetic fixture</small></span></div>
        <div className="header-status"><span className="status-light" /><span><strong>Strategy ready</strong><small>{backendMode === "convex" ? "Convex configured" : "Reliable fixture fallback"}</small></span></div>
      </header>

      <nav className="mobile-nav" aria-label="Workspace views">
        <button className={mobileView === "context" ? "active" : ""} onClick={() => setMobileView("context")}><PanelLeft />Context</button>
        <button className={mobileView === "agent" ? "active" : ""} onClick={() => setMobileView("agent")}><MessageSquareText />Agent</button>
        <button className={mobileView === "outputs" ? "active" : ""} onClick={() => setMobileView("outputs")}><PanelRight />Outputs</button>
      </nav>

      <div className={`workspace-grid mobile-${mobileView}`}>
        <SourceRail sources={sources} onSelect={setSelectedSource} onResearch={() => void runResearch()} researching={researching} researchNote={researchNote} />

        <main className="agent-workspace">
          <div className="agent-topbar"><div><span className="agent-avatar"><Bot /></span><span><strong>AI Solutions Engineer</strong><small>Grounded in this account workspace</small></span></div><span className={`model-state ${backendMode}`}><i />{backendMode === "convex" ? "Convex route" : "Fixture fallback"}</span></div>
          <div className="agent-scroll">
            <section className="account-read">
              <div className="section-label"><span>ACCOUNT READ</span><small>2 decision-ready insights</small></div>
              <h1>GulfLink needs a cross-region control story—not another visibility tour.</h1>
              <div className="insight-grid">
                {gulfLinkWorkspace.insights.map((insight, index) => (
                  <button key={insight.title} onClick={() => setSelectedSource(sourceById.get(insight.sourceIds[0]) ?? null)}><span>0{index + 1}</span><div><strong>{insight.title}</strong><p>{insight.detail}</p><TruthTag value={insight.truth} /></div><ChevronRight /></button>
                ))}
              </div>
            </section>

            <section className={`strategy-card ${approved ? "approved" : ""}`}>
              <div className="strategy-header"><div><span className="strategy-icon"><Layers3 /></span><span><small>RECOMMENDED DEMO STRATEGY</small><strong>Exception-first control tower</strong></span></div>{approved && <span className="approved-mark"><Check /> Approved</span>}</div>
              <p className="strategy-thesis">{gulfLinkWorkspace.strategy.thesis}</p>
              <div className="strategy-meta"><label>Primary audience<select value={persona} onChange={(event) => setPersona(event.target.value)}><option>COO</option><option>VP Operations</option><option>Regional Director</option></select></label><div><span>Meeting objective</span><p>{gulfLinkWorkspace.strategy.objective}</p></div></div>
              <ol className="demo-sequence">
                {gulfLinkWorkspace.strategy.moments.map((moment, index) => (
                  <li key={moment.title}><span>{index + 1}</span><div><strong>{moment.title}</strong><small>{moment.capability}</small></div><button onClick={() => setSelectedSource(sourceById.get(moment.sourceIds[0]) ?? null)}>{moment.sourceIds.length} sources</button></li>
                ))}
              </ol>
              <div className="strategy-actions"><Button variant="outline" onClick={() => openDemo("personalized")}><Play /> Compare before / after</Button><Button onClick={() => void approve()} disabled={approved || generating}>{generating ? <><RefreshCw className="spin" />Generating outputs</> : approved ? <><Check />Strategy approved</> : <><Check />Approve & build outputs</>}</Button></div>
            </section>

            <section className="conversation">
              <div className="section-label"><span>WORK THROUGH THE DEAL</span><small>{messages.length ? `${messages.length} messages` : "Ask from shared context"}</small></div>
              {messages.length === 0 ? <div className="empty-conversation"><MessageSquareText /><div><strong>This workspace is the context.</strong><p>Challenge the recommendation, ask for evidence, change the audience, or create an output.</p></div></div> : <div className="message-list">{messages.map((message) => <article className={message.role} key={message.id}><div className="message-meta"><strong>{message.role === "assistant" ? "ContextSE" : "You"}</strong>{message.role === "assistant" && <span>{message.live ? "OpenRouter" : "Reliable fallback"}</span>}</div><p>{message.content}</p>{message.citations && message.citations.length > 0 && <div className="citation-row">{message.citations.map((id) => <button key={id} onClick={() => setSelectedSource(sourceById.get(id) ?? null)}>{sourceById.get(id)?.title ?? id}</button>)}</div>}</article>)}</div>}
              {sending && <div className="thinking"><i /><i /><i /><span>Reasoning from account context</span></div>}
              <div className="prompt-row">{prompts.map((prompt) => <button key={prompt} onClick={() => void sendPrompt(prompt)} disabled={sending}>{prompt}</button>)}</div>
              <form className="composer" onSubmit={submit}><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about the account, challenge the strategy, or create an output…" rows={2} /><div><span><ShieldCheck />Grounded in {sources.length} sources</span><Button size="icon" type="submit" disabled={!input.trim() || sending} aria-label="Send message"><ArrowUp /></Button></div></form>
            </section>
          </div>
        </main>

        <OutputRail approved={approved} generating={generating} onOpenPersonalized={() => openDemo("personalized")} onOpenGeneric={() => openDemo("generic")} onOpenBrief={() => void approve("brief")} />
      </div>

      {selectedSource && <div className="evidence-drawer" role="dialog" aria-modal="true" aria-label="Source evidence"><button className="drawer-backdrop" onClick={() => setSelectedSource(null)} aria-label="Close source" /><article><div className="drawer-header"><span>Source evidence</span><Button variant="ghost" size="icon" onClick={() => setSelectedSource(null)} aria-label="Close source"><X /></Button></div><div className="drawer-body"><span className="source-icon large">{selectedSource.group === "seller" ? <Database /> : <Globe2 />}</span><TruthTag value={selectedSource.truth} /><h2>{selectedSource.title}</h2><p className="source-detail">{selectedSource.detail}</p><blockquote>{selectedSource.excerpt}</blockquote><div className="source-integrity"><ShieldCheck /><span><strong>{selectedSource.truth === "SYNTHETIC" ? "Synthetic demo context" : "Approved context"}</strong><small>{selectedSource.truth === "SYNTHETIC" ? "Do not present this as a real prospect fact." : "Safe to use within the stated capability boundary."}</small></span></div></div></article></div>}
      {modal === "demo" && <RelayDemo generic={gulfLinkWorkspace.demo.generic} personalized={gulfLinkWorkspace.demo.personalized} initialMode={demoMode} onClose={() => setModal(null)} />}
      {modal === "brief" && <MeetingBrief workspace={gulfLinkWorkspace} persona={persona} onClose={() => setModal(null)} />}
    </div>
  );
}

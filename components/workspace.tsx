"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Bot, Check, ChevronDown, ChevronRight, FileText, Globe2, LoaderCircle, MessageSquare, MonitorPlay, Plus, ShieldCheck, TestTube2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingBrief } from "@/components/meeting-brief";
import { RelayDemo } from "@/components/relay-demo";
import { backendMode, converse, persistApproval, researchProspect, testPersona } from "@/lib/backend";
import type { AccountWorkspace, AgentAction, ConversationMessage, PersonaTestResult, Source, SourceGroup, TruthKind } from "@/lib/contracts";
import { gulfLinkWorkspace } from "@/lib/fixtures";

type Modal = "new" | "source" | "demo" | "brief" | null;

const prompts = ["What matters most here?", "What should I show the CEO?", "What evidence supports this?", "Test this with the CFO"];
const truthLabels: Record<TruthKind, string> = { FACT: "Fact", SELLER_CONTEXT: "Provided", INFERENCE: "Inference", SYNTHETIC: "Synthetic" };

function TruthTag({ value }: { value: TruthKind }) {
  return <span className={`truth-tag ${value.toLowerCase()}`}>{truthLabels[value]}</span>;
}

function GlobalRail({ accountName, artifactsReady, onNew, onDemo, onBrief }: { accountName: string; artifactsReady: boolean; onNew: () => void; onDemo: () => void; onBrief: () => void }) {
  return (
    <aside className="global-rail">
      <div className="brand"><span>C</span><strong>ContextSE</strong></div>
      <Button className="new-chat" onClick={onNew}><Plus />New chat</Button>
      <section className="global-section">
        <h2>Chats</h2>
        <div className="chat-row active"><span className="chat-icon"><MessageSquare /></span><span><strong>{accountName}</strong><small>Active opportunity</small></span></div>
      </section>
      <section className="global-section artifacts-section">
        <h2>Artifacts</h2>
        <button className="artifact-row" onClick={onDemo} disabled={!artifactsReady}><MonitorPlay /><span><strong>Interactive demo</strong><small>{artifactsReady ? "Ready" : "Not generated"}</small></span></button>
        <button className="artifact-row" onClick={onBrief} disabled={!artifactsReady}><FileText /><span><strong>Meeting brief</strong><small>{artifactsReady ? "PDF · HTML" : "Not generated"}</small></span></button>
      </section>
      <div className="rail-foot"><ShieldCheck /><span>Truth-aware workspace</span></div>
    </aside>
  );
}

function SourcesPane({ sources, status, onSelect, onAdd, onResearch }: { sources: Source[]; status: string; onSelect: (source: Source) => void; onAdd: () => void; onResearch: () => void }) {
  return (
    <aside className="sources-pane">
      <div className="pane-header"><div><strong>Sources</strong><span>{sources.length}</span></div><Button variant="ghost" size="icon-sm" onClick={onAdd} aria-label="Add source"><Plus /></Button></div>
      <div className="source-list">
        {(["seller", "prospect"] as SourceGroup[]).map((group) => (
          <section key={group}>
            <h2>{group === "seller" ? "Our company" : "Prospect"}</h2>
            {sources.filter((source) => source.group === group).map((source) => (
              <button className="source-row" key={source.id} onClick={() => onSelect(source)}>
                <span className="source-type">{source.url ? <Globe2 /> : <FileText />}</span>
                <span><strong>{source.title}</strong><small>{source.detail}</small><TruthTag value={source.truth} /></span>
                <ChevronRight />
              </button>
            ))}
          </section>
        ))}
      </div>
      <div className="source-footer"><p>{status}</p><Button variant="outline" size="sm" onClick={onAdd}><Plus />Add source</Button><button onClick={onResearch}>Refresh research</button></div>
    </aside>
  );
}

function TestingLab({ workspace, persona, setPersona, request }: { workspace: AccountWorkspace; persona: string; setPersona: (value: string) => void; request: { id: number; persona: string } | null }) {
  const [personas, setPersonas] = useState(["CEO", "CFO", "COO"]);
  const [target, setTarget] = useState("Current strategy");
  const [result, setResult] = useState<PersonaTestResult | null>(null);
  const [testing, setTesting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newPersona, setNewPersona] = useState("");

  function addPersona() {
    const value = newPersona.trim();
    if (!value) return;
    if (!personas.includes(value)) setPersonas((current) => [...current, value]);
    setPersona(value);
    setNewPersona("");
    setAdding(false);
  }

  async function runTest(selectedPersona = persona) {
    setTesting(true);
    setResult(await testPersona(workspace, selectedPersona, target));
    setTesting(false);
  }

  useEffect(() => {
    if (!request) return;
    setPersona(request.persona);
    void runTest(request.persona);
  }, [request?.id]);

  return (
    <aside className="testing-lab">
      <div className="pane-header"><div><strong>Testing Lab</strong><span>Buyer simulation</span></div><TestTube2 /></div>
      <div className="testing-body">
        <div className="lab-intro"><strong>Pressure-test before the meeting.</strong><p>See how this account’s buyer may react, object, and decide.</p></div>
        <section className="lab-section"><div className="lab-label"><span>Buyer persona</span><button onClick={() => setAdding(!adding)}>+ Custom</button></div><div className="persona-grid">{personas.map((item) => <button key={item} className={persona === item ? "active" : ""} onClick={() => setPersona(item)}><strong>{item}</strong><small>{item === "CEO" ? "Strategy & risk" : item === "CFO" ? "ROI & proof" : "Operations"}</small></button>)}</div>{adding && <div className="persona-add"><input value={newPersona} onChange={(event) => setNewPersona(event.target.value)} placeholder="e.g. CTO" onKeyDown={(event) => event.key === "Enter" && addPersona()} /><Button size="sm" onClick={addPersona}>Add</Button></div>}</section>
        <section className="lab-section"><label className="field-label" htmlFor="test-target">Test</label><select id="test-target" value={target} onChange={(event) => setTarget(event.target.value)}><option>Current strategy</option><option>Personalized demo</option><option>Meeting brief</option><option>Current pitch</option></select></section>
        <Button className="test-button" onClick={() => void runTest()} disabled={testing}>{testing ? <><LoaderCircle className="spin" />Testing with {persona}</> : <>Test with {persona}<ChevronRight /></>}</Button>
        {!result && <div className="lab-empty"><TestTube2 /><strong>No test run yet</strong><p>Select a buyer and test the current work.</p></div>}
        {result && result.error && <div className="model-error"><strong>Groq configuration needed</strong><p>{result.reaction}</p></div>}
        {result && !result.error && <div className="test-result"><div className="result-score"><span>Buyer score</span><strong>{result.score}<small>/10</small></strong></div><section><h3>Reaction</h3><p>{result.reaction}</p></section><section><h3>Objections</h3><ul>{result.objections.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h3>Missing</h3><ul>{result.missing.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h3>Improve</h3><ol>{result.improve.map((item) => <li key={item}>{item}</li>)}</ol></section></div>}
      </div>
    </aside>
  );
}

export function Workspace() {
  const [workspace, setWorkspace] = useState(gulfLinkWorkspace);
  const [modal, setModal] = useState<Modal>(null);
  const [demoMode, setDemoMode] = useState<"generic" | "personalized">("personalized");
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [persona, setPersona] = useState("CEO");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sourceStatus, setSourceStatus] = useState("Fixture context · refresh when Context.dev is configured");
  const [strategyApproved, setStrategyApproved] = useState(false);
  const [testRequest, setTestRequest] = useState<{ id: number; persona: string } | null>(null);
  const messageId = useRef(0);
  const sourceById = useMemo(() => new Map(workspace.sources.map((source) => [source.id, source])), [workspace.sources]);
  const artifactsReady = workspace.artifacts.every((artifact) => artifact.status === "ready");

  function openDemo(mode: "generic" | "personalized" = "personalized") {
    setDemoMode(mode);
    setModal("demo");
  }

  async function runResearch() {
    setSourceStatus("Researching through Context.dev…");
    const result = await researchProspect(workspace.domain);
    if (result.status === "ok" && result.source) setWorkspace((current) => ({ ...current, sources: [...current.sources.filter((source) => source.id !== result.source?.id), result.source as Source], researchStatus: "live" }));
    setSourceStatus(result.status === "ok" ? "Live Context.dev research added" : "Fixture preserved · Context.dev unavailable");
  }

  function approveStrategy() {
    setStrategyApproved(true);
    void persistApproval(workspace, persona);
  }

  async function performAction(action: AgentAction) {
    if (action.type === "focus_persona") setPersona(action.persona);
    if (action.type === "approve_strategy") approveStrategy();
    if (action.type === "generate_demo") openDemo();
    if (action.type === "create_brief") setModal("brief");
    if (action.type === "research") await runResearch();
    if (action.type === "test_persona") setTestRequest({ id: Date.now(), persona: action.persona });
  }

  async function sendPrompt(text: string) {
    const value = text.trim();
    if (!value || sending) return;
    const userMessage: ConversationMessage = { id: `user-${messageId.current++}`, role: "user", content: value };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setSending(true);
    const response = await converse(workspace, persona, messages, value);
    setMessages((current) => [...current, { id: `assistant-${messageId.current++}`, role: "assistant", content: response.answer, citations: response.citations, live: response.live, error: Boolean(response.error) }]);
    setSending(false);
    await performAction(response.action);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendPrompt(input);
  }

  function createWorkspace(website: string, material: string, objective: string) {
    const domain = website.trim().replace(/^https?:\/\//, "").replace(/\/$/, "") || gulfLinkWorkspace.domain;
    const isFixture = domain.includes("gulflink");
    const provided: Source = { id: `provided-${Date.now()}`, group: "prospect", title: domain, detail: "User-provided account context", truth: "SELLER_CONTEXT", excerpt: material.trim() || "Website provided for account research.", url: `https://${domain}` };
    setWorkspace({ ...gulfLinkWorkspace, id: domain.replace(/\W/g, "-"), name: isFixture ? gulfLinkWorkspace.name : domain, domain, region: isFixture ? gulfLinkWorkspace.region : "New account · research pending", sources: [...gulfLinkWorkspace.sources.filter((source) => source.group === "seller"), ...(isFixture ? gulfLinkWorkspace.sources.filter((source) => source.group === "prospect") : [provided])], insights: isFixture ? gulfLinkWorkspace.insights : [], strategy: isFixture ? gulfLinkWorkspace.strategy : { ...gulfLinkWorkspace.strategy, objective: objective.trim() || "Understand this account and determine the strongest truthful Relay story.", thesis: "Research this account before recommending a demo strategy.", moments: [], sourceIds: ["relay-capabilities"], status: "recommended" }, artifacts: isFixture ? gulfLinkWorkspace.artifacts : gulfLinkWorkspace.artifacts.map((artifact) => ({ ...artifact, status: "recommended" })) });
    setMessages([]);
    setStrategyApproved(false);
    setModal(null);
    setSourceStatus(isFixture ? "Fixture context ready" : "Account created · run research next");
  }

  function addSource(source: Source) {
    setWorkspace((current) => ({ ...current, sources: [...current.sources, source] }));
    setModal(null);
    setSourceStatus("Source added to account context");
  }

  return (
    <div className="workspace-shell">
      <GlobalRail accountName={workspace.name} artifactsReady={artifactsReady} onNew={() => setModal("new")} onDemo={() => openDemo()} onBrief={() => setModal("brief")} />
      <SourcesPane sources={workspace.sources} status={sourceStatus} onSelect={setSelectedSource} onAdd={() => setModal("source")} onResearch={() => void runResearch()} />
      <main className="agent-pane">
        <header className="agent-header"><div><span className="agent-mark"><Bot /></span><span><strong>AI Solutions Engineer</strong><small>{workspace.name} · {workspace.sources.length} sources</small></span></div><span className={`connection ${backendMode}`}><i />{backendMode === "convex" ? "Groq via Convex" : "AI not configured"}</span></header>
        <div className="conversation-scroll">
          <details className="account-brief"><summary><span><strong>Account brief</strong><small>{workspace.strategy.thesis}</small></span><ChevronDown /></summary><div className="brief-content"><div><span>Audience</span><strong>{persona}</strong></div><div><span>Objective</span><p>{workspace.strategy.objective}</p></div>{workspace.strategy.moments.length > 0 && <ol>{workspace.strategy.moments.map((moment, index) => <li key={moment.title}><b>{index + 1}</b><span><strong>{moment.title}</strong><small>{moment.capability}</small></span></li>)}</ol>}<Button variant="outline" size="sm" onClick={approveStrategy} disabled={strategyApproved}>{strategyApproved ? <><Check />Approved</> : "Approve strategy"}</Button></div></details>
          {messages.length === 0 ? <div className="conversation-empty"><span className="empty-mark"><Bot /></span><h1>Work through the {workspace.name} opportunity.</h1><p>I’ll reason from the sources in this workspace, surface assumptions, and create what you need for the meeting.</p><div>{prompts.map((prompt) => <button key={prompt} onClick={() => void sendPrompt(prompt)}>{prompt}<ChevronRight /></button>)}</div></div> : <div className="messages">{messages.map((message) => <article className={`${message.role} ${message.error ? "error" : ""}`} key={message.id}><div><strong>{message.role === "assistant" ? "ContextSE" : "You"}</strong>{message.role === "assistant" && <span>{message.live ? "Groq" : "Configuration"}</span>}</div><p>{message.content}</p>{message.citations && message.citations.length > 0 && <footer>{message.citations.map((id) => <button key={id} onClick={() => setSelectedSource(sourceById.get(id) ?? null)}>{sourceById.get(id)?.title ?? id}</button>)}</footer>}</article>)}</div>}
          {sending && <div className="agent-working"><LoaderCircle className="spin" />Groq is reasoning from this workspace…</div>}
        </div>
        <form className="agent-composer" onSubmit={submit}><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about the account or create an artifact…" rows={2} /><div><span><ShieldCheck />Grounded in workspace sources</span><Button type="submit" size="icon" disabled={!input.trim() || sending} aria-label="Send"><ArrowUp /></Button></div></form>
      </main>
      <TestingLab workspace={workspace} persona={persona} setPersona={setPersona} request={testRequest} />

      {modal === "new" && <NewWorkspaceModal onClose={() => setModal(null)} onCreate={createWorkspace} />}
      {modal === "source" && <AddSourceModal onClose={() => setModal(null)} onAdd={addSource} />}
      {selectedSource && <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(null)} />}
      {modal === "demo" && <RelayDemo generic={workspace.demo.generic} personalized={workspace.demo.personalized} initialMode={demoMode} onClose={() => setModal(null)} />}
      {modal === "brief" && <MeetingBrief workspace={workspace} persona={persona} onClose={() => setModal(null)} />}
    </div>
  );
}

function NewWorkspaceModal({ onClose, onCreate }: { onClose: () => void; onCreate: (website: string, material: string, objective: string) => void }) {
  const [website, setWebsite] = useState("gulflink.example");
  const [material, setMaterial] = useState("Dubai-based logistics operator coordinating GCC warehousing and Europe-bound freight from Jebel Ali.");
  const [objective, setObjective] = useState("Prepare the strongest COO demo narrative.");
  return <div className="modal-layer"><form className="setup-modal" onSubmit={(event) => { event.preventDefault(); onCreate(website, material, objective); }}><header><div><span>New chat</span><h2>Prepare a new account</h2><p>Start with what you know. Add more sources from the workspace.</p></div><Button type="button" variant="ghost" size="icon" onClick={onClose}><X /></Button></header><label>Website<input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="company.com" required /></label><label>Add material<textarea value={material} onChange={(event) => setMaterial(event.target.value)} rows={5} placeholder="Paste discovery notes, requirements, or meeting context…" /></label><label>Meeting objective<input value={objective} onChange={(event) => setObjective(event.target.value)} /></label><footer><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit">Create workspace</Button></footer></form></div>;
}

function AddSourceModal({ onClose, onAdd }: { onClose: () => void; onAdd: (source: Source) => void }) {
  const [group, setGroup] = useState<SourceGroup>("prospect");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  return <div className="modal-layer"><form className="setup-modal compact" onSubmit={(event) => { event.preventDefault(); onAdd({ id: `source-${Date.now()}`, group, title: title.trim() || url.trim(), detail: url ? "User-provided website" : "Pasted account material", truth: "SELLER_CONTEXT", excerpt: content.trim() || "Provided for account research.", url: url.trim() || undefined }); }}><header><div><span>Workspace context</span><h2>Add source</h2><p>Add one useful URL or piece of material.</p></div><Button type="button" variant="ghost" size="icon" onClick={onClose}><X /></Button></header><label>Context group<select value={group} onChange={(event) => setGroup(event.target.value as SourceGroup)}><option value="prospect">Prospect</option><option value="seller">Our company</option></select></label><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Discovery notes" required={!url} /></label><label>Website URL<input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://company.com/about" /></label><label>Pasted material<textarea value={content} onChange={(event) => setContent(event.target.value)} rows={5} placeholder="Paste notes or relevant source text…" /></label><footer><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={!title.trim() && !url.trim()}>Add to sources</Button></footer></form></div>;
}

function SourceDrawer({ source, onClose }: { source: Source; onClose: () => void }) {
  return <div className="drawer-layer"><button className="drawer-backdrop" onClick={onClose} aria-label="Close source" /><article><header><strong>Source</strong><Button variant="ghost" size="icon" onClick={onClose}><X /></Button></header><div><TruthTag value={source.truth} /><h2>{source.title}</h2><p>{source.detail}</p><blockquote>{source.excerpt}</blockquote>{source.url && <a href={source.url} target="_blank" rel="noreferrer">Open source <ChevronRight /></a>}<div className="integrity-note"><ShieldCheck /><span><strong>{source.truth === "SYNTHETIC" ? "Synthetic demo context" : "Workspace context"}</strong><small>{source.truth === "SYNTHETIC" ? "Never present this as a real prospect fact." : "Use within its stated evidence boundary."}</small></span></div></div></article></div>;
}

"use client";

import { type CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Bot, Check, ChevronDown, ChevronLeft, ChevronRight, FileCode2, FileText, Globe2, LoaderCircle, MessageSquare, MonitorPlay, Plus, ShieldCheck, TestTube2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentPreview } from "@/components/document-preview";
import { MeetingBrief } from "@/components/meeting-brief";
import { RelayDemo } from "@/components/relay-demo";
import { backendMode, converse, persistApproval, researchProspect, testPersona } from "@/lib/backend";
import type { AccountWorkspace, AgentAction, Artifact, ConversationMessage, PersonaTestResult, Source, SourceGroup } from "@/lib/contracts";
import { gulfLogisticsWorkspace } from "@/lib/fixtures";

type Modal = "new" | "source" | "demo" | "brief" | "script" | null;

const prompts = ["What matters most here?", "What should I show the CEO?", "What evidence supports this?", "Test this with the CFO"];

function isDemoIntent(text: string) {
  const normalized = text.toLowerCase().replace(/[’']/g, "'");
  return (/\b(give|show|open|see|view)\b.*\bdemo\b/.test(normalized) || /\bdemo\b.*\b(open|show|see|view)\b/.test(normalized) || /what (we|we'd|we would) (present|show)/.test(normalized));
}
function GlobalRail({ accountName, artifacts, collapsed, onToggle, onNew, onArtifact }: { accountName: string; artifacts: Artifact[]; collapsed: boolean; onToggle: () => void; onNew: () => void; onArtifact: (type: Artifact["type"]) => void }) {
  return (
    <aside className={`global-rail ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">{!collapsed && <><span>C</span><strong>ContextSE</strong></>}<button className="collapse-control" onClick={onToggle} aria-label={collapsed ? "Expand workspace rail" : "Collapse workspace rail"}>{collapsed ? <ChevronRight /> : <ChevronLeft />}</button></div>
      <Button className="new-chat" onClick={onNew} aria-label="New chat"><Plus />{!collapsed && <span>New chat</span>}</Button>
      {!collapsed && <><section className="global-section">
        <h2>Chats</h2>
        <div className="chat-row active"><span className="chat-icon"><MessageSquare /></span><span><strong>{accountName}</strong><small>Active opportunity</small></span></div>
      </section>
      <section className="global-section artifacts-section">
        <h2>Artifacts</h2>
        {artifacts.map((artifact) => <button className="artifact-row" key={artifact.id} onClick={() => onArtifact(artifact.type)} disabled={artifact.status !== "ready"}>{artifact.type === "interactive_demo" ? <MonitorPlay /> : artifact.type === "demo_script" ? <FileCode2 /> : <FileText />}<span><strong>{artifact.title}</strong><small>{artifact.status === "ready" ? "Ready to preview" : "Not generated"}</small></span></button>)}
      </section></>}
      <div className="rail-foot"><ShieldCheck />{!collapsed && <span>Truth-aware workspace</span>}</div>
    </aside>
  );
}

function SourcesPane({ sources, status, sellerCompany, prospectName, collapsed, onToggle, onSelect, onAdd, onResearch }: { sources: Source[]; status: string; sellerCompany: string; prospectName: string; collapsed: boolean; onToggle: () => void; onSelect: (source: Source) => void; onAdd: () => void; onResearch: () => void }) {
  return (
    <aside className={`sources-pane ${collapsed ? "collapsed" : ""}`}>
      <div className="pane-header">{!collapsed && <div><strong>Sources</strong><span>{sources.length}</span></div>}<div className="pane-actions">{!collapsed && <Button variant="ghost" size="icon-sm" onClick={onAdd} aria-label="Add source"><Plus /></Button>}<Button variant="ghost" size="icon-sm" onClick={onToggle} aria-label={collapsed ? "Expand sources" : "Collapse sources"}>{collapsed ? <ChevronRight /> : <ChevronLeft />}</Button></div></div>
      {!collapsed && <><div className="source-list">
        {(["seller", "prospect"] as SourceGroup[]).map((group) => (
          <section key={group}>
            <h2>{group === "seller" ? sellerCompany : prospectName}</h2>
            {sources.filter((source) => source.group === group).map((source) => (
              <button className="source-row" key={source.id} onClick={() => onSelect(source)}>
                <span className="source-type">{source.url ? <Globe2 /> : <FileText />}</span>
                <span><strong>{source.filename}</strong><small>{source.detail}</small></span>
                <ChevronRight />
              </button>
            ))}
          </section>
        ))}
      </div>
      <div className="source-footer"><p>{status}</p><Button variant="outline" size="sm" onClick={onAdd}><Plus />Add source</Button><button onClick={onResearch}>Refresh research</button></div></>}
    </aside>
  );
}

function TestingLab({ workspace, persona, setPersona, request, collapsed, onToggle }: { workspace: AccountWorkspace; persona: string; setPersona: (value: string) => void; request: { id: number; persona: string } | null; collapsed: boolean; onToggle: () => void }) {
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
    <aside className={`testing-lab ${collapsed ? "collapsed" : ""}`}>
      <div className="pane-header"><Button variant="ghost" size="icon-sm" onClick={onToggle} aria-label={collapsed ? "Expand Testing Lab" : "Collapse Testing Lab"}>{collapsed ? <ChevronLeft /> : <ChevronRight />}</Button>{!collapsed && <><div><strong>Testing Lab</strong><span>Buyer simulation</span></div><TestTube2 /></>}</div>
      {!collapsed && <div className="testing-body">
        <div className="lab-intro"><strong>Pressure-test before the meeting.</strong><p>See how this account’s buyer may react, object, and decide.</p></div>
        <section className="lab-section"><div className="lab-label"><span>Buyer persona</span><button onClick={() => setAdding(!adding)}>+ Custom</button></div><div className="persona-grid">{personas.map((item) => <button key={item} className={persona === item ? "active" : ""} onClick={() => setPersona(item)}><strong>{item}</strong><small>{item === "CEO" ? "Strategy & risk" : item === "CFO" ? "ROI & proof" : "Operations"}</small></button>)}</div>{adding && <div className="persona-add"><input value={newPersona} onChange={(event) => setNewPersona(event.target.value)} placeholder="e.g. CTO" onKeyDown={(event) => event.key === "Enter" && addPersona()} /><Button size="sm" onClick={addPersona}>Add</Button></div>}</section>
        <section className="lab-section"><label className="field-label" htmlFor="test-target">Test</label><select id="test-target" value={target} onChange={(event) => setTarget(event.target.value)}><option>Current strategy</option><option>Personalized demo</option><option>Meeting brief</option><option>Current pitch</option></select></section>
        <Button className="test-button" onClick={() => void runTest()} disabled={testing}>{testing ? <><LoaderCircle className="spin" />Testing with {persona}</> : <>Test with {persona}<ChevronRight /></>}</Button>
        {!result && <div className="lab-empty"><TestTube2 /><strong>No test run yet</strong><p>Select a buyer and test the current work.</p></div>}
        {result && result.error && <div className="model-error"><strong>Groq configuration needed</strong><p>{result.reaction}</p></div>}
        {result && !result.error && <div className="test-result"><div className="result-score"><span>Buyer score</span><strong>{result.score}<small>/10</small></strong></div><section><h3>Reaction</h3><p>{result.reaction}</p></section><section><h3>Objections</h3><ul>{result.objections.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h3>Missing</h3><ul>{result.missing.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h3>Improve</h3><ol>{result.improve.map((item) => <li key={item}>{item}</li>)}</ol></section></div>}
      </div>}
    </aside>
  );
}

export function Workspace() {
  const [workspace, setWorkspace] = useState(gulfLogisticsWorkspace);
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
  const [globalCollapsed, setGlobalCollapsed] = useState(true);
  const [sourcesCollapsed, setSourcesCollapsed] = useState(false);
  const [testingCollapsed, setTestingCollapsed] = useState(false);
  const messageId = useRef(0);
  const sourceById = useMemo(() => new Map(workspace.sources.map((source) => [source.id, source])), [workspace.sources]);
  const layoutStyle = {
    "--global-width": globalCollapsed ? "52px" : "200px",
    "--sources-width": sourcesCollapsed ? "52px" : "270px",
    "--testing-width": testingCollapsed ? "52px" : "320px",
  } as CSSProperties;
  const demoScript = `# ${workspace.name} × Relay demo script\n\n## Audience\n${persona} at ${workspace.name}\n\n## Opening\n${workspace.strategy.thesis}\n\n## Sequence\n${workspace.strategy.moments.map((moment, index) => `${index + 1}. ${moment.title}\n   ${moment.why}`).join("\n")}\n\n## Truth note\n${workspace.name} and all operational records are synthetic. Relay capabilities come from Supply X approved source material.`;

  function openDemo(mode: "generic" | "personalized" = "personalized") {
    setDemoMode(mode);
    setModal("demo");
  }

  function openArtifact(type: Artifact["type"]) {
    if (type === "interactive_demo") openDemo();
    if (type === "meeting_brief") setModal("brief");
    if (type === "demo_script") setModal("script");
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
    setInput("");
    if (isDemoIntent(value)) {
      const assistantMessage: ConversationMessage = { id: `assistant-${messageId.current++}`, role: "assistant", content: "I've prepared the interactive demo around the account strategy. Opening it now.", live: false };
      setMessages((current) => [...current, userMessage, assistantMessage]);
      openDemo();
      return;
    }
    setMessages((current) => [...current, userMessage]);
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
    const domain = website.trim().replace(/^https?:\/\//, "").replace(/\/$/, "") || gulfLogisticsWorkspace.domain;
    const isFixture = domain.includes("gulflogistics");
    const provided: Source = { id: `provided-${Date.now()}`, group: "prospect", title: `${domain} Website.txt`, filename: `${domain} Website.txt`, format: "text", detail: `${domain} · user-provided account context`, truth: "SELLER_CONTEXT", content: material.trim() || `Website supplied for research: https://${domain}`, excerpt: material.trim() || "Website provided for account research.", url: `https://${domain}` };
    setWorkspace({ ...gulfLogisticsWorkspace, id: domain.replace(/\W/g, "-"), name: isFixture ? gulfLogisticsWorkspace.name : domain, domain, region: isFixture ? gulfLogisticsWorkspace.region : "New account · research pending", sources: [...gulfLogisticsWorkspace.sources.filter((source) => source.group === "seller"), ...(isFixture ? gulfLogisticsWorkspace.sources.filter((source) => source.group === "prospect") : [provided])], insights: isFixture ? gulfLogisticsWorkspace.insights : [], strategy: isFixture ? gulfLogisticsWorkspace.strategy : { ...gulfLogisticsWorkspace.strategy, objective: objective.trim() || "Understand this account and determine the strongest truthful Relay story.", thesis: "Research this account before recommending a demo strategy.", moments: [], sourceIds: ["relay-capabilities"], status: "recommended" }, artifacts: isFixture ? gulfLogisticsWorkspace.artifacts : gulfLogisticsWorkspace.artifacts.map((artifact) => ({ ...artifact, status: "recommended" })) });
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
    <div className="workspace-shell" style={layoutStyle}>
      <GlobalRail accountName={workspace.name} artifacts={workspace.artifacts} collapsed={globalCollapsed} onToggle={() => setGlobalCollapsed((value) => !value)} onNew={() => setModal("new")} onArtifact={openArtifact} />
      <SourcesPane sources={workspace.sources} status={sourceStatus} sellerCompany={workspace.sellerCompany} prospectName={workspace.name} collapsed={sourcesCollapsed} onToggle={() => setSourcesCollapsed((value) => !value)} onSelect={setSelectedSource} onAdd={() => setModal("source")} onResearch={() => void runResearch()} />
      <main className="agent-pane">
        <header className="agent-header"><div><span className="agent-mark"><Bot /></span><span><strong>AI Solutions Engineer</strong><small>{workspace.sellerCompany} → {workspace.name} · {workspace.sources.length} files</small></span></div><span className={`connection ${backendMode}`}><i />{backendMode === "convex" ? "Groq via Convex" : "Groq demo backend"}</span></header>
        <div className="conversation-scroll">
          <details className="account-brief"><summary><span><strong>Account brief</strong><small>{workspace.strategy.thesis}</small></span><ChevronDown /></summary><div className="brief-content"><div><span>Audience</span><strong>{persona}</strong></div><div><span>Objective</span><p>{workspace.strategy.objective}</p></div>{workspace.strategy.moments.length > 0 && <ol>{workspace.strategy.moments.map((moment, index) => <li key={moment.title}><b>{index + 1}</b><span><strong>{moment.title}</strong><small>{moment.capability}</small></span></li>)}</ol>}<Button variant="outline" size="sm" onClick={approveStrategy} disabled={strategyApproved}>{strategyApproved ? <><Check />Approved</> : "Approve strategy"}</Button></div></details>
          {messages.length === 0 ? <div className="conversation-empty"><span className="empty-mark"><Bot /></span><h1>Work through the {workspace.name} opportunity.</h1><p>I’ll reason from the sources in this workspace, surface assumptions, and create what you need for the meeting.</p><div>{prompts.map((prompt) => <button key={prompt} onClick={() => void sendPrompt(prompt)}>{prompt}<ChevronRight /></button>)}</div></div> : <div className="messages">{messages.map((message) => <article className={`${message.role} ${message.error ? "error" : ""}`} key={message.id}><div><strong>{message.role === "assistant" ? "ContextSE" : "You"}</strong>{message.role === "assistant" && <span>{message.error ? "Configuration" : message.live ? "Groq" : "Action"}</span>}</div><p>{message.content}</p>{message.citations && message.citations.length > 0 && <footer>{message.citations.map((id) => <button key={id} onClick={() => setSelectedSource(sourceById.get(id) ?? null)}>{sourceById.get(id)?.title ?? id}</button>)}</footer>}</article>)}</div>}
          {sending && <div className="agent-working"><LoaderCircle className="spin" />Groq is reasoning from this workspace…</div>}
        </div>
        <form className="agent-composer" onSubmit={submit}><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendPrompt(input); } }} placeholder="Ask about the account or create an artifact…" rows={2} /><div><span><ShieldCheck />Grounded in workspace sources</span><Button type="submit" size="icon" disabled={!input.trim() || sending} aria-label="Send"><ArrowUp /></Button></div></form>
      </main>
      <TestingLab workspace={workspace} persona={persona} setPersona={setPersona} request={testRequest} collapsed={testingCollapsed} onToggle={() => setTestingCollapsed((value) => !value)} />

      {modal === "new" && <NewWorkspaceModal onClose={() => setModal(null)} onCreate={createWorkspace} />}
      {modal === "source" && <AddSourceModal onClose={() => setModal(null)} onAdd={addSource} />}
      {selectedSource && <DocumentPreview filename={selectedSource.filename} format={selectedSource.format} side={selectedSource.group === "seller" ? workspace.sellerCompany : workspace.name} content={selectedSource.content} truth={selectedSource.truth} url={selectedSource.url} onClose={() => setSelectedSource(null)} />}
      {modal === "demo" && <RelayDemo generic={workspace.demo.generic} personalized={workspace.demo.personalized} initialMode={demoMode} onClose={() => setModal(null)} />}
      {modal === "brief" && <MeetingBrief workspace={workspace} persona={persona} onClose={() => setModal(null)} />}
      {modal === "script" && <DocumentPreview filename="Demo Script.md" format="markdown" side={`${workspace.sellerCompany} → ${workspace.name}`} content={demoScript} onClose={() => setModal(null)} />}
    </div>
  );
}

function NewWorkspaceModal({ onClose, onCreate }: { onClose: () => void; onCreate: (website: string, material: string, objective: string) => void }) {
  const [website, setWebsite] = useState("gulflogistics.example");
  const [material, setMaterial] = useState("Dubai-based logistics operator coordinating GCC warehousing and Europe-bound freight from Jebel Ali.");
  const [objective, setObjective] = useState("Prepare the strongest COO demo narrative.");
  return <div className="modal-layer"><form className="setup-modal" onSubmit={(event) => { event.preventDefault(); onCreate(website, material, objective); }}><header><div><span>New chat</span><h2>Prepare a new account</h2><p>Start with what you know. Add more sources from the workspace.</p></div><Button type="button" variant="ghost" size="icon" onClick={onClose}><X /></Button></header><label>Website<input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="company.com" required /></label><label>Add material<textarea value={material} onChange={(event) => setMaterial(event.target.value)} rows={5} placeholder="Paste discovery notes, requirements, or meeting context…" /></label><label>Meeting objective<input value={objective} onChange={(event) => setObjective(event.target.value)} /></label><footer><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit">Create workspace</Button></footer></form></div>;
}

function AddSourceModal({ onClose, onAdd }: { onClose: () => void; onAdd: (source: Source) => void }) {
  const [group, setGroup] = useState<SourceGroup>("prospect");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  return <div className="modal-layer"><form className="setup-modal compact" onSubmit={(event) => { event.preventDefault(); onAdd({ id: `source-${Date.now()}`, group, title: title.trim() || `${url.trim()} Website.txt`, filename: title.trim() || `${url.trim()} Website.txt`, format: "text", detail: url ? "User-provided website" : "Pasted account material", truth: "SELLER_CONTEXT", content: content.trim() || `Source URL: ${url.trim()}`, excerpt: content.trim() || "Provided for account research.", url: url.trim() || undefined }); }}><header><div><span>Workspace context</span><h2>Add source</h2><p>Add one useful URL or piece of material.</p></div><Button type="button" variant="ghost" size="icon" onClick={onClose}><X /></Button></header><label>Context group<select value={group} onChange={(event) => setGroup(event.target.value as SourceGroup)}><option value="prospect">Prospect</option><option value="seller">Our company</option></select></label><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Discovery notes" required={!url} /></label><label>Website URL<input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://company.com/about" /></label><label>Pasted material<textarea value={content} onChange={(event) => setContent(event.target.value)} rows={5} placeholder="Paste notes or relevant source text…" /></label><footer><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={!title.trim() && !url.trim()}>Add to sources</Button></footer></form></div>;
}

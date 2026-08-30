"use client";

import { useState } from "react";
import { ArrowLeft, Boxes, Map, Route, Ship, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoConfig } from "@/lib/contracts";

type RelayDemoProps = {
  generic: DemoConfig;
  personalized: DemoConfig;
  initialMode: "generic" | "personalized";
  onClose: () => void;
};

export function RelayDemo({ generic, personalized, initialMode, onClose }: RelayDemoProps) {
  const [mode, setMode] = useState<"generic" | "personalized">(initialMode);
  const [view, setView] = useState<"control" | "shipments">("control");
  const config = mode === "personalized" ? personalized : generic;
  const [selectedId, setSelectedId] = useState(config.exceptions[0].id);
  const selected = config.exceptions.find((item) => item.id === selectedId) ?? config.exceptions[0];

  function changeMode(next: "generic" | "personalized") {
    setMode(next);
    const nextConfig = next === "personalized" ? personalized : generic;
    setSelectedId(nextConfig.exceptions[0].id);
  }

  return (
    <div className="modal-layer relay-layer" role="dialog" aria-modal="true" aria-label="Interactive Relay demo">
      <div className="relay-demo">
        <header className="relay-header">
          <div className="relay-brand">
            <div className="relay-mark"><Route size={17} /></div>
            <div><strong>Relay</strong><span>Operations Control Tower</span></div>
          </div>
          <div className="demo-context">
            <span>Prepared by ContextSE</span>
            <span className="truth-tag synthetic">SYNTHETIC OPERATIONS</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close demo"><X /></Button>
        </header>

        <div className="relay-subnav">
          <Button variant="ghost" size="sm" onClick={onClose}><ArrowLeft /> Account workspace</Button>
          <div className="comparison-switch" aria-label="Demo comparison">
            <button className={mode === "generic" ? "active" : ""} onClick={() => changeMode("generic")}>Before · Generic</button>
            <button className={mode === "personalized" ? "active" : ""} onClick={() => changeMode("personalized")}>After · Gulf Logistics</button>
          </div>
          <div className="relay-tabs">
            <button className={view === "control" ? "active" : ""} onClick={() => setView("control")}><Map size={15} /> Control tower</button>
            <button className={view === "shipments" ? "active" : ""} onClick={() => setView("shipments")}><Boxes size={15} /> Shipments</button>
          </div>
        </div>

        <main className="relay-content">
          <div className="relay-title-row">
            <div>
              <span className="eyebrow">{mode === "personalized" ? "GULF LOGISTICS OPERATING LENS" : "GLOBAL NETWORK"}</span>
              <h1>{config.companyName}</h1>
              <p>{config.subtitle}</p>
            </div>
            {mode === "personalized" && <div className="personalization-note"><span>Demo strategy</span>Exception-first · COO view · GCC–Europe</div>}
          </div>

          <section className="relay-kpis" aria-label="Operational KPIs">
            {config.kpis.map((kpi) => (
              <article key={kpi.label}>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <small>{kpi.delta}</small>
              </article>
            ))}
          </section>

          {view === "control" ? (
            <div className="control-grid">
              <section className="network-panel">
                <div className="panel-heading"><div><span>Network view</span><strong>Active operating lanes</strong></div><span className="live-dot">Scenario view</span></div>
                <div className={`network-map ${mode}`}>
                  <div className="map-grid" />
                  <div className="route-line line-one" />
                  <div className="route-line line-two" />
                  <div className="route-line line-three" />
                  {config.locations.map((location, index) => (
                    <div className={`map-node node-${index + 1}`} key={location}><i /><span>{location}</span></div>
                  ))}
                  <div className="moving-shipment"><Ship size={14} /></div>
                  <div className="map-caption">{config.narrative}</div>
                </div>
              </section>

              <section className="exception-panel">
                <div className="panel-heading"><div><span>Priority queue</span><strong>Operational exceptions</strong></div><b>{config.exceptions.length}</b></div>
                <div className="exception-list">
                  {config.exceptions.map((exception) => (
                    <button key={exception.id} className={selected.id === exception.id ? "selected" : ""} onClick={() => setSelectedId(exception.id)}>
                      <i className={exception.severity} />
                      <span><strong>{exception.title}</strong><small>{exception.route}</small></span>
                      <em>{exception.eta}</em>
                    </button>
                  ))}
                </div>
                <div className="exception-detail">
                  <span className="eyebrow">SELECTED EXCEPTION · {selected.id}</span>
                  <h3>{selected.title}</h3>
                  <dl><div><dt>Route</dt><dd>{selected.route}</dd></div><div><dt>ETA impact</dt><dd>{selected.eta}</dd></div><div><dt>Exposure</dt><dd>{selected.impact}</dd></div></dl>
                  <div className="detail-action"><TriangleAlert size={16} /><span><strong>Recommended focus</strong>Coordinate the next checkpoint and monitor connection risk.</span></div>
                </div>
              </section>
            </div>
          ) : (
            <section className="shipment-panel">
              <div className="panel-heading"><div><span>Shipment registry</span><strong>{config.companyName} active movements</strong></div><span className="truth-tag synthetic">SYNTHETIC</span></div>
              <table>
                <thead><tr><th>Shipment</th><th>Mode</th><th>Origin</th><th>Destination</th><th>ETA</th><th>Status</th></tr></thead>
                <tbody>{config.shipments.map((shipment) => <tr key={shipment.id}><td><strong>{shipment.id}</strong></td><td>{shipment.mode}</td><td>{shipment.origin}</td><td>{shipment.destination}</td><td>{shipment.eta}</td><td><span className={shipment.status === "On track" ? "status-good" : "status-risk"}>{shipment.status}</span></td></tr>)}</tbody>
              </table>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

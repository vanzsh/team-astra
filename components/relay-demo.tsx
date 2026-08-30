"use client";

import { useState } from "react";
import { ArrowLeft, Boxes, Clock3, Map, MapPin, Route, Ship, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoConfig } from "@/lib/contracts";

type RelayDemoProps = {
  generic: DemoConfig;
  personalized: DemoConfig;
  initialMode: "generic" | "personalized";
  onClose: () => void;
};

type ShipmentFilter = "All" | "On Track" | "Delayed" | "Exception";

export function RelayDemo({ generic, personalized, initialMode, onClose }: RelayDemoProps) {
  const [mode, setMode] = useState<"generic" | "personalized">(initialMode);
  const [view, setView] = useState<"control" | "shipments">("control");
  const [filter, setFilter] = useState<ShipmentFilter>("All");
  const config = mode === "personalized" ? personalized : generic;
  const [selectedShipmentId, setSelectedShipmentId] = useState(config.shipments[0].id);
  const selectedShipment = config.shipments.find((shipment) => shipment.id === selectedShipmentId) ?? config.shipments[0];
  const filteredShipments = config.shipments.filter((shipment) => filter === "All" || shipment.status.toLowerCase() === filter.toLowerCase());

  function changeMode(next: "generic" | "personalized") {
    const nextConfig = next === "personalized" ? personalized : generic;
    setMode(next);
    setFilter("All");
    setSelectedShipmentId(nextConfig.shipments[0].id);
  }

  function openShipment(id: string) {
    setSelectedShipmentId(id);
    setView("shipments");
  }

  function openHub(location: string) {
    const shipment = config.shipments.find((item) => item.origin.includes(location) || item.destination.includes(location));
    if (shipment) openShipment(shipment.id);
  }

  return (
    <div className="modal-layer relay-layer" role="dialog" aria-modal="true" aria-label="Interactive Relay demo">
      <div className="relay-demo">
        <header className="relay-header">
          <div className="relay-brand"><div className="relay-mark"><Route size={17} /></div><div><strong>Relay</strong><span>Operations Control Tower</span></div></div>
          <div className="demo-context"><span>Prepared by ContextSE</span><span className="truth-tag synthetic">SYNTHETIC DEMO DATA</span></div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close demo"><X /></Button>
        </header>

        <div className="relay-subnav">
          <Button variant="ghost" size="sm" onClick={onClose}><ArrowLeft /> Account workspace</Button>
          <div className="comparison-switch" aria-label="Demo comparison"><button className={mode === "generic" ? "active" : ""} onClick={() => changeMode("generic")}>Before · Generic</button><button className={mode === "personalized" ? "active" : ""} onClick={() => changeMode("personalized")}>After · Gulf Logistics</button></div>
          <div className="relay-tabs"><button className={view === "control" ? "active" : ""} onClick={() => setView("control")}><Map size={15} /> Control tower</button><button className={view === "shipments" ? "active" : ""} onClick={() => setView("shipments")}><Boxes size={15} /> Shipments</button></div>
        </div>

        <main className="relay-content">
          <div className="relay-title-row"><div><span className="eyebrow">{mode === "personalized" ? "GULF LOGISTICS OPERATING LENS" : "GLOBAL NETWORK"}</span><h1>{config.companyName}</h1><p>{config.subtitle}</p></div>{mode === "personalized" && <div className="personalization-note"><span>Demo strategy</span>Exception-first · COO view · GCC–Europe</div>}</div>

          <section className="relay-kpis" aria-label="Operational KPIs">{config.kpis.map((kpi) => <article key={kpi.label}><span>{kpi.label}</span><strong>{kpi.value}</strong><small>{kpi.delta}</small></article>)}</section>

          {view === "control" ? (
            <div className="control-grid">
              <section className="network-panel">
                <div className="panel-heading"><div><span>Network view · Synthetic demo data</span><strong>Active operating lanes</strong></div><span className="live-dot">Scenario view</span></div>
                <div className={`network-map ${mode}`}>
                  <div className="map-grid" />
                  {config.shipments.slice(0, 3).map((shipment, index) => <button key={shipment.id} className={`route-line line-${index + 1 === 1 ? "one" : index + 1 === 2 ? "two" : "three"} ${selectedShipment.id === shipment.id ? "active" : ""}`} onClick={() => openShipment(shipment.id)} aria-label={`Open ${shipment.id}, ${shipment.origin} to ${shipment.destination}`} />)}
                  {config.locations.map((location, index) => <button className={`map-node node-${index + 1}`} key={location} onClick={() => openHub(location)}><i /><span>{location}</span></button>)}
                  <button className="moving-shipment" onClick={() => openShipment(config.shipments[0].id)} aria-label={`Open delayed shipment ${config.shipments[0].id}`}><Ship size={14} /></button>
                  <div className="map-caption">{config.narrative}</div>
                </div>
              </section>

              <section className="exception-panel">
                <div className="panel-heading"><div><span>Priority alerts</span><strong>Operational exceptions</strong></div><b>{config.exceptions.length}</b></div>
                <div className="exception-list">{config.exceptions.map((exception) => <button key={exception.id} onClick={() => openShipment(exception.shipmentId)}><i className={exception.severity} /><span><strong>{exception.title}</strong><small>{exception.route} · {exception.shipmentId}</small></span><em>{exception.eta}</em></button>)}</div>
                <div className="connected-story"><TriangleAlert /><div><strong>Connected operating story</strong><p>Select an alert to open the affected shipment, changed ETA, current location, and latest update.</p></div></div>
              </section>
            </div>
          ) : (
            <div className="shipment-view-grid">
              <section className="shipment-panel">
                <div className="panel-heading"><div><span>Shipment registry</span><strong>{config.companyName} active movements</strong></div><span className="truth-tag synthetic">SYNTHETIC</span></div>
                <div className="shipment-filters">{(["All", "On Track", "Delayed", "Exception"] as ShipmentFilter[]).map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
                <table><thead><tr><th>Shipment</th><th>Mode</th><th>Route</th><th>ETA</th><th>Status</th></tr></thead><tbody>{filteredShipments.map((shipment) => <tr key={shipment.id} className={selectedShipment.id === shipment.id ? "selected" : ""} onClick={() => setSelectedShipmentId(shipment.id)}><td><strong>{shipment.id}</strong></td><td>{shipment.mode}</td><td>{shipment.origin} → {shipment.destination}</td><td>{shipment.eta}</td><td><span className={shipment.status === "On Track" ? "status-good" : "status-risk"}>{shipment.status}</span></td></tr>)}</tbody></table>
              </section>
              <aside className="shipment-detail-panel">
                <div className="panel-heading"><div><span>Shipment detail</span><strong>{selectedShipment.id}</strong></div><span className={selectedShipment.status === "On Track" ? "status-good" : "status-risk"}>{selectedShipment.status}</span></div>
                <div className="shipment-detail-body"><div className="shipment-route"><span><i /><small>Origin</small><strong>{selectedShipment.origin}</strong></span><Route /><span><i /><small>Destination</small><strong>{selectedShipment.destination}</strong></span></div><dl><div><dt><Clock3 />ETA</dt><dd>{selectedShipment.eta}</dd></div><div><dt><MapPin />Current location</dt><dd>{selectedShipment.currentLocation}</dd></div><div><dt><TriangleAlert />Exception</dt><dd>{selectedShipment.exception}</dd></div><div><dt><Clock3 />Latest update</dt><dd>{selectedShipment.latestUpdate}</dd></div></dl><div className="shipment-action"><strong>Operational focus</strong><p>{selectedShipment.status === "On Track" ? "Continue monitoring the confirmed milestone." : "Coordinate the next checkpoint and monitor the revised ETA."}</p></div></div>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

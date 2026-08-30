import Link from "next/link";

const flow = [
  ["Context", "Your product and everything known about the prospect"],
  ["Agent", "Reason through the account with an AI Solutions Engineer"],
  ["Outputs", "Create account-specific demos, briefs, HTML, and PDFs"],
  ["Test", "Challenge the pitch against AI buyer personas"],
];

export default function Home() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <div className="landing-brand"><span>C</span>ContextSE</div>
        <Link href="/demo" className="landing-header-link">Hackathon demo <span>→</span></Link>
      </header>

      <section className="landing-hero">
        <span className="landing-eyebrow">ContextSE</span>
        <h1>Your AI Solutions Engineer for every account.</h1>
        <p>Every demo personalized. Every question anticipated.</p>

        <div className="landing-flow" aria-label="ContextSE product flow">
          {flow.map(([title, detail], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-demo-cta">
        <div><span>Collabute × The Block Hackathon Special</span><strong>Preloaded with a sample enterprise opportunity.</strong></div>
        <Link href="/demo">See the Demo <span>→</span></Link>
      </section>

      <footer className="landing-footer"><span>Built at Collabute × The Block Hackathon — Dubai</span><span>Context → Agent → Outputs → Test</span></footer>
    </main>
  );
}

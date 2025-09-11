import Navbar from "../../components/Navbar.jsx";

export default function FeatureShell({ title, lead, children, cta, ctaTo, ctaVariant = "btn-primary" }) {
  return (
    <>
      <Navbar />
      <main className="container" role="main" style={{ marginTop: 12 }}>
        <section className="card hero stack" aria-labelledby="feature-title">
          <h1 id="feature-title">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {cta && ctaTo && (
            <a className={`btn ${ctaVariant}`} href={`#${ctaTo}`}>{cta}</a>
          )}
        </section>
        <section className="stack" style={{ marginTop: 18 }}>
          {children}
        </section>
      </main>
    </>
  );
}


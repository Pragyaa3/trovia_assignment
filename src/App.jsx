import { useState, useEffect, useRef } from "react";

const G = () => {
  useEffect(() => {
    const f = document.createElement("link");
    f.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap";
    f.rel = "stylesheet"; document.head.appendChild(f);
    const s = document.createElement("style");
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0d1a0d; }
      ::-webkit-scrollbar-thumb { background: #c8a84b; border-radius: 10px; }
      @keyframes heroZoom { from{transform:scale(1.05)} to{transform:scale(1.12)} }
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes slideUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
};

function useW() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

const C = {
  forest: "#0d1a0d", deep: "#1a2e1a", moss: "#2d4a2d",
  sage: "#7a9e6e", meadow: "#b5c99a", cream: "#fafaf7",
  gold: "#c8a84b", goldL: "#e8d070", goldD: "#a8882b",
  border: "rgba(200,168,75,0.22)", muted: "#6b7a55",
};

const fmt = n => "₹" + n.toLocaleString("en-IN");

/* ── NAV ── */
function Nav({ scrolled }) {
  const w = useW();
  const mob = w < 768;
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "space-between", padding: mob ? "14px 20px" : "15px 52px", background: scrolled ? "rgba(13,26,13,0.97)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.45s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.moss})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>⛰</div>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.65rem", fontWeight: 700, color: C.gold }}>Tro<span style={{ color: C.meadow }}>via</span></span>
        </div>
        {!mob && (
          <div style={{ display: "flex", gap: 28 }}>
            {["Treks", "Explore", "Community", "Organizer"].map(l => (
              <a key={l} href="#" style={{ color: C.meadow, textDecoration: "none", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.meadow}>{l}</a>
            ))}
          </div>
        )}
        {!mob ? (
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ background: "transparent", color: C.meadow, border: `1px solid ${C.sage}55`, borderRadius: 6, padding: "9px 18px", fontSize: "0.79rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.color = C.cream; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.sage}55`; e.currentTarget.style.color = C.meadow; }}>Login</button>
            <button style={{ background: C.gold, color: C.deep, border: "none", borderRadius: 6, padding: "9px 20px", fontSize: "0.79rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.goldL; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; }}>Start Trekking</button>
          </div>
        ) : (
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem", color: C.gold }}>{open ? "✕" : "☰"}</button>
        )}
      </nav>
      {mob && open && (
        <div style={{ position: "fixed", top: 58, left: 0, right: 0, zIndex: 499, background: "rgba(13,26,13,0.98)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, animation: "slideUp 0.3s ease" }}>
          {["Treks", "Explore", "Community", "Organizer"].map(l => (
            <a key={l} href="#" onClick={() => setOpen(false)} style={{ color: C.meadow, textDecoration: "none", fontSize: "1rem", fontWeight: 500, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>{l}</a>
          ))}
          <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
            <button style={{ flex: 1, background: "transparent", color: C.meadow, border: `1px solid ${C.sage}55`, borderRadius: 6, padding: "11px", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>Login</button>
            <button style={{ flex: 1, background: C.gold, color: C.deep, border: "none", borderRadius: 6, padding: "11px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>Start Trekking</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── HERO ── */
function Hero() {
  const w = useW();
  const mob = w < 768;
  const tab = w < 1024;
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const words = ["Uttarakhand", "Himachal Pradesh", "Kashmir", "Sikkim", "Ladakh"];
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  useEffect(() => { const t = setInterval(() => setWIdx(i => (i + 1) % words.length), 2400); return () => clearInterval(t); }, []);
  const stats = [["2,400+", "Trekkers"], ["48", "Curated Treks"], ["18", "States"], ["4.9★", "Rating"]];

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: mob ? 600 : 680, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=85)", backgroundSize: "cover", backgroundPosition: "center 30%", animation: "heroZoom 22s ease-in-out infinite alternate" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,26,13,0.6) 0%,rgba(13,26,13,0.2) 40%,rgba(13,26,13,0.82) 80%,rgba(13,26,13,1) 100%)" }} />

      {!mob && (
        <div style={{ position: "absolute", top: 130, right: tab ? 24 : 72, animation: "float 4s ease-in-out infinite", background: "rgba(200,168,75,0.13)", border: `1px solid ${C.gold}55`, borderRadius: 14, padding: "13px 18px", backdropFilter: "blur(14px)", textAlign: "center", zIndex: 3 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", fontWeight: 700, color: C.gold, lineHeight: 1 }}>48</div>
          <div style={{ color: C.meadow, fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>Curated Treks</div>
        </div>
      )}
      {!mob && (
        <div style={{ position: "absolute", top: 200, left: tab ? 20 : 68, animation: "float 5s ease-in-out infinite 1s", background: "rgba(26,46,26,0.8)", border: `1px solid ${C.sage}44`, borderRadius: 12, padding: "11px 16px", backdropFilter: "blur(12px)", zIndex: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "1.1rem" }}>🔥</span>
            <div>
              <div style={{ color: C.cream, fontSize: "0.8rem", fontWeight: 600 }}>Valley of Flowers</div>
              <div style={{ color: C.sage, fontSize: "0.66rem" }}>Trending this season</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: mob ? "0 20px" : "0 24px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(32px)", transition: "all 1.1s ease 0.2s", maxWidth: 820, width: "100%" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(200,168,75,0.13)", border: `1px solid ${C.gold}44`, color: C.goldL, borderRadius: 100, padding: "5px 14px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>◆ India's Premier Trekking Platform</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(2.8rem,12vw,4rem)" : "clamp(3rem,8vw,6.5rem)", fontWeight: 700, lineHeight: 1.02, color: C.cream, marginBottom: 12 }}>Where Every<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Mountain</em> Calls</h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, minHeight: 32 }}>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", fontWeight: 300 }}>Trekking across</span>
          <span key={wIdx} style={{ color: C.meadow, fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600, animation: "slideUp 0.45s ease both" }}>{words[wIdx]}</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: mob ? "0.9rem" : "1.02rem", fontWeight: 300, lineHeight: 1.82, maxWidth: 500, margin: "0 auto 32px" }}>Discover handpicked Himalayan treks, join passionate adventurers, and book your next journey with total confidence.</p>
        <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.97)", borderRadius: 100, padding: "5px 5px 5px 18px", maxWidth: 520, margin: "0 auto 20px", boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}>
          <span style={{ fontSize: "1rem", marginRight: 8, color: C.muted }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={mob ? "Search treks…" : "Search treks, regions, difficulty…"} style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: "0.88rem", color: C.deep, fontFamily: "'Outfit',sans-serif", minWidth: 0 }} />
          <button style={{ background: C.deep, color: C.gold, border: "none", borderRadius: 100, padding: mob ? "10px 14px" : "10px 24px", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = C.moss}
            onMouseLeave={e => e.currentTarget.style.background = C.deep}>{mob ? "Go →" : "Explore →"}</button>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ background: C.gold, color: C.deep, border: "none", borderRadius: 100, padding: mob ? "12px 22px" : "13px 30px", fontWeight: 700, fontSize: mob ? "0.85rem" : "0.9rem", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.goldL; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; }}>⛺ Explore All Treks</button>
          <button style={{ background: "transparent", color: C.cream, border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 100, padding: mob ? "12px 18px" : "13px 24px", fontSize: mob ? "0.85rem" : "0.9rem", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.background = "transparent"; }}>Popular Destinations</button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, display: "flex", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {stats.map(([val, lbl], i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: mob ? "12px 4px" : "16px 8px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "rgba(13,26,13,0.78)", backdropFilter: "blur(12px)" }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "1.15rem" : "1.5rem", fontWeight: 700, color: C.gold }}>{val}</div>
            <div style={{ color: C.sage, fontSize: mob ? "0.58rem" : "0.66rem", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── TRUST STRIP ── */
function TrustStrip() {
  const items = Array(3).fill(["⛰ Himalayan Treks", "🌸 Valley of Flowers", "🏔 Hampta Pass", "🦅 Kedarkantha", "🌿 Chopta Tungnath", "❄️ Winter Treks", "🏕 Brahmatal", "🌄 Roopkund"]).flat();
  return (
    <div style={{ background: C.gold, overflow: "hidden", padding: "11px 0", borderTop: `2px solid ${C.goldD}`, borderBottom: `2px solid ${C.goldD}` }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "max-content" }}>
        {items.map((item, i) => <span key={i} style={{ padding: "0 26px", fontSize: "0.76rem", fontWeight: 700, color: C.deep, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{item}</span>)}
      </div>
    </div>
  );
}

/* ── TREK CARD ── */
const TREKS = [
  { name: "Valley of Flowers", region: "Chamoli, Uttarakhand", days: 6, price: 12999, rating: 4.9, reviews: 134, difficulty: "Moderate", season: "Jul–Sep", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", tag: "🏆 Best Seller" },
  { name: "Hampta Pass Trek", region: "Manali, Himachal Pradesh", days: 5, price: 9499, rating: 4.8, reviews: 89, difficulty: "Moderate", season: "Jun–Oct", img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80", tag: "🌟 Featured" },
  { name: "Kedarkantha Winter", region: "Uttarkashi, Uttarakhand", days: 6, price: 8999, rating: 4.9, reviews: 212, difficulty: "Easy–Mod", season: "Dec–Apr", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", tag: "❄️ Winter Pick" },
  { name: "Roopkund Mystery", region: "Chamoli, Uttarakhand", days: 8, price: 14999, rating: 4.7, reviews: 67, difficulty: "Difficult", season: "May–Jun", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", tag: "🔥 Trending" },
];

function TrekCard({ trek, i }) {
  const [hov, setHov] = useState(false);
  const diffColor = trek.difficulty === "Difficult" ? "#e05050" : trek.difficulty === "Easy–Mod" ? "#56c87a" : C.gold;
  return (
    <Reveal delay={i * 0.1}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ borderRadius: 18, overflow: "hidden", background: C.deep, border: `1px solid ${hov ? C.sage : "#243624"}`, transition: "all 0.35s", transform: hov ? "translateY(-6px)" : "translateY(0)", boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.45)" : "0 4px 18px rgba(0,0,0,0.25)", cursor: "pointer", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
          <img src={trek.img} alt={trek.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.55s", transform: hov ? "scale(1.08)" : "scale(1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,26,13,0.88) 0%,transparent 55%)" }} />
          <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(10,18,10,0.82)", border: `1px solid ${diffColor}55`, color: diffColor, borderRadius: 100, padding: "3px 10px", fontSize: "0.67rem", fontWeight: 700, backdropFilter: "blur(8px)" }}>{trek.difficulty}</div>
          <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(200,168,75,0.15)", border: `1px solid ${C.gold}55`, color: C.goldL, borderRadius: 100, padding: "3px 10px", fontSize: "0.64rem", fontWeight: 600, backdropFilter: "blur(8px)" }}>{trek.tag}</div>
          <div style={{ position: "absolute", bottom: 12, left: 12 }}>
            <div style={{ color: C.gold, fontSize: "0.75rem" }}>{"★".repeat(Math.floor(trek.rating))}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.63rem" }}>{trek.rating} · {trek.reviews} reviews</div>
          </div>
        </div>
        <div style={{ padding: "15px 17px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}><span style={{ fontSize: "0.65rem" }}>📍</span><span style={{ color: C.sage, fontSize: "0.65rem" }}>{trek.region}</span></div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.08rem", fontWeight: 700, color: C.cream, marginBottom: 9, lineHeight: 1.3, flex: 1 }}>{trek.name}</h3>
          <div style={{ display: "flex", gap: 10, marginBottom: 13, flexWrap: "wrap" }}>
            {[["🗓", `${trek.days}D`], ["🌿", trek.season]].map(([icon, val]) => (
              <span key={val} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: C.muted }}>{icon} {val}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.22rem", fontWeight: 700, color: C.gold }}>{fmt(trek.price)}</div>
              <div style={{ color: C.muted, fontSize: "0.63rem" }}>per person</div>
            </div>
            <button style={{ background: hov ? C.gold : "transparent", color: hov ? C.deep : C.gold, border: `1.5px solid ${C.gold}`, borderRadius: 7, padding: "7px 13px", fontSize: "0.74rem", fontWeight: 700, cursor: "pointer", transition: "all 0.25s", whiteSpace: "nowrap" }}>View →</button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FeaturedTreks() {
  const w = useW();
  const mob = w < 640;
  const tab = w < 1024;
  return (
    <section style={{ background: C.forest, padding: mob ? "56px 16px" : "88px 52px" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ color: C.sage, fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>Handpicked for You</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: C.cream, marginBottom: 10 }}>Featured Treks</h2>
        <p style={{ color: C.muted, fontSize: "0.93rem", maxWidth: 460, margin: "0 auto" }}>From alpine meadows to snow-clad passes — for every level of adventurer.</p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : tab ? "1fr 1fr" : "repeat(4,1fr)", gap: mob ? 12 : 18, maxWidth: 1240, margin: "0 auto" }}>
        {TREKS.map((t, i) => <TrekCard key={i} trek={t} i={i} />)}
      </div>
      <Reveal style={{ textAlign: "center", marginTop: 36 }}>
        <button style={{ background: "transparent", color: C.gold, border: `1.5px solid ${C.gold}`, borderRadius: 100, padding: "12px 30px", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.deep; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}>View All 48 Treks →</button>
      </Reveal>
    </section>
  );
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
  const w = useW();
  const mob = w < 768;
  const [active, setActive] = useState(0);
  const steps = [
    { n: "01", title: "Discover Your Trek", desc: "Browse 48+ curated Himalayan treks filtered by difficulty, region, season, and budget. Every listing has honest reviews from real trekkers.", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=80", icon: "🔍" },
    { n: "02", title: "Book with Confidence", desc: "Secure your spot in three clicks. Flexible payments, instant confirmation, zero hidden fees. Free cancellation up to 30 days before departure.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=80", icon: "🔒" },
    { n: "03", title: "Trek & Connect", desc: "Show up, meet your group, and let your guide handle the rest. Share your story with 10,000+ trekkers in the Trovia community.", img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=700&q=80", icon: "⛰" },
  ];
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % 3), 3800); return () => clearInterval(t); }, []);

  return (
    <section style={{ background: "#060e06", padding: mob ? "56px 16px" : "92px 52px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: -100, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle,${C.moss}33 0%,transparent 70%)`, pointerEvents: "none" }} />
      <Reveal style={{ textAlign: "center", marginBottom: mob ? 36 : 60 }}>
        <p style={{ color: C.sage, fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>Simple Process</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: C.cream, marginBottom: 10 }}>How <em style={{ color: C.gold, fontStyle: "italic" }}>Trovia</em> Works</h2>
        <p style={{ color: C.muted, fontSize: "0.93rem", maxWidth: 420, margin: "0 auto" }}>Your journey from idea to summit in three steps.</p>
      </Reveal>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 28 : 56, alignItems: "center" }}>
        <div>
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div onClick={() => setActive(i)} style={{ display: "flex", gap: 17, padding: "18px 16px", borderRadius: 13, cursor: "pointer", background: isActive ? "rgba(200,168,75,0.07)" : "transparent", border: `1px solid ${isActive ? C.border : "transparent"}`, transition: "all 0.35s", marginBottom: 7 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: isActive ? C.gold : "rgba(255,255,255,0.06)", border: `2px solid ${isActive ? C.gold : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.15rem", transition: "all 0.35s" }}>{step.icon}</div>
                    {i < 2 && <div style={{ width: 1, height: 20, background: isActive ? `linear-gradient(${C.gold},transparent)` : "rgba(255,255,255,0.1)", marginTop: 4 }} />}
                  </div>
                  <div>
                    <div style={{ color: isActive ? C.gold : C.sage, fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Step {step.n}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.18rem", fontWeight: 700, color: isActive ? C.cream : C.meadow, marginBottom: 6, transition: "color 0.3s" }}>{step.title}</h3>
                    <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.76, fontWeight: 300 }}>{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 20px 56px rgba(0,0,0,0.6)" }}>
            <img key={active} src={steps[active].img} alt={steps[active].title} style={{ width: "100%", height: "100%", objectFit: "cover", animation: "slideUp 0.5s ease both" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(6,14,6,0.65) 0%,transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, background: "rgba(10,18,10,0.75)", backdropFilter: "blur(14px)", borderRadius: 10, padding: "11px 15px", border: `1px solid ${C.border}` }}>
              <div style={{ color: C.gold, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Step {steps[active].n}</div>
              <div style={{ color: C.cream, fontSize: "0.88rem", fontWeight: 600 }}>{steps[active].title}</div>
            </div>
            <div style={{ position: "absolute", bottom: 76, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {steps.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{ width: active === i ? 20 : 7, height: 7, borderRadius: 4, background: active === i ? C.gold : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── ADVENTURE CTA ── */
function AdventureAwaits() {
  const w = useW();
  const mob = w < 768;
  const [ref, v] = useReveal(0.1);
  return (
    <section ref={ref} style={{ position: "relative", height: mob ? 460 : 540, overflow: "hidden", display: "flex", alignItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=85)", backgroundSize: "cover", backgroundPosition: "center 35%", transform: v ? "scale(1)" : "scale(1.06)", transition: "transform 1.4s ease" }} />
      <div style={{ position: "absolute", inset: 0, background: mob ? "rgba(8,16,8,0.8)" : "linear-gradient(to right,rgba(8,16,8,0.92) 0%,rgba(8,16,8,0.65) 52%,rgba(8,16,8,0.15) 100%)" }} />
      {!mob && (
        <div style={{ position: "absolute", right: "10%", top: "18%", zIndex: 4, opacity: v ? 1 : 0, transform: v ? "scale(1) translateY(0)" : "scale(0.7) translateY(20px)", transition: "all 0.7s ease 0.6s" }}>
          <div style={{ background: C.cream, borderRadius: "50%", width: 94, height: 94, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.4)", animation: "float 4s ease-in-out infinite" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.75rem", fontWeight: 700, color: C.gold, lineHeight: 1 }}>500</span>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, color: C.moss, letterSpacing: "0.06em" }}>XP BONUS</span>
          </div>
        </div>
      )}
      <div style={{ position: "relative", zIndex: 2, padding: mob ? "0 20px" : "0 80px", maxWidth: mob ? "100%" : 580, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s ease 0.2s", textAlign: mob ? "center" : "left" }}>
        <span style={{ color: C.gold, fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>EXPLORE THE WORLD</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(2rem,9vw,2.8rem)" : "clamp(2.5rem,5vw,3.8rem)", fontWeight: 700, color: C.cream, marginTop: 10, marginBottom: 14, lineHeight: 1.05 }}>Ready for Your<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Next Adventure?</em></h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: mob ? "0.88rem" : "1rem", fontWeight: 300, lineHeight: 1.85, marginBottom: 28, maxWidth: 400 }}>Join 10,000+ trekkers. Earn XP, collect badges, and unlock rewards with every summit.</p>
        <div style={{ display: "flex", gap: 11, flexWrap: "wrap", justifyContent: mob ? "center" : "flex-start" }}>
          <button style={{ background: C.gold, color: C.deep, border: "none", borderRadius: 8, padding: mob ? "12px 24px" : "14px 30px", fontSize: "0.93rem", fontWeight: 700, cursor: "pointer", transition: "all 0.22s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.goldL; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; }}>Begin Your Journey</button>
          <button style={{ background: "transparent", color: C.meadow, border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: mob ? "12px 20px" : "14px 22px", fontSize: "0.93rem", cursor: "pointer", transition: "all 0.22s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = C.meadow; }}>Explore Community →</button>
        </div>
      </div>
    </section>
  );
}

/* ── COMMUNITY ── */
const COMMUNITIES = [
  { name: "Himalayan Explorers", members: 2840, online: 26, tags: ["Trekking", "Altitude"], accent: C.moss, desc: "Everything above 4,000 m — routes, gear, and shared summit moments." },
  { name: "Alpine Adventurers", members: 1620, online: 14, tags: ["Wildflowers", "Photography"], accent: C.goldD, desc: "High meadows, wildflowers, and golden-hour ridge walks.", popular: true },
  { name: "Winter Trekkers", members: 980, online: 8, tags: ["Snow", "Ice Trails"], accent: "#1a2e3a", desc: "Winter is the best season — if you know where to go." },
];

function Community() {
  const w = useW();
  const mob = w < 640;
  const tab = w < 1024;
  const [tab2, setTab2] = useState("popular");
  return (
    <section style={{ background: "#eef4e8", padding: mob ? "56px 16px" : "88px 52px" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 36 }}>
        <p style={{ color: C.sage, fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>Trovia Community</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: C.deep, marginBottom: 10 }}>Connect With Fellow Trekkers</h2>
        <p style={{ color: C.muted, fontSize: "0.93rem", maxWidth: 440, margin: "0 auto 22px" }}>10,000+ adventurers sharing stories, tips, and trails.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
          {["popular", "new", "most active"].map(t => (
            <button key={t} onClick={() => setTab2(t)} style={{ background: tab2 === t ? C.deep : "transparent", color: tab2 === t ? C.cream : C.muted, border: `1px solid ${tab2 === t ? C.deep : C.border}`, borderRadius: 100, padding: "7px 16px", fontSize: "0.77rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s" }}>{t}</button>
          ))}
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(3,1fr)", gap: mob ? 12 : 17, maxWidth: 960, margin: "0 auto" }}>
        {COMMUNITIES.map((c, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ background: "#fff", borderRadius: 15, overflow: "hidden", border: `1px solid ${C.border}`, transition: "all 0.3s", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", cursor: "pointer", position: "relative" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = C.sage; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = C.border; }}>
              <div style={{ height: 5, background: `linear-gradient(to right,${c.accent},${C.sage})` }} />
              {c.popular && <div style={{ position: "absolute", top: 12, right: 12, fontSize: "0.61rem", background: `${C.gold}22`, color: C.goldD, borderRadius: 100, padding: "2px 9px", fontWeight: 700 }}>POPULAR</div>}
              <div style={{ padding: "17px 19px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.05rem", flexShrink: 0 }}>⛰</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.93rem", color: C.deep }}>{c.name}</div>
                    <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.69rem", color: C.muted }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#27ae60", display: "inline-block" }} />{c.online} online</span>
                      <span style={{ fontSize: "0.69rem", color: C.muted }}>👥 {c.members.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: "0.82rem", color: C.muted, lineHeight: 1.68, marginBottom: 12, fontWeight: 300 }}>{c.desc}</p>
                <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
                  {c.tags.map(t => <span key={t} style={{ background: "#eef4e6", color: C.moss, borderRadius: 5, padding: "3px 8px", fontSize: "0.67rem", fontWeight: 500 }}>{t}</span>)}
                </div>
                <button style={{ width: "100%", background: C.deep, color: C.cream, border: "none", borderRadius: 7, padding: "9px", fontWeight: 600, fontSize: "0.79rem", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.moss}
                  onMouseLeave={e => e.currentTarget.style.background = C.deep}>Join Community →</button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const w = useW();
  const mob = w < 640;
  const tab = w < 1024;
  const reviews = [
    { name: "Priya Rawat", initials: "PR", color: "#5a8a5a", trek: "Valley of Flowers", stars: 5, text: "The valley in full bloom is something no photograph captures. Our guide knew every flower by name. A life-defining trip." },
    { name: "Arjun Mehta", initials: "AM", color: "#3a6a8a", trek: "Hampta Pass", stars: 5, text: "My first Himalayan trek. Trovia made it feel safe without losing any of the awe. Small group made it feel personal, not a package tour." },
    { name: "Kavya Iyer", initials: "KI", color: "#7a5a3a", trek: "Kedarkantha", stars: 5, text: "Woke up to a frozen world at 12,500 ft. The guide was exceptional. Already booked my third trek with Trovia." },
  ];
  return (
    <section style={{ background: C.deep, padding: mob ? "56px 16px" : "88px 52px" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ color: C.sage, fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>Real Stories</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: C.cream }}>Voices from the Trail</h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(3,1fr)", gap: mob ? 12 : 17, maxWidth: 1040, margin: "0 auto" }}>
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ background: C.forest, border: "1px solid #2a3e2a", borderRadius: 15, padding: "22px 20px", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3e2a"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ color: C.gold, fontSize: "0.92rem", marginBottom: 11 }}>{"★".repeat(r.stars)}</div>
              <p style={{ color: "rgba(255,255,255,0.67)", fontSize: "0.87rem", lineHeight: 1.82, fontWeight: 300, marginBottom: 17, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 37, height: 37, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "0.8rem", flexShrink: 0 }}>{r.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: C.cream }}>{r.name}</div>
                  <div style={{ fontSize: "0.67rem", color: C.sage }}>Trekked: {r.trek}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── NEWSLETTER ── */
function Newsletter() {
  const w = useW();
  const mob = w < 640;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section style={{ background: C.forest, padding: mob ? "48px 16px" : "60px 52px" }}>
      <Reveal>
        <div style={{ maxWidth: 620, margin: "0 auto", background: `linear-gradient(135deg,${C.deep},${C.moss})`, borderRadius: 18, padding: mob ? "32px 22px" : "46px 50px", textAlign: "center", border: `1px solid ${C.sage}33`, boxShadow: "0 18px 52px rgba(0,0,0,0.28)" }}>
          <div style={{ fontSize: "1.7rem", marginBottom: 10 }}>📬</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "1.55rem" : "1.8rem", fontWeight: 700, color: C.cream, marginBottom: 8 }}>Join the Adventure Newsletter</h3>
          <p style={{ color: C.muted, fontSize: "0.86rem", marginBottom: 22, lineHeight: 1.72 }}>Trek recommendations, bloom forecasts, gear guides, and early-bird offers — monthly.</p>
          {!sent ? (
            <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.sage}44`, borderRadius: 100, padding: "5px 5px 5px 17px", maxWidth: 390, margin: "0 auto" }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ flex: 1, border: "none", background: "transparent", outline: "none", color: C.cream, fontSize: "0.85rem", fontFamily: "'Outfit',sans-serif", minWidth: 0 }} />
              <button onClick={() => email && setSent(true)} style={{ background: C.gold, color: C.deep, border: "none", borderRadius: 100, padding: "9px 18px", fontWeight: 700, fontSize: "0.79rem", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.goldL}
                onMouseLeave={e => e.currentTarget.style.background = C.gold}>Subscribe →</button>
            </div>
          ) : (
            <div style={{ color: C.gold, fontSize: "0.98rem", fontWeight: 600 }}>✅ You're in! Welcome to the Trovia tribe.</div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  const w = useW();
  const mob = w < 640;
  const tab = w < 900;
  const links = {
    Explore: ["All Treks", "By Region", "By Difficulty", "Winter Treks", "Weekend Treks"],
    Community: ["Adventure Groups", "Trek Stories", "Leaderboard", "Events"],
    Company: ["About Trovia", "Blog", "For Organizers", "Press Kit"],
  };
  return (
    <footer style={{ background: "#070e07", padding: mob ? "44px 16px 100px" : "56px 52px 26px", borderTop: `1px solid ${C.gold}18` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : tab ? "1fr 1fr 1fr" : "2fr 1fr 1fr 1fr", gap: mob ? 24 : 38, marginBottom: mob ? 28 : 44 }}>
          <div style={{ gridColumn: mob ? "1/-1" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 27, height: 27, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.moss})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>⛰</div>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: C.gold }}>Tro<span style={{ color: C.meadow }}>via</span></span>
            </div>
            <p style={{ color: C.muted, fontSize: "0.81rem", lineHeight: 1.82, maxWidth: mob ? "100%" : 250, marginBottom: 16, fontWeight: 300 }}>Discover India's most breathtaking treks and connect with a community of passionate mountain lovers.</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["📸", "👥", "🐦", "▶️"].map((icon, i) => (
                <button key={i} style={{ width: 33, height: 33, borderRadius: "50%", background: `${C.sage}18`, border: `1px solid ${C.sage}33`, fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${C.gold}22`; e.currentTarget.style.borderColor = C.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${C.sage}18`; e.currentTarget.style.borderColor = `${C.sage}33`; }}>{icon}</button>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 style={{ color: C.cream, fontSize: "0.77rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 13, borderBottom: `1px solid ${C.gold}28`, paddingBottom: 8 }}>{group}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(item => (
                  <li key={item}><a href="#" style={{ color: C.muted, textDecoration: "none", fontSize: "0.8rem", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.muted}>{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.sage}18`, paddingTop: 18, display: "flex", flexDirection: mob ? "column" : "row", justifyContent: "space-between", alignItems: mob ? "flex-start" : "center", gap: 7 }}>
          <p style={{ color: C.muted, fontSize: "0.73rem" }}>© 2025 Trovia · 204 Nai Sadak, Gwalior, MP – 474001 · <a href="mailto:trovia.in@gmail.com" style={{ color: C.sage, textDecoration: "none" }}>trovia.in@gmail.com</a></p>
          <p style={{ color: "#3a4a3a", fontSize: "0.7rem" }}>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

/* ── BOTTOM NAV (mobile only) ── */
function BottomNav() {
  const w = useW();
  const [active, setActive] = useState("discover");
  if (w >= 768) return null;
  const items = [
    { id: "discover", icon: "🏠", label: "Discover" },
    { id: "explore", icon: "🧭", label: "Explore" },
    { id: "community", icon: "👥", label: "Community" },
    { id: "organizer", icon: "🏔", label: "Organizer" },
    { id: "login", icon: "👤", label: "Login" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 400, background: "rgba(8,16,8,0.98)", backdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "10px 0 16px" }}>
      {items.map(it => (
        <button key={it.id} onClick={() => setActive(it.id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", flex: 1 }}>
          <span style={{ fontSize: "1.05rem" }}>{it.icon}</span>
          <span style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: active === it.id ? C.gold : "rgba(255,255,255,0.28)", transition: "color 0.2s" }}>{it.label}</span>
          {active === it.id && <div style={{ width: 14, height: 2, background: C.gold, borderRadius: 10 }} />}
        </button>
      ))}
    </div>
  );
}

/* ── ROOT ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: C.forest, color: C.cream, overflowX: "hidden" }}>
      <G />
      <Nav scrolled={scrolled} />
      <Hero />
      <TrustStrip />
      <FeaturedTreks />
      <HowItWorks />
      <AdventureAwaits />
      <Community />
      <Testimonials />
      <Newsletter />
      <Footer />
      <BottomNav />
    </div>
  );
}
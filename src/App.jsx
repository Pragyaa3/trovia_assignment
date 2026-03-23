import { useState, useEffect, useRef } from "react";

const G = () => {
  useEffect(() => {
    const f = document.createElement("link");
    f.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap";
    f.rel = "stylesheet"; document.head.appendChild(f);
    const s = document.createElement("style");
    s.textContent = `
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:#0d1a0d}
      ::-webkit-scrollbar-thumb{background:#c8a84b;border-radius:10px}
      @keyframes heroZoom{from{transform:scale(1.05)}to{transform:scale(1.12)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.55}}
      @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    `;
    document.head.appendChild(s);
  }, []);
  return null;
};

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

function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, v] = useReveal();
  const t = { up: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)", scale: "scale(0.9)" };
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : (t[dir] || t.up), transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`, ...style }}>{children}</div>
  );
}

const C = {
  forest: "#0d1a0d", deep: "#1a2e1a", moss: "#2d4a2d",
  sage: "#7a9e6e", meadow: "#b5c99a", cream: "#fafaf7",
  gold: "#c8a84b", goldL: "#e8d070", goldD: "#a8882b",
  border: "#dde8cc", muted: "#6b7a55",
};
const fmt = n => "₹" + n.toLocaleString("en-IN");

/* ── NAV ── */
function Nav({ scrolled }) {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 52px", background: scrolled ? "rgba(13,26,13,0.97)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: scrolled ? "1px solid rgba(200,168,75,0.2)" : "none", transition: "all 0.45s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.moss})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>⛰</div>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.75rem", fontWeight: 700, color: C.gold, letterSpacing: "0.04em" }}>Tro<span style={{ color: C.meadow }}>via</span></span>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {["Treks", "Explore", "Community", "Stories", "Organizer"].map(l => (
          <a key={l} href="#" style={{ color: C.meadow, textDecoration: "none", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.meadow}>{l}</a>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{ background: "transparent", color: C.meadow, border: `1px solid ${C.sage}55`, borderRadius: 6, padding: "9px 20px", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.color = C.cream; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.sage}55`; e.currentTarget.style.color = C.meadow; }}>Login</button>
        <button style={{ background: C.gold, color: C.deep, border: "none", borderRadius: 6, padding: "9px 22px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = C.goldL; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; }}>Start Trekking</button>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  const stats = [["2,400+", "Trekkers"], ["48", "Curated Treks"], ["18", "States Covered"], ["4.9★", "Avg Rating"]];

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 680, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=85)", backgroundSize: "cover", backgroundPosition: "center 30%", animation: "heroZoom 22s ease-in-out infinite alternate" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(13,26,13,0.55) 0%,rgba(13,26,13,0.2) 42%,rgba(13,26,13,0.75) 80%,rgba(13,26,13,0.99) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", opacity: 0.04 }} />

      {/* Floating badges */}
      <div style={{ position: "absolute", top: 130, right: 72, animation: "float 4s ease-in-out infinite", background: "rgba(200,168,75,0.13)", border: `1px solid ${C.gold}55`, borderRadius: 16, padding: "14px 20px", backdropFilter: "blur(14px)", textAlign: "center", zIndex: 3 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: C.gold, lineHeight: 1 }}>48</div>
        <div style={{ color: C.meadow, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>Curated Treks</div>
      </div>
      <div style={{ position: "absolute", top: 210, left: 68, animation: "float 5s ease-in-out infinite 1s", background: "rgba(26,46,26,0.75)", border: `1px solid ${C.sage}44`, borderRadius: 12, padding: "12px 18px", backdropFilter: "blur(12px)", zIndex: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "1.2rem" }}>🔥</span>
          <div><div style={{ color: C.cream, fontSize: "0.82rem", fontWeight: 600 }}>Valley of Flowers</div><div style={{ color: C.sage, fontSize: "0.68rem" }}>Trending this season</div></div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(32px)", transition: "all 1.1s ease 0.2s", maxWidth: 820 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.13)", border: `1px solid ${C.gold}44`, color: C.goldL, borderRadius: 100, padding: "5px 16px", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 22 }}>◆ India's Premier Trekking Platform</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,8vw,6.5rem)", fontWeight: 700, lineHeight: 1, color: C.cream, marginBottom: 14 }}>Where Every<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Mountain</em> Calls</h1>
        <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 36px" }}>Discover handpicked Himalayan treks, join a community of passionate adventurers, and book your next journey with confidence.</p>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.97)", borderRadius: 100, padding: "6px 6px 6px 22px", maxWidth: 540, margin: "0 auto 24px", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
          <span style={{ fontSize: "1.05rem", marginRight: 10, color: C.muted }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search treks, regions, difficulty…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: "0.93rem", color: C.deep, fontFamily: "'Outfit',sans-serif" }} />
          <button style={{ background: C.deep, color: C.gold, border: "none", borderRadius: 100, padding: "11px 26px", fontWeight: 700, fontSize: "0.84rem", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.moss}
            onMouseLeave={e => e.currentTarget.style.background = C.deep}
          >Explore →</button>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button style={{ background: C.gold, color: C.deep, border: "none", borderRadius: 100, padding: "13px 32px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.goldL; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${C.gold}55`; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>⛺ Explore All Treks</button>
          <button style={{ background: "transparent", color: C.cream, border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 100, padding: "13px 28px", fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.background = "transparent"; }}>Popular Destinations</button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, display: "flex", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {stats.map(([val, lbl], i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "18px 10px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "rgba(13,26,13,0.75)", backdropFilter: "blur(12px)" }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: C.gold }}>{val}</div>
            <div style={{ color: C.sage, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 86, right: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.28)", fontSize: "0.64rem", letterSpacing: "0.12em", textTransform: "uppercase", zIndex: 3 }}>
        <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom,${C.sage}88,transparent)`, animation: "pulse 2s ease-in-out infinite" }} />
        scroll
      </div>
    </section>
  );
}

/* ── TRUST STRIP ── */
function TrustStrip() {
  const items = Array(2).fill(["⛰ Himalayan Treks","🌸 Valley of Flowers","🏔 Hampta Pass","🦅 Kedarkantha","🌿 Chopta Tungnath","❄️ Kedarnath","🏕 Brahmatal","🌄 Roopkund"]).flat();
  return (
    <div style={{ background: C.gold, overflow: "hidden", padding: "11px 0", borderTop: `2px solid ${C.goldD}`, borderBottom: `2px solid ${C.goldD}` }}>
      <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {items.map((item, i) => <span key={i} style={{ padding: "0 32px", fontSize: "0.8rem", fontWeight: 700, color: C.deep, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{item}</span>)}
      </div>
    </div>
  );
}

/* ── FEATURED TREKS ── */
const TREKS = [
  { name: "Valley of Flowers & Hemkund Sahib", region: "Chamoli, Uttarakhand", days: 6, group: "8–12", price: 12999, rating: 4.9, reviews: 134, difficulty: "Moderate", season: "Jul–Sep", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", tag: "🏆 Best Seller" },
  { name: "Hampta Pass Trek", region: "Manali, Himachal Pradesh", days: 5, group: "8–12", price: 9499, rating: 4.8, reviews: 89, difficulty: "Moderate", season: "Jun–Oct", img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80", tag: "🌟 Featured" },
  { name: "Kedarkantha Winter Trek", region: "Uttarkashi, Uttarakhand", days: 6, group: "6–12", price: 8999, rating: 4.9, reviews: 212, difficulty: "Easy–Mod", season: "Dec–Apr", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", tag: "❄️ Winter Pick" },
  { name: "Roopkund Mystery Trek", region: "Chamoli, Uttarakhand", days: 8, group: "8–14", price: 14999, rating: 4.7, reviews: 67, difficulty: "Difficult", season: "May–Jun", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", tag: "🔥 Trending" },
];

function TrekCard({ trek, i }) {
  const [hov, setHov] = useState(false);
  const diffColor = trek.difficulty === "Difficult" ? "#e05050" : trek.difficulty === "Easy–Mod" ? "#56c87a" : C.gold;
  return (
    <Reveal delay={i * 0.1}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ borderRadius: 18, overflow: "hidden", background: C.deep, border: `1px solid ${hov ? C.sage : "#243624"}`, transition: "all 0.35s", transform: hov ? "translateY(-8px)" : "translateY(0)", boxShadow: hov ? "0 22px 56px rgba(0,0,0,0.45)" : "0 4px 20px rgba(0,0,0,0.25)", cursor: "pointer" }}>
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img src={trek.img} alt={trek.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.55s", transform: hov ? "scale(1.08)" : "scale(1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,26,13,0.88) 0%,transparent 55%)" }} />
          <div style={{ position: "absolute", top: 13, left: 13, background: "rgba(10,18,10,0.82)", border: `1px solid ${diffColor}55`, color: diffColor, borderRadius: 100, padding: "4px 12px", fontSize: "0.7rem", fontWeight: 700, backdropFilter: "blur(8px)" }}>{trek.difficulty}</div>
          <div style={{ position: "absolute", top: 13, right: 13, background: "rgba(200,168,75,0.15)", border: `1px solid ${C.gold}55`, color: C.goldL, borderRadius: 100, padding: "4px 12px", fontSize: "0.68rem", fontWeight: 600, backdropFilter: "blur(8px)" }}>{trek.tag}</div>
          <div style={{ position: "absolute", bottom: 13, left: 13 }}>
            <div style={{ color: C.gold, fontSize: "0.8rem" }}>{"★".repeat(Math.floor(trek.rating))}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.68rem" }}>{trek.rating} · {trek.reviews} reviews</div>
          </div>
        </div>
        <div style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}><span style={{ fontSize: "0.7rem" }}>📍</span><span style={{ color: C.sage, fontSize: "0.7rem" }}>{trek.region}</span></div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.13rem", fontWeight: 700, color: C.cream, marginBottom: 12, lineHeight: 1.3 }}>{trek.name}</h3>
          <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
            {[["🗓", `${trek.days} days`], ["👥", trek.group], ["🌿", trek.season]].map(([icon, val]) => (
              <span key={val} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.74rem", color: C.muted }}><span>{icon}</span>{val}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.32rem", fontWeight: 700, color: C.gold }}>{fmt(trek.price)}</div>
              <div style={{ color: C.muted, fontSize: "0.68rem" }}>per person</div>
            </div>
            <button style={{ background: hov ? C.gold : "transparent", color: hov ? C.deep : C.gold, border: `1.5px solid ${C.gold}`, borderRadius: 8, padding: "9px 16px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", transition: "all 0.25s" }}>View Trek →</button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FeaturedTreks() {
  return (
    <section style={{ background: C.forest, padding: "96px 52px" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ color: C.sage, fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Handpicked for You</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: C.cream, marginBottom: 12 }}>Featured Treks</h2>
        <p style={{ color: C.muted, fontSize: "0.97rem", maxWidth: 500, margin: "0 auto" }}>From alpine meadows to snow-clad passes — curated journeys for every level of adventurer.</p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 1240, margin: "0 auto" }}>
        {TREKS.map((t, i) => <TrekCard key={i} trek={t} i={i} />)}
      </div>
      <Reveal style={{ textAlign: "center", marginTop: 42 }}>
        <button style={{ background: "transparent", color: C.gold, border: `1.5px solid ${C.gold}`, borderRadius: 100, padding: "13px 36px", fontSize: "0.86rem", fontWeight: 600, cursor: "pointer", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.deep; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}>View All 48 Treks →</button>
      </Reveal>
    </section>
  );
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Discover Your Trek", desc: "Browse 48+ curated Himalayan treks filtered by difficulty, region, season, and budget. Every listing comes with honest reviews from real trekkers who've completed the trail.", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80", icon: "🔍" },
    { n: "02", title: "Book with Confidence", desc: "Secure your spot in three clicks. Flexible payment options, instant confirmation, zero hidden fees. Free cancellation up to 30 days before departure.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", icon: "🔒" },
    { n: "03", title: "Trek & Earn XP", desc: "Complete treks, share stories, and earn XP points. Climb the community leaderboard and unlock exclusive member benefits and early access to new routes.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", icon: "🏆" },
  ];
  return (
    <section style={{ background: "#080f08", padding: "108px 52px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: -100, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle,${C.moss}22,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, right: -60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle,${C.gold}11,transparent 70%)`, pointerEvents: "none" }} />
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: 0.07 }} viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,100 L180,35 L360,75 L540,8 L720,60 L900,15 L1080,70 L1260,25 L1440,55 L1440,100 Z" fill={C.sage} />
      </svg>

      <Reveal style={{ textAlign: "center", marginBottom: 70 }}>
        <p style={{ color: C.sage, fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Simple. Seamless. Scenic.</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: C.cream, marginBottom: 12 }}>How Trovia Works</h2>
        <p style={{ color: C.muted, fontSize: "0.97rem", maxWidth: 460, margin: "0 auto" }}>Your journey from curious to summit-bound — in three beautifully simple steps.</p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 44, maxWidth: 1060, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 105, left: "18%", right: "18%", height: 1, background: `linear-gradient(to right,transparent,${C.gold}44,${C.gold}44,transparent)` }} />
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}
              onMouseEnter={e => { e.currentTarget.querySelector(".ring-el").style.transform = "scale(1.06) rotate(10deg)"; e.currentTarget.querySelector(".img-el").style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".ring-el").style.transform = "scale(1) rotate(0deg)"; e.currentTarget.querySelector(".img-el").style.transform = "scale(1)"; }}
            >
              <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto 26px", cursor: "pointer" }}>
                <div className="ring-el" style={{ position: "absolute", inset: -10, borderRadius: "50%", border: `2px dashed ${C.gold}55`, transition: "transform 0.55s ease" }} />
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: `3px solid ${C.gold}44`, position: "relative" }}>
                  <img className="img-el" src={step.img} alt={step.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.55s ease" }} />
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle,rgba(13,26,13,0.1),rgba(13,26,13,0.32))", borderRadius: "50%" }} />
                </div>
                <div style={{ position: "absolute", top: -2, right: -2, width: 40, height: 40, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.78rem", color: C.deep, boxShadow: `0 4px 14px ${C.gold}55` }}>{i + 1}</div>
                <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", background: C.deep, border: `1px solid ${C.gold}44`, borderRadius: 9, padding: "5px 13px", fontSize: "1.05rem" }}>{step.icon}</div>
              </div>
              <div style={{ color: C.gold, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 9 }}>Step {step.n}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: C.cream, marginBottom: 11 }}>{step.title}</h3>
              <p style={{ color: C.muted, fontSize: "0.86rem", lineHeight: 1.82, maxWidth: 270, margin: "0 auto", fontWeight: 300 }}>{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── ADVENTURE AWAITS ── */
function AdventureAwaits() {
  const [hov, setHov] = useState(false);
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520, overflow: "hidden" }}>
      <div style={{ background: "#f5ede4", padding: "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Reveal dir="left">
          <p style={{ color: "#b07050", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>Your Journey Begins Here</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,3.2vw,2.8rem)", fontWeight: 700, color: "#2a1a0a", lineHeight: 1.15, marginBottom: 16 }}>Ready for Your<br /><em style={{ color: "#c8703a", fontStyle: "italic" }}>Next Adventure?</em></h2>
          <p style={{ color: "#7a6050", fontSize: "0.94rem", lineHeight: 1.84, marginBottom: 26, fontWeight: 300, maxWidth: 400 }}>Join 2,400+ trekkers discovering India's most breathtaking trails. Get insider tips, connect with fellow adventurers, and find the perfect trek for your schedule and fitness level.</p>
          <div style={{ display: "flex", gap: 9, marginBottom: 26, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(200,112,58,0.14)", border: "1px solid rgba(200,112,58,0.3)", color: "#c8703a", borderRadius: 100, padding: "6px 15px", fontSize: "0.78rem", fontWeight: 600 }}>🎁 500 XP on signup</div>
            <div style={{ background: "rgba(200,112,58,0.14)", border: "1px solid rgba(200,112,58,0.3)", color: "#c8703a", borderRadius: 100, padding: "6px 15px", fontSize: "0.78rem", fontWeight: 600 }}>🆓 Free to join</div>
            <div style={{ background: "rgba(200,112,58,0.14)", border: "1px solid rgba(200,112,58,0.3)", color: "#c8703a", borderRadius: 100, padding: "6px 15px", fontSize: "0.78rem", fontWeight: 600 }}>🏆 Earn rewards</div>
          </div>
          <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ alignSelf: "flex-start", background: hov ? "#a85f2a" : "#c8703a", color: "#fff", border: "none", borderRadius: 100, padding: "14px 34px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", transition: "all 0.22s", transform: hov ? "translateY(-2px)" : "translateY(0)", boxShadow: hov ? "0 8px 24px rgba(200,112,58,0.4)" : "none" }}>Begin Your Journey →</button>
        </Reveal>
      </div>
      <Reveal dir="right" style={{ position: "relative", minHeight: 420 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=85)", backgroundSize: "cover", backgroundPosition: "center top", transition: "transform 0.65s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(245,237,228,0.35),transparent 40%)" }} />
        <div style={{ position: "absolute", top: "50%", right: "14%", transform: "translateY(-50%)", background: "#fff", borderRadius: "50%", width: 90, height: 90, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.22)", animation: "float 4s ease-in-out infinite" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 800, color: "#c8703a", lineHeight: 1 }}>500</div>
          <div style={{ fontSize: "0.66rem", color: "#a06040", fontWeight: 600 }}>XP Bonus</div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── COMMUNITY ── */
const COMMUNITIES = [
  { name: "Himalayan Explorers", members: 1420, online: 26, tags: ["Himalaya", "Trekking", "Adventure"], accent: "#2d4a2d", popular: true },
  { name: "Alpine Adventurers", members: 980, online: 14, tags: ["Alpine", "Camping", "Snow"], accent: "#2a3a6a", popular: false },
  { name: "Trail Runners India", members: 660, online: 31, tags: ["Running", "Fitness", "Trail"], accent: "#5a2a2a", popular: false },
];

function Community() {
  const [tab, setTab] = useState("popular");
  return (
    <section style={{ background: "#f0f4ea", padding: "96px 52px" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ color: C.sage, fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Trovia Community</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: C.deep, marginBottom: 12 }}>Connect With Fellow Trekkers</h2>
        <p style={{ color: C.muted, fontSize: "0.97rem", maxWidth: 480, margin: "0 auto 26px" }}>Join 10,000+ adventurers. Share stories, plan together, find partners for your next Himalayan journey.</p>
        <div style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 100, padding: "7px 7px 7px 22px", maxWidth: 440, margin: "0 auto", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: `1px solid ${C.border}` }}>
          <span style={{ marginRight: 10, color: C.muted }}>🔍</span>
          <input placeholder="Search communities, topics, regions…" style={{ flex: 1, border: "none", outline: "none", fontSize: "0.86rem", color: C.deep, fontFamily: "'Outfit',sans-serif", background: "transparent" }} />
          <button style={{ background: C.moss, color: "#fff", border: "none", borderRadius: 100, padding: "9px 20px", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>Search</button>
        </div>
      </Reveal>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 32 }}>
        {["popular", "new", "most active"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? C.deep : "transparent", color: tab === t ? C.cream : C.muted, border: `1px solid ${tab === t ? C.deep : C.border}`, borderRadius: 100, padding: "8px 20px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s" }}>{t}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 980, margin: "0 auto" }}>
        {COMMUNITIES.map((c, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, transition: "all 0.3s", boxShadow: "0 2px 14px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 14px 38px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = C.sage; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 14px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = C.border; }}>
              <div style={{ height: 5, background: `linear-gradient(to right,${c.accent},${C.sage})` }} />
              <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem" }}>⛰</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem", color: C.deep }}>{c.name}</div>
                    {c.popular && <div style={{ fontSize: "0.65rem", background: `${C.gold}22`, color: C.goldD, borderRadius: 100, padding: "2px 8px", display: "inline-block", fontWeight: 700 }}>POPULAR</div>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, marginBottom: 13 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.76rem", color: C.muted }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#27ae60", display: "inline-block" }} />{c.online} online</span>
                  <span style={{ fontSize: "0.76rem", color: C.muted }}>👥 {c.members.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 17, flexWrap: "wrap" }}>
                  {c.tags.map(t => <span key={t} style={{ background: "#eef4e6", color: C.moss, borderRadius: 6, padding: "4px 10px", fontSize: "0.7rem", fontWeight: 500 }}>{t}</span>)}
                </div>
                <button style={{ width: "100%", background: C.deep, color: C.cream, border: "none", borderRadius: 8, padding: "10px", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", transition: "background 0.2s" }}
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
  const reviews = [
    { name: "Priya Rawat", initials: "PR", color: "#5a8a5a", trek: "Valley of Flowers", stars: 5, text: "The valley in full bloom is something no photograph can capture. Our guide knew every flower by name. Trovia's logistics were flawless — a life-defining trip." },
    { name: "Arjun Mehta", initials: "AM", color: "#3a6a8a", trek: "Hampta Pass", stars: 5, text: "My first Himalayan trek. Trovia made it feel completely safe without losing any of the awe. The small group meant it felt personal, not like a package tour." },
    { name: "Kavya Iyer", initials: "KI", color: "#7a5a3a", trek: "Kedarkantha", stars: 5, text: "Woke up to a frozen world at 12,500 feet with snow crunching underfoot. The trek leader was exceptional. Already booked my third trek with Trovia." },
  ];
  return (
    <section style={{ background: C.deep, padding: "96px 52px" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
        <p style={{ color: C.sage, fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Real Stories</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: C.cream }}>Voices from the Trail</h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1060, margin: "0 auto" }}>
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div style={{ background: C.forest, border: "1px solid #2a3e2a", borderRadius: 16, padding: "26px 24px", transition: "all 0.3s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.transform = "translateY(-5px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3e2a"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ color: C.gold, fontSize: "1rem", marginBottom: 13 }}>{"★".repeat(r.stars)}</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.84, fontWeight: 300, marginBottom: 20, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "0.86rem" }}>{r.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", color: C.cream }}>{r.name}</div>
                  <div style={{ fontSize: "0.7rem", color: C.sage }}>Trekked: {r.trek}</div>
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
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section style={{ background: C.forest, padding: "64px 52px" }}>
      <Reveal>
        <div style={{ maxWidth: 660, margin: "0 auto", background: `linear-gradient(135deg,${C.deep},${C.moss})`, borderRadius: 20, padding: "50px 54px", textAlign: "center", border: `1px solid ${C.sage}33`, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", opacity: 0.03 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "2rem", marginBottom: 13 }}>📬</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.85rem", fontWeight: 700, color: C.cream, marginBottom: 9 }}>Join the Adventure Newsletter</h3>
            <p style={{ color: C.muted, fontSize: "0.88rem", marginBottom: 26, lineHeight: 1.72 }}>Trek recommendations, bloom forecasts, gear guides, and exclusive early-bird offers — delivered to your inbox.</p>
            {!sent ? (
              <div style={{ display: "flex", gap: 7, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.sage}44`, borderRadius: 100, padding: "6px 6px 6px 20px", maxWidth: 400, margin: "0 auto" }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ flex: 1, border: "none", background: "transparent", outline: "none", color: C.cream, fontSize: "0.88rem", fontFamily: "'Outfit',sans-serif" }} />
                <button onClick={() => email && setSent(true)} style={{ background: C.gold, color: C.deep, border: "none", borderRadius: 100, padding: "10px 22px", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.goldL}
                  onMouseLeave={e => e.currentTarget.style.background = C.gold}>Subscribe →</button>
              </div>
            ) : (
              <div style={{ color: C.gold, fontSize: "1rem", fontWeight: 600 }}>✅ You're in! Welcome to the Trovia tribe.</div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  const links = { Explore: ["All Treks","By Region","By Difficulty","Winter Treks","Weekend Treks"], Community: ["Adventure Groups","Trek Stories","Leaderboard","Events"], Company: ["About Trovia","Blog","For Organizers","Press Kit"] };
  return (
    <footer style={{ background: "#070e07", padding: "60px 52px 28px", borderTop: `1px solid ${C.gold}18` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.moss})`, display: "flex", alignItems: "center", justifyContent: "center" }}>⛰</div>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.65rem", fontWeight: 700, color: C.gold }}>Tro<span style={{ color: C.meadow }}>via</span></span>
            </div>
            <p style={{ color: C.muted, fontSize: "0.84rem", lineHeight: 1.82, maxWidth: 270, marginBottom: 20, fontWeight: 300 }}>Discover India's most breathtaking treks and connect with a community of passionate mountain lovers.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["📸","👥","🐦","▶️"].map((icon, i) => (
                <button key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: `${C.sage}18`, border: `1px solid ${C.sage}33`, fontSize: "0.88rem", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${C.gold}22`; e.currentTarget.style.borderColor = C.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${C.sage}18`; e.currentTarget.style.borderColor = `${C.sage}33`; }}>{icon}</button>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 style={{ color: C.cream, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, borderBottom: `1px solid ${C.gold}28`, paddingBottom: 10 }}>{group}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => <li key={item}><a href="#" style={{ color: C.muted, textDecoration: "none", fontSize: "0.83rem", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.muted}>{item}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.sage}18`, paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: C.muted, fontSize: "0.76rem" }}>© 2025 Trovia · 204 Nai Sadak, Gwalior, MP – 474001 · <a href="mailto:trovia.in@gmail.com" style={{ color: C.sage, textDecoration: "none" }}>trovia.in@gmail.com</a></p>
          <p style={{ color: "#3a4a3a", fontSize: "0.73rem" }}>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
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
    </div>
  );
}
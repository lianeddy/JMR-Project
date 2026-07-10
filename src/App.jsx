import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, Train, Leaf, Mosque, RoadHorizon, FirstAidKit, Storefront,
  MapPin, Phone, Envelope, CheckCircle, ArrowRight, Certificate, Lightning, Drop, Key,
} from "@phosphor-icons/react";
import { BADGE_COLORS, DISTANCES, FACILITIES, FACILITY_HIGHLIGHTS, NAV_LINKS, UNIT_SAMPLES } from "./constants";

function formatRupiah(n) {
  return "Rp " + (n / 1000000).toFixed(1).replace(".0", "") + " Jt/m²";
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const FAC_ICONS = { shield: ShieldCheck, train: Train, leaf: Leaf, mosque: Mosque };
const HIGHLIGHT_ICONS = { certificate: Certificate, lightning: Lightning, drop: Drop, key: Key };
const DIST_ICONS = { road: RoadHorizon, train: Train, hospital: FirstAidKit, shop: Storefront };
const CONTACT_ICONS = { phone: Phone, mail: Envelope, pin: MapPin };

function WhatsAppGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.127 1.535 5.858L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.388l-.36-.214-3.733.89.924-3.64-.235-.374A9.795 9.795 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
    </svg>
  );
}

function Mark({ dark = false, size = 34 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: dark ? "rgba(255,255,255,.1)" : "#E7ECFB",
      color: dark ? "#8FA6F2" : "#2454D6",
      fontFamily: "Outfit", fontWeight: 800, fontSize: size * 0.4, letterSpacing: -0.5,
    }}>JR</span>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const [heroRef, heroVisible] = useInView(0.1);
  const [factsRef, factsVisible] = useInView(0.2);
  const [facRef, facVisible] = useInView(0.1);
  const [unitRef, unitVisible] = useInView(0.1);
  const [locRef, locVisible] = useInView(0.1);
  const [formRef, formVisible] = useInView(0.1);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const featured = UNIT_SAMPLES[0];
  const restUnits = UNIT_SAMPLES.slice(1);

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#F5F6F3}
        ::selection{background:#2454D6;color:#fff}
        h1,h2,h3{text-wrap:balance}

        .fade-up{opacity:0;transform:translateY(22px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}
        .fade-up.in{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}.d4{transition-delay:.28s}

        .nav-link:hover{color:#2454D6!important}
        .btn-p{background:#2454D6;color:#fff;border:none;border-radius:12px;font-family:"Plus Jakarta Sans",sans-serif;font-weight:700;cursor:pointer;transition:background .2s cubic-bezier(.16,1,.3,1),transform .16s cubic-bezier(.16,1,.3,1),box-shadow .2s cubic-bezier(.16,1,.3,1)}
        .btn-p:active{transform:scale(.97)}
        .btn-p:hover{background:#1B3FA8!important;box-shadow:0 6px 18px rgba(36,84,214,.32)!important}
        .btn-wa{background:#25D366!important}
        .btn-wa:hover{background:#1aab52!important;box-shadow:0 6px 18px rgba(37,211,102,.32)!important}
        .btn-o{background:none;border:1.5px solid #C7CCD6;color:#12141A;border-radius:12px;font-family:"Plus Jakarta Sans",sans-serif;font-weight:700;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease}
        .btn-o:active{transform:scale(.97)}
        .btn-o:hover{background:#12141A!important;color:#fff!important;border-color:#12141A!important}

        .lift{transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s cubic-bezier(.16,1,.3,1)}
        @media (hover:hover) and (pointer:fine){
          .lift:hover{transform:translateY(-4px);box-shadow:0 16px 32px rgba(10,15,30,.1)!important}
          .dist-row:hover{background:#FFFFFF!important;border-color:#D7DBE3!important}
        }
        .dist-row{transition:background .2s ease,border-color .2s ease}

        input:focus,textarea:focus{outline:none;border-color:#2454D6!important;box-shadow:0 0 0 3px rgba(36,84,214,.14)}
        input,textarea{transition:border-color .2s ease,box-shadow .2s ease}

        /* hero split */
        .hero-wrap{display:flex;align-items:center;gap:56px}
        .hero-visual{flex:0 0 40%;position:relative}
        .hero-visual img{width:100%;height:460px;object-fit:cover;border-radius:24px;display:block}
        .hero-floater{position:absolute;left:-24px;bottom:-24px;max-width:250px}

        /* quick facts bar */
        .facts-row{display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap}
        .facts-item{padding:0 32px;text-align:center;border-left:1px solid #E3E6E2}
        .facts-item:first-child{border-left:none}

        /* bento facilities */
        .bento{display:grid;grid-template-columns:1fr;gap:16px}
        .bento-cell{border-radius:20px;position:relative;overflow:hidden}
        .bento-cell .bento-img{transition:transform .5s cubic-bezier(.16,1,.3,1)}
        .bento-cell:hover .bento-img{transform:scale(1.05)}
        .bento-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .bento-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,19,48,.06) 0%,rgba(11,19,48,0) 32%,rgba(11,19,48,.88) 100%)}
        .bento-tag{position:absolute;top:16px;left:16px;z-index:1;display:inline-flex;align-items:center;gap:5px;background:#0B1330;color:#fff;border-radius:20px;padding:5px 11px;font-family:"Plus Jakarta Sans";font-size:11px;font-weight:700;letter-spacing:.02em}
        .bento-text{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:24px}
        .bento-card{background:#fff;border-radius:18px;padding:24px 22px;box-shadow:0 3px 14px rgba(10,15,30,.05);border:1px solid #EBEDEA;height:100%;display:flex;flex-direction:column;justify-content:center}
        .bento-card-title{font-family:"Outfit";font-size:16px;font-weight:700;color:#12141A;margin-bottom:7px}
        .bento-card-text{font-family:"Plus Jakarta Sans";font-size:13.5px;color:#5B6169;line-height:1.6}

        /* facility highlight strip */
        .fac-highlight-row{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:16px}
        .fac-highlight-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #EBEDEA;border-radius:14px;padding:14px 16px}
        .fac-highlight-icon{width:34px;height:34px;border-radius:10px;background:#E7ECFB;color:#2454D6;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .fac-highlight-label{font-family:"Plus Jakarta Sans";font-size:13px;font-weight:600;color:#12141A;line-height:1.35}

        /* location split */
        .loc-wrap{display:flex;gap:40px;align-items:stretch}
        .loc-list{flex:1 1 55%;display:flex;flex-direction:column;gap:10px}
        .loc-panel{flex:1 1 45%;position:relative;border-radius:22px;overflow:hidden;min-height:420px}
        .loc-panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .loc-panel-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,19,48,.05) 30%,rgba(11,19,48,.92) 100%)}
        .loc-panel-text{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:30px;color:#fff}

        /* price pills */
        .tier-row{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;scroll-snap-type:x proximity}
        .tier-pill{scroll-snap-align:start;flex:0 0 auto;background:#fff;border-radius:14px;padding:14px 24px;text-align:center;box-shadow:0 3px 12px rgba(10,15,30,.06);white-space:nowrap}

        /* featured unit */
        .unit-featured{display:flex;align-items:center;gap:28px;background:#12141A;border-radius:22px;padding:30px;margin-bottom:20px;color:#fff}
        .unit-featured img{width:190px;height:190px;object-fit:cover;border-radius:16px;flex-shrink:0}

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

        @media (prefers-reduced-motion: reduce){
          .fade-up{transition:opacity .3s ease!important;transform:none!important;opacity:1}
          .float-badge{animation:none!important}
        }

        @media(min-width:900px){
          .bento{grid-template-columns:1.3fr 1fr 1fr;grid-template-rows:repeat(2,minmax(150px,auto));grid-template-areas:"big mid2 wide" "big mid4 wide"}
          .bento .area-big{grid-area:big}
          .bento .area-mid2{grid-area:mid2}
          .bento .area-mid4{grid-area:mid4}
          .bento .area-wide{grid-area:wide}
          .fac-highlight-row{grid-template-columns:repeat(4,1fr)}
        }
        @media(max-width:899px){
          .hero-wrap{flex-direction:column!important}
          .hero-visual{flex:none;width:100%}
          .hero-floater{position:static;margin-top:14px;max-width:none}
          .loc-wrap{flex-direction:column!important}
          .loc-panel{min-height:260px}
          .unit-grid{grid-template-columns:1fr 1fr!important}
          .unit-featured{flex-direction:column;text-align:center}
          .unit-featured img{width:100%;height:180px}
          .contact-grid{grid-template-columns:1fr!important}
          .nav-links{display:none!important}
          .burger-btn{display:flex!important}
        }
        @media(max-width:520px){
          .unit-grid{grid-template-columns:1fr!important}
          .facts-item{border-left:none;padding:6px 18px}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          <div style={S.logo} onClick={() => scrollTo("home")}>
            <Mark />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17, color: "#12141A" }}>Jatimulya</div>
              <div style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 10, color: "#2454D6", letterSpacing: 2, textTransform: "uppercase" }}>Regency</div>
            </div>
          </div>
          <div className="nav-links" style={S.navLinks}>
            {NAV_LINKS.map(l => (
              <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())} style={S.navLink}>{l}</button>
            ))}
            <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "10px 22px", fontSize: 14 }}>Hubungi Kami</button>
          </div>
          <button className="burger-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ ...S.burger, display: "none" }}>{menuOpen ? "✕" : "☰"}</button>
        </div>
        {menuOpen && (
          <div style={S.mobileMenu}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={S.mobileLink}>{l}</button>
            ))}
            <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "11px", fontSize: 14, width: "100%", marginTop: 8 }}>Hubungi Kami</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" ref={heroRef} style={S.hero}>
        <div className="hero-wrap" style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          {/* Content */}
          <div style={{ flex: "1 1 58%", minWidth: 0 }}>
            <div className={`fade-up ${heroVisible ? "in" : ""}`} style={S.pill}>
              Kavling Siap Bangun &nbsp;·&nbsp; Tambun Selatan, Bekasi
            </div>
            <h1 className={`fade-up d1 ${heroVisible ? "in" : ""}`} style={S.heroH1}>
              Cepat ke Mana Saja,<br />
              <span style={{ color: "#2454D6" }}>Nyaman Setiap Hari</span>
            </h1>
            <p className={`fade-up d2 ${heroVisible ? "in" : ""}`} style={S.heroP}>
              Kavling siap bangun di lokasi strategis Bekasi Timur, dekat tol dan LRT. Bangun rumah idaman sesuai keinginan Anda.
            </p>
            <div className={`fade-up d3 ${heroVisible ? "in" : ""}`} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-p" onClick={() => scrollTo("unit")} style={{ padding: "13px 28px", fontSize: 15, boxShadow: "0 4px 16px rgba(36,84,214,.28)" }}>Lihat Unit Tersedia</button>
              <button className="btn-o" onClick={() => scrollTo("lokasi")} style={{ padding: "13px 24px", fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
                Lihat Lokasi <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>

          {/* Visual */}
          <div className={`hero-visual fade-up d2 ${heroVisible ? "in" : ""}`}>
            <img src="https://picsum.photos/seed/jatimulya-kavling-plot/760/920" alt="Kavling siap bangun Jatimulya Regency" loading="eager" />
            <div className="hero-floater float-badge" style={{ animation: "float 5s ease-in-out infinite" }}>
              <div style={S.heroCard}>
                <span style={S.heroCardIcon}><MapPin size={18} weight="regular" /></span>
                <div>
                  <div style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 13, color: "#12141A" }}>Jl. Toyogiri Sel. No.61-62</div>
                  <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 11, color: "#5B6169" }}>Jatimulya, Tambun Selatan, Bekasi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <section ref={factsRef} style={S.factsBar}>
        <div className={`facts-row fade-up ${factsVisible ? "in" : ""}`} style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="facts-item">
            <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#5B6169", fontWeight: 600 }}>Harga mulai</div>
            <div style={{ fontFamily: "Outfit", fontSize: 24, fontWeight: 700, color: "#2454D6" }}>Rp 2,5 Jt/m²</div>
          </div>
          <div className="facts-item">
            <div style={{ fontFamily: "Outfit", fontSize: 24, fontWeight: 700, color: "#12141A" }}>10 Menit</div>
            <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#5B6169", fontWeight: 600 }}>ke LRT Jatimulya</div>
          </div>
          <div className="facts-item">
            <div style={{ fontFamily: "Outfit", fontSize: 24, fontWeight: 700, color: "#12141A" }}>2.6 km</div>
            <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#5B6169", fontWeight: 600 }}>ke Tol Bekasi Timur</div>
          </div>
          <div className="facts-item">
            <div style={{ fontFamily: "Outfit", fontSize: 24, fontWeight: 700, color: "#12141A" }}>59+ Unit</div>
            <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#5B6169", fontWeight: 600 }}>tersedia</div>
          </div>
        </div>
      </section>

      {/* ── FASILITAS ── */}
      <section id="fasilitas" ref={facRef} style={{ padding: "88px 24px", background: "#F5F6F3" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className={`fade-up ${facVisible ? "in" : ""}`} style={{ ...S.pill, display: "block", width: "fit-content", margin: "0 auto 14px" }}>Fasilitas Kawasan</span>
          <h2 className={`fade-up ${facVisible ? "in" : ""}`} style={S.h2}>Dibangun untuk Kenyamanan Keluarga</h2>
          <p className={`fade-up d1 ${facVisible ? "in" : ""}`} style={S.sub}>Satu gerbang akses, lingkungan yang terjaga, dan fasilitas ibadah — semua tertata dalam satu kawasan Jatimulya Regency.</p>

          <div className={`bento fade-up d2 ${facVisible ? "in" : ""}`}>
            {/* big — security, image */}
            <div className="bento-cell area-big lift" style={{ minHeight: 320 }}>
              <img className="bento-img" loading="lazy" src="https://picsum.photos/seed/jatimulya-security-gate/700/620" alt={FACILITIES[0].title} />
              <div className="bento-scrim" />
              <span className="bento-tag">{(() => { const I = FAC_ICONS[FACILITIES[0].icon]; return <I size={13} weight="bold" />; })()} 24/7</span>
              <div className="bento-text">
                <span style={S.bentoIconOnDark}>{(() => { const I = FAC_ICONS[FACILITIES[0].icon]; return <I size={22} weight="regular" />; })()}</span>
                <h3 style={S.bentoTitleDark}>{FACILITIES[0].title}</h3>
                <p style={S.bentoTextDark}>{FACILITIES[0].text}</p>
              </div>
            </div>
            {/* mid2 — transport, card */}
            <div className="bento-card area-mid2 lift">
              <span style={S.facIcon}>{(() => { const I = FAC_ICONS[FACILITIES[1].icon]; return <I size={22} weight="regular" />; })()}</span>
              <h3 className="bento-card-title">{FACILITIES[1].title}</h3>
              <p className="bento-card-text">{FACILITIES[1].text}</p>
            </div>
            {/* mid4 — mosque, card */}
            <div className="bento-card area-mid4 lift">
              <span style={S.facIcon}>{(() => { const I = FAC_ICONS[FACILITIES[3].icon]; return <I size={22} weight="regular" />; })()}</span>
              <h3 className="bento-card-title">{FACILITIES[3].title}</h3>
              <p className="bento-card-text">{FACILITIES[3].text}</p>
            </div>
            {/* wide — environment, image */}
            <div className="bento-cell area-wide lift" style={{ minHeight: 320 }}>
              <img className="bento-img" loading="lazy" src="https://picsum.photos/seed/jatimulya-green-park/700/620" alt={FACILITIES[2].title} />
              <div className="bento-scrim" />
              <span className="bento-tag">{(() => { const I = FAC_ICONS[FACILITIES[2].icon]; return <I size={13} weight="bold" />; })()} RTH</span>
              <div className="bento-text">
                <span style={S.bentoIconOnDark}>{(() => { const I = FAC_ICONS[FACILITIES[2].icon]; return <I size={22} weight="regular" />; })()}</span>
                <h3 style={S.bentoTitleDark}>{FACILITIES[2].title}</h3>
                <p style={S.bentoTextDark}>{FACILITIES[2].text}</p>
              </div>
            </div>
          </div>

          <div className={`fac-highlight-row fade-up d3 ${facVisible ? "in" : ""}`}>
            {FACILITY_HIGHLIGHTS.map((h) => {
              const I = HIGHLIGHT_ICONS[h.icon];
              return (
                <div key={h.label} className="fac-highlight-item">
                  <span className="fac-highlight-icon"><I size={18} weight="regular" /></span>
                  <span className="fac-highlight-label">{h.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── UNIT ── */}
      <section id="unit" ref={unitRef} style={{ padding: "88px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 className={`fade-up ${unitVisible ? "in" : ""}`} style={S.h2}>Unit Tersedia</h2>
          <p className={`fade-up d1 ${unitVisible ? "in" : ""}`} style={S.sub}>Kavling siap bangun dengan berbagai ukuran dan harga, bangun rumah sesuai impian Anda.</p>

          <div className={`tier-row fade-up d2 ${unitVisible ? "in" : ""}`} style={{ justifyContent: "center", marginBottom: 40 }}>
            {[
              { range: "Rp 2,5 Juta/m²", desc: "Tipe Ekonomis", color: "#5B6169" },
              { range: "Rp 3,5 Juta/m²", desc: "Tipe Standar", color: "#2454D6" },
              { range: "Rp 4 Juta/m²", desc: "Tipe Premium", color: "#16A34A" },
            ].map(t => (
              <div key={t.range} className="tier-pill">
                <div style={{ fontFamily: "Outfit", fontSize: 18, fontWeight: 700, color: t.color }}>{t.range}</div>
                <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#5B6169", fontWeight: 600, marginTop: 2 }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {/* Featured unit */}
          <div className={`unit-featured fade-up d3 ${unitVisible ? "in" : ""}`}>
            <img src="https://picsum.photos/seed/jatimulya-unit-featured/380/380" alt={`Blok ${featured.blok}`} />
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 11, color: "#8FA6F2", letterSpacing: 1, textTransform: "uppercase" }}>Unit Unggulan</span>
              <h3 style={{ fontFamily: "Outfit", fontSize: 26, fontWeight: 700, marginTop: 6, marginBottom: 10 }}>Blok {featured.blok}</h3>
              <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                <span style={S.unitPillDark}>{featured.luas} m²</span>
                <span style={S.unitPillDark}>{formatRupiah(featured.harga)}</span>
                <span style={S.unitPillDark}>{featured.badge}</span>
              </div>
              <p style={{ fontFamily: "Plus Jakarta Sans", fontSize: 14, color: "rgba(255,255,255,.72)", marginBottom: 18 }}>
                Total mulai <strong style={{ color: "#fff" }}>Rp {Math.round(featured.luas * featured.harga / 1000000)} Juta</strong>
              </p>
              <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "11px 26px", fontSize: 14 }}>Tanya Unit Ini</button>
            </div>
          </div>

          <div className="unit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {restUnits.map((u, i) => {
              const bc = BADGE_COLORS[u.badge];
              const totalMin = Math.round(u.luas * u.harga / 1000000);
              return (
                <div key={u.blok} className={`lift fade-up d${(i % 4) + 1} ${unitVisible ? "in" : ""}`} style={S.unitCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: "#12141A" }}>Blok {u.blok}</span>
                    <span style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 10, background: bc.bg, color: bc.color, borderRadius: 20, padding: "3px 9px" }}>{u.badge}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={S.unitPill}>{u.luas} m²</span>
                    <span style={S.unitPill}>{formatRupiah(u.harga)}</span>
                  </div>
                  <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#5B6169", marginBottom: 14 }}>
                    Total mulai <strong style={{ color: "#2454D6" }}>Rp {totalMin} Juta</strong>
                  </div>
                  <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "9px 16px", fontSize: 12, width: "100%" }}>Tanya Unit Ini</button>
                </div>
              );
            })}
          </div>

          <div className={`fade-up d3 ${unitVisible ? "in" : ""}`} style={{ textAlign: "center", marginTop: 36 }}>
            <p style={{ fontFamily: "Plus Jakarta Sans", fontSize: 15, color: "#5B6169", marginBottom: 16 }}>Tersedia <strong>59+ unit</strong> dari berbagai blok dan ukuran. Hubungi kami untuk daftar lengkap.</p>
            <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "13px 32px", fontSize: 15, boxShadow: "0 4px 16px rgba(36,84,214,.28)" }}>Minta Daftar Unit Lengkap</button>
          </div>
        </div>
      </section>

      {/* ── LOKASI ── */}
      <section id="lokasi" ref={locRef} style={{ padding: "88px 24px", background: "#F5F6F3" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <h2 className={`fade-up ${locVisible ? "in" : ""}`} style={S.h2}>Dekat dengan Semua Kebutuhan</h2>
          <p className={`fade-up d1 ${locVisible ? "in" : ""}`} style={S.sub}>Akses mudah ke berbagai fasilitas dan area bisnis utama di Bekasi dan sekitarnya.</p>

          <div className={`loc-wrap fade-up d2 ${locVisible ? "in" : ""}`}>
            <div className="loc-list">
              {DISTANCES.map((d) => {
                const I = DIST_ICONS[d.icon];
                return (
                  <div key={d.place} className="dist-row" style={S.distRow}>
                    <span style={S.distIcon}><I size={19} weight="regular" /></span>
                    <span style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600, fontSize: 14, color: "#12141A", flex: 1 }}>{d.place}</span>
                    <span style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17, color: "#2454D6", whiteSpace: "nowrap" }}>{d.dist}</span>
                  </div>
                );
              })}
            </div>

            <div className="loc-panel">
              <img src="https://picsum.photos/seed/jatimulya-neighborhood-street/560/700" alt="Lingkungan Jatimulya Regency" />
              <div className="loc-panel-scrim" />
              <div className="loc-panel-text">
                <span style={S.heroCardIcon}><MapPin size={20} weight="regular" /></span>
                <h3 style={{ fontFamily: "Outfit", fontSize: 19, fontWeight: 700, marginTop: 12, marginBottom: 8 }}>Perumahan Jatimulya Regency</h3>
                <p style={{ fontFamily: "Plus Jakarta Sans", fontSize: 13.5, color: "rgba(255,255,255,.82)", lineHeight: 1.7, marginBottom: 16 }}>
                  Jl. Toyogiri Sel. No.61-62, Jatimulya, Tambun Selatan, Bekasi Regency, West Java 17510
                </p>
                <a href="https://maps.google.com/?q=Jatimulya+Regency+Bekasi" target="_blank" rel="noreferrer" style={S.mapLink}>
                  Buka di Google Maps <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={S.ctaBanner}>
        <div style={S.ctaWave} />
        <p style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 12, color: "#8FA6F2", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14, display: "block" }}>
          Kavling Terbatas, Segera Pesan
        </p>
        <h2 style={{ fontFamily: "Outfit", fontSize: "clamp(28px,4.5vw,50px)", fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
          Siap Bangun Rumah<br />Impian Anda?
        </h2>
        <p style={{ fontFamily: "Plus Jakarta Sans", fontSize: 16, color: "rgba(255,255,255,.75)", margin: "0 auto 34px", maxWidth: 420, lineHeight: 1.7 }}>
          Miliki kavling strategis di Jatimulya Regency. Bangun sesuai keinginan, harga mulai Rp 2,5 Juta/m².
        </p>
        <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "15px 40px", fontSize: 17, boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
          Hubungi Tim Pemasaran
        </button>
      </section>

      {/* ── KONTAK ── */}
      <section id="kontak" ref={formRef} style={{ padding: "88px 24px", background: "#F5F6F3" }}>
        <div className="contact-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>

          {/* Left */}
          <div>
            <h2 className={`fade-up ${formVisible ? "in" : ""}`} style={{ ...S.h2, textAlign: "left" }}>Tim Pemasaran Siap Membantu Anda</h2>
            <p className={`fade-up d1 ${formVisible ? "in" : ""}`} style={{ fontFamily: "Plus Jakarta Sans", fontSize: 15, color: "#5B6169", lineHeight: 1.75, maxWidth: 360, marginBottom: 32 }}>
              Dapatkan informasi lengkap tentang unit, harga, dan cara pembelian. Kami siap melayani Anda.
            </p>
            <div className={`fade-up d2 ${formVisible ? "in" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["phone", "0812 1990 0123", "tel:+6281219900123"],
                ["phone", "0821 1260 8210", "tel:+6282112608210"],
                ["mail", "regencyjatimulya@gmail.com", "mailto:regencyjatimulya@gmail.com"],
                ["pin", "Jl. Toyogiri Sel. No.61-62, Jatimulya, Tambun Selatan, Bekasi 17510", null],
              ].map(([icon, text, href]) => {
                const I = CONTACT_ICONS[icon];
                return (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={S.contactIcon}><I size={17} weight="regular" /></span>
                    {href
                      ? <a href={href} style={{ fontFamily: "Plus Jakarta Sans", fontSize: 14, color: "#2454D6", fontWeight: 700, textDecoration: "none", paddingTop: 10 }}>{text}</a>
                      : <span style={{ fontFamily: "Plus Jakarta Sans", fontSize: 14, color: "#5B6169", paddingTop: 10, lineHeight: 1.55 }}>{text}</span>
                    }
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className={`fade-up d2 ${formVisible ? "in" : ""}`} style={S.formCard}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={S.successIcon}><CheckCircle size={30} weight="regular" /></div>
                <h3 style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 700, color: "#12141A", marginBottom: 12 }}>Pesan Terkirim!</h3>
                <p style={{ fontFamily: "Plus Jakarta Sans", fontSize: 16, color: "#5B6169", lineHeight: 1.6, marginBottom: 24 }}>
                  Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda via WhatsApp.
                </p>
                <button className="btn-o" onClick={() => setSubmitted(false)} style={{ padding: "10px 24px" }}>
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                const waNumber = "6281219900123";
                const text =
                  `Halo, saya tertarik dengan Jatimulya Regency.\n\n` +
                  `*Nama:* ${form.name}\n` +
                  `*No. HP:* ${form.phone}\n` +
                  `*Pesan:* ${form.message || "-"}`;
                const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
                window.open(url, "_blank", "noopener,noreferrer");
                setSubmitted(true);
              }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                  <h3 style={{ fontFamily: "Outfit", fontSize: 20, fontWeight: 700, color: "#12141A" }}>Kirim via WhatsApp</h3>
                  <span style={{ background: "#25D366", borderRadius: 20, padding: "3px 10px", fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 11, color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
                    <WhatsAppGlyph size={12} />
                    WhatsApp
                  </span>
                </div>
                <p style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#8A8F97", marginTop: -10 }}>
                  Isi form ini, klik tombol untuk langsung chat via WhatsApp.
                </p>

                {[
                  { key: "name", label: "Nama Lengkap", type: "text", ph: "Budi Santoso" },
                  { key: "phone", label: "Nomor HP / WhatsApp", type: "tel", ph: "08xxxxxxxxxx" },
                ].map(f => (
                  <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 12, color: "#5B6169" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={S.input} />
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 12, color: "#5B6169" }}>Pertanyaan / Kebutuhan</label>
                  <textarea placeholder="Contoh: Saya tertarik unit blok F, mohon info lebih lanjut..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...S.input, resize: "vertical" }} />
                </div>

                <button className="btn-p btn-wa" type="submit" style={{
                  padding: "13px", fontSize: 15,
                  background: "#25D366",
                  boxShadow: "0 4px 16px rgba(37,211,102,.32)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <WhatsAppGlyph size={18} />
                  Kirim via WhatsApp
                </button>

                <p style={{ fontFamily: "Plus Jakarta Sans", fontSize: 11, color: "#8A8F97", textAlign: "center" }}>
                  Akan membuka WhatsApp ke <strong>0812 1990 0123</strong>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0B1330", padding: "44px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Mark dark />
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17, color: "#F5F6F3" }}>Jatimulya Regency</div>
              <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, color: "#8FA6F2", letterSpacing: 2, textTransform: "uppercase" }}>Kavling Siap Bangun</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Plus Jakarta Sans", color: "#A2A8BD", fontSize: 12 }}>Jl. Toyogiri Sel. No.61-62, Jatimulya, Tambun Selatan, Bekasi 17510</p>
            <p style={{ fontFamily: "Plus Jakarta Sans", color: "#A2A8BD", fontSize: 12 }}>regencyjatimulya@gmail.com &nbsp;|&nbsp; 0812 1990 0123 &nbsp;|&nbsp; 0821 1260 8210</p>
          </div>
          <p style={{ fontFamily: "Plus Jakarta Sans", color: "#A2A8BD", fontSize: 12 }}>© 2025 Jatimulya Regency.</p>
        </div>
      </footer>
    </div>
  );
}

const S = {
  root: { fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#F5F6F3", color: "#12141A", overflowX: "hidden" },

  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(245,246,243,.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E3E6E2", padding: "0 24px" },
  navInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 },
  logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
  navLinks: { display: "flex", alignItems: "center", gap: 22 },
  navLink: { fontFamily: "Plus Jakarta Sans", fontWeight: 600, fontSize: 14, color: "#5B6169", background: "none", border: "none", cursor: "pointer" },
  burger: { background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#12141A" },
  mobileMenu: { display: "flex", flexDirection: "column", gap: 8, padding: "14px 0 18px", borderTop: "1px solid #E3E6E2" },
  mobileLink: { fontFamily: "Plus Jakarta Sans", fontWeight: 600, fontSize: 15, color: "#5B6169", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "5px 0" },

  hero: { minHeight: "90dvh", display: "flex", alignItems: "center", position: "relative", padding: "96px 24px 64px" },
  pill: { display: "inline-block", background: "#E7ECFB", borderRadius: 20, padding: "6px 16px", fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 12, color: "#2454D6", marginBottom: 18 },
  heroH1: { fontFamily: "Outfit", fontSize: "clamp(34px,5vw,60px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 18, color: "#12141A", letterSpacing: "-0.02em" },
  heroP: { fontFamily: "Plus Jakarta Sans", fontSize: 16, color: "#5B6169", lineHeight: 1.75, marginBottom: 28, maxWidth: 460 },
  heroCard: { display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.96)", backdropFilter: "blur(12px)", borderRadius: 14, padding: "12px 16px", boxShadow: "0 8px 24px rgba(10,15,30,.14)" },
  heroCardIcon: { width: 34, height: 34, borderRadius: 9, background: "#E7ECFB", color: "#2454D6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },

  factsBar: { background: "#FFFFFF", borderTop: "1px solid #E3E6E2", borderBottom: "1px solid #E3E6E2", padding: "22px 24px" },

  h2: { fontFamily: "Outfit", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, color: "#12141A", textAlign: "center", marginBottom: 12, lineHeight: 1.15 },
  sub: { fontFamily: "Plus Jakarta Sans", fontSize: 16, color: "#5B6169", textAlign: "center", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.75 },

  facIcon: { width: 44, height: 44, borderRadius: 12, background: "#E7ECFB", color: "#2454D6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  bentoIconOnDark: { width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,.16)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  bentoTitleDark: { fontFamily: "Outfit", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 6 },
  bentoTextDark: { fontFamily: "Plus Jakarta Sans", fontSize: 13, color: "rgba(255,255,255,.82)", lineHeight: 1.6, maxWidth: 320 },

  unitCard: { background: "#fff", borderRadius: 16, padding: "20px 18px", boxShadow: "0 3px 12px rgba(10,15,30,.05)" },
  unitPill: { fontFamily: "Plus Jakarta Sans", fontSize: 11, fontWeight: 700, background: "#E7ECFB", color: "#2454D6", borderRadius: 20, padding: "3px 9px" },
  unitPillDark: { fontFamily: "Plus Jakarta Sans", fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,.14)", color: "#fff", borderRadius: 20, padding: "3px 9px" },

  distRow: { display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 14, padding: "16px 18px", cursor: "default", border: "1px solid #EBEDEA" },
  distIcon: { width: 38, height: 38, borderRadius: 10, background: "#E7ECFB", color: "#2454D6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  mapLink: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Plus Jakarta Sans", fontWeight: 700, fontSize: 13, color: "#fff", textDecoration: "none", border: "1.5px solid rgba(255,255,255,.4)", borderRadius: 12, padding: "9px 18px", width: "fit-content" },

  ctaBanner: { background: "linear-gradient(135deg,#0B1330 0%,#1B2B5C 100%)", padding: "90px 24px", textAlign: "center", position: "relative", overflow: "hidden" },
  ctaWave: { position: "absolute", top: 0, left: 0, right: 0, height: 58, background: "#F5F6F3", clipPath: "ellipse(55% 100% at 50% 0%)" },

  formCard: { background: "#fff", borderRadius: 20, padding: "34px", boxShadow: "0 10px 32px rgba(10,15,30,.08)" },
  input: { border: "1.5px solid #E3E6E2", borderRadius: 11, padding: "11px 15px", fontFamily: "Plus Jakarta Sans", fontSize: 14, color: "#12141A", background: "#F5F6F3", width: "100%" },
  contactIcon: { width: 40, height: 40, borderRadius: 11, background: "#E7ECFB", color: "#2454D6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  successIcon: { width: 64, height: 64, borderRadius: "50%", background: "#E7F1E3", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" },
};

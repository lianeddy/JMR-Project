import { useEffect, useRef, useState } from "react";
import { BADGE_COLORS, DISTANCES, FACILITIES, NAV_LINKS, UNIT_SAMPLES } from "./constants";

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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const [heroRef, heroVisible] = useInView(0.1);
  const [facRef, facVisible] = useInView(0.1);
  const [unitRef, unitVisible] = useInView(0.1);
  const [locRef, locVisible] = useInView(0.1);
  const [formRef, formVisible] = useInView(0.1);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#FDF8F2}
        ::selection{background:#C47D4A;color:#fff}

        .fade-up{opacity:0;transform:translateY(30px);transition:opacity .65s ease,transform .65s ease}
        .fade-up.in{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

        .nav-link:hover{color:#C47D4A!important}
        .btn-p{background:#C47D4A;color:#fff;border:none;border-radius:30px;font-family:Nunito,sans-serif;font-weight:700;cursor:pointer;transition:all .22s ease}
        .btn-p:hover{background:#A86538!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(196,125,74,.45)!important}
        .btn-wa{background:#25D366!important}
        .btn-wa:hover{background:#1aab52!important;box-shadow:0 8px 24px rgba(37,211,102,.45)!important}
        .btn-o{background:none;border:2px solid #C47D4A;color:#C47D4A;border-radius:30px;font-family:Nunito,sans-serif;font-weight:700;cursor:pointer;transition:all .22s ease}
        .btn-o:hover{background:#C47D4A!important;color:#fff!important}

        .fac-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(196,125,74,.12)!important}
        .fac-card{transition:transform .25s,box-shadow .25s}
        .unit-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(0,0,0,.1)!important}
        .unit-card{transition:transform .25s,box-shadow .25s}
        .dist-row:hover{background:#FFF7EE!important}
        .dist-row{transition:background .2s}

        input:focus,textarea:focus{outline:none;border-color:#C47D4A!important;box-shadow:0 0 0 3px rgba(196,125,74,.15)}
        input,textarea{transition:border-color .2s,box-shadow .2s}

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

        @media(max-width:900px){
          .hero-wrap{flex-direction:column!important}
          .hero-illo{display:none!important}
          .fac-grid{grid-template-columns:1fr 1fr!important}
          .unit-grid{grid-template-columns:1fr 1fr!important}
          .dist-grid{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .nav-links{display:none!important}
          .burger-btn{display:flex!important}
        }
        @media(max-width:520px){
          .unit-grid{grid-template-columns:1fr!important}
          .fac-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          <div style={S.logo} onClick={() => scrollTo("home")}>
            <span style={{ fontSize: 26 }}>🏡</span>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 17, color: "#1A0A00" }}>Jatimulya</div>
              <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 10, color: "#C47D4A", letterSpacing: 2, textTransform: "uppercase" }}>Regency</div>
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
        <div style={S.heroBg} />
        <div style={S.blob1} /><div style={S.blob2} />

        <div className="hero-wrap" style={{ display: "flex", alignItems: "center", maxWidth: 1200, margin: "0 auto", width: "100%", gap: 48, position: "relative", zIndex: 1 }}>
          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={`fade-up ${heroVisible ? "in" : ""}`} style={S.pill}>
              🌿 Kavling Siap Bangun &nbsp;•&nbsp; Tambun Selatan, Bekasi
            </div>
            <h1 className={`fade-up d1 ${heroVisible ? "in" : ""}`} style={S.heroH1}>
              Cepat ke Mana Saja,<br />
              <em style={{ color: "#C47D4A", fontStyle: "italic" }}>Nyaman Setiap Hari</em>
            </h1>
            <p className={`fade-up d2 ${heroVisible ? "in" : ""}`} style={S.heroP}>
              Jatimulya Regency menawarkan kavling siap bangun di lokasi strategis Bekasi Timur — miliki segera dan bangun rumah sesuai keinginan Anda.
            </p>

            <div className={`fade-up d2 ${heroVisible ? "in" : ""}`} style={S.priceBadge}>
              <span style={{ fontFamily: "Nunito", fontSize: 12, color: "#8A7A6A", fontWeight: 600 }}>Harga mulai</span>
              <span style={{ fontFamily: "Playfair Display", fontSize: 30, fontWeight: 700, color: "#C47D4A" }}>Rp. 2,5 Juta/m²</span>
            </div>

            <div className={`fade-up d3 ${heroVisible ? "in" : ""}`} style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <button className="btn-p" onClick={() => scrollTo("unit")} style={{ padding: "13px 30px", fontSize: 15, boxShadow: "0 4px 18px rgba(196,125,74,.35)" }}>Lihat Unit Tersedia</button>
              <button className="btn-o" onClick={() => scrollTo("lokasi")} style={{ padding: "13px 24px", fontSize: 15 }}>Lihat Lokasi →</button>
            </div>

            <div className={`fade-up d4 ${heroVisible ? "in" : ""}`} style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["10 Menit", "ke LRT Jatimulya"], ["2.6 km", "ke Tol Bekasi Timur"], ["59+ Unit", "Tersedia"]].map(([v, l]) => (
                <div key={l} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: "#1A0A00" }}>{v}</span>
                  <span style={{ fontFamily: "Nunito", fontSize: 12, color: "#8A7A6A", fontWeight: 600 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="hero-illo" style={{ flex: "0 0 340px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 130, animation: "float 4s ease-in-out infinite", filter: "drop-shadow(0 20px 32px rgba(196,125,74,.2))" }}>🏡</div>
            <div style={S.heroCard}>
              <span style={{ fontSize: 22 }}>📍</span>
              <div>
                <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "#1A0A00" }}>Jl. Toyogiri Sel. No.61-62</div>
                <div style={{ fontFamily: "Nunito", fontSize: 11, color: "#7A6A5A" }}>Jatimulya, Tambun Selatan, Bekasi 17510</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FASILITAS ── */}
      <section id="fasilitas" ref={facRef} style={{ padding: "90px 24px", background: "#FDF8F2" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={S.label}>✦ Keunggulan Kami</div>
          <h2 className={`fade-up ${facVisible ? "in" : ""}`} style={S.h2}>Fasilitas Lengkap<br />untuk Keluarga</h2>
          <p className={`fade-up d1 ${facVisible ? "in" : ""}`} style={S.sub}>Kami memastikan setiap penghuni merasakan kenyamanan dan keamanan di kawasan Jatimulya Regency.</p>
          <div className="fac-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
            {FACILITIES.map((f, i) => (
              <div key={f.title} className={`fac-card fade-up d${i + 1} ${facVisible ? "in" : ""}`} style={S.facCard}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 17, fontWeight: 700, color: "#1A0A00", marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontFamily: "Nunito", fontSize: 14, color: "#7A6A5A", lineHeight: 1.7 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIT ── */}
      <section id="unit" ref={unitRef} style={{ padding: "90px 24px", background: "#FFF7EE" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={S.label}>✦ Pilihan Kavling</div>
          <h2 className={`fade-up ${unitVisible ? "in" : ""}`} style={S.h2}>Unit Tersedia</h2>
          <p className={`fade-up d1 ${unitVisible ? "in" : ""}`} style={S.sub}>Kavling siap bangun dengan berbagai ukuran dan harga — bangun rumah sesuai impian Anda.</p>

          {/* Price tiers */}
          <div className={`fade-up d2 ${unitVisible ? "in" : ""}`} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
            {[
              { range: "Rp 2,5 Juta/m²", desc: "Tipe Ekonomis", color: "#6B7280" },
              { range: "Rp 3,5 Juta/m²", desc: "Tipe Standar", color: "#C47D4A" },
              { range: "Rp 4 Juta/m²", desc: "Tipe Premium", color: "#16A34A" },
            ].map(t => (
              <div key={t.range} style={{ background: "#fff", border: `2px solid ${t.color}30`, borderRadius: 16, padding: "14px 26px", textAlign: "center", boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
                <div style={{ fontFamily: "Playfair Display", fontSize: 19, fontWeight: 700, color: t.color }}>{t.range}</div>
                <div style={{ fontFamily: "Nunito", fontSize: 12, color: "#7A6A5A", fontWeight: 600, marginTop: 2 }}>{t.desc}</div>
              </div>
            ))}
          </div>

          <div className="unit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {UNIT_SAMPLES.map((u, i) => {
              const bc = BADGE_COLORS[u.badge];
              const totalMin = Math.round(u.luas * u.harga / 1000000);
              return (
                <div key={u.blok} className={`unit-card fade-up d${(i % 4) + 1} ${unitVisible ? "in" : ""}`} style={S.unitCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 15, color: "#1A0A00" }}>Blok {u.blok}</span>
                    <span style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 10, background: bc.bg, color: bc.color, border: `1px solid ${bc.border}`, borderRadius: 20, padding: "3px 9px" }}>{u.badge}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={S.unitPill}>📐 {u.luas} m²</span>
                    <span style={S.unitPill}>💰 {formatRupiah(u.harga)}</span>
                  </div>
                  <div style={{ fontFamily: "Nunito", fontSize: 12, color: "#7A6A5A", marginBottom: 14 }}>
                    Total mulai <strong style={{ color: "#C47D4A" }}>Rp {totalMin} Juta</strong>
                  </div>
                  <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "9px 16px", fontSize: 12, width: "100%", boxShadow: "0 3px 12px rgba(196,125,74,.3)" }}>Tanya Unit Ini</button>
                </div>
              );
            })}
          </div>

          <div className={`fade-up d3 ${unitVisible ? "in" : ""}`} style={{ textAlign: "center", marginTop: 36 }}>
            <p style={{ fontFamily: "Nunito", fontSize: 15, color: "#7A6A5A", marginBottom: 16 }}>Tersedia <strong>59+ unit</strong> dari berbagai blok dan ukuran. Hubungi kami untuk daftar lengkap.</p>
            <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "13px 32px", fontSize: 15, boxShadow: "0 4px 18px rgba(196,125,74,.35)" }}>Minta Daftar Unit Lengkap</button>
          </div>
        </div>
      </section>

      {/* ── LOKASI ── */}
      <section id="lokasi" ref={locRef} style={{ padding: "90px 24px", background: "#FDF8F2" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={S.label}>✦ Lokasi Strategis</div>
          <h2 className={`fade-up ${locVisible ? "in" : ""}`} style={S.h2}>Dekat dengan<br />Semua Kebutuhan</h2>
          <p className={`fade-up d1 ${locVisible ? "in" : ""}`} style={S.sub}>Akses mudah ke berbagai fasilitas dan area bisnis utama di Bekasi dan sekitarnya.</p>

          <div className="dist-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 44 }}>
            {DISTANCES.map((d, i) => (
              <div key={d.place} className={`dist-row fade-up d${(i % 3) + 1} ${locVisible ? "in" : ""}`} style={S.distRow}>
                <span style={{ fontSize: 26 }}>{d.icon}</span>
                <span style={{ fontFamily: "Nunito", fontWeight: 600, fontSize: 14, color: "#1A0A00", flex: 1 }}>{d.place}</span>
                <span style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 18, color: "#C47D4A", whiteSpace: "nowrap" }}>{d.dist}</span>
              </div>
            ))}
          </div>

          <div className={`fade-up d2 ${locVisible ? "in" : ""}`} style={S.addressCard}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>📍</div>
            <h3 style={{ fontFamily: "Playfair Display", fontSize: 21, fontWeight: 700, color: "#1A0A00", marginBottom: 10 }}>Alamat Lengkap</h3>
            <p style={{ fontFamily: "Nunito", fontSize: 15, color: "#5A4A3A", lineHeight: 1.8 }}>
              Perumahan Jatimulya Regency<br />
              Jl. Toyogiri Sel. No.61-62,<br />
              Jatimulya, Tambun Selatan,<br />
              Bekasi Regency, West Java 17510
            </p>
            <a href="https://maps.google.com/?q=Jatimulya+Regency+Bekasi" target="_blank" rel="noreferrer"
              style={{ display: "inline-block", marginTop: 18, fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: "#C47D4A", textDecoration: "none", border: "2px solid #C47D4A", borderRadius: 30, padding: "9px 22px" }}>
              Buka di Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={S.ctaBanner}>
        <div style={S.ctaWave} />
        <p style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 12, color: "#C47D4A", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14, display: "block" }}>
          🏠 Kavling terbatas — segera pesan!
        </p>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
          Siap Bangun Rumah<br />Impian Anda?
        </h2>
        <p style={{ fontFamily: "Nunito", fontSize: 16, color: "rgba(255,255,255,.8)", margin: "0 auto 34px", maxWidth: 420, lineHeight: 1.7 }}>
          Miliki kavling strategis di Jatimulya Regency.<br />Bangun sesuai keinginan, harga mulai Rp 2,5 Juta/m².
        </p>
        <button className="btn-p" onClick={() => scrollTo("kontak")} style={{ padding: "15px 40px", fontSize: 17, boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
          Hubungi Tim Pemasaran
        </button>
      </section>

      {/* ── KONTAK ── */}
      <section id="kontak" ref={formRef} style={{ padding: "90px 24px", background: "#FDF8F2" }}>
        <div className="contact-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>

          {/* Left */}
          <div>
            <div style={S.label}>✦ Hubungi Kami</div>
            <h2 className={`fade-up ${formVisible ? "in" : ""}`} style={{ ...S.h2, textAlign: "left" }}>Tim Pemasaran<br />Siap Membantu Anda</h2>
            <p className={`fade-up d1 ${formVisible ? "in" : ""}`} style={{ fontFamily: "Nunito", fontSize: 15, color: "#7A6A5A", lineHeight: 1.75, maxWidth: 360, marginBottom: 32 }}>
              Dapatkan informasi lengkap tentang unit, harga, dan cara pembelian. Kami siap melayani Anda.
            </p>
            <div className={`fade-up d2 ${formVisible ? "in" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["📞", "0812 1990 0123", "tel:+6281219900123"],
                ["📞", "0821 1260 8210", "tel:+6282112608210"],
                ["✉️", "regencyjatimulya@gmail.com", "mailto:regencyjatimulya@gmail.com"],
                ["📍", "Jl. Toyogiri Sel. No.61-62, Jatimulya, Tambun Selatan, Bekasi 17510", null],
              ].map(([icon, text, href]) => (
                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ fontSize: 18, width: 40, height: 40, background: "#FFF0E0", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</span>
                  {href
                    ? <a href={href} style={{ fontFamily: "Nunito", fontSize: 14, color: "#C47D4A", fontWeight: 700, textDecoration: "none", paddingTop: 10 }}>{text}</a>
                    : <span style={{ fontFamily: "Nunito", fontSize: 14, color: "#5A4A3A", paddingTop: 10, lineHeight: 1.55 }}>{text}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`fade-up d2 ${formVisible ? "in" : ""}`} style={S.formCard}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 24, fontWeight: 700, color: "#1A0A00", marginBottom: 12 }}>Pesan Terkirim!</h3>
                <p style={{ fontFamily: "Nunito", fontSize: 16, color: "#7A6A5A", lineHeight: 1.6, marginBottom: 24 }}>
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
                  <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: "#1A0A00" }}>Kirim via WhatsApp</h3>
                  <span style={{ background: "#25D366", borderRadius: 20, padding: "3px 10px", fontFamily: "Nunito", fontWeight: 700, fontSize: 11, color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.127 1.535 5.858L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.388l-.36-.214-3.733.89.924-3.64-.235-.374A9.795 9.795 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" /></svg>
                    WhatsApp
                  </span>
                </div>
                <p style={{ fontFamily: "Nunito", fontSize: 12, color: "#9A8A7A", marginTop: -10 }}>
                  Isi form ini — klik tombol untuk langsung chat via WhatsApp.
                </p>

                {[
                  { key: "name", label: "Nama Lengkap", type: "text", ph: "Budi Santoso" },
                  { key: "phone", label: "Nomor HP / WhatsApp", type: "tel", ph: "08xxxxxxxxxx" },
                ].map(f => (
                  <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 12, color: "#5A4A3A" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={S.input} />
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 12, color: "#5A4A3A" }}>Pertanyaan / Kebutuhan</label>
                  <textarea placeholder="Contoh: Saya tertarik unit blok F, mohon info lebih lanjut..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...S.input, resize: "vertical" }} />
                </div>

                <button className="btn-p btn-wa" type="submit" style={{
                  padding: "13px", fontSize: 15,
                  background: "#25D366",
                  boxShadow: "0 4px 18px rgba(37,211,102,.4)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.127 1.535 5.858L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.388l-.36-.214-3.733.89.924-3.64-.235-.374A9.795 9.795 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" /></svg>
                  Kirim via WhatsApp
                </button>

                <p style={{ fontFamily: "Nunito", fontSize: 11, color: "#9A8A7A", textAlign: "center" }}>
                  Akan membuka WhatsApp ke <strong>0812 1990 0123</strong>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1A2A1A", padding: "44px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>🏡</span>
            <div>
              <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 17, color: "#FDF8F2" }}>Jatimulya Regency</div>
              <div style={{ fontFamily: "Nunito", fontSize: 10, color: "#C47D4A", letterSpacing: 2, textTransform: "uppercase" }}>Kavling Siap Bangun</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Nunito", color: "#8A9A8A", fontSize: 12 }}>Jl. Toyogiri Sel. No.61-62, Jatimulya, Tambun Selatan, Bekasi 17510</p>
            <p style={{ fontFamily: "Nunito", color: "#8A9A8A", fontSize: 12 }}>regencyjatimulya@gmail.com &nbsp;|&nbsp; 0812 1990 0123 &nbsp;|&nbsp; 0821 1260 8210</p>
          </div>
          <p style={{ fontFamily: "Nunito", color: "#8A9A8A", fontSize: 12 }}>© 2025 Jatimulya Regency.</p>
        </div>
      </footer>
    </div>
  );
}

const S = {
  root: { fontFamily: "Nunito,sans-serif", background: "#FDF8F2", color: "#2A1A0A", overflowX: "hidden" },

  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(253,248,242,.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #EDD9C5", padding: "0 24px" },
  navInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 },
  logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
  navLinks: { display: "flex", alignItems: "center", gap: 22 },
  navLink: { fontFamily: "Nunito", fontWeight: 600, fontSize: 14, color: "#5A4A3A", background: "none", border: "none", cursor: "pointer" },
  burger: { background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#1A0A00" },
  mobileMenu: { display: "flex", flexDirection: "column", gap: 8, padding: "14px 0 18px", borderTop: "1px solid #EDD9C5" },
  mobileLink: { fontFamily: "Nunito", fontWeight: 600, fontSize: 15, color: "#5A4A3A", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "5px 0" },

  hero: { minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "100px 24px 80px", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 68% 50%, #FFE8CC 0%, #FDF8F2 62%)", zIndex: 0 },
  blob1: { position: "absolute", top: "8%", right: "2%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,#F5D5B0 0%,transparent 70%)", zIndex: 0 },
  blob2: { position: "absolute", bottom: "8%", left: "2%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,#D4E8D0 0%,transparent 70%)", zIndex: 0 },
  pill: { display: "inline-block", background: "#FFF0E0", border: "1px solid #EDD9C5", borderRadius: 20, padding: "6px 16px", fontFamily: "Nunito", fontWeight: 700, fontSize: 12, color: "#C47D4A", marginBottom: 18 },
  heroH1: { fontFamily: "Playfair Display", fontSize: "clamp(36px,5.5vw,66px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 18, color: "#1A0A00" },
  heroP: { fontFamily: "Nunito", fontSize: 16, color: "#6A5A4A", lineHeight: 1.78, marginBottom: 22, maxWidth: 460 },
  priceBadge: { display: "inline-flex", flexDirection: "column", background: "#fff", border: "2px solid #EDD9C5", borderRadius: 14, padding: "12px 22px", marginBottom: 26, gap: 1, boxShadow: "0 4px 18px rgba(196,125,74,.12)" },
  heroCard: { display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.88)", backdropFilter: "blur(12px)", border: "1px solid #EDD9C5", borderRadius: 14, padding: "12px 16px", boxShadow: "0 4px 18px rgba(0,0,0,.07)" },

  label: { textAlign: "center", fontFamily: "Nunito", fontWeight: 700, fontSize: 10, letterSpacing: 3, color: "#C47D4A", textTransform: "uppercase", marginBottom: 10 },
  h2: { fontFamily: "Playfair Display", fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, color: "#1A0A00", textAlign: "center", marginBottom: 12, lineHeight: 1.15 },
  sub: { fontFamily: "Nunito", fontSize: 16, color: "#7A6A5A", textAlign: "center", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.75 },

  facCard: { background: "#fff", border: "1px solid #EDD9C5", borderRadius: 18, padding: "28px 22px", boxShadow: "0 4px 14px rgba(0,0,0,.05)" },

  unitCard: { background: "#fff", border: "1px solid #EDD9C5", borderRadius: 16, padding: "20px 18px", boxShadow: "0 4px 14px rgba(0,0,0,.05)" },
  unitPill: { fontFamily: "Nunito", fontSize: 11, fontWeight: 700, background: "#FFF0E0", color: "#C47D4A", borderRadius: 20, padding: "3px 9px" },

  distRow: { display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid #EDD9C5", borderRadius: 14, padding: "16px 18px", cursor: "default" },

  addressCard: { background: "linear-gradient(135deg,#FFF7EE,#FFF0E0)", border: "2px solid #EDD9C5", borderRadius: 22, padding: "36px", textAlign: "center", maxWidth: 460, margin: "0 auto" },

  ctaBanner: { background: "linear-gradient(135deg,#1A2A1A 0%,#2D4A2D 100%)", padding: "90px 24px", textAlign: "center", position: "relative", overflow: "hidden" },
  ctaWave: { position: "absolute", top: 0, left: 0, right: 0, height: 58, background: "#FDF8F2", clipPath: "ellipse(55% 100% at 50% 0%)" },

  formCard: { background: "#fff", border: "1px solid #EDD9C5", borderRadius: 22, padding: "34px", boxShadow: "0 10px 36px rgba(196,125,74,.1)" },
  input: { border: "1.5px solid #EDD9C5", borderRadius: 11, padding: "11px 15px", fontFamily: "Nunito", fontSize: 14, color: "#1A0A00", background: "#FDF8F2", width: "100%" },
};

import { useState, useEffect, useRef, useCallback } from "react";
import { animateHero, animateMenu, animateSuasana, animateInfoCards, animateLokasi, animateKisah, animateCta, animateParallaxHero, animateNavbar, animateModalOpen, animateModalClose } from "./lib/animations";
import { useGsapCleanup } from "./hooks/useGsapAnimation";

const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNSJgMjRoQf9YvrEc-6p63LU7zyaHbecTP1PA2Bq0XFZUKIoepGU_vqM1Btai0EtoxhJsLEFWM7QHtjE9d5zF4F4eNpi7lzOGn2DGenhXxD9aAaIDDLm37OECvo6ue803Yi0faNPLeGIXtfbez4mIkrc8zsB_eC5QJEeRUfehwLCFkFxn7U4upzizQ_byfdO_PAsM4lzgzHhO9d9FWJODN4lAQTqtgPBGwjh5KRXNxRyciJcMZdveXpswEcLXBrt_NEDsYTAlwBcB4",
  coffee: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsKzd-2fsn37E2cmi4mlAM_8kRpGvbVOGmdmcTdv6LkvmrQ9KH-5d-dJ3-4OBVsV3hBDf-2l49BQcjkmMLTIxLjJo2oE12JpXR3VpNLIHR1aNdBElTWm3OGaWr3LvqnA4TmyO0fJ_QI_YEUHZeh4H2usjZBIW2yXXuiYFBn4NOsekBwhkMpeHwQCZhvOv07T6JkZRU7stmZdiBPbRtFeg3zGEenVWPG1xu0SQHDlNlNV1acX481rp21ylTghXm41tXoYg9TkEZsIDM",
  breakfast: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnEgFfxfjvrxZoYzS2XBU6NsgIp8pVy5YnNShEGSBvk9pXFE5DGSXKkr512I0vD9tfr1Jk6bu0Rc3PSLsx35Sln77hUOvV8iPLzuMBjW5fvHeXgFFwP0jnZ7L3Mal0rq6kw_IklcZQDkeNnvA4wS5nlGyBdjqrb0pXu0LjK7O5SBRs8bkpD26hVq4iEFc6SE0Y2MUDNzEoFEfMUSwIgxmM1ITeOHnFB24xlkBXo8MzPEYnY_KOYwEXitJAx3TpV-EvKrGa01KuqCwn",
  brunch: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ2tA1Tf5odZCLHVZF_EE5fQXCDhMZGu-bUboufaTp7gNBngdLwo67xCUR3W8j9dCD0xxv6eWy6RWB22NX-sghJHc6sdgt95ZA3-0VOnu5pP_yDg8eoopgz7z8R2Lkr2hE0SVMzeLZ_0VmyNwr1ZggXDm9F47N5jAjgG7GPpX6WuxdHsHepjmwTdE1y-_mrF1FadbUlw7kmWC9vH7HiS1aDqwudu2L3s38RLY4GlFbrq56Qt86uMpx_YtXGHJ1GhssJ5opCZHwO2Ha",
  suasana1: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
  suasana2: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  suasana3: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",
  suasana4: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80",
  kisah: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&q=80",
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div className={`toast-notification${visible ? " show" : ""}`}>
      {message}
    </div>
  );
}

function ReservasiModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    tanggal: "",
    waktu: "",
    tamu: "2",
    catatan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (modalRef.current) {
      animateModalOpen(modalRef.current);
    }
    return () => {
      if (modalRef.current) {
        animateModalClose(modalRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div ref={modalRef} className="modal-overlay gsap-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box gsap-modal-box">
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(28,27,27,0.06)",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#4a463f",
            transition: "background 0.2s",
          }}
          aria-label="Tutup"
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h3 className="font-playfair" style={{ fontSize: 24, fontWeight: 600, color: "#1c1b1b", marginBottom: 12 }}>
              Reservasi Berhasil!
            </h3>
            <p style={{ color: "#4a463f", fontSize: 16, lineHeight: 1.6 }}>
              Terima kasih, <strong>{form.nama}</strong>.<br />
              Kami menantikan kedatanganmu di KIRA Café & Bistro.
            </p>
            <div style={{ marginTop: 20, padding: "16px 24px", background: "rgba(68,102,74,0.08)", borderRadius: 12 }}>
              <p style={{ color: "#44664a", fontWeight: 600, fontSize: 14 }}>
                {form.tanggal} · {form.waktu} · {form.tamu} tamu
              </p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-playfair" style={{ fontSize: 28, fontWeight: 700, color: "#1c1b1b", marginBottom: 6 }}>
              Reservasi Meja
            </h3>
            <p style={{ color: "#7b766e", fontSize: 15, marginBottom: 28 }}>
              Pesan mejamu sekarang dan nikmati pengalaman KIRA yang tak terlupakan.
            </p>
            <form className="gsap-modal-field" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label className="form-label">Nama Lengkap</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="form-label">Nomor Telepon / WhatsApp</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+62 812 xxxx xxxx"
                  value={form.telepon}
                  onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label className="form-label">Tanggal</label>
                  <input
                    className="form-input"
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Waktu</label>
                  <select
                    className="form-input"
                    value={form.waktu}
                    onChange={(e) => setForm({ ...form, waktu: e.target.value })}
                    required
                  >
                    <option value="">Pilih jam</option>
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>13:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Jumlah Tamu</label>
                <select
                  className="form-input"
                  value={form.tamu}
                  onChange={(e) => setForm({ ...form, tamu: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Catatan Khusus (Opsional)</label>
                <textarea
                  className="form-input"
                  placeholder="Misalnya: kursi dekat jendela, perayaan ulang tahun, dll."
                  rows={3}
                  value={form.catatan}
                  onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                  style={{ resize: "none" }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: 4 }}>
                Konfirmasi Reservasi
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const menuItems = [
  {
    img: IMAGES.coffee,
    name: "Signature Coffee",
    price: "Rp 35k",
    desc: "Espresso base pilihan dengan latte art artisan.",
    tag: "Bestseller",
    detail: "Dibuat dari biji kopi single origin Flores dengan profil rasa cokelat gelap dan sedikit buah. Sajian espresso kami diolah dengan mesin La Marzocco dan disempurnakan dengan susu mikro-foam bertemperatur sempurna.",
  },
  {
    img: IMAGES.breakfast,
    name: "All-Day Breakfast",
    price: "Rp 45k",
    desc: "Avocado toast dengan telur apung dan sayuran lokal segar.",
    tag: "Chef's Pick",
    detail: "Sourdough panggang dari bakeri lokal, disajikan dengan alpukat haas organik yang dilumatkan, dua butir telur poached, microgreen, dan taburan biji labu. Pilihan makan siang yang mengenyangkan sekaligus bergizi.",
  },
  {
    img: IMAGES.brunch,
    name: "Weekend Brunch",
    price: "Rp 55k",
    desc: "Pancake lembut dengan buah tropis dan sirup maple.",
    tag: "Weekend Only",
    detail: "Tiga lapis pancake buttermilk fluffy disajikan dengan kompote mangga-nanas segar, krim mascarpone ringan, dan sirup maple impor asli Kanada. Tersedia setiap Sabtu dan Minggu mulai pukul 09.00.",
  },
];

function MenuCard({ item, onOrder }: { item: typeof menuItems[0]; onOrder: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="menu-card gsap-menu-card" onClick={() => setExpanded(!expanded)}>
      <div style={{ position: "relative", height: 256, overflow: "hidden" }}>
        <img className="card-img" src={item.img} alt={item.name} />
        <div style={{
          position: "absolute",
          top: 16,
          left: 16,
        }}>
          <span className="tag-badge">{item.tag}</span>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 className="font-playfair" style={{ fontSize: 22, fontWeight: 600, color: "#1c1b1b" }}>{item.name}</h3>
          <span style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: "#44664a", letterSpacing: "0.05em", flexShrink: 0, marginLeft: 12 }}>{item.price}</span>
        </div>
        <p style={{ fontFamily: "Inter", fontSize: 15, color: "#4a463f", lineHeight: 1.6, marginBottom: expanded ? 16 : 0 }}>{item.desc}</p>
        {expanded && (
          <div style={{ borderTop: "1px solid #e6e2e0", paddingTop: 16, marginTop: 4 }}>
            <p style={{ fontFamily: "Inter", fontSize: 14, color: "#7b766e", lineHeight: 1.7, marginBottom: 16 }}>{item.detail}</p>
            <button
              className="btn-primary"
              style={{ width: "100%", fontSize: 13 }}
              onClick={(e) => { e.stopPropagation(); onOrder(); }}
            >
              Pesan Sekarang
            </button>
          </div>
        )}
        <p style={{ fontFamily: "Inter", fontSize: 12, color: "#aaa", marginTop: expanded ? 12 : 8 }}>
          {expanded ? "Klik untuk tutup ↑" : "Klik untuk lihat detail ↓"}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservasiOpen, setReservasiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const showToast = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, message });
    toastTimer.current = setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  useGsapCleanup();

  useEffect(() => {
    const tl = animateHero();
    animateMenu();
    animateSuasana();
    animateInfoCards();
    animateLokasi();
    animateKisah();
    animateCta();
    animateParallaxHero();
    animateNavbar();
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (section: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => scrollToSection(section), mobileMenuOpen ? 350 : 0);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fdf8f7" }}>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay${mobileMenuOpen ? " open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(253,248,247,0.1)",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            color: "#fdf8f7",
            cursor: "pointer",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
        <div style={{ marginBottom: 32 }}>
          <span className="font-playfair" style={{ fontSize: 28, fontWeight: 700, color: "#fdf8f7" }}>KIRA</span>
        </div>
        {["menu", "suasana", "lokasi", "kisah"].map((s) => (
          <a
            key={s}
            className="mobile-nav-link"
            href={`#${s}`}
            onClick={(e) => { e.preventDefault(); handleNavClick(s); }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
        <button
          className="btn-primary"
          style={{ marginTop: 32, width: "100%" }}
          onClick={() => { setMobileMenuOpen(false); setReservasiOpen(true); }}
        >
          Reservasi Meja
        </button>
      </div>

      {/* Navbar */}
      <header className="gsap-navbar" style={{
        background: scrolled ? "rgba(28, 27, 27, 0.97)" : "rgba(28, 27, 27, 0.90)",
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        height: 68,
        transition: "all 0.3s ease",
      }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-playfair"
          style={{ fontSize: 24, fontWeight: 700, color: "#fdf8f7", textDecoration: "none", letterSpacing: "0.02em" }}
        >
          KIRA
        </a>
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
          {[
            { id: "menu", label: "Menu" },
            { id: "suasana", label: "Suasana" },
            { id: "lokasi", label: "Lokasi" },
            { id: "kisah", label: "Kisah" },
          ].map((item) => (
            <a
              key={item.id}
              className="nav-link"
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            className="btn-primary hidden-mobile"
            style={{ padding: "10px 24px", fontSize: 13 }}
            onClick={() => setReservasiOpen(true)}
          >
            Reservasi Meja
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="show-mobile"
            style={{
              background: "none",
              border: "none",
              color: "#fdf8f7",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Buka menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="gsap-hero-bg" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src={IMAGES.hero}
            alt="KIRA Café interior"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(28, 27, 27, 0.62)" }} />
        </div>
        <div style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 20px",
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <div className="tag-badge" style={{ marginBottom: 24, background: "rgba(198, 236, 200, 0.15)", color: "#c6ecc8", border: "1px solid rgba(198,236,200,0.3)" }}>
            Yogyakarta · Jl. Prawirotaman
          </div>
          <h1
            className="font-playfair gsap-hero-title"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: "1.15",
              fontWeight: 700,
              color: "#fdf8f7",
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            Tempat di Mana<br />Setiap Tegukan Punya Cerita
          </h1>
          <p className="gsap-hero-subtitle" style={{
            fontFamily: "Inter",
            fontSize: "clamp(16px, 2vw, 18px)",
            lineHeight: 1.7,
            color: "#ebe7e6",
            marginBottom: 40,
            maxWidth: 600,
          }}>
            Nikmati perpaduan harmoni kopi specialty dan hidangan artisan dalam suasana hangat khas Nordik di jantung Yogyakarta.
          </p>
          <div className="gsap-hero-cta" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              className="btn-outline"
              href="#menu"
              onClick={(e) => { e.preventDefault(); scrollToSection("menu"); }}
            >
              Lihat Menu
            </a>
            <button
              className="btn-primary"
              onClick={() => setReservasiOpen(true)}
            >
              Reservasi Meja
            </button>
          </div>
        </div>
        <button
          className="scroll-indicator gsap-scroll-indicator"
          onClick={() => scrollToSection("menu")}
          aria-label="Scroll ke bawah"
        >
          <span style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(253,248,247,0.6)" }}>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(253,248,247,0.6)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </section>

      {/* Menu Section */}
      <section id="menu" style={{ padding: "96px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="gsap-section-heading" style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: "#44664a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Pilihan Terbaik</p>
          <h2 className="section-title">Cita Rasa Pilihan</h2>
          <div className="section-divider" />
          <p style={{ fontFamily: "Inter", fontSize: 16, color: "#7b766e", marginTop: 20, maxWidth: 480, margin: "20px auto 0" }}>
            Klik setiap menu untuk melihat detail dan memesan langsung.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {menuItems.map((item) => (
            <MenuCard key={item.name} item={item} onOrder={() => setReservasiOpen(true)} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            className="btn-primary"
            style={{ background: "transparent", color: "#44664a", border: "2px solid #44664a", boxShadow: "none" }}
            onClick={() => showToast("Menu lengkap segera tersedia!")}
          >
            Lihat Menu Lengkap →
          </button>
        </div>
      </section>

      {/* Suasana Section */}
      <section id="suasana" style={{ background: "#f1edeb", padding: "96px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: "#44664a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Galeri</p>
            <h2 className="section-title">Suasana KIRA</h2>
            <div className="section-divider" />
            <p style={{ fontFamily: "Inter", fontSize: 16, color: "#7b766e", marginTop: 20, maxWidth: 480, margin: "20px auto 0" }}>
              Ruang yang hangat, minimalis, dan penuh detail yang terasa seperti rumah sendiri.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "auto", gap: 16 }}>
            <div className="atmosphere-img gsap-gallery-img" style={{ gridRow: "1 / 3", height: 480 }}>
              <img src={IMAGES.suasana1} alt="Suasana KIRA 1" />
            </div>
            <div className="atmosphere-img gsap-gallery-img" style={{ height: 228 }}>
              <img src={IMAGES.suasana2} alt="Suasana KIRA 2" />
            </div>
            <div className="atmosphere-img gsap-gallery-img" style={{ height: 228 }}>
              <img src={IMAGES.suasana3} alt="Suasana KIRA 3" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { icon: "☕", label: "Specialty Coffee", desc: "Biji kopi single origin pilihan dari penjuru nusantara" },
              { icon: "🌿", label: "Bahan Lokal", desc: "Bermitra dengan petani lokal Yogyakarta dan sekitarnya" },
              { icon: "🏡", label: "Suasana Nordik", desc: "Interior hangat dengan sentuhan kayu dan tanaman hijau" },
            ].map((f) => (
              <div key={f.label} className="info-card gsap-info-card" style={{ flex: "1 1 250px" }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>{f.icon}</span>
                <h4 className="font-playfair" style={{ fontSize: 18, fontWeight: 600, color: "#1c1b1b", marginBottom: 8 }}>{f.label}</h4>
                <p style={{ fontFamily: "Inter", fontSize: 14, color: "#7b766e", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi Section */}
      <section id="lokasi" style={{ padding: "96px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: "#44664a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Temukan Kami</p>
            <h2 className="section-title" style={{ textAlign: "left" }}>Lokasi &amp; Jam Buka</h2>
            <div style={{ width: 64, height: 4, background: "#44664a", borderRadius: 2, margin: "16px 0 32px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#44664a" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  ),
                  title: "Alamat",
                  content: "Jl. Prawirotaman II No. 17\nMantrijeron, Yogyakarta 55143",
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#44664a" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  ),
                  title: "Jam Operasional",
                  content: "Senin – Jumat: 08.00 – 22.00\nSabtu – Minggu: 07.00 – 23.00",
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#44664a" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  title: "Hubungi Kami",
                  content: "+62 812-3456-7890\nkira@kira.coffee",
                },
              ].map((item) => (
                <div key={item.title} className="gsap-lokasi-item" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(68,102,74,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: "#44664a", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>{item.title}</p>
                    {item.content.split("\n").map((line, i) => (
                      <p key={i} style={{ fontFamily: "Inter", fontSize: 15, color: "#4a463f", lineHeight: 1.7 }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                onClick={() => window.open("https://maps.google.com/?q=Prawirotaman+Yogyakarta", "_blank")}
              >
                Buka di Google Maps
              </button>
              <button
                className="btn-primary"
                style={{ background: "transparent", color: "#44664a", border: "2px solid #44664a", boxShadow: "none" }}
                onClick={() => showToast("Membuka WhatsApp...")}
              >
                Chat WhatsApp
              </button>
            </div>
          </div>
          <div>
            <div className="gsap-lokasi-map" style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #e6e2e0",
              boxShadow: "0 12px 40px -8px rgba(44,24,16,0.12)",
            }}>
              <iframe
                title="Lokasi KIRA Café"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.1766076785266!2d110.35747931477277!3d-7.832282794394857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a579d3e9a2155%3A0x1d9a0b3b73e7b3a9!2sPrawirotaman%2C%20Yogyakarta!5e0!3m2!1sen!2sid!4v1672300000000!5m2!1sen!2sid"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kisah Section */}
      <section id="kisah" style={{ background: "#1c1b1b", padding: "96px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          <div className="gsap-kisah-img" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px -12px rgba(0,0,0,0.5)" }}>
            <img
              src={IMAGES.kisah}
              alt="Kisah KIRA"
              style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
            />
          </div>
          <div>
            <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: "#aad0ad", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Tentang Kami</p>
            <h2 className="font-playfair" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: "#fdf8f7", lineHeight: 1.2, marginBottom: 24 }}>
              Kisah di Balik<br />Setiap Cangkir
            </h2>
            <div className="gsap-kisah-text" style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              {[
                "KIRA lahir dari kecintaan mendalam terhadap kopi dan kehangatan. Berdiri sejak 2019, kami percaya setiap cangkir kopi adalah kesempatan untuk menciptakan momen berharga.",
                "Nama KIRA terinspirasi dari kata Jawa kuno yang berarti \"rasa\" — karena di sini, kami merayakan setiap rasa, dari pahitnya espresso hingga manisnya kenangan bersama.",
                "Kami bermitra langsung dengan petani kopi dari Flores, Aceh Gayo, dan Toraja untuk memastikan setiap biji yang kami gunakan dipetik dengan penuh perhatian.",
              ].map((text, i) => (
                <p key={i} style={{ fontFamily: "Inter", fontSize: 15, color: "#ebe7e6", lineHeight: 1.8 }}>
                  {text}
                </p>
              ))}
            </div>
            <div className="gsap-kisah-stat" style={{ display: "flex", gap: 32, marginBottom: 40 }}>
              {[
                { num: "5+", label: "Tahun Berdiri" },
                { num: "12k+", label: "Pelanggan Setia" },
                { num: "3", label: "Mitra Petani" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-playfair" style={{ fontSize: 32, fontWeight: 700, color: "#c6ecc8", lineHeight: 1 }}>{stat.num}</p>
                  <p style={{ fontFamily: "Inter", fontSize: 13, color: "#aaa", marginTop: 4 }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <button
              className="btn-primary"
              onClick={() => setReservasiOpen(true)}
            >
              Kunjungi Kami
            </button>
          </div>
        </div>
      </section>

      {/* Reservasi CTA Section */}
      <section id="reservasi" className="gsap-cta-content" style={{ background: "#44664a", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 className="font-playfair" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#fdf8f7", marginBottom: 16 }}>
            Siap Mengunjungi KIRA?
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: 17, color: "rgba(253,248,247,0.85)", lineHeight: 1.7, marginBottom: 36 }}>
            Pesan mejamu sekarang dan nikmati pengalaman kopi terbaik di Yogyakarta. Reservasi mudah, tanpa antri.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                background: "#fdf8f7",
                color: "#44664a",
                padding: "14px 36px",
                borderRadius: 9999,
                fontFamily: "Inter",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.05em",
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
              onClick={() => setReservasiOpen(true)}
            >
              Reservasi Sekarang
            </button>
            <button
              style={{
                background: "transparent",
                color: "#fdf8f7",
                padding: "14px 36px",
                borderRadius: 9999,
                fontFamily: "Inter",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.05em",
                cursor: "pointer",
                border: "2px solid rgba(253,248,247,0.7)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#fdf8f7"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(253,248,247,0.1)"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(253,248,247,0.7)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              onClick={() => showToast("Membuka WhatsApp KIRA...")}
            >
              Chat WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#1c1b1b",
        padding: "48px 20px 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 48 }}>
            <div>
              <span className="font-playfair" style={{ fontSize: 28, fontWeight: 700, color: "#fdf8f7", display: "block", marginBottom: 16 }}>KIRA</span>
              <p style={{ fontFamily: "Inter", fontSize: 14, color: "#7b766e", lineHeight: 1.8 }}>
                Specialty coffee & artisan bistro di jantung Yogyakarta. Setiap tegukan, satu cerita.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {[
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "WhatsApp", href: "https://wa.me/6281234567890" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "Inter",
                      fontSize: 13,
                      color: "#7b766e",
                      textDecoration: "none",
                      padding: "6px 14px",
                      border: "1px solid rgba(253,248,247,0.1)",
                      borderRadius: 8,
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fdf8f7"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(253,248,247,0.25)"; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#7b766e"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(253,248,247,0.1)"; }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#fdf8f7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>Navigasi</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { id: "menu", label: "Menu Kami" },
                  { id: "suasana", label: "Suasana" },
                  { id: "lokasi", label: "Lokasi" },
                  { id: "kisah", label: "Kisah Kami" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                    style={{
                      fontFamily: "Inter",
                      fontSize: 14,
                      color: "#7b766e",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fdf8f7"; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#7b766e"; }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#fdf8f7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>Jam Buka</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontFamily: "Inter", fontSize: 14, color: "#7b766e" }}>Senin – Jumat</p>
                <p style={{ fontFamily: "Inter", fontSize: 14, color: "#aaa" }}>08.00 – 22.00 WIB</p>
                <p style={{ fontFamily: "Inter", fontSize: 14, color: "#7b766e", marginTop: 8 }}>Sabtu – Minggu</p>
                <p style={{ fontFamily: "Inter", fontSize: 14, color: "#aaa" }}>07.00 – 23.00 WIB</p>
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: 24, padding: "10px 20px", fontSize: 13 }}
                onClick={() => setReservasiOpen(true)}
              >
                Buat Reservasi
              </button>
            </div>
          </div>
          <div style={{
            borderTop: "1px solid rgba(253,248,247,0.08)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}>
            <p style={{ fontFamily: "Inter", fontSize: 13, color: "#4a463f" }}>
              © 2024 KIRA Café & Bistro. Crafted with ♥ in Yogyakarta.
            </p>
            <a
              href="https://maps.google.com/?q=Prawirotaman+Yogyakarta"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "Inter",
                fontSize: 13,
                color: "#4a463f",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#7b766e"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#4a463f"; }}
            >
              Jl. Prawirotaman II No. 17, Yogyakarta
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {reservasiOpen && <ReservasiModal onClose={() => setReservasiOpen(false)} />}
      <Toast message={toast.message} visible={toast.visible} />

      {/* Responsive styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap');
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  BookOpen, Shield, Star, Heart, ChevronRight, ChevronLeft,
  CheckCircle, FileText, Edit3, Award, Send, Menu, X,
  Feather, Users, Globe, ArrowRight
} from "lucide-react";

const GOLD = "#B8962E";
const GOLD_LIGHT = "#D4AF5A";
const IVORY = "#FFFDF5";
const CHARCOAL = "#333333";
const CHARCOAL_LIGHT = "#555555";
const PARCHMENT = "#F5F0E8";
const BORDER = "#E8E0CC";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

function useScrollInView(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

const BOOKS = [
  {
    title: "The Alchemist's Daughter",
    author: "Miriam Ashford",
    genre: "Historical Fantasy",
    rating: "5/5 Clean",
    color: "#7B5E3A",
    accent: "#C9A96E",
    blurb: "In 1847 Prague, a young woman inherits her father's forbidden laboratory and must choose between power and the people she loves. A luminous story of courage and conviction.",
  },
  {
    title: "Starlight Over Summit",
    author: "Elliot Crane",
    genre: "Contemporary Fiction",
    rating: "5/5 Clean",
    color: "#2D4A6B",
    accent: "#7BAAD4",
    blurb: "Two strangers stranded on a mountain discover that the most treacherous terrain isn't the slope beneath their feet. A breathtaking story of hope and human connection.",
  },
  {
    title: "The Cartographer's Code",
    author: "Priya Nair",
    genre: "Adventure Mystery",
    rating: "5/5 Clean",
    color: "#3D5A3E",
    accent: "#8BBF8C",
    blurb: "A missing atlas. A coded message. A cartographer's apprentice who must cross three continents before the truth is erased forever. Rich, thrilling, and deeply humane.",
  },
  {
    title: "Letters from Thornfield",
    author: "Charlotte Hensley",
    genre: "Literary Romance",
    rating: "5/5 Clean",
    color: "#6B3D5A",
    accent: "#C47FA8",
    blurb: "Spanning four decades of correspondence between neighbors who never meet face-to-face, this is a quietly devastating portrait of love, patience, and what we leave unsaid.",
  },
  {
    title: "The Keeper of Small Things",
    author: "James Osei",
    genre: "Family Drama",
    rating: "5/5 Clean",
    color: "#5A4A2D",
    accent: "#C4A46E",
    blurb: "After his father's passing, a son sorts through a lifetime of keepsakes and finds a story far grander than he ever imagined. Tender, elegiac, and quietly triumphant.",
  },
  {
    title: "A Sky Full of Lanterns",
    author: "Mei-Ling Zhao",
    genre: "Coming of Age",
    rating: "5/5 Clean",
    color: "#6B4E2D",
    accent: "#E8A85C",
    blurb: "A teenage girl navigating her family's immigration journey discovers that home is not a place but a thread woven through every generation. Vibrant, joyful, and essential.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Finally, a publisher that cares about the heart of the story. ClearStream didn't just publish my book — they championed its soul.",
    name: "Miriam Ashford",
    title: "Author, The Alchemist's Daughter",
    initials: "MA",
  },
  {
    quote: "I spent years searching for a home for my work. The moment I submitted to ClearStream, I knew I'd found it. They understood exactly what I was trying to say.",
    name: "Elliot Crane",
    title: "Author, Starlight Over Summit",
    initials: "EC",
  },
  {
    quote: "Working with the editorial team was a revelation. Their notes made my manuscript better without ever compromising my voice or my values.",
    name: "Priya Nair",
    title: "Author, The Cartographer's Code",
    initials: "PN",
  },
  {
    quote: "ClearStream proved that you don't need shock value to tell a story that moves people to tears. My readers have never been more grateful.",
    name: "James Osei",
    title: "Author, The Keeper of Small Things",
    initials: "JO",
  },
];

const STEPS = [
  { icon: FileText, label: "Submission", desc: "Submit your manuscript via our secure portal with a brief synopsis and author bio." },
  { icon: Edit3, label: "Editorial Review", desc: "Our senior editors evaluate fit, voice, and adherence to our Clean Fiction standards." },
  { icon: Users, label: "Author Consult", desc: "A dedicated editor partners with you for developmental notes and manuscript refinement." },
  { icon: CheckCircle, label: "Final Approval", desc: "Once polished, your manuscript enters our production pipeline for design and layout." },
  { icon: Globe, label: "Publication", desc: "Your book launches across print and digital channels with our full marketing support." },
];

const STANDARDS = [
  { icon: Shield, title: "Zero Profanity", desc: "Our catalog maintains the highest standards of language. Every word earns its place." },
  { icon: Heart, title: "No Explicit Content", desc: "Romantic and mature themes are handled with craft and tasteful restraint." },
  { icon: Star, title: "Narrative Depth", desc: "We believe the most powerful stories are built on character, consequence, and truth." },
  { icon: Award, title: "Editorial Excellence", desc: "Every manuscript receives intensive, professional editorial care from our senior team." },
  { icon: BookOpen, title: "Clean Rating System", desc: "All published works receive a verified Clean Rating visible to readers and retailers." },
  { icon: Feather, title: "Author Partnership", desc: "We view every author relationship as a long-term creative partnership, not a transaction." },
];

const GENRES = ["Literary Fiction", "Historical Fiction", "Fantasy", "Mystery & Thriller", "Romance", "Young Adult", "Children's Literature", "Science Fiction", "Memoir", "Other"];

function NavBar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,253,245,0.97)" : "transparent",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5vw",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
            <BookOpen size={18} color={IVORY} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: CHARCOAL, letterSpacing: "0.02em" }}>
            ClearStream Press
          </span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="nav-desktop">
          {["Our Standards", "Catalog", "Authors", "Submit"].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: CHARCOAL_LIGHT, textDecoration: "none", letterSpacing: "0.04em", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = GOLD}
              onMouseLeave={e => e.target.style.color = CHARCOAL_LIGHT}
            >{link}</a>
          ))}
          <a href="#submit" style={{
            background: GOLD, color: IVORY, padding: "9px 22px", borderRadius: 2,
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
            textDecoration: "none", textTransform: "uppercase", transition: "background 0.2s"
          }}
            onMouseEnter={e => e.target.style.background = GOLD_LIGHT}
            onMouseLeave={e => e.target.style.background = GOLD}
          >Submit</a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile"
          style={{ background: "none", border: "none", cursor: "pointer", color: CHARCOAL, padding: 8 }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section style={{
      minHeight: "100vh", background: IVORY,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      paddingTop: 70,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 79px, ${BORDER}40 80px),
          repeating-linear-gradient(90deg, transparent, transparent 79px, ${BORDER}40 80px)
        `,
        backgroundSize: "80px 80px",
      }} />
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 320, height: 320, borderRadius: "50%", background: `${GOLD}08`, border: `1px solid ${GOLD}20` }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 180, height: 180, borderRadius: "50%", background: `${GOLD}06`, border: `1px solid ${GOLD}15` }} />

      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", padding: "0 5vw", position: "relative", zIndex: 1 }}>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} custom={0} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "6px 18px", border: `1px solid ${GOLD}60`, borderRadius: 2 }}>
            <div style={{ width: 6, height: 6, background: GOLD, borderRadius: "50%" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>Premier Clean Fiction Publisher</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 700,
            color: CHARCOAL, lineHeight: 1.08, marginBottom: 28,
            letterSpacing: "-0.02em"
          }}>
            Where Wholesome<br />
            <span style={{ color: GOLD, fontStyle: "italic" }}>Meets World-Class.</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 18, color: CHARCOAL_LIGHT,
            lineHeight: 1.75, maxWidth: 580, margin: "0 auto 44px",
            fontWeight: 400
          }}>
            ClearStream Press is the gold standard for wholesome, high-quality storytelling — where narrative depth, human truth, and uncompromising craft come together.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#submit" style={{
              background: GOLD, color: IVORY,
              padding: "16px 40px", borderRadius: 2,
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
              display: "flex", alignItems: "center", gap: 10,
              transition: "all 0.25s ease",
              boxShadow: `0 4px 24px ${GOLD}30`,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = CHARCOAL; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Submit Your Manuscript <ArrowRight size={16} />
            </a>
            <a href="#catalog" style={{
              background: "transparent", color: CHARCOAL,
              padding: "16px 40px", borderRadius: 2,
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
              border: `1px solid ${BORDER}`,
              transition: "all 0.25s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CHARCOAL; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              View Our Catalog
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} style={{ marginTop: 72, display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {[["240+", "Published Titles"], ["98%", "Author Retention"], ["4.9★", "Reader Rating"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: CHARCOAL, lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: CHARCOAL_LIGHT, marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Standards() {
  const [ref, inView] = useScrollInView();
  return (
    <section id="our-standards" ref={ref} style={{ background: CHARCOAL, padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 18px", border: `1px solid ${GOLD}50`, borderRadius: 2 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>Our Commitment</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: IVORY, lineHeight: 1.15, marginBottom: 20 }}>
              The ClearStream Standard
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "#AAAAA0", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Every book in our catalog is held to the same exacting criteria — because readers deserve stories they can trust.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: "#444" }}>
            {STANDARDS.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i}
                style={{
                  background: "#2A2A2A", padding: "40px 36px",
                  transition: "background 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#303030"}
                onMouseLeave={e => e.currentTarget.style.background = "#2A2A2A"}
              >
                <div style={{ width: 48, height: 48, background: `${GOLD}18`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <s.icon size={22} color={GOLD} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: IVORY, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#888880", lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BookCard({ book, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp} custom={i}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "pointer", borderRadius: 2, overflow: "hidden" }}
    >
      <div style={{
        background: book.color,
        height: 280,
        display: "flex", alignItems: "flex-end",
        padding: "24px 24px 22px",
        position: "relative",
        transition: "transform 0.4s ease",
        transform: hovered ? "scale(1.02)" : "scale(1)",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)` }} />
        <div style={{ position: "absolute", top: 20, right: 20, width: 50, height: 50, borderRadius: "50%", border: `2px solid ${book.accent}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BookOpen size={20} color={book.accent} />
        </div>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: book.accent, marginBottom: 6, fontWeight: 600 }}>{book.genre}</div>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2 }}>{book.title}</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: `${book.accent}CC`, marginTop: 6 }}>{book.author}</p>
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(160deg, ${book.color}F0, ${book.color}FA)`,
              backdropFilter: "blur(2px)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "28px 28px",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16,
              background: `${GOLD}25`, border: `1px solid ${GOLD}60`, borderRadius: 20,
              padding: "4px 12px", width: "fit-content"
            }}>
              <Star size={11} color={GOLD} fill={GOLD} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.08em" }}>{book.rating}</span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 12, lineHeight: 1.2 }}>{book.title}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>{book.blurb}</p>
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: book.accent, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>
              Read More <ArrowRight size={14} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Catalog() {
  const [ref, inView] = useScrollInView();
  return (
    <section id="catalog" ref={ref} style={{ background: PARCHMENT, padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 18px", border: `1px solid ${GOLD}60`, borderRadius: 2 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>Featured Titles</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: CHARCOAL, lineHeight: 1.15, marginBottom: 20 }}>
              The ClearStream Catalog
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: CHARCOAL_LIGHT, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Hover over any title to reveal its Clean Rating and story blurb. Every book, a promise kept.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {BOOKS.map((book, i) => <BookCard key={book.title} book={book} i={i} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useScrollInView();

  useEffect(() => {
    const interval = setInterval(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="authors" ref={ref} style={{ background: IVORY, padding: "100px 5vw", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 18px", border: `1px solid ${GOLD}60`, borderRadius: 2 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>Author Voices</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: CHARCOAL, lineHeight: 1.15 }}>
              Words from Our Authors
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
            <div style={{ fontSize: 120, color: `${GOLD}20`, fontFamily: "Georgia, serif", lineHeight: 0.7, marginBottom: 8, textAlign: "left", paddingLeft: 8 }}>"</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: "center", padding: "0 24px" }}
              >
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(20px, 2.5vw, 28px)", fontStyle: "italic",
                  color: CHARCOAL, lineHeight: 1.55, marginBottom: 36,
                }}>
                  {TESTIMONIALS[current].quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: GOLD, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: IVORY
                  }}>
                    {TESTIMONIALS[current].initials}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: CHARCOAL }}>{TESTIMONIALS[current].name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: CHARCOAL_LIGHT }}>{TESTIMONIALS[current].title}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 44 }}>
              <button onClick={() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 2, width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: CHARCOAL_LIGHT, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = CHARCOAL_LIGHT; }}
              ><ChevronLeft size={18} /></button>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? GOLD : BORDER, border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
              <button onClick={() => setCurrent(c => (c + 1) % TESTIMONIALS.length)}
                style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 2, width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: CHARCOAL_LIGHT, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = CHARCOAL_LIGHT; }}
              ><ChevronRight size={18} /></button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Roadmap() {
  const [ref, inView] = useScrollInView();
  return (
    <section style={{ background: PARCHMENT, padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} ref={ref}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 18px", border: `1px solid ${GOLD}60`, borderRadius: 2 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>The Process</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: CHARCOAL, lineHeight: 1.15 }}>
              Your Submission Roadmap
            </h2>
          </motion.div>

          <div style={{ display: "flex", gap: 0, position: "relative", flexWrap: "wrap", justifyContent: "center" }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.label} variants={fadeUp} custom={i}
                style={{ flex: "1 1 180px", maxWidth: 220, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 16px", position: "relative" }}
              >
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: "absolute", top: 28, left: "calc(50% + 28px)", right: "calc(-50% + 28px)",
                    height: 1, background: `linear-gradient(90deg, ${GOLD}60, ${GOLD}20)`,
                    zIndex: 0
                  }} />
                )}
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: IVORY, border: `2px solid ${GOLD}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, position: "relative", zIndex: 1,
                  boxShadow: `0 0 0 6px ${PARCHMENT}, 0 0 0 7px ${GOLD}20`,
                }}>
                  <step.icon size={22} color={GOLD} />
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 8, fontWeight: 700 }}>Step {i + 1}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: CHARCOAL, marginBottom: 10 }}>{step.label}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: CHARCOAL_LIGHT, lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SubmissionForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: "", genre: "", wordCount: "", synopsis: "", firstName: "", lastName: "", email: "", bio: "", agreement: false });
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useScrollInView();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    fontFamily: "'Inter', sans-serif", fontSize: 14,
    border: `1px solid ${BORDER}`, borderRadius: 2,
    background: IVORY, color: CHARCOAL,
    outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", fontFamily: "'Inter', sans-serif",
    fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase", color: CHARCOAL_LIGHT, marginBottom: 8
  };

  if (submitted) {
    return (
      <section id="submit" ref={ref} style={{ background: CHARCOAL, padding: "100px 5vw" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `${GOLD}20`, border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
              <CheckCircle size={36} color={GOLD} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, color: IVORY, marginBottom: 16 }}>Submission Received</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "#AAAAA0", lineHeight: 1.7, marginBottom: 32 }}>
              Thank you for entrusting your manuscript to ClearStream Press. Our editorial team will review your submission and respond within 8–12 weeks.
            </p>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ title: "", genre: "", wordCount: "", synopsis: "", firstName: "", lastName: "", email: "", bio: "", agreement: false }); }}
              style={{ background: GOLD, color: IVORY, padding: "13px 32px", border: "none", borderRadius: 2, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>
              Submit Another
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="submit" ref={ref} style={{ background: CHARCOAL, padding: "100px 5vw" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 18px", border: `1px solid ${GOLD}50`, borderRadius: 2 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>Open Submissions</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: IVORY, lineHeight: 1.15, marginBottom: 16 }}>
              Submit Your Manuscript
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#AAAAA0", lineHeight: 1.7 }}>
              We review every submission with care. Please allow 8–12 weeks for a response.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ background: "#2A2A2A", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: `1px solid #3A3A3A` }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{
                  flex: 1, padding: "18px 0", textAlign: "center",
                  background: step === s ? "#333" : "transparent",
                  borderBottom: step === s ? `2px solid ${GOLD}` : "2px solid transparent",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onClick={() => s < step && setStep(s)}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: step === s ? GOLD : "#666" }}>
                    {s === 1 ? "Manuscript" : s === 2 ? "About You" : "Review"}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: "44px 44px" }}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                      <div>
                        <label style={labelStyle}>Manuscript Title *</label>
                        <input value={form.title} onChange={e => update("title", e.target.value)} placeholder="Enter your title" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER} />
                      </div>
                      <div>
                        <label style={labelStyle}>Genre *</label>
                        <select value={form.genre} onChange={e => update("genre", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}
                          onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER}>
                          <option value="">Select a genre</option>
                          {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <label style={labelStyle}>Word Count *</label>
                      <input value={form.wordCount} onChange={e => update("wordCount", e.target.value)} placeholder="e.g., 82,000" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER} />
                    </div>
                    <div style={{ marginBottom: 32 }}>
                      <label style={labelStyle}>Brief Synopsis *</label>
                      <textarea value={form.synopsis} onChange={e => update("synopsis", e.target.value)} rows={5} placeholder="A compelling summary of your manuscript (250–500 words recommended)" style={{ ...inputStyle, resize: "vertical", fontFamily: "'Inter', sans-serif" }}
                        onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER} />
                    </div>
                    <button onClick={() => setStep(2)} disabled={!form.title || !form.genre || !form.wordCount || !form.synopsis}
                      style={{ background: GOLD, color: IVORY, padding: "14px 36px", border: "none", borderRadius: 2, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, opacity: (!form.title || !form.genre || !form.wordCount || !form.synopsis) ? 0.5 : 1 }}>
                      Next Step <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                      <div>
                        <label style={labelStyle}>First Name *</label>
                        <input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Jane" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER} />
                      </div>
                      <div>
                        <label style={labelStyle}>Last Name *</label>
                        <input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Austen" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER} />
                    </div>
                    <div style={{ marginBottom: 32 }}>
                      <label style={labelStyle}>Author Bio *</label>
                      <textarea value={form.bio} onChange={e => update("bio", e.target.value)} rows={5} placeholder="Tell us about yourself, your writing background, and any previously published work." style={{ ...inputStyle, resize: "vertical", fontFamily: "'Inter', sans-serif" }}
                        onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = BORDER} />
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setStep(1)} style={{ background: "none", color: "#888", padding: "14px 24px", border: `1px solid #444`, borderRadius: 2, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>Back</button>
                      <button onClick={() => setStep(3)} disabled={!form.firstName || !form.lastName || !form.email || !form.bio}
                        style={{ background: GOLD, color: IVORY, padding: "14px 36px", border: "none", borderRadius: 2, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, opacity: (!form.firstName || !form.lastName || !form.email || !form.bio) ? 0.5 : 1 }}>
                        Review Submission <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                    <div style={{ marginBottom: 28 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: IVORY, marginBottom: 20 }}>Review Your Submission</h3>
                      {[
                        ["Title", form.title], ["Genre", form.genre], ["Word Count", form.wordCount],
                        ["Author", `${form.firstName} ${form.lastName}`], ["Email", form.email],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #383838" }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{k}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: IVORY }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 32, cursor: "pointer" }}>
                      <input type="checkbox" checked={form.agreement} onChange={e => update("agreement", e.target.checked)} style={{ marginTop: 2, accentColor: GOLD, width: 16, height: 16 }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.6 }}>
                        I confirm this manuscript adheres to ClearStream Press content guidelines: no profanity, no explicit content, and no glorification of harmful behaviors.
                      </span>
                    </label>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setStep(2)} style={{ background: "none", color: "#888", padding: "14px 24px", border: `1px solid #444`, borderRadius: 2, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>Back</button>
                      <button onClick={() => setSubmitted(true)} disabled={!form.agreement}
                        style={{ background: GOLD, color: IVORY, padding: "14px 36px", border: "none", borderRadius: 2, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, opacity: !form.agreement ? 0.5 : 1, transition: "all 0.2s" }}>
                        <Send size={14} /> Submit Manuscript
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#1E1E1E", padding: "60px 5vw 36px", borderTop: `1px solid #2E2E2E` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                <BookOpen size={18} color={IVORY} />
              </div>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: IVORY }}>ClearStream Press</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#666", lineHeight: 1.7 }}>
              The gold standard for wholesome, world-class storytelling since 2008.
            </p>
          </div>
          {[
            { title: "Submissions", links: ["Guidelines", "FAQs", "Open Calls", "Agent Portal"] },
            { title: "Authors", links: ["Our Authors", "Resources", "Newsletter", "Events"] },
            { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: GOLD, marginBottom: 16 }}>{col.title}</h4>
              {col.links.map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#666", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = IVORY}
                    onMouseLeave={e => e.target.style.color = "#666"}>{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #2E2E2E", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555" }}>© 2025 ClearStream Press. All rights reserved.</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", fontStyle: "italic" }}>
            "Stories that stay with you — for all the right reasons."
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: IVORY, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${IVORY}; }
        ::selection { background: ${GOLD}30; color: ${CHARCOAL}; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>

      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: "fixed", top: 70, left: 0, right: 0, background: IVORY, zIndex: 99, padding: "20px 5vw 32px", borderBottom: `1px solid ${BORDER}`, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
            {["Our Standards", "Catalog", "Authors", "Submit"].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s/g, "-")}`} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "14px 0", fontFamily: "'Inter', sans-serif", fontSize: 16, color: CHARCOAL, textDecoration: "none", borderBottom: `1px solid ${BORDER}`, fontWeight: 500 }}>
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <Standards />
      <Catalog />
      <Testimonials />
      <Roadmap />
      <SubmissionForm />
      <Footer />
    </div>
  );
}

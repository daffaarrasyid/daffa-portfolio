# Muhammad Daffa Ar-Rasyid — Personal Studio Portfolio

Portofolio kreatif modern terinspirasi oleh estetika Clean Studio & Packaging Showcase (seperti [Nice Crate](https://nicecrate.com/)), dibangun menggunakan teknologi web termutakhir: **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, **Three.js (WebGL 3D)**, dan **Lenis Smooth Scroll**.

---

## ✨ Fitur & Arsitektur Utama

1. **Preloader (Nice Crate Inspired)**:
   - Penghitung persentase numerik cepat (`00%` → `100%`) dengan tipografi monospaced.
   - Tirai penutup (*curtain shutter*) yang meluncur ke atas dengan easing halus (`power4.inOut`), memicu kemunculan konten Hero secara sinkron.

2. **Dual Theme (Light & Dark) dengan Smooth Transition**:
   - Tema utama: **Warm Studio Light Paper** (`#f6f5f1`).
   - Opsi beralih ke: **Dark Studio Titanium** (`#0c0d10`).
   - Animasi transisi sirkular sweep (`View Transitions API` + fallback GSAP).

3. **Hero Section dengan Interactive 3D WebGL**:
   - Split-line typography reveal: *"Hello! I'm Muhammad Daffa Ar-Rasyid."*
   - Patung 3D geometris Three.js prosedural (*Torus Knot & Wireframe Orbit with Particles*) yang berputar dan melayang merespons pergerakan kursor mouse.

4. **About Me dengan Text Scrub Reveal**:
   - Teks narasi besar dua kolom ala majalah/editorial arsitektural.
   - Kata-kata menyorot dari abu-abu redup menjadi warna kontras seiring pergerakan scroll pengguna (*GSAP ScrollTrigger scrub*).
   - Kartu spesifikasi latar belakang akademis & filosofi rekayasa perangkat lunak.

5. **Experience Section dengan Rotary Dial / Compass**:
   - Terinspirasi oleh dial jarum Nice Crate: dial jam/kompas presisi di sisi kiri yang berputar (*rotating needle*) mengikuti scroll.
   - Kartu pengalaman kerja di sisi kanan yang menyorot dan terhubung dengan posisi penunjuk dial.

6. **Tech Stack dengan 3D Interactive Sphere**:
   - Tag cloud Three.js bola 3D interaktif berbasis *Fibonacci sphere lattice*.
   - User dapat menggeser/memutar (*drag to spin*) bola 3D tersebut secara bebas.
   - Filter tab detail (Web Architecture, AI & Machine Learning, Systems & Tools).

7. **Project Showcase (Filtered Archives)**:
   - Kategori filter: `All`, `Website`, `AI/ML`, dan `Mobile`.
   - Kartu preview visual bergaya studio box, indikator metrik performa, tags teknologi, serta tombol aksi ke Live Demo dan Source Code GitHub.

8. **Achievements (5+ Milestone Cards)**:
   - 6 milestone terverifikasi (Juara Hackathon AI Nasional, Peneliti/Penulis Jurnal Machine Learning, Desain UI Web Terbaik, dsb.).

9. **Contact & Colophon (Footer)**:
   - Headline CTA interaktif.
   - Tombol salin email satu klik (*instant clipboard copy*) dan direct mailto.
   - Jam lokal Jakarta (*WIB / UTC+7*) yang berdetak *real-time*.
   - Custom magnetic cursor untuk perangkat desktop.

---

## 🚀 Cara Menjalankan Proyek

Buka terminal pada direktori proyek:
```bash
cd C:\Users\Daffa\.gemini\antigravity\scratch\daffa-portfolio
```

### 1. Mode Development:
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 2. Mode Production Build:
```bash
npm run build
npm run start
```

---

## 📁 Struktur Direktori

```text
src/
├── app/
│   ├── globals.css          # CSS Variables (Light/Dark), grid pattern, utilities
│   ├── layout.tsx           # Root Layout & Metadata
│   └── page.tsx             # Main Portfolio Page Assembler
├── components/
│   ├── Preloader.tsx        # Nice Crate percentage counter & curtain slide
│   ├── Navbar.tsx           # Floating header, menu, status & theme toggle
│   ├── Hero.tsx             # Headline reveal, subtext, CTA & canvas wrapper
│   ├── HeroCanvas.tsx       # Three.js interactive 3D Torus Knot sculpture
│   ├── About.tsx            # Editorial 2-column scrub text reveal & specs
│   ├── Experience.tsx       # Rotary Chrono Dial + timeline card stack
│   ├── TechStack.tsx        # Tabs & detailed tech competencies
│   ├── TechStackCanvas.tsx  # Three.js 3D spherical tag cloud (drag to orbit)
│   ├── Projects.tsx         # Category filters (Web, AI/ML, Mobile) & cards
│   ├── Achievements.tsx     # 5+ verified awards & research ledger
│   ├── Contact.tsx          # CTA, live Jakarta clock, links & copy email
│   ├── CustomCursor.tsx     # Magnetic trailing dot & ring cursor
│   └── SmoothScroll.tsx     # Lenis smooth scroll provider + GSAP ticker
└── lib/
    └── data.ts              # Data konfigurasi profil, proyek, & pengalaman
```

---

## 🎨 Menyesuaikan Data Diri & Portofolio
Semua data teks, riwayat pengalaman, daftar proyek, pencapaian, dan tautan sosial dapat Anda ubah dengan mudah di file:
`src/lib/data.ts`

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initCodeRain();
    initTyping();
    initLenis();
    initGsap();
    initContactForm();
    initVisitorCounter();
    initFooterSocials();
    initLanguageSwitcher();
});

/* ===========================
   CUSTOM CURSOR
=========================== */
function initCursor() {
    const cursor = document.getElementById("cursor");
    const blur = document.getElementById("cursor-blur");

    if (!cursor || !blur) return;

    window.addEventListener("mousemove", (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        blur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

/* ===========================
   CODE RAIN BACKGROUND
=========================== */
function initCodeRain() {
    const canvas = document.getElementById("code-rain");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const chars = "01<>/{}[]=+-";
    let width, height, columns, drops;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / 16);
        drops = Array(columns).fill(1);
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#27c93f";
        ctx.font = "14px monospace";

        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 16, y * 16);

            if (y * 16 > height && Math.random() > 0.96) drops[i] = 0;
            drops[i]++;
        });

        requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
}

/* ===========================
   TYPING EFFECT
=========================== */
function initTyping() {
    const el = document.querySelector(".typing-text");
    if (!el) return;

    const roles = [
        "Minecraft Plugin Developer",
        "SMP Infrastructure Engineer",
        "ECPlus Creator",
        "Full Stack Developer"
    ];

    let idx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
        const current = roles[idx];

        if (!deleting) {
            charIdx++;
            if (charIdx === current.length + 3) deleting = true;
        } else {
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % roles.length;
            }
        }

        el.textContent = current.slice(0, charIdx);
        setTimeout(tick, deleting ? 60 : 90);
    }

    tick();
}

/* ===========================
   LENIS SMOOTH SCROLL
=========================== */
function initLenis() {
    if (typeof Lenis === "undefined") return;

    const lenis = new Lenis({ smooth: true, lerp: 0.12 });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

/* ===========================
   GSAP ANIMATIONS
=========================== */
function initGsap() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#hero .hero-container", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-card", {
        scrollTrigger: { trigger: "#about", start: "top 75%" },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1
    });

    gsap.from(".project-card", {
        scrollTrigger: { trigger: "#projects", start: "top 75%" },
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.15
    });
}

/* ===========================
   CONTACT FORM
=========================== */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.reset();
        alert("Danke für deine Nachricht! Ich melde mich so schnell wie möglich.");
    });
}

/* ===========================
   VISITOR COUNTER
=========================== */
function initVisitorCounter() {
    const el = document.getElementById("visit-count");
    if (!el) return;

    const key = "haigorilla406_visit_count";
    let count = Number(localStorage.getItem(key) || "0");
    count++;
    localStorage.setItem(key, count);
    el.textContent = count.toString().padStart(3, "0");
}

/* ===========================
   FOOTER SOCIALS
=========================== */
function initFooterSocials() {
    const container = document.getElementById("footer-social-container");
    if (!container) return;

    const socials = [
        { label: "GitHub", href: "https://github.com/HaiGorilla406" },
        { label: "Modrinth", href: "https://modrinth.com/user/AxoSMP" },
        { label: "Discord", href: "https://discord.com/users/yourid" }
    ];

    socials.forEach(s => {
        const a = document.createElement("a");
        a.href = s.href;
        a.target = "_blank";
        a.textContent = s.label;
        a.className = "footer-link";
        container.appendChild(a);
    });
}

/* ===========================
   LANGUAGE SWITCHER
=========================== */
const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "nav.hireMe": "Hire Me",

        "about.title": "About Me & Services",
        "about.cat1Title": "👤 Who am I?",
        "about.cat1Desc": "I'm a 17-year-old developer from Saxony-Anhalt, Germany.",
        "about.cat2Title": "💻 What I do",
        "about.cat2Desc": "I create custom Minecraft plugins, backend systems and full-stack applications.",
        "about.cat3Title": "🎯 Vision",
        "about.cat3Desc": "Creating fast, modern and visually stunning digital experiences.",
        "about.cat4Title": "🍿 Hobbies",
        "about.cat4Desc": "When I'm not coding, I'm usually watching anime.",
        "about.servicesTitle": "🚀 Custom Minecraft Plugins",
        "about.servicesDesc": "I create fully custom Minecraft plugins – from QoL features to complex SMP systems.",

        "projects.title": "My Work",

        "contact.title": "Ready for your <span class='accent'>Custom Minecraft Plugin</span>?",
        "contact.desc": "Do you have an idea for a plugin or want a custom system? Just write me!",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Message",
        "contact.send": "Send Message",

        "footer.rights": "© 2026 HaiGorilla406 DEV. All rights reserved."
    },

    de: {
        "nav.home": "Start",
        "nav.about": "Über mich",
        "nav.projects": "Projekte",
        "nav.contact": "Kontakt",
        "nav.hireMe": "Kontaktieren",

        "about.title": "Über mich & Services",
        "about.cat1Title": "👤 Wer bin ich?",
        "about.cat1Desc": "Ich bin ein 17-jähriger Entwickler aus Sachsen-Anhalt, Deutschland.",
        "about.cat2Title": "💻 Was mache ich?",
        "about.cat2Desc": "Ich entwickle individuelle Minecraft-Plugins, Backend-Systeme und Full‑Stack‑Anwendungen.",
        "about.cat3Title": "🎯 Vision",
        "about.cat3Desc": "Ich erschaffe blitzschnelle, moderne und visuell beeindruckende Web-Erlebnisse.",
        "about.cat4Title": "🍿 Hobbys",
        "about.cat4Desc": "Wenn ich nicht codiere, schaue ich meistens Anime.",
        "about.servicesTitle": "🚀 Individuelle Minecraft Plugins",
        "about.servicesDesc": "Ich entwickle komplett individuelle Minecraft‑Plugins – von QoL‑Features bis komplexen SMP‑Systemen.",

        "projects.title": "Meine Projekte",

        "contact.title": "Bereit für dein <span class='accent'>Custom Minecraft Plugin</span>?",
        "contact.desc": "Hast du eine Idee für ein Plugin oder möchtest du ein eigenes System entwickeln lassen? Schreib mir einfach!",
        "contact.name": "Name",
        "contact.email": "E-Mail",
        "contact.message": "Nachricht",
        "contact.send": "Nachricht senden",

        "footer.rights": "© 2026 HaiGorilla406 DEV. Alle Rechte vorbehalten."
    }
};

function applyLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });

    document.querySelectorAll("[data-placeholder]").forEach(el => {
        const key = el.getAttribute("data-placeholder");
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });

    localStorage.setItem("lang", lang);
}

function initLanguageSwitcher() {
    const saved = localStorage.getItem("lang") || "en";
    applyLanguage(saved);

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === saved);

        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            applyLanguage(lang);

            document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

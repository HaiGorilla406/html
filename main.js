// main.js

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initCodeRain();
    initTyping();
    initLenis();
    initGsap();
    initContactForm();
    initVisitorCounter();
    initFooterSocials();
});

/* Cursor */

function initCursor() {
    const cursor = document.getElementById("cursor");
    const blur = document.getElementById("cursor-blur");

    if (!cursor || !blur) return;

    window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
        blur.style.transform = `translate(${clientX}px, ${clientY}px)`;
    });
}

/* Code Rain */

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

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * 16;
            const y = drops[i] * 16;

            ctx.fillText(text, x, y);

            if (y > height && Math.random() > 0.96) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
}

/* Typing */

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
            if (charIdx === current.length + 3) {
                deleting = true;
            }
        } else {
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % roles.length;
            }
        }

        el.textContent = current.slice(0, Math.max(charIdx, 0));
        const delay = deleting ? 60 : 90;
        setTimeout(tick, delay);
    }

    tick();
}

/* Lenis Smooth Scroll */

function initLenis() {
    if (typeof Lenis === "undefined") return;

    const lenis = new Lenis({
        smooth: true,
        lerp: 0.12
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

/* GSAP Animations */

function initGsap() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#hero .hero-content", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".section-header", {
        scrollTrigger: {
            trigger: ".section-header",
            start: "top 80%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2
    });

    gsap.from(".about-card", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1
    });

    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 75%"
        },
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.15
    });

    // Apple Reveal
    const reveal = document.querySelector("#apple-reveal");
    if (reveal) {
        gsap.to(".reveal-ring", {
            scrollTrigger: {
                trigger: "#apple-reveal",
                start: "top 80%",
                end: "bottom top",
                scrub: true
            },
            rotation: 360,
            stagger: 0.2
        });

        gsap.to(".glow-box", {
            scrollTrigger: {
                trigger: "#apple-reveal",
                start: "top 80%",
                end: "bottom top",
                scrub: true
            },
            boxShadow: "0 0 60px rgba(39, 201, 63, 0.7)"
        });
    }
}

/* Contact Form */

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const name = data.get("name") || data.get("Name") || "";
        const email = data.get("email") || "";
        const message = data.get("message") || data.get("Nachricht") || "";

        // Hier könntest du Supabase / Backend einbauen.
        console.log("Contact form:", { name, email, message });

        form.reset();
        alert("Danke für deine Nachricht! Ich melde mich so schnell wie möglich.");
    });
}

/* Visitor Counter (localStorage-basiert, später Supabase möglich) */

function initVisitorCounter() {
    const el = document.getElementById("visit-count");
    if (!el) return;

    const key = "haigorilla406_visit_count";
    let count = Number(localStorage.getItem(key) || "0");
    count++;
    localStorage.setItem(key, String(count));
    el.textContent = count.toString().padStart(3, "0");
}

/* Footer Socials */

function initFooterSocials() {
    const container = document.getElementById("footer-social-container");
    if (!container) return;

    const socials = [
        {
            label: "GitHub",
            href: "https://github.com/HaiGorilla406"
        },
        {
            label: "Modrinth",
            href: "https://modrinth.com/user/AxoSMP"
        },
        {
            label: "Discord",
            href: "https://discord.com/users/yourid"
        }
    ];

    socials.forEach((s) => {
        const a = document.createElement("a");
        a.href = s.href;
        a.target = "_blank";
        a.rel = "noreferrer";
        a.textContent = s.label;
        a.className = "footer-link";
        container.appendChild(a);
    });
}

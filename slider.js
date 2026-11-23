/* KRUTHUAY BIO - IMAGE SLIDER */

(() => {
  "use strict";

  const root = document.getElementById("bio-slider");
  if (!root) return;

  const images = (window.BIO_DATA?.slides || [])
    .filter((item) => item && item.image)
    .slice(0, 5);

  if (images.length === 0) return;

  const track = document.getElementById("bio-slider-track");
  const dots = document.getElementById("bio-slider-dots");
  const prev = document.getElementById("bio-slider-prev");
  const next = document.getElementById("bio-slider-next");
  const viewport = root.querySelector(".bio-slider-viewport");

  let current = 0;
  let timer = null;
  let touchStart = 0;

  // สร้างรูปภาพจาก data.js
  images.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "bio-slider-item";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.alt || `ภาพสไลด์ ${index + 1}`;
    img.decoding = "async";

    // ถ้ากำหนด URL รูปภาพจะกดเปิดลิงก์ได้
    if (item.url && /^https?:\/\//i.test(item.url)) {
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(img);
      slide.appendChild(link);
    } else {
      slide.appendChild(img);
    }

    track.appendChild(slide);

    // สร้างปุ่มจุดด้านล่าง
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "bio-slider-dot";
    dot.setAttribute("aria-label", `ดูภาพที่ ${index + 1}`);

    dot.addEventListener("click", () => {
      showSlide(index);
      startAuto();
    });

    dots.appendChild(dot);
  });

  const allDots = [...dots.children];

  function showSlide(index) {
    current = (index + images.length) % images.length;

    track.style.transform = `translateX(-${current * 100}%)`;

    allDots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", String(active));
    });
  }

  function stopAuto() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startAuto() {
    stopAuto();

    // ไม่เล่นอัตโนมัติเมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหว
    if (
      images.length < 2 ||
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    timer = setInterval(() => {
      showSlide(current + 1);
    }, 4000);
  }

  prev.addEventListener("click", () => {
    showSlide(current - 1);
    startAuto();
  });

  next.addEventListener("click", () => {
    showSlide(current + 1);
    startAuto();
  });

  // หยุดชั่วคราวเมื่อเอาเมาส์มาวาง
  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);

  root.addEventListener("focusin", stopAuto);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) startAuto();
  });

  // รองรับการปัดสไลด์บนมือถือ
  viewport.addEventListener(
    "touchstart",
    (event) => {
      touchStart = event.changedTouches[0].screenX;
      stopAuto();
    },
    { passive: true },
  );

  viewport.addEventListener(
    "touchend",
    (event) => {
      const end = event.changedTouches[0].screenX;
      const delta = end - touchStart;

      if (Math.abs(delta) > 40) {
        showSlide(current + (delta < 0 ? 1 : -1));
      }

      startAuto();
    },
    { passive: true },
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  // เริ่มแสดงสไลด์
  root.hidden = false;

  if (images.length === 1) {
    prev.hidden = true;
    next.hidden = true;
    dots.hidden = true;
  }

  showSlide(0);
  startAuto();
})();

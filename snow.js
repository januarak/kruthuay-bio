/* Snowfall effect for Kruthuay Bio V2 */

(() => {
  "use strict";

  // หยุดแอนิเมชันหากผู้ใช้ตั้งค่าลดการเคลื่อนไหว
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  function startSnow() {
    if (document.getElementById("kruthuay-snow")) return;

    const style = document.createElement("style");

    style.textContent = `
      #kruthuay-snow {
        position: fixed;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }

      .page {
        position: relative;
        z-index: 1;
      }

      #kruthuay-snow .snowflake {
        position: absolute;
        top: -16px;
        left: 0;
        display: block;
        width: var(--snow-size);
        height: var(--snow-size);
        border-radius: 50%;
        background: rgba(255, 255, 255, .96);
        opacity: var(--snow-opacity);
        box-shadow: 0 0 5px rgba(255, 255, 255, .24);
        animation: kruthuay-snowfall var(--snow-duration) linear infinite;
        animation-delay: var(--snow-delay);
        will-change: transform;
      }

      @keyframes kruthuay-snowfall {
        from {
          transform: translate3d(0, -15px, 0);
        }
        to {
          transform: translate3d(
            var(--snow-drift),
            calc(100vh + 35px),
            0
          );
        }
      }
    `;

    document.head.appendChild(style);

    const layer = document.createElement("div");
    layer.id = "kruthuay-snow";
    layer.setAttribute("aria-hidden", "true");

    document.body.insertBefore(
      layer,
      document.querySelector(".page") || document.body.firstChild,
    );

    // จำนวนหิมะ: มือถือ 46 เกล็ด / คอมพิวเตอร์ 80 เกล็ด
    const count = window.innerWidth < 600 ? 70 : 120;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const flake = document.createElement("span");
      flake.className = "snowflake";

      const duration = 15 + Math.random() * 20;
      const size = 2 + Math.random() * 5;
      const drift = -80 + Math.random() * 160;

      flake.style.left = `${Math.random() * 100}%`;

      flake.style.setProperty("--snow-size", `${size.toFixed(1)}px`);

      flake.style.setProperty(
        "--snow-opacity",
        (0.4 + Math.random() * 0.5).toFixed(2),
      );

      flake.style.setProperty("--snow-drift", `${drift.toFixed(0)}px`);

      flake.style.setProperty("--snow-duration", `${duration.toFixed(1)}s`);

      flake.style.setProperty(
        "--snow-delay",
        `${(-Math.random() * duration).toFixed(1)}s`,
      );

      fragment.appendChild(flake);
    }

    layer.appendChild(fragment);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSnow, { once: true });
  } else {
    startSnow();
  }
})();

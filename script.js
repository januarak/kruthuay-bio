(() => {
  "use strict";
  const d = window.BIO_DATA || {};
  const $ = (id) => document.getElementById(id);
  const icons = {
    heart:
      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    line: '<path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-3-.5L3 21l1.5-4.5a8.5 8.5 0 1 1 15.5-5z"/>',
    share:
      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4m-6.6 9 6.6 3.4"/>',
    globe:
      '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    star: '<path d="m12 2 3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/>',
  };
  const svg = (name) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.globe}</svg>`;
  function safeUrl(url) {
    try {
      const u = new URL(url, location.href);
      return ["https:", "http:"].includes(u.protocol) ? u.href : null;
    } catch {
      return null;
    }
  }
  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2300);
  }
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: location.href });
        return;
      }
      await navigator.clipboard.writeText(location.href);
      toast("คัดลอกลิงก์แล้ว");
    } catch (err) {
      if (err.name !== "AbortError") {
        prompt("คัดลอกลิงก์นี้", location.href);
      }
    }
  }
  function setText(id, value) {
    $(id).textContent = value || "";
  }
  document.documentElement.style.setProperty("--bg", d.background || "#102743");
  document.documentElement.style.setProperty("--accent", d.accent || "#69f0b5");
  document.documentElement.style.setProperty("--gold", d.accent2 || "#e9bc65");
  setText("handle", d.handle);
  setText("brand", d.brand);
  setText("headline", d.headline);
  setText("description", d.description);
  setText("footer", d.footer);
  document.title = `${d.brand || "Bio"} | รวมลิงก์`;
  if (d.avatar) $("avatar").src = d.avatar;
  if (d.cover) {
    $("banner").style.backgroundImage =
      `linear-gradient(#10274355,#10274355),url(${JSON.stringify(d.cover).slice(1, -1)})`;
    $("banner").style.backgroundSize = "cover";
    $("banner").style.backgroundPosition = "center";
  }
  for (const item of d.social || []) {
    if (item.enabled === false) continue;
    const el = document.createElement(item.icon === "share" ? "button" : "a");
    el.className = "social";
    if (el.tagName === "BUTTON") {
      el.type = "button";
      el.addEventListener("click", share);
    } else {
      const url = safeUrl(item.url);
      if (!url) continue;
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
    el.innerHTML = svg(item.icon);
    const text = document.createElement("span");
    text.textContent = item.label || "ลิงก์";
    el.appendChild(text);
    $("socials").appendChild(el);
  }
  for (const item of d.links || []) {
    if (item.enabled === false) continue;
    const url = safeUrl(item.url);
    if (!url) continue;
    const a = document.createElement("a");
    a.className = "link-card";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    const icon = document.createElement("span");
    icon.className = "link-icon";

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title || "icon";
      icon.appendChild(img);
    } else {
      icon.innerHTML = svg(item.icon);
    }
    const copy = document.createElement("span");
    copy.className = "link-copy";
    const title = document.createElement("span");
    title.className = "link-title";
    title.textContent = item.title || "ลิงก์";
    copy.appendChild(title);
    if (item.subtitle) {
      const sub = document.createElement("div");
      sub.className = "link-subtitle";
      sub.textContent = item.subtitle;
      copy.appendChild(sub);
    }
    if (item.badge) {
      const badge = document.createElement("span");
      badge.className = "link-badge";
      badge.textContent = item.badge;
      copy.appendChild(badge);
    }
    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.textContent = "›";
    arrow.setAttribute("aria-hidden", "true");
    a.append(icon, copy, arrow);
    $("links").appendChild(a);
  }
  $("copyLink").addEventListener("click", share);
})();

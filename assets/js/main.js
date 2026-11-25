// IronPeak Fitness — shared front-end behaviour + BMI calculator
document.addEventListener("DOMContentLoaded", () => {
  // Scroll-reveal animations (IntersectionObserver, no library needed)
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar shadow on scroll
  const nav = document.querySelector(".navbar");
  const onScroll = () => {
    if (nav) nav.classList.toggle("shadow", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Class filter (classes.html) -----------------------------------------
  const filterBtns = document.querySelectorAll("[data-filter]");
  const classCards = document.querySelectorAll("[data-category]");
  if (filterBtns.length && classCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        const wanted = btn.dataset.filter;
        classCards.forEach((card) => {
          const show = wanted === "all" || card.dataset.category === wanted;
          card.style.display = show ? "" : "none";
        });
        var live = document.getElementById("filter-status");
        if (live) { var n = 0; classCards.forEach(function(c){ if (c.style.display !== "none") n++; }); live.textContent = "Showing " + n + " class" + (n === 1 ? "" : "es") + "."; }
      });
    });
  }

  // ---- BMI calculator -------------------------------------------------------
  // BMI = weight (kg) / height (m)^2. Pure client-side JS, no backend.
  const bmiForm = document.getElementById("bmi-form");
  if (bmiForm) {
    const resultBox = document.getElementById("bmi-result");
    bmiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById("bmi-weight").value);
      const heightCm = parseFloat(document.getElementById("bmi-height").value);
      if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        resultBox.innerHTML = `<p class="text-warning mb-0">Please enter a weight and height above zero.</p>`;
        resultBox.classList.remove("d-none");
        return;
      }
      const bmi = computeBmi(weight, heightCm);
      const category = bmiCategory(bmi);
      const markerPct = Math.min(Math.max(((bmi - 14) / (40 - 14)) * 100, 0), 100);

      resultBox.innerHTML = `
        <div class="text-center">
          <div class="bmi-result-num" style="color:${category.color}">${bmi.toFixed(1)}</div>
          <div class="fw-bold fs-5 mt-1">${category.label}</div>
          <p class="text-white-50 small mb-3">${category.advice}</p>
          <div class="position-relative mx-auto" style="max-width: 420px;">
            <div class="bmi-meter"></div>
            <div class="bmi-marker" style="left:${markerPct.toFixed(1)}%"></div>
          </div>
          <div class="d-flex justify-content-between mx-auto mt-2" style="max-width: 420px;">
            <span class="bmi-range-label">14</span>
            <span class="bmi-range-label">18.5</span>
            <span class="bmi-range-label">25</span>
            <span class="bmi-range-label">30</span>
            <span class="bmi-range-label">40</span>
          </div>
          <p class="text-white-50 small mt-3 mb-0">
            Ranges: under 18.5 underweight · 18.5–24.9 healthy · 25–29.9 overweight · 30+ obese.
            BMI is a rough guide only — it doesn't account for muscle mass. Ask a trainer for a full assessment.
          </p>
        </div>`;
      resultBox.classList.remove("d-none");
      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  // ---- Join / enquiry form — clearly labelled demo mode ---------------------
  const joinForm = document.getElementById("join-form");
  if (joinForm) {
    joinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!joinForm.checkValidity()) {
        joinForm.classList.add("was-validated");
        return;
      }
      const box = document.getElementById("join-result");
      const plan = document.getElementById("join-plan").value;
      const name = document.getElementById("join-name").value;
      box.className = "alert alert-info mt-4";
      box.innerHTML = `<h5 class="alert-heading">✓ Demo mode — enquiry previewed, not sent</h5>
        <p class="mb-1"><strong>No backend is connected</strong> on this static demo, so nothing was stored or emailed.
        On a live site this form would send your enquiry to the gym.</p>
        <p class="mb-0">Your enquiry: <strong>${escapeHtml(plan)}</strong> plan for
        <strong>${escapeHtml(name)}</strong>.</p>`;
      box.classList.remove("d-none");
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
});

// Exported pure functions so the logic can be unit-tested in isolation.
function computeBmi(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "#38bdf8", advice: "Below the healthy range — a trainer can help you build strength and muscle." };
  if (bmi < 25) return { label: "Healthy weight", color: "#22c55e", advice: "Right in the healthy range — keep it up with regular training." };
  if (bmi < 30) return { label: "Overweight", color: "#facc15", advice: "Above the healthy range — our coaches can build a plan that fits your routine." };
  return { label: "Obese", color: "#ef4444", advice: "Well above the healthy range — talk to a trainer (and your doctor) about a safe plan." };
}

/* Polish upgrade: reduced-motion-safe reveals, back-to-top, stagger */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("DOMContentLoaded", function () {
    var els = document.querySelectorAll(".reveal-left,.reveal-right,.reveal-zoom");
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
    } else {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); io2.unobserve(e.target); } });
      }, { threshold: 0.12 });
      els.forEach(function (el) { io2.observe(el); });
    }
    var btn = document.createElement("button");
    btn.id = "back-to-top"; btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.textContent = "\u2191";
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });
    document.body.appendChild(btn);
    window.addEventListener("scroll", function () { btn.classList.toggle("show", window.scrollY > 600); }, { passive: true });
  });
})();

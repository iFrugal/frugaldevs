/* Terminal-style typing for the hero prompt and section kickers. */

(function () {
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Human-ish keystroke delay: uneven rhythm with occasional hesitation. */
  function keyDelay() {
    var base = 55 + Math.random() * 90;
    if (Math.random() < 0.08) base += 220 + Math.random() * 240; /* brief pause, like thinking */
    return base;
  }

  function typeInto(el, text, options, done) {
    var i = 0;
    function tick() {
      el.textContent = text.slice(0, i);
      i += 1;
      if (i <= text.length) {
        setTimeout(tick, keyDelay());
      } else if (done) {
        done();
      }
    }
    setTimeout(tick, options.startDelay || 0);
  }

  /* Hero: "$ " prompt sits still, "whoami" is typed; cursor is solid while
     typing and resumes blinking when idle, like a real terminal. */
  function initHero() {
    var kicker = document.getElementById("hero-kicker");
    if (!kicker) return;
    var cursor = kicker.querySelector(".cursor");
    var target = kicker.querySelector(".typed");
    var text = target.textContent;

    if (reducedMotion) return; /* keep the static text */

    target.textContent = "";
    if (cursor) cursor.classList.add("typing");
    typeInto(target, text, { startDelay: 600 }, function () {
      if (cursor) cursor.classList.remove("typing");
    });
  }

  /* Section kickers: typed once, the first time they scroll into view. */
  function initKickers() {
    var kickers = Array.prototype.slice.call(document.querySelectorAll(".kicker[data-type]"));
    if (!kickers.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) return;

    kickers.forEach(function (el) {
      el.dataset.fullText = el.textContent;
      el.textContent = " "; /* keep the line height reserved */
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        typeInto(el, el.dataset.fullText, { startDelay: 120 });
      });
    }, { rootMargin: "0px 0px -12% 0px" });

    kickers.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initHero();
      initKickers();
    });
  } else {
    initHero();
    initKickers();
  }
})();

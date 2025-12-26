// assets/js/script.js

/* =========================
   1) HERO SLIDER (autoplay)
   ========================= */
(function(){
  const root = document.querySelector('[data-slider]');
  if(!root) return;

  const slides = root.querySelector('.slides');

  // Dotok a slider testvér elemében vannak (parent-en belül)
  const dotsWrap = root.parentElement?.querySelector('.dots');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.dot')) : [];

  const total = slides ? slides.children.length : 0;
  if(!slides || total === 0) return;

  let i = 0;

  function go(n){
    i = (n + total) % total;
    slides.style.transform = `translateX(${-i*100}%)`;
    dots.forEach((d,idx)=>d.classList.toggle('active', idx===i));
  }

  dots.forEach((d,idx)=>d.addEventListener('click', ()=>go(idx)));

  // Autoplay
  setInterval(()=>go(i+1), 5000);
  go(0);
})();


/* =========================
   2) GALLERY FILTERS
   ========================= */
(() => {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const btns = Array.from(gallery.querySelectorAll(".f-btn"));
  const items = Array.from(gallery.querySelectorAll(".g-item"));

  if (btns.length === 0 || items.length === 0) return;

  function setActive(btn){
    btns.forEach(b => b.classList.toggle("active", b === btn));
  }

  function apply(filter){
    items.forEach(it => {
      const cat = it.getAttribute("data-cat");
      const show = (filter === "all" || cat === filter);
      it.style.display = show ? "" : "none";
    });
  }

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter") || "all";
      setActive(btn);
      apply(f);
    });
  });

  apply("all");
})();


/* =========================
   3) LIGHTBOX (gallery click)
   ========================= */
(() => {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const lbImg = lb.querySelector(".lb-img");
  const closeBtn = lb.querySelector(".lb-close");

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  // Csak a galérián belül kezeljük a kattintást
  gallery.querySelectorAll(".g-item").forEach(a => {
    a.addEventListener("click", (e) => {
      // Ha épp el van rejtve szűrés miatt, ne nyisson lightboxot
      if (a.style.display === "none") return;

      e.preventDefault();
      const img = a.querySelector("img");
      open(a.getAttribute("href"), img?.alt);
    });
  });

  closeBtn?.addEventListener("click", close);

  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  window.addEventListener("keydown", (e) => {
    if (!lb.hidden && e.key === "Escape") close();
  });
})();
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

if(burger && menu){
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  // Menü zárása kattintáskor (mobil UX)
  menu.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=>{
      burger.classList.remove('open');
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    });
  });
}

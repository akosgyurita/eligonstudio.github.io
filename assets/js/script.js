(function(){
  const root = document.querySelector('[data-slider]');
  if(!root) return;
  const slides = root.querySelector('.slides');
  const dots = Array.from(root.querySelectorAll('.dot'));
  let i = 0;
  function go(n){
    i = (n + dots.length) % dots.length;
    slides.style.transform = `translateX(${-i*100}%)`;
    dots.forEach((d,idx)=>d.classList.toggle('active', idx===i));
  }
  dots.forEach((d,idx)=>d.addEventListener('click', ()=>go(idx)));
  setInterval(()=>go(i+1), 5000);
  go(0);
})();
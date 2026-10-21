// copy email to clipboard, falling back to selecting it
document.getElementById('copy').addEventListener('click', function(){
  var btn=this, el=document.getElementById('email');
  function done(){btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy email'},1600)}
  function fallback(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Selected, press Ctrl+C'}
  try{navigator.clipboard.writeText(el.textContent).then(done,fallback)}catch(e){fallback()}
});

// quote / invoice switcher
(function(){
  var sc=document.getElementById('showcase'),bq=document.getElementById('btn-quote'),bi=document.getElementById('btn-invoice');
  function set(m){sc.dataset.mode=m;bq.setAttribute('aria-pressed',m==='quote');bi.setAttribute('aria-pressed',m==='invoice');
    sc.classList.add('swap');setTimeout(function(){sc.classList.remove('swap')},180)}
  bq.addEventListener('click',function(){set('quote')});
  bi.addEventListener('click',function(){set('invoice')});
  document.getElementById('convert').addEventListener('click',function(){set('invoice')});
})();

// highlight current section in the menu
(function(){
  var links=[].slice.call(document.querySelectorAll('.links a'));
  if(!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
  ['services','work','process','about'].forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s)});
})();

// keep the footer year current
document.getElementById('year').textContent=new Date().getFullYear();

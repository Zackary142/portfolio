// copy email to clipboard, falling back to selecting it
document.getElementById('copy').addEventListener('click', function(){
  var btn=this, el=document.getElementById('email');
  function done(){btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy'},1600)}
  function fallback(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Selected, press Ctrl+C'}
  try{navigator.clipboard.writeText(el.textContent).then(done,fallback)}catch(e){fallback()}
});

// keep the footer year current
document.getElementById('year').textContent=new Date().getFullYear();

// fade sections in as they scroll into view
(function(){
  if(!('IntersectionObserver' in window))return;
  var els=document.querySelectorAll('.work,.table,.skills,.contact');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){el.classList.add('reveal');io.observe(el)});
})();

// VoQuota walkthrough: a scripted timeline played like a video
(function(){
  var player=document.getElementById('player'), stage=document.getElementById('stage');
  if(!player||!stage)return;
  var caption=document.getElementById('caption'), playBtn=document.getElementById('play');
  var chaps=[].slice.call(player.querySelectorAll('.chap'));
  var qtotal=document.getElementById('qtotal'), ptotal=document.getElementById('ptotal'), card=document.getElementById('card');
  var CARD='4242 4242 4242 4242';

  // each step changes part of the scene; later steps inherit everything before them
  var steps=[
    {ch:0,d:1600,s:{phone:'build',web:'inbox',doc:'quote',lines:0,focus:'phone',notif:'',sent:0,accepted:0,invSent:0,card:0,paying:0,paid:0},cap:'A tradesperson starts a quote on their phone.'},
    {ch:0,d:900,s:{lines:1},cap:'Line items come from their saved list…'},
    {ch:0,d:900,s:{lines:2}},
    {ch:0,d:1500,s:{lines:3},cap:'…and VAT and the total are worked out as they go.'},
    {ch:0,d:800,tap:'send-quote',cap:'One tap sends it.'},
    {ch:0,d:2000,s:{sent:1,focus:'web'},cap:'The customer gets an email with a link. No account needed.'},
    {ch:0,d:700,tap:'open-quote'},
    {ch:0,d:1800,s:{web:'doc'},cap:'They see a proper quote with the business’s own branding…'},
    {ch:0,d:700,tap:'accept'},
    {ch:0,d:1300,s:{accepted:1},cap:'…and accept it in one click.'},
    {ch:0,d:1700,s:{phone:'accepted',focus:'phone',notif:'accept'},cap:'The tradesperson hears about it straight away.'},
    {ch:0,d:800,s:{notif:''},tap:'convert'},
    {ch:0,d:2300,s:{phone:'review',doc:'invoice'},cap:'One click turns it into an invoice, with every line carried across.'},
    {ch:0,d:800,tap:'send-invoice'},
    {ch:0,d:1800,s:{invSent:1,focus:'web'},cap:'The invoice goes to the customer.'},
    {ch:1,d:1700,cap:'Every invoice has a Pay now button.'},
    {ch:1,d:700,tap:'pay-now'},
    {ch:1,d:900,s:{web:'pay'},cap:'The customer pays by card on a secure page.'},
    {ch:1,d:1800,s:{card:1},type:true},
    {ch:1,d:700,tap:'pay-submit'},
    {ch:1,d:1200,s:{paying:1}},
    {ch:1,d:1500,s:{web:'success',paying:0},cap:'Payment confirmed.'},
    {ch:1,d:2600,s:{phone:'paid',focus:'phone',notif:'paid',paid:1,web:'doc'},cap:'The tradesperson is told the money has arrived, and the invoice is marked paid.'},
    {ch:1,d:2400,s:{notif:''},cap:'No chasing, no spreadsheets. Quote, invoice and payment in one app.'}
  ];
  var chStart=[0,0],chDur=[0,0];
  steps.forEach(function(st,i){if(i===0||steps[i-1].ch!==st.ch)chStart[st.ch]=i;chDur[st.ch]+=st.d});

  var i=0, t=0, last=0, playing=true, visible=false, raf=0, state={};
  var lineTotals=[0,200,1400,1700];
  var gbp=function(n){return '£'+n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})};
  var tween={};
  function animateNum(el,key,to){
    var from=tween[key]==null?to:tween[key];tween[key]=to;
    if(from===to){el.textContent=gbp(to);return}
    var t0=performance.now();
    (function f(now){var p=Math.min(1,(now-t0)/600),e=1-Math.pow(1-p,3);el.textContent=gbp(from+(to-from)*e);if(p<1)requestAnimationFrame(f)})(t0);
  }

  function stateAt(n){var s={},c='';for(var k=0;k<=n;k++){var st=steps[k];if(st.s)for(var key in st.s)s[key]=st.s[key];if(st.cap)c=st.cap}s.cap=c;return s}

  function apply(n){
    var s=stateAt(n);
    stage.dataset.phone=s.phone;stage.dataset.web=s.web;stage.dataset.doc=s.doc;stage.dataset.lines=s.lines;stage.dataset.focus=s.focus;stage.dataset.notif=s.notif;
    stage.classList.toggle('is-sent',!!s.sent);stage.classList.toggle('is-accepted',!!s.accepted);stage.classList.toggle('is-inv-sent',!!s.invSent);
    stage.classList.toggle('is-card',!!s.card);stage.classList.toggle('is-paying',!!s.paying);stage.classList.toggle('is-paid',!!s.paid);
    animateNum(qtotal,'q',lineTotals[s.lines]);
    animateNum(ptotal,'p',s.paid?2180:480);
    if(!steps[n].type)card.textContent=s.card?CARD:' ';
    stage.querySelectorAll('.press').forEach(function(el){el.classList.remove('press')});
    if(steps[n].tap)document.getElementById(steps[n].tap).classList.add('press');
    if(caption.textContent!==s.cap)caption.textContent=s.cap;
    chaps.forEach(function(c,k){c.setAttribute('aria-current',String(k===steps[n].ch))});
    state=s;
  }

  function progress(){
    var ch=steps[i].ch;
    chaps.forEach(function(c,k){
      var done=0;
      if(k<ch)done=1;else if(k===ch){var acc=0;for(var j=chStart[k];j<i;j++)acc+=steps[j].d;done=(acc+t)/chDur[k]}
      c.querySelector('.bar i').style.width=(Math.min(1,done)*100)+'%';
    });
    if(steps[i].type){var p=Math.min(1,t/(steps[i].d*.85));card.textContent=CARD.slice(0,Math.round(p*CARD.length))||' '}
  }

  function frame(now){
    raf=0;
    if(!playing||!visible)return;
    t+=Math.min(100,now-last);last=now;
    if(t>=steps[i].d){t=0;i=(i+1)%steps.length;apply(i)}
    progress();
    raf=requestAnimationFrame(frame);
  }
  function run(){if(playing&&visible&&!raf){last=performance.now();raf=requestAnimationFrame(frame)}}

  function setPlaying(p){
    playing=p;player.classList.toggle('paused',!p);
    playBtn.setAttribute('aria-label',p?'Pause the walkthrough':'Play the walkthrough');
    run();
  }
  playBtn.addEventListener('click',function(){
    if(!playing&&i===steps.length-1&&t>=steps[i].d-1){i=0;t=0;apply(0)}
    setPlaying(!playing);
  });
  chaps.forEach(function(c,k){c.addEventListener('click',function(){i=chStart[k];t=0;apply(i);progress();setPlaying(true)})});

  // only play while on screen and while the tab is visible
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){visible=es[0].isIntersecting;run()},{threshold:.25}).observe(player);
  }else visible=true;
  document.addEventListener('visibilitychange',function(){if(document.hidden){visible=false}else{var r=player.getBoundingClientRect();visible=r.bottom>0&&r.top<innerHeight;run()}});

  apply(0);progress();
  // with reduced motion, wait for the visitor to press play
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)setPlaying(false);else run();
})();

(function(){
  var root=document.documentElement; root.classList.remove('no-js');
  var KEY='vm-site-lang';
  function setLang(l){
    if(l!=='en')l='uk';
    root.setAttribute('data-lang',l); root.setAttribute('lang',l);
    var t=document.body.getAttribute('data-title-'+l); if(t)document.title=t;
    var d=document.body.getAttribute('data-desc-'+l), m=document.querySelector('meta[name="description"]'); if(d&&m)m.setAttribute('content',d);
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.set===l))});
    document.querySelectorAll('[data-aria-uk]').forEach(function(el){el.setAttribute('aria-label',el.getAttribute('data-aria-'+l))});
    try{localStorage.setItem(KEY,l)}catch(e){}
  }
  var saved=null; try{saved=localStorage.getItem(KEY)}catch(e){}
  setLang(saved||'uk');
  document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.set)})});

  var nav=document.querySelector('.nav'), menu=document.getElementById('menu'), burger=document.querySelector('.burger');
  function onScroll(){nav.classList.toggle('solid',scrollY>20||menu.classList.contains('open'))}
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',String(o));onScroll()});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open')){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.focus();onScroll()}});

  // reveal
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -30px 0px'});
    rv.forEach(function(el){io.observe(el)});
  } else rv.forEach(function(el){el.classList.add('in')});

  // YouTube facades
  document.querySelectorAll('button.yt').forEach(function(b){
    b.addEventListener('click',function(){
      var id=b.dataset.id, f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen=true; f.title=b.getAttribute('aria-label')||'YouTube video';
      b.replaceChildren(f); b.style.cursor='default';
    },{once:true});
  });

  // tabs
  document.querySelectorAll('[role="tablist"]').forEach(function(tl){
    var tabs=[].slice.call(tl.querySelectorAll('[role="tab"]'));
    function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;var p=document.getElementById(x.getAttribute('aria-controls'));if(p)p.hidden=!on})}
    tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(k){var n=tabs[(i+k+tabs.length)%tabs.length];n.focus();sel(n)}})});
  });

  // before / after
  document.querySelectorAll('.ba').forEach(function(ba){
    var r=ba.querySelector('input'); function u(){ba.style.setProperty('--p',r.value+'%')} r.addEventListener('input',u); u();
  });

  // pause offscreen videos
  var vids=document.querySelectorAll('video[autoplay]');
  if('IntersectionObserver' in window){var vo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var p=e.target.play();if(p&&p.catch)p.catch(function(){})}else e.target.pause()})});vids.forEach(function(v){vo.observe(v)})}
})();

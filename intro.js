/* LuxuryCabos — cinematic intro + 2026 Fundadores film (Prenton Realty) */
(function () {
  // 1) Upgrade "The Film" section to the 2026 Fundadores film
  function upgradeFilm() {
    var vids = document.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) {
      var v = vids[i];
      var src = v.currentSrc || v.src || '';
      var sources = v.querySelectorAll('source');
      var hit = /founders-film\.mp4/.test(src);
      for (var j = 0; j < sources.length; j++) {
        if (/founders-film\.mp4/.test(sources[j].src)) { sources[j].src = '/photos/fundadores-film-2026-web.mp4'; hit = true; }
      }
      if (/founders-film\.mp4/.test(v.getAttribute('src') || '')) { v.setAttribute('src', '/photos/fundadores-film-2026-web.mp4'); hit = true; }
      if (hit) { v.setAttribute('poster', '/photos/film-poster-2026.jpg'); v.load(); }
    }
  }

  // 2) One-time cinematic intro overlay
  function intro() {
    try {
      if (sessionStorage.getItem('lc_intro') === '1') return;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      sessionStorage.setItem('lc_intro', '1');
    } catch (e) { return; }

    var css = document.createElement('style');
    css.textContent =
      '#lc-intro{position:fixed;inset:0;z-index:99999;background:#06141f;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity .9s ease}' +
      '#lc-intro.lc-out{opacity:0;pointer-events:none}' +
      '#lc-intro video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}' +
      '#lc-intro .lc-shade{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(6,20,31,0) 40%,rgba(6,20,31,.55) 100%)}' +
      '#lc-intro .lc-mark{position:relative;text-align:center;color:#fff;font-family:Georgia,serif;opacity:0;animation:lcfade 1.6s ease .7s forwards}' +
      '#lc-intro .lc-mark h1{font-size:clamp(28px,5vw,54px);letter-spacing:.28em;font-weight:400;margin:0 0 10px}' +
      '#lc-intro .lc-mark p{font-size:clamp(11px,1.4vw,14px);letter-spacing:.45em;color:#d8c49a;text-transform:uppercase;margin:0}' +
      '#lc-intro .lc-skip{position:absolute;bottom:34px;right:38px;background:none;border:1px solid rgba(255,255,255,.5);color:#fff;font-size:12px;letter-spacing:.22em;padding:10px 22px;cursor:pointer;text-transform:uppercase;opacity:0;animation:lcfade 1s ease 1.6s forwards}' +
      '#lc-intro .lc-skip:hover{background:rgba(255,255,255,.14)}' +
      '@keyframes lcfade{to{opacity:1}}';
    document.head.appendChild(css);

    var wrap = document.createElement('div');
    wrap.id = 'lc-intro';
    wrap.innerHTML =
      '<video muted autoplay playsinline preload="auto" src="/photos/intro-loop.mp4"></video>' +
      '<div class="lc-shade"></div>' +
      '<div class="lc-mark"><h1>LUXURYCABOS</h1><p>Puerto Los Cabos &middot; A Prenton Realty Collection</p></div>' +
      '<button class="lc-skip" type="button">Enter Site</button>';
    document.body.appendChild(wrap);
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function done() {
      if (!wrap.parentNode) return;
      wrap.classList.add('lc-out');
      document.body.style.overflow = prevOverflow;
      setTimeout(function () { wrap.parentNode && wrap.parentNode.removeChild(wrap); }, 950);
    }
    wrap.querySelector('.lc-skip').addEventListener('click', done);
    var v = wrap.querySelector('video');
    v.addEventListener('ended', done);
    v.play && v.play().catch(function () { done(); });
    setTimeout(done, 9200); // hard fallback
  }

  function init() { upgradeFilm(); intro(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* MiSciolgo — Bovisa, Milano.
   Sopra: PLUMBING_V 2 dal boilerplate del Toolkit, adattato nella sola
   costante SITE. Sotto il marcatore: il codice-firma — la riga che
   cancella la domanda.
   ⚠️ La firma anima SOLO `scaleX` di uno pseudo-elemento: il testo della
   domanda resta sempre leggibile, anche senza GSAP. Nessun contenuto è
   legato a un'animazione di opacità. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'misciolgo',
    whatsapp: { number: '', message: '', ids: [] },
    /* orari letti a schermo (19/7/2026): lunedì chiuso, mar–dom 12–23.
       ⚠️ Su Maps «aggiornati da altre persone»: da riconfermare. */
    hours: {
      0: [['12:00', '23:00']],
      1: [],
      2: [['12:00', '23:00']],
      3: [['12:00', '23:00']],
      4: [['12:00', '23:00']],
      5: [['12:00', '23:00']],
      6: [['12:00', '23:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1400,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'skip': 'Skip to content',
      'brand.aria': 'MiSciolgo, back to top',
      'burger.aria': 'Open menu',
      'lang.aria': 'Passa all’italiano',
      'lang.txt': 'IT',
      'nav.chiedere': 'No need to ask', 'nav.banco': 'The counter', 'nav.gusti': 'Flavours',
      'nav.voci': 'Reviews', 'nav.dove': 'Find us', 'nav.cta': 'Call',

      'hero.kicker': 'Artisan gelato — Bovisa, Milan',
      'hero.h': 'What you<br>don’t have to ask for.',
      'hero.sub': 'In almost every gelateria there are things you have to ask about at the counter, and hope. Here they are already there.',
      'hero.rating': 'from 1,245 Google reviews',

      'q1': '“Do you have a gluten-free cone?”',
      'a1': 'Every cone is gluten free.',
      'p1': 'There is no normal cone and a separate one for coeliacs: the cone we hand to anyone who walks in is already gluten free. Nobody has to explain anything at the counter.',
      'q2': '“Is there anything vegan?”',
      'a2': 'Vegan flavours are always there.',
      'p2': 'Not one token flavour kept aside: they are in the case with all the others, and they rotate just like the others.',
      'q3': '“And something light?”',
      'a3': 'The ice pops are 98% fruit.',
      'p3': 'In summer there are ice pops: almost nothing but fruit, the rest is the little it takes to hold them together. It is what customers recommend after dinner.',
      'fatti.nota': 'Three facts taken from customer reviews, not from a marketing department.',

      'banco.eyebrow': 'The counter',
      'banco.h': 'White, steel,<br>and the colour stays<br>in the trays.',
      'banco.p1': 'The room is spare: stainless steel, glass, pale surfaces. Nothing in the furniture asks for attention, because the only colourful thing should be the gelato.',
      'banco.p2': 'The reviews call it “very clean and elegant”. It is also why this site looks the way it does: white, few things, large type.',
      'banco.cap': 'The sorbets, the only bright note in the place.',

      'gusti.eyebrow': 'The flavours',
      'gusti.h': 'They change.<br>Two always come back.',
      'g1': '“Hands down the best pistachio I have ever tasted in Milan.”',
      'g2': '“The best are pistachio and almond. Worth trying.”',
      'gusti.p1': 'The rest of the case rotates. Now and then something more unusual shows up — a citrus mix with Campari — but never overdone: “original flavours, but not too much”, as one customer puts it.',
      'gusti.p2': 'Besides the counter there are <strong>ice-cream cakes</strong>, pastries and <strong>gelato with biscuit</strong>. And the shop stays open in winter as much as in summer.',
      'gusti.cap': 'The cones: those ones, for everybody.',

      'voci.eyebrow': 'Google reviews',
      'voci.h': '4.6 out of 1,245.',
      'v1.p': '“Hands down the best pistachio I have ever tasted in Milan!!! It reminded me of the gelato in some Sicilian shops. A gelateria with loads of flavours, very clean and elegant, impeccable service.”',
      'v1.c': 'Salvo, Local Guide',
      'v2.p': '“Best gelato in Milan, hands down! Excellent quality. They also make lovely pastries and gelato with biscuit. In summer they make wonderfully refreshing 98% fruit ice pops, light after dinner. The staff are kind and always smiling.”',
      'v2.c': 'Sofia Moccia, Local Guide',
      'v3.p': '“The best gelato in Milan. Nothing more to add. The owner loves excellent raw materials. There are lots of vegan flavours and delicious ice-cream cakes. The cones are gluten free so coeliacs are covered too. In winter as in summer.”',
      'v3.c': 'Davide Michelini',
      'v4.p': '“One of the best gelaterie in Milan. Original flavours but not overdone (a citrus mix with Campari is the most pretentious). But the best are pistachio and almond. Worth trying.”',
      'v4.c': 'Silvia De Fre',
      'v5.p': '“Found by chance on my way home! A lovely surprise, the flavours were unusual but right for my taste and, besides being delicious, the girl who served me was very courteous.”',
      'v5.c': 'Giulia Pellegrini',

      'dentro.eyebrow': 'Inside', 'dentro.h': 'Three frames.',
      'dentro.a1': 'Enlarge: the counter',
      'dentro.a2': 'Enlarge: the steel case',
      'dentro.a3': 'Enlarge: the sorbets',
      'dentro.nota': 'There are few public photos: these are the verified ones. A gelateria made of white and steel deserves a shoot to match.',

      'dove.eyebrow': 'Where we are', 'dove.h': 'Bovisa,<br>until 11 pm.',
      'dove.serv': 'Eat in · take away · home delivery',
      'dove.cta': 'Call the gelateria',
      'dove.maptitle': 'Map: MiSciolgo, Via Benedetto Varchi 4, Milan',
      'd.lun': 'Monday', 'd.mar': 'Tuesday', 'd.mer': 'Wednesday', 'd.gio': 'Thursday',
      'd.ven': 'Friday', 'd.sab': 'Saturday', 'd.dom': 'Sunday', 'd.chiuso': 'closed',

      'faq.h': 'Questions',
      'f1.q': 'Are the cones gluten free?',
      'f1.a': 'Yes, all of them. There is no normal cone and a separate one for coeliacs: the one we give to anyone is already gluten free.',
      'f2.q': 'Are there vegan flavours?',
      'f2.a': 'Yes, and not just one: they are always in the case, not on request.',
      'f3.q': 'What are the 98% fruit ice pops?',
      'f3.a': 'Summer ice pops made almost entirely of fruit. The 98% is the fruit share; the rest is the little it takes to hold them together.',
      'f4.q': 'When are you open?',
      'f4.a': 'Tuesday to Sunday, 12 pm to 11 pm. Closed on Monday. Open in winter as in summer.',
      'f5.q': 'Do you make ice-cream cakes?',
      'f5.a': 'Yes, along with pastries and gelato with biscuit. For cakes a phone call is best.',
      'f6.q': 'Are the flavours always the same?',
      'f6.a': 'No, they change periodically. Pistachio and almond are the ones customers mention most.',

      'foot.orari': 'Tue–Sun 12 pm – 11 pm',
      'foot.chiuso': 'Closed on Monday',
      'foot.demo': 'Demo website made by',
      'ab.call': 'Call', 'ab.map': 'Find us', 'lb.close': 'Close',
    },
  };
  /* ═════════════════════════════════════════════════════════════════ */

  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' + encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el && !st.progress) st.kill(); });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 22 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  } else if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
  } else {
    showAllReveals();
  }

  /* ---------- intro ---------- */
  var intro = document.getElementById(SITE.introId);
  var heroEntrance = window.bespokeHeroEntrance || function () {};
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      killIntroNow();
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* ---------- orari dinamici Europe/Rome ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) };
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) };
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    var en = root.lang === 'en';
    var txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay ---------- */
  var originals = {};
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  }
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* ---------- action-bar mobile ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — sotto, il codice-firma ══════════ */

  var header = document.getElementById('header');
  if (header) {
    var headerScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', headerScroll, { passive: true });
    headerScroll();
  }

  /* FIRMA: la riga che cancella la domanda.
     Ogni fatto è preceduto dalla frase che altrove saresti costretto a
     dire al banco; quando il blocco entra in vista, una riga la barra.
     Si anima solo `scaleX` dello pseudo-elemento ::after: il testo della
     domanda resta comunque leggibile, e senza GSAP il CSS di
     reduced-motion la mostra già tirata. */
  var barra = function (blocco) {
    var riga = blocco.querySelector('.dom-testo');
    if (riga) riga.classList.add('barrata');
  };

  if (hasST && !reducedMotion) {
    // il JS aggiunge SOLO la classe: la transizione dello pseudo-elemento
    // vive nel CSS, che è l'unico posto in cui si possa animare un ::after
    document.querySelectorAll('.fatto').forEach(function (blocco) {
      ScrollTrigger.create({ trigger: blocco, start: 'top 72%', once: true,
        onEnter: function () { barra(blocco); } });
    });
    // rete di sicurezza: se un trigger non scattasse, dopo 3s le righe
    // vengono barrate comunque — il senso della sezione dipende da quelle
    setTimeout(function () { document.querySelectorAll('.fatto').forEach(barra); }, 3000);
  } else {
    document.querySelectorAll('.fatto').forEach(barra);
  }
})();

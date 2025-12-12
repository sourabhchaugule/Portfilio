(() => {
  // YEAR
  document.querySelectorAll('#year,#yearProjects,#yearEdu,#yearExp,#yearAbout,#yearContact').forEach(el => {
    if(el) el.textContent = new Date().getFullYear();
  });

  // THEME
  const applyTheme = (dark) => {
    if(dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    document.querySelectorAll('.icon-btn').forEach(b => b.textContent = dark ? '☀️' : '🌙');
  }
  const saved = localStorage.getItem('themeDark');
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved==='1' : prefers);

  document.querySelectorAll('#themeToggle,#themeToggleProjects,#themeToggleEducation,#themeToggleExpertise,#themeToggleAbout,#themeToggleContact')
    .forEach(btn => {
      if(!btn) return;
      btn.addEventListener('click', ()=>{
        const now = !document.documentElement.classList.contains('dark');
        localStorage.setItem('themeDark', now?'1':'0');
        applyTheme(now);
      })
    });

  // NAV ACTIVE
  document.querySelectorAll('.main-nav a').forEach(a=>{
    try{ if(location.pathname.endsWith(a.getAttribute('href')) || location.href.endsWith(a.href)) a.classList.add('active'); }catch(e){}
  });

  // MODAL
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = modal?.querySelector('.modal-close');
  function openModal(html){ if(!modal) return; modalBody.innerHTML = html; modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeModal(){ if(!modal) return; modal.setAttribute('aria-hidden','true'); modalBody.innerHTML=''; document.body.style.overflow=''; }
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  modal?.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && modal?.getAttribute('aria-hidden')==='false') closeModal(); });

  // PROJECT quick view
  document.addEventListener('click', e=>{
    const el = e.target.closest('.project .project-meta, .project .project-screenshot');
    if(!el) return;
    const projectEl = e.target.closest('.project');
    if(!projectEl) return;
    const title = projectEl.querySelector('h2')?.innerText||'';
    const desc  = projectEl.querySelector('p')?.innerText||'';
    const img   = projectEl.querySelector('img')?.src||'';
    const html = `<div style="display:flex;gap:16px;flex-wrap:wrap">
      <div style="flex:1;min-width:260px"><img src="${img}" style="width:100%;border-radius:8px" alt="${title}" onerror="this.style.display='none'"/></div>
      <div style="flex:1;min-width:240px"><h2>${title}</h2><p class="muted">${desc}</p></div>
    </div>`;
    openModal(html);
  });

  // CONTACT FORM
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', async ev=>{
      ev.preventDefault();
      const status = document.getElementById('formStatus');
      status.textContent = 'Sending...';
      const data = new FormData(form);
      const FORM_ENDPOINT = 'https://formspree.io/f/yourFormID';
      try{
        const res = await fetch(FORM_ENDPOINT,{method:'POST',body:data,headers:{'Accept':'application/json'}});
        if(res.ok){ status.textContent='Sent — thanks! I will reply soon.'; form.reset(); }
        else{ const json = await res.json().catch(()=>null); status.textContent = json?.error?`Error:${json.error}`:'Error sending message.'; }
      }catch(err){ console.error(err); status.textContent='Network error — try later.'; }
    });
  }

  // TYPEWRITER HERO
  (function typeWriterName(){
    const target = document.getElementById('typewriter-name'); if(!target) return;
    const full = "Sourabh Chaugule"; let idx=0; const speed=70;
    function step(){ target.textContent=full.slice(0,idx); idx++; if(idx<=full.length) setTimeout(step,speed); }
    step();
  })();

})(); 
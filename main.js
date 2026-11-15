// ── Analítica: no-op hasta que se cargue GA4 (gtag) o Plausible ──
function track(name, props) {
  if (typeof window.gtag === 'function') window.gtag('event', name, props || {});
  if (typeof window.plausible === 'function') window.plausible(name, { props: props || {} });
}
document.querySelectorAll('.js-wa').forEach(a => a.addEventListener('click', () => track('whatsapp_click')));

// ── Nav: oscuro sobre hero, claro sobre contenido ──
const nav = document.getElementById('nav');
const hero = document.getElementById('inicio');
const navIO = new IntersectionObserver(([e]) => {
  nav.classList.toggle('nav-dark', e.isIntersecting);
}, { rootMargin: '-76px 0px 0px 0px', threshold: 0 });
navIO.observe(hero);

// ── Menú móvil ──
const navBtn = document.getElementById('navBtn');
const navMobile = document.getElementById('navMobile');
function setMenu(open) {
  navMobile.classList.toggle('open', open);
  navBtn.setAttribute('aria-expanded', String(open));
  navBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  if (open) nav.classList.remove('nav-dark');
}
navBtn.addEventListener('click', () => setMenu(!navMobile.classList.contains('open')));
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ── Formulario (Web3Forms) ──
const cform = document.getElementById('cform');
const fBtn = document.getElementById('fBtn');
const fStatus = document.getElementById('fStatus');
const TIPOS = { software: 'Desarrollo de software', datos: 'Ingeniería de datos', integraciones: 'Integraciones y automatización', otro: 'Otro tipo de proyecto' };
const COOLDOWN_MS = 30000;
let lastSent = 0;

// Mensaje de error fijo, construido con nodos del DOM (sin innerHTML).
function showError(text) {
  fStatus.replaceChildren(document.createTextNode(text + ' Escribime por '));
  const a = document.createElement('a');
  a.href = 'https://wa.me/5492346331233';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = 'WhatsApp';
  fStatus.append(a, '.');
}

cform.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Normalización: recorta espacios y descarta caracteres de control (excepto saltos de línea en el mensaje).
  const clean = (v, keepNl) => String(v || '').replace(keepNl ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '').trim();
  ['nombre', 'email', 'msg'].forEach(id => { const el = document.getElementById(id); el.value = clean(el.value, id === 'msg'); });

  if (!cform.checkValidity()) {
    fStatus.textContent = 'Revisá los campos marcados para enviar.';
    cform.reportValidity();
    return;
  }
  const fd = new FormData(cform);
  const tipo = fd.get('tipo_proyecto');
  if (!Object.prototype.hasOwnProperty.call(TIPOS, tipo)) {
    fStatus.textContent = 'Elegí un tipo de proyecto válido.';
    return;
  }
  if (!fd.get('h-captcha-response')) {
    fStatus.textContent = 'Completá la verificación antes de enviar.';
    return;
  }
  if (Date.now() - lastSent < COOLDOWN_MS) {
    fStatus.textContent = 'Ya recibí tu consulta. Esperá unos segundos para enviar otra.';
    return;
  }

  fBtn.disabled = true;
  fBtn.textContent = 'Enviando…';
  fStatus.textContent = '';
  try {
    fd.set('message', 'Tipo de proyecto: ' + TIPOS[tipo] + '\n\n' + fd.get('msg'));
    fd.delete('msg');
    fd.set('replyto', fd.get('email'));
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) throw new Error('submit_failed'); // el detalle no se muestra al usuario
    lastSent = Date.now();
    cform.reset();
    fStatus.textContent = 'Consulta enviada. Gracias por escribir.';
    track('form_submit', { tipo_proyecto: tipo });
  } catch {
    showError('No se pudo enviar.');
  } finally {
    if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') window.hcaptcha.reset();
    fBtn.disabled = false;
    fBtn.textContent = 'Enviar consulta';
  }
});

const $ = (s) => document.querySelector(s);
const consoleEl = $('#console code');
const log = (line) => { consoleEl.textContent += `\n${line}`; };

$('#loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = $('#user').value.trim();
  const pin  = $('#pin').value.trim();
  try{
    const r = await fetch('/login', {
      method:'POST',
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ user, pin })
    });
    const data = await r.json();
    const len  = r.headers.get('X-PIN-Length');
    const hash = r.headers.get('X-PIN-Hash');
    log(`POST /login → ${JSON.stringify(data)}  |  X-PIN-Length:${len}  X-PIN-Hash:${hash}`);
  }catch(err){
    log(`erro: ${err.message}`);
  }
});

$('#vaultForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pin = $('#pin2').value.trim();
  try{
    // tenta header; se vazio, tenta sem
    const headers = {};
    if (pin) headers['X-PIN'] = pin;

    const r = await fetch(pin ? `/vault?pin=${encodeURIComponent(pin)}` : '/vault', { headers });
    const data = await r.json();
    const xflag = r.headers.get('X-Flag');
    log(`GET /vault → ${JSON.stringify(data)}${xflag ? `  |  X-Flag:${xflag}` : ''}`);
  }catch(err){
    log(`erro: ${err.message}`);
  }
});

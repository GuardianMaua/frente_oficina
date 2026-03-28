const $ = (s) => document.querySelector(s);

function log(targetSelector, line){
  const code = document.querySelector(targetSelector + ' code');
  code.textContent += `\n${line}`;
}

// Assinatura simples (não é dica)
(() => {
  const _sig = 'app:CTFWEB01 ui@2.0';
  // console.log(_sig);
})();

// Desbloquear (encontra a FLAG ao enviar o code correto)
$('#unlockForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = $('#code').value.trim();
  try{
    const r = await fetch('/unlock', {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body: new URLSearchParams({ code })
    });
    const data = await r.json();
    log('#console', `POST /unlock → ${JSON.stringify(data)}`);
    const xflag = r.headers.get('X-Flag');
    if (xflag) log('#console', `X-Flag: ${xflag}`);
  }catch(err){
    log('#console', `Erro: ${err.message}`);
  }
});

// Validar FLAG (compara com a do servidor)
$('#flagForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const flag = $('#flag').value.trim();
  try{
    const r = await fetch('/submit-flag', {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body: new URLSearchParams({ flag })
    });
    const data = await r.json();
    log('#flagConsole', `POST /submit-flag → ${JSON.stringify(data)}`);
  }catch(err){
    log('#flagConsole', `Erro: ${err.message}`);
  }
});

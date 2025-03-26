document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const views = {
      login: document.getElementById('login-view'),
      recover: document.getElementById('recover-view'),
      code: document.getElementById('code-view')
    };
    
    const forms = {
      login: document.getElementById('login-form'),
      recover: document.getElementById('recover-form'),
      code: document.getElementById('code-form')
    };
    
    const messages = {
      login: document.getElementById('message'),
      recover: document.getElementById('recover-message'),
      code: document.getElementById('code-message')
    };
    
    const flagContainer = document.getElementById('flag-container');
    const codeHint = document.getElementById('code-hint');
  
    // Variáveis de estado
    let currentEmail = '';
  
    // Mostrar view específica
    function showView(viewName) {
      Object.values(views).forEach(view => view.classList.remove('active'));
      views[viewName].classList.add('active');
    }
  
    // Manipulador de login
    forms.login.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Erro no login');
        }
  
        if (data.isAdmin) {
          flagContainer.style.display = 'block';
          flagContainer.innerHTML = `
            <h3>🎉 Parabéns! 🎉</h3>
            <p>Flag: ${data.flag}</p>
          `;
        }
  
        messages.login.textContent = data.isAdmin 
          ? 'Login bem-sucedido como admin!' 
          : 'Login bem-sucedido!';
      } catch (error) {
        messages.login.textContent = error.message;
      }
    });
  
    // Manipulador de recuperação de senha
    forms.recover.addEventListener('submit', async (e) => {
      e.preventDefault();
      currentEmail = document.getElementById('recover-email').value;
  
      try {
        const response = await fetch('/api/recover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: currentEmail })
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Erro ao recuperar senha');
        }
  
        codeHint.textContent = data.hint;
        showView('code');
      } catch (error) {
        messages.recover.textContent = error.message;
      }
    });
  
    // Manipulador de verificação de código
    forms.code.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = document.getElementById('code').value;
  
      try {
        const response = await fetch('/api/verify-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            email: currentEmail, 
            code 
          })
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Código inválido');
        }
  
        // Preenche automaticamente a senha se voltar para login
        document.getElementById('email').value = currentEmail;
        document.getElementById('password').value = data.password;
        
        messages.login.textContent = data.isAdmin
          ? 'Código correto! Agora você pode fazer login como admin.'
          : 'Código correto! Senha preenchida automaticamente.';
  
        showView('login');
      } catch (error) {
        messages.code.textContent = error.message;
      }
    });
  
    // Botões de navegação
    document.getElementById('recover-btn').addEventListener('click', () => {
      showView('recover');
      messages.recover.textContent = '';
    });
  
    document.getElementById('back-btn').addEventListener('click', () => {
      showView('login');
    });
  
    document.getElementById('cancel-btn').addEventListener('click', () => {
      showView('login');
    });
  });
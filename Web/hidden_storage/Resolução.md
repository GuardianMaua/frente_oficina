# 🏴 CTF – Resolução

Este documento descreve o passo a passo para resolver o desafio de segurança proposto, desde o acesso inicial até a captura das duas flags.

---

### 🔑 Passo 1: Acesso Inicial (Criar Conta e Fazer Login)

1.  Acesse a página inicial (`/`).
2.  Como você não possui uma conta, clique em **Criar Conta**.
3.  Registre um usuário com credenciais de sua escolha (exemplo: `jogador` / `senha123`).
4.  Após o registro, volte para a página inicial e faça login com a conta recém-criada.

---

### 🕵️‍♂️ Passo 2: A Pista Escondida

1.  Ao fazer login, você será redirecionado para a página `/home.html`. A tela mostrará a mensagem de boas-vindas e um texto sutil:

    > A verdade nem sempre está na superfície.

2.  Essa frase é uma dica clássica para inspecionar os elementos da página. Pressione **`F12`** (ou `Ctrl+Shift+I` / `Cmd+Option+I`) para abrir as **Ferramentas de Desenvolvedor** do seu navegador.

3.  Clique na aba **"Console"**. Lá, você encontrará uma mensagem secreta, deixada intencionalmente pelos desenvolvedores:
    ```
    🕵️‍♂️ Uma dica para você: Psst... parece que os desenvolvedores deixaram um endpoint de 'armazenamento' de dados ativo. Tente encontrá-lo.
    ```

---

### 🔓 Passo 3: Descoberta da Vulnerabilidade e da Primeira Flag

1.  A dica do console aponta para um endpoint chamado "armazenamento". A forma mais comum de acessar um endpoint de API é diretamente pela URL.
2.  Navegue no seu browser para o seguinte endereço: `/api/armazenamento`.
3.  Você receberá uma resposta em formato JSON contendo todos os dados do "banco de dados" da aplicação. Analisando o conteúdo, você encontrará duas informações cruciais:

    - Um log de sistema contendo a **primeira flag**.
    - As credenciais do usuário **admin**.

    ```json
    {
      "data": [
        {
          "username": "system_log",
          "info": "Primeira parte da chave encontrada",
          "flag": "FLAG{D4D0S_V4Z4D0S_N4_API}"
        },
        {
          "username": "admin",
          "password": "12345678"
        },
        {
          "username": "jogador",
          "password": "senha123"
        }
      ]
    }
    ```

---

### 🏁 Passo 4: Acesso Administrativo e a Flag Final

1.  Agora que você tem as credenciais do administrador, volte para a página inicial (`/`) e faça logout da sua conta `jogador`.
2.  Faça login utilizando as credenciais descobertas:
    - **Usuário:** `admin`
    - **Senha:** `12345678`
3.  Ao logar como `admin`, a página home exibirá uma mensagem de sucesso junto com a **segunda e última flag**.

---

## 🎉 Flags Encontradas

- **Flag 1 (Encontrada na API):**
  `FLAG{D4D0S_V4Z4D0S_N4_API}`

- **Flag 2 (Recebida após login de admin):**
  `FLAG{4C3SS0_4DMIN_C0NQU1ST4D0}`

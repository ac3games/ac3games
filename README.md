# AC3games // Official Game Studio & Geometry Franchise Hub

> Portal oficial da desenvolvedora de jogos **AC3games**, estúdio criador da inovadora **Franquia Geometry** (*Geometry Platforms*, *Geometry Space*, *Geometry Arena* e *Geometry Tactics*).

Inspirado na arquitetura e estética de portais de jogos modernos como o **Amazon Luna**, o portal oferece:
- **Showcase de Jogos**: Apresentação cinematográfica de *Geometry Platforms* e teasers do Roadmap 2027.
- **Biblioteca Digital & Codex 16:9**: Acervo interativo completo de arte procedural com renderização direta em Canvas 2D a 60 FPS (Drones da Forja Suprema, Matriz Sensorial HUD de Expressões, Auras de Bioma com plataformas de risco, Chassis de naves e Balística).
- **Inspeção & Exportação**: Modal de visualização 16:9 widescreen e download de renders oficiais em alta resolução (1920x1080 PNG).
- **Telemetria & Leaderboards com Supabase**: Conexão com banco de dados PostgreSQL na nuvem para pontuações mundiais.
- **Pronto para Vercel & Domínio Próprio**: Deploy gratuito com SSL automático e configuração instantânea de DNS.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19 + TypeScript + Vite 6
- **Estilização**: Tailwind CSS v3 (tema customizado Cyberpunk Neon)
- **Renderização Gráfica**: HTML5 Canvas 2D Procedural (fórmulas vetoriais fiéis do jogo)
- **Banco de Dados**: Supabase (PostgreSQL + RLS + API REST)
- **Hospedagem & CI/CD**: Vercel (Hobby Tier 100% gratuito)
- **Controle de Versão**: Git & GitHub (`ac3games-dev/ac3games`)

---

## 💻 Como Rodar Localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000`

3. **Gerar build de produção**:
   ```bash
   npm run build
   ```

---

## 🗄️ Como Conectar o Supabase (Opcional para Telemetria Real)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com).
2. Crie um novo projeto chamado `ac3games`.
3. Abra o **SQL Editor** no painel do Supabase, cole e execute o script contido em `supabase/schema.sql`.
4. Copie a **URL do Projeto** e a **Chave anônima (anon public key)** em *Project Settings > API*.
5. Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
   ```

*(Nota: O portal possui fallback inteligente para modo demonstração se o Supabase não estiver configurado).*

---

## 🌐 Como Fazer Deploy na Vercel (100% Gratuito)

1. Acesse [vercel.com](https://vercel.com) e conecte com seu GitHub.
2. Clique em **"Add New Project"** e selecione o repositório `ac3games-dev/ac3games`.
3. Mantenha as configurações padrão (Framework Preset: **Vite**).
4. *(Opcional)* Em **Environment Variables**, adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
5. Clique em **"Deploy"**. Seu site estará no ar em menos de 1 minuto com link `https://ac3games.vercel.app`!

---

## 🎯 Como Apontar para Seu Domínio Próprio

1. No painel da Vercel, acesse seu projeto e vá em **Settings > Domains**.
2. Digite seu domínio registrado (ex: `ac3games.com` ou `ac3games.dev`).
3. A Vercel exibirá 2 apontamentos DNS simples:
   - Tipo **A** apontando para `76.76.21.21`
   - Tipo **CNAME** (`www`) apontando para `cname.vercel-dns.com`
4. Adicione esses registros no painel onde você comprou o domínio. Pronto! O certificado SSL é emitido automaticamente.

---

© 2026 AC3games. Todos os direitos reservados.

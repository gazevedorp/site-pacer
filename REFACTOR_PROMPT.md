# 🚀 Prompt Mestre — Refatoração Site Pacer (Multi-Agent)

> **Stack alvo:** React 19 + Vite 7 + TypeScript 5.9 + TailwindCSS 4 + Framer Motion 12 + React Router 7 + Aceternity UI + Lenis (smooth scroll) + Radix UI + Lucide.
> **Padrões:** Mobile-first, A11y AA, Core Web Vitals verde (LCP < 2.5s, CLS < 0.1, INP < 200ms), code-splitting por rota, animações performáticas (transform/opacity, `will-change` controlado), prefers-reduced-motion respeitado.

---

## 🧭 Diretrizes Globais (válidas para TODOS os agentes)

```yaml
arquitetura:
  routing: react-router-dom v7 com lazy() + Suspense por página
  estado: hooks locais; Context apenas se >2 níveis de prop drilling
  data: arquivos em src/data/*.ts tipados; nunca hardcode em componente
  estilo: Tailwind v4 (@theme inline); zero CSS-in-JS; tokens de design centralizados
  motion: framer-motion + Aceternity primitives; Lenis no root (App.tsx)
  imagens: <img loading="lazy" decoding="async"> + width/height; AVIF/WebP; srcset

regras_visuais:
  - Mobile-first: design 360px → 768px → 1024px → 1440px
  - Layout desktop NUNCA é apenas "esticado"; recompor grid/spacing
  - Hierarquia tipográfica fluida (clamp())
  - Contraste mínimo 4.5:1
  - Toques mínimo 44x44px em mobile

performance:
  - Code split por rota (React.lazy)
  - Prefetch de rota no hover do link
  - Imagens com aspect-ratio reservado (sem CLS)
  - Animações em transform/opacity (GPU)
  - Lenis com `lerp: 0.1` e `wheelMultiplier` ajustado; pausar em modais
  - Bundle: tree-shake lucide-react (import nomeado), sem moment/lodash inteiro

acessibilidade:
  - Landmarks semânticos (<header>, <main>, <nav>, <section aria-label>)
  - Foco visível custom (ring-2 ring-offset-2)
  - prefers-reduced-motion: usar hook useReducedMotion() do framer-motion
  - Forms com <label> associado, aria-describedby para erros

entregáveis_por_pagina:
  - 1 componente Page em src/pages/
  - Sections em src/components/sections/<Page>/
  - Tipos em src/types/<page>.ts
  - Mock data em src/data/<page>.ts
  - Testes visuais: snapshot 360px e 1440px
```

---

## 🤖 Agentes Especializados

Cada agente recebe **contexto global + briefing específico**. Invoque um agente por página usando o template no fim deste documento.

---

### 🏗️ Agent 1 — `@architect` (Orquestrador)

**Persona:** Tech Lead Frontend Sênior, especialista em React 19 + Vite + design systems escaláveis.

**Missão:** Antes de qualquer página ser construída, este agente define:

1. Estrutura de pastas final (`src/pages`, `src/components/sections/<Page>`, `src/components/ui`, `src/hooks`, `src/data`, `src/types`).
2. Tokens de design no `index.css` via `@theme` (cores Pacer, tipografia Abel/CocoPuff, spacing scale, radius, shadows, easings).
3. Setup do **Lenis** global em `App.tsx` com `useLenis` hook reutilizável + integração com `framer-motion` scroll triggers.
4. Wrapper Aceternity (`<BackgroundBeams>`, `<Spotlight>`, `<HoverEffect>`, `<BentoGrid>`) tipados e aplicáveis.
5. `<PageShell>` com Header/Footer + transição entre rotas (`AnimatePresence` mode="wait").
6. Skeleton/Loading boundary por rota.

**Output esperado:** PR com fundação + ADR (Architecture Decision Record) curto em comentário.

---

### 🏠 Agent 2 — `@home-builder`

**Persona:** UI Designer-Developer focado em conversão e storytelling visual.

**Briefing:**
```
Página: / (Home)
Objetivo de negócio: vitrine + captação rápida (lead → WhatsApp)
KPIs visuais: hero acima da dobra <2.5s, scroll fluido sem jitter
```

**Seções (ordem):**
1. **Hero** — Vídeo/imagem fullbleed + headline H1 com efeito Aceternity `TextGenerateEffect` ou `Spotlight`. CTA primário "Agende sua aula" + secundário "Conheça as unidades". Variante mobile: poster + play on-demand (não autoplay vídeo pesado).
2. **Units (busca)** — Input CEP/Cidade com máscara, debounce 300ms, sugestões. Resultado em **grid de cards** (sem mapa). Card com foto, nome, endereço resumido, modalidades-chave, botão "Ver unidade".
3. **CTA bloco** — Faixa imersiva com `BackgroundBeams` ou `MovingBorder`, copy curta + botão WhatsApp.
4. **Plans destaque** — 3 cards lado a lado (mobile: scroll-snap horizontal). Card destacado com badge "Mais escolhido".
5. **Footer Preview** — CTA para `/contato` + ícones de redes sociais com `HoverEffect`.

**Restrições:**
- Sem tabelas de planos (apenas cards).
- LCP = imagem do Hero → use `fetchpriority="high"` + preload.

---

### 📍 Agent 3 — `@units-list-builder`

**Briefing:**
```
Rota: /unidades
Objetivo: encontrar academia mais próxima
```

**Componentes:**
- `<UnitsBanner>` — banner interno com título + breadcrumb + imagem.
- `<UnitsFilterBar>` — filtros combinados: `Cidade` (select), `Modalidade` (multi-chip), `Facilidades` (toggle group). URL state via `useSearchParams` para shareable links.
- `<UnitsGrid>` — cards responsivos (1/2/3/4 colunas). Cada card animado com `whileInView` stagger.
- Empty state ilustrado quando filtros sem resultado.

**A11y:** filtros como `<fieldset>` com `<legend>` sr-only.

---

### 🏢 Agent 4 — `@unit-detail-builder` (referência: Bodytech)

**Briefing:**
```
Rota: /unidades/:slug
Objetivo: vender a unidade específica e converter para WhatsApp local
```

**Seções:**
1. **Hero da Unidade** — Galeria (Aceternity `ImagesSlider` ou `ParallaxScroll`) + nome + endereço + horário. Botão sticky "Matricule-se" no mobile.
2. **Ícones de Estrutura** — Bento/grid de comodidades com ícones lucide (estacionamento, wifi, vestiário, lanchonete, ar-condicionado, etc.). Tooltip Radix com descrição.
3. **Modalidades Locais** — cards filtrados por unidade (dataset cruzado).
4. **Grade de Aulas (preview)** — recorte (próximas 6 aulas / hoje) + link "Ver grade completa" → `/aulas?unidade=<slug>`.
5. **Planos da Unidade** — cards exclusivos da unidade; CTA → WhatsApp local com mensagem pré-preenchida (`?text=`).

**Não inclui:** listagem de personais.

**SEO:** `<title>` dinâmico, OG tags, JSON-LD `LocalBusiness`/`SportsActivityLocation`.

---

### 🏋️ Agent 5 — `@modalities-builder`

**Briefing:**
```
Rotas:
  - /modalidades (listagem)
  - /modalidades/:slug (detalhe)
```

**Listagem:**
- Banner + dropdown filtro "Unidade".
- Grid de cards (foto + nome) com `HoverEffect` Aceternity.

**Detalhe:**
- Hero imersivo (foto larga full-bleed + título sobreposto).
- Bloco "Sobre" — benefícios, indicação, gasto calórico médio (tabela leve com ícones).
- "Onde encontrar" — lista/grid de unidades que oferecem, cada item linka para `/unidades/:slug`.

**Dado:** `src/data/modalities.ts` (já existe — estender schema com `benefits[]`, `caloriesAvg`, `availableUnits[]`).

---

### 🗓️ Agent 6 — `@schedule-builder`

**Persona:** UX Engineer especialista em data tables responsivas.

**Briefing:**
```
Rota: /aulas
Objetivo: visualização rápida da grade
```

**Comportamento:**
- **Filtro obrigatório inicial** (Unidade + Modalidade) — sem seleção, mostra estado "selecione para ver".
- **Desktop (≥1024px):** timeline fullscreen — grid 7 colunas (dias) × linhas (horários), cards de aula com cor por modalidade. Sticky header de dias.
- **Mobile (<1024px):**
  - Carrossel horizontal de dias (Seg–Dom) com snap, dia ativo destacado.
  - Lista vertical scrollável abaixo: cards de aula (horário, modalidade, professor, sala).
- Estado salvo em URL (`?unidade=&modalidade=&dia=`).

**Performance:** virtualizar lista mobile se >50 itens (`react-virtuoso` opcional, mas só se necessário — preferir CSS containment).

---

### 👤 Agent 7 — `@trainers-builder`

**Briefing:**
```
Rota: /personais
Objetivo: vitrine global de profissionais
```

**Componentes:**
- Banner + filtros (Cidade / Unidade / Modalidade).
- Grid de cards: foto, nome, mini-bio (2 linhas truncadas), badges de unidades de atuação, ícones de modalidade.
- **Bloco B2B final** — CTA "Quer ser Personal Parceiro? → Trabalhe Conosco" com visual diferenciado (gradient + `MovingBorder`).

---

### 💲 Agent 8 — `@plans-builder`

**Briefing:**
```
Rota: /planos
Objetivo: exibir planos padronizados da rede
```

**Seções:**
- Banner interno.
- **Vitrine de Planos** — cards isolados lado a lado, foco no CTA. Plano destacado com escala 1.05 + badge.
- **FAQ** — accordion Radix com 6–10 perguntas. Schema.org `FAQPage` JSON-LD.

**Sem tabela comparativa.** CTA leva ao WhatsApp central com mensagem pré-preenchida do plano clicado.

---

### 🤝 Agent 9 — `@careers-builder`

**Briefing:**
```
Rota: /trabalhe-conosco
Objetivo: captar talentos
```

**Seções:**
1. Banner com imagem da equipe.
2. **Diferenciais** — bento de ícones (plano de carreira, ambiente, benefícios, treinamentos).
3. **Depoimentos** — carrossel/grid de cards (foto + texto + nome + cargo). Aceternity `InfiniteMovingCards`.
4. **Formulário** — Nome, Email, Telefone (mask), Área de Interesse (select: Recepção, Professor, Personal, Limpeza, Outro), Upload de currículo (PDF até 5MB) **OU** link LinkedIn (validação URL).
   - Validação client-side (zod opcional ou nativa).
   - Estado de loading/success/error.
   - Honeypot anti-spam + rate limit visual.

---

### 📞 Agent 10 — `@contact-builder`

**Briefing:**
```
Rota: /contato
Objetivo: atendimento, dúvidas, ouvidoria
```

**Seções:**
1. Banner interno acolhedor.
2. **Informações diretas** — bloco com email, telefones (tel:), WhatsApp central (wa.me), horário de atendimento. Ícones lucide.
3. **Formulário** — visualmente idêntico ao de Trabalhe Conosco, **mas com:**
   - Campo `Assunto` (select: Dúvida, Cancelamento, Reclamação, Elogio, Outro).
   - Campo `Mensagem` (textarea 500 chars com contador).
   - Sem upload.

**Reuso:** extrair `<ContactFormBase>` compartilhado, com prop `variant: 'careers' | 'contact'`.

---

## 🎛️ Agent 11 — `@qa-perf` (Validador final)

**Persona:** SRE/Performance Engineer.

**Checklist obrigatório antes de aceitar qualquer PR de página:**

- [ ] Lighthouse mobile ≥ 90 em Performance, A11y, Best Practices, SEO.
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms (medido em throttled 4G).
- [ ] `npm run build` sem warnings; bundle inicial < 180KB gzip.
- [ ] Sem `console.log` / `any` / `@ts-ignore`.
- [ ] Imagens com `width`+`height` ou `aspect-ratio`.
- [ ] Lenis não conflita com modais/dropdowns (testar foco).
- [ ] `prefers-reduced-motion` desativa animações decorativas.
- [ ] Navegação por teclado completa em todos os fluxos.
- [ ] Testado em iPhone SE (375px) e desktop 1440px.

---

## 🧩 Template de Invocação por Página

```
@architect — confirme fundação pronta (Lenis + tokens + PageShell + lazy routes).

Em seguida, execute em paralelo onde não houver dependência:
@home-builder      → / 
@units-list-builder → /unidades
@unit-detail-builder → /unidades/:slug   (depende de units-list)
@modalities-builder → /modalidades + /modalidades/:slug
@schedule-builder   → /aulas             (depende de units + modalities)
@trainers-builder   → /personais
@plans-builder      → /planos
@careers-builder    → /trabalhe-conosco
@contact-builder    → /contato

Ao final, @qa-perf valida cada rota contra o checklist e gera relatório.

Para CADA agente, siga este protocolo:
1. RESEARCH — leia componentes existentes em src/components/sections/ e reuse o que servir.
2. PLAN — liste arquivos a criar/editar antes de codar.
3. IMPLEMENT — escreva código completo, tipado, com mock data realista.
4. POLISH — adicione animações Aceternity/Framer com moderação.
5. SELF-REVIEW — rode o checklist do @qa-perf na própria entrega.
```

---

## 📐 Padrões de Código (snippets de referência)

**Lenis no root:**
```tsx
// src/App.tsx
import Lenis from 'lenis';
useEffect(() => {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);
```

**Lazy route:**
```tsx
const HomePage = lazy(() => import('./pages/HomePage'));
// <Suspense fallback={<PageSkeleton />}><HomePage /></Suspense>
```

**Section animada:**
```tsx
<motion.section
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-10%' }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

---

**Resumo:** este prompt transforma a refatoração em pipeline multi-agente, com responsabilidades isoladas, contratos claros, mobile-first como lei, e validação objetiva por métricas — não por opinião.

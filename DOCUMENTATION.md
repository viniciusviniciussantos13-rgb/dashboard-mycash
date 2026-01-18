# mycash+ — Documentação

## Progresso
- [x] PROMPT 0: Análise e Planejamento Inicial
- [x] PROMPT 1: Estrutura Base e Configuração
- [x] PROMPT 2: Sistema de Layout e Navegação Desktop
- [ ] PROMPT 3: Sistema de Layout e Navegação Mobile
- [ ] PROMPT 4: Context Global e Gerenciamento de Estado
- [ ] PROMPT 5: Cards de Resumo Financeiro
- [ ] PROMPT 6: Header do Dashboard com Controles
- [ ] PROMPT 7: Carrossel de Gastos por Categoria
- [ ] PROMPT 8: Gráfico de Fluxo Financeiro
- [ ] PROMPT 9: Widget de Cartões de Crédito
- [ ] PROMPT 10: Widget de Próximas Despesas
- [ ] PROMPT 11: Tabela de Transações Detalhada
- [ ] PROMPT 12: Modal de Nova Transação
- [ ] PROMPT 13: Modal de Adicionar Membro
- [ ] PROMPT 14: Modal de Adicionar Cartão
- [ ] PROMPT 15: Modal de Detalhes do Cartão
- [ ] PROMPT 16: Modal de Filtros Mobile
- [ ] PROMPT 17: View Completa de Cartões
- [ ] PROMPT 18: View Completa de Transações
- [ ] PROMPT 19: View de Perfil - Aba Informações
- [ ] PROMPT 20: View de Perfil - Aba Configurações
- [ ] PROMPT 21: Animações e Transições Globais
- [ ] PROMPT 22: Formatação e Utilitários
- [ ] PROMPT 23: Responsividade e Ajustes Finais
- [ ] PROMPT 24: Testes e Validação Final
- [ ] PROMPT FINAL: Revisão e Entrega

---

## PROMPT 0: Análise e Planejamento Inicial

**Status:** ✅ | **Data:** 16/01/2025 | **Build:** N/A (análise)

### 📋 Análise Realizada

#### 1. Componentes Visuais Identificados

**Sidebar (Desktop - ≥1280px):**
- Logo "Mycash+" (componente: `Logo`)
- Menu de navegação com itens:
  - Home (ativo, destacado em verde)
  - Cartões
- Informações do usuário:
  - Avatar do usuário (`Members`)
  - Nome do usuário (`Usuario`)
  - Email do usuário (`EMailUsuario`)
- Botão de colapsar/expandir sidebar

**Header/Navbar (Top Bar):**
- Campo de busca (`Search`)
- Botão de filtros/configurações
- Seletor de período (calendário)
- Avatares de membros (`Members` - múltiplos)
- Botão "Nova transação" (CTA principal)

**Cards de Categorias de Despesas (Top Row):**
- 4 cards (`CardDespesa`):
  - Aluguel (25%, R$ 4.000,00)
  - Alimentação (15%, R$ 2.000,00)
  - Mercado (5%, R$ 1.500,00)
  - Academia (3%, R$ 120,00)
- Cada card contém: gráfico circular de progresso, porcentagem, nome da categoria, valor

**Cards de Resumo Financeiro (Middle Row):**
- 3 cards (`resumo saldo`):
  - Saldo Total (R$ 22.000,00, ícone $, cor azul)
  - Receitas (R$ 12.000,00, ícone seta para baixo, cor vermelha)
  - Despesas (R$ 10.000,00, ícone seta para cima, cor verde)

**Cards/Contas (Right Column):**
- Container (`InfoBank`)
- Header com título, ícone e botões de ação
- Lista de contas/cartões:
  - Nubank (R$ 120,00, vence dia 10, **** 5877)
  - Inter (R$ 2.300,00, vence dia 21, **** 5877)
  - Picpay (R$ 17.00,00, vence dia 12, **** 5877)

**Próximas Despesas (Right Column):**
- Container com lista de despesas
- Cada item contém:
  - Título da despesa
  - Data de vencimento
  - Informação do cartão
  - Valor (R$ 154,00)
  - Checkbox de confirmação (`Check`)

**Fluxo Financeiro (Chart):**
- Gráfico de área com duas linhas
- Legenda: Receitas (amarelo) e Despesas (vermelho)
- Eixo Y: valores de R$ 0 a R$ 17.500
- Eixo X: meses de JAN a DEZ
- Área preenchida com gradientes

**Extrato Detalhado (Table):**
- Header com título, busca e filtro
- Tabela com colunas:
  - Membro (avatar)
  - Categorias
  - Datas
  - Descrição (com ícone de seta)
  - Conta/cartão
  - Parcelas
  - Valor
- Paginação (`Pagination`) com controles de navegação

#### 2. Hierarquia Visual e Relações

**Estrutura Principal:**
```
Home Dashboard
├── Sidebar (300px fixo no desktop)
│   ├── Logo
│   ├── Menu (Home, Cartões)
│   └── User Info
└── Main Content Area (fluido)
    ├── Navbar (Header)
    ├── Grid Top Section
    │   ├── Cards de Despesas (4 cards)
    │   └── Cards de Resumo (3 cards)
    ├── Grid Middle Section
    │   ├── Fluxo Financeiro (esquerda)
    │   ├── Cards/Contas (direita)
    │   └── Próximas Despesas (direita)
    └── Extrato Detalhado (full width)
```

**Estados Identificados:**
- Sidebar: expandida (padrão no desktop)
- Menu item "Home": ativo (fundo verde `#d7ff00`)
- Menu item "Cartões": inativo

#### 3. Variáveis do Design System

**Cores — Primitivas:**
- `color/neutral/0`: `#ffffff` (branco)
- `color/neutral/100`: `#f9fafb` (fundo cinza claro)
- `color/neutral/300`: `#e5e7eb` (bordas cinza claro)
- `color/neutral/400`: `#d1d3db` (cinza médio)
- `color/neutral/500`: `#9ca3af` (cinza)
- `color/neutral/900`: `#1f2937` (cinza escuro)
- `color/neutral/1100`: `#080b12` (preto/cinza muito escuro)
- `color/blue/600`: `#2a89ef` (azul - Saldo Total)
- `color/red/600`: `#e61e32` (vermelho - Receitas)
- `color/green/600`: `#15be78` (verde - Despesas)

**Cores — Semânticas:**
- `Colors/Primary/primary-500`: `#D7FF00` (verde primário - ativo)
- `Colors/Surface/surface-500`: `#FFFFFF` (superfície branca)
- `Colors/Secondary/secondary-50`: `#E7E8E9` (cinza secundário)
- `color/brand/700`: `#c4e703` (verde marca)

**Espaçamento — Primitivas:**
- `space/0`: `0px`
- `space/2`: `2px`
- `space/4`: `4px`
- `space/8`: `8px`
- `space/12`: `12px`
- `space/16`: `16px`
- `space/20`: `20px`
- `space/24`: `24px`
- `space/32`: `32px`
- `space/56`: `56px`
- `space/72`: `72px`

**Shape/Border Radius:**
- `shape/2`: `2px`
- `shape/20`: `20px`
- `shape/100`: `100px` (totalmente arredondado)

**Size:**
- `size/20`: `20px`

**Tipografia:**
- `Label/Large`: Font(Inter, Semi Bold, 18px, weight 600, lineHeight 24, letterSpacing 0.3px)
- `Label/Medium`: Font(Inter, Semi Bold, 16px, weight 600, lineHeight 20, letterSpacing 0.3px)
- `Label/Small`: Font(Inter, Semi Bold, 14px, weight 600, lineHeight 16, letterSpacing 0.3px)
- `Label/X-Small`: Font(Inter, Semi Bold, 12px, weight 600, lineHeight 16, letterSpacing 0.3px)
- `Heading/Medium`: Font(Inter, Bold, 28px, weight 700, lineHeight 36)
- `Heading/Small`: Font(Inter, Bold, 24px, weight 700, lineHeight 32)
- `Heading/X-Small`: Font(Inter, Bold, 20px, weight 700, lineHeight 28)
- `Paragraph/Large`: Font(Inter, Regular, 18px, weight 400, lineHeight 28, letterSpacing 0.3px)
- `Paragraph/Small`: Font(Inter, Regular, 14px, weight 400, lineHeight 20, letterSpacing 0.3px)
- `Paragraph/X-Small`: Font(Inter, Regular, 12px, weight 400, lineHeight 20, letterSpacing 0.3px)

#### 4. Estrutura de Navegação

**Desktop (≥1280px):**
- Sidebar visível à esquerda (300px de largura)
- Conteúdo principal empurrado para a direita (margin-left: 300px)
- Sidebar possui botão de colapsar/expandir

**Mobile/Tablet (<1280px):**
- Sidebar não renderiza
- Header mobile aparece (a ser implementado)
- Navegação via drawer/overlay

**Transições:**
- Estado expandido: sidebar com texto completo (300px)
- Estado colapsado: sidebar apenas com ícones (largura reduzida)

#### 5. Arquitetura Proposta

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── NavItem.tsx
│   │   │   └── UserInfo.tsx
│   │   ├── HeaderMobile/          # Mobile/Tablet (<1280px)
│   │   │   ├── HeaderMobile.tsx
│   │   │   └── Drawer.tsx
│   │   └── MainContainer/         # Wrapper fluido
│   │       └── MainContainer.tsx
│   ├── dashboard/
│   │   ├── CategoryCard/          # Card de categoria (Aluguel, etc)
│   │   ├── SummaryCard/           # Cards de resumo (Saldo, Receitas, Despesas)
│   │   ├── FinancialFlow/         # Gráfico de fluxo financeiro
│   │   ├── AccountsCard/          # Cards/Contas
│   │   ├── UpcomingExpenses/      # Próximas despesas
│   │   └── TransactionTable/      # Extrato detalhado
│   ├── shared/
│   │   ├── Search/
│   │   ├── Members/               # Avatar de membros
│   │   ├── InfoBank/              # Item de conta/cartão
│   │   ├── Check/                 # Checkbox customizado
│   │   └── Pagination/
│   └── ui/                        # Componentes básicos reutilizáveis
├── pages/
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   ├── Cards.tsx
│   └── Profile.tsx
├── hooks/                         # Lógica de negócio
│   ├── useSidebar.ts             # Estado sidebar (expand/collapse)
│   └── useTransactions.ts        # Lógica de transações
├── services/                      # Chamadas API (Supabase)
├── styles/
│   ├── tokens.css                # Variáveis CSS (semânticas + primitivas)
│   └── global.css                # Estilos globais
└── types/
    └── index.ts                   # TypeScript types
```

**Estratégia de Componentização:**
- Componentes atômicos: `Search`, `Members`, `Check`, etc.
- Componentes compostos: `CategoryCard`, `SummaryCard`, etc.
- Componentes de layout: `Sidebar`, `MainContainer`
- Páginas: apenas compõem componentes, sem lógica

**Responsividade:**
- Mobile-first approach
- Breakpoints: 768px (tablet), 1280px (desktop), 1920px (wide)
- Grids adaptativos: 1 col (mobile), 2 cols (tablet), 3-4 cols (desktop)
- Sidebar: não renderiza em mobile/tablet

### 🎨 Tokens Identificados

**Semânticas:**
- `--color-primary-500`
- `--color-surface-500`
- `--color-brand-700`
- `--color-neutral-0`, `--color-neutral-100`, etc.

**Primitivas:**
- `--space-{2,4,8,12,16,20,24,32,56,72}`
- `--shape-{2,20,100}`
- `--size-20`
- Tipografia conforme tokens acima

### 📁 Arquivos a Criar

Estrutura será criada conforme os prompts subsequentes.

### 🔨 Build

N/A - Análise apenas

### 💾 Commit

N/A - Análise apenas

---

## PROMPT 1: Estrutura Base e Configuração

**Status:** ✅ | **Data:** 16/01/2025 | **Build:** ✅ (1 tentativa)

### Implementado
- Estrutura de pastas seguindo arquitetura React organizada por domínio
- Configuração do Vite com path aliases (@/, @/components, etc)
- Configuração do TypeScript com strict mode e path mapping
- Configuração do Tailwind CSS com tokens do Figma mapeados
- Configuração do PostCSS com autoprefixer
- Tipos TypeScript fundamentais: Transaction, Goal, CreditCard, BankAccount, FamilyMember
- React Router configurado com 4 rotas principais (Dashboard, Transactions, Cards, Profile)
- Páginas base criadas (placeholders)
- Constantes de categorias e rotas
- Estilos globais com classes utilitárias de layout fluido
- ESLint configurado para React + TypeScript
- README.md com documentação inicial

### Tokens

**Semânticas:**
- `--color-primary-500`: `#D7FF00` (verde primário)
- `--color-surface-500`: `#FFFFFF` (superfície branca)
- `--color-secondary-50`: `#E7E8E9` (cinza secundário)
- `--color-brand-700`: `#c4e703` (verde marca)

**Primitivas:**
- `--color-neutral-{0,100,300,400,500,900,1100}`
- `--color-blue-600`: `#2a89ef`
- `--color-red-600`: `#e61e32`
- `--color-green-600`: `#15be78`
- `--space-{0,2,4,8,12,16,20,24,32,56,72}`
- `--shape-{2,20,100}`
- Tipografia: Label, Heading, Paragraph (diversos tamanhos)

**Mapeamento no Tailwind:**
- Cores: `neutral-*`, `primary-*`, `blue-*`, `red-*`, `green-*`, `surface-*`, `brand-*`
- Espaçamento: `space-*` usando tokens do Figma
- Border radius: `shape-2`, `shape-20`, `shape-100`
- Font sizes: `label-*`, `heading-*`, `paragraph-*` com line-height e weight

### Build
Tentativas: 1 | Erros: 0 | Status: ✅ Sucesso

### 💾 Commit
**feat:** estrutura base e configuração inicial do projeto  
**Hash:** `8fac873`

### 📁 Arquivos Criados

**Configuração:**
- `package.json` - Dependências do projeto
- `tsconfig.json` - Configuração TypeScript
- `tsconfig.node.json` - Config TypeScript para Node
- `vite.config.ts` - Configuração Vite com path aliases
- `tailwind.config.js` - Config Tailwind com tokens Figma
- `postcss.config.js` - Config PostCSS
- `.eslintrc.cjs` - Config ESLint
- `.gitignore` - Arquivos ignorados pelo Git

**Código Fonte:**
- `src/main.tsx` - Entry point da aplicação
- `src/App.tsx` - Componente raiz com React Router
- `src/styles/index.css` - Estilos globais e Tailwind
- `src/types/index.ts` - Tipos TypeScript principais
- `src/pages/Dashboard.tsx` - Página Dashboard (placeholder)
- `src/pages/Transactions.tsx` - Página Transações (placeholder)
- `src/pages/Cards.tsx` - Página Cartões (placeholder)
- `src/pages/Profile.tsx` - Página Perfil (placeholder)
- `src/constants/categories.ts` - Categorias padrão
- `src/constants/routes.ts` - Constantes de rotas

**Documentação:**
- `README.md` - Documentação do projeto
- `index.html` - HTML base da aplicação

---

## PROMPT 2: Sistema de Layout e Navegação Desktop

**Status:** ✅ | **Data:** 16/01/2025 | **Build:** ✅ (2 tentativas)

### Implementado
- Componente Sidebar com estados expandido/colapsado
- Hook useSidebar para gerenciar estado (persiste em localStorage)
- Componente Logo com variantes default e small
- Componente NavItem com estados ativo/inativo e tooltips
- Componente UserInfo que adapta conforme estado da sidebar
- Botão toggle circular na borda direita da sidebar com ícone rotativo
- Transições suaves entre estados (300ms duration, ease-in-out)
- Tooltip que aparece ao passar mouse quando sidebar está colapsada (delay 300ms)
- Item ativo com fundo preto (neutral-1100), texto branco (surface-500) e ícone verde-limão (primary-500)
- MainContainer ajusta margin-left dinamicamente conforme estado da sidebar
- Sidebar visível apenas no desktop (≥1280px), oculta em mobile/tablet
- Integração com React Router para detectar rota ativa

### Tokens

**Semânticas utilizadas:**
- `primary-500`: `#D7FF00` (verde-limão - ícone ativo)
- `surface-500`: `#FFFFFF` (branco - texto em item ativo)
- `neutral-1100`: `#080b12` (preto - fundo item ativo)

**Primitivas utilizadas:**
- `neutral-100`, `neutral-300`, `neutral-1100` (bordas, hovers, texto)
- `space-{8,12,14,16,32,56}` (espaçamentos internos)
- `shape-100`: `100px` (border-radius pill)

**Conversões:**
- Nenhuma - todos os valores usam tokens do design system

### Build
Tentativas: 2 | Erros: 1 (import não usado corrigido) | Status: ✅ Sucesso

### 📁 Arquivos Criados

**Components:**
- `src/components/layout/Sidebar/Sidebar.tsx` - Componente principal da sidebar
- `src/components/layout/Sidebar/Logo.tsx` - Logo com variantes
- `src/components/layout/Sidebar/NavItem.tsx` - Item de navegação com tooltip
- `src/components/layout/Sidebar/UserInfo.tsx` - Informações do usuário
- `src/components/layout/MainContainer/MainContainer.tsx` - Container principal ajustável

**Hooks:**
- `src/hooks/useSidebar.ts` - Hook para gerenciar estado da sidebar

---

## PROMPT 3: Sistema de Layout e Navegação Mobile

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 4: Context Global e Gerenciamento de Estado

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 5: Cards de Resumo Financeiro

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 6: Header do Dashboard com Controles

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 7: Carrossel de Gastos por Categoria

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 8: Gráfico de Fluxo Financeiro

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 9: Widget de Cartões de Crédito

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 10: Widget de Próximas Despesas

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 11: Tabela de Transações Detalhada

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 12: Modal de Nova Transação

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 13: Modal de Adicionar Membro

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 14: Modal de Adicionar Cartão

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 15: Modal de Detalhes do Cartão

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 16: Modal de Filtros Mobile

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 17: View Completa de Cartões

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 18: View Completa de Transações

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 19: View de Perfil - Aba Informações

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 20: View de Perfil - Aba Configurações

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 21: Animações e Transições Globais

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 22: Formatação e Utilitários

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 23: Responsividade e Ajustes Finais

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT 24: Testes e Validação Final

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## PROMPT FINAL: Revisão e Entrega

**Status:** ⏳ | **Data:** - | **Build:** N/A

### Implementado
_Será preenchido durante implementação_

### Tokens
_Será preenchido durante implementação_

### Build
_Pendente_

---

## Estrutura da Sequência de Prompts

### Fase 1: Fundação (1-4)
- **PROMPT 1:** Estrutura Base e Configuração
- **PROMPT 2:** Sistema de Layout e Navegação Desktop
- **PROMPT 3:** Sistema de Layout e Navegação Mobile
- **PROMPT 4:** Context Global e Gerenciamento de Estado

### Fase 2: Componentes do Dashboard (5-11)
- **PROMPT 5:** Cards de Resumo Financeiro
- **PROMPT 6:** Header do Dashboard com Controles
- **PROMPT 7:** Carrossel de Gastos por Categoria
- **PROMPT 8:** Gráfico de Fluxo Financeiro
- **PROMPT 9:** Widget de Cartões de Crédito
- **PROMPT 10:** Widget de Próximas Despesas
- **PROMPT 11:** Tabela de Transações Detalhada

### Fase 3: Modais (12-16)
- **PROMPT 12:** Modal de Nova Transação
- **PROMPT 13:** Modal de Adicionar Membro
- **PROMPT 14:** Modal de Adicionar Cartão
- **PROMPT 15:** Modal de Detalhes do Cartão
- **PROMPT 16:** Modal de Filtros Mobile

### Fase 4: Views Completas (17-20)
- **PROMPT 17:** View Completa de Cartões
- **PROMPT 18:** View Completa de Transações
- **PROMPT 19:** View de Perfil - Aba Informações
- **PROMPT 20:** View de Perfil - Aba Configurações

### Fase 5: Polimento (21-22)
- **PROMPT 21:** Animações e Transições Globais
- **PROMPT 22:** Formatação e Utilitários

### Fase 6: Finalização (23-24 + FINAL)
- **PROMPT 23:** Responsividade e Ajustes Finais
- **PROMPT 24:** Testes e Validação Final
- **PROMPT FINAL:** Revisão e Entrega

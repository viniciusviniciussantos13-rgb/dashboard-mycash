# mycash+ - Gestão Financeira Familiar

Sistema de gestão financeira familiar desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **date-fns** - Manipulação de datas
- **Recharts** - Gráficos e visualizações

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar em Desenvolvimento

```bash
npm run dev
```

## 🏗️ Build para Produção

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/      # Componentes React organizados por domínio
│   ├── layout/     # Componentes de layout (Sidebar, Header)
│   ├── dashboard/  # Componentes específicos do Dashboard
│   ├── shared/     # Componentes compartilhados
│   └── ui/         # Componentes básicos reutilizáveis
├── contexts/       # Context Providers (FinanceContext)
├── hooks/          # Hooks customizados
├── pages/          # Páginas principais (Dashboard, Transactions, etc)
├── types/          # Definições TypeScript
├── utils/          # Funções utilitárias
├── constants/      # Constantes do sistema
└── styles/         # Estilos globais e tokens CSS
```

## 🎨 Design System

O projeto utiliza variáveis do Figma mapeadas no Tailwind CSS:

- **Cores Primitivas**: `neutral`, `blue`, `red`, `green`
- **Cores Semânticas**: `primary`, `surface`, `secondary`, `brand`
- **Espaçamento**: tokens de `space` (2px a 72px)
- **Tipografia**: sistema tipográfico baseado em Inter

## 📱 Responsividade

Breakpoints oficiais:
- **Mobile** (base): < 768px
- **Tablet**: ≥ 768px e < 1280px
- **Desktop**: ≥ 1280px e < 1920px
- **Wide/4K**: ≥ 1920px

## 🏗️ Status do Projeto

Este projeto está em desenvolvimento ativo. Consulte `DOCUMENTATION.md` para acompanhar o progresso dos prompts de implementação.

## 📝 Licença

Private project
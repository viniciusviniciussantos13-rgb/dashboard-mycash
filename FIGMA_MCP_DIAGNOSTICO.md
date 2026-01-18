# 🔧 Diagnóstico: Acesso ao Figma MCP

**Data:** 16/01/2025  
**Status:** ❌ Ferramentas MCP não disponíveis

---

## ❌ Problema Identificado

As ferramentas do Figma MCP não estão acessíveis:
- `mcp_Figma_get_design_context` → **Tool não encontrado**
- `mcp_Figma_get_variable_defs` → **Tool não encontrado**
- `mcp_Figma_get_screenshot` → **Tool não encontrado**

---

## 📋 Checklist de Diagnóstico

### 1. Configuração do Cursor

O Figma MCP é configurado **no Cursor IDE**, não no projeto. Verifique:

- [ ] **Settings → Features → MCP Servers**
  - Verificar se "Figma MCP" está listado
  - Verificar se está **habilitado (enabled)**
  - Verificar se há erros de conexão

- [ ] **Token do Figma API**
  - O Figma MCP requer um token de API do Figma
  - Token deve ter permissões de leitura do design
  - Verificar se o token está configurado nas settings do MCP

- [ ] **File Key do Projeto**
  - O Cursor precisa saber qual arquivo do Figma usar
  - File Key: `vemiX5wmAt2VKUdlsj84Zl` (do URL fornecido)
  - Verificar se está configurado no MCP

### 2. Permissões do Design no Figma

No Figma, verifique:

- [ ] **Acesso ao arquivo**
  - O arquivo deve estar acessível (público ou com permissão)
  - URL: `https://www.figma.com/design/vemiX5wmAt2VKUdlsj84Zl/...`

- [ ] **Node IDs corretos**
  - Node IDs que estamos tentando acessar:
    - `2007:2200` (Sidebar collapsed)
    - `2007:2145` (Sidebar expanded)
    - `2006:1014` (Dashboard principal)

### 3. Teste Manual

Para testar se o MCP está funcionando:

1. Abra o Cursor Settings
2. Navegue até **Features → MCP Servers**
3. Procure por "Figma" ou "figma"
4. Verifique o status (deve estar "Connected" ou "Ready")

### 4. Verificação de Ferramentas Disponíveis

As ferramentas que **deveriam** estar disponíveis:

```
mcp_Figma_get_design_context
  - Parâmetros: nodeId, fileKey, clientLanguages, clientFrameworks
  
mcp_Figma_get_variable_defs
  - Parâmetros: nodeId, fileKey
  
mcp_Figma_get_screenshot
  - Parâmetros: nodeId, fileKey
```

---

## 🔧 Soluções Possíveis

### Solução 1: Reativar MCP no Cursor

1. **Abrir Settings do Cursor**
   - `Ctrl+,` (Windows/Linux) ou `Cmd+,` (Mac)
   - Ou: File → Preferences → Settings

2. **Navegar até MCP Servers**
   - Procurar por "MCP" ou "Model Context Protocol"
   - Ou: Features → MCP Servers

3. **Verificar Figma MCP**
   - Se não estiver listado, adicionar
   - Se estiver listado mas desabilitado, habilitar
   - Verificar configuração de token e file key

### Solução 2: Verificar Token do Figma

Se o MCP requer token:

1. **Obter Token do Figma:**
   - Figma → Settings → Account → Personal Access Tokens
   - Criar novo token com permissões de leitura

2. **Configurar no Cursor:**
   - Adicionar token nas settings do Figma MCP
   - Salvar e reiniciar Cursor se necessário

### Solução 3: Testar Acesso Direto

Se o MCP não estiver disponível, posso:

1. **Usar URLs diretas do Figma** (já estamos fazendo para assets)
2. **Analisar screenshots** fornecidos
3. **Usar CSS exportado** do Figma (se disponível)

---

## 📊 Status Atual

**Implementação Baseada em:**
- ✅ URLs de assets do Figma MCP (funcionando)
- ✅ Dados previamente coletados do MCP
- ✅ Tokens mapeados no `tailwind.config.js`
- ❌ **NÃO há acesso em tempo real ao Figma MCP**

**Impacto:**
- ✅ Assets (imagens) funcionam (URLs diretas)
- ✅ Tokens do design system estão mapeados
- ⚠️ **Não posso validar propriedades em tempo real**
- ⚠️ **Não posso ler CSS/computed styles direto do Figma**

---

## 🎯 Próximos Passos Recomendados

1. **Verificar configuração do MCP no Cursor** (usuário)
2. **Fornecer screenshots/computed CSS** do Figma (se MCP não funcionar)
3. **Validar propriedades manualmente** contra o design (se necessário)

---

## 📝 Notas Técnicas

**Por que o MCP não está disponível?**
- As ferramentas MCP são **plug-ins do Cursor**, não do projeto
- Precisam ser configuradas no nível da IDE
- Requerem token de API e configuração adequada

**Workarounds atuais:**
- URLs de assets diretas do Figma API (funcionando)
- Tokens mapeados manualmente no Tailwind (funcionando)
- Análise de código implementado vs. documentação (parcial)

**Limitações sem MCP:**
- Não posso ler propriedades CSS computadas em tempo real
- Não posso validar automaticamente contra o design
- Dependo de dados previamente coletados ou fornecidos

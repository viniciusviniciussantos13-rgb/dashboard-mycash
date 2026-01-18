# 🔧 Guia: Ativar Figma MCP no Cursor

**Data:** 16/01/2025  
**Objetivo:** Verificar e ativar acesso ao Figma MCP no Cursor IDE

---

## ⚠️ Limitação Importante

As ferramentas MCP do Figma são configuradas **no Cursor IDE**, não no projeto em si. Como assistente, não tenho acesso direto para ativar essas configurações.

Este guia fornece instruções para você verificar/reativar o Figma MCP manualmente.

---

## 📋 Passo a Passo: Verificar/Ativar Figma MCP

### 1. Abrir Settings do Cursor

**Windows/Linux:**
- Pressione `Ctrl + ,` (vírgula)
- Ou: `File` → `Preferences` → `Settings`

**Mac:**
- Pressione `Cmd + ,` (vírgula)
- Ou: `Code` → `Preferences` → `Settings`

### 2. Procurar por "MCP" ou "Model Context Protocol"

Na barra de busca das Settings, digite:
- `MCP`
- `Model Context Protocol`
- `Figma MCP`

### 3. Verificar Configuração do Figma MCP

Você deve ver uma seção como:
- **Features → MCP Servers**
- **Settings → MCP → Figma**

Verifique se:
- [ ] Figma MCP está **listado**
- [ ] Status está **"Connected"** ou **"Ready"**
- [ ] Não há erros de conexão

### 4. Se Não Estiver Listado: Adicionar Figma MCP

Se o Figma MCP não aparecer na lista:

1. **Procurar por "MCP Servers"** nas Settings
2. **Clicar em "Add Server"** ou similar
3. **Selecionar/Adicionar "Figma"**

### 5. Verificar Token do Figma (se necessário)

Se o MCP requer token:

1. **Obter Token:**
   - Acesse: `https://www.figma.com/settings`
   - Vá em: `Account` → `Personal Access Tokens`
   - Clique em: `Create new token`
   - Dê um nome (ex: "Cursor MCP")
   - Copie o token gerado

2. **Configurar no Cursor:**
   - Nas settings do Figma MCP
   - Cole o token no campo apropriado
   - Salve as configurações

### 6. Reiniciar Cursor (se necessário)

Após configurar:

1. **Salvar todas as configurações**
2. **Fechar completamente o Cursor**
3. **Abrir o Cursor novamente**
4. **Verificar se o MCP está conectado**

---

## 🧪 Como Testar se o MCP Está Funcionando

Após seguir os passos acima, você pode testar:

### Teste 1: Verificar no Cursor

Nas Settings → MCP Servers, o Figma deve mostrar:
- ✅ Status: **"Connected"** ou **"Ready"**
- ✅ Última conexão: timestamp recente
- ❌ Sem mensagens de erro

### Teste 2: Tentar Acessar via Assistente

Peça ao assistente (eu) para tentar acessar o Figma MCP novamente. Se estiver funcionando, eu conseguirei:

- Ler componentes do Figma
- Obter variáveis de design
- Acessar screenshots dos designs

### Teste 3: Verificar Ferramentas Disponíveis

O Cursor deve ter ferramentas MCP do Figma disponíveis, como:
- `mcp_Figma_get_design_context`
- `mcp_Figma_get_variable_defs`
- `mcp_Figma_get_screenshot`

---

## 🔍 Verificação Atual

**Status Atual:**
- ❌ Ferramentas MCP não estão disponíveis para o assistente
- ❌ `list_mcp_resources` retornou vazio
- ❌ Não consigo acessar recursos do Figma via MCP

**Possíveis Causas:**
1. MCP não está configurado no Cursor
2. MCP está configurado mas não conectado
3. Token do Figma ausente ou inválido
4. Cursor precisa ser reiniciado
5. Permissões do arquivo do Figma

---

## ✅ Após Ativar o MCP

Quando o Figma MCP estiver ativado e funcionando:

1. **Me informe** que está funcionando
2. **Solicite que eu acesse** o componente Sidebar (node-id: `2007:2200`)
3. **Vou validar** a implementação contra as propriedades do Figma em tempo real

---

## 📝 Informações Necessárias

Para configurar o Figma MCP, você precisa de:

1. **Token do Figma API**
   - Obter em: `https://www.figma.com/settings`
   - Seção: `Personal Access Tokens`

2. **File Key do Projeto**
   - Já temos: `vemiX5wmAt2VKUdlsj84Zl`
   - Do URL: `https://www.figma.com/design/vemiX5wmAt2VKUdlsj84Zl/...`

3. **Node IDs que Queremos Acessar**
   - Sidebar collapsed: `2007:2200`
   - Sidebar expanded: `2007:2145`
   - Dashboard: `2006:1014`

---

## 🎯 Próximos Passos

1. **Você:** Siga os passos acima para verificar/ativar o MCP
2. **Você:** Me informe quando estiver configurado
3. **Eu:** Vou tentar acessar o Figma MCP novamente
4. **Eu:** Vou validar a implementação do Sidebar contra o design do Figma

---

## 💡 Dica

Se o MCP ainda não funcionar após seguir este guia:

- Verifique se você tem **acesso ao arquivo do Figma** (público ou com permissão)
- Tente **reinstalar o plugin MCP do Figma** no Cursor (se aplicável)
- Consulte a **documentação oficial do Cursor** sobre MCP

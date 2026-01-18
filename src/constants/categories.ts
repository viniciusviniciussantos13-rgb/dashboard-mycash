/**
 * Categorias padrão do sistema
 * Separadas por tipo de transação
 */

export const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Aluguéis',
  'Vendas',
  'Outros',
]

export const EXPENSE_CATEGORIES = [
  'Alimentação',
  'Mercado',
  'Transporte',
  'Moradia',
  'Aluguel',
  'Saúde',
  'Educação',
  'Lazer',
  'Manutenção',
  'Academia',
  'Outros',
]

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]
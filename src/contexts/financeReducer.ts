import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
} from '@/types'

/**
 * Estado do contexto financeiro
 */
export interface FinanceState {
  // Arrays de dados
  transactions: Transaction[]
  goals: Goal[]
  creditCards: CreditCard[]
  bankAccounts: BankAccount[]
  familyMembers: FamilyMember[]

  // Filtros globais
  selectedMember: string | null
  dateRange: {
    startDate: Date | null
    endDate: Date | null
  }
  transactionType: 'all' | 'income' | 'expense'
  searchText: string
}

/**
 * Tipos de ações do reducer
 */
export type FinanceAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: { id: string; updates: Partial<Transaction> } }
  | { type: 'DELETE_TRANSACTION'; payload: { id: string } }
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: { id: string; updates: Partial<Goal> } }
  | { type: 'DELETE_GOAL'; payload: { id: string } }
  | { type: 'ADD_CREDIT_CARD'; payload: CreditCard }
  | { type: 'UPDATE_CREDIT_CARD'; payload: { id: string; updates: Partial<CreditCard> } }
  | { type: 'DELETE_CREDIT_CARD'; payload: { id: string } }
  | { type: 'ADD_BANK_ACCOUNT'; payload: BankAccount }
  | { type: 'UPDATE_BANK_ACCOUNT'; payload: { id: string; updates: Partial<BankAccount> } }
  | { type: 'DELETE_BANK_ACCOUNT'; payload: { id: string } }
  | { type: 'ADD_FAMILY_MEMBER'; payload: FamilyMember }
  | { type: 'UPDATE_FAMILY_MEMBER'; payload: { id: string; updates: Partial<FamilyMember> } }
  | { type: 'DELETE_FAMILY_MEMBER'; payload: { id: string } }
  | { type: 'SET_SELECTED_MEMBER'; payload: { memberId: string | null } }
  | { type: 'SET_DATE_RANGE'; payload: { startDate: Date | null; endDate: Date | null } }
  | { type: 'SET_TRANSACTION_TYPE'; payload: { type: 'all' | 'income' | 'expense' } }
  | { type: 'SET_SEARCH_TEXT'; payload: { text: string } }

/**
 * Estado inicial
 */
export const initialState: FinanceState = {
  transactions: [],
  goals: [],
  creditCards: [],
  bankAccounts: [],
  familyMembers: [],
  selectedMember: null,
  dateRange: {
    startDate: null,
    endDate: null,
  },
  transactionType: 'all',
  searchText: '',
}

/**
 * Reducer para gerenciar estado financeiro
 */
export function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    // Transactions
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      }

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
      }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload.id),
      }

    // Goals
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [...state.goals, action.payload],
      }

    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map((g) =>
          g.id === action.payload.id ? { ...g, ...action.payload.updates } : g
        ),
      }

    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter((g) => g.id !== action.payload.id),
      }

    // CreditCards
    case 'ADD_CREDIT_CARD':
      return {
        ...state,
        creditCards: [...state.creditCards, action.payload],
      }

    case 'UPDATE_CREDIT_CARD':
      return {
        ...state,
        creditCards: state.creditCards.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        ),
      }

    case 'DELETE_CREDIT_CARD':
      return {
        ...state,
        creditCards: state.creditCards.filter((c) => c.id !== action.payload.id),
      }

    // BankAccounts
    case 'ADD_BANK_ACCOUNT':
      return {
        ...state,
        bankAccounts: [...state.bankAccounts, action.payload],
      }

    case 'UPDATE_BANK_ACCOUNT':
      return {
        ...state,
        bankAccounts: state.bankAccounts.map((a) =>
          a.id === action.payload.id ? { ...a, ...action.payload.updates } : a
        ),
      }

    case 'DELETE_BANK_ACCOUNT':
      return {
        ...state,
        bankAccounts: state.bankAccounts.filter((a) => a.id !== action.payload.id),
      }

    // FamilyMembers
    case 'ADD_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: [...state.familyMembers, action.payload],
      }

    case 'UPDATE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.map((m) =>
          m.id === action.payload.id ? { ...m, ...action.payload.updates } : m
        ),
      }

    case 'DELETE_FAMILY_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.filter((m) => m.id !== action.payload.id),
      }

    // Filtros
    case 'SET_SELECTED_MEMBER':
      return {
        ...state,
        selectedMember: action.payload.memberId,
      }

    case 'SET_DATE_RANGE':
      return {
        ...state,
        dateRange: {
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
        },
      }

    case 'SET_TRANSACTION_TYPE':
      return {
        ...state,
        transactionType: action.payload.type,
      }

    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload.text,
      }

    default:
      return state
  }
}

/**
 * Dados mock realistas para inicialização
 * Três membros da família brasileira, três cartões, vinte a trinta transações, quatro objetivos
 */
export const mockData: FinanceState = {
  transactions: [],
  goals: [],
  creditCards: [],
  bankAccounts: [],
  familyMembers: [],
  selectedMember: null,
  dateRange: {
    startDate: null,
    endDate: null,
  },
  transactionType: 'all',
  searchText: '',
}

// Gerar dados mock
const now = new Date()

// Membros da família
const mockMembers: FamilyMember[] = [
  {
    id: 'member-1',
    name: 'Vinícius Botelho',
    role: 'Pai',
    email: 'viniciusbotelho@gmail.com',
    monthlyIncome: 12000,
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'member-2',
    name: 'Maria Silva',
    role: 'Mãe',
    email: 'maria.silva@gmail.com',
    monthlyIncome: 8000,
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'member-3',
    name: 'João Botelho',
    role: 'Filho',
    monthlyIncome: 0,
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
]

// Cartões de crédito
const mockCreditCards: CreditCard[] = [
  {
    id: 'card-1',
    name: 'Nubank',
    holderId: 'member-1',
    closingDay: 10,
    dueDay: 15,
    limit: 5000,
    currentBill: 1200,
    theme: 'lime',
    lastDigits: '5877',
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'card-2',
    name: 'Inter',
    holderId: 'member-1',
    closingDay: 21,
    dueDay: 26,
    limit: 8000,
    currentBill: 2300,
    theme: 'black',
    lastDigits: '5877',
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'card-3',
    name: 'PicPay',
    holderId: 'member-2',
    closingDay: 12,
    dueDay: 17,
    limit: 3000,
    currentBill: 500,
    theme: 'white',
    lastDigits: '5877',
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
]

// Contas bancárias
const mockBankAccounts: BankAccount[] = [
  {
    id: 'account-1',
    name: 'Nubank Conta',
    holderId: 'member-1',
    balance: 15000,
    type: 'corrente',
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'account-2',
    name: 'Inter Conta',
    holderId: 'member-1',
    balance: 7000,
    type: 'corrente',
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
]

// Objetivos
const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Viagem para Europa',
    description: 'Economizar para viagem de 15 dias em 2025',
    targetAmount: 30000,
    currentAmount: 15000,
    deadline: new Date(now.getFullYear() + 1, 5, 1), // Junho 2025
    category: 'Lazer',
    memberId: null,
    isCompleted: false,
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'goal-2',
    title: 'Reserva de Emergência',
    description: '6 meses de despesas',
    targetAmount: 60000,
    currentAmount: 40000,
    deadline: new Date(now.getFullYear(), 11, 31), // Dezembro 2024
    category: 'Investimentos',
    memberId: null,
    isCompleted: false,
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'goal-3',
    title: 'Carro Novo',
    description: 'Entrada para financiamento',
    targetAmount: 50000,
    currentAmount: 25000,
    deadline: new Date(now.getFullYear() + 1, 2, 1), // Março 2025
    category: 'Transporte',
    memberId: null,
    isCompleted: false,
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
  {
    id: 'goal-4',
    title: 'Reforma da Casa',
    description: 'Reformar cozinha e banheiro',
    targetAmount: 40000,
    currentAmount: 12000,
    deadline: new Date(now.getFullYear(), 8, 1), // Setembro 2024
    category: 'Moradia',
    memberId: null,
    isCompleted: false,
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: new Date(now.getFullYear(), 0, 1),
  },
]

// Transações - gerar 25-30 transações dos últimos 3 meses
const mockTransactions: Transaction[] = []

// Categorias brasileiras (usadas para gerar transações)

// Transações de receita (últimos 3 meses)
const monthsAgo = (months: number) => {
  const date = new Date()
  date.setMonth(date.getMonth() - months)
  return date
}

// Salários mensais
for (let i = 0; i < 3; i++) {
  mockTransactions.push({
    id: `trans-${mockTransactions.length + 1}`,
    type: 'income',
    amount: 12000,
    description: 'Salário mensal',
    category: 'Salário',
    date: monthsAgo(2 - i),
    accountId: 'account-1',
    memberId: 'member-1',
    installments: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: monthsAgo(2 - i),
    updatedAt: monthsAgo(2 - i),
  })
}

// Salários membro 2
for (let i = 0; i < 3; i++) {
  mockTransactions.push({
    id: `trans-${mockTransactions.length + 1}`,
    type: 'income',
    amount: 8000,
    description: 'Salário mensal',
    category: 'Salário',
    date: monthsAgo(2 - i),
    accountId: 'account-1',
    memberId: 'member-2',
    installments: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: monthsAgo(2 - i),
    updatedAt: monthsAgo(2 - i),
  })
}

// Despesas variadas dos últimos 3 meses
const expenseAmounts = [
  { category: 'Aluguel', amount: 4000, description: 'Aluguel mensal apartamento' },
  { category: 'Alimentação', amount: 2000, description: 'Supermercado mensal' },
  { category: 'Mercado', amount: 1500, description: 'Feira e compras' },
  { category: 'Transporte', amount: 800, description: 'Combustível e transporte' },
  { category: 'Saúde', amount: 500, description: 'Plano de saúde' },
  { category: 'Lazer', amount: 800, description: 'Restaurante e lazer' },
  { category: 'Manutenção', amount: 600, description: 'Manutenção residencial' },
  { category: 'Academia', amount: 120, description: 'Mensalidade academia' },
]

// Gerar despesas distribuídas
for (let month = 0; month < 3; month++) {
  expenseAmounts.forEach((expense, idx) => {
    const daysOffset = Math.floor(Math.random() * 28) // Dia aleatório no mês
    const transactionDate = new Date(monthsAgo(2 - month))
    transactionDate.setDate(daysOffset + 1)

    mockTransactions.push({
      id: `trans-${mockTransactions.length + 1}`,
      type: 'expense',
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: transactionDate,
      accountId: month % 2 === 0 ? 'card-1' : 'card-2',
      memberId: idx % 2 === 0 ? 'member-1' : 'member-2',
      installments: 1,
      status: 'completed',
      isRecurring: month === 0 && idx < 2, // Aluguel e Alimentação são recorrentes
      isPaid: true,
      createdAt: transactionDate,
      updatedAt: transactionDate,
    })
  })
}

// Atualizar mockData com dados gerados
mockData.familyMembers = mockMembers
mockData.creditCards = mockCreditCards
mockData.bankAccounts = mockBankAccounts
mockData.goals = mockGoals
mockData.transactions = mockTransactions

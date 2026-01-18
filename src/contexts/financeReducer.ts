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
  | {
      type: 'SET_DATA'
      payload: Pick<
        FinanceState,
        'transactions' | 'goals' | 'creditCards' | 'bankAccounts' | 'familyMembers'
      >
    }

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

    case 'SET_DATA':
      return {
        ...state,
        transactions: action.payload.transactions,
        goals: action.payload.goals,
        creditCards: action.payload.creditCards,
        bankAccounts: action.payload.bankAccounts,
        familyMembers: action.payload.familyMembers,
      }

    default:
      return state
  }
}

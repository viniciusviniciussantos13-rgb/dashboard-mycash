import { createContext, ReactNode, useReducer, useCallback } from 'react'
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
} from '@/types'
import {
  financeReducer,
  initialState,
  mockData,
} from './financeReducer'

/**
 * Context Type - Tipo do contexto financeiro
 */
export interface FinanceContextType {
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

  // Funções CRUD - Transactions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // Funções CRUD - Goals
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // Funções CRUD - CreditCards
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => void
  deleteCreditCard: (id: string) => void

  // Funções CRUD - BankAccounts
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBankAccount: (id: string, updates: Partial<BankAccount>) => void
  deleteBankAccount: (id: string) => void

  // Funções CRUD - FamilyMembers
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void
  deleteFamilyMember: (id: string) => void

  // Funções de filtros
  setSelectedMember: (memberId: string | null) => void
  setDateRange: (startDate: Date | null, endDate: Date | null) => void
  setTransactionType: (type: 'all' | 'income' | 'expense') => void
  setSearchText: (text: string) => void

  // Funções de cálculo derivadas (com filtros aplicados)
  getFilteredTransactions: () => Transaction[]
  calculateTotalBalance: () => number
  calculateIncomeForPeriod: () => number
  calculateExpensesForPeriod: () => number
  calculateExpensesByCategory: () => Array<{ category: string; amount: number }>
  calculateCategoryPercentage: (category: string) => number
  calculateSavingsRate: () => number
}

// Context criado
export const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

/**
 * FinanceProvider - Provider do contexto financeiro
 * Gerencia todo o estado da aplicação via React state (sem browser storage)
 */
type FinanceProviderProps = {
  children: ReactNode
}

export function FinanceProvider({ children }: FinanceProviderProps) {
  // Inicializar estado com dados mock
  const [state, dispatch] = useReducer(financeReducer, {
    ...initialState,
    ...mockData,
  })

  // Funções CRUD - Transactions
  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...transaction,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }, [])

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: { id, updates: { ...updates, updatedAt: new Date() } },
    })
  }, [])

  const deleteTransaction = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: { id } })
  }, [])

  // Funções CRUD - Goals
  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({
      type: 'ADD_GOAL',
      payload: {
        ...goal,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }, [])

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    dispatch({
      type: 'UPDATE_GOAL',
      payload: { id, updates: { ...updates, updatedAt: new Date() } },
    })
  }, [])

  const deleteGoal = useCallback((id: string) => {
    dispatch({ type: 'DELETE_GOAL', payload: { id } })
  }, [])

  // Funções CRUD - CreditCards
  const addCreditCard = useCallback((card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({
      type: 'ADD_CREDIT_CARD',
      payload: {
        ...card,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }, [])

  const updateCreditCard = useCallback((id: string, updates: Partial<CreditCard>) => {
    dispatch({
      type: 'UPDATE_CREDIT_CARD',
      payload: { id, updates: { ...updates, updatedAt: new Date() } },
    })
  }, [])

  const deleteCreditCard = useCallback((id: string) => {
    dispatch({ type: 'DELETE_CREDIT_CARD', payload: { id } })
  }, [])

  // Funções CRUD - BankAccounts
  const addBankAccount = useCallback((account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({
      type: 'ADD_BANK_ACCOUNT',
      payload: {
        ...account,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }, [])

  const updateBankAccount = useCallback((id: string, updates: Partial<BankAccount>) => {
    dispatch({
      type: 'UPDATE_BANK_ACCOUNT',
      payload: { id, updates: { ...updates, updatedAt: new Date() } },
    })
  }, [])

  const deleteBankAccount = useCallback((id: string) => {
    dispatch({ type: 'DELETE_BANK_ACCOUNT', payload: { id } })
  }, [])

  // Funções CRUD - FamilyMembers
  const addFamilyMember = useCallback((member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({
      type: 'ADD_FAMILY_MEMBER',
      payload: {
        ...member,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }, [])

  const updateFamilyMember = useCallback((id: string, updates: Partial<FamilyMember>) => {
    dispatch({
      type: 'UPDATE_FAMILY_MEMBER',
      payload: { id, updates: { ...updates, updatedAt: new Date() } },
    })
  }, [])

  const deleteFamilyMember = useCallback((id: string) => {
    dispatch({ type: 'DELETE_FAMILY_MEMBER', payload: { id } })
  }, [])

  // Funções de filtros
  const setSelectedMember = useCallback((memberId: string | null) => {
    dispatch({ type: 'SET_SELECTED_MEMBER', payload: { memberId } })
  }, [])

  const setDateRange = useCallback((startDate: Date | null, endDate: Date | null) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: { startDate, endDate } })
  }, [])

  const setTransactionType = useCallback((type: 'all' | 'income' | 'expense') => {
    dispatch({ type: 'SET_TRANSACTION_TYPE', payload: { type } })
  }, [])

  const setSearchText = useCallback((text: string) => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: { text } })
  }, [])

  // Funções de cálculo derivadas (com filtros aplicados)
  // Memoizadas para evitar recálculos desnecessários
  const getFilteredTransactions = useCallback(() => {
    let filtered = [...state.transactions]

    // Filtro por membro
    if (state.selectedMember) {
      filtered = filtered.filter((t) => t.memberId === state.selectedMember)
    }

    // Filtro por data
    if (state.dateRange.startDate) {
      filtered = filtered.filter((t) => t.date >= state.dateRange.startDate!)
    }
    if (state.dateRange.endDate) {
      filtered = filtered.filter((t) => t.date <= state.dateRange.endDate!)
    }

    // Filtro por tipo
    if (state.transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === state.transactionType)
    }

    // Filtro por busca textual
    if (state.searchText.trim()) {
      const searchLower = state.searchText.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      )
    }

    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [
    state.transactions,
    state.selectedMember,
    state.dateRange.startDate,
    state.dateRange.endDate,
    state.transactionType,
    state.searchText,
  ])

  const calculateTotalBalance = useCallback(() => {
    const accountsBalance = state.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)
    const cardsDebt = state.creditCards.reduce((sum, card) => sum + card.currentBill, 0)
    return accountsBalance - cardsDebt
  }, [state.bankAccounts, state.creditCards])

  const calculateIncomeForPeriod = useCallback(() => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesForPeriod = useCallback(() => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesByCategory = useCallback(() => {
    const filtered = getFilteredTransactions()
    const expenses = filtered.filter((t) => t.type === 'expense' && t.status === 'completed')

    const categoryMap = new Map<string, number>()
    expenses.forEach((t) => {
      const current = categoryMap.get(t.category) || 0
      categoryMap.set(t.category, current + t.amount)
    })

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [getFilteredTransactions])

  const calculateCategoryPercentage = useCallback(
    (category: string) => {
      const totalIncome = calculateIncomeForPeriod()
      if (totalIncome === 0) return 0

      const categoryExpenses = calculateExpensesByCategory().find((c) => c.category === category)
      if (!categoryExpenses) return 0

      return (categoryExpenses.amount / totalIncome) * 100
    },
    [calculateIncomeForPeriod, calculateExpensesByCategory]
  )

  const calculateSavingsRate = useCallback(() => {
    const income = calculateIncomeForPeriod()
    const expenses = calculateExpensesForPeriod()

    if (income === 0) return 0
    return ((income - expenses) / income) * 100
  }, [calculateIncomeForPeriod, calculateExpensesForPeriod])

  const value: FinanceContextType = {
    // Arrays de dados
    transactions: state.transactions,
    goals: state.goals,
    creditCards: state.creditCards,
    bankAccounts: state.bankAccounts,
    familyMembers: state.familyMembers,

    // Filtros
    selectedMember: state.selectedMember,
    dateRange: state.dateRange,
    transactionType: state.transactionType,
    searchText: state.searchText,

    // CRUD - Transactions
    addTransaction,
    updateTransaction,
    deleteTransaction,

    // CRUD - Goals
    addGoal,
    updateGoal,
    deleteGoal,

    // CRUD - CreditCards
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,

    // CRUD - BankAccounts
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,

    // CRUD - FamilyMembers
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,

    // Filtros
    setSelectedMember,
    setDateRange,
    setTransactionType,
    setSearchText,

    // Cálculos
    getFilteredTransactions,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateExpensesByCategory,
    calculateCategoryPercentage,
    calculateSavingsRate,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

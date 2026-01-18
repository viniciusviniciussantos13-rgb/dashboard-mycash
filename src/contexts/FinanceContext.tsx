/// <reference types="vite/client" />
import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/constants/categories'
import { useAuth } from '@/hooks/useAuth'
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
} from '@/types'
import { financeReducer, initialState } from './financeReducer'

export interface FinanceContextType {
  transactions: Transaction[]
  goals: Goal[]
  creditCards: CreditCard[]
  bankAccounts: BankAccount[]
  familyMembers: FamilyMember[]
  selectedMember: string | null
  dateRange: {
    startDate: Date | null
    endDate: Date | null
  }
  transactionType: 'all' | 'income' | 'expense'
  searchText: string
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>
  deleteGoal: (id: string) => Promise<void>
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => Promise<void>
  deleteCreditCard: (id: string) => Promise<void>
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateBankAccount: (id: string, updates: Partial<BankAccount>) => Promise<void>
  deleteBankAccount: (id: string) => Promise<void>
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => Promise<void>
  deleteFamilyMember: (id: string) => Promise<void>
  setSelectedMember: (memberId: string | null) => void
  setDateRange: (startDate: Date | null, endDate: Date | null) => void
  setTransactionType: (type: 'all' | 'income' | 'expense') => void
  setSearchText: (text: string) => void
  getFilteredTransactions: () => Transaction[]
  calculateTotalBalance: () => number
  calculateIncomeForPeriod: () => number
  calculateExpensesForPeriod: () => number
  calculateExpensesByCategory: () => Array<{ category: string; amount: number }>
  calculateCategoryPercentage: (category: string) => number
  calculateSavingsRate: () => number
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

type ProviderProps = { children: ReactNode }

const defaultCategoryList = [
  ...INCOME_CATEGORIES.map((name) => ({ name, type: 'INCOME' as const })),
  ...EXPENSE_CATEGORIES.map((name) => ({ name, type: 'EXPENSE' as const })),
]

const formatDateToISO = (value: Date | string) =>
  value instanceof Date ? value.toISOString().split('T')[0] : value

const mapTransaction = (row: any): Transaction => ({
  id: row.id,
  type: row.type === 'INCOME' ? 'income' : 'expense',
  amount: Number(row.amount),
  description: row.description,
  category: row.category?.name ?? 'Sem categoria',
  date: new Date(row.date),
  accountId: row.account_id ?? '',
  memberId: row.member_id,
  installments: row.total_installments ?? 1,
  currentInstallment: row.installment_number ?? undefined,
  status: (row.status ?? 'pending').toLowerCase() as Transaction['status'],
  isRecurring: Boolean(row.is_recurring),
  isPaid: row.status === 'COMPLETED',
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
})

const mapCreditCard = (row: any): CreditCard => ({
  id: row.id,
  name: row.name,
  holderId: row.holder_id,
  closingDay: row.closing_day ?? 0,
  dueDay: row.due_day ?? 0,
  limit: Number(row.credit_limit ?? 0),
  currentBill: Number(row.current_bill ?? 0),
  theme: (row.theme as CreditCard['theme']) ?? 'black',
  lastDigits: row.last_digits ?? undefined,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
})

const mapBankAccount = (row: any): BankAccount => ({
  id: row.id,
  name: row.name,
  holderId: row.holder_id,
  balance: Number(row.balance ?? 0),
  type: row.type === 'SAVINGS' ? 'poupança' : 'corrente',
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
})

const mapFamilyMember = (row: any): FamilyMember => ({
  id: row.id,
  name: row.name,
  role: row.role,
  avatarUrl: row.avatar_url ?? undefined,
  email: row.email ?? undefined,
  monthlyIncome: row.monthly_income ?? undefined,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
})

const mapGoal = (row: any): Goal => ({
  id: row.id,
  title: row.title,
  description: row.description ?? undefined,
  targetAmount: Number(row.target_amount),
  currentAmount: Number(row.current_amount),
  deadline: new Date(row.deadline),
  category: row.category ?? undefined,
  memberId: row.member_id,
  isCompleted: Boolean(row.is_completed),
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
})

export function FinanceProvider({ children }: ProviderProps) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(financeReducer, initialState)

  const fallbackUserId = useMemo(() => {
    const fallback = import.meta.env.VITE_SUPABASE_DEFAULT_USER_ID ?? ''
    return fallback.trim() || null
  }, [])

  const effectiveUserId = user?.id ?? fallbackUserId

  const ensureDefaultCategories = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase.from('categories').select('name').eq('user_id', userId)
      if (error) {
        console.error('Falha ao carregar categorias', error.message)
        return
      }
      const existing = new Set((data ?? []).map((item: any) => item.name.toLowerCase()))
      const newEntries = defaultCategoryList.filter((category) => !existing.has(category.name.toLowerCase()))
      if (!newEntries.length) return
      await supabase.from('categories').insert(
        newEntries.map((category) => ({
          user_id: userId,
          name: category.name,
          type: category.type,
          icon: '📌',
        }))
      )
    },
    []
  )

  const fetchAllData = useCallback(async () => {
    if (!effectiveUserId) {
      dispatch({
        type: 'SET_DATA',
        payload: {
          transactions: [],
          goals: [],
          creditCards: [],
          bankAccounts: [],
          familyMembers: [],
        },
      })
      return
    }

    await ensureDefaultCategories(effectiveUserId)

    const [transactionsRes, accountsRes, membersRes, goalsRes] = await Promise.all([
      supabase
        .from('transactions')
        .select('*, category:categories (name)')
        .eq('user_id', effectiveUserId)
        .order('date', { ascending: false }),
      supabase.from('accounts').select('*').eq('user_id', effectiveUserId).order('created_at'),
      supabase
        .from('family_members')
        .select('*')
        .eq('user_id', effectiveUserId)
        .order('created_at'),
      supabase.from('goals').select('*').eq('user_id', effectiveUserId).order('created_at'),
    ])

    dispatch({
      type: 'SET_DATA',
      payload: {
        transactions: (transactionsRes.data ?? []).map(mapTransaction),
        goals: (goalsRes.data ?? []).map(mapGoal),
        creditCards: (accountsRes.data ?? [])
          .filter((row: any) => row.type === 'CREDIT_CARD')
          .map(mapCreditCard),
        bankAccounts: (accountsRes.data ?? [])
          .filter((row: any) => row.type !== 'CREDIT_CARD')
          .map(mapBankAccount),
        familyMembers: (membersRes.data ?? []).map(mapFamilyMember),
      },
    })
  }, [effectiveUserId, ensureDefaultCategories])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  const ensureCategory = useCallback(
    async (categoryName: string, type: 'income' | 'expense') => {
      if (!effectiveUserId || !categoryName.trim()) return null
      const normalized = categoryName.trim()
      const { data, error } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', effectiveUserId)
        .ilike('name', normalized)
        .limit(1)
      if (error) {
        console.error('Erro ao buscar categoria', error.message)
        return null
      }
      if (data?.length) return data[0].id
      const { data: created, error: insertError } = await supabase
        .from('categories')
        .insert({
          user_id: effectiveUserId,
          name: normalized,
          type: type === 'income' ? 'INCOME' : 'EXPENSE',
          icon: '📌',
        })
        .select()
        .single()
      if (insertError) {
        console.error('Erro ao criar categoria', insertError.message)
        return null
      }
      return created?.id ?? null
    },
    [effectiveUserId]
  )

  const refreshData = useCallback(async () => {
    await fetchAllData()
  }, [fetchAllData])

  const addTransaction = useCallback(
    async (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (!effectiveUserId) return
      const categoryId = await ensureCategory(transaction.category, transaction.type)
      const { error } = await supabase.from('transactions').insert({
        user_id: effectiveUserId,
        type: transaction.type === 'income' ? 'INCOME' : 'EXPENSE',
        amount: transaction.amount,
        description: transaction.description,
        date: formatDateToISO(transaction.date),
        account_id: transaction.accountId || null,
        member_id: transaction.memberId,
        total_installments: transaction.installments || 1,
        installment_number: transaction.currentInstallment ?? 1,
        status: transaction.status.toUpperCase(),
        is_recurring: transaction.isRecurring,
        category_id: categoryId,
      })
      if (error) {
        console.error('Erro ao adicionar transação', error.message)
        return
      }
      await refreshData()
    },
    [effectiveUserId, ensureCategory, refreshData]
  )

  const mutateTransaction = useCallback(
    async (id: string, updates: Partial<Transaction>, method: 'update' | 'delete') => {
      if (!effectiveUserId) return
      if (method === 'delete') {
        const { error } = await supabase.from('transactions').delete().eq('id', id)
        if (error) {
          console.error('Erro ao remover transação', error.message)
          return
        }
        await refreshData()
        return
      }
      const payload: Record<string, unknown> = {}
      if (updates.description !== undefined) payload.description = updates.description
      if (updates.amount !== undefined) payload.amount = updates.amount
      if (updates.date) payload.date = formatDateToISO(updates.date)
      if (updates.accountId !== undefined) payload.account_id = updates.accountId || null
      if (updates.memberId !== undefined) payload.member_id = updates.memberId
      if (updates.installments !== undefined) payload.total_installments = updates.installments
      if (updates.currentInstallment !== undefined)
        payload.installment_number = updates.currentInstallment
      if (updates.status) payload.status = updates.status.toUpperCase()
      if (updates.isRecurring !== undefined) payload.is_recurring = updates.isRecurring
      if (updates.type) payload.type = updates.type === 'income' ? 'INCOME' : 'EXPENSE'
      if (updates.category) {
        const categoryId = await ensureCategory(updates.category, updates.type ?? 'expense')
        payload.category_id = categoryId
      }
      const { error } = await supabase.from('transactions').update(payload).eq('id', id)
      if (error) {
        console.error('Erro ao atualizar transação', error.message)
        return
      }
      await refreshData()
    },
    [effectiveUserId, ensureCategory, refreshData]
  )

  const mutateMember = useCallback(
    async (id: string | null, updates: Partial<FamilyMember>, method: 'insert' | 'update' | 'delete') => {
      if (!effectiveUserId) return
      if (method === 'delete' && id) {
        const { error } = await supabase.from('family_members').delete().eq('id', id)
        if (error) {
          console.error('Erro ao excluir membro', error.message)
          return
        }
        await refreshData()
        return
      }
      const payload: Record<string, unknown> = {
        user_id: effectiveUserId,
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.role !== undefined && { role: updates.role }),
        ...(updates.avatarUrl !== undefined && { avatar_url: updates.avatarUrl }),
        ...(updates.monthlyIncome !== undefined && { monthly_income: updates.monthlyIncome }),
      }
      const query =
        method === 'insert'
          ? supabase.from('family_members').insert(payload)
          : supabase.from('family_members').update(payload).eq('id', id)
      const { error } = await query
      if (error) {
        console.error('Erro ao salvar membro', error.message)
        return
      }
      await refreshData()
    },
    [effectiveUserId, refreshData]
  )

  const mutateAccount = useCallback(
    async (
      id: string | null,
      payload: Record<string, unknown>,
      method: 'insert' | 'update' | 'delete'
    ) => {
      if (!effectiveUserId) return
      if (method === 'delete' && id) {
        const { error } = await supabase.from('accounts').delete().eq('id', id)
        if (error) {
          console.error('Erro ao deletar conta/cartão', error.message)
          return
        }
        await refreshData()
        return
      }
      const prepared = { user_id: effectiveUserId, ...payload }
      const query =
        method === 'insert'
          ? supabase.from('accounts').insert(prepared)
          : supabase.from('accounts').update(prepared).eq('id', id)
      const { error } = await query
      if (error) {
        console.error('Erro ao salvar conta/cartão', error.message)
        return
      }
      await refreshData()
    },
    [effectiveUserId, refreshData]
  )

  const addFamilyMember = useCallback(
    (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => mutateMember(null, member, 'insert'),
    [mutateMember]
  )
  const updateFamilyMember = useCallback(
    (id: string, updates: Partial<FamilyMember>) => mutateMember(id, updates, 'update'),
    [mutateMember]
  )
  const deleteFamilyMember = useCallback((id: string) => mutateMember(id, {}, 'delete'), [mutateMember])

  const addCreditCard = useCallback(
    (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) =>
      mutateAccount(
        null,
        {
          type: 'CREDIT_CARD',
          name: card.name,
          bank: card.name,
          holder_id: card.holderId,
          closing_day: card.closingDay,
          due_day: card.dueDay,
          credit_limit: card.limit,
          current_bill: card.currentBill,
          theme: card.theme,
          last_digits: card.lastDigits ?? null,
        },
        'insert'
      ),
    [mutateAccount]
  )

  const updateCreditCard = useCallback(
    (id: string, updates: Partial<CreditCard>) =>
      mutateAccount(
        id,
        {
          ...(updates.name !== undefined && { name: updates.name }),
          ...(updates.closingDay !== undefined && { closing_day: updates.closingDay }),
          ...(updates.dueDay !== undefined && { due_day: updates.dueDay }),
          ...(updates.limit !== undefined && { credit_limit: updates.limit }),
          ...(updates.currentBill !== undefined && { current_bill: updates.currentBill }),
          ...(updates.theme !== undefined && { theme: updates.theme }),
          ...(updates.lastDigits !== undefined && { last_digits: updates.lastDigits }),
        },
        'update'
      ),
    [mutateAccount]
  )

  const deleteCreditCard = useCallback((id: string) => mutateAccount(id, {}, 'delete'), [mutateAccount])

  const addBankAccount = useCallback(
    (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) =>
      mutateAccount(
        null,
        {
          type: 'CHECKING',
          name: account.name,
          bank: account.name,
          holder_id: account.holderId,
          balance: account.balance,
        },
        'insert'
      ),
    [mutateAccount]
  )

  const updateBankAccount = useCallback(
    (id: string, updates: Partial<BankAccount>) =>
      mutateAccount(
        id,
        {
          ...(updates.name !== undefined && { name: updates.name }),
          ...(updates.balance !== undefined && { balance: updates.balance }),
        },
        'update'
      ),
    [mutateAccount]
  )

  const deleteBankAccount = useCallback((id: string) => mutateAccount(id, {}, 'delete'), [mutateAccount])

  const addGoal = useCallback(
    async (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (!effectiveUserId) return
      const { error } = await supabase.from('goals').insert({
        user_id: effectiveUserId,
        title: goal.title,
        description: goal.description ?? null,
        target_amount: goal.targetAmount,
        current_amount: goal.currentAmount,
        deadline: formatDateToISO(goal.deadline),
        category: goal.category ?? null,
        member_id: goal.memberId,
        is_completed: goal.isCompleted,
      })
      if (error) {
        console.error('Erro ao adicionar objetivo', error.message)
        return
      }
      await refreshData()
    },
    [effectiveUserId, refreshData]
  )

  const updateGoal = useCallback(
    async (id: string, updates: Partial<Goal>) => {
      if (!effectiveUserId) return
      const payload: Record<string, unknown> = {}
      if (updates.title !== undefined) payload.title = updates.title
      if (updates.description !== undefined) payload.description = updates.description
      if (updates.targetAmount !== undefined) payload.target_amount = updates.targetAmount
      if (updates.currentAmount !== undefined) payload.current_amount = updates.currentAmount
      if (updates.deadline) payload.deadline = formatDateToISO(updates.deadline)
      if (updates.category !== undefined) payload.category = updates.category ?? null
      if (updates.memberId !== undefined) payload.member_id = updates.memberId
      if (updates.isCompleted !== undefined) payload.is_completed = updates.isCompleted
      const { error } = await supabase.from('goals').update(payload).eq('id', id)
      if (error) {
        console.error('Erro ao atualizar objetivo', error.message)
        return
      }
      await refreshData()
    },
    [effectiveUserId, refreshData]
  )

  const deleteGoal = useCallback(
    async (id: string) => {
      if (!effectiveUserId) return
      const { error } = await supabase.from('goals').delete().eq('id', id)
      if (error) {
        console.error('Erro ao deletar objetivo', error.message)
        return
      }
      await refreshData()
    },
    [effectiveUserId, refreshData]
  )

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

  const getFilteredTransactions = useCallback(() => {
    let filtered = [...state.transactions]
    if (state.selectedMember) {
      filtered = filtered.filter((tx) => tx.memberId === state.selectedMember)
    }
    if (state.dateRange.startDate) {
      filtered = filtered.filter((tx) => tx.date >= state.dateRange.startDate!)
    }
    if (state.dateRange.endDate) {
      filtered = filtered.filter((tx) => tx.date <= state.dateRange.endDate!)
    }
    if (state.transactionType !== 'all') {
      filtered = filtered.filter((tx) => tx.type === state.transactionType)
    }
    if (state.searchText.trim()) {
      const normalized = state.searchText.toLowerCase()
      filtered = filtered.filter(
        (tx) =>
          tx.description.toLowerCase().includes(normalized) ||
          tx.category.toLowerCase().includes(normalized)
      )
    }
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [state])

  const calculateTotalBalance = useCallback(() => {
    const accountsBalance = state.bankAccounts.reduce((sum, account) => sum + account.balance, 0)
    const cardsDebt = state.creditCards.reduce((sum, card) => sum + card.currentBill, 0)
    return accountsBalance - cardsDebt
  }, [state.bankAccounts, state.creditCards])

  const calculateIncomeForPeriod = useCallback(() => {
    return getFilteredTransactions()
      .filter((tx) => tx.type === 'income' && tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesForPeriod = useCallback(() => {
    return getFilteredTransactions()
      .filter((tx) => tx.type === 'expense' && tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesByCategory = useCallback(() => {
    const totals = new Map<string, number>()
    getFilteredTransactions()
      .filter((tx) => tx.type === 'expense' && tx.status === 'completed')
      .forEach((tx) => totals.set(tx.category, (totals.get(tx.category) ?? 0) + tx.amount))
    return Array.from(totals.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [getFilteredTransactions])

  const calculateCategoryPercentage = useCallback(
    (category: string) => {
      const income = calculateIncomeForPeriod()
      if (income === 0) return 0
      const entry = calculateExpensesByCategory().find((item) => item.category === category)
      if (!entry) return 0
      return (entry.amount / income) * 100
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
    transactions: state.transactions,
    goals: state.goals,
    creditCards: state.creditCards,
    bankAccounts: state.bankAccounts,
    familyMembers: state.familyMembers,
    selectedMember: state.selectedMember,
    dateRange: state.dateRange,
    transactionType: state.transactionType,
    searchText: state.searchText,
    addTransaction,
    updateTransaction: (id, updates) => mutateTransaction(id, updates, 'update'),
    deleteTransaction: (id) => mutateTransaction(id, {}, 'delete'),
    addGoal,
    updateGoal,
    deleteGoal,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    setSelectedMember,
    setDateRange,
    setTransactionType,
    setSearchText,
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


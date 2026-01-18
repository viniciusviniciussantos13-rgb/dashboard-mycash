import { addMonths, format } from 'date-fns'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

export default function UpcomingExpensesWidget() {
  const {
    transactions,
    bankAccounts,
    creditCards,
    updateTransaction,
    addTransaction,
  } = useFinance()

  const [feedback, setFeedback] = useState('')
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pendingExpenses = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === 'expense' && !transaction.isPaid)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [transactions])

  const handleCheck = (transactionId: string) => {
    const transaction = transactions.find((t) => t.id === transactionId)
    if (!transaction) return

    const updatedFields = {
      status: 'completed' as const,
      isPaid: true,
      updatedAt: new Date(),
    }

    updateTransaction(transactionId, updatedFields)
    setFeedback('Despesa marcada como paga!')
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current)
    }
    feedbackTimeoutRef.current = setTimeout(() => setFeedback(''), 2600)

    if (transaction.isRecurring) {
      const nextDate = addMonths(transaction.date, 1)
      const { id, createdAt, updatedAt, ...payload } = transaction
      addTransaction({
        ...payload,
        date: nextDate,
        status: 'pending',
        isPaid: false,
      })
    }

    const currentInstallment = transaction.currentInstallment ?? 1
    if (transaction.installments > currentInstallment) {
      const nextInstallmentDate = addMonths(transaction.date, 1)
      const { id, createdAt, updatedAt, ...payload } = transaction
      addTransaction({
        ...payload,
        date: nextInstallmentDate,
        status: 'pending',
        isPaid: false,
        currentInstallment: currentInstallment + 1,
      })
    }
  }

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  const formatOrigin = (transaction: typeof transactions[number]) => {
    const bank = bankAccounts.find((account) => account.id === transaction.accountId)
    if (bank) return `${bank.name} conta`
    const card = creditCards.find((credit) => credit.id === transaction.accountId)
    if (card) {
      return `Crédito ${card.name} **** ${card.lastDigits ?? '0000'}`
    }
    return 'Conta vinculada'
  }

  if (pendingExpenses.length === 0) {
    return (
      <section className="w-full max-w-[540px] rounded-shape-20 border border-neutral-300 bg-surface-500 p-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-2xl font-semibold text-neutral-1100">
            <span className="h-6 w-6 text-neutral-900">💰</span>
            Próximas despesas
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white">
            +
          </button>
        </header>
        <div className="mt-8 flex flex-col items-center gap-3 rounded-shape-20 border border-dashed border-neutral-300/60 bg-white/60 p-8 text-center text-sm font-medium text-neutral-500">
          <span className="text-4xl">✓</span>
          Nenhuma despesa pendente
        </div>
      </section>
    )
  }

  return (
    <section className="w-full max-w-[540px] rounded-shape-20 border border-neutral-300 bg-surface-500 p-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-2xl font-semibold text-neutral-1100">
          <span className="text-neutral-900">💰</span>
          Próximas despesas
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-xl text-neutral-900 transition hover:bg-neutral-100"
        >
          +
        </button>
      </header>

      <div className="mt-8 divide-y divide-neutral-200">
        {pendingExpenses.map((expense) => (
          <article
            key={expense.id}
            className="flex items-center justify-between gap-4 py-4 transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-lg font-semibold text-neutral-1100">{expense.description}</span>
              <span className="text-xs font-medium text-neutral-600">
                Vence dia {format(expense.date, 'dd/MM')}
              </span>
              <span className="text-xs text-neutral-400">{formatOrigin(expense)}</span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-heading-small font-semibold text-neutral-1100">
                {formatCurrencyBRL(expense.amount)}
              </span>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-green-500 hover:bg-green-50 hover:text-green-700"
                onClick={() => handleCheck(expense.id)}
              >
                ✓
              </button>
            </div>
          </article>
        ))}
      </div>

      {feedback && (
        <div className="mt-6 rounded-shape-20 border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
          {feedback}
        </div>
      )}
    </section>
  )
}

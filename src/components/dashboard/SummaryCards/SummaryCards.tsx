import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { subDays } from 'date-fns'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

const useAnimatedNumber = (targetValue: number, duration = 800) => {
  const [animatedValue, setAnimatedValue] = useState(targetValue)
  const previousValueRef = useRef(targetValue)
  const frameRef = useRef<number>()

  useEffect(() => {
    const startValue = previousValueRef.current
    if (startValue === targetValue) {
      return
    }

    const delta = targetValue - startValue
    const startTime = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedValue(startValue + delta * eased)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        previousValueRef.current = targetValue
      }
    }

    frameRef.current = requestAnimationFrame(step)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [duration, targetValue])

  return animatedValue
}

type CardProps = {
  value: number
  label: string
  accent?: 'income' | 'expense'
  prefixIcon?: ReactNode
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

function StatCard({
  value,
  label,
  accent,
  prefixIcon,
  children,
  className = '',
  style,
}: CardProps) {
  const accentText = accent === 'expense' ? 'text-neutral-700' : 'text-neutral-900'
  const accentBorder = accent === 'expense' ? 'border-red-600/30' : 'border-neutral-300'

  return (
    <article
      className={`
        relative flex flex-col gap-3 rounded-shape-20 border bg-surface-500 px-6 py-5 shadow-sm min-h-[180px]
        ${accentBorder} ${className}
      `}
      style={style}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`label-small font-semibold ${accentText}`}>{label}</span>
        {prefixIcon}
      </div>

      <p className="text-heading-small font-semibold text-neutral-1100">
        {formatCurrencyBRL(value)}
      </p>

      {children}
    </article>
  )
}

type BalanceCardProps = {
  value: number
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

function BalanceCard({ value, children, className, style }: BalanceCardProps) {
  return (
    <article
      className={`
        relative flex flex-col gap-4 overflow-hidden rounded-shape-20 bg-neutral-1100 px-6 py-6 text-surface-500 shadow-2xl
        ${className ?? ''}
      `}
      style={style}
    >
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-500/40 opacity-80 blur-3xl"
      />

      <span className="label-small font-semibold text-neutral-400">Saldo Total</span>

      <p className="text-heading-medium font-bold text-white">{formatCurrencyBRL(value)}</p>

      {children}
    </article>
  )
}

export default function SummaryCards() {
  const {
    transactions,
    selectedMember,
    transactionType,
    searchText,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
  } = useFinance()

  const totalBalance = calculateTotalBalance()
  const totalIncome = calculateIncomeForPeriod()
  const totalExpenses = calculateExpensesForPeriod()

  const animatedBalance = useAnimatedNumber(totalBalance)
  const animatedIncome = useAnimatedNumber(totalIncome)
  const animatedExpenses = useAnimatedNumber(totalExpenses)

  const normalizedSearch = searchText.trim().toLowerCase()

  const growthPercent = useMemo(() => {
    const thirtyDaysAgo = subDays(new Date(), 30)

    const filteredTransactions = transactions.filter((transaction) => {
      if (transaction.status !== 'completed') return false
      if (transaction.date < thirtyDaysAgo) return false

      if (selectedMember && transaction.memberId !== selectedMember) {
        return false
      }
      if (transactionType !== 'all' && transaction.type !== transactionType) {
        return false
      }
      if (normalizedSearch) {
        const matchesSearch =
          transaction.description.toLowerCase().includes(normalizedSearch) ||
          transaction.category.toLowerCase().includes(normalizedSearch)
        if (!matchesSearch) {
          return false
        }
      }

      return true
    })

    const netChange = filteredTransactions.reduce((acc, transaction) => {
      const delta = transaction.type === 'income' ? transaction.amount : -transaction.amount
      return acc + delta
    }, 0)

    const previousBalance = totalBalance - netChange
    if (previousBalance === 0) {
      return netChange === 0 ? 0 : 100
    }

    return (netChange / Math.abs(previousBalance)) * 100
  }, [normalizedSearch, selectedMember, transactionType, totalBalance, transactions])

  const growthLabel = `${growthPercent >= 0 ? '+' : ''}${Math.round(growthPercent)}% esse mês`
  const badgeClasses =
    'flex items-center gap-2 rounded-shape-100 border border-white/30 bg-white/20 px-3 py-1 text-surface-500 text-label-small'

  return (
    <section className="w-full max-w-[1400px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <BalanceCard
          value={animatedBalance}
          className="flex-1"
          style={{ minWidth: 0, flex: '1.4 1 0%' }}
        >
          <div className={badgeClasses}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="4 14 10 8 14 12 20 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="20 10 20 20 4 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{growthLabel}</span>
          </div>
        </BalanceCard>

        <StatCard
          value={animatedIncome}
          label="Receitas"
          accent="income"
          className="flex-1"
          style={{ minWidth: 0 }}
          prefixIcon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L12 12L17 17"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12L12 3"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          }
        />

        <StatCard
          value={animatedExpenses}
          label="Despesas"
          accent="expense"
          className="flex-1"
          style={{ minWidth: 0 }}
          prefixIcon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 7L12 12L17 7"
                  stroke="#e61e32"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12L12 21"
                  stroke="#e61e32"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          }
        />
      </div>
    </section>
  )
}

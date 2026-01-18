import { type ReactNode, useEffect, useRef, useState } from 'react'
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

type MetricCardProps = {
  label: string
  value: number
  icon?: ReactNode
  iconContainerClass?: string
  valueColor?: string
}

function MetricCard({ label, value, icon, iconContainerClass, valueColor }: MetricCardProps) {
  return (
    <article className="flex min-h-[180px] flex-col gap-3 rounded-shape-20 border border-neutral-300 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="label-medium font-semibold text-neutral-1100">{label}</span>
        {icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconContainerClass}`}>
            {icon}
          </div>
        )}
      </div>
      <p className={`text-heading-small font-semibold leading-tight ${valueColor ?? 'text-neutral-1100'}`}>
        {formatCurrencyBRL(value)}
      </p>
    </article>
  )
}

function BalanceCard({ value }: { value: number }) {
  return (
    <article className="flex min-h-[180px] flex-col gap-2 rounded-shape-20 border border-neutral-300 bg-white px-6 py-5 shadow-sm">
      <span className="text-2xl font-semibold text-neutral-800">$</span>
      <span className="label-medium font-semibold text-neutral-1100">Saldo Total</span>
      <p className="text-heading-medium font-bold leading-tight text-blue-600">{formatCurrencyBRL(value)}</p>
    </article>
  )
}

export default function SummaryCards() {
  const { calculateTotalBalance, calculateIncomeForPeriod, calculateExpensesForPeriod } = useFinance()

  const animatedBalance = useAnimatedNumber(calculateTotalBalance())
  const animatedIncome = useAnimatedNumber(calculateIncomeForPeriod())
  const animatedExpenses = useAnimatedNumber(calculateExpensesForPeriod())

  return (
    <section className="w-full max-w-[1400px]">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr_1fr]">
        <BalanceCard value={animatedBalance} />

        <MetricCard
          label="Receitas"
          value={animatedIncome}
          valueColor="text-neutral-1100"
          iconContainerClass="bg-red-50"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V15"
                stroke="#e61e32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 11L12 15L16 11"
                stroke="#e61e32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <MetricCard
          label="Despesas"
          value={animatedExpenses}
          valueColor="text-neutral-1100"
          iconContainerClass="bg-green-50"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 15V5"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 9L12 5L16 9"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </section>
  )
}

import { type PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

const DONUT_COLORS = ['#c4e703', '#080b12', '#9ca3af', '#15be78', '#e61e32']

type CategoryDonutCardProps = {
  category: string
  amount: number
  percent: number
  color: string
}

function CategoryDonutCard({ category, amount, percent, color }: CategoryDonutCardProps) {
  const clampPercent = Math.min(Math.max(percent, 0), 100)

  return (
    <article
      className="relative flex w-[185px] flex-col gap-3 rounded-shape-20 border border-neutral-300 bg-surface-500 px-6 py-6 text-center shadow-sm hover:border-brand-700 transition-colors"
      style={{ minHeight: 220 }}
    >
      <div
        className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-neutral-300 bg-white"
        style={{
          background: `conic-gradient(${color} 0deg ${clampPercent * 3.6}deg, rgba(229, 231, 235, 0.9) ${
            clampPercent * 3.6
          }deg 360deg)`,
        }}
      >
        <span className="absolute inset-3 rounded-full bg-surface-500 opacity-90" />
        <span className="absolute inset-0 flex items-center justify-center rounded-full text-heading-x-small font-semibold text-neutral-1100">
          {clampPercent.toFixed(1)}%
        </span>
      </div>

      <p className="truncate text-sm font-medium text-neutral-900">{category}</p>

      <p className="text-heading-small font-semibold text-neutral-1100">{formatCurrencyBRL(amount)}</p>
    </article>
  )
}

export default function ExpensesByCategoryCarousel() {
  const {
    calculateExpensesByCategory,
    calculateCategoryPercentage,
    calculateIncomeForPeriod,
  } = useFinance()

  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1280 : true)

  const categories = useMemo(() => {
    const expenseData = calculateExpensesByCategory()
    const totalIncome = calculateIncomeForPeriod()
    return expenseData.map((item, index) => ({
      ...item,
      percent: totalIncome === 0 ? 0 : calculateCategoryPercentage(item.category),
      color: DONUT_COLORS[index % DONUT_COLORS.length],
    }))
  }, [calculateExpensesByCategory, calculateCategoryPercentage, calculateIncomeForPeriod])

  const handleResize = useCallback(() => {
    setIsDesktop(window.innerWidth >= 1280)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
        return
      }
      event.preventDefault()
      container.scrollLeft += event.deltaY
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return
    draggingRef.current = true
    startXRef.current = event.clientX
    scrollLeftRef.current = container.scrollLeft
    container.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!draggingRef.current || !container) return
    const delta = event.clientX - startXRef.current
    container.scrollLeft = scrollLeftRef.current - delta
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    draggingRef.current = false
    container?.releasePointerCapture(event.pointerId)
  }

  const scrollBy = (distance: number) => {
    containerRef.current?.scrollBy({ left: distance, behavior: 'smooth' })
  }

  return (
    <section className="w-full max-w-[1400px]">
      <div className="mb-2 text-base font-semibold text-neutral-900">Gastos por categoria</div>
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
          }}
        >
          {categories.map((category) => (
            <CategoryDonutCard
              key={category.category}
              category={category.category}
              amount={category.amount}
              percent={category.percent}
              color={category.color}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-9"
          style={{
            background: 'linear-gradient(to right, #f9fafb, rgba(249,249,251,0))',
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-9"
          style={{
            background: 'linear-gradient(to left, #f9fafb, rgba(249,249,251,0))',
          }}
        />

        {isDesktop && isHovering && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white p-2 shadow-lg transition-colors hover:border-brand-700 hover:text-brand-700"
              onClick={() => scrollBy(-200)}
              aria-label="scroll left"
            >
              <span className="text-lg font-semibold">‹</span>
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white p-2 shadow-lg transition-colors hover:border-brand-700 hover:text-brand-700"
              onClick={() => scrollBy(200)}
              aria-label="scroll right"
            >
              <span className="text-lg font-semibold">›</span>
            </button>
          </>
        )}
      </div>
    </section>
  )
}

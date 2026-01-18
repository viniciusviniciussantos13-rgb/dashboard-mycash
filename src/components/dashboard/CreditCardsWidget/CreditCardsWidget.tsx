import { type PointerEvent, useMemo, useRef, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

const CARD_THEMES = {
  black: {
    blockBg: 'bg-neutral-900',
    iconColor: 'text-surface-500',
    badgeBg: 'bg-neutral-900',
    badgeText: 'text-surface-500',
    border: 'border-transparent',
  },
  lime: {
    blockBg: 'bg-brand-700',
    iconColor: 'text-neutral-900',
    badgeBg: 'bg-brand-700',
    badgeText: 'text-neutral-900',
    border: 'border-brand-700/80',
  },
  white: {
    blockBg: 'bg-white',
    iconColor: 'text-neutral-900',
    badgeBg: 'bg-neutral-200',
    badgeText: 'text-neutral-900',
    border: 'border-neutral-300',
  },
} as const

const cardsPerPage = 3

type CreditCardsWidgetProps = {
  onAddAccount?: () => void
  onCardSelect?: (cardId: string) => void
}

export default function CreditCardsWidget({ onAddAccount, onCardSelect }: CreditCardsWidgetProps) {
  const { creditCards } = useFinance()
  const totalPages = Math.max(1, Math.ceil(creditCards.length / cardsPerPage))
  const [page, setPage] = useState(0)
  const touchStartRef = useRef<number | null>(null)

  const visibleCards = useMemo(() => {
    const start = page * cardsPerPage
    return creditCards.slice(start, start + cardsPerPage)
  }, [creditCards, page])

  const changePage = (direction: number) => {
    setPage((current) => {
      const next = current + direction
      if (next < 0) return 0
      if (next >= totalPages) return totalPages - 1
      return next
    })
  }

  const handleTouchStart = (event: PointerEvent<HTMLDivElement>) => {
    touchStartRef.current = event.clientX
  }

  const handleTouchEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null) return
    const distance = event.clientX - touchStartRef.current
    const swipeThreshold = 40
    if (distance > swipeThreshold) {
      changePage(-1)
    } else if (distance < -swipeThreshold) {
      changePage(1)
    }
    touchStartRef.current = null
  }

  const handleCardClick = (cardId: string) => {
    console.log('Abrir modal do cartão', cardId)
  }

  return (
    <section className="w-full max-w-[540px] rounded-shape-20 border border-neutral-300 bg-neutral-50 p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-neutral-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="7" y1="16" x2="7" y2="16" />
            </svg>
          </div>
          <h3 className="text-heading-x-small font-semibold text-neutral-1100">Cartões</h3>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white transition hover:bg-neutral-100"
          type="button"
          aria-label="Adicionar cartão"
          onClick={() => onAddAccount?.()}
        >
          <span className="text-2xl leading-none text-neutral-900">+</span>
        </button>
      </div>

      <div
        className="mt-6 flex flex-col gap-4"
        onPointerDown={handleTouchStart}
        onPointerUp={handleTouchEnd}
      >
        {visibleCards.map((card) => {
          const usage = Math.min(100, Math.round((card.currentBill / card.limit) * 100))
          const theme = CARD_THEMES[card.theme]

          return (
            <article
              key={card.id}
              onClick={() => {
                handleCardClick(card.id)
                onCardSelect?.(card.id)
              }}
              className="flex h-28 cursor-pointer items-center justify-between gap-4 rounded-shape-20 border border-transparent bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-shape-100 border ${theme.border} ${theme.blockBg}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-6 w-6 ${theme.iconColor}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="7" width="18" height="10" rx="2" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <span className="text-sm font-medium text-neutral-500">{card.name}</span>
                <span className="text-heading-small font-semibold text-neutral-1100">
                  {formatCurrencyBRL(card.currentBill)}
                </span>
                <span className="text-xs font-medium text-neutral-500">
                  •••• {card.lastDigits ?? '0000'}
                </span>
              </div>

              <div
                className={`flex h-10 min-w-[64px] items-center justify-center rounded-full border px-3 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
              >
                {usage}%
              </div>
            </article>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold">
          <div className="text-neutral-500">
            Página {page + 1} de {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changePage(-1)}
              disabled={page === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => changePage(1)}
              disabled={page === totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

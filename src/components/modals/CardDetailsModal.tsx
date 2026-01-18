import { useMemo } from 'react'
import { format } from 'date-fns'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

type Props = {
  cardId: string | null
  open: boolean
  onClose: () => void
  onEdit?: () => void
  onAddExpense?: () => void
  onViewStatement?: () => void
}

export default function CardDetailsModal({
  cardId,
  open,
  onClose,
  onEdit,
  onAddExpense,
  onViewStatement,
}: Props) {
  const { creditCards, transactions } = useFinance()

  const card = useMemo(() => creditCards.find((item) => item.id === cardId), [creditCards, cardId])
  const cardTransactions = useMemo(
    () =>
      card
        ? transactions
            .filter((transaction) => transaction.type === 'expense' && transaction.accountId === card.id)
            .sort((a, b) => b.date.getTime() - a.date.getTime())
        : [],
    [card, transactions]
  )

  if (!open || !card) return null

  const usagePercent = card.limit ? Math.min(100, (card.currentBill / card.limit) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-shape-20 bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-1100">{card.name}</h2>
            <p className="text-sm text-neutral-500">
              Cartão {card.theme} • Últimos dígitos {card.lastDigits ?? '0000'}
            </p>
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-neutral-300 text-xl"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { label: 'Limite total', value: formatCurrencyBRL(card.limit) },
              { label: 'Fatura atual', value: formatCurrencyBRL(card.currentBill) },
              {
                label: 'Limite disponível',
                value: formatCurrencyBRL(Math.max(0, card.limit - card.currentBill)),
              },
              { label: 'Uso do limite', value: `${usagePercent.toFixed(1)}%` },
              { label: 'Dia de fechamento', value: `Dia ${card.closingDay}` },
              { label: 'Dia de vencimento', value: `Dia ${card.dueDay}` },
            ].map((info) => (
              <div
                key={info.label}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm"
              >
                <p className="text-xs uppercase tracking-wide text-neutral-500">{info.label}</p>
                <p className="text-lg font-semibold text-neutral-900">{info.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-neutral-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Uso do limite</p>
            <div className="mt-4 h-2 rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-300"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-neutral-500">{usagePercent.toFixed(1)}% utilizado</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-y border-neutral-200 px-6 py-4">
          <button
            type="button"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900"
            onClick={onViewStatement}
          >
            Ver Extrato Completo
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900"
              onClick={onAddExpense}
            >
              Adicionar Despesa
            </button>
            <button
              type="button"
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900"
              onClick={onEdit}
            >
              Editar Cartão
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-sm font-semibold text-neutral-700">Despesas vinculadas</h3>
          {cardTransactions.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
              Nenhuma despesa registrada neste cartão ainda.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {cardTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{transaction.description}</p>
                    <p className="text-xs text-neutral-500">
                      {format(new Date(transaction.date), 'dd/MM/yyyy')}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">
                    -{formatCurrencyBRL(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Página de Cartões
 * Exibe view completa de cartões de crédito
 */
import { useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import AddAccountCardModal from '@/components/modals/AddAccountCardModal'
import CardDetailsModal from '@/components/modals/CardDetailsModal'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

export default function Cards() {
  const { creditCards, bankAccounts } = useFinance()
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  const sortedCards = [...creditCards].sort((a, b) => b.currentBill - a.currentBill || a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container-content py-6 space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="heading-x-small text-neutral-1100 mb-1">Cartões de Crédito</h1>
            <p className="paragraph-small text-neutral-500">
              Gerencie seus cartões e contas em um só lugar.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
            onClick={() => setIsAddAccountOpen(true)}
          >
            <span className="text-base">+</span>
            Novo Cartão
          </button>
        </header>

        <section className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          {sortedCards.map((card) => {
            const usage = card.limit ? Math.min(100, (card.currentBill / card.limit) * 100) : 0
            return (
              <article
                key={card.id}
                className="flex flex-col justify-between gap-4 rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                onClick={() => setSelectedCardId(card.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-500">{card.name}</span>
                  <span className="text-xs font-semibold text-neutral-500">•••• {card.lastDigits ?? '0000'}</span>
                </div>
                <div>
                  <p className="text-heading-small font-semibold text-neutral-1100">{formatCurrencyBRL(card.currentBill)}</p>
                  <p className="text-xs text-neutral-500">Vence dia {card.dueDay ?? '??'}</p>
                </div>
                <div className="h-2 rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-300"
                    style={{ width: `${usage}%` }}
                  />
                </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                    <span>Limite {formatCurrencyBRL(card.limit ?? 0)}</span>
                    <span>{usage.toFixed(1)}%</span>
                  </div>
                <div className="flex items-center gap-2">
                  {['Ver Detalhes', 'Adicionar Despesa'].map((label) => (
                    <span key={label} className="cursor-pointer rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-700">
                      {label}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
          <button
            type="button"
            className="flex flex-col items-center justify-center rounded-shape-20 border border-dashed border-neutral-300 bg-white p-6 text-sm font-semibold text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900"
            onClick={() => setIsAddAccountOpen(true)}
          >
            +
            <span className="mt-2">Novo cartão</span>
          </button>
        </section>

        <section className="rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-700">Contas bancárias</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {bankAccounts.map((account) => (
              <article
                key={account.id}
                className="flex items-center justify-between rounded-shape-20 border border-neutral-200 bg-neutral-50 px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{account.name}</p>
                  <p className="text-xs text-neutral-500">Saldo atualizado</p>
                </div>
                <span className="text-sm font-semibold text-neutral-900">{formatCurrencyBRL(account.balance)}</span>
              </article>
            ))}
          </div>
        </section>

        <AddAccountCardModal open={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} />
        <CardDetailsModal
          open={Boolean(selectedCardId)}
          cardId={selectedCardId}
          onClose={() => setSelectedCardId(null)}
          onAddExpense={() => setSelectedCardId(null)}
          onEdit={() => setSelectedCardId(null)}
          onViewStatement={() => setSelectedCardId(null)}
        />
      </main>
    </div>
  )
}
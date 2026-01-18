import { useEffect, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'

type Props = {
  open: boolean
  onClose: () => void
}

export default function MobileFiltersModal({ open, onClose }: Props) {
  const { familyMembers, transactionType, selectedMember, dateRange, setTransactionType, setSelectedMember, setDateRange } =
    useFinance()
  const [localType, setLocalType] = useState(transactionType)
  const [localMember, setLocalMember] = useState(selectedMember)
  const [start, setStart] = useState(dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : '')
  const [end, setEnd] = useState(dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : '')

  useEffect(() => {
    if (!open) return
    setLocalType(transactionType)
    setLocalMember(selectedMember)
    setStart(dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : '')
    setEnd(dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : '')
  }, [open, dateRange, selectedMember, transactionType])

  const applyFilters = () => {
    setTransactionType(localType)
    setSelectedMember(localMember)
    setDateRange(start ? new Date(start) : null, end ? new Date(end) : null)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/40">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <h3 className="text-xl font-semibold text-neutral-900">Filtros</h3>
        <button
          type="button"
          className="rounded-full border border-neutral-300 px-3 py-2"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-white px-6 py-4">
        <div className="space-y-4">
          <section className="space-y-2">
            <p className="text-sm font-semibold text-neutral-700">Tipo de Transação</p>
            <div className="flex gap-2">
              {(['all', 'income', 'expense'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold ${
                    localType === option ? 'bg-neutral-900 text-white' : 'border-neutral-300 text-neutral-600'
                  }`}
                  onClick={() => setLocalType(option)}
                >
                  {option === 'all' ? 'Todos' : option === 'income' ? 'Receitas' : 'Despesas'}
                </button>
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <p className="text-sm font-semibold text-neutral-700">Membro da Família</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold ${
                  !localMember ? 'bg-neutral-900 text-white' : 'border-neutral-300 text-neutral-600'
                }`}
                onClick={() => setLocalMember(null)}
              >
                Todos
              </button>
              {familyMembers.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold ${
                    localMember === member.id ? 'bg-neutral-900 text-white' : 'border-neutral-300 text-neutral-600'
                  }`}
                  onClick={() => setLocalMember(member.id)}
                >
                  {member.name}
                </button>
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <p className="text-sm font-semibold text-neutral-700">Período</p>
            <div className="flex flex-col gap-2">
              <input
                type="date"
                value={start}
                onChange={(event) => setStart(event.target.value)}
                className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              />
              <input
                type="date"
                value={end}
                onChange={(event) => setEnd(event.target.value)}
                className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              />
            </div>
          </section>
        </div>
      </div>
      <div className="border-t border-neutral-200 bg-white p-6">
        <button
          type="button"
          className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white"
          onClick={applyFilters}
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  )
}

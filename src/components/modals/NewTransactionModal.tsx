import { type ChangeEvent, useMemo, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/constants/categories'

const PARCEL_OPTIONS = Array.from({ length: 12 }, (_, index) => ({
  label: index === 0 ? 'À vista (1x)' : `${index + 1}x`,
  value: `${index + 1}`,
}))

type Props = {
  open: boolean
  onClose: () => void
}

export default function NewTransactionModal({ open, onClose }: Props) {
  const {
    addTransaction,
    familyMembers,
    creditCards,
    bankAccounts,
  } = useFinance()

  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [value, setValue] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [memberId, setMemberId] = useState<string | null>(null)
  const [accountId, setAccountId] = useState('')
  const [installments, setInstallments] = useState('1')
  const [isRecurring, setIsRecurring] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [customCategories, setCustomCategories] = useState<string[]>([])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')

  if (!open) return null

  const categories = useMemo(() => {
    const base = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
    return [...base, ...customCategories.filter((cat) => !base.includes(cat))]
  }, [type, customCategories])

  const handleSubmit = () => {
    const parsedValue = Number(value.replace(',', '.'))
    const newErrors: Record<string, string> = {}
    if (!(parsedValue > 0)) newErrors.value = 'Valor deve ser maior que zero.'
    if (description.trim().length < 3) newErrors.description = 'Descrição deve ter ao menos 3 caracteres.'
    if (!category) newErrors.category = 'Selecione uma categoria.'
    if (!accountId) newErrors.account = 'Selecione conta ou cartão.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length) return

    const account = creditCards.find((card) => card.id === accountId)
    const installmentsCount = account && type === 'expense' ? Number(installments) : 1

    addTransaction({
      type,
      amount: parsedValue,
      description,
      category,
      date: new Date(date),
      accountId,
      memberId,
      installments: installmentsCount,
      currentInstallment: installmentsCount > 1 ? 1 : undefined,
      status: 'completed',
      isRecurring: type === 'expense' ? isRecurring : false,
      isPaid: false,
    })

    setToast('Transação registrada com sucesso!')
    reset()
    setTimeout(() => {
      setToast('')
      onClose()
    }, 1200)
  }

  const reset = () => {
    setValue('')
    setDescription('')
    setCategory('')
    setMemberId(null)
    setAccountId('')
    setInstallments('1')
    setIsRecurring(false)
    setErrors({})
  }

  const toggleType = (nextType: 'income' | 'expense') => {
    setType(nextType)
    if (nextType === 'income') {
      setIsRecurring(false)
      setInstallments('1')
    }
  }

  const selectedAccount = creditCards.find((card) => card.id === accountId)

  const showInstallments = type === 'expense' && Boolean(selectedAccount)

  const showRecurrence = type === 'expense'
  const disableRecurrence = Number(installments) > 1

  const handleNewCategory = () => {
    if (!newCategory.trim()) return
    setCustomCategories((prev) => [...prev, newCategory.trim()])
    setCategory(newCategory.trim())
    setNewCategory('')
    setShowNewCategory(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="flex h-full w-full flex-col bg-white">
        <header className="flex items-center justify-between border-b border-neutral-200 px-8 py-6">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${
                type === 'income' ? 'bg-green-100 text-green-600' : 'bg-neutral-900 text-white'
              }`}
            >
              {type === 'income' ? '↘' : '↗'}
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-neutral-1100">Nova Transação</h2>
              <p className="text-sm text-neutral-500">
                Registre entradas e saídas para manter seu controle em dia.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white text-2xl"
            onClick={() => {
              reset()
              onClose()
            }}
          >
            ×
          </button>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden bg-surface-500/70">
          <div className="mx-auto flex w-full max-w-[740px] flex-1 flex-col gap-6 overflow-y-auto px-8 py-8">
            <div className="flex items-center gap-2 rounded-full bg-neutral-100 p-1">
              {(['income', 'expense'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleType(option)}
                  className={`flex-1 rounded-full border border-transparent px-4 py-3 text-sm font-semibold transition ${
                    type === option
                      ? 'bg-white shadow'
                      : 'text-neutral-500 hover:bg-neutral-50'
                  }`}
                >
                  {option === 'income' ? 'Receita' : 'Despesa'}
                </button>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Valor da Transação</span>
                <div className="flex rounded-2xl border border-neutral-300 bg-white px-4">
                  <span className="flex items-center text-neutral-400">R$</span>
                  <input
                    value={value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setValue(event.target.value)
                    }
                    className="w-full border-none bg-transparent py-4 text-lg font-semibold focus:outline-none"
                    type="number"
                    placeholder="0,00"
                  />
                </div>
                {errors.value && <span className="text-xs text-red-600">{errors.value}</span>}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Data</span>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="h-14 rounded-2xl border border-neutral-300 bg-white px-4 text-sm"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-700">Descrição</span>
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ex: Supermercado Semanal"
                className="h-14 rounded-2xl border border-neutral-300 bg-white px-4 text-sm focus:outline-none"
              />
              {errors.description && (
                <span className="text-xs text-red-600">{errors.description}</span>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">Categoria</span>
                <button
                  type="button"
                  className="text-sm font-semibold text-neutral-500"
                  onClick={() => setShowNewCategory((prev) => !prev)}
                >
                  + Nova Categoria
                </button>
              </div>
              {showNewCategory ? (
                <div className="flex gap-2">
                  <input
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    placeholder="Nova categoria"
                    className="flex-1 rounded-2xl border border-neutral-300 bg-white px-4 text-sm"
                  />
                  <button
                    type="button"
                    className="rounded-2xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-600"
                    onClick={handleNewCategory}
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-14 rounded-2xl border border-neutral-300 bg-white px-4 text-sm text-neutral-600"
                >
                  <option value="">Selecione a categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
              {errors.category && (
                <span className="text-xs text-red-600">{errors.category}</span>
              )}
            </label>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Membro</span>
                <select
                  value={memberId ?? ''}
                  onChange={(event) => setMemberId(event.target.value || null)}
                  className="h-14 rounded-2xl border border-neutral-300 bg-white px-4 text-sm text-neutral-600"
                >
                  <option value="">Família (Geral)</option>
                  {familyMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Conta / Cartão</span>
                <select
                  value={accountId}
                  onChange={(event) => setAccountId(event.target.value)}
                  className="h-14 rounded-2xl border border-neutral-300 bg-white px-4 text-sm text-neutral-600"
                >
                  <option value="">Selecione a conta/cartão</option>
                  <optgroup label="Contas Bancárias">
                    {bankAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cartões de Crédito">
                    {creditCards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.account && (
                  <span className="text-xs text-red-600">{errors.account}</span>
                )}
              </label>
            </div>

            {showInstallments && (
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Parcelamento</span>
                <select
                  value={installments}
                  onChange={(event) => setInstallments(event.target.value)}
                  disabled={disableRecurrence}
                  className="h-14 rounded-2xl border border-neutral-300 bg-white px-4 text-sm text-neutral-600"
                >
                  {PARCEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {disableRecurrence && (
                  <span className="text-xs italic text-neutral-500">
                    Parcelamento desabilitado para despesas recorrentes
                  </span>
                )}
              </label>
            )}

            {showRecurrence && (
              <label className="flex flex-col gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    disabled={disableRecurrence}
                    onChange={(event) => {
                      setIsRecurring(event.target.checked)
                      if (event.target.checked) setInstallments('1')
                    }}
                  />
                  <span className="text-sm font-semibold text-neutral-900">
                    Despesa Recorrente
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  {disableRecurrence
                    ? 'Não disponível para compras parceladas.'
                    : 'Contas que se repetem todo mês (Netflix, Spotify, Academia, etc).'}
                </p>
              </label>
            )}
          </div>
        </div>

        <footer className="flex items-center justify-end gap-4 border-t border-neutral-200 px-8 py-6">
          <button
            type="button"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700"
            onClick={() => {
              reset()
              onClose()
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            onClick={handleSubmit}
          >
            Salvar Transação
          </button>
        </footer>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-green-200 bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 shadow-lg">
          ✓ {toast}
        </div>
      )}
    </div>
  )
}

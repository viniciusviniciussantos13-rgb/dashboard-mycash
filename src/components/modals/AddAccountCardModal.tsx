import { useState } from 'react'
import { useFinance } from '@/hooks/useFinance'

type Props = {
  open: boolean
  onClose: () => void
}

const CARD_THEMES = ['black', 'lime', 'white'] as const

export default function AddAccountCardModal({ open, onClose }: Props) {
  const { familyMembers, addBankAccount, addCreditCard } = useFinance()

  const [type, setType] = useState<'account' | 'creditCard'>('account')
  const [name, setName] = useState('')
  const [holderId, setHolderId] = useState('')
  const [balance, setBalance] = useState('')
  const [closingDay, setClosingDay] = useState('')
  const [dueDay, setDueDay] = useState('')
  const [limit, setLimit] = useState('')
  const [lastDigits, setLastDigits] = useState('')
  const [theme, setTheme] = useState<typeof CARD_THEMES[number]>('black')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')

  if (!open) return null

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {}
    if (name.trim().length < 3) nextErrors.name = 'Informe um nome válido'
    if (!holderId) nextErrors.holder = 'Selecione um titular'
    if (type === 'account') {
      if (!(Number(balance) >= 0)) nextErrors.balance = 'Informe o saldo inicial'
    } else {
      const closing = Number(closingDay)
      const due = Number(dueDay)
      const lim = Number(limit)
      if (!closing || closing < 1 || closing > 31) nextErrors.closingDay = 'Dia de fechamento inválido'
      if (!due || due < 1 || due > 31) nextErrors.dueDay = 'Dia de vencimento inválido'
      if (!(lim > 0)) nextErrors.limit = 'Informe limite maior que zero'
      if (!theme) nextErrors.theme = 'Selecione um tema'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    if (type === 'account') {
      addBankAccount({
        name: name.trim(),
        holderId,
        balance: Number(balance),
      })
      setToast('Conta adicionada com sucesso!')
    } else {
      addCreditCard({
        name: name.trim(),
        holderId,
        closingDay: Number(closingDay),
        dueDay: Number(dueDay),
        limit: Number(limit),
        currentBill: 0,
        theme,
        lastDigits: lastDigits || undefined,
      })
      setToast('Cartão adicionado com sucesso!')
    }
    setTimeout(() => {
      setToast('')
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-3xl rounded-shape-20 bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="text-2xl font-semibold text-neutral-1100">Adicionar Conta/Cartão</h2>
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-neutral-300 text-xl"
            onClick={() => onClose()}
          >
            ×
          </button>
        </header>

        <div className="space-y-6 px-6 py-6">
          <div className="flex gap-2 rounded-2xl border border-neutral-300 bg-neutral-100 p-1">
            {(['account', 'creditCard'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  type === option ? 'bg-neutral-900 text-white' : 'text-neutral-600'
                }`}
              >
                {option === 'account' ? 'Conta bancária' : 'Cartão de crédito'}
              </button>
            ))}
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">
              {type === 'account' ? 'Nome da Conta' : 'Nome do Cartão'}
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              placeholder={type === 'account' ? 'Ex: Nubank Conta' : 'Ex: Nubank Black'}
            />
            {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">Titular</span>
            <select
              value={holderId}
              onChange={(event) => setHolderId(event.target.value)}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm text-neutral-600"
            >
              <option value="">Selecione um membro</option>
              {familyMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.holder && <span className="text-xs text-red-600">{errors.holder}</span>}
          </label>

          {type === 'account' ? (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-700">Saldo Inicial</span>
              <input
                type="number"
                min="0"
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
                className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
                placeholder="R$ 0,00"
              />
              {errors.balance && <span className="text-xs text-red-600">{errors.balance}</span>}
            </label>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Dia de Fechamento</span>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={closingDay}
                  onChange={(event) => setClosingDay(event.target.value)}
                  className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
                  placeholder="1 a 31"
                />
                {errors.closingDay && (
                  <span className="text-xs text-red-600">{errors.closingDay}</span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Dia de Vencimento</span>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={dueDay}
                  onChange={(event) => setDueDay(event.target.value)}
                  className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
                  placeholder="1 a 31"
                />
                {errors.dueDay && <span className="text-xs text-red-600">{errors.dueDay}</span>}
              </label>
            </div>
          )}

          {type === 'creditCard' && (
            <>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Limite Total</span>
                <input
                  type="number"
                  min="0"
                  value={limit}
                  onChange={(event) => setLimit(event.target.value)}
                  className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
                />
                {errors.limit && <span className="text-xs text-red-600">{errors.limit}</span>}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-neutral-700">Últimos 4 dígitos (opcional)</span>
                <input
                  type="text"
                  maxLength={4}
                  value={lastDigits}
                  onChange={(event) => setLastDigits(event.target.value)}
                  className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
                  placeholder="1234"
                />
              </label>

              <div className="space-y-2">
                <span className="text-sm font-semibold text-neutral-700">Tema Visual</span>
                <div className="flex gap-2">
                  {CARD_THEMES.map((themeOption) => (
                    <button
                      key={themeOption}
                      type="button"
                      onClick={() => setTheme(themeOption)}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-2xl border px-3 py-4 text-xs font-semibold transition ${
                        theme === themeOption
                          ? 'border-blue-600 bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-white text-neutral-600'
                      }`}
                    >
                      <span>{themeOption}</span>
                    </button>
                  ))}
                </div>
                {errors.theme && <span className="text-xs text-red-600">{errors.theme}</span>}
              </div>
            </>
          )}
        </div>

        <footer className="flex items-center justify-end gap-4 border-t border-neutral-200 px-6 py-4">
          <button
            type="button"
            className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-700"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white"
            onClick={handleSubmit}
          >
            Adicionar
          </button>
        </footer>

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            ✓ {toast}
          </div>
        )}
      </div>
    </div>
  )
}

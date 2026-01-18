import { type ChangeEvent, useRef, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'

const ROLE_SUGGESTIONS = ['Pai', 'Mãe', 'Filho', 'Filha', 'Avô', 'Avó', 'Tio', 'Tia']

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddMemberModal({ open, onClose }: Props) {
  const { addFamilyMember } = useFinance()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [income, setIncome] = useState('')
  const [avatarType, setAvatarType] = useState<'url' | 'upload'>('url')
  const [avatarValue, setAvatarValue] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const reset = () => {
    setName('')
    setRole('')
    setIncome('')
    setAvatarValue('')
    setErrors({})
  }

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {}
    if (name.trim().length < 3) nextErrors.name = 'Por favor, insira um nome válido'
    if (!role.trim()) nextErrors.role = 'Por favor, informe a função na família'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const newMember = {
      id: crypto.randomUUID(),
      name: name.trim(),
      role: role.trim(),
      avatarUrl: avatarValue || undefined,
      monthlyIncome: Number(income.replace(',', '.')) || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addFamilyMember(newMember)
    setToast('Membro adicionado com sucesso!')
    reset()
    setTimeout(() => {
      setToast('')
      onClose()
    }, 1200)
  }

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (file.size > 5_000_000) {
      setErrors((prev) => ({ ...prev, avatar: 'Arquivo deve ter até 5MB' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setAvatarValue(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-shape-20 bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-1100">Adicionar Membro da Família</h2>
            <p className="text-sm text-neutral-500">Convide alguém para participar do controle financeiro.</p>
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-neutral-300 text-2xl"
            onClick={() => {
              reset()
              onClose()
            }}
          >
            ×
          </button>
        </header>

        <div className="space-y-4 px-6 py-6">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">Nome Completo</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              placeholder="Ex: João Silva"
            />
            {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">Função na Família</span>
            <input
              list="role-options"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              placeholder="Ex: Pai, Mãe, Filho..."
            />
            <datalist id="role-options">
              {ROLE_SUGGESTIONS.map((roleOption) => (
                <option key={roleOption} value={roleOption} />
              ))}
            </datalist>
            {errors.role && <span className="text-xs text-red-600">{errors.role}</span>}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">Avatar</span>
            <div className="flex gap-2">
              {(['url', 'upload'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAvatarType(mode)}
                  className={`flex-1 rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                    avatarType === mode
                      ? 'border-neutral-900 bg-neutral-100'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {mode === 'url' ? 'URL' : 'Upload'}
                </button>
              ))}
            </div>
            {avatarType === 'url' ? (
              <input
                value={avatarValue}
                onChange={(event) => setAvatarValue(event.target.value)}
                placeholder="Cole um link de imagem"
                className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              />
            ) : (
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleUpload}
                className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              />
            )}
            {errors.avatar && <span className="text-xs text-red-600">{errors.avatar}</span>}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-700">Renda Mensal Estimada (opcional)</span>
            <input
              value={income}
              onChange={(event) => setIncome(event.target.value)}
              placeholder="R$ 0,00"
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              type="number"
              min="0"
            />
          </label>
        </div>

        <footer className="flex items-center justify-end gap-4 border-t border-neutral-200 px-6 py-5">
          <button
            type="button"
            className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-700"
            onClick={() => {
              reset()
              onClose()
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white"
            onClick={handleSubmit}
          >
            Adicionar Membro
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

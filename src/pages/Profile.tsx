import { useMemo, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

export default function Profile() {
  const { familyMembers } = useFinance()
  const [activeTab, setActiveTab] = useState<'info' | 'settings'>('info')
  const mainMember = useMemo(() => familyMembers[0], [familyMembers])

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container-content py-6 space-y-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="heading-x-small text-neutral-1100">Perfil</h1>
            <p className="paragraph-small text-neutral-500">
              Gerencie seus dados, membros e configurações da conta.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === 'info'
                  ? 'bg-neutral-900 text-white'
                  : 'border border-neutral-300 text-neutral-700'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Informações
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === 'settings'
                  ? 'bg-neutral-900 text-white'
                  : 'border border-neutral-300 text-neutral-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Configurações
            </button>
          </div>
        </header>

        {activeTab === 'info' ? (
          <section className="space-y-6">
            <div className="flex flex-col gap-4 rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-full bg-neutral-200">
                  {mainMember?.avatarUrl ? (
                    <img
                      src={mainMember.avatarUrl}
                      alt={mainMember.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-neutral-500">
                      {mainMember?.name?.charAt(0) ?? '?'}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-1100">{mainMember?.name ?? 'Usuário'}</h2>
                  <p className="text-sm font-semibold text-neutral-500">{mainMember?.role ?? 'Função não definida'}</p>
                  <p className="text-sm text-neutral-500">Conta principal</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1 rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Renda mensal estimada</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrencyBRL(mainMember?.monthlyIncome ?? 0)}
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">Membros da Família</h3>
                <button className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-600">
                  + Novo membro
                </button>
              </div>
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-neutral-200">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-neutral-500">
                            {member.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{member.name}</p>
                        <p className="text-xs text-neutral-500">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">{formatCurrencyBRL(member.monthlyIncome ?? 0)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-6 rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">
              Configure preferências do app, segurança e notificações futuras. Lorem ipsum placeholder para
              demonstrar o layout.
            </p>
            <button className="rounded-full border border-red-600 px-4 py-2 text-sm font-semibold text-red-600">
              Sair
            </button>
          </section>
        )}
      </main>
    </div>
  )
}
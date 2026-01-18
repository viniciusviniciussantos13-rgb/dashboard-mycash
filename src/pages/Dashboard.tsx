import DashboardHeader from '@/components/dashboard/DashboardHeader/DashboardHeader'

/**
 * Página principal do Dashboard
 * Exibe visão geral financeira com cards de resumo, gráficos e tabela de transações
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container-content py-6">
        {/* Header com controles */}
        <DashboardHeader />

        {/* Conteúdo do dashboard será implementado nos próximos prompts */}
        <div className="mt-6">
          <h1 className="heading-x-small text-neutral-1100 mb-6">
            Dashboard
          </h1>
          <p className="paragraph-small text-neutral-500">
            Cards de resumo, gráficos e tabela serão implementados nos próximos prompts
          </p>
        </div>
      </main>
    </div>
  )
}
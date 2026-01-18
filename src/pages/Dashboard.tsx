import DashboardHeader from '@/components/dashboard/DashboardHeader/DashboardHeader'
import SummaryCards from '@/components/dashboard/SummaryCards/SummaryCards'
import ExpensesByCategoryCarousel from '@/components/dashboard/ExpensesByCategoryCarousel/ExpensesByCategoryCarousel'
import FinancialFlowChart from '@/components/dashboard/FinancialFlowChart/FinancialFlowChart'
import CreditCardsWidget from '@/components/dashboard/CreditCardsWidget/CreditCardsWidget'
import UpcomingExpensesWidget from '@/components/dashboard/UpcomingExpensesWidget/UpcomingExpensesWidget'

/**
 * Página principal do Dashboard
 * Exibe visão geral financeira com cards de resumo, gráficos e tabela de transações
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-100 w-full">
      {/* Header com controles - largura total */}
      <div className="w-full">
        <DashboardHeader />
      </div>

      {/* Conteúdo do dashboard */}
      <div className="w-full px-4 md:px-6 lg:px-8 pb-8">
        <div className="flex flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-8">
              <SummaryCards />
              <ExpensesByCategoryCarousel />
            </div>
            <CreditCardsWidget />
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <FinancialFlowChart />
            <UpcomingExpensesWidget />
          </div>
        </div>

        <div className="w-full max-w-[1400px]">
          <div className="mt-6">
            <h1 className="heading-x-small text-neutral-1100 mb-6">Dashboard</h1>
            <p className="paragraph-small text-neutral-500">
              Cards de resumo, gráficos e tabela serão implementados nos próximos prompts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
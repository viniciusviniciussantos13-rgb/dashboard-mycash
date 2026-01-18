import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader/DashboardHeader'
import SummaryCards from '@/components/dashboard/SummaryCards/SummaryCards'
import ExpensesByCategoryCarousel from '@/components/dashboard/ExpensesByCategoryCarousel/ExpensesByCategoryCarousel'
import FinancialFlowChart from '@/components/dashboard/FinancialFlowChart/FinancialFlowChart'
import CreditCardsWidget from '@/components/dashboard/CreditCardsWidget/CreditCardsWidget'
import UpcomingExpensesWidget from '@/components/dashboard/UpcomingExpensesWidget/UpcomingExpensesWidget'
import TransactionsTable from '@/components/dashboard/TransactionsTable/TransactionsTable'
import NewTransactionModal from '@/components/modals/NewTransactionModal'
import AddMemberModal from '@/components/modals/AddMemberModal'
import AddAccountCardModal from '@/components/modals/AddAccountCardModal'
import CardDetailsModal from '@/components/modals/CardDetailsModal'

/**
 * Página principal do Dashboard
 * Exibe visão geral financeira com cards de resumo, gráficos e tabela de transações
 */
export default function Dashboard() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-neutral-100 w-full">
      {/* Header com controles - largura total */}
      <div className="w-full">
        <DashboardHeader
          onNewTransaction={() => setIsNewTransactionOpen(true)}
          onAddMember={() => setIsAddMemberOpen(true)}
        />
      </div>
      <NewTransactionModal open={isNewTransactionOpen} onClose={() => setIsNewTransactionOpen(false)} />
      <AddMemberModal open={isAddMemberOpen} onClose={() => setIsAddMemberOpen(false)} />
      <AddAccountCardModal open={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} />
      <CardDetailsModal
        open={Boolean(selectedCardId)}
        cardId={selectedCardId}
        onClose={() => setSelectedCardId(null)}
      />

      {/* Conteúdo do dashboard */}
      <div className="w-full px-4 md:px-6 lg:px-8 pb-8">
        <div className="flex flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-8">
              <SummaryCards />
              <ExpensesByCategoryCarousel />
            </div>
            <CreditCardsWidget
              onAddAccount={() => setIsAddAccountOpen(true)}
              onCardSelect={(cardId) => setSelectedCardId(cardId)}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <FinancialFlowChart />
            <UpcomingExpensesWidget />
          </div>

          <div className="mt-8">
            <TransactionsTable />
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
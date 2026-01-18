import { useContext } from 'react'
import { FinanceContext, FinanceContextType } from '@/contexts/FinanceContext'

/**
 * Hook useFinance - Único ponto de acesso ao contexto financeiro
 * Encapsula useContext e fornece acesso limpo a todo o estado e funções
 * 
 * @throws Error se usado fora do FinanceProvider
 */
export function useFinance(): FinanceContextType {
  const context = useContext(FinanceContext)

  if (context === undefined) {
    throw new Error('useFinance deve ser usado dentro de um FinanceProvider')
  }

  return context
}

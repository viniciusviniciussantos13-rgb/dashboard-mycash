import { format } from 'date-fns'
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

const ITEMS_PER_PAGE = 5

const pageNumberBuilder = (totalPages: number, currentPage: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set<number>([1, 2, 3, totalPages - 1, totalPages, currentPage])
  if (currentPage - 1 > 3) pages.add(currentPage - 1)
  if (currentPage + 1 < totalPages - 1) pages.add(currentPage + 1)
  if (currentPage > 3) pages.add(currentPage)

  const sorted = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  const withEllipsis: Array<number | 'ellipsis'> = []
  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i]
    const previous = sorted[i - 1]
    if (previous !== undefined && current - previous > 1) {
      withEllipsis.push('ellipsis')
    }
    withEllipsis.push(current)
  }

  return withEllipsis
}

export default function TransactionsTable() {
  const { getFilteredTransactions, bankAccounts, creditCards, familyMembers } = useFinance()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const tableRef = useRef<HTMLDivElement>(null)

  const globalFiltered = useMemo(() => getFilteredTransactions(), [getFilteredTransactions])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, typeFilter, globalFiltered.length])

  const tableData = useMemo(() => {
    let result = [...globalFiltered]
    if (typeFilter !== 'all') {
      result = result.filter((item) => item.type === typeFilter)
    }
    if (searchTerm.trim()) {
      const normalized = searchTerm.trim().toLowerCase()
      result = result.filter(
        (item) =>
          item.description.toLowerCase().includes(normalized) ||
          item.category.toLowerCase().includes(normalized)
      )
    }
    return result.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [globalFiltered, typeFilter, searchTerm])

  const totalPages = Math.max(1, Math.ceil(tableData.length / ITEMS_PER_PAGE))
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return tableData.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage, tableData])

  useEffect(() => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentPage])

  const filteredCount = tableData.length
  const startItem = filteredCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endItem = Math.min(filteredCount, currentPage * ITEMS_PER_PAGE)
  const pagesToRender = pageNumberBuilder(totalPages, currentPage)

  const formatOrigin = (transactionId: string | undefined) => {
    if (!transactionId) return 'Desconhecido'
    const bank = bankAccounts.find((account) => account.id === transactionId)
    if (bank) return `${bank.name} conta`
    const card = creditCards.find((card) => card.id === transactionId)
    if (card) {
      return `Crédito ${card.name} **** ${card.lastDigits ?? '0000'}`
    }
    return 'Desconhecido'
  }

  const memberAvatar = (memberId: string | null) => {
    const member = familyMembers.find((m) => m.id === memberId)
    if (!member) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-600">
          ?
        </div>
      )
    }
    if (!member.avatarUrl) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-600">
          {member.name.charAt(0)}
        </div>
      )
    }
    return (
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={member.avatarUrl}
        alt={member.name}
        loading="lazy"
      />
    )
  }

  return (
    <section ref={tableRef} className="w-full rounded-shape-20 border border-neutral-300 bg-surface-500 p-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-2xl font-semibold text-neutral-1100">
          <span className="text-neutral-900">🧾</span>
          Extrato detalhado
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative w-full md:w-[256px]">
            <span className="sr-only">Buscar lançamentos</span>
            <input
              value={searchTerm}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
              placeholder="Buscar lançamentos..."
              className="h-11 w-full rounded-full border border-neutral-300 bg-white px-4 pl-10 text-sm placeholder:text-neutral-400 focus:border-neutral-900"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              🔍
            </span>
          </label>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as 'all' | 'income' | 'expense')}
            className="h-11 w-full max-w-[140px] rounded-full border border-neutral-300 bg-white px-4 text-sm text-neutral-600"
          >
            <option value="all">Todos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
        </div>
      </header>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-0">
          <thead>
            <tr className="bg-neutral-100 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <th className="w-[50px] px-3 py-3">Membro</th>
              <th className="px-3 py-3">Categorias</th>
              <th className="px-3 py-3">Datas</th>
              <th className="px-3 py-3">Descrição</th>
              <th className="px-3 py-3">Conta/cartão</th>
              <th className="px-3 py-3">Parcelas</th>
              <th className="w-[120px] px-3 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-sm font-semibold text-neutral-500">
                  Nenhum lançamento encontrado.
                </td>
              </tr>
            ) : (
              currentPageData.map((transaction, index) => {
                const isEven = index % 2 === 0
                const sign = transaction.type === 'income' ? '+' : '-'
                return (
                  <tr
                    key={transaction.id}
                    className={`group ${isEven ? 'bg-white' : 'bg-neutral-50'} transition duration-200 hover:bg-neutral-100`}
                  >
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center">{memberAvatar(transaction.memberId)}</div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-sm font-medium text-neutral-500">
                        {format(transaction.date, 'dd/MM/yyyy')}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '↘' : '↗'}
                        </span>
                        <span className="text-sm font-semibold text-neutral-1100">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-sm font-medium text-neutral-500">{formatOrigin(transaction.accountId)}</span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-sm font-medium text-neutral-500">
                        {transaction.installments > 1 ? `${transaction.installments}x` : '-'}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span
                        className={`text-sm font-semibold ${
                          transaction.type === 'income' ? 'text-green-700' : 'text-neutral-1100'
                        }`}
                      >
                        {sign}
                        {formatCurrencyBRL(transaction.amount)}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs font-semibold text-neutral-500 md:flex-row">
        <div>
          Mostrando {startItem === 0 ? 0 : startItem} a {endItem} de {filteredCount}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ‹
          </button>
          {pagesToRender.map((page, index) =>
            page === 'ellipsis' ? (
              <span key={`ell-${index}`}>...</span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 min-w-[32px] items-center justify-center rounded-full border border-neutral-300 text-sm font-semibold transition ${
                  currentPage === page
                    ? 'bg-neutral-900 text-white'
                    : 'bg-transparent text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

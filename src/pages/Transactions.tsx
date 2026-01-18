import { useEffect, useMemo, useRef, useState } from 'react'
import { format } from 'date-fns'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

export default function Transactions() {
  const { getFilteredTransactions, bankAccounts, creditCards, familyMembers, transactionType } = useFinance()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>(transactionType)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [accountFilter, setAccountFilter] = useState('')
  const [memberFilter, setMemberFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sortField, setSortField] = useState<'date' | 'amount'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const tableRef = useRef<HTMLDivElement | null>(null)

  const baseData = useMemo(() => getFilteredTransactions(), [getFilteredTransactions])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, typeFilter, categoryFilter, accountFilter, memberFilter, statusFilter, startDate, endDate])

  const filteredData = useMemo(() => {
    let data = [...baseData]
    if (typeFilter !== 'all') data = data.filter((item) => item.type === typeFilter)
    if (categoryFilter) data = data.filter((item) => item.category === categoryFilter)
    if (accountFilter) data = data.filter((item) => item.accountId === accountFilter)
    if (memberFilter) data = data.filter((item) => item.memberId === memberFilter)
    if (statusFilter !== 'all') data = data.filter((item) => item.status === statusFilter)
    if (search.trim()) {
      const text = search.trim().toLowerCase()
      data = data.filter(
        (item) => item.description.toLowerCase().includes(text) || item.category.toLowerCase().includes(text)
      )
    }
    if (startDate) data = data.filter((item) => new Date(item.date) >= new Date(startDate))
    if (endDate) data = data.filter((item) => new Date(item.date) <= new Date(endDate))

    data.sort((a, b) => {
      const fieldA = sortField === 'amount' ? a.amount : new Date(a.date).getTime()
      const fieldB = sortField === 'amount' ? b.amount : new Date(b.date).getTime()
      return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA
    })

    return data
  }, [
    baseData,
    typeFilter,
    categoryFilter,
    accountFilter,
    memberFilter,
    statusFilter,
    search,
    startDate,
    endDate,
    sortField,
    sortOrder,
  ])

  const perPage = 10
  const totalPages = Math.max(1, Math.ceil(filteredData.length / perPage))
  const currentData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage)

  useEffect(() => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentPage, filteredData.length])

  const totalIncome = filteredData.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0)
  const totalExpenses = filteredData.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0)

  const handleExport = () => {
    const rows = [['Data', 'Descrição', 'Categoria', 'Conta', 'Valor']]
    filteredData.forEach((tx) => {
      rows.push([
        format(new Date(tx.date), 'dd/MM/yyyy'),
        tx.description,
        tx.category || 'Sem categoria',
        bankAccounts.find((acc) => acc.id === tx.accountId)?.name ??
          creditCards.find((card) => card.id === tx.accountId)?.name ??
          'Desconhecido',
        tx.type === 'income' ? `+${formatCurrencyBRL(tx.amount)}` : `-${formatCurrencyBRL(tx.amount)}`,
      ])
    })
    const blob = new Blob([rows.map((row) => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = 'transacoes.csv'
    link.click()
    URL.revokeObjectURL(href)
  }

  const fieldLabel = (field: 'date' | 'amount') => (sortField === field ? (sortOrder === 'asc' ? '↑' : '↓') : '')
  const handleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container-content py-6 space-y-6" ref={tableRef}>
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="heading-x-small text-neutral-1100 mb-1">Transações</h1>
            <p className="paragraph-small text-neutral-500">
              Controle absoluto sobre receitas, despesas e filtros avançados.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700"
              onClick={handleExport}
            >
              Exportar CSV
            </button>
            <button className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">
              Nova Transação
            </button>
          </div>
        </header>

        <section className="space-y-4 rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar lançamentos..."
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
            />
            <select
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value as 'all' | 'income' | 'expense')
                setCurrentPage(1)
              }}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
            >
              <option value="all">Todos</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value)
                setCurrentPage(1)
              }}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
            >
              <option value="">Todas categorias</option>
              {[...new Set(baseData.map((tx) => tx.category))].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <select
              value={accountFilter}
              onChange={(event) => {
                setAccountFilter(event.target.value)
                setCurrentPage(1)
              }}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
            >
              <option value="">Todas origens</option>
              {bankAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
              {creditCards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.name}
                </option>
              ))}
            </select>
            <select
              value={memberFilter}
              onChange={(event) => {
                setMemberFilter(event.target.value)
                setCurrentPage(1)
              }}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
            >
              <option value="">Todos membros</option>
              {familyMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as 'all' | 'completed' | 'pending')
                setCurrentPage(1)
              }}
              className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
            >
              <option value="all">Todos os status</option>
              <option value="completed">Concluído</option>
              <option value="pending">Pendente</option>
            </select>
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(event) => {
                  setStartDate(event.target.value)
                  setCurrentPage(1)
                }}
                className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              />
              <input
                type="date"
                value={endDate}
                onChange={(event) => {
                  setEndDate(event.target.value)
                  setCurrentPage(1)
                }}
                className="h-12 rounded-2xl border border-neutral-300 px-4 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Receitas</p>
            <p className="text-lg font-semibold text-green-700">{formatCurrencyBRL(totalIncome)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Despesas</p>
            <p className="text-lg font-semibold text-neutral-900">{formatCurrencyBRL(totalExpenses)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Diferença</p>
            <p className={`text-lg font-semibold ${totalIncome - totalExpenses >= 0 ? 'text-green-700' : 'text-red-600'}`}>
              {formatCurrencyBRL(totalIncome - totalExpenses)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Total</p>
            <p className="text-lg font-semibold text-neutral-900">{filteredData.length} lançamentos</p>
          </div>
        </section>

        <section className="rounded-shape-20 border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-neutral-500">
                  <th className="px-3 py-3 text-left">Membro</th>
                  <th className="px-3 py-3 text-left cursor-pointer" onClick={() => handleSort('date')}>
                    Data {fieldLabel('date')}
                  </th>
                  <th className="px-3 py-3 text-left">Descrição</th>
                  <th className="px-3 py-3 text-left">Categoria</th>
                  <th className="px-3 py-3 text-left">Conta/cartão</th>
                  <th className="px-3 py-3 text-left">Parcelas</th>
                  <th className="px-3 py-3 text-right cursor-pointer" onClick={() => handleSort('amount')}>
                    Valor {fieldLabel('amount')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-sm text-neutral-500">
                      Nenhum lançamento encontrado.
                    </td>
                  </tr>
                ) : (
                  currentData.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="px-3 py-4 text-neutral-600">
                        {familyMembers.find((m) => m.id === transaction.memberId)?.name ?? 'Família'}
                      </td>
                      <td className="px-3 py-4 text-neutral-600">{format(new Date(transaction.date), 'dd/MM/yyyy')}</td>
                      <td className="px-3 py-4 text-neutral-900 font-semibold">{transaction.description}</td>
                      <td className="px-3 py-4">
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-500">
                          {transaction.category || 'Sem categoria'}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-neutral-600">
                        {bankAccounts.find((acc) => acc.id === transaction.accountId)?.name ??
                          creditCards.find((card) => card.id === transaction.accountId)?.name ??
                          'Desconhecido'}
                      </td>
                      <td className="px-3 py-4 text-neutral-600">
                        {transaction.installments > 1 ? `${transaction.installments}x` : '-'}
                      </td>
                      <td className="px-3 py-4 text-right font-semibold">
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrencyBRL(transaction.amount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex items-center justify-between text-xs font-semibold text-neutral-500">
          <span>
            Mostrando {filteredData.length === 0 ? 0 : (currentPage - 1) * perPage + 1} a{' '}
            {Math.min(filteredData.length, currentPage * perPage)} de {filteredData.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="rounded-full border border-neutral-300 px-2 py-1 disabled:opacity-40"
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`rounded-full px-3 py-1 ${currentPage === page ? 'bg-neutral-900 text-white' : 'border border-neutral-300'}`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded-full border border-neutral-300 px-2 py-1 disabled:opacity-40"
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
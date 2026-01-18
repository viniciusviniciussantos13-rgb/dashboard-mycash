import { useState, useEffect } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { headerIcons } from '@/assets/dashboard-assets'
import SearchInput from './SearchInput'
import FilterButton from './FilterButton'
import DatePicker from './DatePicker'
import MembersWidget from './MembersWidget'

/**
 * DashboardHeader - Barra de controles do dashboard
 * Contém busca, filtros, seletor de data e membros
 */
export default function DashboardHeader() {
  const { setSearchText } = useFinance()
  const [searchValue, setSearchValue] = useState('')

  // Busca em tempo real
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchValue)
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timer)
  }, [searchValue, setSearchText])

  return (
    <div
      className="
        flex flex-col lg:flex-row lg:items-center lg:justify-between
        gap-2 lg:gap-0
        w-full mb-6
      "
      data-name="Navbar"
    >
      {/* Seção esquerda: Busca, Filtros e Data */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
        {/* Campo de busca */}
        <SearchInput value={searchValue} onChange={setSearchValue} />

        {/* Botão de filtros */}
        <FilterButton />

        {/* Seletor de período */}
        <DatePicker />
      </div>

      {/* Seção direita: Membros e Nova Transação */}
      <div className="flex items-center gap-2 lg:gap-2">
        {/* Widget de membros */}
        <MembersWidget />

        {/* Botão Nova Transação */}
        <button
          className="
            bg-neutral-1100 text-surface-500
            flex items-center gap-2
            px-4 py-3
            rounded-shape-100
            label-large
            hover:bg-neutral-900
            transition-colors duration-200
            w-full sm:w-auto
            justify-center
            shrink-0
          "
          data-name="Btn"
          onClick={() => {
            // TODO: Abrir modal de nova transação (PROMPT 12)
            console.log('Nova transação')
          }}
        >
          {/* Ícone + - 16x16px conforme Figma */}
          <div className="overflow-clip relative shrink-0 size-4" data-name="fi-rr-plus">
            <div className="absolute inset-0" style={{ fill: 'rgba(255, 255, 255, 1)' }}>
              <img
                alt="Plus"
                className="block max-w-none size-full"
                src={headerIcons.plus}
              />
            </div>
          </div>
          <span>Nova transação</span>
        </button>
      </div>
    </div>
  )
}

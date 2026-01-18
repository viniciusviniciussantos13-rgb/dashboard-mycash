import { useState, useRef, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, startOfYear, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useFinance } from '@/hooks/useFinance'
import { headerIcons } from '@/assets/dashboard-assets'

/**
 * DatePicker - Seletor de período com calendário
 * Desktop: 2 meses lado a lado
 * Mobile: 1 mês com setas
 */
export default function DatePicker() {
  const { dateRange, setDateRange } = useFinance()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStart, setSelectedStart] = useState<Date | null>(dateRange.startDate)
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(dateRange.endDate)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Formatar período para exibição
  const formatPeriod = () => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${format(dateRange.startDate, 'dd MMM', { locale: ptBR })} - ${format(dateRange.endDate, 'dd MMM yyyy', { locale: ptBR })}`
    }
    if (dateRange.startDate) {
      return format(dateRange.startDate, 'dd MMM yyyy', { locale: ptBR })
    }
    return format(new Date(), 'dd MMM - dd MMM yyyy', { locale: ptBR })
  }

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        // Aplicar seleção ao fechar
        if (selectedStart && selectedEnd) {
          setDateRange(selectedStart, selectedEnd)
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, selectedStart, selectedEnd, setDateRange])

  // Atalhos rápidos
  const quickRanges = {
    'Este mês': () => {
      const start = startOfMonth(new Date())
      const end = endOfMonth(new Date())
      setSelectedStart(start)
      setSelectedEnd(end)
      setDateRange(start, end)
      setIsOpen(false)
    },
    'Mês passado': () => {
      const lastMonth = subMonths(new Date(), 1)
      const start = startOfMonth(lastMonth)
      const end = endOfMonth(lastMonth)
      setSelectedStart(start)
      setSelectedEnd(end)
      setDateRange(start, end)
      setIsOpen(false)
    },
    'Últimos 3 meses': () => {
      const start = startOfMonth(subMonths(new Date(), 2))
      const end = endOfMonth(new Date())
      setSelectedStart(start)
      setSelectedEnd(end)
      setDateRange(start, end)
      setIsOpen(false)
    },
    'Este ano': () => {
      const start = startOfYear(new Date())
      const end = new Date()
      setSelectedStart(start)
      setSelectedEnd(end)
      setDateRange(start, end)
      setIsOpen(false)
    },
  }

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          border border-neutral-500 border-solid
          flex items-center gap-2
          px-6 py-3
          rounded-shape-100
          shrink-0
          hover:bg-neutral-100
          transition-colors duration-200
          w-full sm:w-auto
        "
        data-name="select-date"
      >
        {/* Ícone de calendário */}
        <div className="overflow-clip relative shrink-0 size-4">
          <img
            alt="Calendário"
            className="block max-w-none size-full"
            src={headerIcons.calendar}
          />
        </div>
        <span className="paragraph-large text-neutral-1100 text-left">
          {formatPeriod()}
        </span>
      </button>

      {/* Calendário (simplificado - versão completa seria mais complexa) */}
      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-2
            bg-surface-500
            border border-neutral-300
            rounded-lg
            shadow-lg
            p-4
            min-w-[320px] lg:min-w-[640px]
            z-50
          "
        >
          {/* Atalhos rápidos */}
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-neutral-300">
            {Object.entries(quickRanges).map(([label, handler]) => (
              <button
                key={label}
                onClick={handler}
                className="
                  px-3 py-1.5
                  bg-neutral-100 text-neutral-1100
                  rounded-shape-100
                  label-small
                  hover:bg-neutral-200
                  transition-colors duration-200
                "
              >
                {label}
              </button>
            ))}
          </div>

          {/* Calendário básico (placeholder - implementação completa seria mais complexa) */}
          <div className="text-center py-4">
            <p className="paragraph-small text-neutral-500">
              Calendário completo será implementado com biblioteca de calendário
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="
                mt-4 px-4 py-2
                bg-neutral-1100 text-surface-500
                rounded-shape-100
                label-medium
                hover:bg-neutral-900
                transition-colors duration-200
              "
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

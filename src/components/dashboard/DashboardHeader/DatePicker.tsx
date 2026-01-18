import { useState, useRef, useEffect } from 'react'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useFinance } from '@/hooks/useFinance'
import { headerIcons } from '@/assets/dashboard-assets'
import CalendarModal from './CalendarModal'

/**
 * DatePicker - Seletor de período com calendário
 * Desktop: calendário completo conforme design Figma
 * Mobile: calendário completo conforme design Figma
 */
export default function DatePicker() {
  const { dateRange, setDateRange } = useFinance()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStart, setSelectedStart] = useState<Date | null>(dateRange.startDate)
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(dateRange.endDate)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Formatar período para exibição (conforme Figma: "01 Jan - 31 Jan 2026")
  const formatPeriod = () => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${format(dateRange.startDate, 'dd MMM', { locale: ptBR })} - ${format(dateRange.endDate, 'dd MMM yyyy', { locale: ptBR })}`
    }
    if (dateRange.startDate) {
      return format(dateRange.startDate, 'dd MMM yyyy', { locale: ptBR })
    }
    // Padrão: primeiro e último dia do mês atual
    const now = new Date()
    return `${format(startOfMonth(now), 'dd MMM', { locale: ptBR })} - ${format(endOfMonth(now), 'dd MMM yyyy', { locale: ptBR })}`
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
        {/* Ícone de calendário - 16x16px conforme Figma */}
        <div className="overflow-clip relative shrink-0 size-4" data-name="fi-rr-calendar">
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

      {/* Calendário completo conforme design Figma */}
      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-2
            z-50
          "
        >
          <CalendarModal
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onSelectDate={(date) => {
              if (!selectedStart || (selectedStart && selectedEnd)) {
                // Nova seleção
                setSelectedStart(date)
                setSelectedEnd(null)
              } else if (selectedStart && !selectedEnd) {
                // Definir fim do intervalo
                if (date >= selectedStart) {
                  setSelectedEnd(date)
                } else {
                  // Se a data for anterior, inverte
                  setSelectedEnd(selectedStart)
                  setSelectedStart(date)
                }
              }
            }}
            onClear={() => {
              setSelectedStart(null)
              setSelectedEnd(null)
              setDateRange(null, null)
            }}
            onCancel={() => {
              setIsOpen(false)
              // Reverter para valores do contexto
              setSelectedStart(dateRange.startDate)
              setSelectedEnd(dateRange.endDate)
            }}
            onOK={() => {
              if (selectedStart) {
                setDateRange(selectedStart, selectedEnd || selectedStart)
              }
              setIsOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

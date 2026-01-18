import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns'
import { enUS } from 'date-fns/locale'
import { calendarIcons } from '@/assets/dashboard-assets'

type CalendarModalProps = {
  selectedStart: Date | null
  selectedEnd: Date | null
  onSelectDate: (date: Date) => void
  onClear: () => void
  onCancel: () => void
  onOK: () => void
}

/**
 * CalendarModal - Modal de calendário completo conforme design Figma
 * Inclui header, navegação, grid de calendário e botões de ação
 */
export default function CalendarModal({
  selectedStart,
  selectedEnd,
  onSelectDate,
  onClear,
  onCancel,
  onOK,
}: CalendarModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Formatar data selecionada para exibição (ex: "Mon, Aug 17")
  const formatSelectedDate = () => {
    if (selectedStart) {
      return format(selectedStart, 'EEE, MMM d', { locale: enUS })
    }
    return 'Select date'
  }

  // Obter todas as semanas do mês
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const isDateSelected = (date: Date) => {
    if (!selectedStart) return false
    if (selectedEnd) {
      return (date >= selectedStart && date <= selectedEnd) || isSameDay(date, selectedStart)
    }
    return isSameDay(date, selectedStart)
  }

  const isDateInRange = (date: Date) => {
    if (!selectedStart || !selectedEnd) return false
    return date >= selectedStart && date <= selectedEnd
  }

  return (
    <div
      className="
        bg-surface-500
        border border-neutral-300 border-solid
        rounded-[28px]
        overflow-hidden
        w-full max-w-[360px]
        z-50
      "
      data-name="Modal date picker"
    >
      {/* Header */}
      <div
        className="
          border-b border-neutral-300 border-solid
          flex gap-2 items-end justify-center
          pb-3 px-6 pt-4
        "
        data-name="Header"
      >
        <div className="flex flex-[1_0_0] flex-col gap-9 items-start">
          <p className="label-large text-neutral-500 h-4 leading-5 text-[14px] tracking-[0.1px]">
            Select date
          </p>
          <p className="text-neutral-1100 h-10 leading-10 text-[32px] tracking-[0px] font-normal">
            {formatSelectedDate()}
          </p>
        </div>
        <div className="flex items-center justify-center shrink-0 size-12">
          {/* Ícone de edição - 24x24px */}
          <div className="overflow-clip relative shrink-0 size-6">
            <div className="absolute inset-[12.5%]">
              <div className="absolute inset-0" style={{ fill: 'rgba(73, 69, 79, 1)' }}>
                <img alt="" className="block max-w-none size-full" src={calendarIcons.edit} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação de mês */}
      <div
        className="
          flex items-center justify-between
          pl-4 pr-3 py-1
        "
        data-name="Local Selection Row"
      >
        {/* Dropdown de mês/ano */}
        <div className="flex gap-2 items-center justify-center overflow-clip pl-2 pr-1 py-2.5 rounded-shape-100">
          <span className="label-large text-neutral-500 text-[14px] tracking-[0.1px]">
            {format(currentMonth, 'MMMM yyyy', { locale: enUS })}
          </span>
          {/* Ícone dropdown */}
          <div className="overflow-clip relative shrink-0 size-[18px]">
            <div className="absolute inset-[41.67%_29.17%_37.5%_29.17%]">
              <div className="absolute inset-0" style={{ fill: 'rgba(73, 69, 79, 1)' }}>
                <img alt="" className="block max-w-none size-full" src={calendarIcons.dropdown} />
              </div>
            </div>
          </div>
        </div>

        {/* Setas de navegação */}
        <div className="flex items-start">
          {/* Botão anterior */}
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="flex items-center justify-center shrink-0 size-12"
          >
            <div className="overflow-clip relative shrink-0 size-6">
              <div className="absolute bottom-1/4 left-[33.33%] right-[35.83%] top-1/4">
                <div className="absolute inset-0" style={{ fill: 'rgba(73, 69, 79, 1)' }}>
                  <img alt="" className="block max-w-none size-full" src={calendarIcons.prev} />
                </div>
              </div>
            </div>
          </button>
          {/* Botão próximo */}
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="flex items-center justify-center shrink-0 size-12"
          >
            <div className="overflow-clip relative shrink-0 size-6">
              <div className="absolute bottom-1/4 left-[33.33%] right-[35.83%] top-1/4">
                <div className="absolute inset-0" style={{ fill: 'rgba(73, 69, 79, 1)' }}>
                  <img alt="" className="block max-w-none size-full" src={calendarIcons.next} />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Grid de calendário */}
      <div className="flex flex-col items-center px-3" data-name="Local Calendar grid">
        {/* Dias da semana */}
        <div className="flex h-12 items-start justify-center w-full">
          {weekDays.map((day, idx) => (
            <div key={idx} className="flex flex-[1_0_0] h-full items-center justify-center">
              <span className="text-neutral-1100 text-[16px] leading-6 tracking-[0.5px] font-normal text-center">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Semanas */}
        {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIdx) => (
          <div key={weekIdx} className="flex h-12 items-start justify-center w-full">
            {calendarDays.slice(weekIdx * 7, weekIdx * 7 + 7).map((date, dayIdx) => {
              const isCurrentMonth = isSameMonth(date, currentMonth)
              const isSelected = isDateSelected(date)
              const inRange = isDateInRange(date)
              const isTodayDate = isToday(date)

              if (!isCurrentMonth) {
                // Célula vazia para dias fora do mês
                return (
                  <div key={dayIdx} className="flex flex-[1_0_0] h-full items-center justify-center p-1">
                    <div className="flex items-center justify-center relative shrink-0 size-10 p-2.5">
                      <div className="h-6 shrink-0 w-[22px]" />
                    </div>
                  </div>
                )
              }

              return (
                <div key={dayIdx} className="flex flex-[1_0_0] h-full items-center justify-center p-1">
                  <button
                    onClick={() => onSelectDate(date)}
                    className={`
                      flex items-center justify-center
                      overflow-clip rounded-full
                      shrink-0 size-10
                      transition-colors duration-200
                      ${
                        isSelected
                          ? 'bg-primary-500 text-neutral-900'
                          : inRange
                          ? 'bg-primary-500/20'
                          : isTodayDate
                          ? 'border border-primary-500 text-primary-500'
                          : 'text-neutral-1100 hover:bg-neutral-100'
                      }
                    `}
                  >
                    <span
                      className={`
                        text-[16px] leading-6 tracking-[0.5px] text-center font-normal
                        ${isSelected ? 'font-medium text-[14px] tracking-[0.1px] leading-5' : ''}
                      `}
                    >
                      {format(date, 'd')}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Botões de ação */}
      <div
        className="
          flex items-start justify-between
          pb-2 pt-1 px-3
        "
        data-name="Local Actions"
      >
        {/* Botão Clear */}
        <button
          onClick={onClear}
          className="flex h-12 items-center justify-center"
        >
          <div className="flex gap-2 items-center justify-center px-4 py-2.5">
            <span className="label-large text-neutral-900 text-[14px] tracking-[0.1px]">Clear</span>
          </div>
        </button>

        {/* Botões Cancel e OK */}
        <div className="flex flex-[1_0_0] gap-2 items-start justify-end">
          <button
            onClick={onCancel}
            className="flex h-12 items-center justify-center"
          >
            <div className="flex gap-2 items-center justify-center px-4 py-2.5">
              <span className="label-large text-neutral-900 text-[14px] tracking-[0.1px]">Cancel</span>
            </div>
          </button>
          <button
            onClick={onOK}
            className="flex h-12 items-center justify-center"
          >
            <div className="flex gap-2 items-center justify-center px-4 py-2.5">
              <span className="label-large text-neutral-900 text-[14px] tracking-[0.1px]">OK</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

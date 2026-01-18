import { useState, useRef, useEffect } from 'react'
import FilterPopover from './FilterPopover'
import { headerIcons } from '@/assets/dashboard-assets'

/**
 * FilterButton - Botão que abre popover/modal de filtros
 * Desktop: popover flutuante
 * Mobile: modal fullscreen
 */
export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={buttonRef as any}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-center
          p-3
          rounded-shape-100
          hover:bg-neutral-100
          transition-colors duration-200
          shrink-0
        "
        data-name="filter-button"
        aria-label="Filtros"
        aria-expanded={isOpen}
      >
        {/* Ícone de filtros - 16x16px conforme Figma */}
        <div className="overflow-clip relative shrink-0 size-4" data-name="fi-rr-settings-sliders">
          <img
            alt="Filtros"
            className="block max-w-none size-full"
            src={headerIcons.settingsSliders}
          />
        </div>
      </button>

      {/* Popover de filtros */}
      {isOpen && (
        <FilterPopover onClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}

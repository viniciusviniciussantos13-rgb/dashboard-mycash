import Logo from './Logo'
import MenuSidebar from './MenuSidebar'
import InfoUser from './InfoUser'
import { navIcons } from '@/assets/sidebar-assets'

/**
 * Componente Sidebar - Navegação principal (Desktop)
 * Conforme design do Figma fornecido
 * 
 * Estados:
 * - expandido: w-[280px], mostra logo completo, nomes das seções, info do usuário
 * - recolhido: w-[96px], mostra logo simplificado "M+", apenas ícones, avatar
 */
type SidebarProps = {
  isExpanded: boolean
  onToggle: () => void
}

export default function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen
        bg-surface-500 border-r border-neutral-300
        flex flex-col items-start justify-between
        p-8 z-40
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-[280px]' : 'w-[96px]'}
        hidden lg:flex
      `}
      data-name="Sidebar"
      data-sidebar-state={isExpanded ? 'open' : 'close'}
    >
      {/* Borda interna - apenas visual */}
      <div
        aria-hidden="true"
        className="absolute border border-neutral-300 border-solid inset-0 pointer-events-none"
      />

      {/* Top section: Logo + Navigation */}
      <div className="flex flex-col gap-14 items-start p-0 w-full shrink-0 relative">
        {/* Logo completo quando expandido */}
        {isExpanded ? (
          <Logo variant="default" />
        ) : (
          /* Logo simplificado "M+" quando recolhido */
          <div className="h-[29.818px] relative shrink-0 w-full flex items-center justify-center">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
              <span className="text-surface-500 font-bold text-sm">M+</span>
            </div>
          </div>
        )}

        {/* Menu de navegação */}
        <MenuSidebar isExpanded={isExpanded} />
      </div>

      {/* Bottom section: User Info */}
      <InfoUser isExpanded={isExpanded} />

      {/* Toggle Button - conforme design: top-[32px], right-[-16px], p-2 */}
      <button
        onClick={onToggle}
        className="
          absolute bg-surface-500
          flex items-center justify-center
          p-2
          right-[-16px] top-8
          rounded-shape-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
          hover:bg-neutral-100
          transition-all duration-200
          z-50
          cursor-pointer
        "
        aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
        data-name="close"
      >
        <div className="flex items-center justify-center relative shrink-0">
          <div
            className={`flex-none transition-transform duration-300 ${
              isExpanded ? 'rotate-[180deg]' : 'rotate-0'
            }`}
          >
            {/* Ícone toggle - usando asset do Figma */}
            <div className="overflow-clip relative size-4">
              <div className="absolute inset-[-0.02%_27.71%_0_24.98%]">
                <img
                  className="block max-w-none size-full"
                  alt={isExpanded ? 'Colapsar' : 'Expandir'}
                  src={navIcons.toggle}
                />
              </div>
            </div>
          </div>
        </div>
      </button>
    </aside>
  )
}

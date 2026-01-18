import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { navIcons } from '@/assets/sidebar-assets'

/**
 * Componente Menu de Navegação da Sidebar
 * Conforme design do Figma
 */
type MenuSidebarProps = {
  isExpanded: boolean
}

export default function MenuSidebar({ isExpanded }: MenuSidebarProps) {
  const location = useLocation()

  return (
    <nav
      className={`flex flex-col items-start w-full ${
        isExpanded ? 'gap-0' : 'gap-2'
      } shrink-0`}
      data-name="menu-sidebar"
    >
      {/* Home */}
      <Link
        to={ROUTES.DASHBOARD}
        className={`
          group relative flex items-center justify-center
          transition-all duration-300 ease-in-out
          rounded-shape-100
          ${
            location.pathname === ROUTES.DASHBOARD
              ? 'bg-primary-500 text-neutral-1100'
              : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
          }
          ${
            isExpanded
              ? 'gap-2 px-4 py-3 w-full'
              : 'size-12'
          }
        `}
        title={!isExpanded ? 'Home' : undefined}
      >
        {/* Ícone - 16x16px conforme Figma */}
        <div className="overflow-clip relative shrink-0 size-4">
          <div className="absolute inset-[0.09%_0_-0.03%_0]">
            <img className="block max-w-none size-full" alt="Home" src={navIcons.home} />
          </div>
        </div>

        {/* Label - apenas quando expandido */}
        {isExpanded && (
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[18px] tracking-[0.3px] text-neutral-1100 whitespace-nowrap relative shrink-0">
            Home
          </p>
        )}

        {/* Tooltip quando colapsada */}
        {!isExpanded && (
          <div
            className="
              absolute left-full ml-2 px-2 py-1
              bg-neutral-1100 text-surface-500
              rounded text-xs whitespace-nowrap
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-opacity duration-200 delay-300
              pointer-events-none z-50
            "
          >
            Home
          </div>
        )}
      </Link>

      {/* Cartões */}
      <Link
        to={ROUTES.CARDS}
        className={`
          group relative flex items-center justify-center
          transition-all duration-300 ease-in-out
          rounded-shape-100
          ${
            location.pathname === ROUTES.CARDS
              ? 'bg-primary-500 text-neutral-1100'
              : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
          }
          ${
            isExpanded
              ? 'gap-2 px-4 py-3 w-full'
              : 'size-12'
          }
        `}
        title={!isExpanded ? 'Cartões' : undefined}
      >
        {/* Ícone - 16x16px conforme Figma */}
        <div className="overflow-clip relative shrink-0 size-4">
          <div className="absolute inset-[12.5%_0]">
            <img className="block max-w-none size-full" alt="Cartões" src={navIcons.creditCard} />
          </div>
        </div>

        {/* Label - apenas quando expandido */}
        {isExpanded && (
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[18px] tracking-[0.3px] text-neutral-1100 whitespace-nowrap relative shrink-0">
            Cartões
          </p>
        )}

        {/* Tooltip quando colapsada */}
        {!isExpanded && (
          <div
            className="
              absolute left-full ml-2 px-2 py-1
              bg-neutral-1100 text-surface-500
              rounded text-xs whitespace-nowrap
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-opacity duration-200 delay-300
              pointer-events-none z-50
            "
          >
            Cartões
          </div>
        )}
      </Link>
    </nav>
  )
}

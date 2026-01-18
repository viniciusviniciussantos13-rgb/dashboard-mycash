import { useSidebar } from '@/hooks/useSidebar'
import Logo from './Logo'
import NavItem from './NavItem'
import UserInfo from './UserInfo'
import { ROUTES } from '@/constants/routes'

/**
 * Componente Sidebar - Navegação principal (Desktop)
 * 
 * Estados:
 * - Expandido: mostra logo completo, nomes das seções, info do usuário
 * - Colapsado: mostra apenas ícone do logo, ícones das seções, avatar
 * 
 * Responsividade:
 * - Desktop (≥1280px): sempre visível
 * - Mobile/Tablet (<1280px): não renderiza (ver HeaderMobile)
 */
export default function Sidebar() {
  const { isExpanded, toggle } = useSidebar()

  return (
    <>
      {/* Sidebar - apenas no desktop (≥1280px) */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          bg-surface-500 border-r border-neutral-300
          flex flex-col justify-between
          p-8 z-40
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-[300px]' : 'w-[80px]'}
          hidden lg:flex
        `}
        data-sidebar-state={isExpanded ? 'open' : 'close'}
      >
        {/* Top section: Logo + Navigation */}
        <div className="flex flex-col gap-14 items-start p-0 w-full">
          {/* Logo - apenas quando expandido no topo */}
          {isExpanded && <Logo variant="default" />}
          
          {/* Navigation */}
          <nav className={`flex flex-col items-start w-full ${isExpanded ? 'gap-0' : 'gap-2'}`}>
            <NavItem
              to={ROUTES.DASHBOARD}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8L8 2L14 8M2 14L8 8L14 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
              label="Home"
              isExpanded={isExpanded}
            />
            <NavItem
              to={ROUTES.CARDS}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="4"
                    width="12"
                    height="10"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 7H14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              }
              label="Cartões"
              isExpanded={isExpanded}
            />
          </nav>
          
          {/* Logo Small - apenas quando colapsado, aparece após navegação */}
          {!isExpanded && <Logo variant="small" className="w-full" />}
        </div>

        {/* Bottom section: User Info */}
        <div className={`flex flex-col gap-3 p-0 shrink-0 ${isExpanded ? 'items-start w-full' : 'items-center w-12'}`}>
          <UserInfo isExpanded={isExpanded} />
        </div>

        {/* Toggle Button - borda direita */}
        <button
          onClick={toggle}
          className="
            absolute right-[-17px] top-8
            bg-surface-500 p-2
            rounded-shape-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
            flex items-center justify-center
            size-8 hover:bg-neutral-100
            transition-colors duration-200
            z-50
          "
          aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
        >
          <div
            className={`
              size-4 transition-transform duration-300
              ${isExpanded ? 'rotate-180' : ''}
            `}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="#080b12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </aside>

    </>
  )
}
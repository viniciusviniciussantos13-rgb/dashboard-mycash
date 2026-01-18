import { useSidebar } from '@/hooks/useSidebar'
import Logo from './Logo'
import NavItem from './NavItem'
import UserInfo from './UserInfo'
import { ROUTES } from '@/constants/routes'
import { navIcons } from '@/assets/sidebar-assets'

/**
 * Componente Sidebar - Navegação principal (Desktop)
 * Conforme Figma MCP (node-id: 2007:2200)
 * 
 * Estados:
 * - open: w-[300px], mostra logo completo, nomes das seções, info do usuário
 * - close: w-[48px] (width automática), mostra logo small, apenas ícones, avatar
 * 
 * Estrutura conforme Figma:
 * - Container: p-8 (space-32), gap-12 (space-48 não definido, usando gap entre seções)
 * - Top section: gap-14 (space-56) entre logo e menu
 * - Menu: gap-0 quando open, gap-2 (space-8) quando close
 * - User info: gap-3 (space-12) entre avatar e dados
 * - Toggle button: top-[31px], right-[-17px], p-2 (space-8)
 */
export default function Sidebar() {
  const { isExpanded, toggle } = useSidebar()

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-screen
          bg-surface-500 border-r border-neutral-300
          flex flex-col items-start justify-between
          p-8 z-40
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-[300px]' : 'w-[80px]'}
          hidden lg:flex
        `}
        data-sidebar-state={isExpanded ? 'open' : 'close'}
      >
        {/* Top section: Logo + Navigation */}
        <div className="flex flex-col gap-14 items-start p-0 w-full shrink-0">
          {/* Logo Default - apenas quando expandido */}
          {isExpanded && <Logo variant="default" />}

          {/* Navigation */}
          <nav className={`flex flex-col items-start w-full ${isExpanded ? 'gap-0' : 'gap-2'} shrink-0`}>
            <NavItem
              to={ROUTES.DASHBOARD}
              iconSrc={navIcons.home}
              iconInsetClass="inset-[0.09%_0_-0.03%_0]"
              label="Home"
              isExpanded={isExpanded}
            />
            <NavItem
              to={ROUTES.CARDS}
              iconSrc={navIcons.creditCard}
              iconInsetClass="inset-[12.5%_0]"
              label="Cartões"
              isExpanded={isExpanded}
            />
          </nav>

          {/* Logo Small - apenas quando colapsado, aparece após navegação */}
          {!isExpanded && <Logo variant="small" />}
        </div>

        {/* Bottom section: User Info */}
        <div
          className={`flex flex-col gap-3 p-0 shrink-0 ${
            isExpanded ? 'items-start w-full' : 'items-center w-12'
          }`}
        >
          <UserInfo isExpanded={isExpanded} />
        </div>

        {/* Toggle Button - conforme Figma: top-[31px], right-[-17px], p-2 */}
        <button
          onClick={toggle}
          className="
            absolute bg-surface-500
            flex items-center justify-center
            p-2
            right-[-17px] top-[31px]
            rounded-shape-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
            hover:bg-neutral-100
            transition-all duration-200
            z-50
          "
          aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
        >
          <div className="flex items-center justify-center relative shrink-0">
            <div className={`flex-none transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
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
    </>
  )
}

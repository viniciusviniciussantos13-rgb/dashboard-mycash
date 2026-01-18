import { Link, useLocation } from 'react-router-dom'

/**
 * Item de navegação da Sidebar
 * Conforme Figma MCP (node-id: 2007:2200)
 * - Estado ativo: bg-primary-500 (#D7FF00), texto neutral-1100
 * - Estado inativo: bg-transparent, hover: bg-neutral-100
 * - Padding: px-16 py-12, gap-8
 * - Border-radius: shape-100 (100px)
 */
type NavItemProps = {
  to: string
  iconSrc: string
  iconInsetClass: string
  label: string
  isExpanded: boolean
}

export default function NavItem({
  to,
  iconSrc,
  iconInsetClass,
  label,
  isExpanded,
}: NavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`
        group relative flex items-center justify-center
        transition-all duration-300 ease-in-out
        rounded-shape-100
        ${
          isActive
            ? 'bg-primary-500 text-neutral-1100'
            : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
        }
        ${
          isExpanded
            ? 'gap-2 px-4 py-3 w-full'
            : 'size-12'
        }
      `}
      title={!isExpanded ? label : undefined}
    >
      {/* Ícone - 16x16px conforme Figma */}
      <div className="overflow-clip relative shrink-0 size-4">
        <div className={`absolute ${iconInsetClass}`}>
          <img className="block max-w-none size-full" alt={label} src={iconSrc} />
        </div>
      </div>
      
      {/* Label - apenas quando expandido, usando Label/Large */}
      {isExpanded && (
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[18px] tracking-[0.3px] text-neutral-1100 whitespace-nowrap relative shrink-0">
          {label}
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
          {label}
        </div>
      )}
    </Link>
  )
}

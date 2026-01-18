import { Link, useLocation } from 'react-router-dom'

/**
 * Item de navegação da Sidebar
 * Suporta estados ativo/inativo e tooltip quando sidebar está colapsada
 * Usa ícones e tokens exatos do Figma MCP
 */
type NavItemProps = {
  to: string
  iconSrc: string
  iconInsetClass: string
  label: string
  isExpanded: boolean
}

export default function NavItem({ to, iconSrc, iconInsetClass, label, isExpanded }: NavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`
        group relative flex items-center
        transition-all duration-300 ease-in-out
        gap-2
        px-4 py-3
        rounded-shape-100
        ${
          isActive
            ? 'bg-primary-500 text-neutral-1100'
            : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
        }
        ${isExpanded ? 'w-full' : 'w-12 justify-center'}
      `}
      title={!isExpanded ? label : undefined}
    >
      {/* Ícone - usa imagem do Figma MCP */}
      <div className="overflow-clip relative shrink-0 size-4">
        <div className={`absolute ${iconInsetClass}`}>
          <img className="block max-w-none size-full" alt={label} src={iconSrc} />
        </div>
      </div>
      {isExpanded && (
        <span className="label-large text-neutral-1100 whitespace-nowrap relative shrink-0">
          {label}
        </span>
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

import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

/**
 * Item de navegação da Sidebar
 * Suporta estados ativo/inativo e tooltip quando sidebar está colapsada
 */
type NavItemProps = {
  to: string
  icon: ReactNode
  label: string
  isExpanded: boolean
}

export default function NavItem({ to, icon, label, isExpanded }: NavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`
        group relative flex items-center
        transition-all duration-300 ease-in-out
        ${
          isActive
            ? 'bg-primary-500 text-neutral-1100'
            : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
        }
        ${isExpanded ? 'gap-2 w-full px-4 py-3' : 'w-12 justify-center px-4 py-3'}
        rounded-shape-100
      `}
      title={!isExpanded ? label : undefined}
    >
      <div
        className="flex-shrink-0 size-4 text-neutral-1100"
      >
        {icon}
      </div>
      {isExpanded && (
        <span className="label-large text-inherit whitespace-nowrap">{label}</span>
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
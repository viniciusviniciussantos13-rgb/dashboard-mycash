import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { navIcons } from '@/assets/sidebar-assets'

/**
 * Componente MenuDropdown - Menu deslizante para mobile
 * Conforme PROMPT 3
 * 
 * Características:
 * - Desliza de cima para baixo com animação suave
 * - Overlay escuro semi-transparente
 * - Lista de itens de navegação com ícone e texto
 * - Item ativo com fundo preto (neutral-1100)
 * - Botão "Sair" vermelho no final
 * - Botão X no canto superior direito
 * - Fecha ao clicar em item, X, ou fora (overlay)
 */
type MenuDropdownProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  // Fechar ao clicar fora do menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevenir scroll do body quando menu aberto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Fechar ao navegar para uma rota
  const handleNavClick = () => {
    onClose()
  }

  // Handler para botão Sair
  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    console.log('Logout')
    onClose()
  }

  return (
    <>
      {/* Overlay escuro semi-transparente */}
      {isOpen && (
        <div
          className={`
            fixed inset-0
            bg-neutral-1100/50
            z-40
            transition-opacity duration-300 ease-in-out
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Menu Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`
            fixed top-16 left-0 right-0
            bg-surface-500 border-b border-neutral-300
            shadow-lg
            z-50
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-y-0' : '-translate-y-full'}
          `}
          data-name="MenuDropdown"
        >
        {/* Header do menu com botão X */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-300">
          <h2 className="label-medium text-neutral-1100">Menu</h2>
          <button
            onClick={onClose}
            className="
              p-2
              text-neutral-1100 hover:bg-neutral-100
              rounded-shape-100
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500
            "
            aria-label="Fechar menu"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        {/* Lista de navegação */}
        <nav className="flex flex-col py-2">
          {/* Home */}
          <Link
            to={ROUTES.DASHBOARD}
            onClick={handleNavClick}
            className={`
              group relative flex items-center
              gap-3 px-4 py-3
              transition-all duration-200 ease-in-out
              ${
                location.pathname === ROUTES.DASHBOARD
                  ? 'bg-neutral-1100 text-surface-500'
                  : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
              }
            `}
          >
            {/* Ícone */}
            <div className="overflow-clip relative shrink-0 size-4">
              <div className="absolute inset-[0.09%_0_-0.03%_0]">
                <img className="block max-w-none size-full" alt="Home" src={navIcons.home} />
              </div>
            </div>

            {/* Label */}
            <span className="label-medium text-inherit whitespace-nowrap">Home</span>
          </Link>

          {/* Cartões */}
          <Link
            to={ROUTES.CARDS}
            onClick={handleNavClick}
            className={`
              group relative flex items-center
              gap-3 px-4 py-3
              transition-all duration-200 ease-in-out
              ${
                location.pathname === ROUTES.CARDS
                  ? 'bg-neutral-1100 text-surface-500'
                  : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
              }
            `}
          >
            {/* Ícone */}
            <div className="overflow-clip relative shrink-0 size-4">
              <div className="absolute inset-[12.5%_0]">
                <img className="block max-w-none size-full" alt="Cartões" src={navIcons.creditCard} />
              </div>
            </div>

            {/* Label */}
            <span className="label-medium text-inherit whitespace-nowrap">Cartões</span>
          </Link>

          {/* Transações */}
          <Link
            to={ROUTES.TRANSACTIONS}
            onClick={handleNavClick}
            className={`
              group relative flex items-center
              gap-3 px-4 py-3
              transition-all duration-200 ease-in-out
              ${
                location.pathname === ROUTES.TRANSACTIONS
                  ? 'bg-neutral-1100 text-surface-500'
                  : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
              }
            `}
          >
            {/* Placeholder para ícone de transações */}
            <div className="overflow-clip relative shrink-0 size-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs">T</span>
              </div>
            </div>

            {/* Label */}
            <span className="label-medium text-inherit whitespace-nowrap">Transações</span>
          </Link>

          {/* Perfil */}
          <Link
            to={ROUTES.PROFILE}
            onClick={handleNavClick}
            className={`
              group relative flex items-center
              gap-3 px-4 py-3
              transition-all duration-200 ease-in-out
              ${
                location.pathname === ROUTES.PROFILE
                  ? 'bg-neutral-1100 text-surface-500'
                  : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
              }
            `}
          >
            {/* Placeholder para ícone de perfil */}
            <div className="overflow-clip relative shrink-0 size-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs">P</span>
              </div>
            </div>

            {/* Label */}
            <span className="label-medium text-inherit whitespace-nowrap">Perfil</span>
          </Link>
        </nav>

        {/* Botão Sair */}
        <div className="border-t border-neutral-300 px-4 py-3">
          <button
            onClick={handleLogout}
            className="
              w-full
              flex items-center justify-center
              px-4 py-3
              bg-red-600 text-surface-500
              rounded-shape-100
              label-medium
              transition-all duration-200 ease-in-out
              hover:bg-red-700
              focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
              active:scale-95
            "
          >
            Sair
          </button>
        </div>
        </div>
      )}
    </>
  )
}

import { useState } from 'react'
import Logo from '../Sidebar/Logo'
import MenuDropdown from './MenuDropdown'
import { memberAvatar } from '@/assets/sidebar-assets'

/**
 * Componente HeaderMobile - Navegação Mobile/Tablet (<1024px)
 * Conforme PROMPT 3
 * 
 * Características:
 * - Fixo no topo, largura total
 * - Logo "mycash+" à esquerda
 * - Avatar clicável à direita (abre menu dropdown)
 * - Visível durante scroll
 * - Substitui completamente a sidebar em viewports <1024px
 */
export default function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className="
          fixed top-0 left-0 right-0
          w-full h-16
          bg-surface-500 border-b border-neutral-300
          flex items-center justify-between
          px-4 z-50
          lg:hidden
        "
        data-name="HeaderMobile"
      >
        {/* Logo à esquerda */}
        <div className="flex items-center shrink-0">
          <Logo variant="default" />
        </div>

        {/* Avatar clicável à direita */}
        <button
          onClick={toggleMenu}
          className="
            relative shrink-0 size-10
            rounded-full overflow-hidden
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            transition-transform duration-200
            active:scale-95
          "
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <img
            src={memberAvatar}
            alt="Menu do usuário"
            className="block max-w-none size-full rounded-full object-cover"
          />
        </button>
      </header>

      {/* Menu Dropdown */}
      <MenuDropdown isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}

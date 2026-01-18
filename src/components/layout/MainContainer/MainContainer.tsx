import { ReactNode, useEffect, useState } from 'react'
import { useSidebar } from '@/hooks/useSidebar'

/**
 * Container principal que ajusta margem conforme sidebar
 * Layout fluido obrigatório (width: 100%)
 * Ajusta margin-left dinamicamente quando sidebar expande/colapsa (apenas desktop)
 */
type MainContainerProps = {
  children: ReactNode
}

export default function MainContainer({ children }: MainContainerProps) {
  const { isExpanded } = useSidebar()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Margin-left apenas no desktop (≥1024px)
  // Padding-top no mobile/tablet (<1024px) para compensar header fixo
  const sidebarWidth = isExpanded ? 280 : 96
  const desktopGap = 32
  const marginLeft = isDesktop ? `${sidebarWidth + desktopGap}px` : '0'
  const paddingTop = !isDesktop ? '64px' : '0' // 64px = h-16 (altura do header mobile)

  return (
    <main
      className="min-h-screen bg-neutral-100 transition-all duration-300 ease-in-out w-full"
      style={{ marginLeft, paddingTop }}
    >
      <div className="w-full">{children}</div>
    </main>
  )
}
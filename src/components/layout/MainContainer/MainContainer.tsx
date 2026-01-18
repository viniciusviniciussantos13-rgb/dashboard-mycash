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
      setIsDesktop(window.innerWidth >= 1280)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const marginLeft = isDesktop ? (isExpanded ? '280px' : '96px') : '0'

  return (
    <main
      className="container-fluid min-h-screen bg-neutral-100 transition-all duration-300 ease-in-out"
      style={{ marginLeft }}
    >
      <div className="container-content py-6">{children}</div>
    </main>
  )
}
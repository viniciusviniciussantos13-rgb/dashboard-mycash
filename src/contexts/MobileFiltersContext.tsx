import { createContext, ReactNode, useContext, useState } from 'react'

type MobileFiltersContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const MobileFiltersContext = createContext<MobileFiltersContextValue | undefined>(undefined)

export function MobileFiltersProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <MobileFiltersContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MobileFiltersContext.Provider>
  )
}

export function useMobileFilters() {
  const context = useContext(MobileFiltersContext)
  if (!context) {
    throw new Error('useMobileFilters deve ser usado dentro de MobileFiltersProvider')
  }
  return context
}

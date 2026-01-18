import { useState } from 'react'

/**
 * Hook para gerenciar estado da sidebar (expandida/colapsada)
 * Persiste preferência no localStorage
 */
export function useSidebar() {
  const [isExpanded, setIsExpanded] = useState(() => {
    // Por padrão, sidebar começa expandida
    const saved = localStorage.getItem('sidebar-expanded')
    return saved !== null ? saved === 'true' : true
  })

  const toggle = () => {
    setIsExpanded((prev) => {
      const newValue = !prev
      localStorage.setItem('sidebar-expanded', String(newValue))
      return newValue
    })
  }

  const expand = () => {
    setIsExpanded(true)
    localStorage.setItem('sidebar-expanded', 'true')
  }

  const collapse = () => {
    setIsExpanded(false)
    localStorage.setItem('sidebar-expanded', 'false')
  }

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
  }
}
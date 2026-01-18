/**
 * Componente Logo do mycash+
 * Suporta duas variantes: Default (completo) e Small (apenas ícone)
 */
type LogoProps = {
  variant?: 'default' | 'small'
  className?: string
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  if (variant === 'small') {
    // Versão pequena com apenas ícone gráfico
    return (
      <div className={`flex flex-col gap-[3px] items-start justify-center ${className}`}>
        <div className="h-6 w-11 relative shrink-0 flex items-center justify-center">
          <span className="text-neutral-900 font-bold text-xl">m+</span>
        </div>
      </div>
    )
  }

  // Versão completa com texto "mycash+"
  return (
    <div className={`h-[30px] w-[140px] relative ${className}`}>
      <span className="heading-x-small text-neutral-900 font-bold whitespace-nowrap">
        mycash+
      </span>
    </div>
  )
}
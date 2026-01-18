import { logoAssets } from '@/assets/sidebar-assets'

/**
 * Componente Logo do mycash+
 * Suporta duas variantes: Default (completo) e Small (apenas ícone)
 * Usa as 7 imagens SVG do Figma MCP para construir o logo
 */
type LogoProps = {
  variant?: 'default' | 'small'
  className?: string
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  if (variant === 'small') {
    // Versão pequena - apenas os primeiros vetores
    return (
      <div className={`flex flex-col gap-[3px] items-start justify-center ${className}`}>
        <div className="h-6 w-[44.886px] relative shrink-0">
          <img className="block max-w-none size-full" alt="m+" src={logoAssets.vector} />
        </div>
        <div className="h-[11.433px] w-[45.176px] relative shrink-0">
          <img className="block max-w-none size-full" alt="+" src={logoAssets.vector1} />
        </div>
      </div>
    )
  }

  // Versão completa - todos os 7 vetores do Figma MCP
  return (
    <div className={`h-[29.818px] w-[139.648px] relative ${className}`}>
      {/* Vetor 1 */}
      <div className="absolute inset-[19.86%_0_26.18%_88.48%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector} />
      </div>
      {/* Vetor 2 */}
      <div className="absolute inset-[0_14.89%_21.95%_73.54%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector1} />
      </div>
      {/* Vetor 3 */}
      <div className="absolute inset-[18.75%_28.65%_20.81%_60.12%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector2} />
      </div>
      {/* Vetor 4 */}
      <div className="absolute inset-[18.75%_42.02%_20.85%_46.79%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector3} />
      </div>
      {/* Vetor 5 */}
      <div className="absolute inset-[18.75%_54.84%_20.81%_33.42%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector4} />
      </div>
      {/* Vetor 6 */}
      <div className="absolute inset-[19.51%_67.44%_0_19.91%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector5} />
      </div>
      {/* Vetor 7 */}
      <div className="absolute inset-[0_81.94%_21.95%_0]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector6} />
      </div>
    </div>
  )
}

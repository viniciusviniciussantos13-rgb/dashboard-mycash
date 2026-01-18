import { logoAssets, logoSmallAssets } from '@/assets/sidebar-assets'

/**
 * Componente Logo do mycash+
 * Variantes: Default (completo) e Small (apenas "MY cash+")
 * Usa os assets exatos do Figma MCP (node-id: 2007:2200)
 */
type LogoProps = {
  variant?: 'default' | 'small'
  className?: string
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  if (variant === 'small') {
    return (
      <div className={`flex flex-col gap-[3px] items-start justify-center relative shrink-0 w-full ${className}`}>
        <div className="h-[24px] relative shrink-0 w-[44.886px]">
          <img className="block max-w-none size-full" alt="MY" src={logoSmallAssets.top} />
        </div>
        <div className="h-[11.433px] relative shrink-0 w-[45.176px]">
          <img className="block max-w-none size-full" alt="cash+" src={logoSmallAssets.down} />
        </div>
      </div>
    )
  }

  return (
    <div className={`h-[29.818px] relative shrink-0 w-[139.648px] ${className}`}>
      <div className="absolute inset-[19.86%_0_26.18%_88.48%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector} />
      </div>
      <div className="absolute inset-[0_14.89%_21.95%_73.54%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector1} />
      </div>
      <div className="absolute inset-[18.75%_28.65%_20.81%_60.12%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector2} />
      </div>
      <div className="absolute inset-[18.75%_42.02%_20.85%_46.79%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector3} />
      </div>
      <div className="absolute inset-[18.75%_54.84%_20.81%_33.42%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector4} />
      </div>
      <div className="absolute inset-[19.51%_67.44%_0_19.91%]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector5} />
      </div>
      <div className="absolute inset-[0_81.94%_21.95%_0]">
        <img className="block max-w-none size-full" alt="" src={logoAssets.vector6} />
      </div>
    </div>
  )
}

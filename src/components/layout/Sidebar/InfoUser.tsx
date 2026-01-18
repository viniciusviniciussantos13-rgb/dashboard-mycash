import { memberAvatar } from '@/assets/sidebar-assets'

/**
 * Componente de informações do usuário
 * Conforme design do Figma
 */
type InfoUserProps = {
  isExpanded: boolean
  name?: string
  email?: string
  avatarUrl?: string
}

export default function InfoUser({
  isExpanded,
  name = 'Vinícius Botelho',
  email = 'viniciusbotelho@gmail.com',
  avatarUrl,
}: InfoUserProps) {
  const avatarSrc = avatarUrl || memberAvatar

  return (
    <div
      className={`flex flex-col gap-3 p-0 shrink-0 ${
        isExpanded ? 'items-start w-full' : 'items-center w-12'
      }`}
      data-name="info-user"
    >
      {/* Avatar - 24x24px conforme Figma */}
      <div className="relative shrink-0 size-6">
        <img
          src={avatarSrc}
          alt={name}
          className="block max-w-none size-full rounded-full object-cover"
        />
      </div>

      {/* Informações (apenas quando expandido) */}
      {isExpanded && (
        <div className="flex flex-col gap-[6px] items-start w-[188px] shrink-0">
          {/* Nome - Label/Medium conforme Figma */}
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[16px] tracking-[0.3px] text-neutral-1100 whitespace-nowrap h-5 w-[130px] relative shrink-0">
            {name}
          </p>
          {/* Email - Paragraph/Small conforme Figma */}
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] tracking-[0.3px] text-neutral-1100 h-5 w-full relative shrink-0">
            {email}
          </p>
        </div>
      )}
    </div>
  )
}

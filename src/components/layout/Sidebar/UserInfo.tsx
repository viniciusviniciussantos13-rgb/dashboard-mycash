import { memberAvatar } from '@/assets/sidebar-assets'

/**
 * Componente de informações do usuário na Sidebar
 * Mostra avatar, nome e email quando expandido
 * Mostra apenas avatar quando colapsado
 * Usa imagem do avatar do Figma MCP
 */
type UserInfoProps = {
  isExpanded: boolean
  name?: string
  email?: string
  avatarUrl?: string
}

export default function UserInfo({
  isExpanded,
  name = 'Vinícius Botelho',
  email = 'viniciusbotelho@gmail.com',
  avatarUrl,
}: UserInfoProps) {
  // Usa imagem do Figma MCP se não tiver avatarUrl customizado
  const avatarSrc = avatarUrl || memberAvatar

  return (
    <>
      {/* Avatar - usa imagem do Figma MCP */}
      <div className="relative shrink-0 size-6">
        <img
          src={avatarSrc}
          alt={name}
          className="block max-w-none size-full rounded-full object-cover"
        />
      </div>

      {/* Informações (apenas quando expandido) - gap-[6px] conforme Figma */}
      {isExpanded && (
        <div className="flex flex-col gap-[6px] items-start w-[188px] shrink-0">
          {/* Nome - Label/Medium conforme Figma */}
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[16px] text-neutral-1100 tracking-[0.3px] whitespace-nowrap h-5 w-[130px] relative shrink-0">
            {name}
          </p>
          {/* Email - Paragraph/Small conforme Figma */}
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] text-neutral-1100 tracking-[0.3px] h-5 w-full relative shrink-0">
            {email}
          </p>
        </div>
      )}
    </>
  )
}

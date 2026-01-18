import { memberAvatar } from '@/assets/sidebar-assets'

/**
 * Componente de informações do usuário na Sidebar
 * Conforme Figma MCP (node-id: 2007:2200)
 * - Avatar: 24x24px (size-6)
 * - Nome: Label/Medium (16px, semibold)
 * - Email: Paragraph/Small (14px, regular)
 * - Gap entre nome/email: 6px
 * - Gap entre avatar e dados: space-12 (12px)
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
  const avatarSrc = avatarUrl || memberAvatar

  return (
    <>
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
    </>
  )
}

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

      {isExpanded && (
        <div className="flex flex-col gap-4 items-start w-[188px] shrink-0">
          <p className="label-medium text-neutral-1100 whitespace-nowrap h-5 w-[130px] relative shrink-0">
            {name}
          </p>
          <p className="paragraph-small text-neutral-1100 h-5 w-full relative shrink-0">
            {email}
          </p>
        </div>
      )}
    </>
  )
}

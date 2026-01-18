/**
 * Componente de informações do usuário na Sidebar
 * Mostra avatar, nome e email quando expandido
 * Mostra apenas avatar quando colapsado
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
  return (
    <>
      {/* Avatar */}
      <div className="relative shrink-0 size-6">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="rounded-full size-full object-cover"
          />
        ) : (
          <div className="rounded-full size-full bg-neutral-300 flex items-center justify-center text-neutral-900 text-xs font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Informações (apenas quando expandido) */}
      {isExpanded && (
        <div className="flex flex-col gap-1.5 items-start w-[188px]">
          <p className="label-medium text-neutral-1100 whitespace-nowrap h-5 w-[130px]">
            {name}
          </p>
          <p className="paragraph-small text-neutral-1100 h-5 w-full">
            {email}
          </p>
        </div>
      )}
    </>
  )
}
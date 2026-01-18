import { useFinance } from '@/hooks/useFinance'
import { memberAvatars } from '@/assets/dashboard-assets'

/**
 * MembersWidget - Widget de membros com avatares sobrepostos
 * Avatares têm efeito hover e seleção com borda preta + check verde
 */
export default function MembersWidget() {
  const { familyMembers, selectedMember, setSelectedMember } = useFinance()

  const handleMemberClick = (memberId: string) => {
    if (selectedMember === memberId) {
      // Deselecionar se já estiver selecionado
      setSelectedMember(null)
    } else {
      setSelectedMember(memberId)
    }
  }

  // Buscar membros específicos
  const paiMember = familyMembers.find((m) => m.name.includes('Vinícius') || m.name.includes('Pai'))
  const maeMember = familyMembers.find((m) => m.name.includes('Maria') || m.name.includes('Mãe'))

  return (
    <div
      className="flex items-center gap-0"
      data-name="Members"
    >
      {/* Avatares sobrepostos */}
      {paiMember && (
        <button
          onClick={() => handleMemberClick(paiMember.id)}
          className={`
            relative shrink-0 size-11
            rounded-full overflow-hidden
            border-2 border-surface-500
            transition-all duration-200
            hover:scale-110 hover:z-10
            ${
              selectedMember === paiMember.id
                ? 'border-neutral-1100 z-10 ring-2 ring-primary-500'
                : ''
            }
          `}
          aria-label={`Filtrar por ${paiMember.name}`}
        >
          <img
            src={memberAvatars.pai}
            alt={paiMember.name}
            height="44"
            width="44"
            className="block max-w-none size-full rounded-full object-cover"
          />
          {/* Check verde quando selecionado */}
          {selectedMember === paiMember.id && (
            <div className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-0.5">
              <svg className="size-3 text-neutral-1100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      )}

      {maeMember && (
        <button
          onClick={() => handleMemberClick(maeMember.id)}
          className={`
            relative shrink-0 size-11 -ml-2
            rounded-full overflow-hidden
            border-2 border-surface-500
            transition-all duration-200
            hover:scale-110 hover:z-10
            ${
              selectedMember === maeMember.id
                ? 'border-neutral-1100 z-10 ring-2 ring-primary-500'
                : ''
            }
          `}
          aria-label={`Filtrar por ${maeMember.name}`}
        >
          <img
            src={memberAvatars.mae}
            alt={maeMember.name}
            height="44"
            width="44"
            className="block max-w-none size-full rounded-full object-cover"
          />
          {/* Check verde quando selecionado */}
          {selectedMember === maeMember.id && (
            <div className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-0.5">
              <svg className="size-3 text-neutral-1100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      )}

      {/* Botão adicionar membro */}
      <button
        onClick={() => {
          // TODO: Abrir modal de adicionar membro (PROMPT 13)
          console.log('Adicionar membro')
        }}
        className="
          relative shrink-0 size-11 -ml-2
          rounded-full overflow-hidden
          border-2 border-surface-500
          bg-neutral-300
          flex items-center justify-center
          hover:bg-neutral-400
          transition-colors duration-200
        "
        aria-label="Adicionar membro"
      >
        <div className="absolute inset-0" style={{ fill: 'rgba(8, 11, 18, 1)' }}>
          <img
            alt="Adicionar"
            className="block max-w-none size-6"
            src={memberAvatars.plusIcon}
          />
        </div>
      </button>
    </div>
  )
}

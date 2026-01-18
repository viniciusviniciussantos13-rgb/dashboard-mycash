import { useFinance } from '@/hooks/useFinance'

type FilterPopoverProps = {
  onClose: () => void
}

/**
 * FilterPopover - Popover com opções de filtro de tipo de transação
 * Desktop: popover com glassmorphism
 * Mobile: modal fullscreen (a ser implementado no PROMPT 16)
 */
export default function FilterPopover({ onClose: _onClose }: FilterPopoverProps) {
  const { transactionType, setTransactionType } = useFinance()

  const options = [
    { value: 'all', label: 'Todos' },
    { value: 'income', label: 'Receitas' },
    { value: 'expense', label: 'Despesas' },
  ] as const

  return (
    <div
      className="
        absolute top-full left-0 mt-2
        bg-surface-500/95 backdrop-blur-md
        border border-neutral-300
        rounded-lg
        shadow-lg
        p-4
        min-w-[200px]
        z-50
        lg:block hidden
      "
      data-name="FilterPopover"
    >
      <div className="flex flex-col gap-3">
        <h3 className="label-medium text-neutral-1100 mb-1">Tipo de Transação</h3>

        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setTransactionType(option.value)
              // Fechar após seleção (opcional)
              // onClose()
            }}
            className={`
              flex items-center justify-start
              px-4 py-2
              rounded-shape-100
              transition-all duration-200
              text-left
              ${
                transactionType === option.value
                  ? 'bg-neutral-1100 text-surface-500'
                  : 'bg-transparent text-neutral-1100 hover:bg-neutral-100'
              }
            `}
          >
            <span className="label-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

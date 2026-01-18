import { headerIcons } from '@/assets/dashboard-assets'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

/**
 * SearchInput - Campo de busca com ícone de lupa
 * Busca em tempo real (case-insensitive)
 */
export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div
      className="
        border border-neutral-500 border-solid
        flex items-center gap-2
        px-6 py-3
        rounded-shape-100
        shrink-0
        focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500
        transition-all duration-200
        w-full sm:w-auto sm:min-w-[240px]
      "
      data-name="search"
    >
      {/* Ícone de lupa */}
      <div className="overflow-clip relative shrink-0 size-4" data-name="fi-rr-search">
        <div className="absolute inset-[-0.13%_0.05%_0.05%_-0.13%]">
          <img
            alt="Pesquisar"
            className="block max-w-none size-full"
            src={headerIcons.search}
          />
        </div>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar..."
        className="
          flex-1
          bg-transparent
          outline-none
          paragraph-large text-neutral-1100
          placeholder:text-neutral-500
          min-w-0
        "
      />
    </div>
  )
}

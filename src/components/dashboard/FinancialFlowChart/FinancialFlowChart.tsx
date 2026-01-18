import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

const mockFlowData = [
  { month: 'Jan', income: 8500, expense: 4500 },
  { month: 'Fev', income: 9200, expense: 5100 },
  { month: 'Mar', income: 9800, expense: 6200 },
  { month: 'Abr', income: 10500, expense: 6500 },
  { month: 'Mai', income: 8700, expense: 7200 },
  { month: 'Jun', income: 9300, expense: 7800 },
  { month: 'Jul', income: 11200, expense: 6000 },
]

const axisLabelStyle = {
  fill: '#4b5563',
  fontSize: 12,
  fontWeight: 600,
}

const tooltipFormatter = (value: number) => formatCurrencyBRL(value)

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const incomePoint = payload.find((item) => item.dataKey === 'income')
  const expensePoint = payload.find((item) => item.dataKey === 'expense')

  return (
    <div className="rounded-shape-20 border border-neutral-200 bg-surface-500 p-3 shadow-lg">
      <p className="text-sm font-semibold text-neutral-1100">{label}</p>
      <p className="text-sm font-semibold text-green-600">
        Receitas: {tooltipFormatter(incomePoint?.value ?? 0)}
      </p>
      <p className="text-sm font-semibold text-neutral-1100">
        Despesas: {tooltipFormatter(expensePoint?.value ?? 0)}
      </p>
    </div>
  )
}

export default function FinancialFlowChart() {
  const minValue = useMemo(() => Math.min(...mockFlowData.map((item) => item.expense)), [])
  const maxValue = useMemo(() => Math.max(...mockFlowData.map((item) => item.income)), [])

  return (
    <section className="w-full max-w-[1400px] rounded-shape-20 border border-neutral-300 bg-surface-500 p-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 18V13L10 10L13 14L18 8L19 18"
                stroke="#080b12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12L5 18H19"
                stroke="#080b12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="heading-small text-neutral-1100">Fluxo financeiro</h2>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="flex items-center gap-2 text-green-600">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
            Receitas
          </span>
          <span className="flex items-center gap-2 text-neutral-1100">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-900" />
            Despesas
          </span>
        </div>
      </header>

      <div className="mt-8 h-[300px] w-full rounded-shape-20 bg-neutral-100/70 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockFlowData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(196, 231, 3, 0.35)" />
                <stop offset="100%" stopColor="rgba(196, 231, 3, 0)" />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(8, 11, 18, 0.12)" />
                <stop offset="100%" stopColor="rgba(8, 11, 18, 0)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              tickMargin={12}
              axisLine={false}
              tickLine={false}
              tick={{ ...axisLabelStyle }}
            />
            <YAxis
              domain={[minValue, maxValue]}
              tickLine={false}
              tickFormatter={(value) => `R$ ${value / 1000}k`}
              axisLine={false}
              tick={{ ...axisLabelStyle }}
              width={60}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#c4e703"
              strokeWidth={3}
              fill="url(#incomeFill)"
              activeDot={{ stroke: '#c4e703', strokeWidth: 2, r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#080b12"
              strokeWidth={3}
              fill="url(#expenseFill)"
              activeDot={{ stroke: '#080b12', strokeWidth: 2, r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

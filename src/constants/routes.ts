/**
 * Rotas principais do sistema
 */
export const ROUTES = {
  DASHBOARD: '/',
  TRANSACTIONS: '/transactions',
  CARDS: '/cards',
  PROFILE: '/profile',
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]
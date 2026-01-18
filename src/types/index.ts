/**
 * Tipos TypeScript fundamentais para o sistema mycash+
 * Representam as cinco entidades principais do sistema
 */

/**
 * Tipo de transação financeira
 */
export type TransactionType = 'income' | 'expense';

/**
 * Status de uma transação
 */
export type TransactionStatus = 'pending' | 'completed' | 'cancelled';

/**
 * Tema visual de um cartão de crédito
 */
export type CardTheme = 'black' | 'lime' | 'white';

/**
 * Tipo de conta bancária ou cartão
 */
export type AccountType = 'account' | 'creditCard';

/**
 * Transação financeira
 * Representa receitas e despesas do sistema
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
  accountId: string;
  memberId: string | null;
  installments: number;
  currentInstallment?: number;
  status: TransactionStatus;
  isRecurring: boolean;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Objetivo financeiro (meta)
 */
export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category?: string;
  memberId: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Cartão de crédito
 */
export interface CreditCard {
  id: string;
  name: string;
  holderId: string; // ID do membro titular
  closingDay: number; // Dia de fechamento (1-31)
  dueDay: number; // Dia de vencimento (1-31)
  limit: number; // Limite total
  currentBill: number; // Fatura atual
  theme: CardTheme;
  lastDigits?: string; // Últimos 4 dígitos
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Conta bancária
 */
export interface BankAccount {
  id: string;
  name: string;
  holderId: string; // ID do membro titular
  balance: number; // Saldo atual
  type?: string; // Tipo de conta (corrente, poupança, etc)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Membro da família
 */
export interface FamilyMember {
  id: string;
  name: string;
  role: string; // Pai, Mãe, Filho, etc
  avatarUrl?: string;
  email?: string;
  monthlyIncome?: number; // Renda mensal estimada (opcional)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Tipo unificado para conta (banco ou cartão)
 */
export type Account = BankAccount | CreditCard;

/**
 * Filtros globais do sistema
 */
export interface GlobalFilters {
  selectedMember: string | null;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  transactionType: 'all' | 'income' | 'expense';
  searchText: string;
}
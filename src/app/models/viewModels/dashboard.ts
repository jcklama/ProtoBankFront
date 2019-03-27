import { CreditCard } from '../balances';

export interface DashboardVM {
  user_id: string;
  first_name: string,
  last_name: string,
  chequing_balance: number,
  savings_balance: number,
  credit_cards: CreditCard.CreditCardDetails // this is fine even if it's an array of values
}

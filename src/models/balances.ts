export interface Balances {
  user_id: string;
  first_name: string,
  last_name: string,
  chequing_balance: number,
  savings_balance: number,
  credit_cards: CreditCard.CreditCardDetails // this is fine even if it's an array of values
}

export namespace CreditCard {
  export interface CreditCardDetails {
    card_no: number;
    current_balance: number;
  }
}

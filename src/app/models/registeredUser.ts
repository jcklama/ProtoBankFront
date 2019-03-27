import { Registration } from './registration';
import { CreditCard } from './balances';

export interface RegisteredUser {
  newly_registered_user: Registration;
  defaultProductsInfo: DefaultProducts.DefaultProductsDetails;
  token: string;
  expires_in: number;
}

export namespace DefaultProducts {
  export interface DefaultProductsDetails {
    user_id: string;
    chequing_balance: number;
    savings_balance: number;
    credit_cards: CreditCard.CreditCardDetails;
  }
}


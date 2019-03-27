import { DashboardVM } from '../models/viewModels/dashboard';
import { Balances } from '../models/balances';

export class LoginDashBoardAdapter {
  transform(data: Balances): DashboardVM {
    return {
      user_id: data.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      chequing_balance: data.chequing_balance,
      savings_balance: data.savings_balance,
      credit_cards: data.credit_cards
    }
  }
}

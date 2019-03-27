import { DashboardVM } from '../models/viewModels/dashboard'
import { RegisteredUser } from '../models/registeredUser';

export class RegistrationDashboardAdapter {
  public transform(data: RegisteredUser): DashboardVM {
    return {
      user_id: data.defaultProductsInfo.user_id,
      first_name: data.newly_registered_user.basic_info.first_name,
      last_name: data.newly_registered_user.basic_info.last_name,
      chequing_balance: data.defaultProductsInfo.chequing_balance,
      savings_balance: data.defaultProductsInfo.savings_balance,
      credit_cards: data.defaultProductsInfo.credit_cards
    }
  }
}

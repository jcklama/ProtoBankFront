import { RegProducts } from './registration';

export interface RegisteredUserInfo {
  basic_info: RegProducts.BasicInfo;
  address: RegProducts.Address;
  banking_info: RegProducts.BankingInfo;
  products: RegProducts.Products;
  user_id: number;
}

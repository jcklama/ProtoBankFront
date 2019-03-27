export interface Registration {
  basic_info: RegProducts.BasicInfo;
  address: RegProducts.Address;
  banking_info: RegProducts.BankingInfo;
  products: RegProducts.Products;
}

export namespace RegProducts {

  export interface BasicInfo {
    first_name: string;
    last_name: string;
    phone_number: string;
    email_address: string;
  }

  export interface Address {
    city: string;
    country: string;
    postal_code: string;
    street_no_and_name: string;
  }

  export interface BankingInfo {
    occupation: string;
    annual_salary: number;
    monthly_expenses: number;
  }

  export interface Products {
    chequing: boolean;
    savings: boolean;
    line_of_credit: boolean;
    mortgage: boolean;
    credit_card: boolean;
  }

}

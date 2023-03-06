interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface ICompany {
  name: string;
}

export interface IUser {
  [key: string]: string | IAddress | ICompany | boolean | undefined;
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: IAddress;
  company: ICompany;
  liked?: boolean;
}

export interface IEditUser {
  [key: string]: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}

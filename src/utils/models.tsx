export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  avatar?: string;
}

export interface IEditUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}

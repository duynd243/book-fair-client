export interface IRole {
  id: number | string;
  name: string;
  displayName: string;
}
export class ROLES {
  static ADMIN: IRole = {
    id: 1,
    name: "admin",
    displayName: "Admin",
  };
  static CUSTOMER: IRole = {
    id: 2,
    name: "customer",
    displayName: "Customer",
  };
}
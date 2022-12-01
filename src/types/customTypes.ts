export default interface IUser {
    id?: any | null,
    username: string,
    email: string,
    password: string,
    roles?: Array<string>
  }
  export  interface ICustomer{
    id?: any | null,
    firstname:string,
    lastname:string,
    phone:string
  }

export default interface UserProfile {
  id?: any | null;
  username: string;
  email: string;
  password: string;
  roles?: Array<string>;
}

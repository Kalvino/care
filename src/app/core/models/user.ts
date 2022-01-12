/**
 * role definition
 */
export interface IRole{
  _id?: number | null;
  name?: string;
  date?: Date;
}

/**
 * User user definition
 */
export interface User {
  _id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirm_password?: string;
  email?: string;
  mobilePhone?: string;
  roles?: IRole[] | null;
  role?: IRole[] | string | null;
  facility?: string | null;
  careGiver?: boolean | null;
  profilePic?: string | null; // url or base64 encoded image?

  //TODO
  user_patient_permission?: number | null;
}

/**
 * LoginResponse login response
 */
export interface LoginResponse {
  token: string,
  data: User
}

/**
 * enumeration for table user_patient_permissions
 */
export enum USER_PATIENT_PERMISSIONS {
  ADMINISTRATOR = 1,
  READ_ONLY = 2
}

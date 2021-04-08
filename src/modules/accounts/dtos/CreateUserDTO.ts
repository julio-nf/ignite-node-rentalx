export interface CreateUserDTO {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

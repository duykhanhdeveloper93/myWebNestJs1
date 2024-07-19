export class CreateUserDto {
    username: string;
    firstName:string;
    lastName: string;
    address: string;
    password: string;
    roleIds?: number[];
  }
  
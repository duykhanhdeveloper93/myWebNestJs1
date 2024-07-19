import { CreateUserDto } from "../../dtos/create-user.dto";


export enum PermissionEnum {
    ManageUser = 'manage_user',
    UpdateUser = 'update_user',
    RemoveUser = 'remove_user',
    UploadUser = 'upload_user',
    CreateUser = 'create_user',
}



export const userAdmin : CreateUserDto = {
    id: 1,
    firstName: 'Admin',
    lastName: 'Nguyễn',
    username: 'russiaVictory',
    address: 'Hà Nội',
    password: 'Aa123@'
} as any;
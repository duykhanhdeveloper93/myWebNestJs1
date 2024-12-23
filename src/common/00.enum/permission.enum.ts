import { CreateUserDto } from "../../dtos/create-user.dto";


export enum Permission {
    ManageUser = 'manage_user',
    UpdateUser = 'update_user',
    RemoveUser = 'remove_user',
    UploadUser = 'upload_user',
    CreateUser = 'create_user'
}



export const userAdmin : CreateUserDto = {
    id: 1,
    firstName: 'Admin',
    lastName: 'Nguyễn',
    username: 'russiaVictory2024',
    address: 'Hà Nội',
    password: 'SieuNhanVuTru123#'
} as any;


export const user = {
    id: 1,
    firstName: 'thống',
    lastName: 'Hệ',
    loginName: 'xxx',
    workEmail: 'xxx@gmail.com',
    address: 'Hà Nội',
    phoneNumber: '',

    isSys: true,
    department: 1,
    site: 1,
    createdBy: 1 as any,
    modifiedBy: 1 as any,
} as any;
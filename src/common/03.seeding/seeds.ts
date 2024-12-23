/* eslint-disable @typescript-eslint/no-explicit-any */



export const roles = [
    {
        id: 1,
        name: 'superadmin',
        desc: 'Quyền quản trị hệ thống',
        default: true,
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 2,
        name: 'adminDepartment',
        desc: 'Quyền quản trị phòng ban',
        default: true,
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 3,
        name: 'adminSite',
        desc: 'Quyền quản trị site',
        default: true,
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 4,
        name: 'supervisor',
        desc: 'Quyền giám sát, truy cập báo cáo',
        default: true,
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 5,
        name: 'agent',
        desc: 'Quyền khai thác viên (chat và call)',
        default: true,
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
];

export const permissions = [
    {
        id: 1,
        name: 'manage_user',
        desc: 'Quyền xem quản lý user',
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 2,
        name: 'update_user',
        desc: 'Quyền xóa user',
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 3,
        name: 'remove_user',
        desc: 'Quyền quản trị site',
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 4,
        name: 'upload_user',
        desc: 'Quyền tải lên danh sách user',
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    },
    {
        id: 5,
        name: 'create_user',
        desc: 'Quyền thêm mới user (thêm mới đơn lẻ)',
        createdBy: 1 as any,
        modifiedBy: 1 as any,
    }

];

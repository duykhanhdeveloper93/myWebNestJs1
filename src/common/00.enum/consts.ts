/* eslint-disable no-useless-escape */
export const jwtConstants = {
    secret: 'secret',
    refresh_secret: 'refresh_secret',
};
export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const IS_EXTERNAL_KEY = 'IS_EXTERNAL_KEY';
export const IS_EXTERNAL_VOICE_APP_KEY = 'IS_EXTERNAL_VOICE_APP_KEY';
export const IS_EXTERNAL_OBSS_APP_KEY = 'IS_EXTERNAL_OBSS_APP_KEY';
export const IS_GUEST_KEY = 'IS_GUEST_KEY';
export const IS_EXTERNAL_MULTI_APP_KEY = 'IS_EXTERNAL_MULTI_APP_KEY';
export const IS_BACKEND_APP_KEY = 'IS_BACKEND_APP_KEY';
export const IS_EXTERNAL_AI_APP_KEY = 'IS_EXTERNAL_AI_APP_KEY';

export const expiresIn = 86400;
export const expiresInForExternalUsers = 86400;
export const refreshTokenExpiresIn = 604800; // seconds
export const redisConsts = {
    prefixRefreshToken: 'auth:rt',
    prefixCaptchaToken: 'captcha',
    prefixLoginAttempt: 'auth:login-attempt',
    prefixUserIdentity: 'user:identity',
    changeChatStatus: 'change-chat-status',
};

export const redisTtl = {
    userIdentity: 604800, // seconds
};

export const maximumLoginFailTimes = 10;

export const pwPattern = /^(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\(){}'<>,.?\/])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,16}$/;

export const domainPattern =
    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const addressNamePattern =
    /^[a-zA-Z0-9,\-'_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s)(_-]+$/;

export const vietnameseNamePattern =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;

export const vietnameseTxtPattern =
    /^[a-zA-Z0-9\'.,ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s|\()*_-]+$/;

export const phoneNumberPattern = /^(03|05|07|08|09)[0-9]{8}$/;

export const phoneNumberFreePattern = /^(0)[0-9]{9}$/;

export const excludeSpecCharPattern =
    /^(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\(){}'<>,.?\/])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{1,255}$/;

export const dateStrPattern =
    /^(0[1-9]|[1-2]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}(,(0[1-9]|[1-2]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4})*$/;

export const nameNormalRegex = /^[a-zA-Z0-9_]+$/;

export const regexStringNoSpecific =
    /^[a-zA-Z0-9\'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s|_\)(,-.]+$/;

export const msgSuccess = {
    message: 'success',
};

export const imageExtensions = [
    //#region image
    'jpg',
    'png',
    'gif',
    'jpeg',
    'bmp',
    'tiff',
    'webp',
    //#endregion
];

export const fileExtensions = [
    ...imageExtensions,
    //#region video
    'mp4',
    'mov',
    'avi',
    'flv',
    '3gp',
    'mkv',
    'mpeg',
    'webm',
    //#endregion
    //#region audio
    'mp3',
    'wav',
    'aac',
    //#endregion
    //#region file
    'pdf',
    'doc',
    'docx',
    'xlsx',
    'txt',
    'xls',
    'ppt',
    'pptx',
    'csv',
    //#endregion
    //#region zip, rar
    'zip',
    'rar',
    //#endregion
    'rtf',
];

export const MB = 1048576; // byte - 1MB

export const maxSizeUploaded = 25 * MB; // byte - 25MB

export const SOCKET_EVENT_TYPE = {
    CHANGE_USER_CHAT_STATUS: 'change_user_chat_status',
    NOTIFICATION: 'notification',
    CALL_NOTIFICATION: 'call_notification',
};

/**
 * Must create a response code with below rule:
 *
 * OTHER: 1000x
 *
 * INVALID: 2000x
 *
 * TOKEN: 3000x
 *
 * AUTH: 4000x
 *
 * EXISTED: 5000x
 *
 * VOICE EXTERNAL: 8000x
 * VOICE EXTERNAL ADD USER: 8200x
 * VOICE EXTERNAL DELETE USER: 8210x
 * VOICE EXTERNAL ADD AGENT TEAM: 8400x
 * VOICE EXTERNAL EDIT AGENT TEAM: 8410x
 * VOICE EXTERNAL DELETE AGENT TEAM: 8420x
 */
export enum ResponseCodeEnum {
    /**
     * Không có quyền thực hiện hành động
     */
    NO_PERMISSION = 10001,
    /**
     * Đăng nhập IAMP thất bại
     */
    IMAP_LOGIN_FAILED = 10002,
    /**
     * Đăng nhập POP3 thất bại
     */
    POP3_LOGIN_FAILED = 10003,
    /**
     * Địa chỉ server mail không tìm thấy
     */
    MAIL_ENOTFOUND = 10004,
    /**
     * Timed out while connecting to server
     */
    TIMEOUT_CONNECT_MAIL_SERVER = 10005,
    /**
     * Dữ liệu không đúng định dạng
     */
    INVALID_DATA = 20001,
    /**
     * Refresh token không hợp lệ
     */
    INVALID_RT = 20002,
    /**
     * Token không hợp lệ
     */
    INVALID_TOKEN = 20003,
    /**
     * Trạng thái user không phù hợp để chuyển sang trạng thái mới
     */
    INVALID_USER_STATUS = 20004,
    /**
     * Định dạng file không hợp lệ
     */
    INVALID_FILE_EXT = 20005,
    /**
     * File size không hợp lệ
     */
    INVALID_FILE_SIZE = 20006,
    /**
     * Folder chưa được cho phép sử dụng hoặc không hợp lệ
     */
    NOT_ALLOW_FOLDER_PATH = 20007,
    /**
     * Folder chưa đúng định dạng
     */
    INVALID_FOLDER_PATH = 20008,
    /**
     * Cặp queue và site không hợp lệ
     */
    INVALID_QUEUE_SITE = 20009,
    /**
     * Không thể xóa email session vì phiên chưa được tiếp nhận
     */
    INVALID_CHAT_SESSION_EMAIL_DELETE = 20010,

    /**
     * Không thể xóa cấu hình mail do cấu hình đang được kích hoạt.
     */
    CAN_NOT_DELETE_CONFIG_EMAIL_BECAUSE_INVALID_STATUS = 20010,
    /**
     * Token hết hạn
     */
    TOKEN_EXPIRED = 30001,
    /**
     * Không thể xác định được lỗi khi verify token
     */
    UN_RECOGNIZE_ERROR_WHEN_VERIFY_TOKEN = 30002,
    /**
     * Yêu cầu đăng nhập.
     */
    REQUIRE_SIGN_IN = 40001,
    /**
     * Cặp mật khẩu thay đổi không match với nhau
     */
    PAIR_PW_CHANGE_NOT_MATCH = 40002,
    /**
     * Mật khẩu hiện tại không đúng
     */
    C_PW_NOT_CORRECT = 40003,
    /**
     * Tài khoản và mật khẩu không chính xác lúc đăng nhập
     */
    U_PW_NOT_CORRECT = 40004,
    /**
     * Mật khẩu mới phải khác mật khẩu hiện tại
     */
    N_PW_MUST_DIFF_C_PW = 40005,

    /**
     * Vượt quá số lần đăng nhập trong khoảng thời gian x.
     */
    EXCEED_LOGIN_TIMES = 40006,
    /**
     * Thông tin user credential đã tồn tại
     */
    EXISTED_USER_C = 50001,
    /**
     * Thông tin user (loginName - workEmail) đã tồn tại
     */
    EXISTED_USER = 50002,
    /**
     * Không tồn tại user
     */
    NOT_EXIST_USER = 50003,
    /**
     * Tài khoản đang bị vô hiệu hóa
     */
    USER_DEACTIVE = 500031,
    /**
     * Đã tồn tại dữ liệu theo 1 tiêu chí nào đó -  title, name ...
     */
    EXISTED_DATA = 50004,
    /**
     * Login name đã tồn tại
     */
    EXISTED_LOGIN_NAME = 50005,
    /**
     * Email đã tồn tại
     */
    EXISTED_EMAIL = 50006,
    /**
     * Số điện thoại của người dùng đã tồn tại (trong site)
     */
    EXISTED_USER_PHONE = 5000666,
    /**
     * Không có quyền thay đổi mật khẩu
     */
    NOT_PER_CHANGE_PASS = 5000999,
    /**
     * Phòng ban có số người dùng đã thêm vượt quá giới hạn của gói cước. Vui lòng liên hệ bộ phận kỹ thuật để được xử lý!
     */
    ADD_USER_OVER_PACKAGE = 5000222,
    /**
     * Không thể cập nhật vì người dùng là đã được thêm vào agent team nhưng lại bỏ các vai trò có thể call sang voice
     */
    ERROR_UPDATE_NOT_ENOUGH_ROLE = 5000111,
    /**
     * Site đã tồn tại
     */
    EXISTED_DOMAIN = 50007,
    /**
     * Alias đã tồn tại
     */
    EXISTED_ALIAS = 50008,
    /**
     * Home email của khách hàng đã tồn tại
     */
    EXISTED_CUSTOMER_EMAIL = 50009,
    /**
     * Home phone number khách hàng đã tồn tại
     */
    EXISTED_CUSTOMER_PHONE = 50010,
    /**
     * Social profile khách hàng đã tồn tại
     */
    EXISTED_CUSTOMER_SOCIAL = 50011,

    /**
     * Work email của khách hàng đã tồn tại
     */
    EXISTED_CUSTOMER_WORK_EMAIL = 50012,
    /**
     * Work phone number khách hàng đã tồn tại
     */
    EXISTED_CUSTOMER_WORK_PHONE = 50013,
    /**
     * Work phone number khách hàng đã tồn tại
     */
    EXISTED_TEMPLATE_EMAIL_NAME = 50014,
    /**
     * Không tồn tại site
     */
    NOT_EXIST_SITE = 50021,
    /**
     * Không tồn tại queue
     */
    NOT_EXIST_QUEUE = 50022,
    /**
     * Trang livechat đã được sử dụng
     */
    USED_LIVECHAT = 50031,
    /**
     * Config channel đã có livechat
     */
    CONFIG_CHANNEL_HAS_LIVECHAT = 50032,
    /**
     * Đã tồn tại tên config channel
     */
    EXISTED_CONFIG_CHANNEL_NAME = 50033,
    /**
     * Không tồn tại message
     */
    NOT_EXISTS_CHAT_MESSAGE = 50034,
    /**
     * Trên queue chỉ có 1 người online
     */
    ONLY_ONE_USER_IN_QUEUE = 50035,
    /**
     * Không tìm thấy cấu hình user và extension
     */
    NOT_FOUND_USER_EXTENSION = 50036,
    /**
     * Người dùng chưa được thêm vào queue
     */
    NOT_EXISTS_USER_IN_QUEUE = 50037,
    /**
     * Đã tồn tại cấu hình email
     */
    EXISTS_CONFIG_EMAIL = 50038,
    /**
     * Giá trị Gmail refresh token hết hạn, không hợp lệ.
     */
    INVALID_GMAIL_REFRESH_TOKEN = 50039,
    /**
     * Phiên chat chưa được đóng
     */
    NOT_CLOSED_CHAT_SESSION = 50051,
    /**
     * Không được phép mở phiên chat
     */
    NOT_PERMISION_OPEN_CHAT_SESSION = 50052,
    /**
     * Tài khoản không có quyền truy cập
     */
    NOT_PERMISION_LOGIN = 50053,
    /**
     * Site đang kích hoạt
     */
    SITE_IS_ACTIVE = 50054,
    /**
     * Kênh đã bị ngắt kết nối
     */
    CHANNEL_DISABLE = 50055,
    /**
     * Kênh đang tồn tại phiên chat đang hoạt động
     */
    IS_EXIST_CHAT_SESSION_ACTIVE = 50056,
    /**
     * Source id không có quyền mở phiên
     */
    SOURCE_ID_DENY = 50056,
    /**
     * Mã captcha không hợp lệ
     */
    INVALID_CAPTCHA = 50058,
    /**
     * Mã captch hết hiệu lực
     */
    CAPTCHA_EXPIRED = 50059,
    /**
     * Trùng dữ liệu
     */
    ER_DUP_ENTRY = 10001,
    /**
     * Trùng địa chỉ mail
     */
    ER_DUP_EMAIL = 10002,
    /**
     * Không hỗ trợ phương thức, hàm hoặc service
     */
    NOT_SUPPORT_SERVICE = 10003,
    /** Dữ liệu đang được liên kết với dữ liệu khác*/
    DATA_BEING_LINKED = 10004,
    /**
     * Đã đăng nhập
     */
    LOGGED_IN = 10005,
    /**
     * Lỗi không cập nhật được dữ liệu và db
     */
    UPDATE_FAIL = 10006,
    /**
     * Quá giới hạn cho phép
     */
    LIMIT_SIZE = 10007,
    /**
     * Không tìm thấy dữ liệu
     */
    NOT_FOUND = 10008,
    /**
     * Không tìm client name
     */
    NOT_FOUND_VOICE_CLIENT_NAME = 10009,
    /**
     * Extension bị thay đổi
     */
    EXT_CHANGED = 10010,
    /**
     * Call forwards đã tồn tại
     */
    EXISTED_CALL_FORWARD_PHONE = 70001,
    /**
     * Xóa call-forward không thành công, call-forward không thuộc phòng ban của bạn
     */

    NOT_DELETE_BECAUSE_CALL_FORWARD_NOT_MATCH_DEPARTMENT = 71004,
    /**
     * Xóa call-forward không thành công, call-forward không thuộc phòng ban của bạn
     */

    EXISTED_AGENT_TEAM_ALIAS = 80000,
    /**
     * User Agent Team đã tồn tại
     */
    EXISTED_AGENT_TEAM_USER = 80001,
    /**
     * User Agent Team đã tồn tại
     */

    NOT_CONNECT_API_VOICE_ADD_AGENT_TEAM = 80002,
    /**
     * User Agent Team đã tồn tại
     */
    USER_AGENT_TEAM_INVALID = 80003,
    /**
     * Lỗi không thể tạo được ticket
     */
    CALL_HANG_UP_FAIL = 80004,
    /**
     * Lỗi không thể update được status
     */
    UPDATE_VOICE_USER_STATUS_FAIL = 80005,
    /**
     * User Agent Team đã tồn tại
     */

    NOT_CONNECT_API_VOICE = 99999,

    //=====================Ngoại lệ của thêm mới LINK agent team bên voice===================
    /**
     * Gán user vào agent team không thành công, user không hợp lệ
     */
    EXTERNAL_ADD_LINK_AGENT_TEAM_30 = 81030,
    /**
     * Gán user vào agent team không thành công, không hợp lệ trường agent_team_id*
     */
    EXTERNAL_ADD_LINK_AGENT_TEAM_31 = 81031,
    /**
     * Trường priority không hợp lệ, phải là số từ 1 đến …
     */
    EXTERNAL_ADD_LINK_AGENT_TEAM_32 = 81032,
    /**
     * Trường priority không hợp lệ, phải là 1
     */
    EXTERNAL_ADD_LINK_AGENT_TEAM_33 = 81033,
    /**
     * Trường priority không hợp lệ, phải là ...
     */
    EXTERNAL_ADD_LINK_AGENT_TEAM_34 = 81034,
    /**
     * Gán user vào agent team không thành công, user đã tồn tại
     */
    EXTERNAL_ADD_LINK_AGENT_TEAM_40 = 81040,

    //=====================Ngoại lệ của thêm mới agent team bên voice===================
    /**
     * Tên agent team không hợp lệ trường name
     */
    EXTERNAL_ADD_AGENT_TEAM_03 = 84003,
    /**
     * Tên alias đã tồn tại trên hệ thống trường alia
     */
    EXTERNAL_ADD_AGENT_TEAM_04 = 84004,
    /**
     * Phòng ban không hợp lệ trường department_id
     */
    EXTERNAL_ADD_AGENT_TEAM_05 = 84005,
    /**
     * Trường priority không hợp lệ. Chỉ chấp nhận giá trị 1 (tăng dần) hoặc 0 (Được trùng độ ưu tiên)
     */
    EXTERNAL_ADD_AGENT_TEAM_06 = 84006,
    /**
     * Lỗi thêm !
     */
    EXTERNAL_ADD_AGENT_TEAM_08 = 84008,

    //=====================Ngoại lệ của chỉnh sửa agent team bên voice===================
    /**
     * Tên agent team không hợp lệ trường name
     */
    EXTERNAL_EDIT_AGENT_TEAM_03 = 84103,
    /**
     * Tên alias đã tồn tại trên hệ thống trường alia
     */
    EXTERNAL_EDIT_AGENT_TEAM_04 = 84104,
    /**
     * Phòng ban không hợp lệ trường department_id
     */
    EXTERNAL_EDIT_AGENT_TEAM_05 = 84105,
    /**
     * Trường priority không hợp lệ. Chỉ chấp nhận giá trị 1 (tăng dần) hoặc 0 (Được trùng độ ưu tiên)
     */
    EXTERNAL_EDIT_AGENT_TEAM_06 = 84106,
    /**
     * Lỗi thêm !
     */
    EXTERNAL_EDIT_AGENT_TEAM_08 = 84108,
    /**
     * Không tìm thấy Agent Tem có mã này !
     */
    EXTERNAL_EDIT_AGENT_TEAM_09 = 84109,

    //=====================Ngoại lệ của xóa agent team bên voice===================
    /**
     * Xóa agent team không thành công, vui lòng xóa agent team khỏi user
     */
    EXTERNAL_DELETE_AGENT_TEAM_01 = 84201,
    /**
     * Xóa agent team không thành công, vui lòng xóa agent team khỏi skill group
     */
    EXTERNAL_DELETE_AGENT_TEAM_02 = 84202,
    /**
     * Xóa agent team không thành công, vui lòng xóa agent team khỏi queue user
     */
    EXTERNAL_DELETE_AGENT_TEAM_03 = 84203,
    /**
     * Xóa agent team không thành công, agent team không tồn tại
     */
    EXTERNAL_DELETE_AGENT_TEAM_04 = 84204,
    /**
     * Vui lòng nhập mã Agent Team cần xóa !
     */
    EXTERNAL_DELETE_AGENT_TEAM_07 = 84207,

    //=====================Ngoại lệ của thêm user bên voice===================
    /**
     * Họ không hợp lệ trường first_name
     */
    EXTERNAL_ADD_USER_03 = 82003,
    /**
     * Tên không hợp lệ trường lastname
     */
    EXTERNAL_ADD_USER_04 = 82004,
    /**
     * Username đã tồn tại trên hệ thống trường username
     */
    EXTERNAL_ADD_USER_05 = 82005,
    /**
     * Password không hợp lệ trường password
     */
    EXTERNAL_ADD_USER_06 = 82006,
    /**
     * Số điện thoại không hợp lệ trường mobile
     */
    EXTERNAL_ADD_USER_07 = 82007,
    /**
     * Email không hợp lệ trường email
     */
    EXTERNAL_ADD_USER_08 = 82008,
    /**
     * Department không hợp lệ trường department_id
     */
    EXTERNAL_ADD_USER_10 = 82010,
    /**
     * Username không hợp lệ trường username
     */
    EXTERNAL_ADD_USER_11 = 82011,
    /**
     * Active type không hợp lệ trường active_type
     */
    EXTERNAL_ADD_USER_12 = 82012,

    //=====================Ngoại lệ của sửa user bên voice===================
    /**
     * Họ không hợp lệ trường first_name
     */
    EXTERNAL_EDIT_USER_03 = 83003,
    /**
     * Tên không hợp lệ trường last_name
     */
    EXTERNAL_EDIT_USER_04 = 83004,
    /**
     * User chuyển từ không đồng bộ sang đồng bộ sẽ tạo mới user nhưng trong hệ thống voice đã tồn tại
     */
    EXTERNAL_EDIT_USER_05 = 83005,
    /**
     * Password không hợp lệ trường password
     */
    EXTERNAL_EDIT_USER_06 = 83006,
    /**
     * Số điện thoại không hợp lệ trường mobile
     */
    EXTERNAL_EDIT_USER_07 = 83007,
    /**
     * Email không hợp lệ trường email
     */
    EXTERNAL_EDIT_USER_08 = 83008,
    /**
     * Department không hợp lệ trường department_id
     */
    EXTERNAL_EDIT_USER_10 = 83010,
    /**
     * User không tồn tại
     */
    EXTERNAL_EDIT_USER_11 = 83011,
    /**
     * Active type không hợp lệ trường active_type
     */
    EXTERNAL_EDIT_USER_12 = 83012,

    //=====================Ngoại lệ của xóa user bên voice===================
    /**
     * Xóa user không thành công, vui lòng xóa user khỏi agent team
     */
    EXTERNAL_DELETE_USER_01 = 82101,
    /**
     * Xóa user không thành công, user không tồn tại
     */
    EXTERNAL_DELETE_USER_02 = 82102,
    /**
     * Xóa user không thành công, user không thuộc phòng ban của bạn
     */
    EXTERNAL_DELETE_USER_04 = 82104,
    /**
     * Xóa user không thành công, user không thuộc phòng ban của bạn
     */
    EXTERNAL_DELETE_USER_05 = 82105,
    //=====================Ngoại lệ của thêm branch, sk bên voice===================
    /**
     * Name không hợp lệ
     */
    EXTERNAL_NAME_VALID = 80006,
    /**
     * Alias không hợp lệ
     */
    EXTERNAL_ALIAS_VALID = 80007,

    //=====================Ngoại lệ package===================
    /**
     * Phòng ban đã tồn tại trong gói cước
     */
    PACK_DEP_EXISTED = 90000,
    /**
     * Không thể thêm phòng ban do quá số lượng giới hạn người dùng của gói cước
     */
    OVER_USER_IN_PACKAGE = 90001,
    /**
     * Gói cước đã được thêm số lượng người dùng lớn hơn giới hạn cho phép. Vui lòng kiểm tra lại!
     */
    NOT_CHANGE_LIMITED_USER_PACKAGE = 90002,
    /**
     * Phòng ban này đã được thêm ở một gói cước khác
     */
    DEP_EXISTED_ANOTHER_PACKAGE = 90003,
    /**
     * Chỉ super admin mới có quyền thêm quyền gói cước
     */
    ONLY_SUPER_ADMIN_ADD_PER_PACKAGE = 90004,
    /**
     * Site không tồn tại
     */
    SITE_NOT_FOUND = 90005,

    //=====================Ngoại lệ trạng thái chat===================
    /**
     * Gọi thay đổi trạng thái chat liên tục
     */
    SPAM_CHAGE_CHAT_STATUS = 120001,
    /**
     * Gọi thay đổi trạng thái chat liên tục
     */
    MULTI_CHANNEL_SERVICE_NOT_VALID = 120002,
     /**
     * Gọi thay đổi trạng thái chat liên tục
     */
    BACKEND_JOB_SERVICE_NOT_VALID = 120003,
}

export enum UserStateEnum {
    CLOCK_IN = 'CLOCK_IN',
    CLOCK_OUT = 'CLOCK_OUT',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    // region call states
    NOT_READY = 'NOT_READY',
    READY_INBOUND = 'READY_INBOUND',
    READY_OUTBOUND = 'READY_OUTBOUND',
    RESERVED_INBOUND = 'RESERVED_INBOUND',
    RESERVED_OUTBOUND = 'RESERVED_OUTBOUND',
    TALKING_OUTBOUND = 'TALKING_OUTBOUND',
    TALKING_INBOUND = 'TALKING_INBOUND',
    HOLD = 'HOLD',
    WORK_READY = 'WORK_READY',
    WORK = 'WORK',
    // endregion call states
}

export enum AgentStateMessage {
    LOGIN = 'Đăng Nhập',
    LOGOUT = 'Đăng xuất',
    NOT_READY = 'Chưa sẵn sàng nhận cuộc',
    READY_INBOUND = 'Sẵn sàng nhận cuộc gọi vào',
    READY_OUTBOUND = 'Sẵn sàng gọi ra',
    RESERVED_INBOUND = 'Chuẩn bị nhận cuộc gọi vào',
    RESERVED_OUTBOUND = 'Chuẩn bị nhận cuộc gọi ra',
    TALKING_OUTBOUND = 'Đang trong cuộc gọi ra',
    TALKING_INBOUND = 'Đang trong cuộc gọi vào',
    HOLD = 'Giữ máy cuộc gọi',
    WORK_READY = 'Sẵn sàng làm việc',
    WORK = 'Làm việc',

    ONLINE_CHAT = 'Online chat',
    OFFLINE_CHAT = 'Offline chat',
}

export enum ChatAgentState {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

export enum GenderEnum {
    FEMALE,
    MALE,
    OTHER,
}

export enum DevideTypeEnum {
    EQUALITY,
    PRIORITY,
    ALL,
}

export enum ActivedTypeEnum {
    DISABLE,
    ACTIVED,
}

export enum PriorityTypeEnum {
    LIKE,
    INCREMENT,
}

export enum PAGE_SIZE {
    MIN = 10,
    MEDIUM = 25,
    MAX = 50,
}

export enum StatusPackage {
    DEACTIVATE,
    ACTIVATE,
}

export enum CallTypeEnum {
    'ip-soft-phone',
    'phone',
    'web-phone',
}

export enum StatusEvaluation {
    ASSIGNED = 1,
    EVALUATED = 2,
    PUBLIC = 3,
    RE_EVALUATE_REQUESTED = 4,
    RE_EVALUATE_ASSIGNED = 5,
    RE_EVALUATED = 6,
}

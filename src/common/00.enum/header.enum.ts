export enum HeadersKeyEnum {
    /**
     * Tương ứng với access_token
     */
    AS = 'u-s',
    /**
     * Tương ứng với access_token cho guest user
     */
    ASG = 'u-s-g',
    /**
     * Tương ứng với refresh_token
     */
    RT = 'u-s-r',
    /**
     * Session của captcha
     */
    CaptchaId = 'cid',
    LoggedIn = 'logged-in',
    ClientId = 'client-id',
    Guest = 'u-guest',
}

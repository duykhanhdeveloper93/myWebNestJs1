import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/common/00.enum/consts';
import { CRequest } from './base.service.type';
import { HeadersKeyEnum } from 'src/common/00.enum/header.enum';
import { CIncomingHttpHeaders } from 'src/common/04.types/http-request';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(username: string, pass: string, options: { request: CRequest }): Promise<any> {

    const token = this.extractTokenFromHeader(options.request);

    const headers = options.request.headers as CIncomingHttpHeaders;

    console.log(headers)

    console.log(options.request?.user)
    if (token) {
      try {
        // Xác thực access_token
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        // Nếu token hợp lệ, trả về thông báo người dùng đã đăng nhập
        return {
          message: "Người dùng đã đăng nhập",
          access_token: token,
        };
      } catch (e) {
        // Token không hợp lệ, tiếp tục quá trình đăng nhập
      }
    }
    const user = await this.userService.findOne(username);
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    const passHash = await this.userService.hashPassword(pass);
    if (!isPasswordMatching) {

      return {
        message: "Mật khẩu hoặc username không đúng"
      }
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

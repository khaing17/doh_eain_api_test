import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...result } = user;

    return result;
  }

  async login(data: User): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials!');
    }
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { useremail: user.email, sub: user.id };

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async register(data: CreateUserDto): Promise<{ access_token: string }> {
    const isUserExit = await this.userService.findByEmail(data.email);
    if (isUserExit) {
      throw new BadRequestException('Email already in use!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const newUser = await this.userService.create({
      ...data,
      password: hashPassword,
    });

    const payload = { sub: newUser.id, email: newUser.email };
    const accessToken = await this.jwt.signAsync(payload);
    return { access_token: accessToken };
  }
}

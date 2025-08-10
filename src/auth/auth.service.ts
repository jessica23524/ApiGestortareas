import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/registrouser';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Registro de usuario
  async register(dto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
  }

  // Login de usuario
  async login(email: string, password: string) {
    console.log('📩 Email recibido:', email);

    const user = await this.usersService.findByEmail(email);
    console.log('🛢 Usuario en BD:', user);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas (usuario no existe)');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('✅ Contraseña válida?:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas (password inválido)');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}

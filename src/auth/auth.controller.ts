import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registrouser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint login y registro
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}

import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  // Solo letras, números, guion bajo. Ajusta el regex según necesites.
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'username sólo puede contener letras, números y guion bajo' })
  username: string;

  @IsString()
  
  password: string;
}

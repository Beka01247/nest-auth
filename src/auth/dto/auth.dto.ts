import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Пароль должен быть от 8 до 20 символов' })
  password: string;
}

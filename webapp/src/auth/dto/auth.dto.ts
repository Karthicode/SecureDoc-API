import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  username: string;
}

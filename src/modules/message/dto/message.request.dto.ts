import { IsString } from 'class-validator';

export class MessageRequestDto {

  @IsString()
  roomId: string;

  @IsString()
  content: string;

  @IsString()
  type: string;
}
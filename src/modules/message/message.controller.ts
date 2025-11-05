import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('room/:roomId')
  async getMessages(
    @Param('roomId') roomId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<Message[]> {
    return this.messageService.getMessagesByRoom(roomId, +page, +limit);
  }

  @Post()
  async sendMessage(@Body() data: Partial<Message>): Promise<Message> {
    return this.messageService.sendMessage(data);
  }

  @Patch(':messageId/react')
  async reactToMessage(
    @Param('messageId') messageId: string,
    @Body() body: { userId: string; emoji: string },
  ): Promise<void> {
    return this.messageService.reactToMessage(
      messageId,
      body.userId,
      body.emoji,
    );
  }

  @Patch(':messageId/pin')
  async togglePin(
    @Param('messageId') messageId: string,
    @Body() body: { isPinned: boolean },
  ): Promise<void> {
    return this.messageService.togglePin(messageId, body.isPinned);
  }

  @Delete(':messageId')
  async deleteMessage(@Param('messageId') messageId: string): Promise<void> {
    return this.messageService.deleteMessage(messageId);
  }
}

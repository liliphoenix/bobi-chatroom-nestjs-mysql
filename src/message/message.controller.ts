import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
  @Post('friend')
  findMsg(@Body() data) {
    return this.messageService.getFriendChat(data);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
  @Post('notread')
  notRead(@Body() data) {
    return this.messageService.getNotRead(data);
  }
  @Post('room')
  findOne(@Body() data) {

    return this.messageService.findOne(data);
  }
  @Delete('remove')
  remove(@Body() data) {
    return this.messageService.remove(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }
}

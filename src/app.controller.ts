import { Controller, Get, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { createReadStream } from 'fs';
import { join } from 'path';
import { buffer } from 'stream/consumers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('generate-poster')
  async generatePoster(scale: number) {
    console.log('event')
    await this.appService.generatePoster(scale)
    console.log('poster generated');
  }

  @MessagePattern({ cmd: 'get-poster' })
  async getPoster(scale: number) {
    return await this.appService.generatePoster(scale);
  }

}

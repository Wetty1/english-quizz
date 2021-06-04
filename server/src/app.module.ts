import { Module } from '@nestjs/common';
import { AppGateway } from './gateways/room.gateway';

@Module({
  controllers: [],
  imports: [],
  providers: [AppGateway],
})
export class AppModule {}

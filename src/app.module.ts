import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    // TeachersModule,
    // ClassesModule,
    // ProgramsModule,
    // NewsModule,
    // FilesModule,
    UsersModule,
    // ContactModule,
    // CommentsModule,
    // MessageModule,
    // OptionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

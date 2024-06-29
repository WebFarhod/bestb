import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './teachers/teachers.module';
import { MessageModule } from './message/message.module';
import { ContactModule } from './contact/contact.module';
import { OptionsModule } from './options/options.module';
import { ProgramsModule } from './programs/programs.module';
import { ClassesModule } from './classes/classes.module';
// import { NewsModule } from './news/news.module';
// import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    TeachersModule,
    ClassesModule,
    ProgramsModule,
    // NewsModule,
    // FilesModule,
    UsersModule,
    ContactModule,
    // CommentsModule,
    MessageModule,
    OptionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

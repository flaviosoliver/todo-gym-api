import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RoutinesModule } from './routines/routines.module';
import { ExercisesModule } from './exercises/exercises.module';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { SharedModule } from './shared/shared.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const localConnection = configService.get<string>('MONGO_LOCAL');
        const atlasConnection = configService.get<string>('MONGO_ATLAS');
        const isLocal = process.env.ENVIRONMENT_LOCAL ?? false;
        return {
          uri: isLocal
            ? `${localConnection}/${process.env.MONGO_DB}`
            : `${atlasConnection}/${process.env.MONGO_DB}`,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ExercisesModule,
    PlansModule,
    RoutinesModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

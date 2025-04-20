import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { EskizModule } from './eskiz/eskiz.module';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { LevelModule } from './level/level.module';
import { BrandModule } from './brand/brand.module';
import { CapasityModule } from './capasity/capasity.module';
import { SizeModule } from './size/size.module';
import { FaqModule } from './faq/faq.module';
import { ContactUsModule } from './contact_us/contact_us.module';
import { AboutUsModule } from './about_us/about_us.module';
import { PartnersModule } from './partners/partners.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { ProfessionModule } from './profession/profession.module';
import { MasterModule } from './master/master.module';
import { MasterProfessionModule } from './master-profession/master-profession.module';
import { ProfessionLevelModule } from './profession-level/profession-level.module';
import { ToolModule } from './tool/tool.module';
import { ProfessionToolModule } from './profession-tool/profession-tool.module';
import { OrderModule } from './order/order.module';
import { OrderMasterModule } from './order-master/order-master.module';
import { BasketModule } from './basket/basket.module';
import { CommentModule } from './comment/comment.module';
import { TelegramService } from './telegram/telegram.service';
import { TelegramModule } from './telegram/telegram.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { FileUploadController } from './file-upload/file-upload.controller';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [UserModule, UserAuthModule, EskizModule, PrismaModule, RegionModule, LevelModule,
    BrandModule, CapasityModule, SizeModule, FaqModule, ContactUsModule, AboutUsModule,
    PartnersModule, ShowcaseModule, ProfessionModule, MasterModule,
    MasterProfessionModule, ProfessionLevelModule, ToolModule, ProfessionToolModule,
    OrderModule, OrderMasterModule, BasketModule, CommentModule, TelegramModule,
    CloudinaryModule.forRootAsync({
      useFactory: () => ({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      }),
    }),
    FileUploadModule,
],
  controllers: [AppController, FileUploadController],
  providers: [AppService, TelegramService],
})
export class AppModule { }

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

@Module({
  imports: [UserModule, UserAuthModule, EskizModule, PrismaModule, RegionModule, LevelModule, BrandModule, CapasityModule, SizeModule, FaqModule, ContactUsModule, AboutUsModule, PartnersModule, ShowcaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

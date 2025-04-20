import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as dotenv from "dotenv"
dotenv.config()

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private readonly chatId = "@fixora_project";

  constructor() {
    this.bot = new TelegramBot("7768164714:AAGRp1r6V9UeBt5R1ts-MBHJMe2bTuGrdok", { polling: false });
  }

  async sendMessage(message: string) {
    if (!this.chatId) return;
    try {
      await this.bot.sendMessage(this.chatId, message);
    } catch (error) {
      console.error('Telegram error:', error.message);
    }
  }
}

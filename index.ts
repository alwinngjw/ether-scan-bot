import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import * as Helpers from './HelperFunctions/HelperFunctions';
import * as Api from './API/Api';

dotenv.config();

const token = process.env.TELEGRAM_TOKEN!;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome! Send me a contract address to get started."
  );
});

bot.onText(/\/contract (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const contractAddress: string | undefined = match?.[1];

  if (!contractAddress || !Helpers.isValidEthereumAddress(contractAddress)) {
    bot.sendMessage(
      chatId,
      "Please provide a valid Ethereum contract address."
    );
    return;
  }

  bot.sendMessage(chatId, "How many wallets?");

  bot.once("message", async (msg) => {
    const amountString = msg.text?.trim();

    if (!amountString || !/^\d+$/.test(amountString)) {
      bot.sendMessage(
        chatId,
        "Please provide a valid positive number as the second parameter."
      );
      return;
    }

    const amount = parseInt(amountString, 10);

    if (amount <= 0) {
      bot.sendMessage(
        chatId,
        "Please provide a valid positive number as the second parameter."
      );
      return;
    }

    bot.sendMessage(chatId, "Please wait...");

    try {
      const results = await Api.getTransactions(contractAddress);
      const filteredResults = Helpers.filterByAmount(results, amount);
      const clickableLinks = Helpers.urlsToString(filteredResults);

      bot.sendMessage(chatId, clickableLinks);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      bot.sendMessage(chatId, "Error fetching transactions. Please try again.");
    }
  });
});

  

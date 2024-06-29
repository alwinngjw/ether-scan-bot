"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const Helpers = __importStar(require("./HelperFunctions/HelperFunctions"));
const Api = __importStar(require("./API/Api"));
dotenv_1.default.config();
const token = process.env.TELEGRAM_TOKEN;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome! Send me a contract address to get started.");
});
bot.onText(/\/contract (.+)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const contractAddress = match === null || match === void 0 ? void 0 : match[1];
    if (!contractAddress || !Helpers.isValidEthereumAddress(contractAddress)) {
        bot.sendMessage(chatId, "Please provide a valid Ethereum contract address.");
        return;
    }
    bot.sendMessage(chatId, "How many wallets?");
    bot.once("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const amountString = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.trim();
        if (!amountString || !/^\d+$/.test(amountString)) {
            bot.sendMessage(chatId, "Please provide a valid positive number as the second parameter.");
            return;
        }
        const amount = parseInt(amountString, 10);
        if (amount <= 0) {
            bot.sendMessage(chatId, "Please provide a valid positive number as the second parameter.");
            return;
        }
        bot.sendMessage(chatId, "Please wait...");
        try {
            const results = yield Api.getTransactions(contractAddress);
            const filteredResults = Helpers.filterByAmount(results, amount);
            const clickableLinks = Helpers.urlsToString(filteredResults);
            bot.sendMessage(chatId, clickableLinks);
        }
        catch (error) {
            console.error("Error fetching transactions:", error);
            bot.sendMessage(chatId, "Error fetching transactions. Please try again.");
        }
    }));
}));

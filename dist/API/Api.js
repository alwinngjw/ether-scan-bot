"use strict";
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
exports.getTransactions = getTransactions;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.ETHERSCAN_API_KEY;
function getTransactions(contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}"`;
        try {
            const response = yield axios_1.default.get(url);
            if (response.data.status === "1") {
                return response.data.result;
            }
            else {
                throw new Error(response.data.message);
            }
        }
        catch (error) {
            console.error("Error fetching transactions:", error);
            throw error;
        }
    });
}

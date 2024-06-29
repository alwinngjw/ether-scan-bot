"use strict";
//Helper Functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByAmount = exports.urlsToString = void 0;
exports.isValidEthereumAddress = isValidEthereumAddress;
const urlsToString = (urls) => {
    const baseUrl = "https://etherscan.io/address/";
    return urls
        .map((url, index) => `${index + 1}.) ${baseUrl}${url}`)
        .join("\n\n");
};
exports.urlsToString = urlsToString;
const filterByAmount = (transactions, amount) => transactions
    .map((transaction) => transaction.to)
    .filter((value, index, self) => self.indexOf(value) === index)
    .slice(0, amount);
exports.filterByAmount = filterByAmount;
function isValidEthereumAddress(address) {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
}

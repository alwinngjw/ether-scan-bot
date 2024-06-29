//Helper Functions

export const urlsToString = (urls: string[]): string => {
  const baseUrl = "https://etherscan.io/address/";
  return urls
    .map((url, index) => `${index + 1}.) ${baseUrl}${url}`)
    .join("\n\n");
};

export const filterByAmount = (transactions: any, amount: number): string[] =>
  transactions
    .map((transaction: { to: any }) => transaction.to)
    .filter(
      (value: number, index: number, self: any) => self.indexOf(value) === index
    )
    .slice(0, amount);

export function isValidEthereumAddress(address: string): boolean {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
}

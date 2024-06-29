import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.ETHERSCAN_API_KEY!;

export async function getTransactions(contractAddress: string): Promise<any> {
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}"`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "1") {
      return response.data.result;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

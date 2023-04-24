import { toast } from "react-toastify";
import { ethers } from "ethers";

export const reload = () => {
  window.location.reload();
};

export const wait = (ms: number): Promise<void> =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export async function safeContractCall<
  T = ethers.providers.TransactionResponse
>(contractCall: Promise<T>) {
  try {
    const result = await contractCall;
    return result;
  } catch (error) {
    toast.error((error as any)?.reason || "Something went wrong");
    console.error(error);
  }
}

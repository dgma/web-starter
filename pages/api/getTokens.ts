// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { wallet } from "@/libs/faucet";

type Data = {
  result?: ethers.providers.TransactionResponse;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const tx = {
      to: req.query.addr as string | undefined,
      value: ethers.utils.parseEther("0.15"),
    };
    await wallet.signTransaction(tx);
    const result = await wallet.sendTransaction(tx);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: (error as any)?.message });
  }
}

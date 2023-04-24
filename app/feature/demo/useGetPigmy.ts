import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

import { UIError } from "@/app/error-handling";

import { useApp } from "@/libs/context/app";

const useGetPigmy = () => {
  const { provider, setTransactionPending } = useApp();

  const fetcher = async () => {
    try {
      setTransactionPending(true);
      const addr = await provider?.getSigner().getAddress();

      const res = await fetch(
        `${window.location.origin}/api/getTokens?addr=${addr}`
      );

      if (res.status !== 200) {
        throw "Not enough coins in faucet";
      }
    } catch (error) {
      throw new UIError(
        "Unable to transfer PIGMY to your wallet due to unknown error",
        error
      );
    } finally {
      setTransactionPending(false);
    }
  };

  const { trigger } = useSWRMutation<void, UIError | string>(
    "demo.getPigmy",
    fetcher,
    {
      throwOnError: false,
      onSuccess: () =>
        toast.success("100 PIGMY sent to your wallet!", { delay: 1000 }),
    }
  );

  return { getPigmy: trigger };
};

export default useGetPigmy;

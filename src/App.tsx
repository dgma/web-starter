import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, projectId } from "./config";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="dark:text-white text-black">Hello World</div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { useMemo, useState } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { MintButtonWrapper } from './components/MintButtonWrapper';
import type { SuccessResponseData } from '@flipflop-sdk/tools/dist/types/common';

function WalletContent() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<SuccessResponseData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string>('HkLWezaZCZpSyTMQRbGTGnCtMXBQmkegtqkt1swFEQ6Q'); // HkLWezaZCZpSyTMQRbGTGnCtMXBQmkegtqkt1swFEQ6Q
  const [urcCode, setUrcCode] = useState<string>('998_5UtbDq2joPY9tgNi');
  const { publicKey } = useWallet();

  const handleError = (msg: string) => {
    setSuccessMessage(undefined);
    setErrorMessage(msg);
    setLoading(false);
  }
  const handleSuccess = (data: SuccessResponseData) => {
    setErrorMessage("");
    setSuccessMessage(data);
    setLoading(false);
  }
  return (
    <div className="fixed inset-0 flex flex-col items-center gap-5 p-10 min-h-screen bg-gray-100 overflow-auto">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 text-center">
        <WalletMultiButton />
      </div>

      {publicKey && (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
          <div className="mb-8 space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Mint Address
              </label>
              <input
                type="text"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                className="w-full px-4 py-2 text-sm text-black border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                URC Code
              </label>
              <input
                type="text"
                value={urcCode}
                onChange={(e) => setUrcCode(e.target.value)}
                className="w-full px-4 py-2 text-sm text-black border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <MintButtonWrapper
            network='devnet'
            mintAddress={mintAddress}
            urcCode={urcCode}
            onStart={() => {
              setLoading(true);
              setErrorMessage('');
              setSuccessMessage(undefined);
            }}
            onError={handleError}
            onSuccess={handleSuccess}
          />

          {loading && (
            <div className="mt-6">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-sm text-gray-500">Minting...</p>
            </div>
          )}
          {(errorMessage || successMessage) && (
            <div className="mt-6 space-y-4">
              {errorMessage && (
                <div className="p-4 bg-red-50 text-sm border border-red-200 rounded-lg text-red-700 break-words whitespace-pre-wrap">
                  {errorMessage}
                </div>
              )}
              {successMessage?.tx && (
                <div className="p-4 bg-green-50 text-sm border border-green-200 rounded-lg text-green-700 break-words whitespace-pre-wrap">
                  <div className="font-bold">Transaction Success, tx: </div>
                  <a href={`https://explorer.solana.com/tx/${successMessage.tx}?cluster=devnet`} target="_blank">{successMessage.tx}</a>
                  {/* <div className="mt-5 font-bold">Flipflop details: </div> */}
                  {/* <a href={successMessage.tokenUrl} target="_blank">{successMessage.tokenUrl}</a> */}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
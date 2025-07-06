import { MintButton } from "@flipflop-sdk/tools";
import type { SuccessResponseData } from "@flipflop-sdk/tools/dist/types/common";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import type { FC } from "react";

type MintButtonWrapperProps = {
  network: string;
  mintAddress: string;
  urcCode: string;
  onStart?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (data: SuccessResponseData) => void;
}

export const MintButtonWrapper:FC<MintButtonWrapperProps> = ({
  network,
  mintAddress,
  urcCode,
  onStart,
  onError,
  onSuccess
}) => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  return (
    <div>
      <MintButton
        network={network}
        mintAddress={mintAddress}
        urcCode={urcCode}
        wallet={anchorWallet}
        connection={connection}
        onMintStart={onStart}
        onMintError={onError}
        onMintSuccess={onSuccess}
        onRefundSuccess={onSuccess}
        onRefundStart={onStart}
        onRefundError={onError}
        mintButtonTitle="Donate"
        mintButtonStyle={{
          width: '100%',
          backgroundColor: 'green',
          color: 'white',
          border: '1px solid white',
          borderRadius: '5px',
          padding: '10px',
          margin: 'auto',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          letterSpacing: '1px',
        }}
        showRefundButton={true}
        showUrcButton={false}
        refundButtonTitle="Refund"
        refundButtonStyle={{
          width: '100%',
          backgroundColor: 'red',
          color: 'white',
          border: '1px solid white',
          borderRadius: '5px',
          padding: '10px',
          margin: 'auto',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          letterSpacing: '1px',
        }}
        informationStyle={{
          display: 'flex',
          justifyContent: 'left',
          color: 'gray',
          fontSize: '14px',
          textAlign: 'left',
          margin: '10px auto'
        }}
        generateURCStyle={{
          display: 'flex',
          justifyContent: 'center',
          color: 'gray',
          margin: '10px auto'
        }}
        flipflopLogoStyle={{
          marginTop: '20px'
        }}
      />

    </div>
  );
}

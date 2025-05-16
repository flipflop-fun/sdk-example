import { MintButton } from "@flipflop-sdk/tools";
import type { SuccessResponseData } from "@flipflop-sdk/tools/dist/types/common";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import type { FC } from "react";

type MintButtonWrapperProps = {
  mintAddress: string;
  urcCode: string;
  onStart?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (data: SuccessResponseData) => void;
}

export const MintButtonWrapper:FC<MintButtonWrapperProps> = ({
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
        mintAddress={mintAddress}
        urcCode={urcCode}
        wallet={anchorWallet}
        connection={connection}
        onStart={onStart}
        onError={onError}
        onSuccess={onSuccess}
        buttonTitle="Donate"
        buttonStyle={{
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
      />

    </div>
  );
}

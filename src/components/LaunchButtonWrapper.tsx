import { LaunchTokenButton } from "@flipflop-sdk/tools";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import type { CSSProperties, FC, ChangeEvent } from "react";
import { useState } from "react";

export type LaunchButtonWrapperProps = {
  network: string;
  buttonTitle?: string;
  buttonStyle?: CSSProperties;
  informationStyle?: CSSProperties;
  onStart?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (data: any) => void;
};

export const LaunchButtonWrapper: FC<LaunchButtonWrapperProps> = ({
  network,
  buttonTitle = "Launch Token",
  buttonStyle,
  informationStyle,
  onStart,
  onError,
  onSuccess,
}) => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [tokenType, setTokenType] = useState<"meme" | "standard">("meme");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  const defaultButtonStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    border: "1px solid white",
    borderRadius: "5px",
    padding: "10px",
    margin: "auto",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "1px",
  };

  const defaultInformationStyle: CSSProperties = {
    display: "flex",
    justifyContent: "left",
    color: "gray",
    fontSize: "14px",
    textAlign: "left",
    margin: "10px auto",
  };

  const MissingComponentNote = (
    <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded">
      未能从 @flipflop-sdk/tools 找到 LaunchTokenButton 组件。请确认已正确安装/链接包含该组件的版本，或检查导出名称是否为 LaunchTokenButton。
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
          Token Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., FlipFlop Token"
          className="w-full px-4 py-2 text-sm text-black border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
          Symbol
        </label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g., FLIP"
          className="w-full px-4 py-2 text-sm text-black border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
          Token Type
        </label>
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="tokenType"
              value="meme"
              checked={tokenType === "meme"}
              onChange={() => setTokenType("meme")}
            />
            Meme
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="tokenType"
              value="standard"
              checked={tokenType === "standard"}
              onChange={() => setTokenType("standard")}
            />
            Standard
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
          Token Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-700"
        />
        {file && (
          <div className="mt-2 text-xs text-gray-500 break-words">
            Selected: {file.name}
          </div>
        )}
      </div>

      {typeof LaunchTokenButton === 'undefined' ? (
        MissingComponentNote
      ) : (
        <LaunchTokenButton
          network={network}
          wallet={anchorWallet}
          connection={connection}
          name={name}
          symbol={symbol}
          file={file as File | undefined}
          tokenType={tokenType}
          buttonTitle={buttonTitle}
          buttonStyle={buttonStyle ?? defaultButtonStyle}
          informationStyle={informationStyle ?? defaultInformationStyle}
          onStart={onStart}
          onError={onError}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
};
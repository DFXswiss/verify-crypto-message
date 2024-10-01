import { useState } from "react";
import "./App.css";

function App() {
  const blockchains = ["Ethereum", "Bitcoin", "Polygon"];
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleVerify = async () => {
    // TODO: Implement the verification logic here
  };

  return (
    <div className="flex flex-col justify-start gap-8 p-8">
      <div className="font-bold text-2xl">Verify signed crypto messages</div>
      <div className="flex flex-wrap gap-2">
        {blockchains.map((blockchain) => (
          <button
            key={blockchain}
            className={`${
              selectedBlockchain === blockchain ? "bg-blue-500" : "bg-slate-700"
            } text-white rounded-full py-1 px-3 border border-slate-400`}
            onClick={() => setSelectedBlockchain(blockchain)}
          >
            {blockchain}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="font-bold">Message</label>
          <textarea
            className="w-full h-24 p-2 border border-slate-400 rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <label className="font-bold">Signature</label>
          <input
            className="w-full p-2 border border-slate-400 rounded-md"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>
        <div>
          <label className="font-bold">Public Key</label>
          <input
            className="w-full p-2 border border-slate-400 rounded-md"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </div>

        <button
          className="bg-slate-700 text-white py-2 px-4 rounded-md"
          onClick={handleVerify}
        >
          Verify
        </button>

        {verificationResult && (
          <div
            className={`mt-4 p-2 rounded-md ${
              verificationResult.includes("valid")
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {verificationResult}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
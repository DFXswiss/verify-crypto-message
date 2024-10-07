import "./App.css";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { InputField } from "./components/InputField";
import { Button } from "./components/Button";

type FormData = {
  address: string;
  message: string;
  signature: string;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const [urlParams, setUrlParams] = useSearchParams();

  useEffect(() => {
    setUrlParams(new URLSearchParams());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setFocus,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      address: urlParams.get("address") || "",
      message: urlParams.get("message") || "",
      signature: urlParams.get("signature") || "",
    },
  });

  watch(() => {
    setError(undefined);
    setVerificationResult(undefined);
  });

  async function onSubmit(data: FormData) {
    setError(undefined);
    setVerificationResult(undefined);

    const { address, message, signature } = data;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://dev.api.dfx.swiss/v1/auth/verifySignature?address=${address}&message=${encodedMessage}&signature=${signature}`;
    try {
      const response = await fetch(url);
      const data_2 = await response.json();
      setVerificationResult(data_2.isValid);
    } catch (error: any) {
      setError(error.toString());
    }
  }

  const handleValidationAndFocus = async () => {
    setIsLoading(true);
    const isValid = await trigger();
    if (!isValid) {
      if (errors.address) {
        setFocus("address");
      } else if (errors.message) {
        setFocus("message");
      } else if (errors.signature) {
        setFocus("signature");
      }
    }

    await handleSubmit(onSubmit)();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-start gap-8 p-2 pt-6 max-w-screen-sm">
      <div>
        <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-200 tracking-tight">
          Verify a signed crypto message
        </div>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-400 leading-snug">
          Enter the address, message, and signature to verify the signature.
        </p>
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <InputField
            id="address"
            label="Address"
            register={register}
            errors={errors}
          />
          <InputField
            id="message"
            label="Message"
            register={register}
            errors={errors}
            isTextArea
          />
          <InputField
            id="signature"
            label="Signature"
            register={register}
            errors={errors}
          />

          {error && (
            <div className="bg-red-200 text-dfxRed-150 p-2 rounded-md">
              {error}
            </div>
          )}
          
          <Button
            label={isLoading ? "VERIFYING..." : "VERIFY"}
            onClick={handleValidationAndFocus}
            disabled={isLoading}
            isLoading={isLoading}
            isGrayedOut={!isValid}
          />

          {verificationResult !== undefined && (
            <div
              className={`mt-2 p-2 rounded-md ${
                verificationResult
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-dfxRed-150"
              }`}
            >
              {verificationResult
                ? "Signature is valid"
                : "Signature is invalid"}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

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
    const encodedMessage = encodeURIComponent(message.trim());
    const url = `https://dev.api.dfx.swiss/v1/auth/verifySignature?address=${address}&message=${encodedMessage}&signature=${signature}`;
    try {
      const response = await fetch(url);
      const data_2 = await response.json();
      setVerificationResult(data_2.isValid);
    } catch (error: any) {
      setError(error.toString());
    }
  };

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
          <div className="relative">
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border ${
                errors.address ? "border-dfxRed-150" : "border-gray-300"
              } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-dfxRed-150 focus:outline-none focus:ring-0 focus:border-dfxRed-150 peer`}
              placeholder=" "
              autoComplete="off"
            />
            <div className="absolute h-0.5 w-12 top-0 left-1.5 bg-white dark:bg-[#242424] transform peer-focus:visible peer-focus:opacity-100 peer-placeholder-shown:opacity-0" />
            <label
              htmlFor="address"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-dfxRed-150 peer-focus:dark:text-dfxRed-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Address
            </label>
            {errors.address && (
              <p className="text-left pl-2.5 pt-1 text-dfxRed-150 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="relative">
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className={`block h-24 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border ${
                errors.message ? "border-dfxRed-150" : "border-gray-300"
              } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-dfxRed-150 focus:outline-none focus:ring-0 focus:border-dfxRed-150 peer`}
              placeholder=" "
              autoComplete="off"
            />
            <div className="absolute h-0.5 w-[52px] top-0 left-1.5 bg-white dark:bg-[#242424] transform peer-focus:visible peer-focus:opacity-100 peer-placeholder-shown:opacity-0" />
            <label
              htmlFor="message"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-dfxRed-150 peer-focus:dark:text-dfxRed-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Message
            </label>
            {errors.message && (
              <p className="text-left pl-2.5 pt-1 text-dfxRed-150 text-sm">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              id="signature"
              {...register("signature", { required: "Signature is required" })}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border ${
                errors.signature ? "border-dfxRed-150" : "border-gray-300"
              } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-dfxRed-150 focus:outline-none focus:ring-0 focus:border-dfxRed-150 peer`}
              placeholder=" "
              autoComplete="off"
            />
            <div className="absolute h-0.5 w-14 top-0 left-1.5 bg-white dark:bg-[#242424] transform peer-focus:visible peer-focus:opacity-100 peer-placeholder-shown:opacity-0" />
            <label
              htmlFor="signature"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-dfxRed-150 peer-focus:dark:text-dfxRed-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Signature
            </label>
            {errors.signature && (
              <p className="text-left pl-2.5 pt-1 text-dfxRed-150 text-sm">
                {errors.signature.message}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-200 text-dfxRed-150 p-2 rounded-md">
              {error}
            </div>
          )}
          <button
            type="button"
            disabled={isLoading}
            className={`justify-center text-white rounded-lg px-5 py-2.5 inline-flex items-center ${isValid && !isLoading ? "bg-dfxRed-150 hover:bg-dfxRed-100 " : "bg-slate-700"}`}
            onClick={handleValidationAndFocus}
          >
            {isLoading && <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-2 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>}
            {!isLoading ? "VERIFY" : "VERIFYING..."}
          </button>

          {verificationResult !== undefined && (
            <div
              className={`mt-4 p-2 rounded-md ${
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

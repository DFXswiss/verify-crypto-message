import { useState } from "react";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  address: string;
  message: string;
  signature: string;
};

function App() {
  const [verificationResult, setVerificationResult] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setFocus,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
  });

  watch(() => {
    setError(undefined);
    setVerificationResult(undefined);
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setError(undefined);
    setVerificationResult(undefined);
    verifySignatureApi({ ...data });
  };

  function verifySignatureApi({ message, signature, address }: FormData) {
    const url = `http://localhost:3000/v1/auth/verifySignature?address=${address}&message=${message}&signature=${signature}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVerificationResult(data.isValid);
      })
      .catch((error) => {
        setError(error.toString());
      });
  }

  const handleValidationAndFocus = async () => {
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

    handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col justify-start gap-8 p-2 pt-6 max-w-screen-sm">
      <div>
        <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-200 tracking-tight">
          Verify signed crypto messages
        </div>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-400 leading-snug">
          Pick a blockchain and enter the message, signature, and public key to
          verify the signature.
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
            />
            <label
              htmlFor="address"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-dfxRed-150 peer-focus:dark:text-dfxRed-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
            />
            <label
              htmlFor="message"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-dfxRed-150 peer-focus:dark:text-dfxRed-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
            />
            <label
              htmlFor="signature"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-dfxRed-150 peer-focus:dark:text-dfxRed-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
            className={`py-2 px-4 rounded-md text-white ${
              isValid ? "bg-dfxRed-150" : "bg-slate-700"
            }`}
            onClick={handleValidationAndFocus}
          >
            Verify
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

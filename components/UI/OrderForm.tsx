import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import DialogModal from "@/components/UI/DialogModal";

const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

type FormValues = {
  name: string;
  email: string;
  link: string;
  message: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isSending, setIsSending] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSending(true);

    const { name, email, link, message } = data;
    const text = `***** Order *****%0A
👤 Name: ${name}%0A
✉️ Email: ${email}%0A
🔗 Link: ${link}%0A
💬 Message: ${message}%0A
    *****************`;

    // send text
    try {
      const textReq = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${text}`
      );
      if (!textReq.ok) {
        setIsSending(false);
        setError("Error occurred!");
        setIsOpenModal(true);
        return;
      }
    } catch (e) {
      // console.log(e.message);
      setIsSending(false);
      setError("Error occurred!");
      setIsOpenModal(true);
    }

    // all done!
    setIsSending(false);
    reset();
    setError("");
    setIsOpenModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
          <h2 className="sm:col-span-2 text-2xl font-extrabold mb-1 flex items-center">
            <FormattedMessage id="app.hero.form.title" />
            {/* <div className="h-px flex-auto bg-black ml-4 dark:bg-white" /> */}
          </h2>
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6"
            >
              <FormattedMessage id="app.hero.form.label.name" />{" "}
              <span className="text-rose-600">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                autoComplete="given-name"
                {...register("name", { required: true })}
                disabled={isSending}
                className={`block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset  ${
                  errors.name ? "ring-rose-700" : "ring-neutral-700"
                }  placeholder:text-gray-400  text-black focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white`}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6"
            >
              <FormattedMessage id="app.hero.form.label.email" />{" "}
              <span className="text-rose-600">*</span>
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                autoComplete="email"
                {...register("email", { required: true })}
                disabled={isSending}
                className={`block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset  ${
                  errors.email ? "ring-rose-700" : "ring-neutral-700"
                }  placeholder:text-gray-400  text-black focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white`}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="link"
              className="block text-sm font-semibold leading-6"
            >
              <FormattedMessage id="app.hero.form.label.link" />
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="link"
                {...register("link", { required: false })}
                disabled={isSending}
                className={`block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset  ${
                  errors.link ? "ring-rose-700" : "ring-neutral-700"
                }  placeholder:text-gray-400  text-black focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white`}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6"
            >
              <FormattedMessage id="app.hero.form.label.message" />
              <span className="text-rose-600">*</span>
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                rows={5}
                {...register("message", { required: true })}
                disabled={isSending}
                className={`block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset  ${
                  errors.message ? "ring-rose-700" : "ring-neutral-700"
                }  placeholder:text-gray-400  text-black focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white`}
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="block w-full rounded-md bg-rose-600 px-3.5 py-2.5 text-center font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            disabled={isSending}
          >
            {isSending ? (
              <div className="flex items-center">
                &nbsp;
                <svg
                  className="animate-spin mx-auto h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                &nbsp;
              </div>
            ) : (
              <FormattedMessage id="app.hero.form.label.button" />
            )}
          </button>
        </div>
      </form>

      <DialogModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        title={
          error
            ? "app.hero.form.dialog.title_error"
            : "app.hero.form.dialog.title"
        }
        text={
          error
            ? "app.hero.form.dialog.text_error"
            : "app.hero.form.dialog.text"
        }
        buttonLabel="app.hero.form.dialog.buttonLabel"
      />
    </>
  );
}

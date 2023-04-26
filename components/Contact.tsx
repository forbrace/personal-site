import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import DialogModal from "@/components/UI/DialogModal";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";

type FormValues = {
  email: string;
  message: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Contact() {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSending(true);

    const req = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!req.ok) {
      setIsSending(false);
      setIsSubmitted(true);
      throw new Error("Error!");
    }

    const res = await req.json();

    setIsSending(false);
    setIsSubmitted(true);
    reset();
    setIsOpenModal(true);
  };

  const [showEmail, setShowEmail] = useState(false);

  const showEmailandler = () => {
    setShowEmail(true);
    setTimeout(() => {
      setShowEmail(false);
    }, 3000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="md:grid grid-cols-1 md:grid-cols-12 gap-8 pb-10"
      >
        <div className="col-span-7">
          <h1 className=" text-rose-600 text-[36px] mt-4 md:mt-0 lg:mt-10 md:text-[40px] lg:text-[55px] xl:text-[67px] leading-[110%] text-left font-black">
            <FormattedMessage id="app.contact.title" />
          </h1>
          <p className="mt-7 mb-2 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-[600px]">
            <FormattedMessage id="app.contact.text" />
          </p>
          <div className="grid grid-cols-1 gap-4 mt-7 mb-10 md:mb-0">
            <div className="flex flex-wrap items-center -m-2">
              <a
                href="http://github.com/forbrace"
                target="_blank"
                className="flex items-center m-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="currentColor"
                  className="h-6 w-6 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
                  ></path>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/paputsa/"
                target="_blank"
                className="flex items-center m-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path d="M36.5,6h-25C8.468,6,6,8.468,6,11.5v25c0,3.032,2.468,5.5,5.5,5.5h25c3.032,0,5.5-2.468,5.5-5.5v-25	C42,8.468,39.532,6,36.5,6z M18,34c0,0.553-0.447,1-1,1h-3c-0.553,0-1-0.447-1-1V21c0-0.553,0.447-1,1-1h3c0.553,0,1,0.447,1,1V34z M15.5,18c-1.381,0-2.5-1.119-2.5-2.5c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5C18,16.881,16.881,18,15.5,18z M35,34	c0,0.553-0.447,1-1,1h-3c-0.553,0-1-0.447-1-1v-7.5c0-1.379-1.121-2.5-2.5-2.5S25,25.121,25,26.5V34c0,0.553-0.447,1-1,1h-3	c-0.553,0-1-0.447-1-1V21c0-0.553,0.447-1,1-1h3c0.553,0,1,0.447,1,1v0.541C26.063,20.586,27.462,20,29,20c3.309,0,6,2.691,6,6V34z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:dmitriy.paputsa@gmail.com"
                className="flex items-center m-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                dmitriy.paputsa@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="sm:col-span-2 text-2xl font-extrabold mb-6 flex items-center">
              <FormattedMessage id="app.contact.form.title" />
              {/* <div className="h-px flex-auto bg-black ml-4 dark:bg-white" /> */}
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400"
                >
                  <FormattedMessage id="app.contact.form.label.email" />{" "}
                  <span className="text-rose-600">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    id="contactEmail"
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
                  htmlFor="contactMessage"
                  className="block text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400"
                >
                  <FormattedMessage id="app.contact.form.label.message" />{" "}
                  <span className="text-rose-600">*</span>
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="contactMessage"
                    rows={8}
                    disabled={isSending}
                    {...register("message", { required: true })}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset  ${
                      errors.message ? "ring-rose-700" : "ring-neutral-700"
                    }  placeholder:text-gray-400  text-black focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-white`}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                disabled={isSending}
                className="block w-full rounded-md bg-rose-600 px-3.5 py-2.5 text-center font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
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
                  <FormattedMessage id="app.contact.form.label.button" />
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      <DialogModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        title="app.hero.form.dialog.title"
        text="app.hero.form.dialog.text"
        buttonLabel="app.hero.form.dialog.buttonLabel"
      />
    </>
  );
}

export default Contact;

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

import fundraiseupImage from "@/images/fundraiseup.png";
import pairityImage from "@/images/pairity.png";
import savioImage from "@/images/savio.png";
import dreamlootImage from "@/images/dreamloot.png";
import followbackImage from "@/images/followback.png";
import boomerangImage from "@/images/boomerang.png";
import campusonfireImage from "@/images/campusonfire.png";
import simplenightImage from "@/images/simplenight.png";

type FormValues = {
  email: string;
  message: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const works = [
  {
    id: 1,
    image: fundraiseupImage,
    url: "https://fundraiseup.com",
    name: "Fundraise Up",
    description: "app.work.1.description",
    years: "2017-2023",
  },
  {
    id: 2,
    image: pairityImage,
    url: "",
    name: "Pairity",
    description: "app.work.2.description",
    years: "2018",
  },
  {
    id: 3,
    image: savioImage,
    url: "",
    name: "Savio",
    description: "app.work.3.description",
    years: "2017",
  },
  {
    id: 4,
    image: dreamlootImage,
    url: "",
    name: "Dream Loot",
    description: "app.work.4.description",
    years: "2017",
  },
  {
    id: 5,
    image: followbackImage,
    url: "",
    name: "Followback",
    description: "app.work.5.description",
    years: "2016",
  },
  {
    id: 6,
    image: boomerangImage,
    url: "",
    name: "Boomerang",
    description: "app.work.6.description",
    years: "2016",
  },
  {
    id: 7,
    image: campusonfireImage,
    url: "https://campusonfire.com",
    name: "Campusonfire",
    description: "app.work.7.description",
    years: "2015-2017",
  },
  {
    id: 8,
    image: simplenightImage,
    url: "https://simplenight.com",
    name: "Simplenight",
    description: "app.work.8.description",
    years: "2014-2015",
  },
];

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
        className="pb-10"
      >
        <h1 className="text-rose-600 text-[36px] mt-4 md:mt-0 lg:mt-10 md:text-[40px] lg:text-[55px] xl:text-[67px] leading-[110%] text-left font-black">
        <FormattedMessage id="app.work.title" />
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {works.map((work) => (
            <div key={work.id}>
              {work.url ? (
                <a
                  href={work.url}
                  className="underline hover:text-rose-600"
                  target="_blank"
                >
                  <Image
                    src={work.image}
                    width={1200}
                    height={750}
                    alt={work.name}
                    className="border-2 shadow-sm rounded-xl"
                  />
                </a>
              ) : (
                <Image
                  src={work.image}
                  width={1200}
                  height={750}
                  alt={work.name}
                  className="border-2 shadow-sm rounded-xl"
                />
              )}

              <div className="mt-4 font-semibold text-1xl flex justify-between items-center">
                {work.url ? (
                  <a
                    href={work.url}
                    className="underline hover:text-rose-600"
                    target="_blank"
                  >
                    {work.name}
                  </a>
                ) : (
                  <>{work.name}</>
                )}
                <div className="mt-2 font-semibold text-sm text-zinc-500">
                  {work.years}
                </div>
              </div>
              <div className="mt-2"><FormattedMessage id={work.description} /></div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default Contact;

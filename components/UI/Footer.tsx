import React, { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState<number>();
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    setYear(year);
  }, []);

  const showEmailandler = () => {
    setShowEmail(true);
    setTimeout(() => {
      setShowEmail(false);
    }, 3000);
  };

  return (
    <div>
      {/* <div className="h-px flex-auto bg-zinc-200 dark:bg-zinc-800" /> */}
      <div className="container mx-auto px-6 flex items-center justify-between py-5 text-sm font-bold">
        <div className="flex items-center">
          Powered by&nbsp;
          <a
            href="https://nextjs.org"
            className="underline decoration-solid hover:text-rose-600"
            target="_blank"
          >
            Next.js
          </a>
          , Hosted on&nbsp; 
          <a
            href="https://vercel.com"
            className="underline decoration-solid hover:text-rose-600"
            target="_blank"
          >
            Vercel
          </a>
          
        </div>
        <div>
          <span className="text-rose-600">&copy;</span> 2007-{year}
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import Script from "next/script";

const GTag = () => {
  return (
    <>
      <Script
        id="tagmanager-main"
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}}`}
      ></Script>
      <Script
        id="tagmanager-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', ${process.env.GTAG});
          `,
        }}
      />
    </>
  );
};

export default GTag;

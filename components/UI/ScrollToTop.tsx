import React, { useEffect, useState } from "react";

const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

const ScrollToTopButton = ({ scrollTop = 100 }) => {
  const [visibleScrollToTop, setVisibleScrollToTop] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > scrollTop) {
      setVisibleScrollToTop(true);
    } else if (scrolled <= scrollTop) {
      setVisibleScrollToTop(false);
    }
  };

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener("scroll", toggleVisible);
    }
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);
  return (
    <>
      {visibleScrollToTop && (
        <a
          href="#page"
          className="fixed bottom-12 right-0 cursor-pointer z-50 m-6 rounded-full"
        >
          <svg
            className="block"
            viewBox="0 0 24 24"
            width="44"
            height="44"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="16 12 12 8 8 12" />
            <line x1="12" y1="16" x2="12" y2="8" />
          </svg>
        </a>
      )}
    </>
  );
};

export default ScrollToTopButton;

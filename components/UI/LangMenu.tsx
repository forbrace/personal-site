import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { Locale, useLocale } from "@/hooks/useLocale";

const LangMenu: React.FC<{ className?: string; isAbbr?: boolean }> = ({
  className,
  isAbbr,
}) => {
  const { switchLocale, locale, langs } = useLocale();

  const selectedLang = langs.find((lang) => lang.locale === locale) || langs[0];

  const selectHandler = (locale: string): void => {
    switchLocale(locale as Locale);
  };

  useEffect(() => {
    const currentLocale = localStorage.getItem("currentLocale");
    switchLocale((currentLocale ? currentLocale : locale) as Locale);
  }, []);

  return (
    <Menu as="div" className={`${className} relative z-10 text-left`}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center hover:text-rose-600 font-bold">
          {isAbbr ? selectedLang.abbr : selectedLang.label}
          <ChevronDownIcon
            className="ml-1 -mr-1 h-4 w-4 text-rose-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -left-9 mt-2 w-36 origin-top-center divide-y divide-gray-100 rounded-md bg-white dark:bg-zinc-900 dark:border dark:border-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {langs.map((lang) => (
              <Menu.Item key={lang.locale}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      selectHandler(lang.locale);
                    }}
                    className={`${
                      active ? " text-rose-600" : "text-gray-500"
                    } ${
                      selectedLang.label === lang.label &&
                      "text-rose-600 pointer-events-none"
                    }  px-2 flex items-center w-full py-2 text-sm text-left rounded-md`}
                  >
                    <CheckIcon
                      className={`w-4 h-4 mr-2 ${
                        selectedLang.label !== lang.label && "opacity-0"
                      }`}
                    />
                    {lang.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LangMenu;

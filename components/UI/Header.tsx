import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import LangMenu from "./LangMenu";
import ToggleTheme from "./ToggleTheme";
import Menu from "./Menu";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { useRouter } from "next/router";

const menuItems = [
  {
    path: "/",
    key: "home",
  },
  {
    path: "/work",
    key: "work",
  },
  {
    path: "/contact",
    key: "contact",
  },
];

const Header = () => {
  const [lang, setLang] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <div className="container mx-auto px-6">
      <nav
        className="flex justify-between items-center py-[20px] md:py-[42px] w-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          {isHomePage ? (
            <div className="text text-2xl md:text-3xl font-black">
              Dima Paputsa
              <div className="text-xs font-semibold uppercase">
                Front-end engineer
              </div>
            </div>
          ) : (
            <Link href="/" className="text text-2xl md:text-3xl font-black">
              Dima Paputsa
              <div className="text-xs font-semibold uppercase">
                Front-end engineer
              </div>
            </Link>
          )}
        </div>
        <div className="flex items-center lg:hidden">
          <LangMenu className="mx-4" isAbbr />
          <ToggleTheme className="mr-4" />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Menu items={menuItems} />
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LangMenu isAbbr />
          <ToggleTheme className="ml-4" />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 font-bold">
              Dima Paputsa
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-6 w-6 dark:text-white"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems.map((item) => (
                  <ActiveLink
                    href={item.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-zinc-800"
                    activeClassName="text-rose-600 dark:text-rose-600"
                    onClick={() => setMobileMenuOpen(false)}
                    key={item.key}
                  >
                    <FormattedMessage id={`app.menu.${item.key}`} />
                  </ActiveLink>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Header;

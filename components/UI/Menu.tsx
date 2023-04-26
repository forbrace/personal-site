import React from "react";
import { FormattedMessage } from "react-intl";
import ActiveLink from "./ActiveLink";

const Menu: React.FC<{ items: { path: string; key: string }[] }> = ({
  items,
}) => {
  return (
    <div className="flex">
      {items.map((item) => (
        <ActiveLink
          href={item.path}
          key={item.key}
          className="mx-4 hover:text-rose-600 font-bold uppercase text-lg"
          activeClassName="text-rose-600"
        >
          <FormattedMessage id={`app.menu.${item.key}`} />
        </ActiveLink>
      ))}
    </div>
  );
};

export default Menu;

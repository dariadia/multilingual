import { useContext } from "react";
import { useRouter } from "next/router";

import { Navigation } from "../Navigation";
import { Logo } from "../Logo";

import { LanguageContext, locales } from "../../intl/LanguageProvider";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<Props> = ({ className, children }) => {
  const headerClass = className || "header";
  const [locale, setLocale] = useContext(LanguageContext);
  const router = useRouter();

  const handleLocaleChange = (language: string) => {
    const regex = new RegExp(`^/(${locales.join("|")})`);
    setLocale(language);

    router.push(router.pathname, router.asPath.replace(regex, `/${language}`));
  }

  return (
    <header className={headerClass}>
      <Logo link={`/`} />
      <Navigation />
      {children}
      <div className="language">
        <button onClick={() => handleLocaleChange("en")}>EN</button>
        <button onClick={() => handleLocaleChange("de")}>DE</button>
      </div>
    </header>
  );
};

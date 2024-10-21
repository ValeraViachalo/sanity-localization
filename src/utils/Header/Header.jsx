import Link from "next/link";
import { Logo } from "../Logo/Logo";
import s from "./Header.module.scss";
import { useContext } from "react";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { usePathname } from "next/navigation";
import { LocaleContext } from "@/lib/providers/LocaleProvider/LocaleProvider";

const Header = () => {
  const { lang } = useContext(LocaleContext);
  const pathname = usePathname();

  const switchToUkrainian = () => {
    // Prepend "/ua" to the current path if it's not already there
    return `/ua${pathname.startsWith("/ua") ? pathname.replace("/ua", "") : pathname}`;
  };

  const switchToEnglish = () => {
    // Remove "/ua" from the beginning of the path if it exists
    if (pathname === "/ua") {
      return "/";
    } else if (pathname.startsWith("/ua/")) {
      return pathname.replace("/ua/", "/");
    } else {
      return pathname; // Return the pathname unchanged if it's already in English
    }
  };

  return (
    <header className={s.header}>
      <Logo className={s.header__logo} />

      <div className={s.header__wrapper}>
        <Link href={switchToEnglish()}>En</Link>
        <Link href={switchToUkrainian()}>Ua</Link>
        <ul className={s.header__list_links}>
          <li>
            <Link className={s.header__link} href={lang === "ua" ? "/ua" : "/"}>
              <span>Home</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

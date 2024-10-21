"use client"
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const LocaleContext = createContext(() => {});

export default function LocaleProvider({ children }) {
  const [lang, setLang] = useState();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/ua")) setLang("ua");
    else setLang("en");
  }, [pathname]);

  return (
    <LocaleContext.Provider value={{ lang }}>
      {children}
    </LocaleContext.Provider>
  )
}

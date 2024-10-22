import React, { useContext, useEffect } from "react";
import { PageLayout } from "@/utils/PageLayout/PageLayout";

import s from "./HomePage.module.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import Link from "next/link";
import Image from "next/image";
import { LocaleContext } from "@/lib/providers/LocaleProvider/LocaleProvider";

const HomePage = () => {
  const { data } = useContext(DataContext);
  const { mainPage } = data;

  const { lang } = useContext(LocaleContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <PageLayout className={s.home}>
      <div className={s.home_post_list}>
        {mainPage.map((currPost, i) => (
          <Link href={`${lang === "ua" ? "ua" : ""}/post/${currPost.slug}`} key={i} className={s.post_card}>
            <Image
              width={400}
              height={400}
              className={s.post_card__image}
              src={currPost.mainImage}
            />
            <h2>{currPost.title}</h2>
          </Link>
        ))}
      </div>
    </PageLayout>
    </>
  );
}

export default HomePage
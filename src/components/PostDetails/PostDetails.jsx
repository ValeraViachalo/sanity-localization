import { DataContext } from "@/lib/providers/DataProvider/context";
import { PageLayout } from "@/utils/PageLayout/PageLayout";
import SanityBlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import { useContext } from "react";

import s from "./PostDetails.module.scss";

const PostDetails = () => {
  const { data } = useContext(DataContext);
  const { post } = data;

  return (
    <PageLayout className={s.post}>
      <div className={s.post_hero}>
        <Image src={post.mainImage} fill />
        <div className={s.bottom}>
          <h1>{post.title}</h1>
          <h2>{post.author.name}</h2>
        </div>
      </div>
      <div className={s.body}>
        <SanityBlockContent
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          blocks={post.body}
        />
      </div>
    </PageLayout>
  );
};

export default PostDetails;

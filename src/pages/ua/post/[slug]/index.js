import HomePage from "@/components/HomePage/HomePage";
import PostDetails from "@/components/PostDetails/PostDetails";
import { PAR_LANG_UA_ADD, URL_HOME, URL_POST } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";
import { usePathname } from "next/navigation";

const Post = ({ data, slug }) => {
  return (
    <>
      <PageHead data={data.post.seo} />
      <DataProvider url={URL_POST + slug + PAR_LANG_UA_ADD}>
        <PostDetails />
      </DataProvider>
    </>
  );
};

export default Post;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await fetch(
      `${URL_POST + slug + PAR_LANG_UA_ADD}`,
      {
        cache: "no-cache",
        revalidate: 100,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return { props: { data, slug } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}

import HomePage from "@/components/HomePage/HomePage";
import PostDetails from "@/components/PostDetails/PostDetails";
import { PAR_LANG_UA_ADD, URL_POST } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";
import { usePathname } from "next/navigation";

const Post = ({ data }) => {
  const pathname = usePathname();


  return (
    <>
      {/* <PageHead data={data} /> */}
      <DataProvider url={URL_POST + pathname.split("/post/")[1] + PAR_LANG_UA_ADD}>
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPostData?slug=${slug + PAR_LANG_UA_ADD}`,
      {
        cache: "no-cache",
        revalidate: 100,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}

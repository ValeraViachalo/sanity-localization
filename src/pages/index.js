import HomePage from "@/components/HomePage/HomePage";
import { URL_HOME, URL_SEO_BASE } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";

const Home = ({ data }) => {
  return (
    <>
      <PageHead data={data.seo} />
      <DataProvider url={URL_HOME}>
        <HomePage />
      </DataProvider>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const response = await fetch(
      URL_SEO_BASE,
      {
        cache: "no-cache",
        revalidate: 100
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log("DATA ===>", data)

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}

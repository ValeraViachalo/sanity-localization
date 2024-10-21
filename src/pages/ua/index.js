import HomePage from "@/components/HomePage/HomePage";
import { URL_HOME_UA } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { PageHead } from "@/utils/PageHead/PageHead";

const Home = ({ data }) => {
  return (
    <>
      {/* <PageHead data={data} /> */}
      <DataProvider url={URL_HOME_UA}>
        <HomePage />
      </DataProvider>
    </>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   try {
//     const response = await fetch(URL_HOME_UA);
//     const data = await response.json();
//     return { props: { data } };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

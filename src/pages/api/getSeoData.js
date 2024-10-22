import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";

const query = groq`
    *[_type == "defaultSeo"][0] {
        "metaTitle": seo.metaTitle[$language],
        "metaDescription": seo.metaDescription[$language],
        "openGraphImage":seo.openGraphImage.asset -> url,
    }
`;

export default async function handler(req, res) {
  const { language } = req.query;

  try {
    console.log(`Attempting to fetch data from Sanity`);
    const seo = await sanityClient.fetch(query, {language: language || "en" });

    if (!seo) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ seo });
  } catch (error) {
    console.error(`Error fetching data from Sanity:`, error);
    res.status(500).json({
      message: error.message,
    });
  }
}

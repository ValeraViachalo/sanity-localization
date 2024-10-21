import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";

const query = groq`
    *[_type == "post" && status == "published"] | order(title[$language] asc) {
  "title": title[$language],
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  "author": author->{
    "name": name[$language]
  },
}
`;


export default async function handler(req, res) {
  const { language } = req.query;

  let mainPage

  try {
    console.log(`Attempting to fetch data from Sanity for slug: ${language}`);
    mainPage = await sanityClient.fetch(query, { language: language || "en" });

    if (!mainPage) {
      console.log(`No data received from Sanity for slug: ${language}`);
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ mainPage });
  } catch (error) {
    console.error(`Error fetching data from Sanity for slug ${language}:`, error);
    res.status(500).json({
      message: error.message,
    });
  }
}


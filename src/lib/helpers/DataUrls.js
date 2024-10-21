const URL_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`
export const PAR_LANG_UA = "?language=ua"
export const PAR_LANG_UA_ADD = "&language=ua"

export const URL_HEADER = URL_BASE + "/header.json"
export const URL_HOME = URL_BASE + "getMainPageData"
export const URL_HOME_UA = URL_BASE + "getMainPageData" + PAR_LANG_UA
export const URL_POST = URL_BASE + "getPostData?slug="
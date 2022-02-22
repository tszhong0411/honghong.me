import Umami from "./Umami";
import siteMetadata from "@/data/siteMetadata";

const isProduction = process.env.NODE_ENV === "production";

const Analytics = () => {
  return <>{isProduction && siteMetadata.analytics.umamiWebsiteId && <Umami />}</>;
};

export default Analytics;

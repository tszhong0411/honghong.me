import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import MetricCard from "components/metrics/Card";
import { Views } from "@/lib/types";

export default function BlogTotalViews() {
  const { data } = useSWR<Views>("/api/views", fetcher);

  const pageViews = new Number(data?.total);
  const link = "https://honghong.me";

  return <MetricCard header="Blog Total Views" link={link} metric={pageViews} isCurrency={false} />;
}

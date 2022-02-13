import useSWR from "swr";

import fetcher from "lib/fetcher";
import MetricCard from "components/metrics/Card";

export default function BlogTotalViews() {
    const { data } = useSWR("/api/views", fetcher);
    const pageViews = new Number(data?.total);
    const link = "https://honghong.me";

    return (
        <MetricCard
            header="Blog Total Views"
            link={link}
            metric={pageViews}
            isCurrency={false}
        />
    );
}

import React from 'react';

import Link from '@/components/Link';
import MetricsContentLoader from '@/components/Metrics/MetricsContentLoader';

export default function MetricCard({ header, link, metric, isCurrency }) {
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className='stats shadow'>
      <div className='stat gap-2 dark:text-primary-content'>
        <Link aria-label={header} href={link} className='stat-title'>
          {header}
        </Link>
        <div className='stat-value'>
          {metric > 0 && isCurrency && '$'}
          {metric > 0 ? metric.toLocaleString() : <MetricsContentLoader />}
        </div>
      </div>
    </div>
  );
}

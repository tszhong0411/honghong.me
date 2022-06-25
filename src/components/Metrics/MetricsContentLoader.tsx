import { useTheme } from 'next-themes';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function MetricsContentLoader() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <SkeletonTheme
      baseColor={
        theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'
      }
      highlightColor={
        theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'
      }
    >
      <Skeleton width={200} height={36} />
    </SkeletonTheme>
  );
}

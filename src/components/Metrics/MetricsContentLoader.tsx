import { useMantineColorScheme } from '@mantine/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function MetricsContentLoader() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <SkeletonTheme
      baseColor={dark ? '#202020' : '#d9d9d9'}
      highlightColor={dark ? '#444444' : '#ecebeb'}
    >
      <Skeleton width={200} height={36} />
    </SkeletonTheme>
  );
}

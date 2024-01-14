import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)

// eslint-disable-next-line unicorn/prefer-export-from
export default dayjs

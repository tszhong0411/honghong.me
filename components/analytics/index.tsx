/* eslint-disable @typescript-eslint/no-explicit-any */
import Umami from './Umami'
import siteMetadata from '@/data/siteMetadata'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (...args: any[]) => void
    sa_event?: (...args: any[]) => void
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return <>{isProduction && siteMetadata.analytics.umamiWebsiteId && <Umami />}</>
}

export default Analytics

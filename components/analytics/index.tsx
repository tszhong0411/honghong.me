import Umami from './Umami'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return <>{isProduction && <Umami />}</>
}

export default Analytics

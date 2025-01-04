import { Monitoring } from 'react-scan/monitoring/next'

type ReactScanProps = {
  apiKey: string
}

const ReactScan = (props: ReactScanProps) => {
  const { apiKey } = props

  return <Monitoring apiKey={apiKey} url='https://monitoring.react-scan.com/api/v1/ingest' />
}

export default ReactScan

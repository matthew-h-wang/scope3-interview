import useSWR from 'swr'

export default function Display({params}) {
    async function fetchCreative() {
        const body = {
            format: 'banner',
            payloadSize: 150000,
            impressions: 3821,
            country: 'US',
            date: '2023-03-01',
            network: 'fixed',
            deviceType: 'tv',
            ...params
          }
        body.payloadSize = Number(body.payloadSize || 0);

        const options = {
          method: 'POST',
          headers: { accept: 'application/json', 'content-type': 'application/json' },
          body: JSON.stringify(body)
        };
        return fetch('http://localhost:8010/proxy/v1/creative', options)
        .then(response => response.json())
      }

    const { data : creativeData, error, isLoading } = useSWR('/api/' + JSON.stringify(params), fetchCreative)

      if (error)
        return <div className="Display"> {JSON.stringify(error)} </div>
      if (isLoading)
        return <div className="Display"> Loading... </div>
      if (!creativeData)
        return <div className="Display"> No Data! </div>
      return (
        <div className="Display">
            <p>
            Consumer Device: {creativeData.consumerDeviceEmissions}
            </p>
            <p>
            Creative Consumer Device: {creativeData.creativeConsumerDeviceEmissions}
            </p>
            <p>
            Creative Distribution: {creativeData.creativeDistributionEmissions}
            </p>
            <p>
            Data Transfer: {creativeData.dataTransferEmissions}
            </p>
            <p>
            Total: {creativeData.totalEmissions}
            </p>
        </div>
      )

}

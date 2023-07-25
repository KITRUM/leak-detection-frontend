import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnomalyDetection, Response, TimeSeriesData } from '@/types'
import { Line } from 'react-chartjs-2'

const AnomalyDeviationColorMapping = {
    CRITICAL: 'red',
    WARNING: 'yellow',
    OK: 'green',
}

const Sensor = () => {
  const { sensorId } = useParams<{ sensorId: string }>()
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [anomalyDetections, setAnomalyDetections] = useState<
    AnomalyDetection[]
  >([])

  const hostUrl = 'ws://localhost:8000'
  const timeSeriesDataWebsocketUrl = `/sensors/${sensorId}/time-series-data`
  const anomalyDetectionsWebsocketUrl = `/sensors/${sensorId}/anomaly-detections`

  // The basic chart data layout
  let chartData = {
    labels: timeSeriesData.map((tsd) => {
      const asDate = new Date(tsd.timestamp)
      return `${asDate.getFullYear()}-${asDate.getMonth()}-${asDate.getDate()}  ${asDate.getHours()}:${asDate.getMinutes()}`
    }) as string[],
    datasets: [
      {
        label: 'Anomaly detections',
        data: anomalyDetections.map((data) => data.timeSeriesData.ppmv),
        backgroundColor: anomalyDetections.map((element: AnomalyDetection) => {
          // NOTE: Might be a good idea using enums
          let result: string =
            AnomalyDeviationColorMapping[element.value.toUpperCase()]

          console.log(result)
          return result
        }),
        // backgroundColor: ['red', 'green'],
        borderColor: 'gray',
        borderWidth: 0.5,
      },
      {
        label: 'Time series data',
        data: timeSeriesData.map((data) => data.ppmv),
        backgroundColor: ['#e1e1e1'], // The bubble should be in neutral color
        borderColor: 'gray',
        borderWidth: 0.5,
      },
    ],
  }

  useEffect(() => {
    // Establish WebSocket connection
    const socketTimeSeriesData = new WebSocket(
      `${hostUrl}${timeSeriesDataWebsocketUrl}`
    )

    const socketAnomalyDetections = new WebSocket(
      `${hostUrl}${anomalyDetectionsWebsocketUrl}`
    )

    // Handle time series data messages, received from the WebSocket
    socketTimeSeriesData.onmessage = (event) => {
      const response: Response<TimeSeriesData> = JSON.parse(event.data)

      if (Array.isArray(response.result)) {
        const tsdArray = response.result as TimeSeriesData[]
        setTimeSeriesData(tsdArray)
      } else {
        const tsd = response.result as TimeSeriesData
        setTimeSeriesData((prevData) => [...prevData, tsd])
      }
    }

    // Handle anomaly detection messages, received from the WebSocket
    socketAnomalyDetections.onmessage = (event) => {
      const response: Response<AnomalyDetection> = JSON.parse(event.data)

      if (Array.isArray(response.result)) {
        const result = response.result as AnomalyDetection[]
        setAnomalyDetections(result)
      } else {
        const result = response.result as AnomalyDetection
        setAnomalyDetections((prevData) => [...prevData, result])
      }
    }

    // Clean up the WebSocket connection on component unmount
    return () => {
      socketTimeSeriesData.close()
      socketAnomalyDetections.close()
    }
  }, [])

  return (
    <div>
      <h1 className="text-lg">Sensor: {sensorId}</h1>
      <Line data={chartData} />
    </div>
  )
}

export default Sensor;

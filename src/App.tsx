import { Route, Routes } from 'react-router-dom'
import Navbar from '@/scenes/navbar'
import Dashboard from '@/scenes/dashboard'
import StatusBar from '@/scenes/statusBar'
import About from '@/scenes/about'
import Templates from '@/scenes/templates'
import Platforms from '@/scenes/platforms'
import Sensors from '@/scenes/sensors'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import Sensor from '@/components/Sensor/Sensor'
import CreateTemplate from '@/scenes/CreateTemplate'

// Required by chart.js
Chart.register(CategoryScale)

export default function App() {
  const cardStyles =
    'shadow-lg overflow-hidden p-2 bg-gradient-to-r from-[#e6e9f0] to-[#eef1f5]'

  return (
    <div className="grid min-h-screen grid-cols-[12em_auto] grid-rows-[1fr_50px] gap-[1em] p-[1em]">
      <div className={`${cardStyles} row-span-2 rounded-[1em]`}>
        <Navbar />
      </div>
      <div className={`${cardStyles} rounded-[1em] bg-yellow-100`}>
        <Routes>
          <Route element={<Dashboard />} path="/" index={true} />
          <Route element={<Platforms />} path="/platforms" />
          <Route element={<Templates />} path="/platforms/:platformId" />
          <Route element={<Sensors />} path="/templates/:templateId" />
          <Route element={<Sensor />} path="/sensors/:sensorId" />
          <Route element={<About />} path="/about" />
          <Route
            element={<CreateTemplate />}
            path="platforms/:platformId/create-template"
          />
        </Routes>
      </div>
      <div className={`${cardStyles} rounded-[0.5em] bg-blue-100`}>
        <StatusBar />
      </div>
    </div>
  )
}

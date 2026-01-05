import './App.css'
import WeatherApp from './WeatherApp'
import AirQuality from './AirQuality'


function App() {

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <WeatherApp />
      <AirQuality />
    </div>
  )
}

export default App

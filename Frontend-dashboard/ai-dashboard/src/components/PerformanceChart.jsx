import './PerformanceChart.css'

// Simple SVG line chart - no external library needed
const data = [22, 30, 38, 42, 50, 55, 60, 68, 75]

function getPoints(dataArr, width, height, padding) {
  const max = 100
  const min = 0
  return dataArr.map((val, i) => {
    const x = padding + (i / (dataArr.length - 1)) * (width - padding * 2)
    const y = height - padding - ((val - min) / (max - min)) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')
}

const techData   = [22, 28, 35, 40, 48, 52, 58, 65, 72]
const confData   = [22, 32, 40, 45, 55, 60, 65, 72, 79]
const hrData     = [22, 30, 38, 44, 52, 58, 63, 70, 76]

const W = 500
const H = 180
const P = 30

function PerformanceChart() {
  return (
    <div className="perf-card">
      <h3 className="perf-title">Performance Overview</h3>

      <svg viewBox={`0 0 ${W} ${H}`} className="perf-svg">
        {/* Grid lines */}
        {[25, 50, 75].map((val) => {
          const y = H - P - ((val - 0) / 100) * (H - P * 2)
          return (
            <g key={val}>
              <line x1={P} y1={y} x2={W - P} y2={y} stroke="#e8edf5" strokeWidth="1" />
              <text x={P - 4} y={y + 4} textAnchor="end" fontSize="10" fill="#aaa">{val}</text>
            </g>
          )
        })}

        {/* Tech Score line */}
        <polyline
          points={getPoints(techData, W, H, P)}
          fill="none"
          stroke="#2e7df7"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Confidence Score line */}
        <polyline
          points={getPoints(confData, W, H, P)}
          fill="none"
          stroke="#1ec99b"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* HR Score line */}
        <polyline
          points={getPoints(hrData, W, H, P)}
          fill="none"
          stroke="#7dd3c8"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Dots on Tech */}
        {getPoints(techData, W, H, P).split(' ').map((pt, i) => {
          const [x, y] = pt.split(',')
          return <circle key={i} cx={x} cy={y} r="4" fill="#2e7df7" />
        })}
      </svg>

      {/* Legend */}
      <div className="perf-legend">
        <span className="legend-dot" style={{ background: '#2e7df7' }}></span> Technical Score
        <span className="legend-dot" style={{ background: '#1ec99b', marginLeft: 16 }}></span> Confidence Score
        <span className="legend-dot" style={{ background: '#7dd3c8', marginLeft: 16 }}></span> HR Score
      </div>
    </div>
  )
}

export default PerformanceChart

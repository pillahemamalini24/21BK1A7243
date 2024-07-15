import React, { useState } from 'react'
import axios from 'axios'

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState('')
  const [average, setAverage] = useState(null)
  const [error, setError] = useState('')

  const calculateAverage = async () => {
    try {
      const numArray = numbers.split(',').map(Number)
      const response = await axios.post('http://127.0.0.1:5000/calculate_average', {
        numbers: numArray
      })
      setAverage(response.data.average)
      setError('')
    } catch (err) {
      setError('Failed to calculate average. Please check your input.')
      setAverage(null)
    }
  }

  return (
    <div className="card">
      <h2>Average Calculator</h2>
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
      />
      <button onClick={calculateAverage}>Calculate Average</button>
      {average !== null && (
        <p>The average is: {average}</p>
      )}
      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
    </div>
  )
}

export default AverageCalculator

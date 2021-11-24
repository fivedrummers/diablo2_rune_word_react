import React, { useEffect, useState } from 'react'

let nextId = 0
export default function Rune () {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [selectors, setSelectors] = useState([nextId])

  function handleChange (event) {
    const value = event.target.value
    if (value !== '') {
      setSelectors([
        ...selectors, ++nextId
      ])
    }
    generateSelectors()
  }

  // function generateSelectors () {
  //   return () => {
  //     for (let i = 0; i < selectorId; i++) {
  //       generateSelector()
  //     }
  //   }
  // }

  function generateSelectors () {
    return (
      <>
        {selectors.map(selectorId => (
          <select id={'s' + selectorId} key={selectorId} onChange={handleChange}>
            <option></option>
            {items.map(item => (
              <option value={item.id}
                key={item.id}>{item.name}</option>
            ))}
          </select>
        ))}

      </>
    )
  }

  useEffect(() => {
    fetch('http://localhost:8080/diablo2/rune/listRunes')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return generateSelectors()
  }
}

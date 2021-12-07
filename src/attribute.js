import React, { useEffect, useState } from 'react'

let nextId = 0
export let runeIds

export default function Rune () {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [selectors, setSelectors] = useState([nextId])
  const [optionValues, setOptionValues] = useState([])

  function handleChange (event, selectorId) {
    let value = event.target.value

    if (value !== '') {
      if (optionValues[selectorId] === undefined || optionValues[selectorId] === '') {
        setSelectors([
          ...selectors, ++nextId
        ])
      }
    } else {
      const difference = nextId - selectorId
      if (difference === 1) {
        // 说明是倒数第2个选空
        selectors.pop()
        setSelectors([...selectors])
      } else if (difference !== 0) {
        // 不是最后一个或不是倒数第2个选空，不改变值
        value = optionValues[selectorId]
      }
    }
    optionValues.splice(selectorId, 1, value)
    setOptionValues([...optionValues], runeIds = optionValues)
    generateSelectors()
  }

  function generateSelectors () {
    return (
      <>
        <label>Choose the Runes</label>
        {selectors.map(selectorId => (
          <select id={'s' + selectorId} key={selectorId} onChange={(event) => handleChange(event, selectorId)} value={optionValues[selectorId]}>
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

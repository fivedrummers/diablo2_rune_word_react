import React from 'react'
import Rune, { runeIds } from './rune'

export default function RuneWord () {
  function handleSubmit () {
    alert(runeIds)
  }

  return (
    <section>
      <h1>Combine Rune Word</h1>
      <form onSubmit={handleSubmit}>
        <Rune />
        <br />
        <br />
        <input type='submit' value='提交' />
      </form>
    </section>
  )
}

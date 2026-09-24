import { useState } from 'react'
import { Button } from './Button'

export default function ButtonPage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Button</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => setCount((c) => c + 1)}>Clicked {count}</Button>
        <Button variant="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>
      </div>
    </>
  )
}

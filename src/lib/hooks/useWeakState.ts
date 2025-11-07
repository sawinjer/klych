import { useEffect, useState } from "react"

export const useWeakState = <T>(initial?: T) => {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial)
  }, [initial])

  return [value, setValue] as const;
}

import { useEffect } from 'react'
import { useLocation } from 'wouter'

export default function () {
  const [location] = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
}

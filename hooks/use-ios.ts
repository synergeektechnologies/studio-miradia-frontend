import * as React from 'react'

export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || 
                         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      setIsIOS(isIOSDevice)
    }
    
    checkIOS()
  }, [])

  return !!isIOS
}

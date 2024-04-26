import React from "react"

export function useWindowResize() {
    const [windowSize, setWindowSize] = React.useState<number>()
    React.useEffect(() => {
        setWindowSize(window.innerWidth)
        window.addEventListener('resize', () => setWindowSize(window.innerWidth))
        return window.removeEventListener('resize', () => setWindowSize(window.innerWidth))
    }, [])
    return windowSize
}
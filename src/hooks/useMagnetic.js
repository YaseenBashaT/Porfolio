import { useEffect } from 'react'

// Elements with [data-magnetic] drift slightly toward the pointer.
export default function useMagnetic() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const cleanups = []
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - (r.left + r.width / 2)) * 0.28
        const y = (e.clientY - (r.top + r.height / 2)) * 0.4
        el.style.transform = `translate(${x}px, ${y}px)`
      }
      const leave = () => (el.style.transform = '')
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
    })
    return () => cleanups.forEach((c) => c())
  }, [])
}

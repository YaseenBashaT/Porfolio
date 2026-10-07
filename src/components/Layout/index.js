import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/'
import ThemeToggle from '../specials/ThemeToggle'
import './index.scss'

const Layout = () => {
  const { pathname } = useLocation()
  const page = useRef(null)
  const bar = useRef(null)

  // new route: back to top
  useEffect(() => {
    page.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // scroll progress hairline
  useEffect(() => {
    const el = page.current
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      bar.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <div className="App">
      <Sidebar />
      <div className="progress"><i ref={bar} /></div>
      <ThemeToggle />
      <div className="page" ref={page}>
        <div className="route" key={pathname}>
          <Outlet />
        </div>
      </div>
      <span className="tags bottom-tags">
        &lt;/body&gt;
        <br />
        <span className="bottom-tag-html">&lt;/html&gt;</span>
      </span>
      <div className="curtain" key={`c-${pathname}`} aria-hidden="true">
        <i />
        <i />
      </div>
    </div>
  )
}

export default Layout

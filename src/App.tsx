import { Suspense } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router'
import { components } from './registry'

function Home() {
  return (
    <>
      <h1>Components</h1>
      {components.length === 0 ? (
        <p>
          No components yet. Add <code>src/components/Name/Name.page.tsx</code>.
        </p>
      ) : (
        <ul>
          {components.map(({ name, path }) => (
            <li key={path}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <nav className="sidebar">
          <Link to="/" className="brand">
            Playground
          </Link>
          {components.map(({ name, path }) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
        </nav>
        <main className="content">
          <Suspense fallback={<p>Loading…</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              {components.map(({ path, Page }) => (
                <Route key={path} path={path} element={<Page />} />
              ))}
              <Route path="*" element={<p>Not found.</p>} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

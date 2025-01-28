import { Outlet } from 'react-router-dom'

export default function GlobalLayout() {
  return (
    <div className="min-h-screen flex  sm:justify-center items-center pt-6 sm:pt-0 bg-white">
      <Outlet />
    </div>
  )
}

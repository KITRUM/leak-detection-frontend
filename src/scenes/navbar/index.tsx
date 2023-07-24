import { Link } from 'react-router-dom'
import { HomeIcon, MapIcon, GiftIcon } from '@heroicons/react/20/solid'

export default function NavBar() {
  const iconStyles = 'w-6 h-6'
  const linkStyles = 'mx-auto flex hover:text-blue-800'

  return (
    <div className="mt-16 flex flex-col justify-around gap-6">
      <div className={linkStyles}>
        <HomeIcon className={iconStyles} />
        <Link to="/">Dashboard</Link>
      </div>
      <div className={linkStyles}>
        <MapIcon className={iconStyles} />
        <Link to="/platforms">Platforms</Link>
      </div>
      <div className={linkStyles}>
        <GiftIcon className={iconStyles} />
        <Link to="/about">About</Link>
      </div>
    </div>
  )
}

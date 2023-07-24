import { CardItem } from '@/types'
import { Link } from 'react-router-dom'

type Props = {
  items: CardItem[]
}

export const Cards = ({ items }: Props) => {
  return (
    <div className="mb-8 mt-8 grid grid-cols-2 place-items-center gap-[3em] p-8">
      {items.map((item) => {
        return (
          <Link
            to={item.path}
            key={item.element.id}
            className="mx-auto h-full w-full rounded-[1em] bg-[#eef1f5] p-24 text-center text-lg shadow-lg hover:scale-[1.05] hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100"
          >
            {item.element.name}
          </Link>
        )
      })}
    </div>
  )
}

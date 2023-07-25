import Card from '@/elements/card/Card'
import React from "react";

type TCardList = {
  baseSlug: string
  cards: {
    id: number
    name: string
  }[]
}

const CardList: React.FC<TCardList> = ({ baseSlug, cards }) => {
  return (
    <div className="mb-8 mt-8 grid grid-cols-2 place-items-center gap-[3em] p-8">
      {cards.map((card) => {
        return <Card card={card} baseSlug={baseSlug} />
      })}
    </div>
  )
}

export default CardList;

import { Platform } from '@/types'
import { useState } from 'react'
import { fetchPlatforms } from '@/services/platforms'
import CardList from "@/components/CardList/CardList";

// Platforms list component
const Platforms = () => {
  const [platforms, _] = useState<Platform[]>(() => fetchPlatforms())

  // TODO: Add image to the platform page
  return <CardList baseSlug='/platforms/' cards={platforms} />
}

export default Platforms;

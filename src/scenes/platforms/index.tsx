import { CardItem, Platform } from '@/types'
import { useState } from 'react'
import { fetchPlatforms } from '@/services/platforms'
import { Cards } from '@/components/card'

// Platforms list component
export function Platforms() {
    const [platforms, _] = useState<Platform[]>(() => fetchPlatforms())

    const items: CardItem[] = platforms.map((platform) => {
        return {
            path: `/platforms/${platform.id}`,
            element: platform,
        }
    })

    // TODO: Add image to the platform page
    return <Cards items={items} />
}

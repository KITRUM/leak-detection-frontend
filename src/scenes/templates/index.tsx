import { Cards } from '@/components/card'
import { fetchTemplates } from '@/services/templates'
import { CardItem, Template } from '@/types'
import { useParams } from 'react-router-dom'

// Templates retrieve component
export function Templates() {
    const { platformId } = useParams<string>()
    const templates: Template[] = fetchTemplates(Number(platformId))
    const items: CardItem[] = templates.map((template) => {
        return {
            path: `/templates/${template.id}`,
            element: template,
        }
    })

    return <Cards items={items} />
}

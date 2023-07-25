import { fetchTemplates } from '@/services/templates'
import { Template } from '@/types'
import { useParams } from 'react-router-dom'
import CardList from "@/components/CardList/CardList";

// Templates retrieve component
const Templates = () => {
  const { platformId } = useParams<string>()
  const templates: Template[] = fetchTemplates(Number(platformId))

  return <CardList baseSlug='/templates/' cards={templates} />
}

export default Templates;

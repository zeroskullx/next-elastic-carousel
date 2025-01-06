import { ExemplePage } from '@/app/view/exemple'
import { Wrapper } from '../../components/layout/Wrapper'
import dataContent from '../../data/exempleContent.json'
import { SectorNav } from '@/app/components/SectorNav'

const goto = [
  {
    name: dataContent.arrowsToShow.name,
    url: `#${dataContent.arrowsToShow.id}`,
  },
  {
    name: dataContent.ItemToScroll.name,
    url: `#${dataContent.ItemToScroll.id}`,
  },
  {
    name: dataContent.VerticalMode.name,
    url: `#${dataContent.VerticalMode.id}`,
  },
  {
    name: dataContent.IsRightToLeft.name,
    url: `#${dataContent.IsRightToLeft.id}`,
  },
  { name: dataContent.easing.name, url: `#${dataContent.easing.id}` },
]

export default function Examples() {
  return (
    <Wrapper
      mainChildren={<ExemplePage />}
      sectorNav={<SectorNav goto={goto} />}
    />
  )
}

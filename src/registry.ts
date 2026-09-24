import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type ComponentEntry = {
  name: string
  path: string
  Page: LazyExoticComponent<ComponentType>
}

// Every src/components/<Name>/<Name>.page.tsx becomes a route at /<name>.
const pages = import.meta.glob<{ default: ComponentType }>(
  './components/*/*.page.tsx',
)

export const components: ComponentEntry[] = Object.entries(pages)
  .map(([file, load]) => {
    const name = file.split('/')[2]
    return { name, path: `/${name.toLowerCase()}`, Page: lazy(load) }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

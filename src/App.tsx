import { Item } from './components/Item'
import { useItems } from './hooks/useItems'
import { useSEO } from './hooks/useSEO'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
  const { items, addItem, removeItem } = useItems()
  useSEO({
    title: `[${items.length}] React Test Technique`,
    description: `Ajouter et effacer des éléments d'une liste`
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const input = elements.namedItem('query')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  const deleteItem = (id: ItemId) => () => {
    removeItem(id)()
  }

  return (
    <div className="app">
      <header>
        <h1>Petit Test Technique de React ⚛️</h1>
        <form
          onSubmit={handleSubmit}
          aria-label="Ajouter des éléments à une liste"
        >
          <input name="query" placeholder="Livres, Jeux Vidéos..." required />
          <button className="search-button">Chercher</button>
        </form>
      </header>
      <main>
        <h2>Ajouter des éléments</h2>
        {items.length === 0 ? (
          <p>Il n'y a pas d'éléments</p>
        ) : (
          <ul className="items">
            {items.map(({ id, text }, index) => (
              <Item
                deleteItems={deleteItem(id)}
                key={`${id}-${index}`}
                text={text}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App

import { useParams, Link } from 'react-router-dom'

import menuData from '../menuData'

function ItemDetail() {
  const { id } = useParams()
  const allItems = menuData.flatMap(cat => cat.items)
  const item = allItems.find(i => i.id === id)

  if (!item) {
    return (
      <div>
        <p>We couldn't find that item.</p>
        <Link to="/">Back to the menu</Link>
      </div>
    )
  }

  return (
    <div className="item-detail">
      <Link to="/">← Back to the menu</Link>
      <h1>{item.name}</h1>
      <p className="price">${item.price.toFixed(2)}</p>
      <p>{item.description}</p>
    </div>
  )
}

export default ItemDetail
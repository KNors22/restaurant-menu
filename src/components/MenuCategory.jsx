import MenuItem from './MenuItem'

function MenuCategory({ category, items, onAddToCart, onYum }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="menu-category">
      <h2>{category}</h2>
      <div className="items-container">
        {items.map(item => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            onAddToCart={() => onAddToCart(item)}
            onYum={onYum}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuCategory

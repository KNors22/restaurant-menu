import {useState} from 'react';
import menuData from '../menuData';
import MenuCategory from '../components/MenuCategory';

const priceFilters = ['All', '$', '$$', '$$$'];

function getPriceTier(price, minPrice, maxPrice) {
  if (maxPrice === minPrice) {
    return '$';
  }

  const tierSize = (maxPrice - minPrice) / 3;

  if (price <= minPrice + tierSize) {
    return '$';
  }

  if (price <= minPrice + tierSize * 2) {
    return '$$';
  }

  return '$$$';
}

function Home(){
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [note, setNote] = useState('');
  const [confirmedNote, setConfirmedNote] = useState('');

  const categoryNames = menuData.map(cat => cat.category);
  const allPrices = menuData.flatMap(cat => cat.items.map(item => item.price));
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const filteredMenu = menuData
    .filter(cat => selectedCategory === 'All' || cat.category === selectedCategory)
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = selectedPrice === 'All' || getPriceTier(item.price, minPrice, maxPrice) === selectedPrice;

        return matchesSearch && matchesPrice;
      })
    }))

  const hasVisibleItems = filteredMenu.some(cat => cat.items.length > 0);

  function handleAddToCart(item) {
    setCart(currentCart => [...currentCart, item])
  }

  function handleNoteSubmit(e) {
    e.preventDefault()
    setConfirmedNote(note)
    setNote('')
  }

  const cartTotal = cart.reduce((total, item) => total + item.price, 0)

  return (
    <div className="App">
      <header>
        <h1>Bella Vita Trattoria</h1>
        <p>Fresh, delicious food made with love</p>

        <input
          type="text"
          placeholder="Table number"
          value={tableNumber}
          onChange={e => setTableNumber(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              console.log(`Table ${tableNumber} confirmed`)
            }
            if (e.key === 'Escape') {
              setTableNumber('')
            }
          }}
        />
        {tableNumber && <p>Ordering for Table {tableNumber}</p>}

        <form onSubmit={handleNoteSubmit}>
          <input
            type="text"
            placeholder="Any allergies or requests?"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <button type="submit">Send to Kitchen</button>
        </form>
        {confirmedNote && <p>✅ Kitchen note sent: "{confirmedNote}"</p>}
      </header>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search the menu..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="filter-group">
          <span className="filter-label">Category</span>
          <div className="category-filters">
            <button
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categoryNames.map(name => (
              <button
                key={name}
                className={selectedCategory === name ? 'active' : ''}
                onClick={() => setSelectedCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Price</span>
          <div className="price-filters" aria-label="Filter by price">
            {priceFilters.map(price => (
              <button
                key={price}
                className={selectedPrice === price ? 'active' : ''}
                onClick={() => setSelectedPrice(price)}
                aria-pressed={selectedPrice === price}
              >
                {price}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="menu-container">
        {hasVisibleItems ? (
          filteredMenu.map(cat => (
            <MenuCategory
              key={cat.category}
              category={cat.category}
              items={cat.items}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="empty-menu-message">No menu items match your filters.</p>
        )}
      </main>

      <div className="cart-summary">
        <h2>Your Cart ({cart.length})</h2>
        <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
      </div>
    </div>
  )
};

export default Home;
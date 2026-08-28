import {useState} from 'react';
import menuData from '../menuData';
import MenuCategory from '../components/MenuCategory';

function Home(){
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [note, setNote] = useState('');
  const [confirmedNote, setConfirmedNote] = useState('');
  const [kidsMode, setKidsMode] = useState(true);
  const [funPoints, setFunPoints] = useState(0);

  const categoryNames = menuData.map(cat => cat.category);

  const filteredMenu = menuData
    .filter(cat => selectedCategory === 'All' || cat.category === selectedCategory)
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))

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
    <div className={`App ${kidsMode ? 'kids-mode' : ''}`}>
      <header>
        <h1>{kidsMode ? '🍝 Bella Vita Play Kitchen' : 'Bella Vita Trattoria'}</h1>
        <p>{kidsMode ? 'Tap, explore, and collect Yum points!' : 'Fresh, delicious food made with love'}</p>
        <button type="button" onClick={() => setKidsMode(current => !current)}>
          {kidsMode ? '🧸 Kids Mode: ON' : '👩‍🍳 Kids Mode: OFF'}
        </button>
        <p>⭐ Fun Points: {funPoints}</p>

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

      <main className="menu-container">
        {filteredMenu.map(cat => (
          <MenuCategory
            key={cat.category}
            category={cat.category}
            items={cat.items}
            onAddToCart={handleAddToCart}
            onYum={() => setFunPoints(points => points + 1)}
          />
        ))}
      </main>

      <div className="cart-summary">
        <h2>Your Cart ({cart.length})</h2>
        <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
      </div>
    </div>
  )
};

export default Home;
import { useState } from 'react'
import styles from './MenuItem.module.css' // css modules
import Button from '@mui/material/Button' // material ui
import {Link} from 'react-router-dom' // link, works like anchor tag <a>

function MenuItem({ id, name, price, description, onAddToCart, onYum }) {
  const [yumCount, setYumCount] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  function handleYumClick() {
    setYumCount(currentCount => currentCount + 1)
    onYum?.()
  }

  return (
    <div
      className={`${styles.menuItem} ${isHovering ? styles.hovering : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.itemHeader}>
        <h3><Link to={`/menu/${id}`}>{name}</Link></h3>
        <span className={styles.price}>${price.toFixed(2)}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <button onClick={handleYumClick}>
        😋 Yum! ({yumCount})
      </button>
      <Button variant="contained" color="error" onClick={onAddToCart}>
        Add to Cart
      </Button>
    </div>
  )
}

export default MenuItem

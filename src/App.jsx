import { useId, useState } from 'react'
import './App.css'

const mediaRoot = 'https://welcomeinnfishbar.com/static/media/'
const delivery = {
  'Uber Eats': 'https://www.ubereats.com/gb/london/food-delivery/welcome-inn-fish-bar/UV-Ye9JuROCqQsGdGGnOAw',
  'Just Eat': 'https://www.just-eat.co.uk/restaurants-welcomeinnfishbar-deptford/menu',
}
const googleRating = { score: 4.7, count: 192, url: 'https://www.google.com/maps/search/?api=1&query=Welcome+Inn+Fish+Bar+206+Evelyn+Street+London+SE8+5NL' }
const menu = {
  "Fish": [
    ["Cod", "Cod only, no chips included."],
    ["Scampi (12Pcs)", "Scampi only, no chips included."],
    ["8 Mini Cod and Chips with Sweet Chili Sauce", ""],
    ["Cod Roe", ""],
    ["Fish Cake", ""],
  ],
  "Chips": [
    ["Portion of Chips", ""],
    ["Large Portion of Chips", ""],
    ["Chip Roll", ""],
    ["Butter Roll", ""],
  ],
  "Burgers": [
    ["Beef Burger with Salad", "", "Halal"],
    ["Double Beef Burger with Salad", "", "Halal"],
    ["Cheeseburger with Salad", "", "Halal"],
    ["Double Beef Burger with Cheese and Salad", "", "Halal"],
    ["Chicken Fillet Burger with Salad", "", "Halal"],
    ["Quarter Pounder Beef Burger with Salad", "", "Halal"],
    ["Quarter Pounder Beef Burger with Salad and Cheese", "", "Halal"],
  ],
  "Chicken": [
    ["Chicken", "1 or 2 pieces", "Halal"],
    ["Chicken and Chips", "1 or 2 pieces", "Halal"],
    ["Hot Wings", "1 or 2 wings", "Halal"],
    ["Hot Wings and Chips", "2 or 4 wings", "Halal"],
    ["Chicken Nuggets", "5 or 10 pieces", "Halal"],
    ["Chicken Nuggets and Chips", "5 or 10 pieces", "Halal"],
  ],
  "Burger Meal": [
    ["Beef Burger with Salad with Chips and a Can of Drink", "", "Halal"],
    ["Double Beef Burger with Salad with Chips and a Can of Drink", "", "Halal"],
    ["Cheeseburger with Salad with Chips and a Can of Drink", "", "Halal"],
    ["Double Beef Burger with Cheese and Salad and Chips and a Can of Drink", "", "Halal"],
    ["Chicken Fillet Burger with Salad and Chips and a Can of Drink", "", "Halal"],
    ["Vegetarian Burger with Salad and Chips and a Can of Drink", ""],
    ["Quarter Pounder Beef Burger with Salad with Cheese and a Can Drink", "", "Halal"],
    ["Quarter Pounder Beef Burger with Salad + Chips + a Can Drink", "", "Halal"],
  ],
  "Peter's Pies": [
    ["Peter’s Steak and Kidney Pie", "Pie only, no chips included."],
    ["Peter’s Minced Beef and Onion Pie", "Pie only, no chips included."],
    ["Peter’s Chicken Mushroom Pie", "Pie only, no chips included."],
  ],
  "Jamaican Patties": [
    ["Beef Patty", "", "Halal"],
    ["Chicken Patty", "", "Halal"],
    ["Vegetable Patty", ""],
  ],
  "Sides": [
    ["Jumbo Sausage", "", "Halal"],
    ["Batter Sausage", "Batter sausage only, no chips included.", "Halal"],
    ["Saveloy", "Saveloy only, no chips included.", "Halal"],
    ["Curry Roll", ""],
    ["10 Pcs Onion Rings", ""],
    ["Mushy Peas", ""],
    ["Pickled Onion", ""],
    ["Pickled Gherkin", ""],
    ["Curry Sauce", ""],
    ["Non-Brewed Condiment", ""],
    ["Fish Cake", ""],
    ["Bottled Onion Vinegar", ""],
  ],
  "Special": [
    ["Chips in Curry Sauce in a Container", ""],
  ],
  "Kids Meals": [
    ["Kids Nuggets Meal 5pcs Nuggets, Chips and Drink", "", "Halal"],
    ["Kids Burger, Chips and a Can of a Drink", "", "Halal"],
  ],
  "Vegetarian": [
    ["10 Mini Vegetable Spring Rolls with Sweet Chili Sauce", ""],
    ["Jamaican Vegetable Patty", ""],
    ["Vegetarian Burger with Salad", ""],
  ],
  "Drinks": [
    ["Coca-Cola Original Taste 330ml Can", ""],
    ["Diet Coke 330ml", ""],
    ["Pepsi 330ml", ""],
    ["Tango Orange 330ml", ""],
    ["Tango Zero'D Apple Sugar Free 330ml", ""],
    ["Jamaican Ginger Beer (330ml)", ""],
    ["Jamaican Pineapple Soda (330ml)", ""],
    ["7UP 330ml", ""],
    ["Fanta Pineapple & Grapefruit 330ml Can", ""],
    ["Dr Pepper 330ml Can", ""],
    ["Ribena (330ml)", ""],
    ["Water (330ml)", ""],
    ["Orange Lucazade (380ml)", ""],
    ["Coca-Cola Original Taste 1.25L Bottle", ""],
  ],
}

const arrowPaths = {
  down: 'M2.5 5.5 8 11l5.5-5.5',
  right: 'M2.5 8h11M9.5 4l4 4-4 4',
  up: 'M2.5 10.5 8 5l5.5 5.5',
}

function Arrow({ dir }) {
  return <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d={arrowPaths[dir]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

function Stars({ score }) {
  const id = 'stars' + useId().replace(/:/g, '')
  return <svg className="stars" viewBox="0 0 104 20" aria-hidden="true" focusable="false">
    <defs><linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" x2="104">
      <stop className="rating-on" offset={score / 5} /><stop className="rating-off" offset={score / 5} />
    </linearGradient></defs>
    {[0, 1, 2, 3, 4].map(i => <path key={i} fill={`url(#${id})`} transform={`translate(${i * 21} 0)`} d="M10 1.4 12.7 6.9 18.8 7.8 14.4 12.1 15.4 18.1 10 15.3 4.6 18.1 5.6 12.1 1.2 7.8 7.3 6.9Z" />)}
  </svg>
}

function LuckyCat({ className, size = 96, label }) {
  return <svg className={className ? `lucky-cat ${className}` : 'lucky-cat'} width={size} height={Math.round(size * 1.18)} viewBox="0 0 100 118" focusable="false" role={label ? 'img' : 'presentation'} aria-hidden={label ? undefined : true} aria-label={label}>
    {label && <title>{label}</title>}
    <path className="cat-limb-back" d="M75 104c15-2 21-13 16-21-3-6-10-7-14-3" />
    <path className="cat-limb" d="M75 104c15-2 21-13 16-21-3-6-10-7-14-3" />
    <path className="cat-fill cat-line" d="M50 44c-18 0-28 16-28 39 0 19 7 29 28 29s28-10 28-29c0-23-10-39-28-39Z" />
    <ellipse className="cat-belly" cx="50" cy="88" rx="17" ry="20" />
    <ellipse className="cat-fill cat-line" cx="31" cy="90" rx="8" ry="6.5" />
    <ellipse className="cat-gold cat-line" cx="50" cy="96" rx="19" ry="11" />
    <path className="cat-coin-mark" d="M42 92h16M42 100h16" />
    <path className="cat-fill cat-line" d="M31 22 26 4l19 11z" />
    <path className="cat-fill cat-line" d="M69 22 74 4 55 15z" />
    <circle className="cat-fill cat-line" cx="50" cy="42" r="27" />
    <path className="cat-red" d="M33 20 30.5 9.5 42 16z" />
    <path className="cat-red" d="M67 20 69.5 9.5 58 16z" />
    <ellipse className="cat-ink" cx="39" cy="40" rx="3" ry="4" />
    <ellipse className="cat-ink" cx="61" cy="40" rx="3" ry="4" />
    <ellipse className="cat-red" cx="50" cy="51" rx="3.4" ry="2.6" />
    <path className="cat-detail" d="M50 54c0 3-2.5 4-4.5 2M50 54c0 3 2.5 4 4.5 2" />
    <path className="cat-detail" d="M24 45 12 43M24 51 13 55M76 45 88 43M76 51 87 55" />
    <ellipse className="cat-red cat-line" cx="50" cy="67" rx="21" ry="7" />
    <circle className="cat-gold cat-line" cx="50" cy="74" r="7" />
    <path className="cat-detail" d="M50 71v6" />
    <g className="cat-paw">
      <path className="cat-limb-back" d="M66 66c10-5 16-15 16-27" />
      <path className="cat-limb" d="M66 66c10-5 16-15 16-27" />
      <circle className="cat-fill cat-line" cx="82" cy="30" r="9.5" />
    </g>
  </svg>
}

const categories = Object.keys(menu)

function App() {
  const [category, setCategory] = useState('Fish')
  const [menuOpen, setMenuOpen] = useState(false)
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const onTabKey = e => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    const i = categories.indexOf(category)
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? categories.length - 1
      : keys[e.key] ? (i + keys[e.key] + categories.length) % categories.length : null
    if (next === null) return
    e.preventDefault()
    setCategory(categories[next])
    document.getElementById(`tab-${next}`).focus()
  }
  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Welcome Inn Fish Bar home"><b>WI</b><span>Welcome Inn<br /><em>Fish Bar</em></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav">{menuOpen ? 'Close' : 'Menu'}</button>
      <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation"><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#visit">Find us</a><a className="header-order" href={delivery['Uber Eats']} target="_blank" rel="noreferrer">Order online +</a></nav>
    </header>
    <main id="top">
      <section className="hero"><video className="hero-media" autoPlay={!reduceMotion} muted loop playsInline poster={`${mediaRoot}05.eccafc19.jpeg`}>{!reduceMotion && <source src={`${mediaRoot}01.722a77bb.mp4`} type="video/mp4" />}</video><div className="hero-shade" /><div className="hero-copy"><p className="eyebrow light">Deptford, south east London / est. 1992</p><h1>Proper fish.<br /><i>Proper chips.</i></h1><p className="hero-intro">Big portions, crisp batter and the kind of welcome that keeps you coming back.</p><div className="hero-actions"><a className="button button-primary" href="#menu">See the menu<Arrow dir="down" /></a><a className="button button-ghost" href={delivery['Uber Eats']} target="_blank" rel="noreferrer">Get it delivered +</a></div></div><div className="hero-note"><span>Open today</span><strong>12:00 - 14:30<br />16:30 - 23:00</strong></div></section>
      <section className="quick-strip"><div>01 <strong>Freshly cooked</strong><span>to order, every time</span></div><div>02 <strong>Massive portions</strong><span>without the fuss</span></div><div>03 <strong>Two ways to order</strong><span>pickup or delivery</span></div></section>
      <section className="menu-section section-pad" id="menu"><div className="section-heading"><div><p className="eyebrow">The good stuff</p><h2>What are you<br /><i>having?</i></h2></div><p className="section-description">From the classics to the things you did not know you fancied. Everything is cooked fresh and served with a smile.</p></div><div className="menu-layout"><div className="category-tabs" role="tablist" aria-label="Menu categories">{categories.map((name, i) => <button className={category === name ? 'active' : ''} role="tab" id={`tab-${i}`} aria-controls="menu-panel" aria-selected={category === name} tabIndex={category === name ? 0 : -1} key={name} onKeyDown={onTabKey} onClick={() => setCategory(name)}>{String(i + 1).padStart(2, '0')} {name}</button>)}</div><div id="menu-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${categories.indexOf(category)}`}>{menu[category].map(([name, detail, tag]) => <article className="menu-item" key={name}><div><h3>{name}{tag && <small>{tag}</small>}</h3>{detail && <p>{detail}</p>}</div></article>)}<p className="menu-footnote">Ask us about allergens. Prices are on the board in store and may vary on delivery platforms.</p></div></div><div className="order-bar"><LuckyCat className="order-cat" size={46} /><span>Hungry now?</span><strong>Skip the queue.</strong><div>{Object.entries(delivery).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer">{name} +</a>)}</div></div></section>
      <section className="reviews section-pad"><p className="eyebrow">What people say</p><Stars score={googleRating.score} /><p className="reviews-score"><strong>{googleRating.score}</strong> out of 5</p><p className="reviews-count">Rated by {googleRating.count} customers on Google</p><a className="text-link" href={googleRating.url} target="_blank" rel="noreferrer">Read the reviews +</a></section>
      <section className="story-section section-pad" id="story"><div className="story-image"><img src={`${mediaRoot}05.eccafc19.jpeg`} alt="Freshly prepared fish and chips from Welcome Inn Fish Bar" /><span>Made<br />fresh</span><LuckyCat className="story-cat" size={118} label="Waving lucky cat, a Welcome Inn regular" /></div><div className="story-copy"><p className="eyebrow">Since 1992</p><h2>Good food<br /><i>travels far.</i></h2><p>Started in the heart of south east London by Eric, Welcome Inn has been doing one thing well for over thirty years: making proper food for the people of Deptford.</p><p>Order at the counter and take it home, or let a delivery bring dinner to you. No tables, no ceremony. Just good fish, big chips and a warm welcome.</p><a className="text-link" href="#visit">Come and see us<Arrow dir="right" /></a></div></section>
      <section className="visit-section" id="visit"><div className="visit-inner section-pad"><div><p className="eyebrow">The practical bit</p><h2>Find your way<br /><i>to the good stuff.</i></h2></div><div className="visit-details"><div><span>Come by</span><address>206 Evelyn Street<br />Deptford, London<br />SE8 5NL</address><a className="text-link" href="https://maps.google.com/maps?ll=51.483715,-0.031628&z=15&t=m" target="_blank" rel="noreferrer">Open in Maps +</a></div><div><span>Give us a call</span><a className="phone" href="tel:02086948255">020 8694 8255</a><span>Opening hours</span><p>Mon-Sat / 12:00-14:30<br />and 16:30-23:00<br /><strong>Sunday / Closed</strong></p></div></div></div></section>
    </main>
    <footer className="site-footer"><a className="brand" href="#top"><b>WI</b><span>Welcome Inn<br /><em>Fish Bar</em></span></a><p>Traditional fish and chips<br />in Deptford since '92.</p><LuckyCat className="footer-cat" size={42} /><a href="#top">Back to top<Arrow dir="up" /></a><small>Copyright Welcome Inn Fish Bar Ltd</small></footer>
  </div>
}
export default App

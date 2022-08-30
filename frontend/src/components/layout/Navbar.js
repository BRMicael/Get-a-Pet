import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'

import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />
      </div>
      <ul>
        <li>
          <Link to='/'>Adotar</Link>
        </li>
        <li>
          <Link to='/login'>Entrar</Link>
        </li>
        <li>
          <Link to='/register'>Cadastrar</Link>
        </li>
      </ul>
    </nav>
  )
}

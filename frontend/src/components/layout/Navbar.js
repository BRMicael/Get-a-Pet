import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'

import styles from './Navbar.module.css'

import {Context} from '../../context/UserContext';

export default function Navbar() {
  const {authenticated, logout} = useContext(Context);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />
      </div>
      <ul>
        <li>
          <Link to='/'>Adotar</Link>
        </li>
        {
          authenticated ? (<li onClick={logout}><Link to='/'>Sair</Link></li>) : 
          (
            <>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Cadastrar</Link>
        </li>
            </>
          )
        }

      </ul>
    </nav>
  )
}
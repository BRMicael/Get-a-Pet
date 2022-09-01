import {useState, useContext} from 'react';
import Input from '../../form/Input';
import styles from '../../form/Form.module.css';
import { Link } from "react-router-dom";

import { Context } from '../../../context/UserContext'

export default function login() {
  function handleChange(e){}

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form>
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>Não tem conta? <Link to="/register">Clique aqui!</Link></p>
    </section>
  )
}

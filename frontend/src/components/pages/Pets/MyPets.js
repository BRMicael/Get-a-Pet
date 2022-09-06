import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function MyPets() {
  const [pets, setPets] = useState([])
  
    return (
    <div>
        <div>
            <h1>MyPets</h1>
            <Link to="/pet/add">Cadastrar Pet</Link>
        </div>
        <div>
            {pets.length > 0 && <p>Meus pets cadastrados</p>}
            {pets.length === 0 && <p>Não há pets cadastrados</p>}
        </div>
    </div>
  )
}

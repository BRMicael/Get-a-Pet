import React, {useState, useEffect} from 'react';
import api from '../../../utils/api';
import styles from './Dashboard.module.css';
import RoundedImage from '../../layout/RoundedImage';

export default function MyAdoptions() {
    const [pets, setPets] = useState({});
    const [token] = useState(localStorage.getItem('token' || ''));

    useEffect(() => {
        api
            .get('/pets/myadoptions', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setPets(response.data.pets);
            })
    }, [token])

  return (
    <div>
        <div className={styles.pet_list_header}>
            <h1>Minhas adoções</h1>
        </div>
        <div className={styles.pet_list_container}>
            {
                pets.length > 0 && pets.map((pet) => (
                    <div key={pet._id} className={styles.petlist_row}>
                    <RoundedImage
                    src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                    alt={pet.name}
                    width="px75"
                    />
                    <span className="bold">{pet.name}</span>
                    <div className={styles.contacts}>
                            <p><span>Ligue para:</span> {pet.user.phone}</p>
                            <p><span>Fale com:</span> {pet.user.name}</p>
                    </div>
                    <div className={styles.actions}>
                      {pet.available ? 
                      (
                        <>
                            <p>Adoção em processo</p>
                        </>
                      ) : 
                      (<p>Parabéns por adotar {pet.name}</p>) }
                    </div>
                  </div>
                ))
            }
        </div>
    </div>
  )
}

import React, {useState, useEffect} from "react";
import style from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import api from "../../../utils/api";
import useFlashMessage from '../../../hooks/useFlashMessage'

export default function Profile() {
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState();
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();

  useEffect(() => {
    api.get('/users/checkuser' ,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
    }).then((response) => {
      setUser(response.data);
    })
  }, [token])

    function handleChange(e){
      setUser({...user, [e.target.name]: e.target.value})
    }
    function onFileChange(e){
      setPreview(e.target.files[0])
      setUser({...user, [e.target.name]: e.target.files[0]})
    }

    async function handleSubmit(e){
      e.preventDefault();

      let msgType = '';

      const formData = new FormData();
      await Object.keys(user).forEach((key) => formData.append(key, user[key]))



      const data = await api.patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        msgType = 'success';
        return response.data
      }).catch((err) => {
        msgType = 'error';
        return err.response.data;
      })

      setFlashMessage(data.message, msgType);
    }

  return (
    <div>
      <div className={style.profile_header}>
      <h1>Perfil</h1>
        {(user.image || preview) && (
          <img src={
            preview ? URL.createObjectURL(preview)
            : `${process.env.REACT_APP_API}/images/users/${user.image}`
          } 
          alt={user.name}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite seu nome telefone"
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Digite sua senha novamente"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </div>
  );
}

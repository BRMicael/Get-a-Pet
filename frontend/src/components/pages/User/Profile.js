import React, {useState, useEffect} from "react";
import style from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import api from "../../../utils/api";

export default function Profile() {
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get('/users/checkuser' ,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
    }).then((response) => {
      setUser(response.data);
    })
  }, [token])

    function handleChange(e){}
    function onFileChange(e){}


  return (
    <div>
      <div className={style.profile_header}>
        <h1>Perfil</h1>
        <p>Preview</p>
      </div>
      <form className={formStyles.form_container}>
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

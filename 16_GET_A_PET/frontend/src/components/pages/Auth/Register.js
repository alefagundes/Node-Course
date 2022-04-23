import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

//context
import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //enviar um objeto para o banco
    register(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome:"
          handleOnChange={handleOnChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite seu telefone:"
          handleOnChange={handleOnChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail:"
          handleOnChange={handleOnChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha:"
          handleOnChange={handleOnChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha:"
          handleOnChange={handleOnChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já possui conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </section>
  );
}
export default Register;

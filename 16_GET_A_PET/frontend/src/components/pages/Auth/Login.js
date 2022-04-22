import {useState, useContext} from 'react'
import Input from '../../form/Input'
import {Link} from 'react-router-dom'
import styles from '../../form/Form.module.css'

//context
import {Context} from '../../../context/UserContext'


function Login(){

    function handleOnChange(e){

    }

    return(
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form>
                <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder='Digite o seu e-mail'
                handleOnChange={handleOnChange}
                />
                <Input
                text='Senha'
                type='password'
                name='password'
                placeholder='Digite a sua senha'
                handleOnChange={handleOnChange}
                />
                <input type='submit' value='Entrar'/>
            </form>
            <p>
                Não tem possui conta?<Link to='/register'> Clique aqui.</Link>
            </p>
        </section>
    )
}
export default Login
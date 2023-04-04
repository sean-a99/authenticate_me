import { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import './LoginForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    console.log(sessionUser)
    if (sessionUser) return <Redirect to="/" />

    const handleSubmit = e => {
        e.preventDefault();
        return dispatch(login({credential: username, password: password}))
            .catch(async res => {
                const data = await res.json();
                setErrors(data.errors);
            })
        
    }
    //returning a form below
    return(
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, i) => {
                        return <li key={i} className="error">{error}</li>
                    })}
                </ul>

                <label>Username: 
                    <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
                </label>
                <label>Password: 
                    <input type="text" onChange={e => setPassword(e.target.value)} value={password}/>
                </label>
                <button>Log In</button>
            </form>
        </>
    )
}

export default LoginFormPage;
import { FormEvent, useState, ChangeEvent, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import api from "../axiosInstance";
import { UserContext } from "../contexts/usercontext";
import { UserInterface } from "../interfaces/GlobalInterface";

function useCheckAndRedirectUser(user: string) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAndRedirect = async () => {
            if (user) {
                const response = await api.get<UserInterface>("/confirmUser/" + user);

                const data = response.data;
                if (data.token) navigate("/randomuser");
            }
        }
        checkAndRedirect();
    }, [user]);
}

function Login() {
    const { user, setUser } = useContext(UserContext)
    useCheckAndRedirectUser(user);

    const [form, setForm] = useState({
        user: "",
        password: "",
        keepon: false,
    });

    const [showWarning, setShowWarning] = useState<boolean>(false);

    // Control form data update.
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { name, value, type, checked } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    // Ask the server whether user exists;
    // Receive {_id: <some user id>} or {_id: null}
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const checkUser = async () => {
            const response = await api.post<UserInterface>("/confirmLogin", form);

            const { token } = response.data;

            // Display warning if no user is returned and prevent setting user
            // state.
            if (!token) {
                setShowWarning(true);
                return;
            }

            // Remember user after session is finished
            if (form.keepon) {
                localStorage.setItem('user', token);
            }

            // Remember user during session
            sessionStorage.setItem('user', token);

            setUser(token);
        }

        checkUser();
    }

    return (
        <div className="page_container--login_page">
            <main className="login_page--main_content" >
                {showWarning && <span className="login_box--warning">Usuário ou senha incorretos! Por favor, tente novamente.</span>}

                <h1 className="main_content--login_page_title u-title">Login</h1>
                <form action="#" className="login_box--login_form" onSubmit={handleSubmit}>
                    <fieldset>
                        <label htmlFor="user" className="login_form--field_name">Usuário:</label>
                        <input type="text"
                            name="user"
                            className="login_form--text_field"
                            onChange={handleChange}
                            value={form.user} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="password" className="login_form--field_name">Senha:</label>
                        <input type="password"
                            name="password"
                            className="login_form--text_field"
                            value={form.password}
                            onChange={handleChange} />
                    </fieldset>

                    <fieldset className="login_form--keepon">
                        <input type="checkbox"
                            name="keepon"
                            checked={form.keepon}
                            onChange={handleChange}
                        />
                        <label htmlFor="keepon"
                            className="keepon--label">Mantenha-me conectado</label>

                    </fieldset>

                    <button className="login_form--submit">Fazer login</button>
                </form>

            </main>
        </div>
    )
}

export default Login;


/*
Dev's comments

*1 - The user is set to null in case the login was unsuccessful.
We need React to refresh when this is the case so we may display 
the warning.
*/
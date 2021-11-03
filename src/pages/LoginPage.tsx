import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { Context } from "..";
import { LinkButton, LoginButton } from "../components/Buttons";
import '../styles/Forms.scss';

const LoginPage: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    function onLogin(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        store.login(email, password);
    }

    function onForm() {
        store.setViewForm('Register')
        store.setMessage('');
    }

    return (
        <>
            <h1 className="label">LOG IN</h1>
            <form onSubmit={e => onLogin(e)} className="form">
                <label>Email</label>
                <input 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    maxLength={25}
                    required
                />

                <label>Password</label>
                <input 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    minLength={6}
                    maxLength={20}
                    required
                />
                <div className="error">{store.message ? store.message : null}</div>
                <LoginButton>Login</LoginButton>
                <LinkButton func={() => onForm()}>New user?</LinkButton>
            </form>
        </>
    );
};

export default observer(LoginPage); 
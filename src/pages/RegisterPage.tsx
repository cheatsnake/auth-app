import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { Context } from "..";
import { LinkButton, LoginButton } from "../components/Buttons";
import '../styles/Forms.scss';

const RegisterPage: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const {store} = useContext(Context);

    function onRegister(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (checkPassword !== password) {
            setCheckPassword('');
            store.setMessage('The entered passwords do not match');
        } else {
            store.register(email, password);
        }
    }

    function onForm() {
        store.setViewForm('Login')
        store.setMessage('');
    }

    return (
        <>
            <h1 className="label">NEW USER</h1>
            <form onSubmit={e => onRegister(e)} className="form">
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

                <label>Repeat password</label>
                <input 
                    onChange={e => setCheckPassword(e.target.value)}
                    value={checkPassword}
                    type="password"
                    minLength={6}
                    maxLength={20}
                    required
                />
                <div className="error">{store.message ? store.message : null}</div>
                <LoginButton>Create</LoginButton>
                <LinkButton func={() => onForm()}>Are you already registered?</LinkButton>
            </form>
        </>
    );
};

export default observer(RegisterPage); 
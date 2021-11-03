import { FC } from "react";
import '../styles/Buttons.scss';

export const LoginButton: FC = ({children}) => {
    return (
        <button type="submit" className="btn btn_login">{children}</button>
    )
}

export const RegisterButton: FC = ({children}) => {
    return (
        <button type="submit" className="btn btn_register">{children}</button>
    )
}

interface ILinkButton {
    func: () => void;
}

export const LinkButton: FC<ILinkButton> = ({children, func}) => {
    return (
        <button onClick={() => func()} className="btn btn_link">{children}</button>
    )
}

interface ILogoutButton {
    func: () => void;
}

export const LogoutButton: FC<ILogoutButton> = ({children, func}) => {
    return (
        <button onClick={() => func()} className="btn btn_logout">{children}</button>
    )
}
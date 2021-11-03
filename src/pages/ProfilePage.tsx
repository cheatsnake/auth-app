import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { LogoutButton } from "../components/Buttons";
import '../styles/Profile.scss';

const ProfilePage = () => {
    const {store} = useContext(Context);
    return (
        <div className="profile">
            <h1>Welcome!</h1>
            <label>Your email:</label>
            <input type="text" value={store.user.email} readOnly/>
            <label>Email confirmed:</label>
            <input type="text" value={store.user.isActivated.toString()} readOnly/>
            <LogoutButton func={() => store.logout()}>Logout</LogoutButton>
        </div>
    );
};

export default observer(ProfilePage);
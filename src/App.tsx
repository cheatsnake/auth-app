import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import Spinner from './components/Spinner';
import { Context } from './index';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {

    const {store} = useContext(Context);
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [])

    if (store.isAuth && store.user.hasOwnProperty('isActivated')) {
        return (
            <>
                <ProfilePage/>
            </>
        )
    }

    return (
        <div className="app">
            {store.isLoading ? <Spinner/> : null}
            {store.viewForm === 'Login' ? <LoginPage/> : <RegisterPage/>}
        </div>
    );
};

export default observer(App);
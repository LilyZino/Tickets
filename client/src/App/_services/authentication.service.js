import { BehaviorSubject } from 'rxjs';
import { useHistory} from 'react-router-dom';
import axios from 'axios';


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value ? currentUserSubject.value.data:currentUserSubject.value }
};

function login(username, password) {

    return axios.put('/api/Users/login', {
        name: username,
        password: password
    }).then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        // console.log(user.data)
        currentUserSubject.next(user);
        return user;
    });
}

function logout() {

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function register(username, password, email) {

    return axios.put('/api/Users', {
        name: username,
        password: password,
        email: email,
    })
}
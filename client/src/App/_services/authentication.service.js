import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

function login(username, password) {
    return axios.put('/api/Users/login', {
        name: username,
        password
    }).then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function register(name, password, email, phone) {
    return axios.put('/api/Users', {
        name,
        password,
        email,
        phone,
    });
}

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    currentUser2: currentUserSubject,
    get currentUserValue() { return currentUserSubject.value; }
};
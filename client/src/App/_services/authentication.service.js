import { BehaviorSubject } from 'rxjs';
import { useHistory} from 'react-router-dom';
import axios from 'axios';


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};



function login(username, password) {

    // let history = useHistory();

    return axios.put('/api/Users/login', {
        name: username,
        password: password
    }).then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        // history.replace('/')
        return user;
    });
}

function logout() {

    // let history = useHistory();
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    console.log('bye')
    history.replace('/')
    currentUserSubject.next(null);
    history.replace('/')
}

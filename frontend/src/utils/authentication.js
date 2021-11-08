import jwt_decode from 'jwt-decode';

const isTokenExpired = ()=> {
    const token = localStorage.getItem('accessToken');
    if (token) {
        let decoded = jwt_decode(token);
        let now = new Date();
        return decoded.exp < Math.round(now.getTime()) / 1000;
    };
    return true;
    
};

const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
};

const isAuthenticated = () => JSON.parse(localStorage.getItem('isAuthenticated')) && !isTokenExpired();

const getUserInfo = () => {
    const accessToken = localStorage.getItem('accessToken');
    const decoded = jwt_decode(accessToken);
    return decoded;
};

export { logout, isAuthenticated, getUserInfo };
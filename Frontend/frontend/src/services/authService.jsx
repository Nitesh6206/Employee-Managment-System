import axios from 'axios';

export const login = async (username, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    console.log(response.data)
    return response.data;
};

export const signup = async (username,email,password) => {
    const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email,password });
    return response.data;
};

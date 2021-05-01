import axios from 'axios';

export const SignUpInstance = async (data) => {
    const config = {
        'Content-type': 'application/json'
    }
    const response = await axios.post('http://localhost:5000/api/auth/signup', data, config)

    return response;
}
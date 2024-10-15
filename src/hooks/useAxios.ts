import axios from 'axios';

axios.defaults.baseURL = 'https://marketplace-backend-production-d4eb.up.railway.app';
//axios.defaults.baseURL = 'http://localhost:3001';

export const useAxios = () => {
    let token: string | null = null;

    const login = async () => {
        try {
            const response = await axios.post('/auth/login', {
                email: 'seller@example.com',
                password: 'Password123!',
            });
            token = response.data.access_token;
            return token;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return null;
        }
    };

    const getProducts = async () => {
        if (!token) {
            token = await login();
            if (!token) {
                throw new Error('No se pudo obtener el token');
            }
        }

        try {
            const response = await axios.get('/product/seller', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    };

    return {
        login,
        getProducts,
    };
};

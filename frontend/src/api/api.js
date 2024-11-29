
const API_BASE_URL = 'http://localhost:3000/api';

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Añade el token si es necesario
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error.message);
        throw error;
    }
};

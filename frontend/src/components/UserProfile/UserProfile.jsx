
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../api/api';

const UserProfile = () => {
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('token'); // Recupera el token
		getUserProfile(token)
			.then((data) => setProfile(data))
			.catch((err) => setError('No se pudo cargar el perfil.'));
	}, []);

	if (error) {
		return <div style={{ color: 'red' }}>{error}</div>;
	}

	if (!profile) {
		return <div>Cargando...</div>;
	}

	return (
		<div>
			<h2>Perfil de Usuario</h2>
			<p><strong>Nombre:</strong> {profile.name}</p>
			<p><strong>Email:</strong> {profile.email}</p>
			<p><strong>Rol:</strong> {profile.role}</p>
		</div>
	);
};

export default UserProfile;


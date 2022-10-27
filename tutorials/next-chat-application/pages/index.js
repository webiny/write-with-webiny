//Path: chat-app/pages/index.js

import { useRouter } from 'next/router';
import { useState } from 'react';

import { MDBBtn } from 'mdb-react-ui-kit';

export default function App() {
	const router = useRouter();
	const [username, setUsername] = useState('');

	const handleClick = e => {
		e.preventDefault();
		if (!username) {
			//Verifying if the username was provided
			alert('Username not provided');
			return;
		}
		router.push({
			//Redirecting the user to the chat page
			pathname: '/chat',
			query: { username }, //Passing the username to the URL
		});
	};
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<form>
					<h1>Chat Application</h1>
					<input
						type="text"
						className="form-control form-control-lg"
						id="username"
						placeholder="Enter Username"
						value={username}
						onChange={e => setUsername(e.target.value)}
					></input>
					<MDBBtn
						type="submit"
						block
						style={{
							backgroundColor: '#e7653d',
							margin: '10px 0 0 0',
						}}
						onClick={handleClick}
					>
						Join Chat
					</MDBBtn>
				</form>
			</div>
		</>
	);
}

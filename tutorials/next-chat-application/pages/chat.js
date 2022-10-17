//Path: chat-app/pages/chat.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';

import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import ActiveUsers from '../components/ActiveUsers';
import Messages from '../components/Messages';

import io from 'socket.io-client';

let socket;

import { gql, useMutation } from '@apollo/client';

const POST_ACTIVE_USER = gql`
	mutation CreateActiveUser($activeUsers: String!) {
		createActiveUsers(data: { activeUsers: $activeUsers }) {
			data {
				id
			}
		}
	}
`;

const PUBLISH_ACTIVE_USER = gql`
	mutation PublishActiveUsers($revision: ID!) {
		publishActiveUsers(revision: $revision) {
			data {
				id
			}
		}
	}
`;

const POST_CHAT = gql`
	mutation ($chats: String!, $time: DateTime!, $user: String!) {
		createChats(data: { chats: $chats, time: $time, user: $user }) {
			data {
				id
			}
		}
	}
`;

const PUBLISH_CHAT = gql`
	mutation ($revision: ID!) {
		publishChats(revision: $revision) {
			data {
				id
				chats
				time
				user
			}
		}
	}
`;
export default function App() {
	const [postActiveUsers] = useMutation(POST_ACTIVE_USER, {
		context: { endpointType: 'manage' },
	});

	const [publishActiveUsers] = useMutation(PUBLISH_ACTIVE_USER, {
		context: { endpointType: 'manage' },
	});
	const [postChat] = useMutation(POST_CHAT, {
		context: { endpointType: 'manage' },
	});
	const [publishChat] = useMutation(PUBLISH_CHAT, {
		context: { endpointType: 'manage' },
	});

	const [username, setUsername] = useState('');
	const [activeUsers, setActiveUsers] = useState([]);

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			if (!router.query.username) {
				console.log('Not Available');
				router.push('/');
			}
			setUsername(router.query.username.toLowerCase()); //Storing the username
		}
		if (typeof window === 'undefined') {
			return;
		}
	}, [router.isReady, username]);

	useEffect(() => {
		username && socketInitializer();
	}, [username]);

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const handleMessage = value => {
		setMessage(value);
	};
	const handleSubmit = async () => {
		//OnSubmit event handler
		await postChat({
			variables: {
				chats: message, //Passing the message
				time: new Date().toISOString(), //Passing the current Date
				user: username,
			},
		})
			.then(({ data }) => {
				publishChat({
					variables: {
						revision: data.createChats.data.id, //Publishing the message
					},
				}).then(data => {
					socket.emit(
						'send-message',
						{ message: data.data.publishChats.data }, //Emiting the message
						err => {
							if (err) alert(err);
						}
					);
					console.log('Done', data);
					setMessage('');
				});
			})
			.catch(err => {
				alert(err.message);
				console.log(err);
			});
	};

	const socketInitializer = async () => {
		await fetch('/api/socket');
		socket = io();

		socket.on('connect', async () => {
			await postActiveUsers({
				variables: {
					activeUsers: username, //Passing the username
				},
			})
				.then(({ data }) => {
					if (data.createActiveUsers.data === null) {
						alert('Username taken');
						router.push('/');
						return;
					}
					publishActiveUsers({
						variables: {
							revision: data.createActiveUsers.data.id, //Publishing the username
						},
					});
					socket.emit('join', { username }, err => {
						if (err) alert(err);
					});
					console.log('Done');
				})
				.catch(err => {
					alert(err.message);
					console.log(err);
				});
			socket.on('activeusers', data => {
				setActiveUsers(data);
			}); //Waiting to receive activeUsers
			socket.on('messages', data => {
				//Waiting to receive the messages
				setMessages(data.messages);
			});
		});
	};

	return (
		<>
			<Head>
				<title>Chat Application</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<link
					href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<MDBContainer
				fluid
				className="py-5"
				style={{ backgroundColor: '#eee' }}
			>
				<MDBRow>
					<ActiveUsers activeUsers={activeUsers} />
					<Messages
						handleMessage={handleMessage}
						message={message}
						messages={messages}
						username={username}
						handleSubmit={handleSubmit}
					/>
				</MDBRow>
			</MDBContainer>
		</>
	);
}

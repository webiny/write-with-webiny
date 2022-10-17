import { Server } from 'socket.io';
let messages = [];
const getRequest = async () => {
	await fetch(process.env.WEBINY_READ_URL, {
		//Fetching the active users
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.WEBINY_READ_TOKEN}`, //Passing the token
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			//Adding the graphql query
			query: `
				{
  		 listChats(sort: createdOn_ASC, limit: 20) {
    		data {
      		chats
      		time
      		user
    		}
  }
			}

		`,
		}),
	})
		.then(res => res.json())
		.then(result => {
			messages = result.data.listChats.data;
			//Storing the messages got from Webiny in the messages array
		})
		.catch(err => console.log(err.message));
};
export default async function chatSocket(req, res) {
	if (res.socket.server.io) {
		console.log('Socket is already running');
	} else {
		console.log('Socket is initializing');
		const io = new Server(res.socket.server);
		res.socket.server.io = io; //Creating a new Server instance
		let activeUsers = []; //Active Users
		io.on('connection', socket => {
			// Listening for a connection
			socket.on('join', async ({ username }) => {
				//Listening for a join event
				console.log('a user connected');
				socket.join('group'); //Adding the user to group

				await fetch(process.env.WEBINY_READ_URL, {
					//Fetching the active users
					method: 'POST',
					headers: {
						Authorization: `Bearer ${process.env.WEBINY_READ_TOKEN}`, //Passing the token
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						//Adding the graphql query
						query: `
				{
  		listActiveUsers(limit: 1000) {
   			 data {
    		  activeUsers
    		}
 			}
			}

		`,
					}),
				})
					.then(res => res.json())
					.then(result => {
						activeUsers = result.data.listActiveUsers.data;
						//Storing the users got from Webiny in the activeUsers array
						let check = activeUsers
							.map(item => item.activeUsers)
							.includes(username);
						check
							? null
							: activeUsers.push({ activeUsers: username }); //Storing just-joined user;
					})
					.catch(err => console.log(err.message));
				await getRequest();
				socket.emit('messages', { messages });
				socket.emit('activeusers', { activeUsers }); //Sending the list of active users to the just-joined user
				socket.broadcast.to('group').emit('activeusers', {
					//Sending the list of active users to existing users
					activeUsers,
				});
			});
			socket.on('send-message', async ({ message }) => {
				await getRequest();
				socket.emit('messages', { messages });
				socket.broadcast.to('group').emit('messages', {
					//Sending the messages
					messages,
				});
			});
		});
	}
	res.end();
}

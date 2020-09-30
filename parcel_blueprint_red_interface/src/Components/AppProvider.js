import React, { useState, useEffect, createContext } from 'react';
import { usePath } from 'hookrouter';

export const AppContext = createContext()
export default function(props) {
	const path = usePath();
	
	const [ route, setRoute ] = useState('dashboard');
	const [ sidebar, setSidebar ] = useState(true); 
	
	/*Websocket Com's */
	const [ rs, setRs ] = useState(0);
	const [ ws, setWs ] = useState(null);
	
	const request = async (type,data) => {
		let payload = {
			jwt: '^vAr^',
			type,
			data
		};
		ws.send(JSON.stringify(payload));
	}	
	
	const heartbeat = async (ws) => {
		setTimeout(
			function() {
				//console.log(ws.readyState);
				/*  0 	CONNECTING 	Socket has been created. The connection is not yet open.
					1 	OPEN 	The connection is open and ready to communicate.
					2 	CLOSING 	The connection is in the process of closing.
					3 	CLOSED 	The connection is closed or couldn't be opened.	
				*/
				if (rs !== ws.readyState) { setRs(ws.readyState); }
				heartbeat(ws);				
			}
			.bind(this),
			1000
		)
	}
	
	const configureWebsocket = async () => {
		ws.onopen = function(open_event) {
			console.log(open_event);
			ws.onmessage = function(msg_event) {
				console.log(msg_event);
				
				let tjo = JSON.parse(msg_event.data);
				
				switch(tjo['type']) {
					case "test-response-from-node-server":
						console.log(tjo['data']);
						break;
					default:
						break;
				}				
				
			}
			ws.onclose = function(close_event) {
				console.log(close_event);
			}
			ws.onerror = function(error_event) {
				console.log(error_event);
			}
			
			request('node-client-test-msg','hello go server form client');
		}

	}
	
	
	
	useEffect(() => {
		if(ws === null) { setWs(new WebSocket('wss://oauth.pr0con.io:1300/ws'));}
		if(ws !== null && rs === 0) { configureWebsocket(); heartbeat(ws); }
	},[ws, rs]);
	
	
	useEffect(() => {
		console.log(path);
	},[path])
	
	return(
		<AppContext.Provider value={{
			path,
			sidebar,
			setSidebar,
			
			rs,
		}}>
			{props.children}
		</AppContext.Provider>
	)
}
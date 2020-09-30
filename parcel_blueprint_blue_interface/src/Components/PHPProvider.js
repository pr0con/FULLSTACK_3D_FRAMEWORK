import React, { useState, useEffect, createContext } from 'react';

export const PHPContext = createContext()
export default function(props) {
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
					case "test-response-from-php-server":
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
			
			request('php-client-test-msg','hello php server form client');
		}
	}
	
	
	useEffect(() => {
		if(ws === null) { setWs(new WebSocket('wss://oauth.pr0con.io:1701/'));}
		if(ws !== null && rs === 0) { configureWebsocket(); heartbeat(ws); }
	},[ws, rs]);
			
	return(
		<PHPContext.Provider value={{
			rs,
		}}>
			{props.children}
		</PHPContext.Provider>
		
	)
}
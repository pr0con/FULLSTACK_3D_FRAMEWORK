#native packages
import ssl
import json
import asyncio
import logging

#3rd party packages
import websockets

#Our Packages
import py_modz;

WEB_SOCKET_CLIENTS = set()

async def register(websocket):
	WEB_SOCKET_CLIENTS.add(websocket)
	
async def unregister(websocket):
	WEB_SOCKET_CLIENTS.remove(websocket)
	await websocket.close();
	
async def send_ws_packet(websocket,type,data):
		wsPkt = {}
		wsPkt['type'] = type
		wsPkt['data'] = data
		json_data = json.dumps(wsPkt)
		await websocket.send(json_data)	
	
async def consumer(websocket, path): #could add extra logic based on paths
	try:
		async for message in websocket:
			tjo = json.loads(message)
		
			if tjo["type"] == "python-client-test-msg":
				print(tjo['data'])
				await send_ws_packet(websocket,'test-response-from-python-server', 'Hello From Python Server')
			
	except:
		print("Something went horribly wrong!")
	finally:
		if websocket in WEB_SOCKET_CLIENTS:
			await unregister(websocket)
		elif websocket.closed == True:	
			del websocket
		else:
			py_modz.dump(websocket)
		
async def handler(websocket, path):
		await register(websocket)
		consumer_task = asyncio.ensure_future(consumer(websocket,path))	
		done, pending = await asyncio.wait([consumer_task], return_when=asyncio.FIRST_COMPLETED)
		for task in pending:
			task.cancel()
		
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain('/etc/letsencrypt/live/oauth.pr0con.io/cert.pem','/etc/letsencrypt/live/oauth.pr0con.io/privkey.pem')

server = websockets.serve(handler, 'oauth.pr0con.io', 1600, ssl=ssl_context)

print("Python listening | 0.0.0.0:1600")
asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
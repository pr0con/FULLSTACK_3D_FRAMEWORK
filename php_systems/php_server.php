<?php
	use Swoole\WebSocket\Server;
	use Swoole\Http\Request;
	use Swoole\WebSockeet\Frame;	

	//CHALLENGE ONE
	//Figure out how to maintain connection
	$server = new Server("127.0.0.1", 1700);
	
	$server->on("start", function(Server $server) {
		echo "Swoole WebSocket Server is running on 127.0.0.1:1700\n";
	});
	
	$server->on("open", function(Server $server, Swoole\Http\Request $request) {
		echo "Swoole WebSocket Server is running on 127.0.0.1:1700\n";
		
		/* UNCOMMENT TO SEND PERIOD DATA 
		$server->tick(1000, function() use($server, $request) {
			$server->push($request->fd, json_encode(["PHP-WS-PING", time()]));
		});
		*/
	});
	
	$server->on("message", function(Server $server, Swoole\WebSocket\Frame $frame) {
		echo "message rcvd: {$frame->data}\n";
		//CHALLENGE TWO CONVERT $frame->data to actual json object
		//switch off message type, send accordingly data back
		$server->push($frame->fd, json_encode(["hello from php server", time()]));
	});
	
	$server->on("close", function(Server $server, int $fd) {
		echo "connection close: {$fd}\n";
	});	

$server->start();
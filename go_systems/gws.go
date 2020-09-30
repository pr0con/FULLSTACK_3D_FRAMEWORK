package main

import(
	//Native packagess
	"fmt"
	"flag"
	"net/http"
	
	//3rd party packages
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	
	//Our Packages
	"procon_data"
)

var addr = flag.String("addr", "0.0.0.0:1200", "http / websocket service bindings.") 
var upgrader = websocket.Upgrader{}


func handleAPI(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		//r.Origin == correct domain
		//fmt.Println(r.Origin)
		return true
	}
	
	c, err := upgrader.Upgrade(w,r, nil)
	if err != nil {
		fmt.Println("Something went horribly wrong.");
		return
	}
	
	Loop:
		for {
			in := procon_data.Msg{}
			err := c.ReadJSON(&in)
			if err != nil {
				c.Close();
				break Loop
			}
			
			switch(in.Type) {
				case "go-client-test-msg":
					fmt.Println(in.Data);
					procon_data.SendMsg("^vAr^", "test-response-from-go-server", "Hello From Go Server!!!" , c) 
					break;
				default:
					break;
			}
		}
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/ws", handleAPI)
	
	fmt.Println("Server Running | 0.0.0.0:1200")
	http.ListenAndServeTLS(*addr, "/etc/letsencrypt/live/oauth.pr0con.io/fullchain.pem","/etc/letsencrypt/live/oauth.pr0con.io/privkey.pem", r)
}
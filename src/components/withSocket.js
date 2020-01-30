import React from 'react'
import socketIOClient from "socket.io-client";
const CHAT_API = 'http://localhost:3333/'

export default function withSocket(WrappedComponent, selectData) {
    return class extends React.Component {

        constructor(props) {
            super(props)
        
            this.state = {
                messages: [],
                users: [],
                registered: false,
                error: false
           }

           this.registerUser = this.registerUser.bind(this)
           this.disconnect = this.disconnect.bind(this)
           this.sendMessage = this.sendMessage.bind(this)
        }

        componentDidMount() {
            this.socket = socketIOClient(CHAT_API);
    
            this.socket.on('connect', (data) => {
                console.log('Connected to chat server')
            })
    
            this.socket.on("registerCallback", (isSuccessful) => {
                console.log('Registration Callback', isSuccessful)
                
                this.setState({
                    registered: isSuccessful,
                    error: isSuccessful
                })

                if(isSuccessful) {
                    this.socket.on("chatMessageResponse", (messageObj) => {
                        
                        let old = this.markMessagesAsOld([...this.state.messages])
                        let filtered = this.filterMessages([...old, messageObj])
                        this.setState({ messages: filtered})
                        console.log(this.state.messages)
                    })
                }
            });

            this.socket.on('userList', (users) => {
                this.setState({
                    users: users
                })
            })
        }

        markMessagesAsOld(messages) {
            let updated = []
            for (let i = 0; i < messages.length; i++) {
                const msg = messages[i];
                msg.isNew = false
                updated.push(msg)
            }

            return updated;
        }

        filterMessages(messages) {
            if(messages.length > 20) {
                messages.shift()
            }

            return messages;
        }

        sendMessage(user, message) {
            this.socket.emit('chatMessageRequest', user, message)
        }

        disconnect(name) {
            this.socket.disconnect()
        }

        registerUser(user) {
            this.socket.emit('registerUser', user)
        }

        render() {
            return <WrappedComponent 
                messages={this.state.messages}
                users={this.state.users}
                registered={this.state.registered}
                error={this.state.error}
                registerUser={this.registerUser}
                disconnect={this.disconnect}
                sendMessage={this.sendMessage}
                {...this.props} />;
        }
        

    }
}
import React, { Component } from 'react'

export default class Chatroom extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            message: ''
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onMessageChange = this.onMessageChange.bind(this)
        this.onMessageSubmit = this.onMessageSubmit.bind(this)
        this.onNameSubmit = this.onNameSubmit.bind(this)
    }

    componentWillUnmount() {
        this.disconnect(this.state.name)
    }

    renderNewUserForm() {
        return (
            <div className='new-user-form'>
                <h1>Welcome to the chat!</h1>
                <input type='text' placeholder='Enter a name' value={this.state.name} onChange={this.onNameChange} />
                <button onClick={this.onNameSubmit}>Start chatting</button>
            </div>
        )
    }

    componentDidUpdate() {
        if(this.refs['bottom-msg']) {
            this.refs['bottom-msg'].scrollIntoView({block: 'end', behavior: 'smooth'});
        }
    }

    renderChat() {
        
        return (
            <div className='chat-wrapper'>
                <div className='message-list'>
                    {this.props.messages.map((msg, index) => {
                        console.log(msg, this.state.name)
                        return (
                            <div key={index} className={msg.isConnection ? 'connected-message' : msg.user === this.state.name ? 'chat-message own' : 'chat-message'}>
                                {!msg.isConnection ? <span className='user'>{msg.user}</span> : ''}
                                <span className='message'>{msg.message}</span>
                            </div>
                        )
                    })}
                    <div ref='bottom-msg' className='bottom-msg'></div>
                </div>

                <form className='chatbox-wrapper' onSubmit={this.onMessageSubmit}>
                    <input className='chatbox' value={this.state.message} onChange={this.onMessageChange} type='text' placeholder='Type your message & press Enter'/>
                </form>
                
            </div>
        )
    }
    
    render() {
        return (
            <div className='chatroom'>
                {!this.props.registered ? this.renderNewUserForm() : this.renderChat()}
            </div>
        )
    }

    onMessageSubmit(event) {
        event.preventDefault()

        if(this.state.message.trim() !== '') {
            this.props.sendMessage(this.state.name, this.state.message)
            this.setState({
                message: ''
            })
        }
    }

    onMessageChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    onNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    onNameSubmit() {
        if(this.state.name !== null && this.state.name.trim() !== '') {
            this.props.registerUser({name: this.state.name})
        }
    }
}

import React, { Component } from 'react'

export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <h1>Lite<span>Chat</span></h1>

                <div className='user-list'>
                    {this.props.users.map((user, index) => {
                        return (
                            <div key={index} className='user'>
                                <img src='/img/profile.png' alt='Profile' />
                                <div className='user-name'>{user}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

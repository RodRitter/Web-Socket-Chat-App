import React from 'react';
import './sass/base.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Sidebar from './components/Sidebar/Sidebar'
import Chatroom from './components/Chatroom/Chatroom'



export default class App extends React.Component {
  
  render() {
    return (
      <div className='wrapper'>

        <div className='external-links'>
          <a href='http://www.ritter.co.za/'><FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio</a>
          <a href='/' target='_blank'> Open another Chat instance <FontAwesomeIcon icon={faArrowRight} /></a>
        </div>

        <div className='chat'>
          <Sidebar {...this.props} />
          <Chatroom {...this.props} />
        </div>
      </div>
      
    )
  }
  
}


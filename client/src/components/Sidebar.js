import React, { useState } from 'react'
import {Tab,Tabs,Button,Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'
import './Sidebar.css'

export default function Sidebar(props)
{
    const {id}=props
    const [activeKey,setActievKey]=useState('Conversations')
    const [modalOpen,setModalOpen]=useState(false)

    const closeModal=()=>{setModalOpen(false)}

    return (
        <div className="sidebar-container">
            <div className="sidebar-tabs-container">
                <Tabs className="sidebar-tabs" activeKey={activeKey} onSelect={(key)=>{setActievKey(key)}}>
                    <Tab eventKey="Conversations" title="Conversations">
                        <Conversations/>
                    </Tab>
                    <Tab eventKey="Contacts" title="Contacts">
                        <Contacts/>
                    </Tab>
                </Tabs>
            </div>
            <div className="sidebar-id p-2 small">
                Your Id: <span className="text-muted">{id}</span>
            </div>
            <Button className="rounded-0" onClick={()=>{setModalOpen(true)}}>New {activeKey}</Button>
            <Modal show={modalOpen} onHide={()=>{setModalOpen(false)}}>
                {activeKey==='Conversations'?
                <NewConversationModal closeModal={closeModal}/>:
                <NewContactModal closeModal={closeModal}/>}
            </Modal>
        </div>
    )
}

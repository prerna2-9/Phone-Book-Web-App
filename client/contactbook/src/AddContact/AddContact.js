import React, { useState, useEffect } from 'react';
import style from './AddContact.module.css';
import Axios from 'axios';

export default function AddContact() {
    const [name, setName] = useState("");
    const [date, setdate] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setPhone([...phone, e.target.value]);
    }

    const handleEmailChange = (e) => {
        setEmail([...email, e.target.value]);
    }

    useEffect(()=>{
        const list = document.getElementById('contacts');
        const br = document.createElement('br');
        const text = document.createTextNode('Phone');
        list.appendChild(text);
        const element = document.createElement('input');
        element.type = 'text'
        element.value = '';
        element.placeholder = '+91 XXXXXXX 7890'
        element.onchange = handleChange;
        list.appendChild(br);
        list.appendChild(element);
        //eslint-disable-next-line
    },[]);

    useEffect(()=>{
        const list = document.getElementById('email');
        const br = document.createElement('br');
        const text = document.createTextNode('Email');
        list.appendChild(text);
        const element = document.createElement('input');
        element.type = 'email'
        element.value = '';
        element.placeholder = 'someone@example.com'
        element.onchange = handleEmailChange;
        list.appendChild(br);
        list.appendChild(element);
        //eslint-disable-next-line
    },[]);

    const handleChild = () => {
        const list = document.getElementById('contacts');
        const br = document.createElement('br');
        const element = document.createElement('input');
        element.type = 'text'
        element.value = ''
        element.placeholder = '+91 XXXXXXX 7890'
        element.onchange = handleChange;
        list.appendChild(br);
        list.appendChild(element);
    }

    const handleChildEmail = () => {
        const list = document.getElementById('email');
        const br = document.createElement('br');
        const element = document.createElement('input');
        element.type = 'email'
        element.value = ''
        element.placeholder = 'someone@example.com'
        element.onchange = handleEmailChange;
        list.appendChild(br);
        list.appendChild(element);
    }

    const handleSave = (e) => {
        Axios.post('/contacts/save',{
            name,
            email,
            phone,
            dob: date,
        })
        .then(({data})=>{
           alert(data.message);
           window.location.href = "/";
        })
        .catch(err=>{
            alert(err);
        })
    }

    return (
        <div className={style.flex}>
            <div>
                <h1>
                    Add Contact
                </h1>
            </div>
            <div>
                <h3>
                    Name
                </h3>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                <h3>
                    Date
                </h3>
                <input type="date" value={date} onChange={(e) => setdate(e.target.value)} />
                <div id="contacts">
                    <span style={{color: 'blue'}} onClick={handleChild}>
                        <i className="fa fa-plus-circle"/>
                    </span>
                </div>
                <div id="email">
                    <span style={{color: 'blue'}} onClick={handleChildEmail}>
                        <i className="fa fa-plus-circle"/>
                    </span>
                </div>
                <button type="button" onClick={handleSave} className={style.save}>
                    Save
                </button>
            </div>
        </div>
    )
}

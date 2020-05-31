import React, { useState } from 'react';
import Axios from 'axios';
import style from './Edit.module.css';

export default function EditContact(props) {
   const { state } = props.location;
   const [name, setname] = useState(state.name);
   const [date, setDate] = useState(state.dob);
   const [phone, setPhone] = useState(state.phone);
   const [email, setEmail] = useState(state.email);

   const deletePhone = (val) => {
        const update = phone.filter(eachPhone => eachPhone !== val);
        setPhone(update);
   }

   const deleteEmail = (val) => {
    const update = email.filter(eachmail => eachmail !== val);
    setEmail(update);
  }

   const handleSave = (id) => {
       Axios.post(`/contacts/update/${id}`,{
           name,
           phone,
           dob: date,
           email: email,
       })
       .then(({data})=>{
           if(data.success) {
             alert('Contact Updated Successfully');
             window.location.href = '/';
           }
            alert('Error While Updating Contact')
        })
       .catch(Err=>{
           alert('Internal Server Error');
       });
   }

   const handlePhone = (val , index) => {
       const newNumber = phone.map((eachNumber, idx)=>{
           if(idx === index) {
               eachNumber = val;
               return val;
           }
           return eachNumber;
       });
       setPhone(newNumber);
   }

   const handleEmail = (val , index) => {
    const newEmail = email.map((eachMail, idx)=>{
        if(idx === index) {
            eachMail = val;
            return val;
        }
        return eachMail;
    });
    setEmail(newEmail);
  }

    return(
       <div className={style.container}>
           <div>
               <h1>
                   Edit Contact
               </h1>
           </div>
           <div>
           <h4>
               Name
           </h4>
           <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
           <br />
           <h4>
             DOB
           </h4>
           <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
           <h4>
               Phone Numbers
           </h4>
           {
               phone.map((eachPhone, index) => {
                   return(
                   <div key={index}>
                        <input type="text" value={eachPhone} onChange={(e)=>handlePhone(e.target.value, index)} />
                        {index !== 0 && ( <i className="fa fa-close" onClick={()=>deletePhone(eachPhone)}/>)}
                   </div>
                   )
               })
           }
           <h4>
               Email
           </h4>
           {
               email.map((eachMail, index) => {
                   return(
                   <div key={index}>
                        <input type="text" value={eachMail} onChange={(e)=>handleEmail(e.target.value, index)} />
                        {index !== 0 && ( <i className="fa fa-close" onClick={()=>deleteEmail(eachMail)}/>)}
                   </div>
                   )
               })
           }
           <button className={style.update} onClick={()=>handleSave(state._id)}>
                Update
           </button>
           </div>
       </div>
   )
}

import React, { useState, useEffect } from 'react';
import { fetchContacts } from '../utils/api';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import style from './Home.module.css';
import Axios from 'axios';

function Home() {
  const [contacts, setContacts] = useState();
  const [loading , setLoading ] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(false);

  useEffect(()=>{
    const fetchData = async (page) => {
      fetchContacts(page)
      .then(data => {
        if (data.success) {
          setTotalPages(data.pages);
          setContacts(data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        throw new Error(err);
      })
    }

    fetchData(page);
  },[page]);

  const handleSearch = (i = 0) => {
    Axios.get(`/contacts/search/${i}/${query}`)
    .then(({data}) =>{
        setTotalPages(data.pages)
        setContacts(data.data)
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  const AddClass = (id) => {
     const element =  document.getElementById(id);
     const classes =  element.className;
     if(classes.includes('active')){
       element.classList = `${style.details} ${style.disable}`
       return 
     }
     element.classList = `${style.details} ${style.active}`
  }

  const handleChange = (e) => {
      setQuery(e.target.value);
      if(query.length > 1) {
        handleSearch();
        setSearch(true);
      }else {
        setSearch(false);
        fetchContacts(page)
        .then(data => {
            if (data.success) {
            setTotalPages(data.pages);
            setContacts(data.data);
            setLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            throw new Error(err);
        })
      }
  }

  const deleteContact = (id) => {
      Axios.delete(`/contacts/delete/${id}`)
      .then(({data})=>{
            if(data.success) return alert('Contact Deleted Successfully');
            alert('Cannot delete the contact');
      })
      .catch(err => {
          console.log(err);
          alert('An error Occurred while deleting the contact');
      });

      const updatedcontacts = contacts.filter(eachContact => eachContact._id !== id);
      setContacts(updatedcontacts);
  } 

  const renderPagination = () => {
      let pagination = [];
      for (let i = 0; i < totalPages; i++ ){
          pagination.push(
             <button onClick={() => setPage(i)}>
                 { i + 1 }
             </button> 
          )
      }

      return pagination;
  }

  const renderSearchPagination = () => {
    let pagination = [];
    for (let i = 0; i < totalPages; i++ ){
        pagination.push(
           <button onClick={() => handleSearch(i)}>
               { i + 1 }
           </button> 
        )
    }

    return pagination;
}

  if (loading) return <h1>Loading ... </h1>

  return (
    <div className={style.flex}>
        <h1 style={{marginBottom: 20}}>
            Contact Book
        </h1>
        <input type="text" style={{marginBottom: 20}} value={query} onChange={handleChange} placeholder="Search Contact here" />
      {
        contacts.map(eachContact => {
          return (
            <div key={eachContact._id} className={style.contactList}>
                <div className={style.contactBox}>
                    <p>
                    {
                        eachContact.name
                    }
                    </p>
                    <span onClick={() => AddClass(eachContact._id)}>
                        <i className="fa fa-sort-down" />
                    </span>
                </div>
                <div className={cx(style.details, style.disable)} id={eachContact._id}>
                    <div className={style.break}>
                        <div style={{textAlign: "left"}}>
                            {
                                eachContact.dob
                            }
                        </div>
                        <div>
                            <Link to={{pathname: `edit/${eachContact._id}`, state: eachContact}} >
                            <button className={style.green}>
                                Edit
                            </button>
                            </Link>
                            <button className={style.danger} onClick={()=>deleteContact(eachContact._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <br />
                    <p>
                       {
                           eachContact.phone.map(eachNumber =>{
                            return (
                                <p key={eachNumber}>
                                        <i className="fa fa-phone" />
                                        &nbsp;
                                        {
                                            eachNumber
                                        }
                                </p>
                            )
                           })
                       } 
                    </p>
                    <p>
                    {
                           eachContact.email.map(eachEmail =>{
                            return (
                                <p key={eachEmail}>
                                        <i className="fa fa-envelope" />
                                        &nbsp;
                                        {
                                            eachEmail
                                        }
                                </p>
                            )
                           })
                       } 
                    </p>
                </div>
            </div>
          )
        })
      }

    <div>
      <span style={{color: 'blue'}}>
        <Link to="/addcontact">
            <i className={cx("fa fa-plus-circle", style.bottomRight)}/>
        </Link>
      </span>
    </div>

    <div className={style.pagination}>
        {
           !search ? renderPagination() : renderSearchPagination()
        }
    </div>
    </div>
  );
}

export default Home;

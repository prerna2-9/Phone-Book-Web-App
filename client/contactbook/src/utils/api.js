import Axios from "axios";

export const fetchContacts = (page) => Axios.get(`/contacts/get/${page}`)
                            .then(({ data }) => {
                                return data;
                            })
                            .catch(err => {
                                console.log(err);
                                return {
                                    err,
                                    success: false,
                                }
                            });
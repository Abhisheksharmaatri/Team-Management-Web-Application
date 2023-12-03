import { react, useState, useEffect } from 'react';
import { backend } from '../../config';

const UpdateUserCard = (props) => { 
    const [user, setUser] = useState(props.user);
    const handleUserUpdate = (e) => {
        e.preventDefault();
        fetch(backend.url + '/users/' + user._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    props.setUpdate(true)
                } else {
                    props.setMessage(data.message);
                    console.log(data.error);
                }
            })
            .catch((error) => {
                props.setMessage(error.message);
                console.log(error);
            })
     }
    return (
        <div>
            <form onSubmit={handleUserUpdate}>
                <label>
                    First Name:
                    <input type="text" value={ user.firstName} onChange={e => setUser({ ... user, firstName: e.target.value })} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={ user.lastName} onChange={e => setUser({ ... user, lastName: e.target.value })} />
                </label>
                <label>
                    Domain:
                    <input type="text" value={ user.domain} onChange={e => setUser({ ... user, domain: e.target.value })} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default UpdateUserCard;
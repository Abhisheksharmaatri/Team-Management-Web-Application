import { react, useState, useEffect } from 'react';
import { backend } from '../../config';
import UpdateUserCard from './UpdateUserCard';
const UserCard = (props) => { 
    const [userUpdate, setUserUpdate] = useState(false);
    const handleDelete = () => {
        fetch(backend.url + '/users/' + props.user._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    // window.location.href = '/users';
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
    const handleUpdate = () => {
        setUserUpdate(true);
     }

    return (
        <div className='UserCard'>
            <li key={props.user._id}>
                <label>
                    <b>Name: </b> {props.user.firstName} {props.user.lastName}
                </label>
                <label>
                    <b>Domain: </b> {props.user.domain}
                    </label>
                <label>
                    <b>Email: </b> {props.user.email}
                </label>
                <div className='UserCardActions'>
                    <button onClick={handleDelete}>Delete</button>
                    <button className='btn-red' onClick={handleUpdate}>Update</button>
                    {props.user. available === true ? <button className='btn-green'>available</button> : <button className='btn-red'>Not available</button>}
                </div>
                {userUpdate === true ? <UpdateUserCard user={props.user} setUpdate={props.setUpdate} setMessage={props.setMessage} /> : null}
            </li>
        </div>
    )
};

export default UserCard;
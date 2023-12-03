import React, { useEffect, useState } from 'react';
import { backend } from '../../config';

import UserCard from './UserCard';
const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false); // [1]
    const [filters, setFilters] = useState({
        firstName: '',
        lastName: '',
        domain: '',
        gender: '',
        available: ''
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(filters);

        fetch(`${backend.url}/users?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUsers(data.data);
                    setUpdate(false);
                } else {
                    setMessage(data.message);
                }
            })
            .catch((error) => {
                setMessage(error.message);
                console.log(error);
            });
    }, [filters, update]);

    const handleFilterChange = (event) => {
        console.log(update)
        setUpdate(true);
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    return (
        <div className='UserList'>
            <div className='UserListFilter'>
                <h1>User List</h1>
                <div className='UserListName'>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" onChange={handleFilterChange} />
                    </div>

                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" onChange={handleFilterChange} />
                    </div>
                </div>

                <div>
                    <label>Domain:</label>
                    <select name="domain" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {props.domain.map((domain) => {
                            return <option key={domain.id} value={domain.name}>{domain.name}</option>
                        })}
                    </select>
                    <input type="text" name="domain" placeholder="Or type your own" onChange={handleFilterChange} />
                </div>

                <div className='UserListName'>
                    <div>
                        <label>
                        Gender:
                            <select name="gender" onChange={handleFilterChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Available:</label>
                        <select name="available" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            </div>
            <ul>
                {users.map((user) => {
                    return <UserCard key={user._id } user={user} setMessage={setMessage} setUpdate={setUpdate} />;
                })}
            </ul>
        </div>
    );
};

export default UserList;


// import React, { useEffect, useState } from 'react';
// import { backend } from '../config';

// const UserList = (props) => {
//     const [users, setUsers] = useState([]);
//     const [message, setMessage] = useState('');

//     useEffect(() => { 
//         fetch(backend.url + '/users', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': localStorage.getItem('token')
//             }
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 if (data.success) {
//                     setUsers(data.data);
//                 } else {
//                     setMessage(data.message);
//                 }
//             })
//             .catch((error) => {
//                 setMessage(error.message);
//                 console.log(error);
//         })
//     }, [])
//     return (
//         <div>
//             <h1>User List</h1>
//             <ul>
//                 {users.map(user => {
//                     return <li key={user._id}>{user.firstName} {user.lastName}</li>
//                 })}
//             </ul>
//         </div>
//     )
// };

// export default UserList;
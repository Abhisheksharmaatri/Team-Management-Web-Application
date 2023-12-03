import { reacr, useEffect, useState } from 'react';
import { user, team, backend } from '../../config';

const ChooseUser = (props) => {
    const [users, setUsers] = useState([]);
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
                    props.setMessage(data.message);
                }
            })
            .catch((error) => {
                props.setMessage(error.message);
                console.log(error);
            });
    }, [filters, update]);

    

    const handleFilterChange = (event) => {
        console.log(update)
        setUpdate(true);
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    return (
        <div>
            
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" onChange={handleFilterChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" onChange={handleFilterChange} />
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

            <label>
            Gender:
            <select name="gender" onChange={handleFilterChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
            <div>
                <label>Available:</label>
                <select name="available" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <select name="owner" onChange={(e) => {
                props.setOwner(e.target.value);
                console.log('value:', e.target.value);
            }}>
                <option value="">Select a user</option>
                    {users.map((user) => {
                        return <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                    }
                    )}
                </select>
        </div>
    )
};

export default ChooseUser;
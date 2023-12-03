import { react, useEffect, useState } from 'react';
import { user, team, backend } from '../../config';

const AddMember = (props) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState('');

    const [member, setMember] = useState('');

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
    }, [update]);

    const handleFilterChange = (event) => {
        setUpdate(true);
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
    
        const body = {
            userId: member
        };

        try {
            fetch(`${backend.url}/teams/${props.team._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setMessage('Team created successfully!');
                    } else {
                        setError(data.message);
                    }
                });
        }
        catch (error) {
            setError(error.message);
            console.log(error);
        };
    }

    return (
        <div>
            <h1>Add Member</h1>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label>Member:</label>
                    <select name="member" onChange={(e)=> setMember(e.target.value)}>
                        <option value="">All</option>
                        {users.map((user) => {
                            return <option key={user._id} value={user._id}>{user.firstName+user.lastName}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <div>
                {message}
                {error}
            </div>
        </div>
    );
 };

export default AddMember;
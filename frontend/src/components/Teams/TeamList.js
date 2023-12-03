import { react, useEffect, useState } from 'react';
import { user, team, backend } from '../../config';

import TeamCard from './TeamCard';
const TeamList = (props) => { 
    const [teams, setTeams] = useState([]);
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const [filters, setFilters] = useState({
        name: '',
        owner: '',
    });
    
    useEffect(() => {
        const queryParams = new URLSearchParams(filters);

        fetch(`${backend.url}/teams?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTeams(data.data);
                    setUpdate(false);
                } else {
                    setMessage(data.message);
                }
            })
            .catch((error) => {
                setMessage(error.message);
                console.log(error);
            });
    }, [filters, update, props.update]);

    const handleFilterChange = (event) => {
        setUpdate(true);
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    return (
        <div className='teamList'>
            <h1>Team List</h1>
            <div>
                <label>Team Name:</label>
                <input type="text" name="name" onChange={handleFilterChange} />
            </div>
            <div>
                <label>Team Owner:</label>
                <input type="text" name="owner" onChange={handleFilterChange} />
            </div>
            <div>
                {teams.map((team) => {
                    return (
                        <TeamCard key={team._id} team={team} setUpdate={setUpdate} setMessage={setMessage} domain={props.domain} />
                    );
                 })}
            </div>
        </div>
    );
};

export default TeamList;
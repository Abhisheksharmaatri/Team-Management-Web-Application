import { react, useState } from 'react';
import { backend } from '../../config';

import AddMember from './AddMember';
import UpdateTeam from './UpdateTeam';

const TeamCard = (props) => {
    const [teamUpdate, setTeamUpdate] = useState(false);
    const [message, setMessage] = useState('');
    const [addMember, setAddMember] = useState(false);
    const [updateTeam, setUpdateTeam] = useState(false);

    const handleDelete = async (e) => { 
        e.preventDefault();
        setMessage('');
        const teamId = e.target.value;
        try {
            const response = await fetch(`${backend.url}/teams/${props.team._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            if (data.success) {
                props.setUpdate(true);
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
            console.log(error);
        }
    }

    const handleUpdate = () => {
        setTeamUpdate(true);
    }

    return (
        <div className='teamCard'>
            <li key={props.team._id}>
                <label htmlFor="name">Team Name</label> {props.team.name}
                <label htmlFor="description">Team Description</label> {props.team.description}
                <div className='teamCardActions'>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={() => setAddMember(!addMember)}>Add Member</button>
                    {addMember === true ? <AddMember team={props.team} setUpdate={props.setUpdate} setMessage={props.setMessage} domain={props.domain} /> : null}
                    <button onClick={() => setUpdateTeam(!updateTeam)}>Update Team</button>
                    {updateTeam === true ? <UpdateTeam team={props.team} setUpdate={setUpdateTeam} setMessage={props.setMessage} domain={props.domain} /> : null}
                </div>
            </li>
        </div>
    )
};

export default TeamCard;
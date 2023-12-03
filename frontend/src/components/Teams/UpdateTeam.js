import { react, useState } from 'react';
import { user, backend } from '../../config';

const UpdateTeam = (props) => { 
    const [team, setTeam] = useState(props.team);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(backend.url + '/teams/' + team._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(team)
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
        <div className='UpdateTeam'>
            <form onSubmit={handleUpdate}>
                <label>
                    Name:
                    <input type="text" value={ team.name} onChange={e => setTeam({ ... team, name: e.target.value })} />
                </label>
                <label>
                    Description:
                    <input type="text" value={ team.description} onChange={e => setTeam({ ... team, description: e.target.value })} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default UpdateTeam;
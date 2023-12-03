import { react, useEffect, useState } from 'react';
import { user, team, backend } from '../../config';
import ChooseUser from '../Users/ChooseUser';

const CreateTeam = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError('');
        setMessage('');

        if (name.length < team.name.minLength || name.length > team.name.maxLength) {
            return setError('Team name is required');
        }
        if (description.length < team.description.minLength || description.length > team.description.maxLength) {
            return setError('Team description is required');
        }

        if (owner.length === 0) {
            console.log('owner',owner)
            return setError('Team owner is required');
        }

        const createTeam = {
            name,
            description,
            owner,
        };

        try {
            fetch(`${backend.url}/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': user.token,
                },
                body: JSON.stringify(createTeam),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setMessage('Team created successfully!');
                        props.setUpdate(true);
                    } else {
                        setError(data.message);
                    }
                });
        }
        catch (error) {
            setError(error.message);
            console.log(error);
        }
    };


    return (
        <div className ='createTeam'>
            <h1>Create Team</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Team Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br></br>
                <label htmlFor="description">Team Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className='createTeamOwner'>
                    <label htmlFor="owner">Team Owner</label>
                    <ChooseUser domain={props.domain} setMessage={setMessage} setOwner={setOwner} />
                    <button type="submit">Create Team</button>
                </div>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    )
 };

export default CreateTeam;
import { react, useEffect, useState } from 'react';

import '../Style/teams.css'

//Components
import TeamList from '../components/Teams/TeamList';
import CreateTeam from '../components/Teams/CreateTeam';

const Teams = (props) => { 
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        setUpdate(false);
    }, [update]);
    return (
        <div className='teams'>
            <CreateTeam domain={props.domain} setUpdate={setUpdate} update={update} />
            <TeamList domain={props.domain} setUpdate={setUpdate} update={update} />
        </div>
    )
};

export default Teams;
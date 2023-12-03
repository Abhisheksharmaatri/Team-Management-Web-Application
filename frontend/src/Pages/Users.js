import { react, useEffect , useState} from 'react';

import '../Style/users.css'

import CreateUser from '../components/Users/CreateUser';
import UserList from '../components/Users/UserList';

const Users = (props) => {
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        setUpdate(false);
    }, [update]);
    return (
        <div className='UserPage'>
            <CreateUser domain={props.domain} setUpdate={setUpdate} update={update} />
            <UserList domain={props.domain} setUpdate={setUpdate} update={update} />
        </div>
    )
};

export default Users;
import './Style/app.css';

import Teams from './Pages/Teams';
import Users from './Pages/Users'

import { useEffect, useState } from 'react';
function App() {
  const [page, setPage]=useState('1')
  const [domain, setDomain] = useState([
    { id: 1, name: 'Marketing' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Management' },
    { id: 5, name: 'UI Designing' },
    { id: 6, name: 'Sales'},
    { id: 7, name: 'Business Development' },
  ]);
  useEffect(()=>{},[page])
  return (
    <div className="App">
      <div className='Page'>
        <label>Page: </label>
        <select name="page" onChange={(e)=>{setPage(e.target.value)}}>
          <option value='1'>Users</option>
          <option value='2'>Teams</option>
        </select>
      </div>
      {page === '1' ?
        <Users domain={domain} /> :
        <Teams domain={domain} />
    }
    </div>
  );
}

export default App;

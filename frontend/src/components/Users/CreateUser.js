import React, { useState } from 'react';
import { backend, user } from '../../config';

const CreateUser = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [available, setAvailable] = useState(true);
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (firstName.length > user.name.maxLength || firstName.length < user.name.minLength || lastName.length > user.name.maxLength || lastName.length < user.name.minLength) {
      setMessage(`Error: First and Last name should be between ${user.name.minLength} and ${user.name.maxLength} characters.`);
      return;
    }
    if (domain.length === 0) {
      setMessage('Error: Domain should not be empty.');
      return;
    }
    if (domain.email === 0) {
      setMessage('Error: Domain should not be empty.');
      return;
    }
    if (email.length === 0) {
      setMessage('Error: Email is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Error: Email is wrong.');
      return;
    }

    // Additional validation for other fields can be added

    // Create user object
    const createUser = {
      firstName,
      lastName,
      gender,
      domain,
      email,
    };

    // Send request to the server for sign up
    try {
      fetch(backend.url + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createUser),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setMessage('User created successfully!');
          } else {
            setMessage(`Error: ${data.message}`);
            console.log(data);
          }
        });
    } catch (error) {
      setMessage('Error: Unable to connect to the server.');
    };
  }

    return (
      <div className='CreateUser'>
        <h1>Create User</h1>
        <form>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>

          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>

          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <div>
                <label>Domain:</label>
                <select name="domain" onChange={(e) => setDomain(e.target.value)}>
                    {props.domain.map((domain) => {
                        return <option key={domain.id} value={domain.name}>{domain.name}</option>
                     })}
                    {/* <option value="default">Select a domain</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option> */}
                </select>
                <input type="text" name="domain" placeholder="Or type your own" onChange={(e) => setDomain(e.target.value)} />
          </div>
          
          {/* <label>
            Domain:
            <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
          </label> */}

          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </form>
        <button onClick={handleSubmit}>Create User</button>
        <div className='CreateUserMessage'>{message}</div>
      </div>
    );
};


export default CreateUser;

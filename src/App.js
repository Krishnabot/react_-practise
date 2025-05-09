import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from './store';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submissions = useSelector((state) => state.form.submissions);

  const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(submitForm({ username, email, age, password }));
  alert(`Submission successful! \nUsername: ${username}\nEmail: ${email}\nAge: ${age}`);
  setUsername('');
  setEmail('');
  setAge('');
  setPassword('');
};


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Demo Form (Redux Toolkit)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Submit</button>
      </form>

      <h3>Submissions:</h3>
      <ul>
        {submissions.map((entry, index) => (
          <li key={index}>
            {entry.username} | {entry.email} | {entry.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

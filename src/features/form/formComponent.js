import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm, clearSubmissions } from "./formSlice";
import { useSubmitFormMutation } from "../../api/apiSlice";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1em;
  padding: 0.5em;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  margin-right: 0.5em;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

const SubmissionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SubmissionItem = styled.li`
  background-color: #f8f9fa;
  margin: 0.5em 0;
  padding: 1em;
  border-radius: 5px;
`;

const ConfirmationBox = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  padding: 1em;
  margin-top: 1em;
  border-radius: 5px;
`;

export const FormComponent = () => {
  const dispatch = useDispatch();
  const submissions = useSelector((state) => state.form.submissions);
  const [submitFormMutation, { isLoading, isError, isSuccess, error }] = useSubmitFormMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setUsername(savedData.username || "");
      setEmail(savedData.email || "");
      setAge(savedData.age || "");
    }
  }, []);

  // Save to localStorage whenever username, email, or age changes
  useEffect(() => {
    const dataToSave = { username, email, age };
    localStorage.setItem("formData", JSON.stringify(dataToSave));
  }, [username, email, age]);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    const startTime = performance.now();
    try {
      await submitFormMutation({ username, email, age }).unwrap();
      const endTime = performance.now();
      const elapsed = (endTime - startTime).toFixed(2);
      console.log(`✅ RTK Query: /submissions took ${elapsed} ms`);

      dispatch(submitForm({ username, email, age, password }));
      setPassword('');
      setShowConfirmation(false);

      setTimeout(() => {
        dispatch(clearSubmissions());
      }, 5000);
    } catch (err) {
      const endTime = performance.now();
      const elapsed = (endTime - startTime).toFixed(2);
      console.error(`❌ RTK Query failed in ${elapsed} ms:`, err);
      alert(`Error submitting to backend: ${err.message}`);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  return (
    <FormContainer>
      <h2>Demo Form (RTK Query + Redux + Styled Components + LocalStorage)</h2>
      <form onSubmit={handleInitialSubmit}>
        <label>Username:</label>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email:</label>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Age:</label>
        <Input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <label>Password:</label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>

      {showConfirmation && (
        <ConfirmationBox>
          <p>
            <strong>Confirm Submission:</strong>
          </p>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <p>Age: {age}</p>
          <Button onClick={confirmSubmit} disabled={isLoading}>
            Yes, Submit
          </Button>
          <CancelButton onClick={cancelSubmit} disabled={isLoading}>
            Cancel
          </CancelButton>
        </ConfirmationBox>
      )}

      {isError && (
        <p style={{ color: 'red' }}>Error: {error?.message || 'Unknown error'}</p>
      )}
      {isSuccess && (
        <p style={{ color: 'green' }}>Submission successful!</p>
      )}

      {submissions.length > 0 && (
        <>
          <h3>Submissions (auto-clears in 5 sec):</h3>
          <SubmissionList>
            {submissions.map((submission, index) => (
              <SubmissionItem key={index}>
                Username: {submission.username}, Email: {submission.email}, Age:{" "}
                {submission.age}
              </SubmissionItem>
            ))}
          </SubmissionList>
        </>
      )}
    </FormContainer>
  );
};

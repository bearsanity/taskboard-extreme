import { useState } from 'react';

// standard regex email validation
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
};



const CreateTask = () => {
    //=================== Hooks ===================
    const [title, setTitle] = useState('');
    const [frequency, setFrequency] = useState('');
    const [dueDate, setdueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [group, setGroup] = useState('');
    const [errorMessageTitle, setErrorMessageTitle] = useState('');
    const [errorMessageFrequency, setErrorMessageFrequency] = useState('');
    const [errorMessageDueDate, setErrorMessageDueDate] = useState('');
    const [errorMessagePriority, setErrorMessagePriority] = useState('');
    //const [errorMessageGroup, setErrorMessageGroup] = useState('');

    function handleBlur(e) {
        if (e.target.name === 'nameInput') {
            if (e.target.value.trim().length === 0) {
                setErrorMessageName("This field can't be empty.");
            } else {
                setErrorMessageName('');
            }
        }
        if (e.target.name === 'emailInput') {
            if (e.target.value.trim().length === 0) {
                setErrorMessageEmail("This field can't be empty.");
            } else if (!validateEmail(e.target.value)) {
                setErrorMessageEmail('Not a valid email.');
            } else {
                setErrorMessageEmail('');
            }
        }
        if (e.target.name === 'passwordInput') {
            if (e.target.value.trim().length === 0) {
                setErrorMessagePassword("This field can't be empty.");
            } else {
                setErrorMessagePassword('');
            }
        }

    };

    // sends the email&pass to the server, if its succesful it will send back a token
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/auth/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        const data = await response.json();
        console.log(data);
        const token = data.token;
        localStorage.setItem('token', token);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>
                Name: <input name="nameInput" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleBlur} />
                {errorMessageName && <p className="error-message">{errorMessageName}</p>}
            </label>
            <label>
                Email: <input name="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur} />
                {errorMessageEmail && <p className="error-message">{errorMessageEmail}</p>}
            </label>
            <label>
                Password: <input name="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleBlur} />
                {errorMessagePassword && <p className="error-message">{errorMessagePassword}</p>}
            </label>
            <button className="submitButton" type="button" onClick={handleSubmit}>Submit</button>
            <button className="cancelButton" type="button">Cancel</button>
        </form>
    )
}

export default SignUp;
import React, { useEffect, useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState([""]);
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("")
  const registeredEmails = ["harsh@gmail.com", "indo@gmail.com" ];

  const [emailError, setEmailError] = useState("");

  const handleSkillChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleEmailChange = (value) => {
    setEmail(value);

    if (registeredEmails.includes(value.trim())) {
      setEmailError("User is already registered");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    console.log("run");
  }, [count]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !password.trim()) {
      alert("name and password are required");
      return;
    }

     if (emailError) {
      alert("Cannot submit: user already registered.");
      return;
    }

    const nonEmptySkills = skills.filter((s) => s.trim() !== "");

    console.log("Form submitted:", {
      name,
      password,
      skills: nonEmptySkills,
    });

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"   // REQUIRED
      },
      body: JSON.stringify({
        name,
        password,
        skills: nonEmptySkills,
        email,
      })
    })
      .then((response) => {
        if (!response.ok) {
         return response.json();
        } 
         
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:',error)) 
  };

return (
  <div>
    {count}
    <button type="button" onClick={() => setCount(count + 1)}>
      incre
    </button>
    <form onSubmit={handleSubmit}>
      <h2>form</h2>

      <div>
        <label>name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name"
        ></input>
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          
        />
        
      </div>


      <div>
        <label>pass</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your pass"
        ></input>
      </div>

      <div>
        <label>skills</label>
        {skills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="enter skill"
            />
            {skills.length > 1 && (
              <button type="button" onClick={() => removeSkill(index)}>
                delete
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSkill}>
          addSkills
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
);
}
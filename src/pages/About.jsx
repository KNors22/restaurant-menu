const team = [
  { name: "Martin", role: "Owner" },
  { name: "Nicaela", role: "Contributor" },
  { name: "Andrey", role: "Waiter" },
  { name: "Megan", role: "Chef" },
  { name: "Joseph", role: "Contributor" },
  { name: "Mohsen", role: "Contributor" }
];

function About(){
    return (
    <div className="about">
      <h1>Welcome to Martin's Restaurant</h1>
      <p>This is my awesome restaurant since 1981. Please enjoy!</p>

      <h2>Meet the team</h2>
      <ul>
        {team.map((member) => (
          <li key={member.name}>{member.name} — {member.role}</li>
        ))}
      </ul>
    </div>
  )
}

export default About;

import "./style.css";
function creatTeamRequest(team) {
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify()team{
     
  });
}

function getTeamAsHTML(team) {
  return `<tr>
  <td>${team.promotion}</td>
  <th>${team.members}</th>
  <td>${team.name}</td>
  <td>${team.url}</td>
  <td>x</td>
</tr>`;
}

function renderTeams(teams) {
  //console.warn("render", teams);
  const teamsHTML = teams.map(getTeamAsHTML);
  //console.info(teamsHTML);
  document.querySelector("#teamsTable tbody").innerHTML = teamsHTML.join("");
}

function loadTeams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(r => r.json())
    .then(teams => {
      renderTeams(teams);
      return teams;
    });
}

function onSubmit(e) {
  e.preventDefault();
  console.warn("pls save all values");
  let team = {
    promotion: "WON3",
    members: "Your name",
    name: "CV",
    url:https://github.com/nmatei/teams-networking.git
  }
  createTeamRequest();
  window.location.reload();
}

function initEvents() {
  document.querySelector("#teamsForm").addEventListener("submit", onSubmit);
}

initEvents();
loadTeams();

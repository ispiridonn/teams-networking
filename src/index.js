import "./style.css";
function creatTeamRequest(team) {
  fetch("http://localhost:3000/teams-json/create", 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team) {
     
  });
}
 function deleteTeamRequest(id) {
  fetch("http://localhost:3000/teams-json/delete", {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json"
   },
  body: JSON.stringify({ id: id })
 });
 }
 

function getTeamAsHTML(team) {
  return `<tr>
  <td>${team.promotion}</td>
  <th>${team.members}</th>
  <td>${team.name}</td>
  <td>${team.url}</td>
  <td>
    <a href ="#" data-id="${team.id}">✖</a>
  </td>
</tr>`;
}

function renderTeams(teams) {
  //console.warn("render", teams);
  const teamsHTML = teams.map(getTeamAsHTML);
  //console.info(teamsHTML);
  $("#teamsTable tbody").innerHTML = teamsHTML.join("");
}

function loadTeams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(r => r.json())
    .then(teams => {
      renderTeams(teams);
      return teams;
    });
}

function $(selector) {
return document.querySelector(selector);
}


function getFormValues() {
  return {
    promotion: $("input[name=promotion]").value,
    members: $("input[name=members]").value,
    name: $("input[name=name]").value,
    url:$("input[name=url]").value,
  }
}

function onSubmit(e) {
  e.preventDefault();
  console.warn("pls save all values");
  let team = getFormValues();
  createTeamRequest();
  window.location.reload();
}

function initEvents() {
 $("#teamsForm").addEventListener("submit", onSubmit);
 $("#teamsTable tbody").addEventListener("click", e => {
  if ( e.target.matches("a")) {
    const id= e.target.dataset.id;
    console.warn("tbody click", id);
    deleteTeamRequest(id);
    window.location.reload();
  }
})
}

initEvents();
loadTeams();

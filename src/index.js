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

 function updateTeamRequest (team) {
  fetch("http://localhost:3000/teams-json/update", {
   method: "PUT",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify(team)
 })
 
 }

function getTeamAsHTML(team) {
  return `<tr>
  <td>${team.promotion}</td>
  <th>${team.members}</th>
  <td>${team.name}</td>
  <td>${team.url}</td>
  <td>
    <a href ="#" data-id="${team.id}" class="detele-btn">✖</a>
    <a href ="#" data-id="${team.id}" class="edit-btn">&#9998;</a>
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
      allTeams = teams;
      return teams;
    });
}

let allTeams = []

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

function setFormValues(team) {
  
    $("input[name=promotion]").value = team.promotion;
    $("input[name=members]").value = team.members;
    $("input[name=name]").value = team.name;
    $("input[name=url]").value = team.url;
  
}

function onSubmit(e) {
  e.preventDefault();
  console.warn("pls save all values");
  let team = getFormValues();
  createTeamRequest();
  window.location.reload();
}

function startEdit(id) {
  const team = allTeams.find((team) => { 
    return id === team.id;
   });
    console.warn("click on edit %o", id, )
    setFormValues(team);
}

function initEvents() {
 $("#teamsForm").addEventListener("submit", onSubmit);
 $("#teamsTable tbody").addEventListener("click", e => {
  if ( e.target.matches("a.delete-btn")) {
    const id= e.target.dataset.id;
    deleteTeamRequest(id);
    window.location.reload();
  } else if ( e.target.matches("a.edit-btn")) {
    e.preventDefault()''
   // const id= e.target.getAttributes("data-id");
   const id= e.target.dataset.id;
   startEdit(id);
  }
})
}

initEvents();
loadTeams();

const fs       = require('fs');
const ejs      = require('ejs');

var projects = JSON.parse(fs.readFileSync('src/_data/projects.json'));
var projectRows = processRows(projects);

html = ''
projectRows.forEach(r => {
  html += '<div class="row">'
  let columnClass = 'column-' + r.length;
  r.forEach(p => {
    html += ejs.render(`
    <div class="column `+columnClass+`">
      <div id="<%=folder%>" class="project">
      <div class="project-title">
        <h1 class="eyebrow">--<%=eyebrow%>--</h1>
        <p><%=title%></p>
        </div>
        <a <% if (url) { %> target="_blank" href="<%=url%>" <% } else { %> <a href="work/<%=folder%>/" <% } %> class="project-img-link"><img alt="<%=title%>" src="assets/work/<%=folder%>/assets/preview.png"/></a>

      </div>
    </div>
    `,{
       folder: p.folder
      ,eyebrow: p.eyebrow
      ,title: p.title
      ,url: p.url
      })
  });
  html += '</div>'
})

fs.writeFileSync('src/_partials/project-grid.html',html);

// FUNCTIONS

function processRows(projects) {
  let rows = [];
  let projectRows = [];

  projects.forEach(p => {
    rows.includes(p.row) ? rows.push() : rows.push(p.row);

  })
  rows.forEach(r => {
    let rowp = []
    projects.forEach(p => {
      p.row == r ? rowp.push(p) : rowp.push();
    })
    projectRows.push(rowp);
  });

  return projectRows;
}

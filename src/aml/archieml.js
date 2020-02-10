const fs       = require('fs');
const ejs      = require('ejs');
const _        = require('underscore');
const amlJSON  = 'src/aml/json/';
var projects = JSON.parse(fs.readFileSync('src/_data/projects.json'));

fs.readdir(amlJSON, (err,files) => {
  files.forEach(file => {
    const projectAML = JSON.parse(fs.readFileSync(amlJSON+file));
    const title = projectAML.title;
    const project = _.find(projects,d=>d.title===title)
    const folder = project.folder;
    const filePathRel = '../../../';

    let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <!--[htmlclean-protect]-->
        <!-- inject:css -->
        <!-- endinject -->
        <!--[/htmlclean-protect]-->
        <%- include('${filePathRel}_partials/meta.html',{title:'`+title+`'}) %>
      </head>
      <body>
        <%- include('${filePathRel}_partials/header.html',{logo: '${filePathRel}assets/logo.png', work: ' active', about:''}) %>

        <div class="project-content" id="project-content-intro">
        `

    html += ejs.render(`
      <h1>${projectAML.title}</h1>
    `)

    html += ejs.render(`
      <% subtitle.forEach(t => { %>
        <p><%=t.value%></p>
      <% }) %>
    `,{subtitle:projectAML.subtitle})

    html += '</div>'

    projectAML.div.forEach(div => {

      if (div.type === 'video') {
        html += ejs.render(`
          <div class="project-image">
            <div class="video-wrapper"  style="padding:56.18% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/<%=video%>?autoplay=1&loop=1&autopause=0&title=0&byline=0&portrait=0&autopause=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
          </div>
        `,{video:div.video})
      }

      else if (div.type === 'image') {
        console.log('image');
      }

      else if (div.type === 'content') {

        let id;
        div.id ? id=' id="'+div.id+'"' : id='';
        html += '<div class="project-content"'+id+'>'
        div.content.forEach((content) => {
          if (content.type === 'project-link') {
            html += ejs.render(`
              <% link.forEach(t => { %>
                <p><a target="_blank" href="https://<%=t%>" class="see-link">See the project →</a></p>
              <% }) %>
            `,{link:content.content})
          }

          if (content.type === 'swiper') {
            html += `<div class="swiper-container">
                     <div class="swiper-wrapper">`;
            html += ejs.render(`
              <% slide.forEach(t => { %>
                <div class="swiper-slide"><img src=/assets/<%=t.img%>><p class="process-text"><%-t.text%></p></div>
              <% }) %>
            `,{slide:content.content})

            // "/assets/process/<%=t.img%>"

            html += `</div>
                     </div>`;
          }

          // if (content.type === 'p') {
          //   // console.log(content.content);
          //   html += ejs.render(`
          //     <% p.forEach(t => { %>
          //       <p><%=t%></p>
          //     <% }) %>
          //   `,{p:content.content})
          // }
          //
          // if (content.type === 'h1') {
          //   // console.log(content.content);
          //   html += ejs.render(`
          //     <% h1.forEach(t => { %>
          //       <h1><%=t%></h1>
          //     <% }) %>
          //   `,{h1:content.content})
          // }

          if (content.type === 'h1' | content.type === 'p') {
            // console.log(content.type);
            html += ejs.render(`
              <% c.forEach(t => { %>
                <<%=type%>><%-t%></<%=type%>>
              <% }) %>
            `,{c:content.content,type:content.type})
          }
        })
        html+='</div>'
      }
    })

    html+=`
        <%- include('${filePathRel}_partials/footer.html') %>

        <!--[htmlclean-protect]-->
        <!-- inject:js -->
        <!-- endinject -->
        <!--[/htmlclean-protect]-->
    </body>
    </html>
    `;

    fs.mkdirSync(`src/work/${folder}`,{recursive: true});
    console.log(folder);
    fs.writeFileSync(`src/work/${folder}/index.html`,html,{recursive: true});
  })
})

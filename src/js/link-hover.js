let twitter = document.getElementById("twitter-thumb");
let linkedIn = document.getElementById("linkedin-thumb");
let gitHub   = document.getElementById("github-thumb");

twitter.addEventListener("mouseover",function(event) {
  twitter.src = "/assets/social-icons/twitter-highlight.png";
});

twitter.addEventListener("mouseout",function(event) {
  twitter.src = "/assets/social-icons/twitter.png";
});

linkedIn.addEventListener("mouseover",function(event) {
  linkedIn.src = "/assets/social-icons/linkedin-highlight.png";
});

linkedIn.addEventListener("mouseout",function(event) {
  linkedIn.src = "/assets/social-icons/linkedin.png";
});

gitHub.addEventListener("mouseover",function(event) {
  gitHub.src = "/assets/social-icons/github-highlight.png";
});

gitHub.addEventListener("mouseout",function(event) {
  gitHub.src = "/assets/social-icons/github.png";
});

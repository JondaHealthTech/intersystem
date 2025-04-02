const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.querySelector('.collapse-btn');
const metrics = document.querySelector('.metrics');
const activity = document.querySelector('.activity');
const rate = document.querySelector('.rate');
const templates = document.querySelector('.templates');
const usage = document.querySelector('.usage');
const notifications = document.querySelector('.notifications');


function toggleSidebar(){
  console.log("side bar invoked")
  if (!sidebar.classList.contains("close")){
    sidebar.classList.add("close");
    collapseBtn.src = "./assets/images/expand-btn.png";
    metrics.classList.add('lg');
    rate.classList.add('lg');
    activity.classList.add('lg');
    templates.classList.add('lg');
    usage.classList.add('lg');
    notifications.classList.add('lg');
  } else {
    sidebar.classList.remove("close");
    collapseBtn.src = "./assets/images/collapse-btn.png";
    metrics.classList.remove("lg");
    rate.classList.remove('lg');
    activity.classList.remove('lg');
    templates.classList.remove('lg');
    usage.classList.remove('lg');
    notifications.classList.remove('lg');
  }
}

function openTab(evt, tabName) {
  const tabcontent = document.querySelectorAll(".tabcontent");
  const tablinks = document.querySelectorAll(".tab button");

  tabcontent.forEach(tc => tc.classList.remove("active"));
  tablinks.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}


document.addEventListener("click", (e) => {
  if (e.target.closest(".faq-question")) {
    const item = e.target.closest(".faq-item");
    const allItems = item.parentElement.querySelectorAll(".faq-item");

   
    allItems.forEach((i) => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".faq-icon").src = "assets/images/plus.png";
      }
    });

    

 
    item.classList.toggle("active");
    const icon = item.querySelector(".faq-icon");
    icon.src = item.classList.contains("active") 
      ? "assets/images/icons8-minus-24.png" 
      : "assets/images/plus.png";
  }

  
});

document.getElementById("defaultOpen").click();

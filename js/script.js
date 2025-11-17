const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const searchBtnContainer = document.querySelector(".nav-items");
  const navList = document.querySelector(".nav-list");
  const searchBtn = document.querySelector(".search-iconli");
  const searchBtnContainer1 = document.querySelector(".search-btn-container");

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder =
    "Bitte geben Sie an, welches Hotel Sie suchen oder buchen möchte";
  searchInput.classList.add("search-input");

  let isSearchOpen = false;

  searchBtn.addEventListener("click", () => {
    if (!isSearchOpen) {
      navList.style.display = "none";

      searchBtnContainer.prepend(searchInput);

      searchBtn.innerHTML = `
  <div class="close-wrapper">
    <img src="assets/images/icons8-cross-100.png" alt="Schließen" class="close-icon" />
    <span class="close-text">schließen</span>
  </div>
`;

      searchBtn.style.background = "none";
      searchBtn.style.border = "none";
      searchBtn.style.boxShadow = "none";
      searchBtnContainer1.style.background = "none";
      searchBtnContainer1.style.border = "none";
      searchBtnContainer1.style.boxShadow = "none";

      isSearchOpen = true;
    } else {
      navList.style.display = "flex";

      if (searchInput.parentNode) {
        searchInput.parentNode.removeChild(searchInput);
      }

      searchBtn.innerHTML = `
        <img class="search-icon" src="assets/images/glas_blue_001f41.png" alt="Suche" />
      `;

      searchBtn.style.background = "";
      searchBtn.style.border = "";
      searchBtn.style.boxShadow = "";
      searchBtnContainer1.style.background = "#fff";
      searchBtnContainer1.style.border = "1px solid var(--color-border)";
      searchBtnContainer1.style.boxShadow = "";

      isSearchOpen = false;
    }
  });
});

const dropdown = document.getElementById("hotelDropdown");
const selected = dropdown.querySelector(".selected");
const list = dropdown.querySelector(".dropdown-list");
const options = dropdown.querySelectorAll(".dropdown-list li");

// selected.addEventListener("click", () => {
//   list.classList.toggle("show");
//   const arrow = selected.querySelector(".arrow");
//   arrow.style.transform = list.classList.contains("show") ? "rotate(180deg)" : "rotate(0deg)";
// });

options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.childNodes[0].textContent =
      option.querySelector(".hotel-name").textContent;
    list.classList.remove("show");
    selected.querySelector(".arrow").style.transform = "rotate(0deg)";
    console.log(option.dataset.value);
  });
});

document.addEventListener("click", (e) => {
  if (!dropdown || !list || !selected) return;
  if (!dropdown.contains(e.target)) {
    list.classList.remove("show");
    const arrow = selected.querySelector(".arrow");
    if (arrow && arrow.style) arrow.style.transform = "rotate(0deg)";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("hotel-datepicker");
  const checkinSpan = document.getElementById("checkin-date");
  const checkoutSpan = document.getElementById("checkout-date");
  const nightsInput = document.getElementById("points");

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "text";
  hiddenInput.style.position = "absolute";
  hiddenInput.style.opacity = 0;
  hiddenInput.style.pointerEvents = "none";
  button.parentNode.appendChild(hiddenInput);

  const formatDateForInput = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  };

  const formatDateForDisplay = (dateStr) => {
    const [day, month, year] = dateStr.split(".");
    const dateObj = new Date(`${year}-${month}-${day}`);
    const weekday = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][
      dateObj.getDay()
    ];
    return `${weekday}, ${day}.${month}.${year}`;
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`);
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const checkinDefault = formatDateForInput(today);
  const checkoutDefault = formatDateForInput(tomorrow);

  hiddenInput.value = `${checkinDefault} - ${checkoutDefault}`;
  checkinSpan.textContent = formatDateForDisplay(checkinDefault);
  checkoutSpan.textContent = formatDateForDisplay(checkoutDefault);
  checkinSpan.classList.remove("placeholder");
  checkoutSpan.classList.remove("placeholder");
  nightsInput.value = "1";

  const datepicker = new HotelDatepicker(hiddenInput, {
    showTopbar: false,
    format: "DD.MM.YYYY",
    startOfWeek: "monday",
    autoClose: false,
    i18n: {
      selected: "Ihre Reise:",
      night: "Nacht",
      nights: "Nächte",
      button: "Schließen",
      clearButton: "Löschen",
      submitButton: "OK",
      "day-names-short": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      "month-names": [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
    },
    onSelectRange: function () {
      const [checkin, checkout] = hiddenInput.value.split(" - ");
      if (checkin && checkout) {
        checkinSpan.textContent = formatDateForDisplay(checkin);
        checkoutSpan.textContent = formatDateForDisplay(checkout);
        checkinSpan.classList.remove("placeholder");
        checkoutSpan.classList.remove("placeholder");

        const checkinDate = parseDate(checkin);
        const checkoutDate = parseDate(checkout);
        const nights = Math.round(
          (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
        );
        nightsInput.value = nights;
      }
    },
  });

  nightsInput.addEventListener("input", () => {
    let nights = parseInt(nightsInput.value, 10);
    if (isNaN(nights) || nights < 1) nights = 1;
    nightsInput.value = nights;

    const [checkin] = hiddenInput.value.split(" - ");
    const checkinDate = parseDate(checkin);

    const newCheckout = new Date(checkinDate);
    newCheckout.setDate(checkinDate.getDate() + nights);

    const newCheckoutStr = formatDateForInput(newCheckout);

    hiddenInput.value = `${checkin} - ${newCheckoutStr}`;
    checkoutSpan.textContent = formatDateForDisplay(newCheckoutStr);
  });

  button.addEventListener("click", () => {
    hiddenInput.focus();
    hiddenInput.click();
  });
});

const nationalityDropdown = document.getElementById("nationalityDropdown");
const selectedNationality = nationalityDropdown.querySelector(".selected");
const nationalityList = nationalityDropdown.querySelector(".dropdown-list");
const nationalityOptions = nationalityDropdown.querySelectorAll("li");

selectedNationality.addEventListener("click", () => {
  nationalityList.classList.toggle("show");
  selectedNationality.querySelector(".arrow").style.transform =
    nationalityList.classList.contains("show")
      ? "rotate(180deg)"
      : "rotate(0deg)";
});

nationalityOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedNationality.childNodes[0].textContent =
      option.querySelector(".country-name").textContent;
    nationalityList.classList.remove("show");
    selectedNationality.querySelector(".arrow").style.transform =
      "rotate(0deg)";
    console.log(option.dataset.value);
  });
});

document.addEventListener("click", (e) => {
  if (!nationalityDropdown.contains(e.target)) {
    nationalityList.classList.remove("show");
    selectedNationality.querySelector(".arrow").style.transform =
      "rotate(0deg)";
  }
});

const travellersDropdown = document.getElementById("travellersDropdown");
const modal = document.getElementById("modal");

let counts = { adults: 2, children: 0, rooms: 1 };

travellersDropdown.addEventListener("click", () => {
  modal.classList.toggle("show");
  travellersDropdown.querySelector(".arrow").style.transform =
    modal.classList.contains("show") ? "rotate(180deg)" : "rotate(0deg)";
});

window.changeCount = function (type, delta) {
  if (
    type === "adults" &&
    (counts.adults + delta < 1 || counts.adults + delta > 6)
  ) {
    return;
  }
  if (
    type === "children" &&
    (counts.children + delta < 0 || counts.children + delta > 4)
  ) {
    return;
  }

  counts[type] += delta;
  document.getElementById(type + "Count").innerText = counts[type];

  if (type === "children") renderChildrenAges();

  updateTriggerText();
};

function renderChildrenAges() {
  const container = document.getElementById("childrenAges");
  container.innerHTML = "";

  for (let i = 1; i <= counts.children; i++) {
    const div = document.createElement("div");
    div.className = "child-age";
    div.innerHTML = `
      <label>Alter Kind ${i}:</label>
      <input type="number" min="0" max="17" value="11" />
    `;
    container.appendChild(div);
  }
}

function updateTriggerText() {
  let subText = travellersDropdown.querySelector(".sub-text");

  if (!subText) {
    subText = document.createElement("span");
    subText.classList.add("sub-text");
    travellersDropdown.querySelector(".selected-text").appendChild(subText);
  }

  const totalPeople = counts.adults + counts.children;
  subText.textContent = `${counts.adults} Erwachsene, ${counts.children} Kinder, ${counts.rooms} Zimmer`;
}

renderChildrenAges();
updateTriggerText();

document.addEventListener("click", (e) => {
  if (!travellersDropdown.contains(e.target) && !modal.contains(e.target)) {
    modal.classList.remove("show");
    travellersDropdown.querySelector(".arrow").style.transform = "rotate(0deg)";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hotelsData = [
    { name: "Niyama Private Island", location: "Berlin, Deutschland" },
    { name: "Summer Island Resort", location: "Inselname, Atollname" },
    { name: "HuavenFushi Resort", location: "Inselname, Atollname" },
    { name: "Summer Island Resort", location: "Inselname, Atollname" },
    { name: "Hotel C", location: "Inselname, Atollname" },
  ];

  const input = document.querySelector(".hotel-autocomplete-input");
  const list = document.querySelector(".hotel-autocomplete-list");

  function clearList() {
    list.innerHTML = "";
    list.style.display = "none";
  }

  function createListItem(hotel) {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="hotel-autocomplete-text">
        <h4>${hotel.name}</h4>
        <p>${hotel.location}</p>
      </div>
    `;
    li.addEventListener("click", () => {
      input.value = hotel.name;
      clearList();
    });
    return li;
  }

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    clearList();
    if (!query) return;
    const filteredHotels = hotelsData.filter(
      (h) =>
        h.name.toLowerCase().includes(query) ||
        h.location.toLowerCase().includes(query)
    );
    filteredHotels.forEach((h) => list.appendChild(createListItem(h)));
    if (filteredHotels.length) list.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".hotel-autocomplete-wrapper")) clearList();
  });
});

const tabs = new Tabby("[data-tabs]");

Fancybox.bind("[data-fancybox]", {
  on: {
    init: () => {
      if (
        !document
          .getElementById("myCarousel")
          .classList.contains("f-carousel-initialized")
      ) {
        Carousel(
          document.getElementById("myCarousel"),
          {
            Thumbs: {
              type: "classic",
              arrows: true,
            },
            arrows: true,
          },
          {
            Lazyload,
            Arrows,
            Thumbs,
          }
        ).init();
        document
          .getElementById("myCarousel")
          .classList.add("f-carousel-initialized");
      }
    },
  },
});

Fancybox.bind("[data-fancybox='gallery']", {
  Carousel: { Arrows: {} },
});
Fancybox.bind("[data-fancybox='gallery1']", {
  Carousel: {
    Thumbs: false,
  },
});





const accordions = document.querySelectorAll(".accordion-item");

accordions.forEach((item) => {
  const btn = item.querySelector(".accordion-btn");
  const content = item.querySelector(".accordion-content");
  const icon = item.querySelector(".icon");

  btn.addEventListener("click", () => {
    accordions.forEach((other) => {
      if (other !== item) {
        other.querySelector(".accordion-btn").classList.remove("active");
        other.querySelector(".accordion-content").style.maxHeight = null;
        other.querySelector(".accordion-content").style.opacity = "0";
        other.querySelector(".icon").classList.remove("open");
      }
    });

    btn.classList.toggle("active");
    const isOpen = btn.classList.contains("active");

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "1";
      icon.classList.add("open");
    } else {
      content.style.maxHeight = null;
      content.style.opacity = "0";
      icon.classList.remove("open");
    }
  });
});





















"use strict";
//Выдвигаем группу контактов при нажатии на кнопку
let addContact = document.querySelector(".btn-danger");
addContact.addEventListener("click", function () {
  document.querySelector(".second-form").classList.add("activ");
});

//Выдвигаем список групп при нажатие на кнопку группы
let addGroup = document.querySelector(".btn-primary");
addGroup.addEventListener("click", function () {
  document.querySelector(".form").classList.add("activ");
});

// Принажатии на крестик закрываются группы или контакты
let toggleElem = document.querySelectorAll(".btn-close");
toggleElem.forEach(function (elem) {
  elem.addEventListener("click", function () {
    document.querySelector(".form").classList.remove("activ");
    document.querySelector(".second-form").classList.remove("activ");
  });
});

// добавление новой группы при нажатии кнопки Добавить

let addNewGroup = document.querySelector(".btn_add");
addNewGroup.addEventListener("click", function () {
  let newElem = document.querySelector(".form_add");
  let addItem = document.createElement("div");
  addItem.className = "form_input";
  addItem.innerHTML = `
    <input type="text" name="gr" placeholder="Введите название" class="input_text">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" class = "svg-del">
                <rect opacity="0.1" x="0.5" y="0.5" width="37" height="37" rx="5.5" stroke="black"/>
                <g clip-path="url(#clip0_1894_194)">
                <path opacity="0.3" d="M12.6666 26.3889C12.6666 27.55 13.6166 28.5 14.7778 28.5H23.2222C24.3833 28.5 25.3333 27.55 25.3333 26.3889V13.7222H12.6666V26.3889ZM15.2633 18.8733L16.7516 17.385L19 19.6228L21.2378 17.385L22.7261 18.8733L20.4883 21.1111L22.7261 23.3489L21.2378 24.8372L19 22.5994L16.7622 24.8372L15.2739 23.3489L17.5116 21.1111L15.2633 18.8733ZM22.6944 10.5556L21.6389 9.5H16.3611L15.3055 10.5556H11.6111V12.6667H26.3889V10.5556H22.6944Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_1894_194">
                <rect width="25.3333" height="25.3333" fill="white" transform="translate(6.33331 6.33334)"/>
                </clipPath>
                </defs>
                </svg>`;
  newElem.appendChild(addItem);
});

// Сохранение данных из инпутов в локалсторадж

window.onload = () => {
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.value = localStorage[`input_${input.name}`] || "";
    input.addEventListener("change", function () {
      localStorage[`input_${this.name}`] = this.value;
    });
  }

  // Сохранение группы и данных при перезагрузке
  let group2 = localStorage.getItem("input_gr-2");
  let group1 = localStorage.getItem("input_gr-1");
  let groupChoose = localStorage.getItem("input_gr-change");
  if (group1 && group2 !== "") {
    saveData();
    savePersonData();
  } else {
    console.log("они пустые");
  }

  if (group2 == groupChoose) {
    // Заносим данные телефона и фио в группу
    let changeName = document.querySelector(".person_name");
    let addName = localStorage.getItem("input_FIO");
    changeName.textContent = addName;

    let changeFone = document.querySelector("#view2");
    let addFone = localStorage.getItem("input_fone");
    changeFone.textContent = addFone;
    console.log("Они одинаковые");
  } else if (group1 == groupChoose) {
    // Заносим данные телефона и фио в группу 2
    let changeName2 = document.querySelector(".person_name2");
    let addName2 = localStorage.getItem("input_FIO");
    changeName2.textContent = addName2;

    let changeFone2 = document.querySelector("#fone");
    let addFone2 = localStorage.getItem("input_fone");
    changeFone2.textContent = addFone2;
  }
};

// Поворот стрелки про нажатии на блок и скрытие блока группы

let div = document.querySelector(".group_person");
let img = document.querySelector(".img-rotate");
document.querySelector(".group_name").addEventListener("click", () => {
  div.style.display =
    getComputedStyle(div).display == "block" ? "none" : "block";
  img.style.transform =
    img.style.transform == "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
});

// Редактирование ФИО на странице при нажатии на кнопку редактирования

let area = null;
let view = document.getElementById("view");
let red = document.getElementById("red");

red.onclick = function () {
  editStart();
};

function editStart() {
  area = document.createElement("textarea");
  area.className = "edit";
  area.value = view.innerHTML;

  area.onkeydown = function (event) {
    if (event.key == "Enter") {
      this.blur();
    }
  };

  area.onblur = function () {
    editEnd();
  };

  view.replaceWith(area);
  area.focus();
}

function editEnd() {
  view.innerHTML = area.value;
  area.replaceWith(view);
}

function saveData() {
  // Открываем группу и заносим туда название в localStoradge
  let group1 = localStorage.getItem("input_gr-1");
  let openGroup1 = document.querySelector(".group");
  openGroup1.style.display = "block";
  let name = document.querySelector(".name");
  name.textContent = group1;

  // Заносим группу в даталист
  let newGroup = document.querySelector("datalist");
  let addItem = document.createElement("option");
  addItem.innerHTML = `<option value="` + group1 + `">`;
  newGroup.appendChild(addItem);

  // Создаём вторую группу и вносим туда данные группы
  let group2 = localStorage.getItem("input_gr-2");

  if (group2 == "") {
    console.log("Группа не заполнена");
  } else {
    let newElem = document.querySelector(".group");
    let addItem = document.createElement("div");
    addItem.className = "group_item";
    addItem.innerHTML = `
  
<div class="group_name2">
<h2 class="name2">Группа</h2>
<img src="./img/Vector.png" alt="Vector" width="13px" height="8px" class="img-rotate2">
</div>
<div class="group_line"></div>

<div class="group_person2">
<div class="person_block">
    <div id="view" class="person_name2">Фамилия Имя Отчество</div>
    <div class="person_fone">
        <span id="fone">+7 (ХХХ) ХХХ-XXX</span>
        <div class="red">
            <svg id="red" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" class = "svg-ed">
            <rect opacity="0.1" x="0.5" y="0.5" width="37" height="37" rx="5.5" stroke="black"/>
            <g clip-path="url(#clip0_1894_95)">
            <path opacity="0.3" d="M10 24.2501V28.0001H13.75L24.81 16.9401L21.06 13.1901L10 24.2501ZM27.71 14.0401C28.1 13.6501 28.1 13.0201 27.71 12.6301L25.37 10.2901C24.98 9.90006 24.35 9.90006 23.96 10.2901L22.13 12.1201L25.88 15.8701L27.71 14.0401V14.0401Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_1894_95">
            <rect width="24" height="24" fill="white" transform="translate(7 7)"/>
            </clipPath>
            </defs>
            </svg>
        </div>
        <div class="delete">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" class = "svg-del">
                <rect opacity="0.1" x="0.5" y="0.5" width="37" height="37" rx="5.5" stroke="black"/>
                <g clip-path="url(#clip0_1894_94)">
                <path opacity="0.3" d="M12.6666 26.3889C12.6666 27.55 13.6166 28.5 14.7778 28.5H23.2222C24.3833 28.5 25.3333 27.55 25.3333 26.3889V13.7222H12.6666V26.3889ZM15.2633 18.8733L16.7516 17.385L19 19.6228L21.2378 17.385L22.7261 18.8733L20.4883 21.1111L22.7261 23.3489L21.2378 24.8372L19 22.5994L16.7622 24.8372L15.2739 23.3489L17.5116 21.1111L15.2633 18.8733ZM22.6944 10.5556L21.6389 9.5H16.3611L15.3055 10.5556H11.6111V12.6667H26.3889V10.5556H22.6944Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_1894_94">
                <rect width="25.3333" height="25.3333" fill="white" transform="translate(6.33331 6.33337)"/>
                </clipPath>
                </defs>
            </svg>
        </div>     
    </div>
</div>
</div> `;
    newElem.appendChild(addItem);

    // Открываем группу и заносим туда название и localStoradge
    let group2 = localStorage.getItem("input_gr-2");

    let name = document.querySelector(".name2");
    name.textContent = group2;

    let newGroup = document.querySelector("datalist");
    let addItem2 = document.createElement("option");
    // addItem.className = "group_item";
    addItem2.innerHTML = `<option value="` + group2 + `">`;
    newGroup.appendChild(addItem2);
  }

  // Поворот стрелки про нажатии на блок и скрытие блока группы

  let div = document.querySelector(".group_person2");
  let img = document.querySelector(".img-rotate2");
  document.querySelector(".group_name2").addEventListener("click", () => {
    div.style.display =
      getComputedStyle(div).display == "block" ? "none" : "block";
    img.style.transform =
      img.style.transform == "rotate(180deg)"
        ? "rotate(0deg)"
        : "rotate(180deg)";
  });

  let deleteContacts = document.querySelector(".contacts");
  deleteContacts.style.display = "none";
}

function savePersonData() {
  let groupCompare = localStorage.getItem("input_gr-1");
  let groupChoose = localStorage.getItem("input_gr-change");

  if (groupCompare == groupChoose) {
    // Заносим данные телефона и фио в группу
    let changeName = document.querySelector(".person_name");
    let addName = localStorage.getItem("input_FIO");
    changeName.textContent = addName;

    let changeFone = document.querySelector("#view2");
    let addFone = localStorage.getItem("input_fone");
    changeFone.textContent = addFone;
    console.log("Они одинаковые");
  } else {
    // Заносим данные телефона и фио в группу 2
    let changeName2 = document.querySelector(".person_name2");
    let addName2 = localStorage.getItem("input_FIO");
    changeName2.textContent = addName2;

    let changeFone2 = document.querySelector("#fone");
    let addFone2 = localStorage.getItem("input_fone");
    changeFone2.textContent = addFone2;
  }
}

// Удаление данных при кликах на кнопки удалить

// const addBtn = document.getElementById('add_button');
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const saveModalBtn = document.querySelector(".btn-save");
const resetBtn = document.querySelector(".btn-reset");

// 显示add模态框
const openModal = function () {
  document.getElementById("new_entry_title").innerHTML = "\n        <h3>新增条目</h3>\n      ";
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

// 关闭add模态框
const closeModal = function () {
  document.getElementById("serial_number").value = "";
  document.getElementById("add_content").value = "";

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// 新建ADD模态框后插入页面并显示
const saveContent = function (serial_number, name) {
  let tbody = document.getElementById("tbody-id");

  tbody.innerHTML += `
    <tr>
          <th class="th_serial_number" scope="row">${serial_number}</th>
          <td class="name" id="${serial_number}_name">${name}</td>
          <td class="btn-edit" id="${serial_number}_edit" onclick="editModal(${serial_number})">编辑</td>
          <td class="btn-delete" id="${serial_number}_delete" onclick="deleteModal('${serial_number}')">删除</td>
    </tr>
    `;
};

const saveModal = function () {
  let serial_number = document.getElementById("serial_number").value;
  let add_content = document.getElementById("add_content").value;

  setItem(serial_number, add_content);
  if (serial_number == 0) {
    alert("编号请输入数字");
    return;
  }

  let ths = document.getElementsByClassName("th_serial_number");
  for (let i = 0; i < ths.length; i++) {
    if (ths[i].innerHTML == serial_number) {
      name_id = ths[i].innerHTML + "_name";
      document.getElementById(name_id).innerHTML = add_content;
      closeModal();
      return;
    }
  }

  saveContent(serial_number, add_content);

  document.getElementById("serial_number").value = "";
  document.getElementById("add_content").value = "";
  closeModal();
};
saveModalBtn.addEventListener("click", saveModal);

// 编辑模态框
function editModal(id_string) {
  let name = document.getElementById(id_string + "_name").innerHTML;

  document.getElementById("new_entry_title").innerHTML = "\n        <h3>编辑条目</h3>\n      ";

  document.getElementById("serial_number").value = id_string;
  document.getElementById("add_content").value = name;

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

}

// 删除相应行
function deleteModal(id_string) {
  let sn = document.getElementById(id_string + "_delete");
  let name = document.getElementById(id_string + "_name").innerHTML;

  let row = sn.parentNode;
  let tb = row.parentNode.parentNode;
  let rowIndex = row.rowIndex;
  delItem(id_string, name);
  tb.deleteRow(rowIndex);
}

// 点击RESET按钮，重置页面
const resetFun = function () {
  let tbody = document.getElementById("tbody-id");

  document.getElementById("myInput").value = "";
  tbody.innerHTML = ``;
  if (localStorage.getItem("itemData")) {
    get_itemData = JSON.parse(localStorage.getItem("itemData"));

    for (let i = 0; i < get_itemData.length; i++) {
      tbody.innerHTML += `
        <tr>
          <th class="th_serial_number" scope="row">${get_itemData[i].id}</th>
          <td class="name" id="${get_itemData[i].id}_name">${get_itemData[i].name}</td>
          <td class="btn-edit" id="${get_itemData[i].id}_edit" onclick="editModal('${get_itemData[i].id}')">编辑</td>
          <td class="btn-delete" id="${get_itemData[i].id}_delete" onclick="deleteModal('${get_itemData[i].id}')">删除</td>
    </tr>
    `;
    }
  } else {
    return;
  }
};

resetBtn.addEventListener("click", resetFun);

// 在搜索框输入内容，进行搜索
function searchFunction() {
  let input = document.getElementById("myInput").value;
  let names = document.getElementsByClassName("name");

  for (let i = 0; i < names.length; i++) {
    if (names[i].innerHTML.includes(input) == false) {
      names[i].parentNode.style.display = "none";
    }
  }
}
// 渲染页面
window.addEventListener("load", function () {
  let tbody = document.getElementById("tbody-id");

  if (localStorage.getItem("itemData")) {
    get_itemData = JSON.parse(localStorage.getItem("itemData"));

    for (let i = 0; i < get_itemData.length; i++) {
      tbody.innerHTML += `
        <tr>
          <th class="th_serial_number" scope="row">${get_itemData[i].id}</th>
          <td class="name" id="${get_itemData[i].id}_name">${get_itemData[i].name}</td>
          <td class="btn-edit" id="${get_itemData[i].id}_edit" onclick="editModal('${get_itemData[i].id}')">编辑</td>
          <td class="btn-delete" id="${get_itemData[i].id}_delete" onclick="deleteModal('${get_itemData[i].id}')">删除</td>
    </tr>
    `;
    }
  } else {
    return;
  }
});

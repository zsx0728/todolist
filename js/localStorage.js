function setItem(id_string, name) {
    jsonData = {};
    jsonData.id = id_string;
    jsonData.name = name;

    if (Number(id_string) == 0) {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        return;
    }

    let get_itemData = JSON.parse(localStorage.getItem("itemData"));
    if (get_itemData == null) {
        get_itemData = [];
    }

    for (let i = 0; i < get_itemData.length; i++) {
        if (get_itemData[i].id == id_string) {
            // console.log("get_itemData[i].id is ", get_itemData[i].id);
            get_itemData[i].name = name;
            // console.log(name);
            // console.log(get_itemData[i].name);
            localStorage.removeItem("itemData");
            localStorage.setItem("itemData", JSON.stringify(get_itemData));
            return;
        }
    }

    get_itemData.push(jsonData);
    localStorage.setItem("itemData", JSON.stringify(get_itemData));
}

function delItem(id_string, name) {
    jsonData = {};
    jsonData.id = id_string;
    jsonData.name = name;

    let get_itemData = JSON.parse(localStorage.getItem("itemData"));
    for (let i = 0; i < get_itemData.length; i++) {
        if (name == get_itemData[i].name) {
            get_itemData.splice(i, 1);
        }
    }

    localStorage.removeItem("itemData");
    localStorage.setItem("itemData", JSON.stringify(get_itemData));
}
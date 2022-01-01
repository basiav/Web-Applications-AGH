const httpA = `http://localhost:3000/produktyA`;
const httpB = `http://localhost:3000/produktyB`;

const fetchMsgAParagraph = document.getElementById("fetchSuccessMsgA");
const fetchMsgBParagraph = document.getElementById("fetchSuccessMsgB");

const menuSection = document.getElementById("menuSection");
const mainListUl = document.getElementById("mainList");

var selectAllCheckboxs = new Map();

Promise.all([
    fetch(httpA),
    fetch(httpB)
]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then(function (data) {
    console.log(data);
    var produktyA = data[0].produktyA;
    var produktyB = data[1].produktyB;
    console.log("--------------");
    var categoryNames = [];
    var productNames = [];
    var productCategories = [];

    // Get all the distinc category and product names from productListA
    produktyA.forEach(category => {
        categoryNames.push(category.name);
        category.items.forEach(product => {
            if(!productNames.includes(product.name)){
                productNames.push(product.name);
                productCategories.push(category.name);
            }
        });
    });

    // Add all the distinct category and product names from productListB
    produktyB.forEach(category => {
        if(!categoryNames.includes(category.name)){
            categoryNames.push(category.name);
        }
        category.items.forEach(product => {
            if(!productNames.includes(product.name)){
                productNames.push(product.name);
                productCategories.push(category.name);
            }
        });
    });

    categoryNames.forEach(categoryName => {
        var liToggler = document.createElement("li");

        var toggler = document.createElement("div");
        toggler.setAttribute("class", "toggler");
        toggler.append(categoryName);

        var ulCat = document.createElement("ul");
        ulCat.setAttribute("class", "lvlOne toggler-target");

        var liSelectAll = document.createElement("li");
        liSelectAll.append("Select all");
        liSelectAll.setAttribute("class", "treeView selectAll");
        liSelectAll.setAttribute("id", categoryName);

        ulCat.appendChild(liSelectAll);

        selectAllCheckboxs.set(categoryName, false);

        productCategories.forEach((category, idx) => {
            if(categoryName == category){
                var prodName = productNames[idx];
                var liProd = document.createElement("li");
                liProd.setAttribute("class", `treeView lvlTwo ${categoryName}`);
                liProd.appendChild(document.createTextNode(prodName));
                ulCat.appendChild(liProd);
            }
        });

        liToggler.appendChild(toggler);
        liToggler.appendChild(ulCat);
        menuSection.appendChild(liToggler);
    });

    function setOnMainPage(liId, state){};

    function toggleTreeViews(){
        var treeViews = document.querySelectorAll(".treeView");
        treeViews.forEach((treeView) => {
            treeView.addEventListener("click", () => {
                treeView.classList.toggle("active");
                if(!treeView.classList.contains("selectAll")){
                    if(treeView.classList.contains("active")) {
                        mainListUl.innerHTML;
                    } else {

                    }
                }
                console.log("!!!" + treeView.classList)
            })
        });
    }

    function toggleTogglers() {
        var togglers = document.querySelectorAll(".toggler");
        togglers.forEach((toggler) => {
            toggler.addEventListener("click", () => {
                toggler.classList.toggle("active");
                toggler.nextElementSibling.classList.toggle("active");
            })
        });
    }

    toggleTreeViews();

    toggleTogglers();

    function setTreeViewsWithinUl(liId, state){
        var treeViews = document.querySelectorAll(".treeView");
        treeViews.forEach((treeView) => {
            if(treeView.getAttribute("class").includes(liId)){
                switch(state){
                    case "enable":
                        treeView.classList.add("active");
                        break;
                    case "disable":
                        treeView.classList.remove("active");
                        break;
                }
            }
        });
    }

    function toggleSelectAlls() {
        var selectAlls = document.querySelectorAll(".selectAll");
        var i = 0;
        selectAlls.forEach((selectAll) => {
            var id = selectAll.getAttribute("id");
            selectAll.addEventListener("click", () => {
                console.log(id);
                var selected = selectAllCheckboxs.get(id);
                console.log("[id: " + id + "] [selected: " + selected +"]")
                var state;
                switch(selected){
                    case true:
                        state = "disable";
                        break;
                    case false:
                        state = "enable";
                        break;
                }
                selectAllCheckboxs.set(id, !selected);
                setTreeViewsWithinUl(id, state);
                console.log(i++);
            });
        });
    }

    toggleSelectAlls();






}).catch(function (error) {
    console.log("ERROR: " + error);
});

console.log("--------------------------------");
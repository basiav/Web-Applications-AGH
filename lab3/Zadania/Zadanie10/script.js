const httpA = `http://localhost:3000/produktyA`;
const httpB = `http://localhost:3000/produktyB`;

const fetchMsgAParagraph = document.getElementById("fetchSuccessMsgA");
const fetchMsgBParagraph = document.getElementById("fetchSuccessMsgB");

const menuSection = document.getElementById("menuSection");
var mainListUl = document.getElementById("mainList");

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

    var categoryNames = [];
    var productNames = [];
    var productCategories = [];

    // Get all the distinc category and product names from productListA
    produktyA.forEach(category => {
        // Only nonempty categories
        if(category.items.length > 0){
            categoryNames.push(category.name);
            category.items.forEach(product => {
                if(!productNames.includes(product.name)){
                    productNames.push(product.name);
                    productCategories.push(category.name);
                }
            });
        }
    });

    // Add all the distinct category and product names from productListB
    produktyB.forEach(category => {
        // Only nonempty categories
        if(category.items.length > 0){
            if(!categoryNames.includes(category.name)){
                categoryNames.push(category.name);
            }
            category.items.forEach(product => {
                if(!productNames.includes(product.name)){
                    productNames.push(product.name);
                    productCategories.push(category.name);
                }
            });
        }
    });

    // Create DOM fragment - a tree set to display categories and products in the Menu Section
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

    // Add selected products to Main Section
    function addElementToMainList(elementName){
        var li = document.getElementById("elementName");
        
        if(!document.body.contains(li)){
            var li = document.createElement("li");
            li.setAttribute("id", elementName);
            li.append(elementName);
            var a = mainListUl.appendChild(li);
            console.log("Appended: " + a.innerHTML);
        } else {
            console.log("[addElementToMainList] ERROR: this element already exists " + elementName);
        }
    };

    function removeElementFromMainList(elementName){
        var li = document.getElementById(elementName);
        try {
            var r = mainListUl.removeChild(li);
            r.remove();
            li.remove();
            li.parentElement.removeChild(li);
            console.log("Removed: " + r.innerHTML);
        }
        catch(error) {
            console.log("[removeElementFromMainList] ERROR: " + error);
        };
    }

    function updateMainList(element){
        if(!element.classList.contains("selectAll")){
            if(element.classList.contains("active")) {
                addElementToMainList(element.innerHTML);
            } else {
                removeElementFromMainList(element.innerHTML);
            }
        }
    }

    function toggleTreeViewElement(element){
        element.classList.toggle("active");
        updateMainList(element);
    }

    function setTreeViewElement(element, activate){
        if(activate && !element.classList.contains("active")){
            element.classList.add("active");
            updateMainList(element);
        } else if(!activate) {
            element.classList.remove("active");
            updateMainList(element);
        }
    }

    function toggleTreeViews(){
        console.log("toggleTreeViews");
        var treeViews = document.querySelectorAll(".treeView");
        treeViews.forEach((treeView) => {
            treeView.addEventListener("click", () => {
                toggleTreeViewElement(treeView);
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
                        setTreeViewElement(treeView, true);
                        break;
                    case "disable":
                        setTreeViewElement(treeView, false);
                        break;
                }
            }
        });
    }

    function toggleSelectAlls() {
        var selectAlls = document.querySelectorAll(".selectAll");
        selectAlls.forEach((selectAll) => {
            var id = selectAll.getAttribute("id");
            selectAll.addEventListener("click", () => {
                var selected = selectAllCheckboxs.get(id);
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
            });
        });
    }

    toggleSelectAlls();

}).catch(function (error) {
    console.log("[FETCH] ERROR: " + error);
});
const httpA = `http://localhost:3000/produktyA`;
const httpB = `http://localhost:3000/produktyB`;
const fetchMsgA = "fetchSuccessMsgA";
const fetchMsgB = "fetchSuccessMsgB";

const menuSection = document.getElementById("menuSection");

Promise.all([
    fetch('http://localhost:3000/produktyA'),
    fetch('http://localhost:3000/produktyB')
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

        ulCat.appendChild(liSelectAll);

        productCategories.forEach((category, idx) => {
            if(categoryName == category){
                var prodName = productNames[idx];
                var liProd = document.createElement("li");
                liProd.setAttribute("class", "treeView lvlTwo");
                liProd.appendChild(document.createTextNode(prodName));
                ulCat.appendChild(liProd);
            }
        });

        liToggler.appendChild(toggler);
        liToggler.appendChild(ulCat);
        menuSection.appendChild(liToggler);
    });

    var treeViews = document.querySelectorAll(".treeView");
    treeViews.forEach((treeView) => {
        treeView.addEventListener("click", () => {
            treeView.classList.toggle("active");
        })
    });

    var togglers = document.querySelectorAll(".toggler");
    togglers.forEach((toggler) => {
        toggler.addEventListener("click", () => {
            toggler.classList.toggle("active");
            toggler.nextElementSibling.classList.toggle("active");
        })
    });

    var selectAll


}).catch(function (error) {
    console.log("ERROR: " + error);
});

console.log("--------------------------------");
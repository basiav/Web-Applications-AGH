var fetchSuccessA;
var fetchSuccessB;
const httpA = `http://localhost:3000/produktyA`;
const httpB = `http://localhost:3000/produktyB`;
const fetchMsgA = "fetchSuccessMsgA";
const fetchMsgB = "fetchSuccessMsgB";


Promise.all([
    fetch('http://localhost:3000/produktyA'),
    fetch('http://localhost:3000/produktyB')
]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log(data);
    var produktyA = data[0].produktyA;
    var produktyB = data[1].produktyB;
    console.log("--------------")
    productList = [produktyA, produktyB]
    productList.forEach(category => {
        console.log(category)
        category.forEach(c => {
            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<")
            console.log(c)
            c.items.forEach(product => {
                console.log(product.name)
            })
        })
    });

    // produktyA.forEach(category => {
    //     console.log(category)
    //     category.items.forEach(item => {
    //         console.log(item)
    //     })
    // });

    // produktyB.forEach(category => {
    //     console.log(category)
    // });


}).catch(function (error) {
    // if there's an error, log it
    console.log(error);
});

console.log("--------------------------------")
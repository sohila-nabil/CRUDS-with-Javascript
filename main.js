// for inputs 
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let tbody = document.getElementById("tbody")
let deleteAll = document.getElementById("deleteAll")

let mode = 'create'
let temp;

// get Total
function getTotal(){
    if (price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.backgroundColor = "green"
    }
    else {
        total.innerHTML = ''
        total.style.backgroundColor = "#FB2576"
    }
}

// Craete Products
let products;
if(localStorage.Product != null)
{
    products = JSON.parse(localStorage.Product)
}
else{
    products = []
}

submit.onclick = function(){
    if(title.value == ''|| price.value== '' || category.value == ''){
        alert('please enter data')
    } 
    else{
        let newPro={
            Title: title.value.toLowerCase(),
            Price: price.value,
            Taxes: taxes.value,
            AdvertisingCost: ads.value,
            Discount: discount.value,
            Total: total.innerHTML,
            count: count.value,
            Category: category.value.toLowerCase()
        }
        if(mode === 'create'){
            if(count.value > 1){
                for(let i = 0; i < count.value; i++){
                    products.push(newPro);
                }
            }
            else{
                    products.push(newPro);
                }
        }
        else{
            products[temp] = newPro
            mode = 'create'
            submit.innerHTML = 'create'
            count.style.display = 'block'
        }
        
        localStorage.setItem('Product', JSON.stringify(products))
        clearInputs()
        showData()
    }
    
}

// Clear Inputs

function clearInputs(){
    title.value = '',
    price.value = "",
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    category.value = ''
}


// Display Data
function showData(){
    getTotal()
    let table = ''
    for (let i=0; i<products.length; i++){
        table += 
        `<tr>
        <td>${i}</td>
        <td>${products[i].Title}</td>
        <td>${products[i].Price}</td>
        <td>${products[i].Taxes}</td>
        <td>${products[i].AdvertisingCost}</td>
        <td>${products[i].Discount}</td>
        <td>${products[i].Total}</td>
        <td>${products[i].Category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`
    }

    tbody.innerHTML = table
    if(products.length > 0){
        deleteAll.innerHTML = `<button onclick="clearAll()">Delete All (${products.length})</button>`
    }
}

showData()

// Delete Data

function deleteData(id){
    products.splice(id,1)
    localStorage.Product = JSON.stringify(products)
    showData()
}

// Delete All Data
function clearAll(){
    localStorage.clear()
    products.splice(0)
    showData()
}

// UpdateData
function updateData(id){
    title.value = products[id].Title,
    price.value = products[id].Price,
    taxes.value = products[id].Taxes,
    ads.value= products[id].AdvertisingCost,
    discount.value = products[id].Discount,
    getTotal(),
    count.style.display = 'none'
    category.value = products[id].Category
    submit.innerHTML = "Update"
    mode = 'update'
    temp = id
    scroll({
        top : 0,
        behavior:"smooth"
    })

}


// Search
let searchMode = 'title'
let search = document.getElementById('search')
function searchBy(id){
    if(id == 'search-title'){
        searchMode = 'title';
        search.placeholder = 'Search By Title'
        
    }else
    {
        searchMode = 'category';
        search.placeholder = 'Search By Category'
    }
    search.focus()
    search.value = '';
    showData();
}


function searchData(value){
    let table;
    for(let i = 0; i <products.length; i++){

        if(searchMode == 'title'){
            if(products[i].Title.includes(value.toLowerCase())){
                table += 
                `<tr>
                <td>${i}</td>
                <td>${products[i].Title}</td>
                <td>${products[i].Price}</td>
                <td>${products[i].Taxes}</td>
                <td>${products[i].AdvertisingCost}</td>
                <td>${products[i].Discount}</td>
                <td>${products[i].Total}</td>
                <td>${products[i].Category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`
            }
            
        }

        else
        {
            if(products[i].Category.includes(value.toLowerCase())){
                table += 
                `<tr>
                <td>${i}</td>
                <td>${products[i].Title}</td>
                <td>${products[i].Price}</td>
                <td>${products[i].Taxes}</td>
                <td>${products[i].AdvertisingCost}</td>
                <td>${products[i].Discount}</td>
                <td>${products[i].Total}</td>
                <td>${products[i].Category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`
            }
            
        }
    }
    tbody.innerHTML = table
}
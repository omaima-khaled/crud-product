nameInput=document.getElementById("productName");
priceInput=document.getElementById("productPrice");
descInput=document.getElementById("productDesc");
categInput=document.getElementById("productCategory");
var submitbutton=document.getElementById('submitBtn')
var alertName=document.getElementById('alertName')
var alertPrice=document.getElementById('alertPrice')
var alertDesc=document.getElementById('alertDesc')
var alertCate=document.getElementById('alertCate')
var currentIndex;
///////if useh have older info put in i container and display i tfirst////
var productContainer=[];
if(localStorage.getItem('ourProduct')!= null)
{
    productContainer= JSON.parse(localStorage.getItem('ourProduct'));
    displayProduct();
}
///////check if button for add or update by innerhtml////////////

submitbutton.onclick=function(){
    if(submitbutton.innerHTML == "add product") {
        addProduct()
    }
    else{
        updateItem()
    }
}
/////////////add product by get values and pust it in array/////////
function addProduct(){
        var product={
            name:nameInput.value,
            price:priceInput.value,
            description:descInput.value,
            category:categInput.value
        }
        productContainer.push(product)
        localStorage.setItem('ourProduct',JSON.stringify(productContainer));
        alert("product added")
        clearform();
        displayProduct();
    }
    //////////////// function for clear foem from any data after adding or updating/////////
function clearform(){
    nameInput.value="";
    priceInput.value="";
    descInput.value="";
    categInput.value="";
    nameInput.classList.remove('is-valid')
    nameInput.classList.remove("is-invalid");
    alertName.classList.add("d-none");
    priceInput.classList.remove('is-valid')
    priceInput.classList.remove("is-invalid");
    alertPrice.classList.add("d-none");
    descInput.classList.remove('is-valid')
    descInput.classList.remove("is-invalid");
    alertDesc.classList.add("d-none");
    categInput.classList.remove('is-valid')
    categInput.classList.remove("is-invalid");
    alertCate.classList.add("d-none");
}
///////function for display container from local storage and display it on table body///////////
function displayProduct(){
    var cartona=``
    for(i=0; i<productContainer.length;i++){
        cartona+=`<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td><button onclick="editProduct(${i})" class="btn btn-outline-warning">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
       </tr> `;
    }
    document.getElementById("tablebody").innerHTML=cartona;
}
//////////function for delete item from container aand then from local storAGE//////
function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem('ourProduct',JSON.stringify(productContainer));
    displayProduct();
}
////////////FUNCTION FOR SEARCH IN ARRAY WHEMN KEYUP//////////////
function searchProduct(term){
    cartona=``;
    for(i=0;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            cartona+=`<tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category  }</td>
            <td>${productContainer[i].description}</td>
            <td><button onclick="editProduct(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
           </tr> `;
        }
    }
    document.getElementById("tablebody").innerHTML=cartona;
}
/////////FUNCTION FOR RETURN INPUT VALUES FROM ARRAY CONTAINER TO INOPUT IT SLEF////
function editProduct(index){
      nameInput.value=productContainer[index].name;
      priceInput.value=productContainer[index].price;
      descInput.value=productContainer[index].description;
      categInput.value=productContainer[index].category;
      submitbutton.innerHTML="updateproduct";
      currentIndex=index;
}
////////FUNCTION FOR REPLACE O R UPDATE NEW VALUES BY VALUES OF CURRENT INDEX/////
function updateItem(){
    var product={
        name:nameInput.value,
        price:priceInput.value,
        description:descInput.value,
        category:categInput.value
    }
   productContainer[currentIndex]=product;
   localStorage.setItem('ourProduct',JSON.stringify(productContainer));
   alert("product updated")
   clearform();
   displayProduct();
}

///////VALIDATION NAME///////
nameInput.addEventListener('blur',function(){
    var regex=/^[A-Z][a-z]{2,6}$/
    if(regex.test(nameInput.value)==true)
    { 
         submitBtn.removeAttribute("disabled");
       nameInput.classList.add("is-valid");
         nameInput.classList.remove("is-invalid");
         alertName.classList.add("d-none");
       return true;
    }
    else{
        submitBtn.disabled="true";
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        alertName.classList.remove("d-none");
        alertName.innerHTML="name must start with capital character and 2-6 characters"
        return false;
    }
})
/////////////// VALIDATION PRICE/////////////////
priceInput.addEventListener('blur',function(){
    var regex=/^([1-9][0-9][0-9][0-9]|10000)$/
    if(regex.test(priceInput.value)==true)
    { 
         submitBtn.removeAttribute("disabled");
       priceInput.classList.add("is-valid");
         priceInput.classList.remove("is-invalid");
         alertPrice.classList.add("d-none");
       return true
    }
    else{
        submitBtn.disabled="true";
        priceInput.classList.add("is-invalid");
        priceInput.classList.remove("is-valid");
        alertPrice.classList.remove("d-none");
        alertPrice.innerHTML="Price should be between 1000-10000"
        return false;
    }
})
////////////////////VALIDATION CATEGORY///////////////////////
categInput.addEventListener('blur',function(){
    var regex=/^(Mobile|Laptop|Tv)$/
    if(regex.test(categInput.value)==true)
    { 
         submitBtn.removeAttribute("disabled");
       categInput.classList.add("is-valid");
       categInput.classList.remove("is-invalid");
         alertCate.classList.add("d-none");
       return true
 }
    else{
        submitBtn.disabled="true";
        categInput.classList.add("is-invalid");
        categInput.classList.remove("is-valid");
        alertCate.classList.remove("d-none");
        alertCate.innerHTML="category should be between (Laptop,Tv,Mobile)"
        return false;
 }
})
///////////////////////VALIDATION DESCRIPTION////////////////
descInput.addEventListener('blur',function(){
    var regex=/\s{3}/
    if(regex.test(descInput.value)==true)
    { 
         submitBtn.removeAttribute("disabled");
         descInput.classList.add("is-valid");
         descInput.classList.remove("is-invalid");
         alertDesc.classList.add("d-none");
       return true
    }
    else{
        submitBtn.disabled="true";
        descInput.classList.add("is-invalid");
        descInput.classList.remove("is-valid");
        alertDesc.classList.remove("d-none");
        alertDesc.innerHTML="description shoule be contain 3 spaces"
        return false;
    }
})
///////////////////////////////////////////




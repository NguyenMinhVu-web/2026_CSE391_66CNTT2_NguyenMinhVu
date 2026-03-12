const form=document.getElementById("orderForm")

const prices={
"Ao":150000,
"Quan":200000,
"Giay":300000
}

function showError(id,msg){
document.getElementById(id).innerText=msg
}

function clearError(id){
document.getElementById(id).innerText=""
}

/* VALIDATE PRODUCT */

function validateProduct(){

let product=document.getElementById("product").value

if(product===""){
showError("productError","Chọn sản phẩm")
return false
}

clearError("productError")
return true
}

/* QUANTITY */

function validateQuantity(){

let q=Number(document.getElementById("quantity").value)

if(!Number.isInteger(q) || q<1 || q>99){
showError("quantityError","Số lượng 1-99")
return false
}

clearError("quantityError")
return true
}

/* DATE */

function validateDate(){

let d=document.getElementById("delivery").value

if(!d){
showError("dateError","Chọn ngày giao")
return false
}

let today=new Date()
let chosen=new Date(d)

let max=new Date()
max.setDate(today.getDate()+30)

if(chosen<today || chosen>max){
showError("dateError","Ngày trong 30 ngày tới")
return false
}

clearError("dateError")
return true
}

/* ADDRESS */

function validateAddress(){

let addr=document.getElementById("address").value.trim()

if(addr.length<10){
showError("addressError","Địa chỉ ≥10 ký tự")
return false
}

clearError("addressError")
return true
}

/* NOTE */

function validateNote(){

let note=document.getElementById("note").value

if(note.length>200){
showError("noteError","Tối đa 200 ký tự")
return false
}

clearError("noteError")
return true
}

/* PAYMENT */

function validatePay(){

let pay=document.querySelector('input[name="pay"]:checked')

if(!pay){
showError("payError","Chọn phương thức")
return false
}

clearError("payError")
return true
}

/* CHAR COUNT */

const note=document.getElementById("note")
const counter=document.getElementById("charCount")

note.addEventListener("input",function(){

let len=this.value.length

counter.innerText=len+"/200"

if(len>200){
counter.style.color="red"
}else{
counter.style.color="black"
}

validateNote()

})

/* TOTAL PRICE */

function updateTotal(){

let product=document.getElementById("product").value
let q=Number(document.getElementById("quantity").value)

if(prices[product] && q){

let total=prices[product]*q

document.getElementById("total").innerText=
Number(total).toLocaleString("vi-VN")

}

}

document.getElementById("product").addEventListener("change",updateTotal)
document.getElementById("quantity").addEventListener("input",updateTotal)

/* BLUR VALIDATE */

document.getElementById("product").addEventListener("blur",validateProduct)
document.getElementById("quantity").addEventListener("blur",validateQuantity)
document.getElementById("delivery").addEventListener("blur",validateDate)
document.getElementById("address").addEventListener("blur",validateAddress)

/* INPUT CLEAR ERROR */

document.querySelectorAll("input,textarea,select").forEach(el=>{
el.addEventListener("input",()=>{
let span=el.nextElementSibling
if(span && span.classList.contains("error")){
span.innerText=""
}
})
})

/* SUBMIT */

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePay()

if(!valid) return

let product=document.getElementById("product").value
let q=document.getElementById("quantity").value
let date=document.getElementById("delivery").value
let total=document.getElementById("total").innerText

let box=document.getElementById("confirmBox")

box.style.display="block"

box.innerHTML=`
<h3>Xác nhận đặt hàng?</h3>
<p>Sản phẩm: ${product}</p>
<p>Số lượng: ${q}</p>
<p>Tổng tiền: ${total} VNĐ</p>
<p>Ngày giao: ${date}</p>

<button id="ok">Xác nhận</button>
<button id="cancel">Hủy</button>
`

document.getElementById("ok").onclick=function(){

form.style.display="none"

box.style.display="none"

document.getElementById("success").innerText=
"Đặt hàng thành công! 🎉"

}

document.getElementById("cancel").onclick=function(){
box.style.display="none"
}

})
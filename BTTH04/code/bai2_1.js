const form = document.getElementById("form")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirm = document.getElementById("confirm")
const terms = document.getElementById("terms")

const count = document.getElementById("count")
const strength = document.getElementById("strength")

function showError(id,msg){
document.getElementById(id+"Error").innerText = msg
}

function clearError(id){
document.getElementById(id+"Error").innerText = ""
}

/* FULLNAME */

function validateFullname(){

let value = fullname.value.trim()

if(value===""){
showError("fullname","Không được để trống")
return false
}

if(value.length<3){
showError("fullname","Ít nhất 3 ký tự")
return false
}

if(!/^[A-Za-zÀ-ỹ\s]+$/.test(value)){
showError("fullname","Chỉ chứa chữ cái")
return false
}

clearError("fullname")
return true
}

/* EMAIL */

function validateEmail(){

let value=email.value.trim()

if(value===""){
showError("email","Không được để trống")
return false
}

if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
showError("email","Email không hợp lệ")
return false
}

clearError("email")
return true
}

/* PHONE */

function validatePhone(){

let value=phone.value.trim()

if(!/^0\d{9}$/.test(value)){
showError("phone","SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError("phone")
return true
}

/* PASSWORD */

function validatePassword(){

let value=password.value

if(value.length<8){
showError("password","Ít nhất 8 ký tự")
return false
}

if(!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)){
showError("password","Cần chữ hoa, chữ thường và số")
return false
}

clearError("password")
return true
}

/* CONFIRM */

function validateConfirm(){

if(confirm.value!==password.value){
showError("confirm","Mật khẩu không khớp")
return false
}

clearError("confirm")
return true
}

/* GENDER */

function validateGender(){

let gender=document.querySelector("input[name='gender']:checked")

if(!gender){
showError("gender","Chọn giới tính")
return false
}

clearError("gender")
return true
}

/* TERMS */

function validateTerms(){

if(!terms.checked){
showError("terms","Phải đồng ý điều khoản")
return false
}

clearError("terms")
return true
}

/* COUNT NAME */

fullname.addEventListener("input",()=>{
count.innerText=fullname.value.length+"/50"
clearError("fullname")
})

/* BLUR VALIDATE */

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirm.addEventListener("blur",validateConfirm)

/* CLEAR ERROR */

email.addEventListener("input",()=>clearError("email"))
phone.addEventListener("input",()=>clearError("phone"))
password.addEventListener("input",()=>clearError("password"))
confirm.addEventListener("input",()=>clearError("confirm"))

/* PASSWORD STRENGTH */

password.addEventListener("input",()=>{

let value=password.value
let score=0

if(value.length>=8)score++
if(/[A-Z]/.test(value))score++
if(/[a-z]/.test(value))score++
if(/[0-9]/.test(value))score++

strength.classList.remove("weak","medium","strong")

if(score<=2)strength.classList.add("weak")
else if(score===3)strength.classList.add("medium")
else strength.classList.add("strong")

})

/* TOGGLE PASSWORD */

document.getElementById("toggle").onclick=()=>{

if(password.type==="password")
password.type="text"
else
password.type="password"

}

/* SUBMIT */

form.addEventListener("submit",(e)=>{

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

document.getElementById("success").innerText=
"Đăng ký thành công 🎉 Xin chào "+fullname.value

}

})
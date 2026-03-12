const steps = document.querySelectorAll(".step")
const progress = document.getElementById("progressBar")

let currentStep = 0

function showStep(index){

steps.forEach(step => step.classList.remove("active"))

steps[index].classList.add("active")

progress.style.width = ((index+1)/steps.length*100) + "%"

}

function validateStep1(){

let name = document.getElementById("fullname").value.trim()
let birth = document.getElementById("birthday").value
let gender = document.querySelector("input[name='gender']:checked")

if(name === "" || birth === "" || !gender){
alert("Vui lòng nhập đầy đủ thông tin")
return false
}

return true
}

function validateStep2(){

let email = document.getElementById("email").value.trim()
let pass = document.getElementById("password").value
let confirm = document.getElementById("confirm").value

if(email === "" || pass === "" || confirm === ""){
alert("Không được để trống")
return false
}

if(pass !== confirm){
alert("Mật khẩu không khớp")
return false
}

return true
}

document.getElementById("next1").onclick = function(){

if(validateStep1()){
currentStep++
showStep(currentStep)
}

}

document.getElementById("next2").onclick = function(){

if(validateStep2()){

let name = document.getElementById("fullname").value
let birth = document.getElementById("birthday").value
let gender = document.querySelector("input[name='gender']:checked").value
let email = document.getElementById("email").value

document.getElementById("summary").innerHTML =
`
<p><b>Họ tên:</b> ${name}</p>
<p><b>Ngày sinh:</b> ${birth}</p>
<p><b>Giới tính:</b> ${gender}</p>
<p><b>Email:</b> ${email}</p>
`

currentStep++
showStep(currentStep)

}

}

document.getElementById("back1").onclick = function(){

currentStep--
showStep(currentStep)

}

document.getElementById("back2").onclick = function(){

currentStep--
showStep(currentStep)

}

document.getElementById("form").onsubmit = function(e){

e.preventDefault()

alert("Đăng ký thành công!")

}
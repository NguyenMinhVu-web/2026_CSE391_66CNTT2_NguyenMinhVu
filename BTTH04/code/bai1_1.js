let students=[]

const nameInput=document.getElementById("name")
const scoreInput=document.getElementById("score")
const tableBody=document.getElementById("tableBody")
const stats=document.getElementById("stats")

document.getElementById("addBtn").addEventListener("click",addStudent)

scoreInput.addEventListener("keyup",function(e){
if(e.key==="Enter") addStudent()
})

function classify(score){
if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"
}

function addStudent(){

let name=nameInput.value.trim()
let score=parseFloat(scoreInput.value)

if(name=="" || isNaN(score) || score<0 || score>10){
alert("Không Hợp Lệ!")
return
}

students.push({name,score})

nameInput.value=""
scoreInput.value=""
nameInput.focus()

render()
}

function deleteStudent(index){
students.splice(index,1)
render()
}

function render(){

tableBody.innerHTML=""

let sum=0

students.forEach((s,i)=>{

sum+=s.score

let tr=document.createElement("tr")

if(s.score<5) tr.classList.add("weak")

tr.innerHTML=`
<td>${i+1}</td>
<td>${s.name}</td>
<td>${s.score}</td>
<td>${classify(s.score)}</td>
<td><button onclick="deleteStudent(${i})">Xóa</button></td>
`

tableBody.appendChild(tr)

})

let avg=students.length?(sum/students.length).toFixed(2):0

stats.innerText="Tổng SV: "+students.length+" | Điểm TB: "+avg
}
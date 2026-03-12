const students=[
{name:"Phạm Bích Huệ",score:9},
{name:"Dương Thanh Thư",score:7},
{name:"Lê Nam",score:4},
{name:"Phạm Minh",score:6}
]

let asc=true

const search=document.getElementById("search")
const filter=document.getElementById("filter")
const tableBody=document.getElementById("tableBody")

function classify(score){
if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"
}

function render(list){

tableBody.innerHTML=""

list.forEach(s=>{

let tr=document.createElement("tr")

tr.innerHTML=`
<td>${s.name}</td>
<td>${s.score}</td>
<td>${classify(s.score)}</td>
`

tableBody.appendChild(tr)

})
}

function applyFilters(){

let keyword=search.value.toLowerCase()
let type=filter.value

let result=students.filter(s=>{

let nameMatch=s.name.toLowerCase().includes(keyword)
let typeMatch=(type==="all") || classify(s.score)===type

return nameMatch && typeMatch

})

render(result)
}

document.getElementById("sortScore").addEventListener("click",()=>{

students.sort((a,b)=> asc ? a.score-b.score : b.score-a.score)

asc=!asc

applyFilters()

})

search.addEventListener("input",applyFilters)
filter.addEventListener("change",applyFilters)

render(students)
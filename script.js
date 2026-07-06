const API = "http://localhost:3000/students";

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");

const studentId = document.getElementById("studentId");
const usn = document.getElementById("usn");
const studentName = document.getElementById("studentName");
const department = document.getElementById("department");
const semester = document.getElementById("semester");
const section = document.getElementById("section");
const academicYear = document.getElementById("academicYear");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const totalStudents = document.getElementById("totalStudents");
const cseStudents = document.getElementById("cseStudents");
const eceStudents = document.getElementById("eceStudents");
const iotStudents = document.getElementById("iotStudents");

let students = [];

async function loadStudents() {

    const res = await fetch(API);

    students = await res.json();

    displayStudents(students);

    updateDashboard();

}

function displayStudents(data) {

    table.innerHTML = "";

    data.forEach(student => {

        table.innerHTML += `
        <tr>

        <td>${student.usn}</td>

        <td>${student.studentName}</td>

        <td>${student.department}</td>

        <td>${student.semester}</td>

        <td>${student.section}</td>

        <td>${student.academicYear}</td>

        <td>${student.email}</td>

        <td>${student.phone}</td>

        <td>

        <button class="editBtn"
        onclick="editStudent('${student.id}')">

        Edit

        </button>

        <button class="deleteBtn"
        onclick="deleteStudent('${student.id}')">

        Delete

        </button>

        </td>

        </tr>
        `;

    });

}

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        usn: usn.value,

        studentName: studentName.value,

        department: department.value,

        semester: semester.value,

        section: section.value,

        academicYear: academicYear.value,

        email: email.value,

        phone: phone.value

    };

    if(studentId.value==""){

        await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

    }

    else{

        await fetch(API+"/"+studentId.value,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

    }

    form.reset();

    studentId.value="";

    loadStudents();

});
async function editStudent(id) {

    const student = students.find(s => s.id == id);

    if (!student) return;

    studentId.value = student.id;
    usn.value = student.usn;
    studentName.value = student.studentName;
    department.value = student.department;
    semester.value = student.semester;
    section.value = student.section;
    academicYear.value = student.academicYear;
    email.value = student.email;
    phone.value = student.phone;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

async function deleteStudent(id){

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if(!confirmDelete) return;

    await fetch(API+"/"+id,{

        method:"DELETE"

    });

    loadStudents();

}

search.addEventListener("keyup",function(){

    const value = this.value.toLowerCase();

    const filtered = students.filter(student =>

        student.usn.toLowerCase().includes(value) ||

        student.studentName.toLowerCase().includes(value)

    );

    displayStudents(filtered);

});

function updateDashboard(){

    totalStudents.textContent = students.length;

    cseStudents.textContent = students.filter(

        s => s.department === "CSE"

    ).length;

    eceStudents.textContent = students.filter(

        s => s.department === "ECE"

    ).length;

    iotStudents.textContent = students.filter(

        s => s.department === "CSE(IoT)"

    ).length;

}

document.getElementById("clearBtn").addEventListener("click",function(){

    form.reset();

    studentId.value="";

});

loadStudents();
async function getTeachers(){
    const res=await fetch("http://localhost:3001/getTeachers")
    const teachers=await res.json();
    str=``
    teachers.map((teacher)=>{
        str+=` <div class="form-container">
        <form>
            <div class="form-row">
                <input type="text" class="ty" value=${teacher.name} placeholder="Name">
                <input type="text" class="ty" value=${teacher.designation} placeholder="Designation">
            </div>
            <div class="form-row">
                <input type="text" class="ty" value=${teacher.salary} placeholder="Salary">
                <input type="text" class="ty" value=${teacher.experience} placeholder="Experience">
           </div>
           
            <div class="form-actions">
                <button type="button" class="btn">Save</button>
                <button type="button" class="btn">Delete</button>
                <button type="button" class="btn">Edit</button>
            </div>
        </form>
    </div> `
    })
    document.getElementById("main").innerHTML=str;
}
getTeachers()
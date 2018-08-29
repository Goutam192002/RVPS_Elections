function loadStudentForm() {
let student_details=document.getElementById("student-details-section");
if(student_details.style.display==='none')
{
    student_details.style.display='flex';
}
else
{
    student_details.style.display='none';
}
}
$('#student-details-form').submit(function () {
    event.preventDefault();
    let formData=new FormData();
    formData.append('student_name',$('#student-name').val());
    formData.append('student_class',$('#student_class').val());
    formData.append('student_section',$('#student-section').val());
    formData.append('roll_no',$('#roll-no').val());
    formData.append('student_house',$('#student-house').val());
    formData.append('election_type',$('#election-type').val());
    console.log(formData);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function () {
        if(this.readyState===4 || this.status===400)
        {
            console.log('File uploaded');
            console.log(xhr.response);
        }
    };
    xhr.open('POST','student_details.php',true);
    xhr.send(formData);
   });
$(document).ready( function () {
    let cookie=document.cookie.split(';').pop();
    let admin_username=cookie.split('=').pop();
    let cookie_name=(document.cookie.split(';').pop()).split('=').slice();
    if (cookie_name[0]===' admin_username')
    {
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link href=admin.html>" + admin_username + "</a>";
    }
    else
    {
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link href=admin_login.html>Admin Login</a>";
    }
})


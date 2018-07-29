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
    var formData=new FormData();
    formData.append('student_name',$('#student-name').val());
    console.log(formData);
    $.ajax({
        url: 'student_details.php',
        type: 'POST',
        data: formData,
        processData: false,
    })

   });




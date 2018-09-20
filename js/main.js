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

let param = "";

function loadAllCandidates(param) {
    let houseName = "";
    $.ajax({
        url: 'get_candidates.php',
        data: {student_house: param},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            switch (param) {
                case "BH":
                    houseName = "Bhaskara House";
                    break;
                case "SH":
                    houseName = "Shushrutha House";
                    break;
                case "CH":
                    houseName = "Charaka House";
                    break;
                case "AH":
                    houseName = "Aryabhatta House";
                    break;
            }
            document.getElementById('school-vice-captain-section').innerHTML = '<h5>School Vice Captain</h5>' +
                '<div class=\"form-group\">' +
                '<select class=\"form-control input-lg\" id=\"school-vice-captain-select\" required>' +
                '<option class=\"active disabled\" value=\"none\">Select school vice captain</option>' +
                '</select>' +
                '</div>';
            document.getElementById('school-captain-section').innerHTML = '<h5>School Captain</h5>' +
                +'<div class="form-group">'
                + '<select class=" form-control input-lg " id="school-captain-select" required>'
                + '<option class="disabled active" value="none">Select school captain</option>' +
                +'</select>' +
                '</div>';
            document.getElementById('house-captain-section').innerHTML = "<h5>" + houseName + " Captain</h5>" +
                "<div class='form-group'>" +
                "<select class='form-control input-lg selectpicker' id='house-captain' required>" +
                "<option class='active disabled' value='none'>Select house captain</option></select>  " +
                "</div>";
            document.getElementById('house-vice-captain-section').innerHTML = "<h5>" + houseName + " Vice Captain</h5>" +
                "<div class='form-group'>" +
                "<select  class='form-control input-lg selectpicker' id='house-vice-captain' required>" +
                "<option class='active disabled' value='none'>Select house vice captain</option></select>" +
                "</div>";
            for (let i = 0; i < res.length; i++) {
                if (res[i].election_type == "SLCN")
                    document.getElementById('school-captain-select').appendChild(returnChild(res[i]));
                else if (res[i].election_type == "SVCN")
                    document.getElementById('school-vice-captain-select').appendChild(returnChild(res[i]));
                else if ((res[i].election_type).substring(1, 4) == "HCN")
                    document.getElementById('house-captain').appendChild(returnChild(res[i]));
                else if ((res[i].election_type).substring(1, 5) == "HVC")
                    document.getElementById('house-vice-captain').appendChild(returnChild(res[i]));
            }
        }
    })
}

function returnChild(res) {
    let opt = document.createElement('option');
    opt.value = res.contestant_id;
    opt.innerText = res.contestant_name;
    return opt;
}

let formData = new FormData();
let studentClass;
let studentSection;
let studentRollno;
let studentHouse;
$('#student-details-form').submit(function (e) {
    e.preventDefault();
    param = $('#student-house').val();
    studentClass = $('#student_class').val();
    studentHouse = $('#student-house').val();
    studentRollno = $('#roll-no').val();
    studentSection = $('#student-section').val();
    formData.append('student_class', studentClass);
    formData.append('student_section', studentSection);
    formData.append('roll_no', studentRollno);
    formData.append('student_house', studentHouse);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function () {
        if(this.readyState===4 || this.status===400)
        {
            //console.log(xhr.response);
            if (xhr.response == "\"OK\"") {
                loadAllCandidates(param);
                $('#student-details-section').hide();
                document.getElementById('invalid-student-details').style.display = "none";
                document.getElementById('voting-section').style.display = "block";
            }
            else {
                document.getElementById('invalid-student-details').style.display = 'block';
                document.getElementById('invalid-student-details').innerText = xhr.response;
            }
        }
    };
    xhr.open('POST','student_details.php',true);
    xhr.send(formData);
   });
$('#vote-form').submit(function (e) {
    e.preventDefault();
    if (document.getElementById('school-captain-select').value == 'none' || document.getElementById('school-vice-captain-select') == 'none' || document.getElementById('house-captain').value == 'none' || document.getElementById('house-vice-captain').value == 'none') {
        document.getElementById('after-vote-message').classList.add('alert', 'alert-success', 'col-6', 'ml-auto', 'mr-auto');
        document.getElementById('after-vote-message').innerHTML = '<p>Select atleast one option</p>';
        document.getElementById('after-vote-message').style.display = 'block';
    }
    else {
        $.ajax(
            {
                url: 'submit_votes.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    school_captain_vote: document.getElementById('school-captain-select').value,
                    school_vice_captain_vote: document.getElementById('school-vice-captain-select').value,
                    house_captain_vote: document.getElementById('house-captain').value,
                    house_vice_captain_vote: document.getElementById('house-vice-captain').value,
                    voter_class: studentClass,
                    voter_section: studentSection,
                    voter_roll_no: studentRollno,
                    voter_house: studentHouse
                },
                success: function (res) {
                    if (res == "OK") {
                        document.getElementById('after-vote-message').classList.add('alert', 'alert-success', 'col-6', 'ml-auto', 'mr-auto');
                        //document.getElementById('after-vote-message').style.alignItems='center';
                        document.getElementById('after-vote-message').innerHTML = '<p>Vote successfully casted</p>' +
                            '<button class="btn btn-primary" onclick="goBackToVoterForm()">Go Back and vote</button>';
                        document.getElementById('after-vote-message').style.display = 'block';
                    }
                    else {
                        document.getElementById('after-vote-message').classList.add('alert', 'alert-danger', 'col-6');
                        //document.getElementById('after-vote-message').style.alignItems='center';
                        document.getElementById('voting-card').innerHTML = '<p>' + res + '</p>' +
                            '<button class="btn btn-primary" onclick="goBackToVoterForm()">Go Back and vote</button>';
                        document.getElementById('after-vote-message').style.display = 'block';
                    }
                }
            }
        )
    }
});

function goBackToVoterForm() {
    loadStudentForm();
    document.getElementById('voting-section').style.display = 'none';
    document.getElementById('after-vote-message').style.display = 'none';
}
$(document).ready( function () {
    let cookie=document.cookie.split(';').pop();
    let admin_username=cookie.split('=').pop();
    let cookie_name=(document.cookie.split(';').pop()).split('=').slice();
    if (cookie_name[0] === 'admin_username')
    {
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link href=admin.html>" + admin_username + "</a>";
    }
    else
    {
        document.getElementById("admin-name-header").innerHTML = "<a class=nav-link href=/admin_login.html>Admin Login</a>";
    }
});


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
            document.getElementById('house-captain-section').innerHTML = "<h5>" + houseName + " Captain</h5>" +
                "<div class='form-group'>" +
                "<select class='form-control input-lg selectpicker' id='house-captain' required>" +
                "<option class='active disabled'>Select house captain</option></select>  " +
                "</div>";
            document.getElementById('house-vice-captain-section').innerHTML = "<h5>" + houseName + " Vice Captain</h5>" +
                "<div class='form-group'>" +
                "<select  class='form-control input-lg selectpicker' id='house-vice-captain' required>" +
                "<option class='active disabled'>Select house vice captain</option></select>" +
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
$('#student-details-form').submit(function () {
    event.preventDefault();
    formData.append('student_class',$('#student_class').val());
    formData.append('student_section',$('#student-section').val());
    formData.append('roll_no',$('#roll-no').val());
    formData.append('student_house',$('#student-house').val());
    param = $('#student-house').val();
    //console.log(formData);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function () {
        if(this.readyState===4 || this.status===400)
        {
            console.log(xhr.response);
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
    $.ajax(
        {
            url: 'submit_votes.php',
            type: 'POST',
            dataType: 'json',
            data: {
                school_captain_vote: document.getElementById('school-captain-select').value,
                school_vice_captain_vote: document.getElementById('school-vice-captain-vote').value,
                house_captain_vote: document.getElementById('house-captain').value,
                house_vice_captain_vote: document.getElementById('house-vice-captain').value
            },
            success: function (res) {
                //do something
            }
        }
    )
});
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
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link href=admin_login.html>Admin Login</a>";
    }
});


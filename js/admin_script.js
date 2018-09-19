let cookie=document.cookie.split(';').pop();
let admin_username=cookie.split('=').pop();
let admin_password = "";
$(document).ready(function () {
    let cookie_name=(document.cookie.split(';').pop()).split('=').slice();
    //console.log(cookie_name[0]);
    if (cookie_name[0] == 'admin_username')
    {
        document.getElementById("admin-name-header").innerHTML = "<a class=nav-link href=admin.html id='admin-username-navigation'>" + admin_username + "</a>";
    }
    else
    {
        document.getElementById("admin-name-header").innerHTML = "<a class=nav-link id='admin-username-navigation' href=admin_login.html>Admin Login</a>";
    }
            $.ajax({
                url: 'retreive_admin_details.php',
                data: {
                    admin_username: admin_username,
                },
                type: "POST",
                dataType: "json",
                success: function (response) {
                        document.getElementById("admin_details_name").append(response.admin_name);
                        //document.getElementById("admin_details_password").type="password";
                        document.getElementById("admin_details_password").append(convertToPassword(response.admin_password));
                        document.getElementById("admin_details_mobileno").append(response.admin_mobile_no);
                        document.getElementById("admin_details_email").append(response.admin_email);
                        document.getElementById("table_admin_username").append(admin_username);
                    admin_password = response.admin_password;
                    document.getElementById("table_admin_password").append(convertToPassword(admin_password));
                    document.getElementById("table_admin_email").append(response.admin_email);
                    document.getElementById("table_admin_mobileno").append(response.admin_mobile_no);
                }
            })
        });
function convertToPassword(val) {
   let result="";
    for(let i=0;i<val.length;i++)
    {
        result+="*";
    }
    return result;
}
function change_admin_username() {
    document.getElementById('change-username-dialog').style.display="block";
    document.getElementById('change-password-dialog').style.display="none";
    document.getElementById('change-mobileno-dialog').style.display="none";
    document.getElementById('change-email-dialog').style.display="none";
    document.getElementById('current-username').value=admin_username;
    $('#change-username-form').submit(function (e) {
        e.preventDefault();
        let new_username=document.getElementById('new-username').value;
        $.ajax({
            url: 'change_username.php',
            data: {
                new_username: new_username
            },
            type: "POST",
            dataType: "json",
            success: function (response) {
                if(response==="username available")
                {
                    admin_username=new_username;
                    document.cookie="admin_username="+admin_username+" ; path=/";
                    document.getElementById('admin-username-navigation').innerText=admin_username;
                    document.getElementById('table_admin_username').innerText=admin_username;
                }
                else
                {
                    document.getElementById('username-availability').innerText = response;
                }
            }
        })
    })
}
function change_admin_password() {
    document.getElementById('change-password-dialog').style.display="block";
    document.getElementById('change-username-dialog').style.display="none";
    document.getElementById('change-mobileno-dialog').style.display="none";
    document.getElementById('change-email-dialog').style.display="none";
    document.getElementById('current-password').value = convertToPassword(admin_password);
    $('#change-password-form').submit(function (e) {
        e.preventDefault();
        let new_password = document.getElementById('new-password').value;
        if (new_password === admin_password) {
            document.getElementById('password-alerts').innerText = "Current password and new password cannot be the same";
        }
        if (new_password.length < 8) {
            document.getElementById('password-alerts').innerText = "Password cannot be less than 8 characters long"
        }
        let conf_new_password = document.getElementById('confirm-new-password').value;
        if (new_password !== conf_new_password) {
            document.getElementById('confirm-password-alerts').innerText = "Passwords do not match"
        }
        $.ajax({
            url: 'change_password.php',
            data: {
                new_password: new_password
            },
            type: "POST",
            dataType: "json",
            success: function (response) {
                if (response === "OK") {
                    document.getElementById('table_admin_password').innerText = convertToPassword(new_password);
                    document.getElementById('admin_details_password').innerText = "Password: " + convertToPassword(new_password);
                }
                else {
                    document.getElementById('password-alerts').innerText = response;
                }
            }
        })
    })
}
function change_admin_email() {
    document.getElementById('change-email-dialog').style.display="block";
    document.getElementById('change-password-dialog').style.display="none";
    document.getElementById('change-username-dialog').style.display="none";
    document.getElementById('change-mobileno-dialog').style.display="none";

}
function change_admin_mobileno() {
    document.getElementById('change-mobileno-dialog').style.display="block";
    document.getElementById('change-email-dialog').style.display="none";
    document.getElementById('change-password-dialog').style.display="none";
    document.getElementById('change-username-dialog').style.display="none";

}
function addOrRemoveCandidates() {
    /* document.getElementById("admin-home").style.display="none";
     document.getElementById("add-remove-voters").style.display="none";
     document.getElementById("add-remove-administrators").style.display="none";
     document.getElementById("add-remove-candidates").style.display="block";*/
    refreshCandidateTable();
}
function addOrRemoveVoters() {
    /*document.getElementById("admin-home").style.display="none";
    document.getElementById("add-remove-candidates").style.display="none";
    document.getElementById("add-remove-administrators").style.display="none";
    document.getElementById("add-remove-voters").style.display="block";*/
    refreshVotersTable();
}
function addOrRemoveAdministrators() {
    /*document.getElementById("admin-home").style.display="none";
    document.getElementById("add-remove-voters").style.display="none";
    document.getElementById("add-remove-candidates").style.display="none";
    document.getElementById("add-remove-administrators").style.display="block";*/
    refreshAdministratorTable();
}
function adminLogoutYes() {
document.cookie='admin_username= ; path=/ ; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.open("index.html", "_self");
}

let old_candidate_id = "";
$('#type-of-form').on('change', function (e) {
    e.preventDefault();
    console.log(document.getElementById('type-of-form').value);
    if (document.getElementById('type-of-form').value == "new-candidate")
        document.getElementById('candidate-form-header').innerText = "Add a new candidate";
    else
        document.getElementById('candidate-form-header').innerText = "Edit candidate Details";
});
$('#add-edit-candidate').submit(function (e) {
    e.preventDefault();
    let typeOfForm = document.getElementById('type-of-form').value;
    let formData = new FormData();
    formData.append("contestant-name", document.getElementById("candidate-name").value);
    formData.append("contestant-election-type", document.getElementById('candidate-election-type').value);
    formData.append("contestant-picture", document.getElementById("candidate-picture").files[0]);
    formData.append("type-of-form", typeOfForm);
    if (typeOfForm == "edit-candidate") {
        formData.append("old-candidate-id", old_candidate_id);
    }
    $.ajax({
        url: "add_candidate.php",
        data: formData,
        type: "POST",
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            if (response == "OK") {
                refreshCandidateTable();
            }
            else {
                document.getElementById("response").innerHTML = "<p class=text-danger>" + response + "</p>";
                $('#response').show().delay(5000).queue(function (n) {
                    $(this).hide();
                })
            }
        }
    })
});
let iRes = 0;
let tempRes = [];
function refreshCandidateTable() {
    $.ajax({
        url: 'load_candidates_details.php',
        type: 'GET',
        dataType: "json",
        success: function (res) {
            document.getElementById("candidates-table-body").innerHTML = "";
            for (iRes = 0; iRes < res.length; iRes++) {
                tempRes[res[iRes].contestant_id] = JSON.stringify(res[iRes]);
                document.getElementById("candidates-table-body").innerHTML += "<tr>" +
                    "<td class=\'contestant-picture\'>" +
                    "<img src=\'" + res[iRes].contestant_picture + "\' alt=\'image-of-candidate\'  height=\'100\'>" +
                    "</td>" +
                    "<td class=\'contestant-name\'>" + res[iRes].contestant_name + "</td>" +
                    "<td class=\'contestant-id\'>" + res[iRes].contestant_id + "</td>" +
                    "<td class=\'election-type\'>" + res[iRes].election_type + "</td>" +
                    "<td><a href=\'#\' onclick=changeCandidateDetails('" + res[iRes].contestant_id + "')  style=\'padding-right: 1rem\' id=\'edit-candidate\'>Edit</a>" +
                    "<a href='#' onclick=removeCandidate('" + res[iRes].contestant_id + "')>Remove</a></td></tr>";
            }
        }
    })
}

function changeCandidateDetails(candidate_id) {
    //document.getElementById('add-new-candidate').style.display = "none";
    //document.getElementById('change-candidate-details').style.display = "block";
    document.getElementById('candidate-form-header').innerText = "Edit Candidate Details";
    tempRes[candidate_id] = JSON.parse(tempRes[candidate_id]);
    document.getElementById('candidate-name').value = tempRes[candidate_id].contestant_name;
    let res_election_type = tempRes[candidate_id].election_type;
    document.getElementById('candidate-election-type').value = res_election_type;
    old_candidate_id = tempRes[candidate_id].contestant_id;
    document.getElementById('type-of-form').value = 'edit-candidate';
}
function removeCandidate(candidate_id_2) {
    tempRes[candidate_id_2] = JSON.parse(tempRes[candidate_id_2]);
    document.getElementById('Remove-candidate-modal-content').innerHTML = '<p>Are you sure you want to remove the following candidate' +
        'Candidate Name:' + tempRes[candidate_id_2].contestant_name +
        'Candidate ID:' + tempRes[candidate_id_2].contestant_id +
        'Elections:' + tempRes[candidate_id_2].election_type + '</p>';
    //the above innerHTML is not working for unknown reasons
    document.getElementById('Remove-candidate-modal-content').outerHTML = '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>\n' +
        '                <button type="button" class="btn btn-primary" onclick=removeCandidateYes("' + candidate_id_2 + '")>Yes</button>\n' +
        '            </div>';
    $('#removeCandidateModal').modal('show');
}

function removeCandidateYes(candidate_id_3) {
    $.ajax({
        url: 'remove_candidate.php',
        type: 'POST',
        data: {
            candidate_id: candidate_id_3
        },
        dataType: 'JSON',
        success: function (responseServer) {
            if (responseServer == "OK") {
                $('#removeCandidateModal').modal('hide');
                refreshCandidateTable();
            }
            else {
                document.getElementById('removeCandidateModal').innerHTML = '<div class=\'alert alert-danger\'>'
                    + '<h5>Sorry...Error Occured Please try again</h5>' +
                    '</div>';
                document.getElementById('removeCandidateModal').outerHTML = '<button type=\'button\' class=\'btn btn-primary\' data-dismiss=\'modal\'>OK</button>';
            }
        }
    })
}

res = {};
$('#add-new-voter-class').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: 'add_class_voters.php',
        type: 'POST',
        data: {
            "voters-class": document.getElementById('new-voters-class').value,
            "voters-section": document.getElementById('new-voters-section').value,
            "no-of-students": document.getElementById('no-of-students').value
        },
        dataType: 'json',
        success: function (res) {
            if (res == "OK")
                refreshVotersTable();

        }
    })
});
function refreshVotersTable() {
    $.ajax({
        url: 'refresh_voter_details.php',
        type: 'GET',
        dataType: "json",
        success: function (res) {
            document.getElementById("voters-table-body").innerHTML = "";
            for (let i = 0; i < res.length; i++) {
                document.getElementById("voters-table-body").innerHTML += "<tr>" +
                    "<td>" + res[i].student_class + "</td>" +
                    "<td>" + res[i].student_section + "</td>" +
                    "<td>" + res[i].no_of_students + "</td>" +
                    "<td><a data-toggle=\"modal\" data-target=\"#removeVoterModal\" onclick=removeVoter('" + JSON.stringify(res[i]) + "')>Remove</a></td></tr>";
            }
        }
    })
}

function removeVoter(param) {
    param = JSON.parse(param);
    document.getElementById("Remove-voter-modal-content").innerText = "Are you sure you want to delete the class " + param.student_class +
        "and section " + param.student_section;
    document.getElementById("Remove-voter-modal-content").outerHTML = "<div class='modal-footer'>\n" +
        "                <button type='button' class='btn btn-secondary' data-dismiss='modal'>No</button>\n" +
        "                <button type='button' class='btn btn-primary' onclick=removeVoterYes('" + JSON.stringify(param) + "')>Yes</button>" +
        "                    </div>";
}

function removeVoterYes(param) {
    param = JSON.parse(param);
    $.ajax({
        url: 'remove_voter_class.php',
        type: 'POST',
        data: {
            voter_class: param.student_class,
            voter_section: param.student_section
        },
        dataType: 'json',
        success: function (responseServer) {
            if (responseServer == "OK") {
                $('#removeVoterModal').modal('hide');
                refreshVotersTable();
            }
            else {
                document.getElementById('removeVoterModal').innerHTML = '<div class=\'alert alert-danger\'>'
                    + '<h5>Sorry...Error Occured Please try again</h5>' +
                    '</div>';
                document.getElementById('removeVoterModal').outerHTML = '<button type=\'button\' class=\'btn btn-primary\' data-dismiss=\'modal\'>OK</button>';
            }
        }
    })
}

function refreshAdministratorTable() {
    $.ajax({
        url: 'load_administrator_details.php',
        type: 'GET',
        dataType: 'json',
        success: function (responseAdministratorTable) {
            document.getElementById('administrator-table-body').innerHTML = " ";
            for (let i = 0; i < responseAdministratorTable.length; i++) {
                responseAdministratorTable[i].admin_password = convertToPassword(responseAdministratorTable[i].admin_password);
                document.getElementById('administrator-table-body').innerHTML += '<tr><td>' + responseAdministratorTable[i].admin_username + '</td>' +
                    '<td>' + responseAdministratorTable[i].admin_password + '</td>' +
                    '<td>' +
                    '<a id="removeAdmin" onclick=removeAdmin("' + responseAdministratorTable[i].admin_username + '")>Remove</a> ' +
                    '</td>' +
                    '</tr>';
            }
        }
    })
}

$('#admin-name').on('change', function () {
    let hasNumber = /\d/;
    if (hasNumber.test(document.getElementById('admin-name').value)) {
        document.getElementById('name-error').innerText = "Admin Name cannot contain numbers";
        document.getElementById('admin-name').style = "border: 1px solid #FF1F1F;\n" +
            "    border-radius: ;\n" +
            "    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
    else
        document.getElementById('admin-name').style = "border: 1px solid #05F02C;\n" +
            "    border-radius: 0.25rem;\n" +
            "    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;"
});
$('#admin-username').on('blur', function () {
    let username = document.getElementById('admin-username').value;
    $.ajax({
        url: 'check_username_availability.php',
        type: 'POST',
        dataType: 'json',
        data: {
            username: username
        },
        success: function (serverResponse) {
            if (serverResponse == "username already taken") {
                document.getElementById('is_username_available').innerText = serverResponse;
                document.getElementById('admin-username').style = "border: 1px solid #FF1F1F;\n" +
                    "    border-radius: ;\n" +
                    "    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
            } else
                document.getElementById('admin-username').style = "border: 1px solid #05F02C;\n" +
                    "    border-radius: 0.25rem;\n" +
                    "    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
        }
    })
});
$('#admin-mobileno').on('blur', function () {
    let mobile_no = document.getElementById('admin-mobileno').value;
    if (mobile_no.match(/^[0-9]+$/) && mobile_no.length == 10) {
        document.getElementById('admin-mobileno').style = "border: 1px solid #05F02C;\n" +
            "    border-radius: 0.25rem;\n" +
            "    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
    else {
        document.getElementById('mobileno_check').innerText = "Invalid Mobile no";
        document.getElementById('admin-mobileno').style = "border: 1px solid #FF1F1F;\\n\" +\n" +
            "                    \"    border-radius: ;\\n\" +\n" +
            "                    \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
});
$("#admin_email_address").on('blur', function () {
    let admin_emailid = document.getElementById('admin_email_address').value;
    if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(admin_emailid)) {
        document.getElementById('admin_email_address').style = "border: 1px solid #05F02C;\\n\" +\n" +
            "            \"    border-radius: 0.25rem;\\n\" +\n" +
            "            \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
    else {
        document.getElementById('emailid_check').innerText = "Invalid email address";
        document.getElementById('admin_email_address').style = "border: 1px solid #FF1F1F;\\n\" +\n" +
            "                    \"    border-radius: ;\\n\" +\n" +
            "                    \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
});
$('#admin-password').on('blur', function () {
    if (document.getElementById('admin-password').value.length < 8) {
        document.getElementById('password-error').innerText = "Password should be atleast 8 characters";
        document.getElementById('admin-password').style = "border: 1px solid #FF1F1F;\\n\" +\n" +
            "                    \"    border-radius: ;\\n\" +\n" +
            "                    \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
});
$('#confirm-admin-password').on('blur', function () {
    if ((document.getElementById('admin-password').value) == (document.getElementById('confirm-admin-password').value)) {
        document.getElementById('admin-password').style = "border: 1px solid #05F02C;\\n\" +\n" +
            "            \"    border-radius: 0.25rem;\\n\" +\n" +
            "            \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
        document.getElementById('confirm-admin-password').style = "border: 1px solid #05F02C;\\n\" +\n" +
            "            \"    border-radius: 0.25rem;\\n\" +\n" +
            "            \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
    else {
        document.getElementById('confirm-password-error').innerText = "Passwords do not match";
        document.getElementById('admin-password').style = "border: 1px solid #FF1F1F;\\n\" +\n" +
            "                    \"    border-radius: ;\\n\" +\n" +
            "                    \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
        document.getElementById('confirm-admin-password').style = "border: 1px solid #FF1F1F;\\n\" +\n" +
            "                    \"    border-radius: ;\\n\" +\n" +
            "                    \"    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;";
    }
});

$('#add-new-admin-form').submit(function (e) {
    let admin_name = document.getElementById('admin-name').value;
    admin_password = document.getElementById('admin-password').value;
    admin_username = document.getElementById('admin-username').value;
    let admin_mobileno = document.getElementById('admin-mobileno').value;
    let admin_email = document.getElementById('admin_email_address').value;
    e.preventDefault();
    $.ajax({
        url: 'add_new_admin.php',
        type: 'POST',
        dataType: 'json',
        data: {
            admin_name: admin_name,
            admin_username: admin_username,
            admin_mobile_no: admin_mobileno,
            admin_email: admin_email,
            admin_password: admin_password
        },
        success: function (resp) {
            if (resp == "OK") {
                document.getElementById('add-new-admin-form').outerHTML = "<div class='alert alert-success' id='admin-form-success-message'>Administrator successfully added</div>";
                refreshAdministratorTable();
                $("#admin-form-success-message").delay(1000).fadeOut();
            }
        }
    })
});

function removeAdmin(admin_username) {
    document.getElementById("remove-administrator-modal-content").innerHTML = "<p>Are you sure you want to remove administrator<strong>" + admin_username + "</strong> ?";
    document.getElementById("remove-administrator-modal-content").outerHTML = "<button type='button' class='btn btn-secondary' data-dismiss='modal'>No</button>" +
        "<button type='button' data-toggle='modal' data-target='#removeAdminModal' class='btn btn-primary' onclick=removeAdminYes('" + admin_username + "')>Yes</button>";
    $('#removeVoterModal').show('show');
}

function removeAdminYes(param) {
    $.ajax({
        url: 'remove_admin.php',
        data: {
            admin_username: param
        },
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            if (response == "OK") {
                $('#removeAdminModal').show('hide');
                refreshAdministratorTable();
            }
            else {
                //do something
            }
        }
    })
}

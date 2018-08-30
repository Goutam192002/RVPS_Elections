let cookie=document.cookie.split(';').pop();
let admin_username=cookie.split('=').pop();
let admin_password = "";
$(document).ready(function () {
    let cookie_name=(document.cookie.split(';').pop()).split('=').slice();
    if (cookie_name[0]===' admin_username')
    {
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link href=admin.html id='admin-username-navigation'>" + admin_username + "</a>";
    }
    else
    {
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link id='admin-username-navigation' href=admin_login.html>Admin Login</a>";
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
    document.getElementById("admin-home").style.display="none";
    document.getElementById("add-remove-voters").style.display="none";
    document.getElementById("add-remove-administrators").style.display="none";
    document.getElementById("add-remove-candidates").style.display="block";
    console.log("executing ajax");
    $.ajax({
        url: 'load_candidates_details.php',
        type: 'POST',
        data: {},
        success: function (response) {
            console.log(response);
            document.getElementById("candidates-table-body").innerHTML = "<tr>" +
                "<td>" + response.contestant_picture + "</td>" +
                "<td>" + response.contestant_name + "</td>" +
                "<td>" + response.constestant_id + "</td>" +
                "<td>" + response.election_type + "</td>" +
                "<td><a href='#'>Edit</a>" +
                "<a href='#'>Remove</a></td></tr>";
        }
    })
}
function addOrRemoveVoters() {
    document.getElementById("admin-home").style.display="none";
    document.getElementById("add-remove-candidates").style.display="none";
    document.getElementById("add-remove-administrators").style.display="none";
    document.getElementById("add-remove-voters").style.display="block";
    //load voter details into the table
}
function addOrRemoveAdministrators() {
    document.getElementById("admin-home").style.display="none";
    document.getElementById("add-remove-voters").style.display="none";
    document.getElementById("add-remove-candidates").style.display="none";
    document.getElementById("add-remove-administrators").style.display="block";
    //load administrator details into the table
}
function adminLogoutYes() {
document.cookie='admin_username= ; path=/ ; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.open("index.html", "_self");
}


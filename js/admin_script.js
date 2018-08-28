$(document).ready(function () {
    let cookie=document.cookie.split(';').pop();
    let admin_username=cookie.split('=').pop();
    let cookie_name=(document.cookie.split(';').pop()).split('=').slice();
    console.log(cookie_name);
    if (cookie_name[0]===' admin_username')
    {
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link href=admin.html>" + admin_username + "</a>";
    }
    else
    {
        document.getElementById("admin-name-header").innerHTML="<a class=nav-link href=admin_login.html>Admin Login</a>";
    }
            $.ajax({
                url: 'retreive_admin_details.php',
                data: {
                    admin_username: admin_username,
                },
                type: "POST",
                dataType: "json",
                success: function (response) {
                        console.log(response);
                        document.getElementById("admin_details_name").append(response.admin_name);
                        //document.getElementById("admin_details_password").type="password";
                        document.getElementById("admin_details_password").append(convertToPassword(response.admin_password));
                        document.getElementById("admin_details_mobileno").append(response.admin_mobile_no);
                        document.getElementById("admin_details_email").append(response.admin_email);
                        document.getElementById("table_admin_username").append(admin_username);
                    document.getElementById("table_admin_password").append(convertToPassword(response.admin_password));
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
}
function change_admin_password() {
    document.getElementById('change-password-dialog').style.display="block";
    document.getElementById('change-username-dialog').style.display="none";
    document.getElementById('change-mobileno-dialog').style.display="none";
    document.getElementById('change-email-dialog').style.display="none";
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
    //load candidate details into the table
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


$(document).ready(function () {
            let cookie=document.cookie.split(';').pop();
            let admin_username=cookie.split('=').pop();
            console.log(admin_username);
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

}
function change_admin_password() {
    
}
function change_admin_email() {
    
}
function change_admin_mobileno() {
    
}
$("#admin-signin").submit(function (e) {
            e.preventDefault();
        let admin_username = $("#admin_username").val();
        let admin_password = $("#admin_password").val();
        $.ajax({
            url: 'php_admin_login.php',
            data: {
                admin_username: admin_username,
                admin_password: admin_password
            },
            type: "POST",
            dataType: "json",
            success: function (response) {
                if (response === "OK") {
                    window.open("admin.html", "_self");
                }
                else {
                    document.getElementById('admin-signin-card').innerHTML += '<div class="alert alert-danger"><h5>Error occured...Please try again</h5></div>';
                    console.log("error shown");
                }
            }
        });
        });
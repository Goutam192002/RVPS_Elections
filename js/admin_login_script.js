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
                    document.cookie="admin_username="+admin_username+" ; path=/";
                    window.open("admin.html", "_self");
                }
                else {
                    document.getElementById("error-alert").style.display="block";
                }
            }
        });
        });
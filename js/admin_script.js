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
                }
            })
        });
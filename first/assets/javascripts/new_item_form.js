validateProfile(){
	var x = document.forms["profile"]["username"].value;
    var y = document.forms["profile"]["full_name"].value;
    var z = document.forms["profile"]["email_id"].value;
    var a = document.forms["profile"]["shop_name"].value;
    var b = document.forms["profile"]["business_name"].value;
    var c = document.forms["profile"]["address_1"].value;

    if (x == ""){
        alert("Username can't be blank");
        return false;
    }

    if (y == ""){
        alert("Full Name must be between 6-30 characters");
        return false;
    }


    if (z == ""){
        alert("Email Id can't be blank");
        return false;
    }


    if (a == ""){
        alert("Shop Name can't be blank");
        return false;
    }


    if (b == ""){
        alert("Business Name can't be blank");
        return false;
    }


    if (c == ""){
        alert("Address 1 can't be blank");
        return false;
    }


    if (c == ""){
        alert("Address 2 can't be blank");
        return false;
    }


    if (c == ""){
        alert("City can't be blank");
        return false;
    }


    if (c == ""){
        alert("Pin Code can't be blank");
        return false;
    }

}
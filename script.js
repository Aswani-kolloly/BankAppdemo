//console.log(localStorage.getItem("acntno"));
class Bank {
    static accountDetails() {
        let userData = {
            1000: { acno: 1000, pswrd: "user1", blnce: 5000 },
            1002: { acno: 1001, pswrd: "user2", blnce: 3000 },
            1003: { acno: 1002, pswrd: "user3", blnce: 10000 },
        }
        return userData
    }

    static authenticate(acno, pswd)
     {
        var dataset = Bank.accountDetails()
        if (acno in dataset) {
            if (pswd == dataset[acno]["pswrd"]) {
                return 1
            }
            else {
                return 0//invalid pswd
            }

        }
        else {
            return -1//inv acntno
        }
    }
    static setStorage(acntno, pswd) {
        let obj = {
            actno: acntno,
            pswd: pswd
        }
        localStorage.setItem("data", JSON.stringify(obj))

    }

    static login() {
        var acno = document.querySelector("#acno").value
        var pswd = document.querySelector("#pwd").value
        let res = Bank.authenticate(acno, pswd)
        if (res == 0)
            alert("invalid pswd")
        else if (res == 1) {
            Bank.setStorage(acno, pswd)
            window.location.href = "home.html"

        }
        else if (res == -1)
            alert("invalid accntno")
    }
    static withdraw() {
        var acno = document.querySelector("#acno").value
        var pswd = document.querySelector("#pwd").value
        var amt = document.querySelector("#amt").value
        let res = Bank.authenticate(acno, pswd)
        var dataset = Bank.accountDetails()
        if (res == 1) {
            if (amt <= dataset[acno]["blnce"]) {
                dataset[acno]["blnce"] -= amt
                document.querySelector("#balance").value = dataset[acno]["blnce"]
            }
            else
                alert("no sufficient blnce")
        }
        else
            alert("Invalid credentials")

    }
    static deposit() {
        var acno = document.querySelector("#acno").value
        var pswd = document.querySelector("#pwd").value
        var amt = document.querySelector("#amt").value
        let res = Bank.authenticate(acno, pswd)
        var dataset = Bank.accountDetails()
        if (res == 1) {
            dataset[acno]["blnce"] += Number(amt)
            document.querySelector("#balance").value = dataset[acno]["blnce"]
        }
        else
            alert("Invalid credentials")


    }
    static logOut() {
        localStorage.removeItem("data")
    }
}

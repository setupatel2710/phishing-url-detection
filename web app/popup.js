let a = document.getElementById("run")

a.addEventListener("click", async (e) => {
        e.preventDefault()
        let b = document.getElementById("url").value
        console.log(b);

        fetch("http://127.0.0.1:8000/url/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"url":b})
        })
        .then((response) => response.json())
        .then((data) => { 
            console.log(data.pred);
            if (data.pred == 0){
                alert("Not a phishing url ")
            }else{
                alert("It may be a phishing url ")
            }
        })
        .catch(err => console.log(err))
    
    });

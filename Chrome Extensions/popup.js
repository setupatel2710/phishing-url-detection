let a = document.getElementById("run")
let b = document.getElementById("popup")
a.addEventListener("click", async () => {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
     

        fetch("http://127.0.0.1:8000/url/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"url":tabs[0].url})
        })
        .then((response) => response.json())
        .then((data) => { 
            if (data.pred == 0){
                alert(b.innerHTML ="Not a phishing url ")
            }else{
                alert(b.innerHTML ="It may be a phishing url ")
            }
        })
        .catch(err => console.log(err))
    
    });
  
  });

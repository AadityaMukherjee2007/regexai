document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").onsubmit = (event) => {
        event.preventDefault();
        const prompt = document.querySelector("#prompt").value;
        const csrfToken = document.querySelector("#csrf_token").value;
        
        fetch("/api/generate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.querySelector("#result").style.display = "block";
            document.querySelector("#output").innerHTML = data.regex;
        })
        .catch(err => {
            document.querySelector("#output").innerHTML = "Error generating regex.";
            console.error(err);
        });
    };

    document.querySelector("#copyBtn").onclick = function () {
        const text = document.querySelector("#output").textContent;
        navigator.clipboard.writeText(text)
        .then(() => {
            this.disabled = true;
            this.innerHTML = '<span class="text-green-600">Copied!</span>';

            setTimeout(() => {
                this.innerHTML = "Copy";
                this.disabled = false;
            }, 2000);
        });
    };

});
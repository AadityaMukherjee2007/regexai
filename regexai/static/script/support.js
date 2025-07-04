document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".donate-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const amount = parseInt(button.dataset.amount) * 100; // Convert ₹ to paise

            const options = {
                key: "rzp_live_Tal9iimMEYBftX", // Replace with your Razorpay API Key
                amount: amount,
                currency: "INR",
                name: "Buy Me a Coffee",
                description: "Support my work",
                image: "/static/images/coffee.png",
                handler: function (response) {
                    alert("Thanks for the support!\nPayment ID: " + response.razorpay_payment_id);
                },
                theme: {
                    color: "#facc15" // yellow-400
                }
            };

            const rzp = new Razorpay(options);
            rzp.open();
        });
    });
});

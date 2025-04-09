document.forms.namedItem("register")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(formElement));

    const userData = {
        name: formData["name"],
        email: formData["email"],
        password: formData["password"],
    };

    console.log("Sending request to register with data:", userData);

    const res = await fetch("/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "content-type": "application/json",
        },
        credentials: "same-origin"
    });

    if (res.status !== 201) {
        console.error("Something went wrong during registration");
        return;
    }

    if (res.ok) {
        window.location.replace("/");
    }
});
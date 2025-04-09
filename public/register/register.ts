document.forms.namedItem("register")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const userData = {
        name: formData.get("name")?.toString(),
        email: formData.get("email")?.toString(),
        password: formData.get("password")?.toString(),
    };

    console.log("Sending request to register with data:", userData);

    const res = await fetch("/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.status !== 201) {
        console.error("Something went wrong during registration");
        const errorData = await res.json();
        console.error("Error details:", errorData);
        return;
    }

    if (res.ok) {
        window.location.replace("../index.html");
    }
});
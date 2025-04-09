document.forms.namedItem("create fact")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const factData = Object.fromEntries(formData);

    const factDetails = {
        ...factData,
        description: factData.description || undefined,
        category: factData.category || "All",
    };

    const requestBody = JSON.stringify(factDetails);

    form
        .querySelectorAll("input, textarea, button")
        .forEach((element) => element.setAttribute("disabled", "true"));

    try {
        const response = await fetch(`/api/facts/`, {
            method: "POST",
            body: requestBody,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            window.location.href = "/index.html";
        } else {
            alert("Failed to add fact, please try again later.");
        }
    } catch (error) {
        console.error("Error during fact creation:", error);
        alert("An error occurred while creating the fact.");
    } finally {
        form.querySelectorAll("input, textarea, button")
            .forEach((element) => element.removeAttribute("disabled"));
    }
});
document.forms.namedItem("create fact")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const factData = Object.fromEntries(formData);

    const factDetails = {
        ...factData,
        description: factData.description || undefined,
        category: factData.category || "All",
        username: "current_user",
    };

    const requestBody = JSON.stringify(factDetails);

    form
        .querySelectorAll("input, textarea, button")
        .forEach((element) => element.setAttribute("disabled", "true"));

    await fetch(`/api/facts/`, {
        method: "POST",
        body: requestBody,
        headers: {
            "content-type": "application/json"
        },
        credentials: "include"
    });
    window.location.href = "/index.html";
});
export async function app() {
    const factsList = document.getElementById("facts");

    if (!factsList) return;

    try {
        const res = await fetch("/api/facts");

        if (!res.ok) {
            throw new Error(`Failed to load facts, status: ${res.status}`);
        }

        const facts = await res.json();

        if (facts.length > 0) {
            factsList.innerHTML = facts
                .map((fact: { title: string; description: string; link: string; category: string }) => {
                    return `
                        <li class="fact-item">
                            <h3>Title: ${fact.title}</h3>
                            <p><strong>Description:</strong> ${fact.description}</p>
                            <p><strong>Link:</strong> <a href="${fact.link}"target="_blank">Read more</a>
                            </p>
                            <p><strong>Category:</strong> ${fact.category}</p>
                        </li>
                    `;
                })
                .join("\n");
        } else {
            factsList.innerHTML = '<li>No facts available.</li>';
        }
    } catch (error) {
        console.error('Error loading facts:', error);
        factsList.innerHTML = '<li>Error loading facts.</li>';
    }
}

window.onload = app;
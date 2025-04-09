export async function app(facts: HTMLUListElement) {
    try {
        const res = await fetch("/api/facts");

        if (!res.ok) {
            throw new Error(`Failed to load facts, status: ${res.status}`);
        }

        const facts = await res.json();

        if (facts.length > 0) {
            facts.innerHTML = facts
                .map((fact: { title: string; description: string; link: string; category: string }) => {
                    return `
                        <li class="fact-item">
                            <h3>${fact.title}</h3>
                            <p>${fact.description}</p>
                            <a href="${fact.link}" target="_blank">Read more</a>
                            <p>Category: ${fact.category}</p>
                        </li>
                    `;
                })
                .join("\n");
        } else {
            facts.innerHTML = '<li>No facts available.</li>';
        }
    } catch (error) {
        console.error('Error loading facts:', error);
        facts.innerHTML = '<li>Error loading facts.</li>';
    }
}
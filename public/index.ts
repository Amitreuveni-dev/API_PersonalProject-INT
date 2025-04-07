export async function initApp(root: HTMLPreElement) {
    try {
        const res = await fetch('/api/facts');
        
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await res.json();
        root.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.log(error);
        root.textContent = 'Failed to load facts';
        
    }
}
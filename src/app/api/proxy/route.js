export async function GET(req) {
    const url = new URL(req.url);
    const externalUrl = url.searchParams.get('url'); 

    if (!externalUrl) {
        return new Response(JSON.stringify({ error: 'Missing URL parameter' }), { status: 400 });
    }

    try {
        // Fetch the external URL
        const response = await fetch(externalUrl);
        const data = await response.json();

        // Return the fetched data to the client
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data', details: error.message }), { status: 500 });
    }
}

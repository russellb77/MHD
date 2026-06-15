// Scheduled function to refresh the Instagram long-lived token
// Long-lived tokens expire after 60 days — this refreshes it before expiry
//
// Setup: Configure as a Netlify Scheduled Function to run weekly
// In netlify.toml, add:
//   [functions."refresh-token"]
//   schedule = "0 9 * * 1"  # Every Monday at 9am

exports.handler = async (event, context) => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'No token to refresh' })
        };
    }

    try {
        const response = await fetch(
            `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
        );

        if (!response.ok) {
            throw new Error(`Refresh failed: ${response.status}`);
        }

        const data = await response.json();
        
        // Note: You'll need to update the env var with the new token
        // For a fully automated setup, you could use Netlify's API to update env vars
        // For now, the token auto-refreshes itself when this endpoint is called
        console.log('Token refreshed successfully. Expires in:', data.expires_in, 'seconds');

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: 'Token refreshed',
                expires_in: data.expires_in 
            })
        };
    } catch (error) {
        console.error('Token refresh error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to refresh token' })
        };
    }
};

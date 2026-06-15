// Netlify serverless function to fetch Instagram posts
// Uses the Instagram Graph API with a long-lived access token
//
// Setup:
// 1. Create a Facebook Developer App at developers.facebook.com
// 2. Add "Instagram Graph API" product
// 3. Connect your @midhertsdivers Instagram (must be business/creator account)
// 4. Generate a long-lived access token
// 5. Add INSTAGRAM_ACCESS_TOKEN to Netlify environment variables

exports.handler = async (event, context) => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Instagram token not configured' })
        };
    }

    try {
        // Fetch recent media from Instagram Graph API
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=9&access_token=${token}`
        );

        if (!response.ok) {
            throw new Error(`Instagram API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter to only images and carousel albums (skip videos for gallery)
        const posts = data.data
            .filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
            .map(post => ({
                id: post.id,
                caption: post.caption || '',
                media_url: post.media_url,
                permalink: post.permalink,
                timestamp: post.timestamp
            }));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            },
            body: JSON.stringify(posts)
        };
    } catch (error) {
        console.error('Instagram fetch error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch Instagram posts' })
        };
    }
};

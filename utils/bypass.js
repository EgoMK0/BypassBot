const axios = require('axios');

async function bypassWithTrw(url) {
    try {
        const response = await axios.get(`https://api.bypass.vip/bypass?url=${encodeURIComponent(url)}`, {
            headers: {
                'Authorization': process.env.TRW_API_KEY || ''
            },
            timeout: 10000
        });
        
        if (response.data && response.data.destination) {
            return {
                success: true,
                url: response.data.destination,
                api: 'trw.lat'
            };
        }
        return { success: false, error: 'No destination found' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function bypassWithAce(url) {
    try {
        const response = await axios.post('https://api.acebypass.com/bypass', {
            url: url
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.ACE_API_KEY || ''}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        
        if (response.data && response.data.result) {
            return {
                success: true,
                url: response.data.result,
                api: 'ace'
            };
        }
        return { success: false, error: 'No result found' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function bypassLink(url) {
    let result = await bypassWithTrw(url);
    
    if (!result.success) {
        console.log('TRW API failed, trying ACE API...');
        result = await bypassWithAce(url);
    }
    
    return result;
}

module.exports = { bypassLink, bypassWithTrw, bypassWithAce };

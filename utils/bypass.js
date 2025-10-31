const axios = require('axios');

async function bypassWithTrw(url) {
    try {
        const response = await axios.get(`https://trw.lat/api/bypass?url=${encodeURIComponent(url)}`, {
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
        const response = await axios.get(`http://ace-bypass.com/api/bypass?url=${encodeURIComponent(url)}&apikey=${process.env.ACE_API_KEY || ''}`, {
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

const request = require('request');
const instagram_graph_api_host = 'https://graph.facebook.com/';

(async()=>{
    console.log('START');
    try {
        if (!process.argv[2] == true ||  !process.argv[3] == true || !process.argv[4] == true) {
            throw new Error('Arguments 0 or 1 or 2 are empty');
        }

        let first_access_token = process.argv[2];
        let app_id = process.argv[3];
        let app_secret = process.argv[4];

        // get second_access_token
        let response1 = await getRequest(instagram_graph_api_host + 'oauth/access_token?grant_type=fb_exchange_token&client_id=' + app_id + '&client_secret=' + app_secret + '&fb_exchange_token=' + first_access_token);
        let second_access_token = JSON.parse(response1.body).access_token;

        // get id
        let response2 = await getRequest(instagram_graph_api_host + 'me?access_token=' + second_access_token);
        let id = JSON.parse(response2.body).id;

        // get third_access_token
        let response3 = await getRequest(instagram_graph_api_host + id + '/accounts?access_token=' + second_access_token);
        let third_access_token = JSON.parse(response3.body).data[0].access_token;

        // get instagram business user id
        // it needs first_access_token , third_access_token can't be used it.
        let response4 = await getRequest(instagram_graph_api_host + 'me?fields=accounts{instagram_business_account}&access_token=' + first_access_token);
        let instagra_business_user_id = JSON.parse(response4.body).accounts.data[0].instagram_business_account.id;

        // stdout result
        console.log('THIRD_ACCESS_TOKEN        :' + third_access_token);
        console.log('INSTAGRAM_BUSINESS_USER_ID:' + instagra_business_user_id);

    } catch(error) {
        throw error;
    }
    console.log('END');
})();

/**
 * The generic function that request to internet resource.
 * Request method is 'GET'
 * @param {string} url 
 */
async function getRequest(url) {
    return new Promise((resolve,reject)=>{
        request({ method: 'GET', url: url, encoding: null } , (error,response,body)=>{
            if(error){
                reject(error);
            }
            if(response){
                resolve(response);
            }
        })
    });
}
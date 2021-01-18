//const request = require('request');
const axios = require('axios');
const instagram_graph_api_host = 'https://graph.facebook.com/v6.0/';

(async()=>{
    console.log('START');
    try {
        if (!process.argv[2] == true ||  !process.argv[3] == true || !process.argv[4] == true) {
            throw new Error('Arguments 0 or 1 or 2 are empty');
        }

        let first_access_token = process.argv[2];
        let app_id = process.argv[3];
        let app_secret = process.argv[4];

        // axios client
        let axiosClient = axios.create({
            baseURL: instagram_graph_api_host
        });

        // get second_access_token
        let response1 = await axiosClient.get('oauth/access_token' , {
            params: {
                grant_type: 'fb_exchange_token',
                client_id: app_id,
                client_secret: app_secret,
                fb_exchange_token: first_access_token
            }
        });
        let second_access_token = response1.data.access_token;
        console.log('second_access_token:' + second_access_token);

        // get id
        let response2 = await axiosClient.get('me',{
            params: {
                access_token: second_access_token
            }
        });
        let id = response2.data.id;
        console.log('id:' + id);

        // get third_access_token
        let response3 = await axiosClient.get(id+'/accounts',{
            params: {
                access_token: second_access_token
            }
        });
        let third_access_token = response3.data.data[0].access_token;
        // get instagram business user id
        // it needs first_access_token , third_access_token can't be used it.
        console.log('third_access_token:' + third_access_token);
        let response4 = await axiosClient.get('me',{
            params: {
                fields: 'accounts{instagram_business_account}',
                access_token: first_access_token
            }
        });
        let instagra_business_user_id = response4.data.accounts.data[0].instagram_business_account.id;

        // stdout result
        console.log('THIRD_ACCESS_TOKEN        :' + third_access_token);
        console.log('INSTAGRAM_BUSINESS_USER_ID:' + instagra_business_user_id);

    } catch(error) {
        throw error;
    }
    console.log('END');
})();

import { Linking } from 'react-native';
import qs from 'qs';
import config from '../config';

function OAuth(cb) {
  Linking.addEventListener('url', handleUrl);

  function handleUrl(event) {
    console.log("event url:", event.url);
    const [, query_string] = event.url.match(/\#(.*)/);
    console.log(query_string);
    const query = qs.parse(query_string);
    console.log(`query: ${JSON.stringify(query)}`);
    cb(query.access_token);
  }

  const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
    client_id: config.client_id,
    response_type: 'token',
    scope: 'heartrate activity activity profile',
    redirect_uri: 'exp://',
    expires_in: '31536000',
  })}`;
  console.log(oauthurl);
  Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
}

export default OAuth;
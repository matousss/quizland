const GOOGLE_USER_INFO = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=';

const getUserInfoURL = (access_token: string) => {
    return GOOGLE_USER_INFO + access_token;
}
const getGoogleUser = ({id_token, access_token}: {id_token: string, access_token: string}) => {

}




export {getGoogleUser}
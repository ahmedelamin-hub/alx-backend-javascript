import { uploadPhoto, createUser } from './utils.js';

function handleProfileSignup() {
    return Promise.all([uploadPhoto(), createUser()])
        .then((responses) => {
            const [photoResponse, userResponse] = responses;
            console.log(`${photoResponse.body} ${userResponse.firstName} ${userResponse.lastName}`);
        })
        .catch(() => {
            console.log('Signup system offline');
        });
}

export default handleProfileSignup;

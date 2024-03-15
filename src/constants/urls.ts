const baseURL = 'https://jsonplaceholder.typicode.com';

const posts = '/posts';
const users = '/users';

const urls = {
    users:{
        base: users,
        byId:(id:number):string => `${users}/${id}`
    },
    posts:{
        base: posts,
        byId:(id:number):string => `${posts}/${id}`
    }
};

export {
    baseURL,urls
}
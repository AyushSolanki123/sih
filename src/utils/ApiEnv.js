const env={
    baseUrl: 'https://aquadetec-backend.herokuapp.com/api/v1',
    // Authentication
    login: '/auth/login',
    register: '/auth/register',
    refreshToken: '/auth/refreshToken',
    status: '/auth/login/status',
    //Users
    getUser: '/user',
    updateUser: '/user/',
    //history
    listHistory: '/history/{userId}',
}

export default env;
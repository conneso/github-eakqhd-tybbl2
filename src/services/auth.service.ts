import axios from "axios";

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    sessionStorage.removeItem('user')
    setTimeout(callback, 100);
  },
};

const auththentication = {
  async singin(u: String, p: String): Promise<any> {
    var result = await axios({
      method: 'POST',
      url: `http://localhost:3001/api/users/signin`,
      data: { username: u, password: p }
    })
    if (result.data.existed === true) {
      // delete axios.defaults.headers.common['Authorization']
      // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      // //Setup header for interceptor
      axios.interceptors.request.use((config: any) => {
        config.headers.Authorization = `Bearer ${result.data.token}`
        return config
      }, error => {
        return Promise.reject(error);
      });
    }
    return result;
  },
  signout(): void {
    sessionStorage.removeItem('token')
  }
}
function useAuth() {
  return { user: sessionStorage.getItem('user'), token: sessionStorage.getItem('token') }
  // return React.useContext(AuthContext);
}

export { fakeAuthProvider, auththentication, useAuth };
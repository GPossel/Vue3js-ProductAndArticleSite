import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore(
    {
        state: {
            token:  localStorage.getItem('myJWT'),
            username: localStorage.getItem('username'),
            errormessages: ''
        },
        getters: {
            isAuthenticated(state){
                if((state.token != null) || (state.username != null))
                {
                    return true;
                }
                return false;
            }
        },
        mutations: {
            authenticateUser(state, parameters){
                state.token = parameters.token,
                state.username = parameters.username
            }
        },
        actions: {
            authLogin({ commit }){
                const token = localStorage.getItem('myJWT');
                const username = localStorage.getItem('username');

                if(token && username) {
                    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;

                    commit('authenticateUser', {
                        token: token,
                        username: username
                    })
                }
            },

            login({ commit }, parameters)
            {
                return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('username', parameters.username);
                formData.append('pass', parameters.pass); 

                axios.post("http://localhost:8081/src/repository/login.php", formData)
                    .then((response) => {
                    if(response.status == 200)
                        {
                            commit('authenticateUser', response.data)
                            const jwt = response.data;
                            this.JWT = jwt;
                            var myToken = 'Bearer ' + response.data;
                            // set localStorage
                            localStorage.setItem('myJWT', myToken);
                            localStorage.setItem('username', parameters.username);
                            axios.defaults.headers.common['Authorization'] = myToken;
                            resolve('Login successful')
                        }
                    })
                    .catch((error) =>
                    {
                        if(error.response.status >= 400)
                        {
                            reject(error.response.data)
                        }
                        else {
                            reject('Somehting went wrong..')
                        }
                        console.log(error);
                    });

                })
            },

            logout(){
                delete axios.defaults.headers.common["Authorization"];
                localStorage.clear();
                window.location.reload();
            }

        }
});

export default store;
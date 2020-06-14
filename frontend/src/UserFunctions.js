import axios from 'axios'

export const register=newUser=>{
    return axios
    .post('/users/register',{
        first_name:newUser.first_name,
        last_name:newUser.last_name,
        user_name:newUser.user_name,
        email:newUser.email,
        password:newUser.password
    })
    .then(res=>{
        console.log(res);
        if(res.data.status){
            return {"status":res.data.status};
        }
        return {"err":res.data.err};
        
    })
}

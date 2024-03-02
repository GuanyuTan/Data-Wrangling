import axios from "axios";
import { useAuth } from "../contexts/auth";
// import useRouter from "next/router";


// router = useRouter()
const api = axios.create(
    {
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        headers: {
            'Accept': 'application/json',
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    }
);



api.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (401===error.response.status){
        localStorage.removeItem('token');
    }
}
)

export default api;
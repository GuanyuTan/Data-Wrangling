import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';


const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`
// const userSubject = new BehaviorSubject((typeof window === 'undefined') && JSON.parse(localStorage.getItem('user')));
export const userService ={
    user: userSubject.asObservable(),
    get userValue () {return userSubject.value},
    login,
    logout,
    getAll
};

export const signup = async (values) => {
    try {
        const full_name = values["firstName"] + " " + values["lastName"]
        const body_ = {};
        for (const key in values) {
            if (key == "firstName" || key == "lastName" || key == "policy") {
                continue
            }
            body_[key] = values[key];
        }
        body_["full_name"] = full_name
        body_ = JSON.stringify(body_)
        const res = await fetch(`${baseUrl}/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body_
            }
        )
        return res
    } catch (error) {
        console.log(error)
    }
}

export const logout = async()=>{
    // (typeof window !== 'undefined')?localStorage.removeItem('user'):null;
    userSubject.next(null);
}

export const login =async(values) => {
    const res = await fetch(`${baseUrl}/token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              "username": values.username,
              "password": values.password
            }).toString()
          }
        )
    return res
}
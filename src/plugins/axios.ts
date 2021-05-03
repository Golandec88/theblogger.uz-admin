import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios';

import NotificationCreator from "./notification-creator";

export default async function request(method: Method, url: string, data?: {}, params?: string ) : Promise<AxiosResponse | AxiosError> {
    const parsedUrl = `http://api.theblogger.uz/api/${url}${params ? params : ""}`

    let config: AxiosRequestConfig = {
        method: method,
        url: parsedUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
        },
        data: data ? data : undefined,
    }

    return new Promise(function(resolve, reject) {
        axios(config)
            .then(res => resolve(res.data))
            .catch(err => {
                if(err.response) {
                    NotificationCreator(`Error ${err.response.data.code}`, 'error', err.response.data.message || err.message)
                    reject(err.response.data)
                } else {
                    NotificationCreator('Error', 'error', 'Не удалось загрузить ресурс')
                }
            }
        )
    });
}


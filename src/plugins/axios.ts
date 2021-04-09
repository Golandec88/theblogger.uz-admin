import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import NotificationCreator from "./notification-creator";

export default async function request(method: Method, url: string, data?: {}, params?: string ) : Promise<AxiosResponse | AxiosError> {
    const parsedUrl = `http://92.53.105.194:88/api/${url}${params ? params : ""}`

    let config: AxiosRequestConfig = {
        method: method,
        url: parsedUrl,
        data: data ? data : undefined,
    }

    return new Promise(function(resolve, reject) {
        axios(config)
            .then(res => resolve(res.data))
            .catch(err => {
                NotificationCreator('Error!', err.message.toString())
                reject(err)
            }
        )
    });
}


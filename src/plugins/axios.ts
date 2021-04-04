import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import NotificationCreator from "./notification-creator";

export default async function request(method: Method, url: string, params?: string) : Promise<AxiosResponse | AxiosError> {
    const parsedUrl = `https://api.exchangerate.host/${url}${params ? params : ""}`

    let config: AxiosRequestConfig = {
        method: method,
        url: parsedUrl,
        proxy: {
            host: 'https://api.exchangerate.host/',
            port: 3001
        }
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


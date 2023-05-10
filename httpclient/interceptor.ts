import { AxiosInstance } from 'axios'

export default function interceptor(httpService: AxiosInstance) {
    httpService.interceptors.request.use((request) => {
        //you can modify request headers here for adding authentication in request
        return request
    })
    httpService.interceptors.request.use(
        (response) => {
            return response
        },
        (error) => {
            if (error) {
                return Promise.reject(error.response)
            }
        }
    )
}

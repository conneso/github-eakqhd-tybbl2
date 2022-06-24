import axios from "axios"
const API_URL = 'http://localhost:3001/api'
export default class BaseService {
    endpoint: string
    api: string
    constructor(props: { endpoint: string }) {
        this.api = API_URL
        this.endpoint = props.endpoint
    }
    GetAll = async (params: { skip: any; take: any; orderBy: any }) => {
        var result = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}?skip=${params.skip}&limit=${params.take}&orderBy=${params.orderBy}`,
            data: null
        })
        return result;
    }

    FindById = async (id: string | undefined) => {
        var result = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/getById?id=${id}`,
            data: null
        })
        return result;
    }
}
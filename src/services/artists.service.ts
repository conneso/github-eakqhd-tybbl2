import axios from "axios";
import BaseService from "./base.service";
export default class ArtistService extends BaseService {
    constructor() {
        super({ endpoint: 'artists' })
    }
    async FindByName(filter: string){
        let token = sessionStorage.getItem('token');
        var result = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/findByName?filter=${filter}`,
            data: null
        })
        return result;
    }
    
    Count = async () => {
        let token = sessionStorage.getItem('token');
        var result = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/count`,
            data: null
        })
        return result;
    }
}
import axios from "axios";
import BaseService from "./base.service";
export default class ArtistService extends BaseService {
    constructor() {
        super({ endpoint: 'artists' })
    }
    async FindByName(filter: string) {
        var result = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/findByName?filter=${filter}`,
            data: null
        })
        return result;
    }

    Count = async () => {
        var result = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/count`,
            data: null
        })
        return result;
    }

    AddNewArtist = async (artist: any) => {
        var result = await axios({
            method: "PUT",
            url: `${this.api}/${this.endpoint}/addNewArtist`,
            data: {
                artist: artist
            }
        })
        return result
    }

    UpdateArtist = async (artist: any) => {
        var result = await axios({
            method: "POST",
            url: `${this.api}/${this.endpoint}/update`,
            data: {
                artist: artist
            }
        })
        return result
    }

    DeleteArtist = async (id: string) => {
        var result = await axios({
            method: "DELETE",
            url: `${this.api}/${this.endpoint}/deleteById?artworkId=${id}`,
            data: null
        })
        return result
    }
}
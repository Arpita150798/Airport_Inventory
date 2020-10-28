import axios from "axios";

export default class ConnectToApi {
    async postData(url, data) {
        var result = await axios.post(url, data);
        return result;
    }
    async getData(url) {
        var result = await axios.get(url);
        return result;
    }

}
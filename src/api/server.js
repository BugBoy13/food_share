import axios from 'axios';

const baseURL = 'https://us-central1-feed-the-needy-ea54c.cloudfunctions.net';

export default axios.create({
    baseURL
});
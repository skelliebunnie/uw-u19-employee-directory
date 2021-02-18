// https://randomuser.me/api/?results=5000

import axios from 'axios';
const BASEURL = "https://randomuser.me/api/?";
const NATIONALITIES = "nat=au,ca,es,fr,gb,us"
const LIMIT = "results=50";

export default {
  getUsers: function() {
    return axios.get(`${BASEURL}${NATIONALITIES}&${LIMIT}`);
  }
}
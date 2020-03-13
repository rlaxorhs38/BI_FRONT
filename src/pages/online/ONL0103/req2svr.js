import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getSaleByBrandList(year) {
    return axios.get(apiUrl() + "online/getSaleByBrandList", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  },
  getITOnOffSaleList(year) {
    return axios.get(apiUrl() + "online/getITOnOffSaleList", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  }
}

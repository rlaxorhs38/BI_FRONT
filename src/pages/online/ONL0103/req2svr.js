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
  },
  getBaseSaleList() {
    return axios.get(apiUrl() + "online/getBaseSaleList", {
      params : {}
    }).then(x => x.data)
  },
  getSaleByBrdDetailData(year) {
    return axios.get(apiUrl() + "online/getSaleByBrdDetailData", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  },
  getITOnOffDetailData(year) {
    return axios.get(apiUrl() + "online/getITOnOffDetailData", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  }
}

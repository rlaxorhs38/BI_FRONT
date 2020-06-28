import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getSaleListByBrand(yyyy, mm, week) {
    return axios.get(apiUrl() + "wee/getSaleListByBrand", {
      params : { 
        yyyy : yyyy,
        mm : mm,
        week : week
      }
    }).then(x => x.data)
  },
  getProgressData(yyyy, mm, week) {
    return axios.get(apiUrl() + "wee/getProgressData", {
      params : { 
        yyyy : yyyy,
        mm : mm,
        week : week
      }
    }).then(x => x.data)
  }
}

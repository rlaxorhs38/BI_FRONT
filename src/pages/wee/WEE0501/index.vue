<template>
  <div>
    <!-- drawer_열리는 클래스 : on -->
    <div class="layout_drawer" :class="{on: drawer}">
      <h1 class="tit_drawer teamSelector" @click="toMain"><img src="@/assets/images/img_logo.png" alt="sisun" /></h1>
      <side-menu @click="drawer = !drawer"></side-menu>
    </div>
    <!-- drawer button -->
    <div role="button" class="btn_drawer" @click.stop="drawer = !drawer">
      <i v-show="!drawer" class="material-icons">menu</i>
      <i v-show="drawer" class="material-icons">arrow_back_ios</i>
    </div>
    <div class="layout_obfuscator"></div>
    <!-- header -->
    <header class="header wrap">
      <div class="header_inner">
        <h2 class="layout_title">통합 영업본부 주간회의
          <small class="txt_date">
            <strong class="point_col1"></strong>
          </small>
        </h2>
        <div class="layout_spacer"></div>
        <div class="groups">
          <div class="select_box" style="min-width:50px; margin-right:10px;">
            <select class="select" v-model="seasonYear">
              <option v-for="(data, index) in yearList" :key="index" :value="data.CODE">{{ data.CODENM }}</option>
            </select>
          </div>
          <div class="select_box" style="min-width:50px; margin-right:10px;">
            <select class="select" v-model="month" @change="getWeek(year, month)">
              <option v-for="(data, index) in monthList" :key="index" :value="data.CODE">{{ data.CODENM }}</option>
            </select>
          </div>
          <div class="select_box" style="min-width:50px; margin-right:10px;">
            <select class="select" v-model="week" @change="getThisWeek(week)">
              <option v-for="(data, index) in weekList" :key="index" :value="data.weekend">{{ data.weekendStr }}</option>
            </select>
          </div>
          <button type="button" class="btn_n" style="height:55px;margin-left:10px;" @click="changeDate()">조회</button>
        </div>
      </div>
    </header>
    <!-- box2 -->
    <div class="cont_box">
      <div class="tit">
        <div class="tab">
          <ul>
            <li class="on">
              <span style="display: block; position: relative; padding: 0 20px; border-right: 1px solid #dee2e6; font-size: 20px; line-height: 59px;">1. 브랜드별 매출실적</span>
            </li>
          </ul>
        </div>
        <div class="layout_spacer"></div>
        <div>
          <span class="txt" style="height: 30px; line-height: 40px;">&lt; {{ standardStartDate }} ~ {{ standardEndDate }}	&gt;</span>
          <span class="txt">&#91;단위 : 백만원&#93;</span>
        </div>
      </div>
      <div class="container">
        <div class="content">
          <!-- 테이블 -->
          <iframe id="txtArea1" style="display:none;" />
          <div class="tbl_sheet yellow np">
            <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
              <colgroup style="width: 1%">
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" rowspan="2">브랜드</th>
                  <th scope="col" rowspan="2">유형</th>
                  <th scope="col" rowspan="2">{{month}}월목표</th>
                  <th scope="col" colspan="4">주간실적({{month}}.{{Number(standardStartDate.substr(8))}}~{{Number(standardEndDate.substr(8))}})</th>
                  <th scope="col" colspan="4">월누계실적({{month}}.1~{{Number(standardEndDate.substr(8))}})</th>
                  <th scope="col" colspan="2">신장율</th>
                  <th scope="col" rowspan="2">차주목표({{Number(nextStartDate.substr(4, 2))}}.{{Number(nextStartDate.substr(6))}}~{{Number(nextEndDate.substr(6))}})</th>
                </tr>
                <tr>
                  <th class="tc">전년</th>
                  <th class="tc">목표</th>
                  <th class="tc">실적</th>
                  <th class="tc">달성율</th>
                  <th class="tc">전년</th>
                  <th class="tc">목표</th>
                  <th class="tc">실적</th>
                  <th class="tc">달성율</th>
                  <th class="tc">주간</th>
                  <th class="tc">월누계</th>
                </tr>
              </thead>

              <tbody id="sales_status" class="tbody_s">
                  <tr v-for="(data , index) in dr_S" :key="index">
                        <td class="tc" name="BRCD" rowspan="3" v-if="(data.BRCD!='SO')&&(data.BRCD!='TOTAL')&&data.SALEGU=='1'" style="font-weight:bold;">{{ data.BRCD }}</td>
                        <td class="tc" name="BRCD" rowspan="4" v-else-if="(data.BRCD=='SO')&&data.SALEGU=='1'" style="font-weight:bold;">{{ data.BRCD }}</td>
                        <td class="tc" name="BRCD" rowspan="4" v-else-if="(data.BRCD=='TOTAL')&&data.SALEGU=='1'" style="font-weight:bold;">{{ data.BRCD }}</td>
                        <td class="tc" name="SALEGU2"      v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">{{ data.SALEGU2 }}</td>
                        <td class="tr" name="MONPLNAMT"    v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.MONPLNAMT!=0&&data.MONPLNAMT!=''">{{ data.MONPLNAMT | currency }}</span>
                        </td>
                        <td class="tr" name="PREWEEKAMT"   v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.PREWEEKAMT!=0&&data.PREWEEKAMT!=''">{{ data.PREWEEKAMT | currency }}</span>
                        </td>
                        <td class="tr" name="WEEKPLNAMT"   v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.WEEKPLNAMT!=0&&data.WEEKPLNAMT!=''">{{ data.WEEKPLNAMT | currency }}</span>
                        </td>
                        <td class="tr" name="WEEKAMT"      v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.WEEKAMT!=0&&data.WEEKAMT!=''">{{ data.WEEKAMT | currency }}</span>
                        </td>
                        <td class="tr" name="WEEKRATE"
                            v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':'', 'background-color':data.SALEGU=='0'?'black':'', 'color':data.SALEGU=='0'?'white':''}"
                            >
                            <span>{{ data.WEEKRATE }}</span><span v-if="data.SALEGU=='0'">%</span>
                          </td>
                        <td class="tr" name="PREMONAMT"    v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.PREMONAMT!=0&&data.PREMONAMT!=''">{{ data.PREMONAMT | currency }}</span>
                        </td>
                        <td class="tr" name="MONSUMPLNAMT" v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.MONSUMPLNAMT!=0&&data.MONSUMPLNAMT!=''">{{ data.MONSUMPLNAMT | currency }}</span>
                        </td>
                        <td class="tr" name="MONAMT"       v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.MONAMT!=0&&data.MONAMT!=''">{{ data.MONAMT | currency }}</span>
                        </td>
                        <td class="tr" name="MONRATE"
                            v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':'', 'background-color':data.SALEGU=='0'?'black':'', 'color':data.SALEGU=='0'?'white':''}"
                          >
                            <span>{{ data.MONRATE }}</span><span v-if="data.SALEGU=='0'">%</span>
                        </td>
                        <td class="tc" name="WEEKAVERAGE"  v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <i class="material-icons" :class="[Number(data.WEEKAVERAGE) > 0 ? 'col_danger' : 'col_primary']" v-if="Number(data.WEEKAVERAGE)!=0&&data.WEEKAVERAGE!=''">
                            {{ Number(data.WEEKAVERAGE) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                          </i>
                          <span v-if="Number(data.WEEKAVERAGE)!=0&&data.WEEKAVERAGE!=''" :class="[Number(data.WEEKAVERAGE) > 0 ? 'col_danger' : 'col_primary']">
                            {{ (Math.abs(data.WEEKAVERAGE)).toFixed(1) }}%
                          </span>
                        </td>
                        <td class="tc" name="MONAVERAGE"  v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <i class="material-icons" :class="[Number(data.MONAVERAGE) > 0 ? 'col_danger' : 'col_primary']" v-if="Number(data.MONAVERAGE)!=0&&data.MONAVERAGE!=''">
                            {{ Number(data.MONAVERAGE) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                          </i>
                          <span v-if="Number(data.MONAVERAGE)!=0&&data.MONAVERAGE!=''" :class="[Number(data.MONAVERAGE) > 0 ? 'col_danger' : 'col_primary']">
                            {{ (Math.abs(data.MONAVERAGE)).toFixed(1) }}%
                          </span>
                        </td>
                        <td class="tc" name="NEXTWEEKPLNAMT" v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                          <span v-if="data.NEXTWEEKPLNAMT!=0&&data.NEXTWEEKPLNAMT!=''">{{ data.NEXTWEEKPLNAMT | currency }}</span>
                        </td>
                    </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="cont_box" style="margin-bottom: 20px;">
        <div class="tit">
            <div class="tab">
                <ul>
                    <li class="on">
                      <span style="display: block; position: relative; padding: 0 20px; border-right: 1px solid #dee2e6; font-size: 20px; line-height: 59px;">2. 브랜드별 주요사항</span>
                    </li>
                </ul>
            </div>
            <div class="layout_spacer"></div>
        </div>
        <div class="container">
            <div class="content">
                <!-- 테이블 -->
                <div class="tbl_sheet yellow np">
                    <table id="progress_tbody" class="tbl tbl_center">
                        <colgroup>
                          <col style="width: 20%;" />
                          <col style="width: 40%;" />
                          <col style="width: 40%;" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th class="tc">브랜드</th>
                            <th class="tc">{{month}}월{{week}}주차 진행사항 ({{month}}/{{Number(standardStartDate.substr(8))}}~{{month}}/{{Number(standardEndDate.substr(8))}})</th>
                            <th class="tc">{{month}}월{{Number(week)+1}}주차 계획 ({{Number(nextStartDate.substr(4, 2))}}/{{Number(nextStartDate.substr(6))}}~{{Number(nextStartDate.substr(4, 2))}}/{{Number(nextEndDate.substr(6))}})</th>
                          </tr>
                        </thead>

                        <tbody id="sales_status" class="tbody_s">
                            <tr v-for="(data , index) in dr_P" :key="index">
                                  <td class="tc" name="BRCD" style="font-weight:bold;">{{ data.BRCD }}</td>
                                  <td class="tl" name="PROGRESS" v-html="data.PROGRESS"></td>
                                  <td class="tl" name="PLAN" v-html="data.PLAN"></td>
                              </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <template v-for="(data,index) in dr_C">
      <div class="cont_box" style="margin-bottom: 20px;" :key="index">
        <div class="tit">
          <div class="tab">
            <ul>
              <li class="on">
                <span style="display: block; position: relative; padding: 0 20px; border-right: 1px solid #dee2e6; font-size: 20px; line-height: 59px;">{{data.BRCD}}. 담당별 매장실적 달성율</span>
              </li>
            </ul>
          </div>
          <div class="layout_spacer"></div>
        </div>
        <div class="container">
          <div class="content">
            <!-- 테이블 -->
            <div class="tbl_sheet yellow np">
              <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
                <colgroup style="width: 1%">
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" rowspan="2">순번</th>
                    <th scope="col" rowspan="2">담당자</th>
                    <th scope="col" rowspan="2">매장명</th>
                    <th scope="col" rowspan="2">매니저</th>
                    <th scope="col" rowspan="2">매출목표</th>
                    <th scope="col" colspan="3">주간매출({{Number(standardStartDate.substr(8))}}일 ~ {{Number(standardEndDate.substr(8))}}일)</th>
                    <th scope="col" colspan="5">월누계실적(1일 ~ {{Number(standardEndDate.substr(8))}}일)</th>
                    <th scope="col" rowspan="2">M/S</th>
                  </tr>
                  <tr>
                    <th class="tc">매출</th>
                    <th class="tc">전년동일</th>
                    <th class="tc">신장율</th>
                    <th class="tc">누계</th>
                    <th class="tc">전년동기간</th>
                    <th class="tc">신장율</th>
                    <th class="tc">진도율</th>
                    <th class="tc">전년월마감</th>
                  </tr>
                </thead>

                <tbody id="sales_status" class="tbody_s">
                  <tr v-for="(data2 , index2) in data.DATA" :key="index2">
                    <td class="tc" name="index" >{{ index2+1 }}</td>
                    <td class="tc" name="ERPNM" v-if="rowSpan(index, index2)" :rowspan="rowSpanNum(data2.MEMP)">{{ data2.ERPNM }}</td>
                    <td class="tl" name="VDSNM" v-if="data2.VDCD.indexOf('ZZ') == -1" >{{ data2.VDSNM }}</td>
                    <td class="tc bg_point_col24" name="VDSNM" v-else colspan="2">TTL</td>
                    <td class="tc" name="HNAME" v-if="data2.VDCD.indexOf('ZZ') == -1" >
                      {{ data2.HNAME }}
                      <span v-if="data2.BIRTH!=''&&data2.BIRTH!=null">({{ data2.BIRTH | currency }}")</span>
                    </td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="PLNAMT" >{{ data2.PLNAMT | currency }}</td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="NOWAMT" >{{ data2.NOWAMT | currency }}</td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="LASTAMT" >{{ data2.LASTAMT | currency }}</td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="WEEKRATE" >
                      <span v-if="Number(data2.WEEKRATE)!=0">{{ Number(data2.WEEKRATE) | currency }} %</span>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MONSUMAMT" >{{ data2.MONSUMAMT | currency }}</td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="LASTMONSUMAMT" >{{ data2.LASTMONSUMAMT | currency }}</td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MONRATE" >
                      <span v-if="Number(data2.MONRATE)!=0">{{ Number(data2.MONRATE) | currency }} %</span>
                    </td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MONAVG" >
                      <span v-if="Number(data2.MONSUMAMT)!=0&&Number(data2.PLNAMT)!=0">{{ Math.round(data2.MONSUMAMT/data2.PLNAMT*100) | currency }} %</span>
                      <span v-else-if="Number(data2.MONSUMAMT)==0">0</span>
                      <span v-else-if="Number(data2.PLNAMT)==0"></span>
                    </td>
                    <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="ENDMONAMT" >{{ data2.ENDMONAMT | currency }}</td>
                    <td class="tc" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MS" >{{ data2.MS }}</td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr class="tbl_total" style="border-top: 1px solid #ced4da;" v-for="(totalData , index3) in getTotData(data.BRCD)" :key="index3">
                    <th scope="col" colspan="4"><strong>합계</strong></th>
                    <td class="tr"><strong>{{ totalData.PLNAMT | currency}}</strong></td>
                    <td class="tr bg_point_col25"><strong>{{ totalData.NOWAMT | currency}}</strong></td>
                    <td class="tr"><strong>{{ totalData.LASTAMT | currency}}</strong></td>
                    <td class="tr"><strong>{{ totalData.WEEKRATE | currency}}</strong></td>
                    <td class="tr bg_point_col25"><strong>{{ totalData.MONSUMAMT | currency}}</strong></td>
                    <td class="tr"><strong>{{ totalData.LASTMONSUMAMT | currency}}</strong></td>
                    <td class="tr"><strong>{{ totalData.MONRATE | currency}}</strong></td>
                    <td class="tr"><strong>{{ totalData.MONAVG | currency}}</strong></td>
                    <td class="tr"><strong>{{ totalData.ENDMONAMT | currency}}</strong></td>
                    <td class="tr"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

export default {
  name: "WEE0501",
  components: {
    sideMenu,
    datePick
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      year: "",
      month: "",
      week: "",
      yearList: [],
      monthList: [],
      weeklyTab:0,
      standardStartDate: null,
      standardEndDate: null,
      nextStartDate: null,
      nextEndDate: null,
      calDefaultDate: "",
      drawer: null,
      // 브랜드별 매출 실적
      dr_S: [],
      TOT_dr_S: [],
      weekList: [],
      dr_P: [],
      dr_C: [],
      dr_SC: [],
      seasonYear: null,
      thisWeeks: null,
      brandList: null,
      /*
      clickYn: false,
      selectedSUCD: null,
      SalesStatusData : [],
      monthlySalesData : {},
      foreignerSumData : {},
      foreignerData : [],
      salesResultData : [],
      totalData : {},
      importanceData : {},
      cMonthlySalesTotal : 0,
      lMonthlySalesTotal : 0,
      cForeignerSumTotal : 0,
      lForeignerSumTotal : 0,
      seasonMonth: null,
      seasonEndYear: null,
      seasonEndMonth: null,
      lastseasonYear: null,
      lastseasonMonth: null,
      //켈린더 추가
      calStartDate: "",
      startDate: "",
      endDate: "",
      startYear: "",
      startMonth: "",
      // 매출추이
      foreign: "f_include",
      foreignList: [ // 해외매장 배열 하드코딩
        { id: "f_include", title: "해외매장 포함" },
        { id: "f_except", title: "해외매장 제외" },
        { id: "f_store", title: "해외매장" }
      ]
      */
    }
  },
  created() {
    this.brandList = ["MI", "MO", "FO", "IT", "SO"];
    this.calDefaultDate = moment().day('Sunday').format('YYYY-MM-DD')
    this.standardStartDate = moment(this.calDefaultDate).subtract(6, 'days').format('YYYY-MM-DD')
    if(moment(this.standardStartDate, 'YYYY-MM-DD').format('MM') != moment().format('MM')) {
      this.standardStartDate = moment().format('YYYY-MM') + "-01"
    }
    this.standardEndDate = this.calDefaultDate
    this.year = moment(this.calDefaultDate).format("YYYY");
    this.month = moment(this.calDefaultDate).format("M");

    let cuerrentYear = Number(moment().format("YYYY"));
    let code
    for (let i = 0; i < 5; i++) {
      code = this.$store.getters.getYearCode(cuerrentYear - (4 - i))
      this.yearList.push({CODE: String(code), CODENM: (cuerrentYear - (4 - i))})
    }
    this.seasonYear = this.yearList[this.yearList.length-1].CODE

    for (let i = 1; i < 13; i++) {
      this.monthList.push({CODE: String(i), CODENM: String(i)+"월"})
    }

    this.getWeek(this.year, this.month)
    console.log("weekList >>> ", this.weekList, " / ", moment(this.standardStartDate).format("YYYYMMDD"));
    let weekIndex = _.findIndex(this.weekList, ['startDay', moment(this.standardStartDate).format("YYYYMMDD")]);
    this.thisWeeks = this.weekList[weekIndex]
    this.week = this.thisWeeks.weekend
    this.nextStartDate = this.weekList[weekIndex+1].startDay;
    this.nextEndDate = this.weekList[weekIndex+1].endDay;

  },
  mounted() {
    this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
    /*
    CODECardsList() {
      let WRPList = this.$store.getters.getWRPList
      for(var i=0; i<WRPList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:WRPList[i].MCODE})
        if (data) {
          WRPList[i].VISIBLE = true
        } else {
          WRPList[i].VISIBLE = false
        }
      }
      return WRPList
    },
    */
    isTabTypeSU() {
      return this.$store.getters.getWRPList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getWRPList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[1]
      } else {
        return this.$store.getters.getAuthBRCDCode[1]
      }
    },
    yearCodes() {
      return this.$store.getters.getYearCodeList
    },
    monthCodes() {
      return this.$store.getters.getMonthCodeList
    }
  },
  methods: {
    rowSpan: function (index, index2) {   
      if(index2 == 0) {
        return true;
      }   
      if(this.dr_C[index].DATA[index2].MEMP != this.dr_C[index].DATA[index2-1].MEMP) {
        return true;
      } else {
        return false;
      }
      // /console.log("false")
    },
    rowSpanNum: function (memp) {   
      let data = _.find(this.dr_SC, ['MEMP', memp]);
      return data.DATA.length;
    },
    subSum: function (index, index2) {   
      console.log(index, " / ", index2)
      if(index2 == (this.dr_C[index].DATA.length-1)) {
        console.log("true1 ")
        return true;
      }
      if(this.dr_C[index].DATA[index2].MEMP != this.dr_C[index].DATA[index2+1].MEMP) {
        console.log("true2 ", this.dr_C[index].DATA[index2].MEMP, " / ", this.dr_C[index].DATA[index2+1].MEMP)
        return true;
      } else {
        console.log("false ", this.dr_C[index].DATA[index2].MEMP, " / ", this.dr_C[index].DATA[index2+1].MEMP)
        return false;
      }
      // /console.log("false")
    },
    getTotData: function (brcd) {      
      let objects = _.find(this.dr_C, ['BRCD', brcd]).DATA;
      return [{
        'BRCD': brcd,
        'PLNAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.PLNAMT); }),
        'NOWAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.NOWAMT); }),
        'LASTAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTAMT); }),
        'WEEKRATE': Math.round((_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.NOWAMT); })/_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTAMT); })-1)*100),
        'MONSUMAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.MONSUMAMT); }),
        'LASTMONSUMAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTMONSUMAMT); }),
        'ENDMONAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.ENDMONAMT); }),
        'MONRATE': Math.round((_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.MONSUMAMT); })/_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTMONSUMAMT); })-1)*100),
        'MONAVG': Math.round(_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.MONSUMAMT); })/_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.PLNAMT); })*100),
      }]
    },
    bold(id, idx) { 
      let tr = $("#sales_status > tr").filter(":eq(" + idx + ")")
      let td = tr.find("td[name="+id+"]")
      
      if(tr.hasClass("on") == false) {
        $("tr.on").removeClass("on")
        tr.addClass('on')
      }

      if(td.hasClass("click_text") == true) {
        td.removeClass('click_text')
      } else {
        $(".click_text").removeClass("click_text")
        td.addClass('click_text')
      }
    },
    getWeek(yyyy, mm) {
      this.weekList = [];
      let fdate = yyyy + this.twinNum(mm) + "01";
      let weekend = 0, start_day = "", end_day = ""
      
      for(let i = 0; i < Number(moment(fdate, "YYYYMMDD").endOf('month').format('DD')); i++ ){
        if(i == 0) {
          start_day = fdate
          var _day = Number(moment(start_day, "YYYYMMDD").format('d'))
          if(_day == 0) {
            _day = 7;
          }
          end_day = moment(start_day, "YYYYMMDD").add(7-_day, 'day').format('YYYYMMDD')
          weekend += 1
          this.weekList.push({
            weekend: weekend, weekendStr: weekend+"주차",
            startDay: start_day, endDay: end_day
          })
        } else {
          var _date = yyyy + this.twinNum(mm) + this.twinNum(i+1);
          if(moment(_date, "YYYYMMDD").format('d') == '1') {
            start_day = _date
            end_day = moment(start_day, "YYYYMMDD").add(6, 'day').format('YYYYMMDD')
            if(moment(start_day).format('MM') != moment(end_day).format('MM')) {
              end_day = moment(start_day, "YYYYMMDD").endOf('month').format('YYYYMMDD')
            }
            weekend += 1
            this.weekList.push({
              weekend: weekend, weekendStr: weekend+"주차",
              startDay: yyyy+""+mm+"01", endDay: moment( yyyy+""+mm+"01", "YYYYMMDD").endOf('month').format('YYYYMMDD')
            })
          }
        }
      }
      this.weekList.push({
        weekend: '0', weekendStr: "월마감",
        startDay: start_day, endDay: end_day
      })
    },
    getThisWeek: function (week) {
      this.week = week;
      this.thisWeeks = _.find(this.weekList, { 'weekend': week })
    },
    twinNum: function (num) {
      if(num.toString().length == 1) {
        return "0"+num.toString();
      } else {
        return num.toString();
      }
    },
    loadData() {
      /*
      if (this.CODECardsList.length <= 0) {
        return
      }
      */
      this.getProgressData();
      this.getTakeChargeList();
    },
    changeDate() {
      console.log("changeDate_year >>>", this.year)
      console.log("changeDate_month >>>", this.month)
      console.log("changeDate_Week >>>", this.week)
      let weekIndex = _.findIndex(this.weekList, ['weekend', this.week]);
      this.thisWeeks = this.weekList[weekIndex]
      console.log("changeDate_thisWeek >>>", this.thisWeeks)
      this.standardStartDate = moment(this.thisWeeks.startDay, "YYYYMMDD").format("YYYY-MM-DD")
      this.standardEndDate = moment(this.thisWeeks.endDay, "YYYYMMDD").format("YYYY-MM-DD")

      let nextIndex = _.findIndex(this.weekList, ['endDay', moment(this.standardEndDate, "YYYY-MM-DD").format("YYYYMMDD")]);
      if(nextIndex == this.weekList.length-1) {
        this.nextStartDate = this.year + this.twinNum(Number(this.month)+1) + "01"
        this.nextEndDate =  moment(this.nextStartDate).day('Sunday').add(7, 'days').format('YYYYMMDD')
      } else {
        this.nextStartDate = this.weekList[weekIndex+1].startDay
        this.nextEndDate = this.weekList[weekIndex+1].endDay
      }
      console.log("next ??? ", this.nextStartDate, " / ", this.nextEndDate)

      this.loadData()
    },
    getSaleListByBrand() {
      this.dr_S = []

      this.req2svr.getSaleListByBrand(this.year, this.month, this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = [];
            if(count < 1) {
            } else if(count == 1) {
              this.dr_S.push(res);
            } else {
              this.dr_S = JSON.parse("[" + res + "]");
              
            }
            for(var i in this.dr_S) {
              this.dr_S[i].SALEGU2 = this.dr_S[i].SALEGU == "1"?"정상":this.dr_S[i].SALEGU == "2"?"이월":"2년차"
              this.dr_S[i].WEEKRATE = ""
              this.dr_S[i].MONRATE = ""
              this.dr_S[i].MONPLNAMT = Number(this.dr_S[i].MONPLNAMT) != 0 ? Number(this.dr_S[i].MONPLNAMT):''
              this.dr_S[i].PREWEEKAMT = Number(this.dr_S[i].PREWEEKAMT) != 0 ? Number(this.dr_S[i].PREWEEKAMT):''
              this.dr_S[i].WEEKPLNAMT = Number(this.dr_S[i].WEEKPLNAMT) != 0 ? Number(this.dr_S[i].WEEKPLNAMT):''
              this.dr_S[i].WEEKAMT = Number(this.dr_S[i].WEEKAMT) != 0 ? Number(this.dr_S[i].WEEKAMT):''
              this.dr_S[i].PREMONAMT = Number(this.dr_S[i].PREMONAMT) != 0 ? Number(this.dr_S[i].PREMONAMT):''
              this.dr_S[i].MONSUMPLNAMT = Number(this.dr_S[i].MONSUMPLNAMT) != 0 ? Number(this.dr_S[i].MONSUMPLNAMT):''
              this.dr_S[i].MONAMT = Number(this.dr_S[i].MONAMT) != 0 ? Number(this.dr_S[i].MONAMT):''
              this.dr_S[i].NEXTWEEKPLNAMT = Number(this.dr_S[i].NEXTWEEKPLNAMT) != 0 ? Number(this.dr_S[i].NEXTWEEKPLNAMT):''
            }
            var loop_index = this.dr_S.length/2

            let brand_tot = {}
            let temp = 0;
            /*
            for(let i = 0; i < loop_index; i++) {
              let index = i*2+temp
              brand_tot = {
                COMCD: this.dr_S[index].COMCD, SUCD: this.dr_S[index].SUCD, BRCD: this.dr_S[index].BRCD, 
                YYYY: this.dr_S[index].YYYY, MM: this.dr_S[index].MM, WEEK: this.dr_S[index].WEEK,
                FROM_SALEDT: this.dr_S[index].FROM_SALEDT, TO_SALEDT: this.dr_S[index].TO_SALEDT, 
                SALEGU: '0', SALEGU2: '합계', MONPLNAMT: this.dr_S[index].MONPLNAMT+this.dr_S[index+1].MONPLNAMT, 
                PREWEEKAMT: this.dr_S[index].PREWEEKAMT+this.dr_S[index+1].PREWEEKAMT, WEEKPLNAMT: this.dr_S[index].WEEKPLNAMT+this.dr_S[index+1].WEEKPLNAMT, 
                WEEKAMT: this.dr_S[index].WEEKAMT+this.dr_S[index+1].WEEKAMT, 
                WEEKRATE: this.getRate((this.dr_S[index].WEEKAMT+this.dr_S[index+1].WEEKAMT), (this.dr_S[index].WEEKPLNAMT+this.dr_S[index+1].WEEKPLNAMT)*100, 1), 
                PREMONAMT: this.dr_S[index].PREMONAMT+this.dr_S[index+1].PREMONAMT, MONSUMPLNAMT: this.dr_S[index].MONSUMPLNAMT+this.dr_S[index+1].MONSUMPLNAMT, 
                MONAMT: this.dr_S[index].MONAMT+this.dr_S[index+1].MONAMT, 
                MONRATE: this.getRate((this.dr_S[index].MONAMT+this.dr_S[index+1].MONAMT), (this.dr_S[index].MONSUMPLNAMT+this.dr_S[index+1].MONSUMPLNAMT)*100, 1), 
                WEEKAVERAGE: this.getRate((this.dr_S[index].WEEKAMT+this.dr_S[index+1].WEEKAMT), (this.dr_S[index].PREWEEKAMT+this.dr_S[index+1].PREWEEKAMT)-1, 2), 
                MONAVERAGE: this.getRate((this.dr_S[index].MONAMT+this.dr_S[index+1].MONAMT), (this.dr_S[index].PREMONAMT+this.dr_S[index+1].PREMONAMT)-1, 2), 
                NEXTWEEKPLNAMT: this.dr_S[index].NEXTWEEKPLNAMT+this.dr_S[index+1].NEXTWEEKPLNAMT
              }
              this.dr_S.splice(index+2, 0, brand_tot);
              temp += 1;
            }

            */
            
            let brand_list = ["MI", "MO", "FO", "IT", "SO"]
            for(let i in brand_list) {
              let index = _.findIndex(this.dr_S, {BRCD: brand_list[i], SALEGU: '1'});
              brand_tot = {
                COMCD: this.dr_S[index].COMCD, SUCD: this.dr_S[index].SUCD, BRCD: this.dr_S[index].BRCD, 
                YYYY: this.dr_S[index].YYYY, MM: this.dr_S[index].MM, WEEK: this.dr_S[index].WEEK,
                FROM_SALEDT: this.dr_S[index].FROM_SALEDT, TO_SALEDT: this.dr_S[index].TO_SALEDT, 
                SALEGU: '0', SALEGU2: '합계',
                MONPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKAMT):0; }), 
                WEEKRATE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKPLNAMT):0; }), 1), 
                PREMONAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONSUMPLNAMT):0; }), 
                MONAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), 
                MONRATE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONSUMPLNAMT):0; }), 1), 
                WEEKAVERAGE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREWEEKAMT):0; })-1, 2), 
                MONAVERAGE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREMONAMT):0; })-1, 2), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.NEXTWEEKPLNAMT):0; })
              }
              if(brand_list[i] != 'SO') {
                this.dr_S.splice(index+2, 0, brand_tot);
              } else {
                this.dr_S.splice(index+3, 0, brand_tot);
              }

            }

            this.TOT_dr_S = [
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '1', SALEGU2: '정상', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.WEEKAMT):0; }), 
                WEEKRATE: '', 
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONAMT):0; }), 
                MONRATE: '', 
                WEEKAVERAGE:    _.meanBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.WEEKAVERAGE):0; }), 
                MONAVERAGE:     _.meanBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONAVERAGE):0; }), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == '1'? Number(o.NEXTWEEKPLNAMT):0; })
              },
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '2', SALEGU2: '이월', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.WEEKAMT):0; }), 
                WEEKRATE: '', 
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONAMT):0; }), 
                MONRATE: '', 
                WEEKAVERAGE:    _.meanBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.WEEKAVERAGE):0; }), 
                MONAVERAGE:     _.meanBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONAVERAGE):0; }), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == '2'? Number(o.NEXTWEEKPLNAMT):0; })
              },
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '3', SALEGU2: '2년차', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.WEEKAMT):0; }), 
                WEEKRATE: '', 
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONAMT):0; }), 
                MONRATE: '', 
                WEEKAVERAGE:    _.meanBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.WEEKAVERAGE):0; }), 
                MONAVERAGE:     _.meanBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONAVERAGE):0; }), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == '3'? Number(o.NEXTWEEKPLNAMT):0; })
              },
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '0', SALEGU2: '합계', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKAMT):0; }), 
                WEEKRATE:       this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKPLNAMT):0; }), 1),
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONAMT):0; }), 
                MONRATE:        this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONSUMPLNAMT):0; }), 1), 
                WEEKAVERAGE:    this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREWEEKAMT):0; }), 2), 
                MONAVERAGE:     this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREMONAMT):0; }), 2), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == '3'? Number(o.NEXTWEEKPLNAMT):0; })
              }
            ]

            this.dr_S = _.concat(this.dr_S, this.TOT_dr_S);
            console.log("getSaleListByBrand >>> ", this.dr_S)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
      
    },
    getProgressData() {
      this.dr_P = []
      
      this.req2svr.getProgressData(this.year, this.month, this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            alert(res["EXECUTE ERROR"]);
            this.dr_S = []
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = []
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
              console.log("getProgressData1 >>> ", list)
            } else {
              list = JSON.parse("[" + res + "]");
              console.log("getProgressData2 >>> ", list)
            }
            for(let i in list) {
              this.dr_P.push({
                BRCD: list[i].BRCD,
                PROGRESS: list[i].PROGRESS.replace(/ /gi, "&nbsp;").split('	').join('&emsp;').replace(/(?:\r\n|\r|\n)/g, '<br />'),
                PLAN: list[i].PLAN.replace(/ /gi, "&nbsp;").split('	').join('&emsp;').replace(/(?:\r\n|\r|\n)/g, '<br />'),
              })
            }
            if(this.dr_P.length != 0) {
              this.getSaleListByBrand();
            } else {
              alert("마감된 데이터가 없습니다.")
            }
            console.log("this.dr_P >>>", this.dr_P)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
      
      

    },
    getTakeChargeList() {
      this.dr_C = []
      
      this.req2svr.getTakeChargeList(this.year, this.twinNum(this.month), this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = []
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]");
            }
            if(list.length != 0) {
              this.getStoreSaleByCharge(list);
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStoreSaleByCharge(chargeList) {
      
      this.req2svr.getStoreSaleByCharge(this.year, this.twinNum(this.month), this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = []
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
              console.log("getStoreSaleByCharge >>> ", list)
            } else {
              list = JSON.parse("[" + res + "]");
              console.log("getStoreSaleByCharge2 >>> ", list)
            }
            if(list.length != 0) {
              let chargeObjList = new Array();
              console.log(this.brandList);
              for(let k = 0; k < this.brandList.length; k++) {
                let chargeObj = new Object();
                chargeObj["BRCD"] = this.brandList[k]
                chargeObj["DATA"] = new Array();
                for(let j = 0; j < list.length; j ++) {
                  if(chargeObj.BRCD == list[j].BRCD) {
                    chargeObj.DATA.push(list[j])
                  }
                }
                chargeObjList.push(chargeObj);
              }

              for(var i = 0; i < chargeList.length; i++) {
                chargeList[i]["DATA"] = new Array();
                for(var j = 0; j < list.length; j++) {
                  if(chargeList[i].COMCD == list[j].COMCD && chargeList[i].SUCD == list[j].SUCD && chargeList[i].MEMP == list[j].MEMP) {
                    chargeList[i]["DATA"].push(list[j]);
                  }
                }
              }
              console.log("chargeList >>>", chargeList)
              console.log("chargeObjList >>>", chargeObjList)
              this.dr_C = chargeObjList;
              this.dr_SC = chargeList;
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    link(val) {
      //this.$router.push(val)
      this.$router.push({
        name: val,
        params: {
          data: 
          {
            selectSucd: this.selectedSUCD
          }
        }
      })
    },
    getRate(amt, amt2, gubun) {
      let _return
      if(amt == 0 || amt == "0" || amt == "" || amt2 == 0 || amt2 == "0" || amt2 == "") {
        _return = '0.0';
      } else {
        if(gubun == 1) {
          _return = (amt/amt2*100).toFixed(1)
        } else {
          _return = ((amt/amt2-1)*100).toFixed(1)
        }
      }
      return _return;
    },
    excelDownLoad(id1) {
      var tab_text = ""
      tab_text += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      tab_text += '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
      tab_text += '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
      tab_text += '<x:Name>Sheet1</x:Name>'
      tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>'
      tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>'
      tab_text += "<table border='2px'><tr bgcolor='#87AFC6'>"
      var textRange; var j=0,k=0;
      var tab1 = document.getElementById(id1); // id of table
      // var tab2 = document.getElementById(id2); // id of table
      var sa;

      for(j = 0 ; j < tab1.rows.length ; j++) {
        tab_text=tab_text+tab1.rows[j].innerHTML+"</tr>"
      }

      // for(k = 0 ; k < tab2.rows.length ; k++) {
      //   tab_text=tab_text+tab2.rows[k].innerHTML+"</tr>"
      // }

      tab_text = tab_text+"</table>";
      tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); // remove if u want links in your table
      tab_text = tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
      tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

      var ua = window.navigator.userAgent
      var msie = ua.indexOf("MSIE ")

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { // If Internet Explorer
        txtArea1.document.open("txt/html","replace")
        txtArea1.document.write(tab_text)
        txtArea1.document.close()
        txtArea1.focus();
        sa=txtArea1.document.execCommand("SaveAs",true,"다운로드.xls")
      } else if(ua.indexOf('Edge') > -1){ // If edge
        var blob = new Blob([tab_text], {type: 'data:application/vnd.ms-excel'})
        window.navigator.msSaveBlob(blob, '다운로드.xls')
      } else { //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text))
      }
      return (sa)
    },
    toMain() {
      this.$router.replace("/")
    },
    imageExist(url) {
      var img = new Image();
      img.src = url;
      return img.height != 0;
    }
  },
  filters: {
    currency: function(value) {
      var x
      if (value) {
        x = value.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      } else {
        x = 0
      }
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x;
    },
    nanToDot: function(value) {
      let x = value ? value : 0;
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x
    }
  }
}
</script>
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
                                  <td class="tc" name="SALEGU2"      v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">{{ data.SALEGU2 }}</td>
                                  <td class="tr" name="MONPLNAMT"    v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <span v-if="data.MONPLNAMT!=0&&data.MONPLNAMT!=''">{{ data.MONPLNAMT | currency }}</span>
                                  </td>
                                  <td class="tr" name="PREWEEKAMT"   v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <span v-if="data.PREWEEKAMT!=0&&data.PREWEEKAMT!=''">{{ data.PREWEEKAMT | currency }}</span>
                                  </td>
                                  <td class="tr" name="WEEKPLNAMT"   v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <span v-if="data.WEEKPLNAMT!=0&&data.WEEKPLNAMT!=''">{{ data.WEEKPLNAMT | currency }}</span>
                                  </td>
                                  <td class="tr" name="WEEKAMT"      v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <span v-if="data.WEEKAMT!=0&&data.WEEKAMT!=''">{{ data.WEEKAMT | currency }}</span>
                                  </td>
                                  <td class="tr" name="WEEKRATE"
                                      v-bind:style="{'font-weight':(index+1)%3==0?'bold':'', 'background-color':(index+1)%3==0?'black':'', 'color':(index+1)%3==0?'white':''}"
                                      >
                                      <span>{{ data.WEEKRATE }}</span><span v-if="data.SALEGU=='3'">%</span>
                                    </td>
                                  <td class="tr" name="PREMONAMT"    v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <span v-if="data.PREMONAMT!=0&&data.PREMONAMT!=''">{{ data.PREMONAMT | currency }}</span>
                                  </td>
                                  <td class="tr" name="MONSUMPLNAMT" v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <span v-if="data.MONSUMPLNAMT!=0&&data.MONSUMPLNAMT!=''">{{ data.MONSUMPLNAMT | currency }}</span>
                                  </td>
                                  <td class="tr" name="MONAMT"       v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <span v-if="data.MONAMT!=0&&data.MONAMT!=''">{{ data.MONAMT | currency }}</span>
                                  </td>
                                  <td class="tr" name="MONRATE"
                                      v-bind:style="{'font-weight':(index+1)%3==0?'bold':'', 'background-color':(index+1)%3==0?'black':'', 'color':(index+1)%3==0?'white':''}"
                                    >
                                      <span>{{ data.MONRATE }}</span><span v-if="data.SALEGU=='3'">%</span>
                                  </td>
                                  <td class="tc" name="WEEKAVERAGE"  v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <i class="material-icons" :class="[Number(data.WEEKAVERAGE) > 0 ? 'col_danger' : 'col_primary']" v-if="Number(data.WEEKAVERAGE)!=0&&data.WEEKAVERAGE!=''">
                                      {{ Number(data.WEEKAVERAGE) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                                    </i>
                                    <span v-if="Number(data.WEEKAVERAGE)!=0&&data.WEEKAVERAGE!=''" :class="[Number(data.WEEKAVERAGE) > 0 ? 'col_danger' : 'col_primary']">
                                      {{ (Math.abs(data.WEEKAVERAGE)).toFixed(1) }}%
                                    </span>
                                  </td>
                                  <td class="tc" name="MONAVERAGE"  v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
                                    <i class="material-icons" :class="[Number(data.MONAVERAGE) > 0 ? 'col_danger' : 'col_primary']" v-if="Number(data.MONAVERAGE)!=0&&data.MONAVERAGE!=''">
                                      {{ Number(data.MONAVERAGE) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                                    </i>
                                    <span v-if="Number(data.MONAVERAGE)!=0&&data.MONAVERAGE!=''" :class="[Number(data.MONAVERAGE) > 0 ? 'col_danger' : 'col_primary']">
                                      {{ (Math.abs(data.MONAVERAGE)).toFixed(1) }}%
                                    </span>
                                  </td>
                                  <td class="tc" name="NEXTWEEKPLNAMT" v-bind:style="{'font-weight':(index+1)%3==0?'bold':''}">
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
      seasonYear: null,
      thisWeeks: null,
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
    this.calDefaultDate = moment().day('Sunday').format('YYYY-MM-DD')
    this.standardStartDate = moment(this.calDefaultDate).subtract(6, 'days').format('YYYY-MM-DD')
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
    //this.seasonEndYear = this.yearList[this.yearList.length-1]

    for (let i = 1; i < 13; i++) {
      //code = this.$store.getters.getMonthCode(i)
      this.monthList.push({CODE: String(i), CODENM: String(i)+"월"})
    }

    this.getWeek(this.year, this.month)
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
    totalClass: function (ITEM) {      
      return {
        'bg_point_col20': ITEM === 'TOTAL'
      }
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
              startDay: start_day, endDay: end_day
            })
          }
        }
      }
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
      /*
      this.dr_S = [
        {
          COMCD: '1', SUCD:'1', BRCD: 'MI', YYYY: '2020', MM: '6', WEEK: '2',
          FROM_SALEDT: '20200608', TO_SALEDT: '20200614', 
          SALEGU: '1', SALEGU2: '정상', MONPLNAMT: 2950, 
          PREWEEKAMT: 551, WEEKPLNAMT: 763.5, WEEKAMT: 540, WEEKRATE: '', 
          PREMONAMT: 1059, MONSUMPLNAMT: 1337, MONAMT: 1102, MONRATE: '', 
          WEEKAVERAGE: '-2.0', MONAVERAGE: '4.1', NEXTWEEKPLNAMT: 1234
        },
        {
          COMCD: '1', SUCD:'1', BRCD: 'MI', YYYY: '2020', MM: '6', WEEK: '2',
          FROM_SALEDT: '20200608', TO_SALEDT: '20200614', 
          SALEGU: '2', SALEGU2: '이월', MONPLNAMT: 0, 
          PREWEEKAMT: 0, WEEKPLNAMT: 0, WEEKAMT: 0, WEEKRATE: '0', 
          PREMONAMT: 0, MONSUMPLNAMT: 0, MONAMT: 0, MONRATE: '0', 
          WEEKAVERAGE: '0', MONAVERAGE: '0', NEXTWEEKPLNAMT: 0
        },
        {
          COMCD: '1', SUCD:'12', BRCD: 'MO', YYYY: '2020', MM: '6', WEEK: '2',
          FROM_SALEDT: '20200608', TO_SALEDT: '20200614', 
          SALEGU: '1', SALEGU2: '정상', MONPLNAMT: 3120, 
          PREWEEKAMT: 480, WEEKPLNAMT: 742, WEEKAMT: 602, WEEKRATE: '', 
          PREMONAMT: 1475, MONSUMPLNAMT: 1717, MONAMT: 1821, MONRATE: '', 
          WEEKAVERAGE: '25.4', MONAVERAGE: '23.5', NEXTWEEKPLNAMT: 1234
        },
        {
          COMCD: '1', SUCD:'12', BRCD: 'MO', YYYY: '2020', MM: '6', WEEK: '2',
          FROM_SALEDT: '20200608', TO_SALEDT: '20200614', 
          SALEGU: '2', SALEGU2: '이월', MONPLNAMT: 1550, 
          PREWEEKAMT: 394, WEEKPLNAMT: 368, WEEKAMT: 279, WEEKRATE: '', 
          PREMONAMT: 1170, MONSUMPLNAMT: 853, MONAMT: 960, MONRATE: '', 
          WEEKAVERAGE: '-29.2', MONAVERAGE: '-17.9', NEXTWEEKPLNAMT: 1234
        },
        {
          COMCD: '1', SUCD:'21', BRCD: 'FO', YYYY: '2020', MM: '6', WEEK: '2',
          FROM_SALEDT: '20200608', TO_SALEDT: '20200614', 
          SALEGU: '1', SALEGU2: '정상', MONPLNAMT: 0, 
          PREWEEKAMT: 0, WEEKPLNAMT: 0, WEEKAMT: 0, WEEKRATE: '', 
          PREMONAMT: 0, MONSUMPLNAMT: 0, MONAMT: 0, MONRATE: '', 
          WEEKAVERAGE: '', MONAVERAGE: '', NEXTWEEKPLNAMT: 0
        },
        {
          COMCD: '1', SUCD:'21', BRCD: 'FO', YYYY: '2020', MM: '6', WEEK: '2',
          FROM_SALEDT: '20200608', TO_SALEDT: '20200614', 
          SALEGU: '2', SALEGU2: '이월', MONPLNAMT: 1110, 
          PREWEEKAMT: 434, WEEKPLNAMT: 500, WEEKAMT: 495, WEEKRATE: '', 
          PREMONAMT: 769, MONSUMPLNAMT: 570, MONAMT: 575, MONRATE: '', 
          WEEKAVERAGE: '14.1', MONAVERAGE: '-25.2', NEXTWEEKPLNAMT: 1234
        }
      ];
      */

      

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
                WEEKRATE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKPLNAMT):0; })*100, 1), 
                PREMONAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONSUMPLNAMT):0; }), 
                MONAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), 
                MONRATE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONSUMPLNAMT):0; })*100, 1), 
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
      /*
      let list = [
        {
          BRCD: 'MI',
          PROGRESS:"*롯데울산 SD 대상 면접 : 6/9(화)\n*본방 10월 상품 품평회 : 6/10(수) 매장 SD                  <b>(5개점 - 롯/본,잠,영,현/무,목,신/강)</b>\n                                   6/11(목) 본사\n*현대매입부 미팅 : 6/11(목)\n*영남지역 상품본부 및 부산지역 매장 방문 : 6/12(금)      <b>상품본부 김상인 칩바이어</b>",
          PLAN: "*롯데본점 바이어상담 : 6/16(화)\n*갤/센터시티, 신/충청 매장점검 : 6/18(목)\n*롯데포항 매장점검 및 바이어 상담 : 6/18 (목)\n*현대매입부 미팅 : 6/19(금)"
        },
        {
          BRCD: 'MO',
          PROGRESS:"*시즌오프 진행 中\n*현대대전점 물량 카운팅, 물류방문 (6/10)\n*롯데청주 S/D(매니져) 인수인계 : 6/11(목) 폐점후",
          PLAN: "*시즌오프 진행 中\n*현대 대전점 매장 셋팅 (6/17, 대전 출장)\n*NC강서 팀장, 부서장 미팅 (6/19)"
        },
        {
          BRCD: 'FO',
          PROGRESS:"*2년차 시즌오프 진행(6/10~14 실적 6,774pcs, 484백만원)\n*매장라운딩(시즌오프 점검, 망원, 가산, NC수원)\n*대덕, 전주점 부동산 담보 변경(서류발송 완료)",
          PLAN: "* 2년차 시즌오프 물량 추가 출고\n* 물류 방문 재고 비가용 재고 점검(ND, 불량 외)\n* 한섬팩토리 시장조사(시즌오프 20일 예정)"
        }
      ];
      */
      
      this.req2svr.getProgressData(this.year, this.month, this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            alert(res["EXECUTE ERROR"]);
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
                PROGRESS: list[i].PROGRESS.split(' ').join('&nbsp;').split('  ').join('&emsp;').replace(/(?:\r\n|\r|\n)/g, '<br />'),
                PLAN: list[i].PLAN.split(' ').join('&nbsp;').split('  ').join('&emsp;').replace(/(?:\r\n|\r|\n)/g, '<br />'),
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
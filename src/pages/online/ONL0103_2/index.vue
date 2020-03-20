<template>
  <transition name="modal">
    <!-- 팝업용 레이아웃 클래스 : popup_layout -->
    <div class="wrap popup_layout">
      <!-- popup close button -->
      <div class="btn_pop_close" role="button" @click="close()">
        <i class="material-icons">close</i>
      </div>
      <!-- header -->
      <header class="header">
        <div class="header_inner">
          <h2 class="layout_title">일별 매출현황
            <span class="txt_date">
              <!-- <strong class="point_col1">{{ headSubTitle-4 }} ~ {{ headSubTitle }}</strong> -->
            </span>
          </h2>
          <div class="layout_spacer"></div>
          <div style="margin-right: 10px;" v-for="(mon , index1) in monthList" v-bind:key="index1">
            <button type="button" class="btn_primary btn_n"  @click="getData(mon)">{{mon}} 월</button>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="content">
          <div class="row">
            <div class="col_md_12">
              <div class="cont_box">
                <div class="tit">
                  <strong class="tit_txt">MI 매출현황</strong>
                  <div class="layout_spacer"></div>
                  <span class="txt">&lt; 단위: 천원 &gt;</span>
                </div>
                <div class="cont">
                  <div class="tbl_sheet tbl_hover_none np">
                    <table class="tbl table_condensed tbl_center">
                      <colgroup>
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col />
                      </colgroup>
                      <tbody>
                        <tr v-for="(row , index2) in testList" v-bind:key="index2">
                          <template v-for="(date, idx0) in row">
                            <td :key="`A-${idx0}`" v-if="date.name != ''">{{date.name}}</td>
                            <td :key="`B-${idx0}`" v-else></td>
                            <td :key="`C-${idx0}`" v-if="date.name != ''" style="text-align: left;">
                              <label class="ml10">자사&nbsp;:&nbsp;</label>{{date.JASASILAMT | comma}}<br/>
                              <label class="ml10">외부&nbsp;:&nbsp;</label>{{date.OUTSILAMT | comma}}<br/>
                              <label class="ml10">합계&nbsp;:&nbsp;</label>{{date.TOTSILAMT}}
                            </td>
                            <td :key="`D-${idx0}`" v-else></td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col_md_12">
              <div class="cont_box">
                <div class="tit">
                  <strong class="tit_txt">MO 매출현황</strong>
                  <div class="layout_spacer"></div>
                  <span class="txt">&lt; 단위: 천원 &gt;</span>
                </div>
                <div class="cont">
                  <div class="tbl_sheet tbl_hover_none np">
                    <table class="tbl table_condensed tbl_center">
                      <colgroup>
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col style="width: 80px;"/>
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col style="width: 80px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col style="width: 80px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col style="width: 80px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col style="width: 80px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col style="width: 80px;" />
                        <col />
                        <col class="bg_point_col20" style="fontWeight: bold; width: 60px;" />
                        <col style="width: 80px;" />
                        <col />
                      </colgroup>
                      <tbody v-for="(row , index3) in testList" v-bind:key="index3">
                        <tr>
                          <template v-for="(date, idx1) in row">
                            <td :key="`A-${idx1}`" rowspan="3">{{date.name}}</td>
                            <td :key="`B-${idx1}`" v-if="date.name != ''">자사</td>
                            <td :key="`C-${idx1}`" v-else></td>
                            <td :key="`D-${idx1}`">{{date.JASASILAMT | comma}}</td>
                          </template>
                        </tr>
                        <tr>
                          <template v-for="(date, idx2) in row">
                            <td :key="`A-${idx2}`" v-if="date.name != ''">외부</td>
                            <td :key="`B-${idx2}`" v-else></td>
                            <td :key="`C-${idx2}`">{{date.OUTSILAMT | comma}}</td>
                          </template>
                        </tr>
                        <tr>
                          <template v-for="(date, idx3) in row">
                            <td :key="`A-${idx3}`" v-if="date.name != ''" class="bg_point_col19">합계</td>
                            <td :key="`B-${idx3}`" v-else class="bg_point_col19"></td>
                            <td :key="`C-${idx3}`" class="bg_point_col19">{{date.TOTSILAMT}}</td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col_md_12">
              <div class="cont_box">
                <div class="tit">
                  <strong class="tit_txt">IT 매출현황</strong>
                  <div class="layout_spacer"></div>
                  <span class="txt">&lt; 단위: 천원 &gt;</span>
                </div>
                <div class="cont">
                  <div class="tbl_sheet tbl_hover_none np">
                    <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
                      <colgroup>
                        <col />
                        <col colspan="3" v-for="s in (originalTestList.length*3)" v-bind:key="s" v-bind:class="totClass(s, 1)"/>
                      </colgroup>
                      <thead>
                        <tr>
                          <th class="head-title"></th>
                          <th class="head-title" colspan="3" v-for="s in originalTestList.length" v-bind:key="s">{{s}} 일</th>
                        </tr>
                        <tr>
                          <th class="head-title">구분</th>
                          <template v-for="s in originalTestList.length" >
                            <th class="head-title" :key="`A-${s}`">자사</th>
                            <th class="head-title" :key="`B-${s}`">외부</th>
                            <th class="head-title" :key="`C-${s}`">합계</th>
                          </template>
                        </tr>
                      </thead>

                      <tbody id="sales_status" class="tbody_s">
                        <tr v-for="(data , index) in testList2" v-bind:key="index" v-bind:class="totClass(data.BRCD, 2)">
                          <td style="font-weight: bold;">{{data.BRCD}}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT1 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT1 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT1 | currency }}</td>
                          
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT2 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT2 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT2 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT3 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT3 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT3 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT4 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT4 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT4 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT5 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT5 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT5 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT6 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT6 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT6 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT7 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT7 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT7 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT8 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT8 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT8 | currency }}</td>
                          
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT9 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT9 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT9 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT10 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT10 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT10 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT11 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT11 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT11 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT12 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT12 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT12 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT13 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT13 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT13 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT14 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT14 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT14 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT15 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT15 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT15 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT16 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT16 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT16 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT17 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT17 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT17 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT18 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT18 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT18 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT19 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT19 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT19 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT20 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT20 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT20 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT21 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT21 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT21 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT22 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT22 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT22 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT23 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT23 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT23 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT24 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT24 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT24 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT25 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT25 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT25 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT26 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT26 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT26 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT27 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT27 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT27 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT28 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT28 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT28 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT29 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT29 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT29 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.JASASILAMT30">{{ data.JASASILAMT30 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.OUTSILAMT30">{{  data.OUTSILAMT30 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.TOTSILAMT30">{{  data.TOTSILAMT30 | currency }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.JASASILAMT31">{{ data.JASASILAMT31 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.OUTSILAMT31">{{  data.OUTSILAMT31 | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.TOTSILAMT31">{{  data.TOTSILAMT31 | currency }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col_md_12">
              <div class="cont_box">
                <div class="tit">
                  <strong class="tit_txt">IN 매출현황</strong>
                  <div class="layout_spacer"></div>
                  <div class="ml20 mr20">
                    <button type="button" class="btn_primary"  @click="fnExcelReport()" style="display: block; padding: 10px;">Table Download</button>
                  </div>
                  <span class="txt">&lt; 단위: 천원 &gt;</span>
                </div>
                <div class="cont">
                  <div class="tbl_sheet tbl_hover_none np">
                    <table class="tbl table_condensed tbl_center" id="tbl_excel">
                      <colgroup>
                        <col class="bg_point_col20" style="fontWeight: bold; "/>
                        <col class="bg_point_col19"/>
                        <col class="bg_point_col19" />
                        <col class="bg_point_col19" />
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
                          <th></th>
                          <th colspan="3">합계</th>
                          <th colspan="3">MI</th>
                          <th colspan="3">MO</th>
                          <th colspan="3">IT</th>
                          <th colspan="3">IN</th>
                        </tr>
                        <tr>
                          <th>일자</th>

                          <th>전체</th>
                          <th>온라인</th>
                          <th>비율(%)</th>

                          <th>전체</th>
                          <th>온라인</th>
                          <th>비율(%)</th>

                          <th>전체</th>
                          <th>온라인</th>
                          <th>비율(%)</th>
                          
                          <th>전체</th>
                          <th>온라인</th>
                          <th>비율(%)</th>

                          <th>전체</th>
                          <th>온라인</th>
                          <th>비율(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data , index) in testList3" v-bind:key="index">
                          <td>{{ data.DAY }} 일</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.TOTSILAMT">{{ data.TOTSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.TOTONLSILAMT">{{ data.TOTONLSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.TOTRATE">{{ data.TOTRATE}}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MITOTSILAMT">{{ data.MITOTSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIONLSILAMT">{{ data.MIONLSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIRATE">{{ data.MIRATE }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MITOTSILAMT">{{ data.MOTOTSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIONLSILAMT">{{ data.MOONLSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIRATE">{{ data.MORATE }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MITOTSILAMT">{{ data.ITTOTSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIONLSILAMT">{{ data.ITONLSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIRATE">{{ data.ITRATE }}</td>

                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MITOTSILAMT">{{ data.INTOTSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIONLSILAMT">{{ data.INONLSILAMT | currency }}</td>
                          <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}" v-if="data.MIRATE">{{ data.INRATE }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"

export default {
  name: "ONL0104_1",
  components: {
    
  },
  props: {
  },
  created() {
    this.loadData();
  },
  computed: {
    req2svr: () => req2svr,
    headSubTitle() {
      return this.year == null ? new Date().getFullYear() : this.year
    }
  },
  data() {
    return {
      drawer: null,
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      monthList: [],
      originalTestList: [],
      brandList: ["MI", "MO", "IT", "IN"],
      testList: [],
      testList2: [],
      testList3: [],
      brandSaleList: [
        {"BRCD": "MI", "SUCD": "1",  "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "301", "OUTSILAMT3": "0", "TOTSILAMT3": "301", "JASASILAMT2": "422", "OUTSILAMT2": "0", "TOTSILAMT2": "422", "JASASILAMT1": "776", "OUTSILAMT1": "0", "TOTSILAMT1": "776", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "MO", "SUCD": "12", "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "1357", "OUTSILAMT3": "0", "TOTSILAMT3": "1357", "JASASILAMT2": "2126", "OUTSILAMT2": "0", "TOTSILAMT2": "2126", "JASASILAMT1": "2675", "OUTSILAMT1": "0", "TOTSILAMT1": "2675", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "IT", "SUCD": "14", "JASASILAMT4": "264", "OUTSILAMT4": "1482", "TOTSILAMT4": "1746", "JASASILAMT3": "1127", "OUTSILAMT3": "1932", "TOTSILAMT3": "3059", "JASASILAMT2": "2665", "OUTSILAMT2": "1985", "TOTSILAMT2": "4650", "JASASILAMT1": "4519", "OUTSILAMT1": "3503", "TOTSILAMT1": "8022", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "IN", "SUCD": "23", "JASASILAMT4": "671", "OUTSILAMT4": "2760", "TOTSILAMT4": "3431", "JASASILAMT3": "1400", "OUTSILAMT3": "593", "TOTSILAMT3": "1993", "JASASILAMT2": "846", "OUTSILAMT2": "73", "TOTSILAMT2": "919", "JASASILAMT1": "1441", "OUTSILAMT1": "682", "TOTSILAMT1": "2123", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "SO", "SUCD": "3",  "JASASILAMT4": "29", "OUTSILAMT4": "662", "TOTSILAMT4": "691", "JASASILAMT3": "129", "OUTSILAMT3": "956", "TOTSILAMT3": "1085", "JASASILAMT2": "", "OUTSILAMT2": "", "TOTSILAMT2": "", "JASASILAMT1": "", "OUTSILAMT1": "", "TOTSILAMT1": "", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      ],
      itOnffImptList: [
        {ITEM: "00", ITEMNM: "매출합계", AMT_17: "44148980", AMT_18: "47417298", AMT_19: "58089170", AMT: ""},
        //{ITEM: "11", ITEMNM: "네이버(스타일윈도)", AMT_17: "3570534", AMT_18: "5888477", AMT_19: "9932276", AMT: ""},
        {ITEM: "22", ITEMNM: "백화점몰", AMT_17: "1932000", AMT_18: "1985000", AMT_19: "3503000", AMT: ""},
        {ITEM: "33", ITEMNM: "잇미샤몰", AMT_17: "1127000", AMT_18: "2665000", AMT_19: "4519000", AMT: ""},
        //{ITEM: "OFFLIN", ITEMNM: "오프라인", AMT_17: "37519446", AMT_18: "36878821", AMT_19: "40134894", AMT: ""}
      ],
      itOnffImptMslList: []
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadData() {
      // this.getSaleByBrandList()
      // this.getITOnOffSaleList()
      for(var i=0; i<this.month; i++) {
        this.monthList.push(i+1)
      }
      this.getData(this.month)
    },
    totalClass: function (ITEM) {      
      return {
        'bg_point_col20': ITEM === '00'
      }
    },
    getData: function (mon) {
      this.getTestListData(mon)
      this.getTestListData2(mon)
      this.getTestListData3(mon)
    },
    getTestListData: function (mon) {
      this.originalTestList = []
      this.testList = []
      var lastDay = ( new Date( this.year, mon, 0) ).getDate();
      for(var i=0; i < lastDay; i++) {
        var dummyObj = new Object();
        dummyObj.name = (i+1)+"일"
        dummyObj.JASASILAMT = Number(this.getRandomArbitrary(150000, 300000))
        dummyObj.OUTSILAMT = Number(this.getRandomArbitrary(50000, 100000))
        dummyObj.TOTSILAMT = this.comma(dummyObj.JASASILAMT + dummyObj.OUTSILAMT)
        this.originalTestList.push(dummyObj)
      }

      let index = 0
      for(var i = 0; i < 5; i++) {
        let count = 7
        let dummyList2 = []
        
        for(var j =0; j < 7; j++) {
          if(j <= count && this.originalTestList[index] != null) {
            dummyList2.push(this.originalTestList[index])
          }
          if(this.originalTestList[index] == null) {
            dummyList2.push({name: "", JASASILAMT: "", OUTSILAMT: "", TOTSILAMT: ""})
          }
          index += 1
        }
        
        this.testList.push(dummyList2)
        count = count+7
      }

    },
    getTestListData2: function (mon) {
      this.testList2 = []
      let lastDay = ( new Date( this.year, mon, 0) ).getDate();
      for(var i in this.brandList) {
        let tempObj = new Object();
        tempObj.BRCD = this.brandList[i]
        for(var j=0; j < lastDay; j++) {
          tempObj["JASASILAMT"+(j+1)] = Number(this.getRandomArbitrary(150000, 300000))
          tempObj["OUTSILAMT"+(j+1)] = Number(this.getRandomArbitrary(150000, 300000))
          tempObj["TOTSILAMT"+(j+1)] = tempObj["JASASILAMT"+(j+1)] + tempObj["OUTSILAMT"+(j+1)]
        }
        this.testList2.push(tempObj)
      }

      let totObj = {
        BRCD : "TOTAL"
      };
      for(var j=0; j < lastDay; j++) {
        totObj["JASASILAMT"+(j+1)] = _.sumBy(this.testList2, function(o) { return Number(o["JASASILAMT"+(j+1)]); })
        totObj["OUTSILAMT"+(j+1)] = _.sumBy(this.testList2, function(o) { return Number(o["OUTSILAMT"+(j+1)]); })
        totObj["TOTSILAMT"+(j+1)] = _.sumBy(this.testList2, function(o) { return Number(o["TOTSILAMT"+(j+1)]); })
      }
      this.testList2.push(totObj)
      console.log("testList2!!!!!!????? >>>> ", this.testList2)
    },
    getTestListData3: function (mon) {
      let lastDay = ( new Date( this.year, mon, 0) ).getDate();
      for(let i=0; i<lastDay; i++) {
        let tempObj = new Object();
        tempObj.DAY = i+1
        for(let j in this.brandList) {
          tempObj[this.brandList[j]+"TOTSILAMT"] = Number(this.getRandomArbitrary(10000, 30000))
          tempObj[this.brandList[j]+"ONLSILAMT"] = Number(this.getRandomArbitrary(1000, 3000))
          tempObj[this.brandList[j]+"RATE"] = Number(this.getRandomArbitrary(0, 100))
        }
        this.testList3.push(tempObj)
      }

      let dummys = this.brandList
      let totObj = new Object();
      totObj.DAY = 'TOTAL'
      for(let i in this.testList3) {
        this.testList3[i]["TOTSILAMT"] =  0
        this.testList3[i]["TOTONLSILAMT"] =  0
        let sumLate = 0
        for(let j in dummys) {
          this.testList3[i]["TOTSILAMT"] += Number(this.testList3[i][dummys[j]+"TOTSILAMT"])
          this.testList3[i]["TOTONLSILAMT"] += Number(this.testList3[i][dummys[j]+"ONLSILAMT"])
          sumLate += Number(this.testList3[i][dummys[j]+"RATE"])
        }
        this.testList3[i]["TOTRATE"] = (sumLate/lastDay).toFixed(1)
      }
      // this.testList3.unshift(totObj)
      console.log("!!!!!!????? >>>> ", this.testList3)
    },
    getRandomArbitrary: function (min, max) {
      return Number(Math.random() * (max - min) + min).toFixed(0);
    },
    comma: function(num) {
      let str
      if(num != "" && num != null && num != "undefined") {
        str = num.toString();
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      } else {
        return "";
      }
      
    },
    totClass: function (item, gu) {
      if(gu == 1) {
        return {
          'bg_point_col19': item%3 == 0
        }
      } else {
        return {
          'bg_point_col20': item == 'TOTAL'
        }
      }     
    },
    fnExcelReport: function () {
      // 우선 id 를 이용하여 table 을 가져옵니다.
      var table = document.getElementById('tbl_excel');

      for(var i = 0; i < table.childNodes[0].childNodes[0].childNodes.length; i++){
        if(table.childNodes[0].childNodes[0].childNodes[i].firstChild !== null){
          table.childNodes[0].childNodes[0].childNodes[i].classList.add("head-title");
        }
      }

      var styles = "<style>\n";
      styles += ".table{width: 100%;}\n";
      styles += ".head-title{border-top: 1px solid #dee2e6; border-bottom: 2px solid #dee2e6; background-color: #a1cffd;}\n";
      styles += "</style>";

      var browser = navigator.userAgent.toLowerCase();
      if(browser.indexOf('trident') != -1){
        // IE인 경우
        // excel 다운로드 시 파일명
        var saveFileName = "table_example.xls";
        var oWin = window.open("about:blank", "_blank",  "width=150px; height=150px;");
        // oWin.document.write(styles);
        oWin.document.write(table.outerHTML);
        var success = oWin.document.execCommand("SaveAs", false, saveFileName);
        oWin.close();
      } else {
        // IE 외의 브라우저인 경우
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template =  '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + styles + '</head><body>{table}</body></html>';
        // var template =  '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>';
        var base64 = function(s){return window.btoa(unescape(encodeURIComponent(s)))}
        var format = function(s, c){return s.replace(/{(\w+)}/g, function(m, p){return c[p];})}
        var ctx = {worksheet : 'DAILY' || 'Worksheet', table : table.outerHTML.split('₩').join('')}
        var a = document.createElement('a');
        a.href = uri + base64(format(template, ctx))
        a.download = 'table_example.xls';
        a.click();
      }

      table.classList.add('table-striped');
      for(var i = 0; i < table.childNodes[0].childNodes[0].childNodes.length; i++){
        if(table.childNodes[0].childNodes[0].childNodes[i].firstChild !== null){
          table.childNodes[0].childNodes[0].childNodes[i].classList.remove("head-title");
        }
      }
    },
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
    },
    comma: function(num) {
      let str
      if(num != "" && num != null && num != "undefined") {
        str = num.toString();
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      } else {
        return "";
      }
      
    }
  }
};
</script>
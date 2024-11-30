var express = require('express');
var router = express.Router();
const knex = require('../knex');
const moment = require("moment-timezone");
var path = require('path');

// Get home page router
var final_day = [];
var final_night = [];
var final_morning = [];
var final_kalyan = [];
var final_main = [];
var convert_num_arr = [];
var convert_num_day = [];
var convert_num_morning = [];
var convert_num_night = [];
var convert_num_kalyan = [];
var convert_num_main = [];
var convert_num_chakri = [];
var convert_num_teer = [];

router.get('/', function (req, res, next) {
  var date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
  var demo_date = [];
  knex('delhi_day').select('*').then(details => {
    knex('delhi_night').select('*').then(night => {
      knex('delhi_morning').select('*').then(morning => {
        knex('kalyan').select('*').then(kalyan => {
          knex('main_bajar').select('*').then(main => {
            knex('chakri_bajar').select('*').then(chakri => {
              knex('delhi_teer').select('*').then(teer => {
                knex('delhi_teer').select('*').then(n_teer => {
                  knex('delhi_teer').select('*').where('date', date).orderBy('id', "desc").limit(1).then(result_NightTeer => {

                    knex('image').select('*').orderBy('id', 'desc').limit('1').then(result_img => {
                      var night_teer
                      console.log('this is night result teer ', result_NightTeer);
                      console.log('this is night result length ', result_NightTeer.length);

                      if (result_NightTeer.length > 0) {
                        if (result_NightTeer[0].n_status == 'true') {      // if hide result is true
                          if (result_NightTeer[0].n_value == '' || result_NightTeer[0].n_value == null) {
                            night_teer = '**' + ' : ' + result_NightTeer[0].n_value2  // if first value does not exitst 
                          } else if (result_NightTeer[0].n_value2 == '' || result_NightTeer[0].n_value2 == null) {
                            night_teer = result_NightTeer[0].n_value + ' : ' + '**' // if second value does not exitst 
                          } else {
                            night_teer = result_NightTeer[0].n_value + ' : ' + result_NightTeer[0].n_value2
                          }
                        } else {
                          night_teer = 'Coming Soon'
                        }
                      } else {
                        night_teer = 'Coming Soon'
                      }






                      // console.log("dett ", details.status);
                      // for (var i = 0; i < details.length; i++) {
                      if (details.length == 0 || details.length == null) {
                        demo_date.push('Coming Soon ');
                      } else {
                        var i = details.length - 1
                        if (details[i].status == 'false') {
                          demo_date.push('Coming Soon');
                        } else {
                          // var date_modify = details[details.length - 1].date;
                          // demo_date.push(date_modify);

                          if (details[i].lt1_25 == '' || details[i].lt1_25 == null) {
                            var temppp_l = "***"
                            // var digits_l = temppp_l.toString().split('');
                            realDigits_l = temppp_l;
                          } else {
                            var temppp_l = details[i].lt1_25;
                            var digits_l = temppp_l.toString().split('');
                            realDigits_l = digits_l.map(Number);
                          }
                          if (details[i].rt3_00 == '' || details[i].rt3_00 == null) {
                            var temppp_r = '***';
                            var realDigits_r = temppp_r;
                          } else {
                            var temppp_r = details[i].rt3_00;
                            var digits_r = temppp_r.toString().split('');
                            var realDigits_r = digits_r.map(Number);
                          }
                          var value1 = {
                            left: realDigits_l,
                            right: realDigits_r
                          }
                          final_day.push(value1);

                          var left_num = details[i].lt1_25;
                          var right_num = details[i].rt3_00;
                          var cent_l = details[i].left;
                          var cent_r = details[i].right;
                          var day_var = convert_num(left_num, right_num, cent_l, cent_r);

                          convert_num_arr.push(day_var);
                          convert_num_day.push(day_var);

                        }
                      }
                      if (morning.length == 0 || morning.length == null) {
                        demo_date.push('Coming Soon');
                      } else {
                        var i = morning.length - 1
                        if (morning[i].status == 'false') {
                          demo_date.push('Coming Soon');
                        } else {
                          // for (let i = 0; i < morning.length; i++) {
                          if (morning[i].lt11_30 == '' || morning[i].lt11_30 == null) {
                            var temppp_l = "***";
                            var realDigits_l = temppp_l;
                          } else {
                            var temppp_l = morning[i].lt11_30;
                            var morning_l = temppp_l.toString().split('');
                            var realDigits_l = morning_l.map(Number);
                          }
                          if (morning[i].rt12_30 == "" || morning[i].rt12_30 == null) {
                            var temppp_r = "***";
                            var realDigits_r = temppp_r;
                          } else {
                            var temppp_r = morning[i].rt12_30;
                            var morning_r = temppp_r.toString().split('');
                            var realDigits_r = morning_r.map(Number);
                          }
                          var value1 = {
                            left: realDigits_l,
                            right: realDigits_r
                          }
                          final_morning.push(value1);

                          var left_num = morning[i].lt11_30;
                          var right_num = morning[i].rt12_30;
                          var cent_l = morning[i].left;
                          var cent_r = morning[i].right;
                          var mr_var = convert_num(left_num, right_num, cent_l, cent_r);
                          convert_num_arr.push(mr_var);
                          convert_num_morning.push(mr_var);
                        }
                      }
                      if (night.length == 0 || night.length == null) {
                        demo_date.push('Coming Soon');
                      } else {
                        // for (let i = 0; i < night.length; i++) {
                        var i = night.length - 1
                        if (night[i].status == 'false') {
                          demo_date.push('Coming Soon');
                        } else {
                          if (night[i].lt8_50 == '' || night[i].lt8_50 == null) {
                            var temppp_l = "***";
                            var realDigits_l = temppp_l;
                          } else {
                            var temppp_l = night[i].lt8_50;
                            var night_l = temppp_l.toString().split('');
                            var realDigits_l = night_l.map(Number);
                          }
                          if (night[i].rt10_30 == null) {
                            var temppp_r = "***";
                            var realDigits_r = temppp_r;

                          } else {
                            var temppp_r = night[i].rt10_30;
                            var night_r = temppp_r.toString().split('');
                            var realDigits_r = night_r.map(Number);

                          }

                          var value1 = {
                            left: realDigits_l,
                            right: realDigits_r
                          }
                          // console.log("RIGHT FROM NIGHT ++>",value1);
                          final_night.push(value1);

                          var left_num = night[i].lt8_50;
                          var right_num = night[i].rt10_30;
                          var cent_l = night[i].left;
                          var cent_r = night[i].right;
                          var night_var = convert_num(left_num, right_num, cent_l, cent_r);
                          convert_num_arr.push(night_var);
                          convert_num_night.push(night_var);
                        }
                      }
                      //for kalyan bajar
                      // for (let i = 0; i < kalyan.length; i++) {
                      if (kalyan.length == 0 || kalyan.length == null) {
                        demo_date.push('Coming Soon');
                      } else {
                        var i = kalyan.length - 1
                        if (kalyan[i].status == 'false') {
                          demo_date.push('Coming Soon');
                        } else {
                          if (kalyan[i].value1 == '' || kalyan[i].value1 == null) {
                            var temppp_l = "***";
                            var realDigits_l = temppp_l;
                          } else {
                            var temppp_l = kalyan[i].value1;
                            var kalyan_l = temppp_l.toString().split('');
                            var realDigits_l = kalyan_l.map(Number);
                          }
                          if (kalyan[i].value2 == '' || kalyan[i].value2 == null) {
                            var temppp_r = "***";
                            var realDigits_r = temppp_r;
                          }
                          else {
                            var temppp_r = kalyan[i].value2;
                            var kalyan_r = temppp_r.toString().split('');
                            var realDigits_r = kalyan_r.map(Number);
                          }
                          var kalyan_val = {
                            left: realDigits_l,
                            right: realDigits_r
                          }
                          final_kalyan.push(kalyan_val);

                          var left_num = kalyan[i].value1;
                          var right_num = kalyan[i].value2;
                          var cent_l = kalyan[i].left_no;
                          var cent_r = kalyan[i].right_no;

                          var kalyan_var = convert_num(left_num, right_num, cent_l, cent_r);
                          convert_num_kalyan.push(kalyan_var);
                        }
                      }

                      //for main bajar
                      // for (let i = 0; i < main.length; i++) {
                      if (main.length == 0 || main.length == null) {
                        demo_date.push('Coming Soon');
                      } else {
                        var i = main.length - 1
                        if (main[i].status == 'false') {
                          demo_date.push('Coming Soon');
                        } else {
                          if (main[i].value1 == '' || main[i].value1 == null) {
                            main[i].value1 = "***";
                            // var realDigits_l = main[i].value1;
                          } else {
                            var temppp_l = main[i].value1;
                            var main_l = temppp_l.toString().split('');
                            var realDigits_l = main_l.map(Number);
                          }
                          if (main[i].value2 == '' || main[i].value2 == null) {
                            main[i].value2 = "***";
                            // var realDigits_r = main[i].value2;
                          }
                          else {
                            var temppp_r = main[i].value2;
                            var kalyan_r = temppp_r.toString().split('');
                            var realDigits_r = kalyan_r.map(Number);
                          }
                          var main_val = {
                            left: realDigits_l,
                            right: realDigits_r
                          }
                          final_main.push(main_val)
                          // console.log("FROMMM MQIANN -->", final_main);

                          var left_num = main[i].value1;
                          var right_num = main[i].value2;
                          var cent_l = main[i].left_no;
                          var cent_r = main[i].right_no;
                          var main_var = convert_num(left_num, right_num, cent_l, cent_r);
                          convert_num_main.push(main_var);
                        }
                      }

                      if (teer.length == 0 || teer.length == null) {
                        demo_date.push('Coming Soon');
                      } else {
                        var i = teer.length - 1
                        if (teer[i].status == 'false') {
                          demo_date.push('Coming Soon');
                        } else {
                          if ((teer[i].value == null || teer[i].value == "") && (teer[i].value2 == null || teer[i].value2 == "")) {
                            teer[i].value = "**";
                            teer[i].value2 = '**';
                          } else if (teer[i].value == null || teer[i].value == "") {
                            teer[i].value = '**'
                          } else if (teer[i].value2 == null || teer[i].value2 == "") {
                            teer[i].value2 = '**'
                          }
                          var sj = teer[i].value + " : " + teer[i].value2
                          demo_date.push(sj)
                          console.log("arrr from teer", sj);
                        }
                      }
                      if (n_teer.length == 0 || n_teer.length == null) {
                        demo_date.push('Coming Soon');

                      } else {
                        if (n_teer.n_status == 'false') {
                          demo_date.push('Coming Soon');
                        } else {
                          if ((n_teer.n_value == null || n_teer.n_value == "") && (n_teer.n_value2 == null || n_teer.n_value2 == "")) {
                            n_teer.n_value = "**";
                            n_teer.n_value2 = '**';
                          } else if (n_teer.n_value == null || n_teer[i].n_value == "") {
                            n_teer[i].n_value = '**'
                          } else if (n_teer.n_value2 == null || n_teer[i].n_value2 == "") {
                            n_teer[i].n_value2 = '**'
                          }
                          var js = n_teer.n_value + " : " + n_teer.n_value2
                          demo_date.push(js)
                          console.log("arrr from teer", js);
                        }
                      }




                      function convert_num(left_num, right_num, cent_l, cent_r) {
                        if (left_num == "" || left_num == null) {
                          left_num = "***";
                        }

                        if (right_num == "" || right_num == null) {
                          right_num = "***";
                        }
                        if (cent_l == "" || cent_l == null) {
                          cent_l = "*";
                        }
                        if (cent_r == "" || cent_r == null) {
                          cent_r = "*";
                        }
                        var bahubali = left_num + "-" + cent_l + cent_r + "-" + right_num;
                        demo_date.push(bahubali);
                        return bahubali;
                      }
                      console.log("ARE DEVAAAAAAAAAAAAAAAAAA----->", demo_date);

                      function convert_teer(win_num) {
                        if (win_num == "") {
                          win_num = "**";
                        }
                        var bahubali = win_num;
                        return bahubali;
                      }
                      console.log("Bahubalki teer", bahubali);
                      var bahubali = [];
                      res.render('home', { night_teer: night_teer, details: details, value1: final_day, bahubali: bahubali, morning: morning, mornings: final_morning, night: night, nights: final_night, result_img: result_img, demo_date: demo_date });

                    })
                  })
                })
              })
            })
          })
        })
      })

    }).catch(error =>
      console.error("error is====>", error))
  }).catch(error =>
    console.error("error is====>", error)
  )


})


router.get('/day', function (req, res, next) {
  var final_day = [];
  knex('delhi_day').select('*').orderBy('date').then(details => {

    for (let i = 0; i < details.length; i++) {
      if ((details[0].lt1_25 == "" || details[0].lt1_25 == null)) {
        // details[0].left = "*"
        details[0].lt1_25 = "***"
        realDigits_l = details[0].lt1_25

      }
      else {
        var temppp_l = details[i].lt1_25;
        var realDigits_l = temppp_l;
      }
      if ((details[0].rt3_00 == "" || details[0].rt3_00 == null)) {
        // details[0].right = "*"
        details[0].rt3_00 = "***"
        realDigits_r = details[0].rt3_00
      }
      else {
        var temppp_r = details[i].rt3_00;
        var realDigits_r = temppp_r;
      }

      var win = details[i].left + details[i].right;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }
      console.log("------logg>>>", final_day);


      final_day.push(value1);

    }
    res.render('delhi_day_panel', { details: details, days: final_day })
  })
})

router.get('/morning', function (req, res, next) {
  var final_morning = [];
  var temppp_l;
  var temppp_r;
  var realDigits_l;
  var realDigits_r;
  knex('delhi_morning').select('*').orderBy('date').then(morning => {
    for (let i = 0; i < morning.length; i++) {
      if ((morning[i].lt11_30 == null || morning[i].lt11_30 == "")) {
        morning[i].lt11_30 = "***"
        realDigits_l = morning[i].lt11_30

      }
      else {
        realDigits_l = morning[i].lt11_30;
      }
      if ((morning[i].rt12_30 == "" || morning[i].rt12_30 == null)) {
        morning[i].rt12_30 = "***"
        realDigits_r = morning[i].rt12_30
      }
      else {
        realDigits_r = morning[i].rt12_30;
      }
      var win = morning[i].left + morning[i].right;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }
      final_morning.push(value1);

    }

    res.render('delhi_morning_panel', { morning: morning, mornings: final_morning })
  })
})

router.get('/night', function (req, res, next) {
  var final_night = [];
  knex('delhi_night').select('*').orderBy('date').then(night => {

    for (let i = 0; i < night.length; i++) {
      if (night[i].lt8_50 == "" || night[i].lt8_50 == null) {
        night[i].lt8_50 == "***"
      }
      else {
        var realDigits_l = night[i].lt8_50
      }
      if (night[i].rt10_30 == "" || night[i].rt10_30 == null) {
        night[i].rt10_30 = "***"
      }
      else {
        var realDigits_r = night[i].rt10_30
      }

      // if (night[i].left == "" || night[i].left == null) {
      //   night[i].left = "*"
      // }
      // if (night[i].right == "" || night[i].right == null) {
      //   night[i].right = "*"
      // }
      var win = night[i].left + night[i].right;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }

      final_night.push(value1);
    }
    console.log("From n night ==>", final_night);
    res.render('delhi_night_panel', { night: night, nights: final_night })
  })
})

router.get('/kalyan', function (req, res, next) {
  var kalyan_arr = [];
  knex('kalyan').select('*').orderBy('date').then(kalyan => {

    for (let i = 0; i < kalyan.length; i++) {
      if (kalyan[i].value1 == "" || kalyan[i].value1 == null) {
        kalyan[i].value1 == "***"
      }
      else {
        var realDigits_l = kalyan[i].value1
      }
      if (kalyan[i].value2 == "" || kalyan[i].value2 == null) {
        kalyan[i].value2 = "***"
      }
      else {
        var realDigits_r = kalyan[i].value2
      }



      // var temppp_l = kalyan[i].value1;
      // var kalyan_l = temppp_l.toString().split('');
      // var realDigits_l = kalyan_l.map(Number);

      // var temppp_r = kalyan[i].value2;
      // var kalyan_r = temppp_r.toString().split('');
      // var realDigits_r = kalyan_r.map(Number);

      var win = kalyan[i].left_no + kalyan[i].right_no;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }

      kalyan_arr.push(value1);

    }
    res.render('kalyan_panel_chart', { kalyan: kalyan, abc: kalyan_arr });
  })
})


router.get('/bajar', function (req, res, next) {
  var main_arr = [];
  var realDigits_l;
  var realDigits_r;
  knex('main_bajar').select('*').orderBy('date').then(main => {

    for (let i = 0; i < main.length; i++) {
      if (main[i].value1 == "" || main[i].value1 == null) {
        main[i].value1 == "***"
        realDigits_l = main[i].value1
      }
      else {
        realDigits_l = main[i].value1
      }
      if (main[i].value2 == "" || main[i].value2 == null) {
        main[i].value2 = "***"
        realDigits_r = main[i].value2
      }
      else {
        realDigits_r = main[i].value2
      }
      var win = main[i].left_no + main[i].right_no;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }

      main_arr.push(value1);

    }
    console.log("Array of main ==>", main_arr);
    res.render('main_bajar_panel', { main: main, values: main_arr })
  })
})

router.get('/teer', function (req, res, next) {
                                    
                                    
                     knex('delhi_teer').select('*').orderBy("id", "desc").then(teer_result => {
        res.render('delhi_teer_panel', { result: teer_result })
    }).catch(err => {
        console.log(err);
    })
                   
                                    
                                    
                                    
  var teer_arr = [];
  knex('delhi_teer').select('*').then(teer => {

    for (let i = 0; i < teer.length; i++) {

      var temppp_t = teer[i].value;
      var temppp_r = teer[i].value2;
      var temppp_nl = teer[i].n_value;
      var temppp_nr = teer[i].n_value2;
      var temppp_d = teer[i].date;

      var win = teer[i].value;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: temppp_t,
          right: temppp_r,
          n_left: temppp_nl,
          n_right: temppp_nr,
          red: -1
        }
      } else {
        var value1 = {
          left: temppp_t,
          right: temppp_r,
          n_left: temppp_nl,
          n_right: temppp_nr,
          red: -2
        }
      }
      teer_arr.push(value1);


    }
    console.log("Teer aaraya =>>", teer_arr);
    res.render('delhi_teer_panel', { teer: teer, val: teer_arr })
  })
})


// router.get('/teer_panel', function (req, res, next) {
//   knex('delhi_teer').select('*').orderBy("id", "asc").then(teer_result => {
//     console.log(result);
//   })

  

// })
// router.get('/chakri', function (req, res, next) {
//   var chakri_arr = [];
//   knex('chakri_bajar').select('*').then(chakri => {

//     for (let i = 0; i < chakri.length; i++) {

//       var temppp_t = chakri[i].time;
//       var temppp_d = chakri[i].date;

//       var win = chakri[i].value1;
//       if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
//         var value1 = {
//           left: temppp_t,
//           right: temppp_d,
//           red: -1
//         }
//       } else {
//         var value1 = {
//           left: temppp_t,
//           right: temppp_d,
//           red: -2
//         }
//       }
//       chakri_arr.push(value1);


//     }
//     res.render('chakri_pannel', { chakri: chakri, val: chakri_arr })
//   })
// })



//router for taking values of today's date
// router.get('/home_page',function (req,res,next) {
//   var date_arr = []
//   var date = moment().tz('Asia/Kolkata').format('yyyy-MM-DD');
//   knex('delhi_day').select('*').where('date',date).then(result =>{
//     knex('delhi_morning').select('*').where('date',date).then(result1 =>{
//       knex('delhi_night').select('*').where('date',date).then(result2 =>{
//         knex('kalyan').select('*').where('date',date).then(result3 =>{
//           knex('main_bajar').select('*').where('date',date).then(result4 =>{

//             for (let i = 0; i < result.length; i++) {

//               var left_num = result[i].lt1_25;
//               var right_num = result[i].rt3_00;
//               var cent_l = result[i].left;
//               var cent_r = result[i].right;
//              convert_num(left_num, right_num, cent_l, cent_r);


//             }

//             for (let i = 0; i < result1.length; i++) {

//               var left_num = result1[i].lt11_30;
//               var right_num = result1[i].rt12_30;
//               var cent_l = result1[i].left;
//               var cent_r = result1[i].right;
//              convert_num(left_num, right_num, cent_l, cent_r);


//             }
//             for (let i = 0; i < result2.length; i++) {

//               var left_num = result2[i].lt8_50;
//               var right_num = result2[i].rt10_30;
//               var cent_l = result2[i].left;
//               var cent_r = result2[i].right;
//              convert_num(left_num, right_num, cent_l, cent_r);


//             }
//             for (let i = 0; i < result3.length; i++) {

//               var left_num = result3[i].value1;
//               var right_num = result3[i].value2;
//               var cent_l = result3[i].left_no;
//               var cent_r = result3[i].right_no;
//              convert_num(left_num, right_num, cent_l, cent_r);


//             }
//             for (let i = 0; i < result4.length; i++) {

//               var left_num = result4[i].value1;
//               var right_num = result4[i].value2;
//               var cent_l = result4[i].left_no;
//               var cent_r = result4[i].right_no;
//              convert_num(left_num, right_num, cent_l, cent_r);


//             }


//             function convert_num(left_num, right_num, cent_l, cent_r) {
//               if ((left_num == "" || left_num == null) && (cent_l == "" || cent_l == null)) {
//                 left_num = "***"
//                 cent_l = "*"

//               }
//               if ((right_num == "" || right_num == null) && (cent_r == "" || cent_r == null)) {
//                 right_num = "***";
//                 cent_r = "*";

//               }
//               var val = left_num + "-" + cent_l + cent_r + "-" + right_num;
//               date_arr.push(val);
//             }

//             console.log("DATE ARRRRR_____---->>>",date_arr);
//             res.render('home_page',{date_arr : date_arr})

//           })
//         })
//       })

//     })
//   })
// })

router.get('/google59130cc095bdd15e.html', function (req, res, next) {

  res.sendFile(path.resolve(__dirname + '../../google59130cc095bdd15e.html'));

})
router.get('/sitemap.xml', function (req, res, next) {

  res.sendFile(path.resolve(__dirname + '../../sitemap.xml'));



})

module.exports = router;


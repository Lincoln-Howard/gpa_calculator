// content div
var content_div = document.getElementById ("content");
// the representation table for the classes
var rep_table = document.getElementById ("rep");
// the data for the table
var rep_data = {};
// called on startup
function db_list () {
  var xhr = new XMLHttpRequest ();
  xhr.onloadend = function () {
    rep_data = JSON.parse (this.response);
    console.log (rep_data);
    generate ();
  };
  xhr.open ("GET", "/db_list", true);
  xhr.send ();
}
// generate the table for data
function generate () {
  // clear the content
  content_div.innerHTML = "";
  // add the rep_table
  content_div.appendChild (rep_table);
  // clear the rep_table
  rep_table.innerHTML = "";
  // generate the key row
  gen_key_row ();
  // generate data rows
  gen_data_rows ();
  // get gpa
  gen_util_row ();
  // set rep_table not invisible
  rep_table.className = "";
}
// generates the row of keys as headers in a table, appends them to rep_table
function gen_key_row () {
  // the row element for the keys
  var key_row = document.createElement ("tr");
  // ["subject","number","campus","professor","credits","grade","semester"]
  // create the first key set text and event handlers and append to the row
  var subject_th = document.createElement ("th");
  subject_th.innerHTML = "subject";
  subject_th.onclick = function () {
    by_subject ();
    generate ();
  }
  subject_th.ondblclick = function () {
    desc_by_subject ();
    generate ();
  }
  key_row.appendChild (subject_th);
  // create the number key set text and event handlers and append to the row
  var number_th = document.createElement ("th");
  number_th.innerHTML = "number";
  number_th.onclick = function () {
    by_number ();
    generate ();
  }
  number_th.ondblclick = function () {
    desc_by_number ();
    generate ();
  }
  key_row.appendChild (number_th);
  // create the campus key set text and event handlers and append to the row
  var campus_th = document.createElement ("th");
  campus_th.innerHTML = "campus";
  campus_th.onclick = function () {
    by_campus ();
    generate ();
  }
  campus_th.ondblclick = function () {
    desc_by_campus ();
    generate ();
  }
  key_row.appendChild (campus_th);
  // create the professor key set text and event handlers and append to the row
  var prof_th = document.createElement ("th");
  prof_th.innerHTML = "professor";
  prof_th.onclick = function () {
    by_prof ();
    generate ();
  }
  prof_th.ondblclick = function () {
    desc_by_prof ();
    generate ();
  }
  key_row.appendChild (prof_th);
  // create the credits key set text and event handlers and append to the row
  var credits_th = document.createElement ("th");
  credits_th.innerHTML = "credits";
  credits_th.onclick = function () {
    by_credits ();
    generate ();
  }
  credits_th.ondblclick = function () {
    desc_by_credits ();
    generate ();
  }
  key_row.appendChild (credits_th);
  // create the grade key set text and event handlers and append to the row
  var grade_th = document.createElement ("th");
  grade_th.innerHTML = "grade";
  grade_th.onclick = function () {
    by_grade ();
    generate ();
  }
  grade_th.ondblclick = function () {
    desc_by_grade ();
    generate ();
  }
  key_row.appendChild (grade_th);
  // create the semester key set text and event handlers and append to the row
  var semester_th = document.createElement ("th");
  semester_th.innerHTML = "semester";
  semester_th.onclick = function () {
    by_semester ();
    generate ();
  }
  semester_th.ondblclick = function () {
    desc_by_semester ();
    generate ();
  }
  key_row.appendChild (semester_th);
  // add the key_row
  rep_table.appendChild (key_row);
}
// generates the rows of the data table, appends them to rep_table
function gen_data_rows () {
  // loop over rows of data
  for (var i = 0; i < rep_data.data.length; i++) {
    // create a html row for representing the data
    var data_row = document.createElement ("tr");
    // loop over elements in the data row, add the data
    for (var j = 0; j < rep_data.data [i].length; j++) {
      // create td element for the data
      var td = document.createElement ("td");
      // set value in the td
      td.innerHTML = rep_data.data [i][j];
      // append td to the row
      data_row.appendChild (td);
    }
    // add the row to rep_table
    rep_table.appendChild (data_row);
  }
}
// get the gpa and represent it
function gen_util_row () {
  // create the row with id 'util_row'
  var util_row = document.createElement ("tr");
  util_row.setAttribute ("id", "util_row");
  // add blank space
  util_row.appendChild (document.createElement ("td"));
  // create the td for adding a class, set classname, innerHTML and event handlers
  var td_add = document.createElement ("td");
  td_add.className = "util_row";
  td_add.innerHTML = "add class";
  td_add.onclick = addClass;
  util_row.appendChild (td_add);
  // create the td for modifying a class, set classname, innerHTML and event handlers
  var td_mod = document.createElement ("td");
  td_mod.className = "util_row";
  td_mod.innerHTML = "modify class";
  td_mod.onclick = modify;
  util_row.appendChild (td_mod);
  // create the td for deleting a class, set classname, innerHTML and event handlers
  var td_del = document.createElement ("td");
  td_del.className = "util_row";
  td_del.innerHTML = "delete class";
  // td.onclick = delClass;
  util_row.appendChild (td_del);
  // create the td for deleting a class, set classname, innerHTML and event handlers
  var td_credits = document.createElement ("td");
  td_credits.className = "util_row";
  td_credits.innerHTML = "credit count";
  // td.onclick = addClass;
  util_row.appendChild (td_credits);
  // create the td for calculating gpa, set classname, innerHTML and event handlers
  var td_gpa = document.createElement ("td");
  td_gpa.className = "util_row";
  td_gpa.innerHTML = "get gpa";
  // td.onclick = addClass;
  util_row.appendChild (td_gpa);
  // add blank space
  util_row.appendChild (document.createElement ("td"));
  // append to the table
  rep_table.appendChild (util_row);
}
// addclass function
function addClass () {
  var xhr = new XMLHttpRequest ();
  xhr.onloadend = function () {
    content_div.innerHTML = this.response;
    var btn = document.createElement ("button");
    btn.onclick = db_list;
    btn.className = "back_btn";
    btn.innerHTML = "back";
    content_div.appendChild (btn);
  }
  xhr.open ("GET", "/add_form", true);
  xhr.send ();
}
// modify class method
function modify () {
  window.location.assign('modify.html');
}
// function to alphabetically compare two values
// return value of 1 means that stra is first
// return value of 0 means that stra = strb
// return value of -1 means that strb is first
function alpha (stra, strb) {
  // lowercase everything
  var a = stra.toLowerCase ();
  var b = strb.toLowerCase ();
  // test for length
  if (a.length == b.length) {
    // first letter difference
    for (var i = 0; i < a.length; i++) {
      if (a.charCodeAt (i) != b.charCodeAt (i)) {
        if (a.charCodeAt (i) < b.charCodeAt (i)) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    return 0;
  } else if (a.length < b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a.charCodeAt (i) != b.charCodeAt (i)) {
        if (a.charCodeAt (i) < b.charCodeAt (i)) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    var ac = a.charCodeAt (a.length - 1);
    for (var i = a.length; i < b.length; i++) {
      if (ac != b.charCodeAt (i)) {
        if (ac < b.charCodeAt (i)) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    return 0;
  } else {
    for (var i = 0; i < b.length; i++) {
      if (a.charCodeAt (i) != b.charCodeAt (i)) {
        if (a.charCodeAt (i) < b.charCodeAt (i)) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    var bc = b.charCodeAt (b.length - 1);
    for (var i = b.length; i < a.length; i++) {
      if (a.charCodeAt (i) != bc) {
        if (a.charCodeAt (i) < bc) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    return 0;
  }
}
// swap two arrays in the data section of rep_data.data
function swap (a, b) {
  var c = rep_data.data [a];
  rep_data.data [a] = rep_data.data [b];
  rep_data.data [b] = c;
}
// sort the rep data by subject (alphabetical)
function by_subject () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++) {
      if (alpha (rep_data.data [j][0], rep_data.data [low][0]) == 1) low = j;
    }
    swap (i, low);
  }
}
// sort rep data by subject (alphabetical) descending
function desc_by_subject () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (alpha (rep_data.data [j][0], rep_data.data [low][0]) == -1) low = j;
    swap (i, low);
  }
}
// sort by class number
function by_number () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (rep_data.data [j][1] < rep_data.data [low][1]) low = j;
    swap (i, low);
  }
}
// sort by class number descending
function desc_by_number () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (rep_data.data [j][1] > rep_data.data [low][1]) low = j;
    swap (i, low);
  }
}
// sort the rep data by subject (alphabetical)
function by_campus () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++) {
      if (alpha (rep_data.data [j][2], rep_data.data [low][2]) == 1) low = j;
    }
    swap (i, low);
  }
}
// sort rep data by subject (alphabetical) descending
function desc_by_campus () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (alpha (rep_data.data [j][2], rep_data.data [low][2]) == -1) low = j;
    swap (i, low);
  }
}
// sort the rep data by subject (alphabetical)
function by_prof () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++) {
      if (alpha (rep_data.data [j][3], rep_data.data [low][3]) == 1) low = j;
    }
    swap (i, low);
  }
}
// sort rep data by subject (alphabetical) descending
function desc_by_prof () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (alpha (rep_data.data [j][3], rep_data.data [low][3]) == -1) low = j;
    swap (i, low);
  }
}
// sort the rep data by subject (alphabetical)
function by_credits () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++) {
      if (rep_data.data [j][4] < rep_data.data [low][4]) low = j;
    }
    swap (i, low);
  }
}
// sort rep data by subject (alphabetical) descending
function desc_by_credits () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (rep_data.data [j][4] > rep_data.data [low][4]) low = j;
    swap (i, low);
  }
}
// sort the rep data by subject (alphabetical)
function by_grade () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++) {
      if (alpha (rep_data.data [j][5], rep_data.data [low][5]) == 1) low = j;
    }
    swap (i, low);
  }
}
// sort rep data by subject (alphabetical) descending
function desc_by_grade () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (alpha (rep_data.data [j][5], rep_data.data [low][5]) == -1) low = j;
    swap (i, low);
  }
}
// sort the rep data by subject (alphabetical)
function by_semester () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++) {
      if (alpha (rep_data.data [j][6], rep_data.data [low][6]) == 1) low = j;
    }
    swap (i, low);
  }
}
// sort rep data by subject (alphabetical) descending
function desc_by_semester () {
  for (var i = 0; i < rep_data.data.length; i++) {
    var low = i;
    for (var j = i; j < rep_data.data.length; j++)
      if (alpha (rep_data.data [j][6], rep_data.data [low][6]) == -1) low = j;
    swap (i, low);
  }
}
// runs automatically
db_list ();
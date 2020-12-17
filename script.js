// Click button, make table
$("button.hhGoBrrr").on("click", function(event) {
  var contents = $("textarea.hh").val()
  $("div.handHistory").html(contents);
  
});

// Clear textarea
$("button.hhGoBye").on("click", function(event) {
  $("textarea.hh").val("")
  $("textarea.hh").focus()
});

// Save image of hand
$("button.hhSave").on("click", function(event) {
  var node = document.getElementById('hand');
      domtoimage.toPng(node)
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'hand.png';
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
});

// Convert chip values to big blinds
$("div.row").on("click", "button.hhConvertBlinds", function(event) {
  // find bb, convert numbers
  var bbstr = $("table#hhtimeline tr:eq(2) td:eq(3)").text()
  var bb = parseInt(bbstr);
  
  $("table#hhtimeline tr td:nth-child(4)").each(function(i) { 
    var contents = $(this).text()
    var num = parseInt(contents);
    if (isNaN(num) == false) {
      // console.log (num/bb)
      var computedbb = (num/bb).toFixed(2);
      $(this).text(computedbb + ' BB')
    }
  });
  
  $("table#hhtimeline tr td:nth-child(5)").each(function(i) { 
    var contents = $(this).text()
    var num = parseInt(contents);
    if (isNaN(num) == false) {
      // console.log (num/bb)
      var computedbb = (num/bb).toFixed(2);
      $(this).text(computedbb + ' BB')
    }
  });
  
  $("table#hhtimeline tr td:nth-child(6)").each(function(i) { 
    var contents = $(this).text()
    var num = parseInt(contents);
    if (isNaN(num) == false) {
      // console.log (num/bb)
      var computedbb = (num/bb).toFixed(2);
      $(this).text(computedbb + ' BB')
    }
  });
});

// Lazy implementation of anonymising names
var villains = 1;

$("#hand").on('click', 'table#hhtimeline tr td:first-child', function(e) {
  var string = $(this).text();
  var names = $("table#hhtimeline tr td:first-child:contains(" + string + ")")
  
  $.each(names, function(i, v) {
    $(v).text('Villain ' + villains)
  });
  villains++;
})
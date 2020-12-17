function sillyName() {
    var adjectives = ["Adorable","Agitated","Aggressive","Ancient","Annoying","Arrogant","Beautiful","Colossal","Confused","Crooked","Drab","Dull","Exquisite","Fragile","Gifted","Gigantic","Grumpy","Helpful","Lazy","Miniature","Petite","Scrawny","Tired"];
    var animals = ["Armadillo", "Shark", "Fish", "Narwhal", "Crab", "Axolotl", "Vulture", "Panda", "Blobfish", "Cheetah", "Octopus", "Squid"];

    var a = adjectives[Math.floor(Math.random() * adjectives.length)]
    var b = animals[Math.floor(Math.random() * animals.length)]

    return a + b

}
// Check hand history is present
function checkHistoryPresent() {
    if($("div.handHistory").children().length > 0) {
        return true
    } else {
        false
    }
}

// Enable settings
function enableSettings() {
    $("fieldset#hhSettings").attr("disabled", false);
    $("input#convertStacks").attr("disabled", false);
    $("button#hhSave").attr("disabled", false);
    $("button#hhSave").addClass("btn-primary").removeClass("btn-secondary");
}

//Disable settings
function disableSettings() {
    $("input#convertStacks").prop("checked", false);
    $("input#hidePlayers").prop("checked", false);
    $("fieldset#hhSettings").attr("disabled", true);
    $("button#hhSave").attr("disabled", true);
    $("button#hhSave").removeClass("btn-primary").addClass("btn-secondary");
}

// Convert stacks to big blinds
function convertStacks() {
    $("input#convertStacks").attr("disabled", true);
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
}

// Anonymise player names
function hideNames() {
    var players = [];

    $("table#hhtimeline tr").each(function(i) {
        var name = $(this).find("td:first-child").text();
        if (name.length > 1 && players.indexOf(name) < 0) {
            players.push(name)
        }
    });
    $(players).each(function(i, v) {
        var altName = sillyName()
        $("table#hhtimeline tr").each(function(index) {
            classArr = []
            if($(this).attr("class")) {
                var classesList = $(this).attr("class");
                classArr = classesList.split(/\s+/);
            }
            $(this).find("td:first-child:contains(" + v + ")").each(function(i) {
                if (classArr.indexOf("hero") > -1) {
                    $(this).text("Hero")
                } else {
                    $(this).text(altName)
                }
            })
        });
    })
}

// Click button, make table
$("button.hhGoBrrr").on("click", function(event) {
  var contents = $("textarea.hh").val()
  $("div.handHistory").html(contents);
  
  if (checkHistoryPresent()) {
    enableSettings();
  } else {
    disableSettings();
  }
});

// Clear textarea
$("button.hhGoBye").on("click", function(event) {
  $("textarea.hh").val("")
  $("div.handHistory").html("");
  $("textarea.hh").focus()

  if (checkHistoryPresent()) {
    enableSettings();
  } else {
    disableSettings();
  }
});

$("input#convertStacks").change(function(event) {
    if(this.checked) {
        convertStacks()
    }
});

$("input#hidePlayers").change(function(event) {
    if(this.checked) {
        hideNames();
    }
})

// Save image of hand
$("button#hhSave").on("click", function(event) {
  var node = document.getElementById('hhtimeline');
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
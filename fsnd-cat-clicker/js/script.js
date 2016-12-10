
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    return false;
};

$('#form-container').submit(loadData);

// create array
var names = ["George", "Theo", "Jess", "Bob", "Mel"];
var counts =[0, 0, 0, 0, 0];
var positions =["first", "second", "third", "fourth", "fifth"];

// Let's loop over the names in our array where i is the index
for (var i = 0; i < names.length; i++) {
// This is the number we're on...
    var name = names[i];
    var votes = counts[i];
    var position = positions[i];
// We're creating a DOM element for the number
    var catElem = $('#my-cats');
    //elem.textContent = name;

    catElem.append('<li id='+ name +'><h4>' + name + '</h4>' +
                '<img src="img/' + name + '.jfif">' + 
                '<p class="'+ position + '">Number of votes: ' + votes + '</p>'+
                '</li>');
    var elem = document.getElementById(name);
// Elements
    var $greeting = $('#greeting');

// ... and when we click, alert the value of `num`
    elem.addEventListener('click', (function(nameCopy) {
        return function() {
            // get the index and add 1 to the array
            var index = $( "li" ).index( this );
            counts[index] += 1;
            console.log(counts[index]);
            // assign the counts array item to the variable votes
            var votes = counts[index];
            var position = positions[index];
            // get paragraph DOM position
            var para = "p." + positions[index];

            // update DOM elements
            $greeting.text('So, you voted for ' + nameCopy + ' votes: ' +
            votes + '!');

            $( para ).replaceWith( '<p class="'+ position + '">Number of votes: ' + 
            votes + '</p>' );

        };
    })(name));

document.body.appendChild(elem);
};






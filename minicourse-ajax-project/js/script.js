
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetvalue = $("#street").val();
    var cityvalue = $("#city").val();
    var address = streetvalue + ', ' + cityvalue;

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address +'';

    $greeting.text('So, you want to live at ' + address + '?')

    $body.append('<img class="bgimg" src="'+ streetviewUrl + '">');

    // Built by LucyBot. www.lucybot.com
    var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    NYTurl += '?' + $.param({
    'api-key': "c44e00393241407887cbbb4ad72e1819",
    'q': cityvalue,
    'sort': "newest"
    });

    // YOUR CODE GOES HERE!
    $.getJSON(NYTurl, function(data) {
        
        $nytHeaderElem.text('New York Times Articles About ' + cityvalue);

        articles = data.response.docs;

        for (var i=0; i<articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main +
                '</a>'+
                '<p>' + article.snippet + '</p>'+
                '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not be Loaded');
    }); 
    // Wikipedia
    var Wikiurl = "https://en.asdfwikipedia.org/w/api.php";
    console.log(Wikiurl);
    Wikiurl += '?' + $.param({
    'action': 'opensearch',
    'search': cityvalue,
    'callback': 'wikiCallback'
    });
    console.log(Wikiurl);
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
    url: Wikiurl,
    dataType: "jsonp",
    //method: 'GET',
    success: function(response) {
        var articlesList = response[1];

        for (var i = 0; i < articlesList.length; i++){
            articleStr = articlesList[i];
            var urlstr = 'http://enwikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + urlstr + '">' +
                    articleStr + '</a></li>');
            };
        clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

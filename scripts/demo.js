/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */

$(function () {
    'use strict';

    var countriesArray = $.map(countries, function (value, key) { return { value: value, data: key }; });

    // Setup jQuery ajax mock:
    $.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(countriesArray, function (country) {
                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    
                    return re.test(country.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });

    var bannerghatta = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15547.266275906706!2d77.544626!3d13.047345!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d492a63a47f%3A0x8c8f9ffc46cc7d82!2sORCHIDS%20The%20International%20School-%20CBSE%20School%20in%20Jalahalli!5e0!3m2!1sen!2sus!4v1689925452507!5m2!1sen!2sus"  width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    
    var maps = [
        {code:"BN","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7780.093704318301!2d77.594096!3d12.840249!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b3125c2b001%3A0x49117923fa146aa7!2sORCHIDS%20The%20International%20School%20-%20Bannerghatta!5e0!3m2!1sen!2sin!4v1689927233707!5m2!1sen!2sin"  width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'}, 
        {code:"JL","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15547.266275906706!2d77.544626!3d13.047345!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d492a63a47f%3A0x8c8f9ffc46cc7d82!2sORCHIDS%20The%20International%20School-%20CBSE%20School%20in%20Jalahalli!5e0!3m2!1sen!2sus!4v1689925970104!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"BTMP","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d497813.56087691855!2d77.613301!3d12.896888!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156695156511%3A0x16fd7cd40f72502a!2sORCHIDS%20The%20International%20School%20-%20Pre%20Primary%20School%20in%20BTM%20Layout!5e0!3m2!1sen!2sin!4v1689933438113!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"BTMP","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d497813.56087691855!2d77.613301!3d12.896888!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156695156511%3A0x16fd7cd40f72502a!2sORCHIDS%20The%20International%20School%20-%20Pre%20Primary%20School%20in%20BTM%20Layout!5e0!3m2!1sen!2sin!4v1689933438113!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"BTMP2","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d497798.40695395117!2d77.605335!3d12.906003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae152144320deb%3A0xb1b50f82ccfd3924!2sORCHIDS%20The%20International%20School%20Schools%20in%20BTM%20Layout!5e0!3m2!1sen!2sus!4v1689933514750!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"CVR","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15552.15032872205!2d77.668081!3d12.969447!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13e267ea6f11%3A0xfa39c926c41569b3!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20C%20V%20Raman%20Nagar!5e0!3m2!1sen!2sus!4v1689933601744!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"HAR","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7778.24023436415!2d77.665344!3d12.899997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1321b18aa573%3A0xb3df444df169e6dd!2sORCHIDS%20The%20International%20School%20in%20Haralur!5e0!3m2!1sen!2sin!4v1689933657325!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"HOR","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d248764.99169143577!2d77.661223!3d13.038664!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11f599545135%3A0xf189ef9b29d1536e!2sORCHIDS%20The%20International%20School%20in%20Horamavu!5e0!3m2!1sen!2sin!4v1689935197074!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"BOR","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d482210.1262142515!2d72.834588!3d19.227209!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1312f518933%3A0xf82b36cabf24b545!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Borivali!5e0!3m2!1sen!2sus!4v1689935326815!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"DOM","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7535.404911463815!2d73.088661!3d19.208194!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795c69d13e9e3%3A0x462c87c9ff849f22!2sORCHIDS%20The%20International%20School%20in%20Dombivli!5e0!3m2!1sen!2sin!4v1689935728682!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
    ];

    // Initialize ajax autocomplete:
    
    $('#autocomplete-ajax').autocomplete({
        
        // serviceUrl: '/autosuggest/service/url',
        lookup: countriesArray,
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            // console.log("demo v",suggestion.data);
            return re.test(suggestion.value);
        },
        onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
            //console.log(maps.length);
            $('#map').html('<div><img src = "./images/map.gif"/></div>');
            for (let i = 0; i <maps.length; i++) 
            {
                console.log("sugg ",suggestion.data);

                if(suggestion.data == maps[i].code)
                {   
                    console.log("code ",maps[i].code); 
                    console.log("code ",maps[i].iframe);
                    $('#map').html(maps[i].iframe);
                }else{
                    // $('#map').html(bannerghatta);
                }
            }
            
            

        },
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);
        },
        onInvalidateSelection: function() {
            $('#selction-ajax').html('You selected: none');
        }
    });

    var nhlTeams = ['Anaheim Ducks', 'Atlanta Thrashers', 'Boston Bruins', 'Buffalo Sabres', 'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche', 'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton OIlers', 'Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Canadiens', 'Nashville Predators', 'New Jersey Devils', 'New Rork Islanders', 'New York Rangers', 'Ottawa Senators', 'Philadelphia Flyers', 'Phoenix Coyotes', 'Pittsburgh Penguins', 'Saint Louis Blues', 'San Jose Sharks', 'Tampa Bay Lightning', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Washington Capitals'];
    var nbaTeams = ['Atlanta Hawks', 'Boston Celtics', 'Charlotte Bobcats', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'LA Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Jersey Nets', 'New Orleans Hornets', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia Sixers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'];
    var nhl = $.map(nhlTeams, function (team) { return { value: team, data: { category: 'NHL' }}; });
    var nba = $.map(nbaTeams, function (team) { return { value: team, data: { category: 'NBA' } }; });
    var teams = nhl.concat(nba);

    // Initialize autocomplete with local lookup:
    $('#autocomplete').devbridgeAutocomplete({
        lookup: teams,
        minChars: 1,
        onSelect: function (suggestion) {
            $('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data.category);
        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Sorry, no matching results',
        groupBy: 'category'
    });
    
    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-custom-append').autocomplete({
        lookup: countriesArray,
        appendTo: '#suggestions-container'
    });

    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-dynamic').autocomplete({
        lookup: countriesArray
    });
});
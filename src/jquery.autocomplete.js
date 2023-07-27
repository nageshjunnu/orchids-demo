/**
*  Ajax Autocomplete for jQuery, version %version%
*  (c) 2017 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/

/*jslint  browser: true, white: true, single: true, this: true, multivar: true */
/*global define, window, document, jQuery, exports, require */

// Expose plugin as an AMD module if AMD loader is present:
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var
        utils = (function () {
            return {
                escapeRegExChars: function (value) {
                    return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
                },
                createNode: function (containerClass) {
                    var div = document.createElement('div');
                    div.className = containerClass;
                    div.style.position = 'absolute';
                    div.style.display = 'none';
                    return div;
                }
            };
        }()),

        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        },

        noop = $.noop;

    function Autocomplete(el, options) {
        var that = this;

        // Shared variables:
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.timeoutId = null;
        that.cachedResponse = {};
        that.onChangeTimeout = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend(true, {}, Autocomplete.defaults, options);
        that.classes = {
            selected: 'autocomplete-selected',
            suggestion: 'autocomplete-suggestion'
        };
        that.hint = null;
        that.hintValue = '';
        that.selection = null;

        // Initialize and set options:
        that.initialize();
        that.setOptions(options);
    }

    Autocomplete.utils = utils;

    $.Autocomplete = Autocomplete;

    Autocomplete.defaults = {
            ajaxSettings: {},
            autoSelectFirst: false,
            appendTo: 'body',
            serviceUrl: null,
            lookup: null,
            onSelect: null,
            onHint: null,
            width: 'auto',
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            params: {},
            formatResult: _formatResult,
            formatGroup: _formatGroup,
            delimiter: null,
            zIndex: 9999,
            type: 'GET',
            noCache: false,
            onSearchStart: noop,
            onSearchComplete: noop,
            onSearchError: noop,
            preserveInput: false,
            containerClass: 'autocomplete-suggestions',
            tabDisabled: false,
            dataType: 'text',
            currentRequest: null,
            triggerSelectOnValidInput: true,
            preventBadQueries: true,
            lookupFilter: _lookupFilter,
            paramName: 'query',
            transformResult: _transformResult,
            showNoSuggestionNotice: false,
            noSuggestionNotice: 'No results',
            orientation: 'bottom',
            forceFixPosition: false
    };

    function _lookupFilter(suggestion, originalQuery, queryLowerCase) {

        return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
    };

    function _transformResult(response) {
        return typeof response === 'string' ? $.parseJSON(response) : response;
    };

    function _formatResult(suggestion, currentValue) {
        // Do not replace anything if the current value is empty
        if (!currentValue) {
            return suggestion.value;
        }
          
        var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

            // console.log("key v ",utils);

        return  suggestion.value
            .replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/&lt;(\/?strong)&gt;/g, '<$1>');
    };

    function _formatGroup(suggestion, category) {

        return '<div class="autocomplete-group">' + category + '</div>';
    };

    function addresslatlong(address)
    {
         var typed_latlong = "";
        var addressv = address;
        var geocoder = new google.maps.Geocoder();  
                  geocoder.geocode({ 'address': addressv }, function (results, status) {  
                   
                    if (status == google.maps.GeocoderStatus.OK) {  
//                         res.innerHTML = "Latitude : " + results[0].geometry.location.lat() + "<br/>Longitude :" +  
// results[0].geometry.location.lng();  
                        //console.log("lattitudev", results[0].geometry.location.lat()+" <br/>long "+results[0].geometry.location.lng());
                    // /   console.log( distance(lat1, results[0].geometry.location.lat(), lon1, results[0].geometry.location.lng()))


                        //  var distance1 = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lon1), new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));     
                        //  console.log("distance ",distance1);


                        var from = new google.maps.LatLng(localStorage.getItem("clat"), localStorage.getItem("clong"));
                        var fromName = localStorage.getItem("caddress");
                        var dest = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        var destName =addressv;

                        var service = new google.maps.DistanceMatrixService();
                        service.getDistanceMatrix(
                            {
                                origins: [from, fromName],
                                destinations: [destName, dest],
                                travelMode: 'DRIVING',
                                
                            }, callback);
                            
                        function callback(response, status) {
                            if (status == 'OK') {
                                var origins = response.originAddresses;
                                var destinations = response.destinationAddresses;
                                var html1="";
                                
                                var arr =[];
                                for (var i = 0; i < origins.length; i++) {
                                    var results = response.rows[1].elements;
                                    // console.log(results);
                                    for (var j = 0; j < results.length; j++) {
                                        var element = results[j];
                                        var distance = element.distance.text;
                                        var duration = element.duration.text;
                                        var from = origins[i];
                                        var to = destinations[j];

                                     
                                    }
                                    //console.log(addressv+"---"+element.distance.text);
                                   
                                }
                                                 
                                                             
                            
                               
                                
                            }
                           
                        }

                         typed_latlong = {lat:results[0].geometry.location.lat(),long:results[0].geometry.location.lng()};
                            localStorage.setItem("clat",results[0].geometry.location.lat());
                            localStorage.setItem("clong",results[0].geometry.location.lng());
                            localStorage.setItem("caddress",results[0].formatted_address);
                       

                     //   console.log(typed_latlong);
                       
                       
                    } else {  
                        // res.innerHTML = "Wrong Details: " + status;  
                       

                       // console.log("wrong")
                        typed_latlong = {message:"wrong"};
                    }  

                }); 
                   return typed_latlong;
    }

    Autocomplete.prototype = {

        initialize: function () {
            var that = this,
                suggestionSelector = '.' + that.classes.suggestion,
                selected = that.classes.selected,
                options = that.options,
                container;

            that.element.setAttribute('autocomplete', 'off');

            // html() deals with many types: htmlString or Element or Array or jQuery
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>')
                                          .html(this.options.noSuggestionNotice).get(0);

            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);

            container = $(that.suggestionsContainer);

            container.appendTo(options.appendTo || 'body');

            // Only set width if it was provided:
            if (options.width !== 'auto') {
                container.css('width', options.width);
            }

            // Listen for mouse over event on suggestions list:
            container.on('mouseover.autocomplete', suggestionSelector, function () {
                that.activate($(this).data('index'));
            });

            // Deselect active element when mouse leaves suggestions container:
            container.on('mouseout.autocomplete', function () {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });

            // Listen for click event on suggestions list:
            container.on('click.autocomplete', suggestionSelector, function () {
                that.select($(this).data('index'));
            });

            container.on('click.autocomplete', function () {
                clearTimeout(that.blurTimeoutId);
            })

            that.fixPositionCapture = function () {
                if (that.visible) {
                    that.fixPosition();
                }
            };

            $(window).on('resize.autocomplete', that.fixPositionCapture);

            that.el.on('keydown.autocomplete', function (e) { that.onKeyPress(e); });
            that.el.on('keyup.autocomplete', function (e) { that.onKeyUp(e); });
            that.el.on('blur.autocomplete', function () { that.onBlur(); });
            that.el.on('focus.autocomplete', function () { that.onFocus(); });
            that.el.on('change.autocomplete', function (e) { that.onKeyUp(e); });
            that.el.on('input.autocomplete', function (e) { that.onKeyUp(e); });
        },

        onFocus: function () {
            var that = this;

            if (that.disabled) {
                return;
            }

            that.fixPosition();

            if (that.el.val().length >= that.options.minChars) {
                that.onValueChange();
            }
        },

        onBlur: function () {
            var that = this,
                options = that.options,
                value = that.el.val(),
                query = that.getQuery(value);

            // If user clicked on a suggestion, hide() will
            // be canceled, otherwise close suggestions
            that.blurTimeoutId = setTimeout(function () {
                that.hide();

                if (that.selection && that.currentValue !== query) {
                    (options.onInvalidateSelection || $.noop).call(that.element);
                }
            }, 200);
        },

        abortAjax: function () {
            var that = this;
            if (that.currentRequest) {
                that.currentRequest.abort();
                that.currentRequest = null;
            }
        },

        setOptions: function (suppliedOptions) {
            var that = this,
                options = $.extend({}, that.options, suppliedOptions);

            that.isLocal = Array.isArray(options.lookup);

            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }

            options.orientation = that.validateOrientation(options.orientation, 'bottom');

            // Adjust height, width and z-index:
            $(that.suggestionsContainer).css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
            });

            this.options = options;
        },


        clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        },

        clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        },

        disable: function () {
            var that = this;
            that.disabled = true;
            clearTimeout(that.onChangeTimeout);
            that.abortAjax();
        },

        enable: function () {
            this.disabled = false;
        },

        fixPosition: function () {
            // Use only when container has already its content

            var that = this,
                $container = $(that.suggestionsContainer),
                containerParent = $container.parent().get(0);
            // Fix position automatically when appended to body.
            // In other cases force parameter must be given.
            if (containerParent !== document.body && !that.options.forceFixPosition) {
                return;
            }

            // Choose orientation
            var orientation = that.options.orientation,
                containerHeight = $container.outerHeight(),
                height = that.el.outerHeight(),
                offset = that.el.offset(),
                styles = { 'top': offset.top, 'left': offset.left };

            if (orientation === 'auto') {
                var viewPortHeight = $(window).height(),
                    scrollTop = $(window).scrollTop(),
                    topOverflow = -scrollTop + offset.top - containerHeight,
                    bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);

                orientation = (Math.max(topOverflow, bottomOverflow) === topOverflow) ? 'top' : 'bottom';
            }

            if (orientation === 'top') {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }

            // If container is not positioned to body,
            // correct its position using offset parent offset
            if(containerParent !== document.body) {
                var opacity = $container.css('opacity'),
                    parentOffsetDiff;

                    if (!that.visible){
                        $container.css('opacity', 0).show();
                    }

                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.top += containerParent.scrollTop;
                styles.left -= parentOffsetDiff.left;

                if (!that.visible){
                    $container.css('opacity', opacity).hide();
                }
            }

            if (that.options.width === 'auto') {
                styles.width = that.el.outerWidth() + 'px';
            }

            $container.css(styles);
        },

        isCursorAtEnd: function () {
            var that = this,
                valLength = that.el.val().length,
                selectionStart = that.element.selectionStart,
                range;

            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        },

        onKeyPress: function (e) {
            var that = this;

            // If suggestions are hidden and user presses arrow down, display suggestions:
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }

            if (that.disabled || !that.visible) {
                return;
            }

            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }

            // Cancel event if function did not return:
            e.stopImmediatePropagation();
            e.preventDefault();
        },

        onKeyUp: function (e) {
            var that = this;

            if (that.disabled) {
                return;
            }

            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }

            clearTimeout(that.onChangeTimeout);

            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    // Defer lookup in case when value changes very quickly:
                    that.onChangeTimeout = setTimeout(function () {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        },

        onValueChange: function () {
            if (this.ignoreValueChange) {
                this.ignoreValueChange = false;
                return;
            }

            var that = this,
                options = that.options,
                value = that.el.val(),
                query = that.getQuery(value);

            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }

            clearTimeout(that.onChangeTimeout);
            that.currentValue = value;
            that.selectedIndex = -1;

            // Check existing suggestion for the match before proceeding:
            if (options.triggerSelectOnValidInput && that.isExactMatch(query)) {
                that.select(0);
                return;
            }

            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        },

        isExactMatch: function (query) {
            var suggestions = this.suggestions;

            return (suggestions.length === 1 && suggestions[0].value.toLowerCase() === query.toLowerCase());
        },

        getQuery: function (value) {
            var delimiter = this.options.delimiter,
                parts;

            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        },

        getSuggestionsLocal: function (query) {
            var that = this,
                options = that.options,
                queryLowerCase = query.toLowerCase(),
                filter = options.lookupFilter,
                limit = parseInt(options.lookupLimit, 10),
                data,
                data1;

            data1 = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    // console.log(suggestion.value);
                    //return filter(suggestion, query, queryLowerCase);
                    
                    return suggestion;
                })
            };

            data = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    // console.log(suggestion.value);
                    return filter(suggestion, query, queryLowerCase);
                    
                    // return suggestion;
                })
            };

            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }
            // console.log(data.suggestions[0].value);
            // var res=  addresslatlong(data.suggestions[0].value);
            // console.log("res ",res)
            return data1;
        },

        getSuggestions: function (q) {
            var response,
                that = this,
                options = that.options,
                serviceUrl = options.serviceUrl,
                params,
                cacheKey,
                ajaxSettings;

            options.params[options.paramName] = q;

            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }

            params = options.ignoreParams ? null : options.params;

            if ($.isFunction(options.lookup)){
                options.lookup(q, function (data) {
                    that.suggestions = data.suggestions;
                    that.suggest();
                    options.onSearchComplete.call(that.element, q, data.suggestions);
                });
                return;
            }

            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }

            if (response && Array.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                that.abortAjax();

                ajaxSettings = {
                    url: serviceUrl,
                    data: params,
                    type: options.type,
                    dataType: options.dataType
                };

                $.extend(ajaxSettings, options.ajaxSettings);

                that.currentRequest = $.ajax(ajaxSettings).done(function (data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data, q);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        },

        isBadQuery: function (q) {
            if (!this.options.preventBadQueries){
                return false;
            }

            var badQueries = this.badQueries,
                i = badQueries.length;

            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }

            return false;
        },

        hide: function () {
            var that = this,
                container = $(that.suggestionsContainer);

            if ($.isFunction(that.options.onHide) && that.visible) {
                that.options.onHide.call(that.element, container);
            }

            that.visible = false;
            that.selectedIndex = -1;
            clearTimeout(that.onChangeTimeout);
            $(that.suggestionsContainer).hide();
            that.onHint(null);
        },

        suggest: function () {
            if (!this.suggestions.length) {
                if (this.options.showNoSuggestionNotice) {
                    this.noSuggestions();
                } else {
                    this.hide();
                }
                return;
            }

            var that = this,
                options = that.options,
                groupBy = options.groupBy,
                formatResult = options.formatResult,
                value = that.getQuery(that.currentValue),
                className = that.classes.suggestion,
                classSelected = that.classes.selected,
                container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer),
                beforeRender = options.beforeRender,
                html = '',
                category,
                formatGroup = function (suggestion, index) {
                        var currentCategory = suggestion.data[groupBy];

                        if (category === currentCategory){
                            return '';
                        }

                        category = currentCategory;

                        return options.formatGroup(suggestion, category);
                    };

            if (options.triggerSelectOnValidInput && that.isExactMatch(value)) {
                that.select(0);
                return;
            }


            //Function to covert address to Latitude and Longitude
            // var getLocation =  function(address) {
            //     var geocoder = new google.maps.Geocoder();
            //     geocoder.geocode( { 'address': address}, 
            //     function(results, status) {
            //         var res="";
            //         if (status == google.maps.GeocoderStatus.OK) {
            //             var latitude = results[0].geometry.location.lat();
            //             var longitude = results[0].geometry.location.lng();
            //             // console.log(latitude, longitude);
            //             res = {"lattitude":latitude,"longitude":longitude};
            //             // console.log("values ", val);
            //             return res;
            //             } 
            //             return res;
            //         }); 
            // }

            function initMap(address) {

                var geocoder = new google.maps.Geocoder();
                //var myLatLng = ""
                var myLatLng = [];
                geocoder.geocode( { 'address': address}, function(results, status) {
    
                    if (status == google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();
                    }
    
                    // console.log(latitude);
                    // console.log(longitude);
    
                     myLatLng = myLatLng.push({lat: latitude, lng: longitude});
                    

                   
    
                });
                return myLatLng;
    
    
            }
    
            function distance(lat1,lat2, lon1, lon2)
            {
           
                // The math module contains a function
                // named toRadians which converts from
                // degrees to radians.
                lon1 =  lon1 * Math.PI / 180;
                lon2 = lon2 * Math.PI / 180;
                lat1 = lat1 * Math.PI / 180;
                lat2 = lat2 * Math.PI / 180;
           
                // Haversine formula
                let dlon = lon2 - lon1;
                let dlat = lat2 - lat1;
                let a = Math.pow(Math.sin(dlat / 2), 2)
                         + Math.cos(lat1) * Math.cos(lat2)
                         * Math.pow(Math.sin(dlon / 2),2);
                       
                let c = 2 * Math.asin(Math.sqrt(a));
           
                // Radius of earth in kilometers. Use 3956
                // for miles
                let r = 6371;
           
                // calculate the result
                return(c * r);
            }

            let lat1 = localStorage.getItem("clat");
            let lat2 = 13.0208629;
            let lon1 = localStorage.getItem("clong");
            let lon2 = 77.5406423;

            // var from = new google.maps.LatLng(localStorage.getItem("clat"), localStorage.getItem("clong"));
            // var fromName = 'yeswanthpur';
            // var dest = new google.maps.LatLng(lat2, lon2);
            // var destName = 'Behind PF quarters, Near HMT Theatre,Sector-2, HMT Colony,Jalahalli Village, Jalahalli,Bengaluru, Karnataka,Bangalore-560013';

            // var service = new google.maps.DistanceMatrixService();
            // service.getDistanceMatrix(
            //     {
            //         origins: [from, fromName],
            //         destinations: [destName, dest],
            //         travelMode: 'DRIVING',
            //     }, callback);

            // function callback(response, status) {
            //     if (status == 'OK') {
            //         var origins = response.originAddresses;
            //         var destinations = response.destinationAddresses;

            //         for (var i = 0; i < origins.length; i++) {
            //             var results = response.rows[i].elements;
            //             console.log(results);
            //             for (var j = 0; j < results.length; j++) {
            //                 var element = results[j];
            //                 var distance = element.distance.text;
            //                 var duration = element.duration.text;
            //                 var from = origins[i];
            //                 var to = destinations[j];

            //                 console.log(element);
            //             }
            //         }
            //     }
            // }
 

            
            //Call the function with address as parameter

            // Build suggestions inner HTML:
           html+='<div style="margin-top:10px;background:#fff"><div class ="sortingdiv" id ="sortingdiv">';
            $.each(that.suggestions, function (i, suggestion) {
                if (groupBy){
                    html += formatGroup(suggestion, value, i);
                }
                if(value.length>=5){
                       // console.log("types v ",value+" -data- "+suggestion.data);
                       // console.log(suggestion.value)
                    addresslatlong(value)
                   }
                    
                 // console.log("Lat  ",initMap(suggestion.value));
                 // var data = initMap(suggestion.value);
                 var geocoder = new google.maps.Geocoder();  
                  geocoder.geocode({ 'address': suggestion.value }, function (results, status) {  
                    if (status == google.maps.GeocoderStatus.OK) {  
//                         res.innerHTML = "Latitude : " + results[0].geometry.location.lat() + "<br/>Longitude :" +  
// results[0].geometry.location.lng();  
                        //console.log("lattitudev", results[0].geometry.location.lat()+" <br/>long "+results[0].geometry.location.lng());
                    // /   console.log( distance(lat1, results[0].geometry.location.lat(), lon1, results[0].geometry.location.lng()))


                        //  var distance1 = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lon1), new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));     
                        //  console.log("distance ",distance1);

                        // console.log(localStorage.getItem("clat"));
                        var from = new google.maps.LatLng(localStorage.getItem("clat"), localStorage.getItem("clong"));
                        var fromName = localStorage.getItem("caddress");
                        var dest = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        var destName =suggestion.value;

                        //console.log("dest ",localStorage.getItem("caddress"));

                        var formattedlat = results[0].geometry.location.lat();
                        var formattedlng = results[0].geometry.location.lng();

                        var orgformatted_address = localStorage.getItem("caddress");
                        var destformatted_address = destName;

                        var originlat = localStorage.getItem("clat");
                        var originlng = localStorage.getItem("clong");

                        var service = new google.maps.DistanceMatrixService();
                        service.getDistanceMatrix(
                            {
                                origins: [from, fromName],
                                destinations: [destName, dest],
                                travelMode: 'DRIVING',
                                
                            }, callback);
                            
                        function callback(response, status) {
                            if (status == 'OK') {
                                var origins = response.originAddresses;
                                var destinations = response.destinationAddresses;
                                var html1="";
                                // console.log(response);
                                var arr =[];
                                for (var i = 0; i < origins.length; i++) {
                                    var results = response.rows[1].elements;
                                    // console.log(results);
                                    for (var j = 0; j < results.length; j++) {
                                        var element = results[j];
                                        var distance = element.distance.text;
                                        var duration = element.duration.text;
                                        var from = origins[i];
                                        var to = destinations[j];

                                     
                                    }
                                    // console.log(element.distance.text);
                                    arr.push({distance:element.distance.text, duration:element.duration.text});

                                }
                                                 
                                                             
                                // for (var i = 0; i < arr[0].length; i++) {
                                    var removecomma = arr[0].distance.replace(',', '')
                                    //console.log("di ",arr[0].distance+" - "+parseInt(removecomma));

                                    const sorting = arr.reduce(
                                        (acc, loc) =>
                                          acc.distance < loc.distance
                                            ? acc
                                            : loc
                                      )
                                    
                                      
                                    // console.log("array f ",sorting);
                                
                                    // if(parseInt(removecomma)<30)
                                    // {
                                       // console.log(arr[1].distance);
                                    
                                            //  console.log(element.distance.text);
                                        html += "<div class = 'sort '   id='"+parseInt(removecomma)+"' message_count='"+parseInt(removecomma)+"'><div class='row'><p style = 'color:#000 !important;'> <span>Distance : "+sorting.distance+"</span><span style='float:right;'> Duration:"+sorting.duration+"<span></p></div>";
                                        //console.log(html1);
                                        html += '<div class="row"  style="cursor:pointer;" id="insideid" data-id="'+parseInt(removecomma)+'"><div class="col-8" ><div  class="' + className + '" data-index="' + i + '" >' + formatResult(suggestion, value, i) + '</div></div><div class="col-2"><a  onclick="get_cookie_param(this)" data-id="'+destformatted_address+'"> <i class="fas fa-map-marker-alt markerstyle" style="background:red;"></i></a></div><div class="col-2"><a href ="https://www.google.com/maps/dir/?api=1&origin='+orgformatted_address+'&destination='+destformatted_address+'" target="_blank"><i class="fas fa-globe markerstyle" style="background:#0a58ca;"></i> <i class="fa-solid fa-globe markerstyle" style="background:#0a58ca;"></i></a>';
                                        $(".sort").fadeIn(3000);
                                        //    this.adjustContainerWidth();
                                          html+="</div><hr/></div></div>";
                                          $(this).animate({"left": "0","top":"0"});
                                        // console.log(html);
                                         container.html(html);

                                        noSuggestionsContainer.detach();
                                        

                                        if ($.isFunction(beforeRender)) {
                                            beforeRender.call(that.element, container, that.suggestions);
                                        }

                                        that.fixPosition();
                                        container.show();
                                        // console.log("select ",that);
                                        // Select first value by default:
                                        if (options.autoSelectFirst) {
                                            
                                            that.selectedIndex = 0;
                                            container.scrollTop(0);
                                            container.children('.' + className).first().addClass(classSelected);
                                        }

                                        that.visible = true;
                                        that.findBestHint();


                                    // }
                                   
                                   
                                // }
                               
                                
                            }
                            

                        }

                       
                       
                    } else {  
                        // res.innerHTML = "Wrong Details: " + status;  
                        console.log("wrong")
                    }  

                }); 
                
                
                
              
            });

            
           
        },

        noSuggestions: function() {
             var that = this,
                 beforeRender = that.options.beforeRender,
                 container = $(that.suggestionsContainer),
                 noSuggestionsContainer = $(that.noSuggestionsContainer);

            this.adjustContainerWidth();

            // Some explicit steps. Be careful here as it easy to get
            // noSuggestionsContainer removed from DOM if not detached properly.
            noSuggestionsContainer.detach();

            // clean suggestions if any
            container.empty();
            container.append(noSuggestionsContainer);

            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container, that.suggestions);
            }

            that.fixPosition();

            container.show();
            that.visible = true;
        },

        adjustContainerWidth: function() {
            var that = this,
                options = that.options,
                width,
                container = $(that.suggestionsContainer);

            // If width is auto, adjust width before displaying suggestions,
            // because if instance was created before input had width, it will be zero.
            // Also it adjusts if input width has changed.
            if (options.width === 'auto') {
                width = that.el.outerWidth();
                container.css('width', width > 0 ? width : 300);
            } else if(options.width === 'flex') {
                // Trust the source! Unset the width property so it will be the max length
                // the containing elements.
                container.css('width', '');
            }
        },

        findBestHint: function () {
            var that = this,
                value = that.el.val().toLowerCase(),
                bestMatch = null;

            if (!value) {
                return;
            }

            $.each(that.suggestions, function (i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });

            that.onHint(bestMatch);
        },

        onHint: function (suggestion) {
            var that = this,
                onHintCallback = that.options.onHint,
                hintValue = '';
            
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);

            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                if ($.isFunction(onHintCallback)) {
                    onHintCallback.call(that.element, hintValue);
                }

            }  


        },

        verifySuggestionsFormat: function (suggestions) {
            // If suggestions is string array, convert them to supported format:
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return { value: value, data: null };
                });
            }


            return suggestions;
        },

        validateOrientation: function(orientation, fallback) {
            orientation = $.trim(orientation || '').toLowerCase();

            if($.inArray(orientation, ['auto', 'bottom', 'top']) === -1){
                orientation = fallback;
            }

            return orientation;
        },

        processResponse: function (result, originalQuery, cacheKey) {
            var that = this,
                options = that.options;

            result.suggestions = that.verifySuggestionsFormat(result.suggestions);

            // Cache results if cache is not disabled:
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && !result.suggestions.length) {
                    that.badQueries.push(originalQuery);
                }
            }

            // Return if originalQuery is not matching current query:
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }

            that.suggestions = result.suggestions;
            that.suggest();
        },

        activate: function (index) {
            var that = this,
                activeItem,
                selected = that.classes.selected,
                container = $(that.suggestionsContainer),
                children = container.find('.' + that.classes.suggestion);

            container.find('.' + selected).removeClass(selected);

            that.selectedIndex = index;

            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }

            return null;
        },

        selectHint: function () {
            var that = this,
                i = $.inArray(that.hint, that.suggestions);

            that.select(i);
        },

        select: function (i) {
            var that = this;
            that.hide();
            // that.onSelect(i);

        },

        moveUp: function () {
            var that = this;

            if (that.selectedIndex === -1) {
                return;
            }

            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children('.' + that.classes.suggestion).first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.ignoreValueChange = false;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }

            that.adjustScroll(that.selectedIndex - 1);
        },

        moveDown: function () {
            var that = this;

            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }

            that.adjustScroll(that.selectedIndex + 1);
        },

        adjustScroll: function (index) {
            var that = this,
                activeItem = that.activate(index);

            if (!activeItem) {
                return;
            }

            var offsetTop,
                upperBound,
                lowerBound,
                heightDelta = $(activeItem).outerHeight();

            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;

            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }

            if (!that.options.preserveInput) {
                // During onBlur event, browser will trigger "change" event,
                // because value has changed, to avoid side effect ignore,
                // that event, so that correct suggestion can be selected
                // when clicking on suggestion with a mouse
                that.ignoreValueChange = true;
                that.el.val(that.getValue(that.suggestions[index].value));
            }

            that.onHint(null);
        },

        // onSelect: function (index) {
        //     var that = this,
        //         onSelectCallback = that.options.onSelect,
        //         suggestion = that.suggestions[index];
                
        //         var suggestion1 = "";
        //         try{
        //            that.currentValue = that.getValue(suggestion.value);
        //            suggestion1 = that.suggestions;
        //        }
        //        catch{
        //          for(var i=0;i<that.suggestions.length;i++){
                      
        //                  that.currentValue = that.getValue(that.suggestions[i].value);
        //                  suggestion1 = that.suggestions[i].value;

        //             }wow
        //        }
        //     that.currentValue = that.getValue(suggestion.value);

        //     if (that.currentValue !== that.el.val() && !that.options.preserveInput) {
        //         that.el.val(that.currentValue);
        //     }
            
        //     that.onHint(null);
        //     that.suggestions = [];
        //     that.selection = suggestion;
            
        //     if ($.isFunction(onSelectCallback)) {
        //         onSelectCallback.call(that.element, suggestion);
        //     }
        // },

        getValue: function (value) {
            var that = this,
                delimiter = that.options.delimiter,
                currentValue,
                parts;

            if (!delimiter) {
                return value;
            }

            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);

            if (parts.length === 1) {
                return value;
            }

            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        },

        dispose: function () {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };

    // Create chainable jQuery plugin:
    $.fn.devbridgeAutocomplete = function (options, args) {
        var dataKey = 'autocomplete';
        // If function invoked without argument return
        // instance of the first matched element:
        if (!arguments.length) {
            return this.first().data(dataKey);
        }

        return this.each(function () {
            var inputElement = $(this),
                instance = inputElement.data(dataKey);

            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                // If instance already exists, destroy it:
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };

    // Don't overwrite if it already exists
    if (!$.fn.autocomplete) {
        $.fn.autocomplete = $.fn.devbridgeAutocomplete;
    }
}));



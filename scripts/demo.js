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
        {code:"KOP","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7540.449808111896!2d73.00172!3d19.097787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c19b4bee5909%3A0xf590e744ffa741d0!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Koparkhairane%20Sector%2014!5e0!3m2!1sen!2sin!4v1689936264504!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"KOP2","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15079.763368742122!2d73.005555!3d19.110251!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c0c56f21eb35%3A0x743ad9ace91cc6ce!2sTerna%20ORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Koparkhairane!5e0!3m2!1sen!2sus!4v1689936387557!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"BACH","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d973814.6312174179!2d78.400051!3d17.556929!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f3de3c99907%3A0x970a49a906658424!2sORCHIDS%20The%20International%20School%20in%20Bachupally!5e0!3m2!1sen!2sin!4v1689936899294!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"NBC","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6979.853130992802!2d77.029085!3d28.989546999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db0142011533d%3A0xc5d4f4ef548dd93b!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20NBC%20Sonipat!5e0!3m2!1sen!2sin!4v1689936005038!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"GHRD","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6981.712896260685!2d76.612871!3d28.961982!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85e46bbb4c9b%3A0xb138364ce328314d!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Rohtak!5e0!3m2!1sen!2sin!4v1689936169661!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"KORD","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7439.123130293863!2d79.075546!3d21.209569!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c16546669319%3A0xc73fbabb92f98a65!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Koradi%20Road%20Nagpur!5e0!3m2!1sen!2sin!4v1689936258210!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"JKA","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29502.290565068615!2d88.277119!3d22.437067!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027be65ee75785%3A0xfb62723ddfb028c7!2sORCHIDS%20The%20International%20School%20-%20ICSE%20School%20in%20Joka!5e0!3m2!1sen!2sin!4v1689936302196!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"MHG","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d471167.24671024!2d88.479079!3d22.691263000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f8b4b09b2a5%3A0x13f3f96948dcd010!2sORCHIDS%20The%20International%20School%20-%20ICSE%20School%20In%20Madhyamgram!5e0!3m2!1sen!2sin!4v1689936407143!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"NTW","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29474.709424882305!2d88.482235!3d22.566433!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020be08b34c971%3A0xa178ecfb84a27f99!2sORCHIDS%20The%20International%20School%20in%20New%20Town%20(Acharya%20Tulsi%20Academy)!5e0!3m2!1sen!2sus!4v1689936483339!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"NEV","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7121.112543973558!2d75.675545!3d26.822254!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4a8466c03e87%3A0xd1a96d0121ab4f7!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Nevta!5e0!3m2!1sen!2sin!4v1689936570541!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"BHRD", "iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1905.8109309962776!2d79.862373!3d23.158233000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b19705faac89%3A0xc67c446760dee369!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Jabalpur!5e1!3m2!1sen!2sin!4v1689936682355!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code: "ARSQ","iframe": '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29425.396450477136!2d75.84349600000002!3d22.795995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963034b9a35a3ff%3A0x2850eec8f0da4865!2sORCHIDS%20The%20International%20School%20in%20Aurobindo!5e0!3m2!1sen!2sin!4v1689936740990!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"MNG","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7354.556166930191!2d75.9363!3d22.829199!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631c8dd04cc3d9%3A0xb4b75b20fa43c658!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Manglia!5e0!3m2!1sen!2sin!4v1689936843562!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"DWEX","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28041.730295081645!2d77.019563!3d28.533218!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ba1feeff5b5%3A0xd7e2ec0a9e282d56!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Bajghera!5e0!3m2!1sen!2sin!4v1689937000487!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"SOY","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28062.24890685484!2d77.063696!3d28.456014!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1999a830e3a1%3A0x80df3fc649e31f74!2sORCHIDS%20The%20International%20School%20in%20South%20City%20Gurgaon!5e0!3m2!1sen!2sin!4v1689937138054!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"DW19","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1751.7281160039931!2d77.012865!3d28.586087000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1a909c79dbcb%3A0xa60765bb2f5720d8!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Dwarka%20Sector%2019!5e0!3m2!1sen!2sin!4v1689937213884!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"HNRD","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7337.722299653417!2d77.487098!3d23.13875!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c46942c81a1cb%3A0x64ef1de249f697b4!2sGyan%20Ganga%20ORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Bhopal!5e0!3m2!1sen!2sin!4v1689937280914!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"TCH","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7506.435518833798!2d75.443185!3d19.830737!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba59921258ae3%3A0x6b3b74b02d6dabae!2sTCH%20ORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Aurangabad!5e0!3m2!1sen!2sin!4v1689937364151!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"PLKI","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31110.02829861945!2d80.198919!3d12.923556!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525da646604b7d%3A0x5c1cef9fa91bc860!2sORCHIDS%20The%20International%20School%20In%20Pallikaranai!5e0!3m2!1sen!2sin!4v1689941601681!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"THPK","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31109.846134622076!2d80.228204!3d12.925018!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d028b86c8c9%3A0xc76307cfef90c7d8!2sOrchids%20The%20International%20School!5e0!3m2!1sen!2sin!4v1689941681626!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"JBHL","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15225.489950901632!2d78.398379!3d17.441877!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91367ef83ffd%3A0x174c12ae9e8eefb!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Jubilee%20Hills!5e0!3m2!1sen!2sus!4v1689941759956!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"BCPY","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d973814.6312174179!2d78.400051!3d17.556929!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f3de3c99907%3A0x970a49a906658424!2sORCHIDS%20The%20International%20School%20in%20Bachupally!5e0!3m2!1sen!2sin!4v1689941825311!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"HNWD","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15130.626222584853!2d73.672102!3d18.544416!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bcbc6e83c2d9%3A0x1511940c35637aa8!2sORCHIDS%20The%20International%20School%20-%20CBSE%20School%20in%20Hinjewadi!5e0!3m2!1sen!2sin!4v1689941891887!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"CIWD","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7561.539690751917!2d73.794138!3d18.629419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9a2a28ba275%3A0x7dcbb76b89aabf22!2sORCHIDS%20The%20International%20School%20in%20Chinchwad!5e0!3m2!1sen!2sin!4v1689941955474!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
        {code:"RAJ","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7775.246717141499!2d77.55556300000005!3d12.995925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d903b0e82e1%3A0x94c6bda5df8bca64!2sORCHIDS%20The%20International%20School%20in%20Rajajinagar!5e0!3m2!1sen!2sin!4v1690276889799!5m2!1sen!2sin" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
         {code:"MAHA","iframe":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7774.745772477344!2d77.547216!3d13.01191!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3db42af55ffd%3A0xab410e2297297034!2sORCHIDS%20The%20International%20School%20in%20Mahalakshmi%20Layout!5e0!3m2!1sen!2sus!4v1690279964938!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
    ];

    // Initialize ajax autocomplete:
   
    
    $('#autocomplete-ajax').autocomplete({
        
        // serviceUrl: '/autosuggest/service/url',
        lookup: countriesArray,
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            // console.log("demo v",suggestion);
            return re.test(suggestion.value);
            
        },
        onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
            // console.log("selected ",suggestion);
            $('#map').html('<div><img src = "./images/map.gif"/></div>');
            for (let i = 0; i <maps.length; i++) 
            {
                // console.log("sugg ",suggestion.data);

                if(suggestion.data == maps[i].code)
                {   
                   console.log("code ",maps[i].code); 
                   // console.log("code ",maps[i].iframe);
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

   

    // var nhlTeams = ['Anaheim Ducks', 'Atlanta Thrashers', 'Boston Bruins', 'Buffalo Sabres', 'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche', 'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton OIlers', 'Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Canadiens', 'Nashville Predators', 'New Jersey Devils', 'New Rork Islanders', 'New York Rangers', 'Ottawa Senators', 'Philadelphia Flyers', 'Phoenix Coyotes', 'Pittsburgh Penguins', 'Saint Louis Blues', 'San Jose Sharks', 'Tampa Bay Lightning', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Washington Capitals'];
    // var nbaTeams = ['Atlanta Hawks', 'Boston Celtics', 'Charlotte Bobcats', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'LA Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Jersey Nets', 'New Orleans Hornets', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia Sixers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'];
    // var nhl = $.map(nhlTeams, function (team) { return { value: team, data: { category: 'NHL' }}; });
    // var nba = $.map(nbaTeams, function (team) { return { value: team, data: { category: 'NBA' } }; });
    // var teams = nhl.concat(nba);

    // Initialize autocomplete with local lookup:
    // $('#autocomplete').devbridgeAutocomplete({
    //     lookup: teams,
    //     minChars: 1,
    //     onSelect: function (suggestion) {
    //         $('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data.category);
    //     },
    //     showNoSuggestionNotice: true,
    //     noSuggestionNotice: 'Sorry, no matching results',
    //     groupBy: 'category'
    // });
    
    // // Initialize autocomplete with custom appendTo:
    // $('#autocomplete-custom-append').autocomplete({
    //     lookup: countriesArray,
    //     appendTo: '#suggestions-container'
    // });

    // // Initialize autocomplete with custom appendTo:
    // $('#autocomplete-dynamic').autocomplete({
    //     lookup: countriesArray
    // });
});

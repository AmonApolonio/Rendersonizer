
(function ($) {

    var self = {
        rendersonImg: [
            'https://i.imgur.com/4NhhBhi.jpg',
            'https://i.imgur.com/3AlqGoV.jpg',
            'https://i.imgur.com/d91NDuO.jpg',
            'https://i.imgur.com/SVzfVUK.jpg',
            'https://i.imgur.com/gjHr47i.jpg',
            'https://i.imgur.com/KuHbpbd.jpg',
            'https://i.imgur.com/yWsexwJ.jpg',
            'https://i.imgur.com/Qj5qv6B.jpg',
            'https://i.imgur.com/flsntEs.jpg',
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.rendersonImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);

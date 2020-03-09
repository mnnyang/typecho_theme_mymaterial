/**js太菜,只会面向过程写...*/
var colorBuilder = {
    hslToRgb: function (H, S, L) {
        var R, G, B;
        if (+S === 0) {
            R = G = B = L; // 饱和度为0 为灰色
        } else {
            var hue2Rgb = function (p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
            var P = 2 * L - Q;
            R = hue2Rgb(P, Q, H + 1 / 3);
            G = hue2Rgb(P, Q, H);
            B = hue2Rgb(P, Q, H - 1 / 3);
        }
        return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
    },

    // 获取随机HSL
    randomHsl: function () {
        var H = Math.random();
        var S = Math.random();
        var L = Math.random();
        return [H, S, L];
    },

    // 获取HSL数组
    getHslArray: function (hslLength) {
        var HSL = [];
        // var hslLength = 16; // 获取数量
        for (var i = 0; i < hslLength; i++) {
            var ret = this.randomHsl();

            // 颜色相邻颜色差异须大于 0.25
            if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
                i--;
                continue; // 重新获取随机色
            }
            ret[1] = 0.7 + (ret[1] * 0.2); // [0.7 - 0.9] 排除过灰颜色
            ret[2] = 0.4 + (ret[2] * 0.4); // [0.4 - 0.8] 排除过亮过暗色

            // 数据转化到小数点后两位
            ret = ret.map(function (item) {
                return parseFloat(item.toFixed(2));
            });

            HSL.push(ret);
        }
        return HSL;
    }
};

(function ($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;

            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments);
            }

            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };

    function g() {
        i = h[k](function () {
                a.each(function () {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);

function isMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true;
    }
    return false;
}

function trim(str) {
    if (str == null) {
        str = "";
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

var shareWeibo = function (title, url, pics) {
    var share_str = 'http://v.t.sina.com.cn/share/share.php?' +
        'title=' + title
        + '&url=' + url
        + '&content=utf-8' +
        '&sourceUrl=' + url
        + '&pic=' + (pics || '');

    window.open(share_str, 'newwindow', 'height=400,width=400,top=100,left=100');
};

var buildTimeout, startTimeV;

function startTime(time) {
    startTimeV = time;
    var $time = new Date().getTime() - new Date(startTimeV);
    if ($time < 0) return '0秒';

    var result = '';
    if ($time >= 365 * 86400000) {
        result += parseInt($time / (365 * 86400000)) + '年';
        $time = ($time % (365 * 86400000));
    }
    if ($time >= 86400000) {
        result += parseInt($time / 86400000) + '天';
        $time = ($time % 86400000);
    }
    if ($time >= 3600000) {
        result += parseInt($time / 3600000) + '小时';
        $time = ($time % 3600000);
    }
    if ($time >= 60000) {
        result += parseInt($time / 60000) + '分';
        $time = ($time % 60000);
    }
    result += parseInt($time / 1000) + '秒';
    $('#build-time').html(result);
    buildTimeout = setTimeout('startTime(startTimeV)', 1000)
}

function resizeMenuTreeHeight() {
    var treeHeight = $(window).height() - 16;

    $('.article-title-list-w').css('height', treeHeight + 'px');
    $('.article-title-list').css('max-height', treeHeight - 168 + 'px');
}

$(function () {
    var $main_header = $('header');
    var $main_last_top = 0;
    var $mdl_content = $(".mdl-layout__content"), $drawer = $('#drawer');
    var drawVisibleClass = 'is-visible';
    var drawerMenu = $('.menu-list');
    var menuSwitch = $('.menu-switch');
    var screenMask = $('#screen-mask');

    $.showSnackbar = function (msg) {
        var snackbarContainer = document.querySelector('#demo-snackbar-example');
        var data = {
            message: msg,
            timeout: 2000,
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    };

    $.gotoAnchorSmooth = function ($target, offset, time) {
        offset = offset || 0;
        time = time || 300;
        if ($target instanceof $ && $target.length) {
            $mdl_content.animate({scrollTop: $target.offset().top + $mdl_content.scrollTop() + offset}, time);
        }
    };


    function scrollTopValue() {
        return $mdl_content.scrollTop();
    }

    function hideMask() {
        $('.right-drawer').addClass('close');
        $('#drawer').removeClass(drawVisibleClass);
        screenMask.fadeOut(200);
    }

    function showMask() {
        screenMask.fadeIn(200);
    }

    (function () {
        screenMask.on('click', function () {
            hideMask();
        })
    })();

    $.closeDrawer = function () {
        hideMask();
    };

    function openDrawer() {
        $drawer.addClass(drawVisibleClass);
        showMask()
    }

    (function () {
        $('#list-drawer-btn').on('click', function () {
            $('.right-drawer').toggleClass('close');

            if ($('.right-drawer').hasClass('close')
                && !$('#drawer').hasClass(drawVisibleClass)) {
                hideMask();
            } else {
                $('#drawer').removeClass(drawVisibleClass);
                showMask();
            }
        });
        $('.right-drawer .c').on('click', function (e) {
            $('.right-drawer').addClass('close');
            hideMask();
            var $t = $(this);

            if ($t.hasClass('liji')) {
                $t.removeClass('liji');
                return;
            }

            $t.addClass('liji');
            e.preventDefault();
            setTimeout(function () {
                $t.trigger('click')
            }, 200)
        })
    })();

    /*auto*/
    // (function () {
    // $('.my-drawer-button, #drawer').mouseover(function () {
    //     openDrawer();
    // })
    // $('#drawer').mouseleave(function () {
    // $.closeDrawer();
    // })
    // })();

    function headerStatus() {
        $mdl_content.scroll(function () {
            var nScrollTop = $(this)[0].scrollTop;

            if (nScrollTop > 120 && nScrollTop > $main_last_top) {
                $main_header.addClass('main-header-close');

            } else if (nScrollTop < $main_last_top
                && $main_header.hasClass('main-header-close')) {
                $main_header.removeClass('main-header-close')
            } else if (nScrollTop <= 120) {
                $main_header.removeClass('main-header-close');
            }
            $main_last_top = nScrollTop;
        });

        $('.my-drawer-button').on('click', function () {
            if ($drawer.hasClass(drawVisibleClass)) {
                $.closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    var menu_index_tags;

    function updateMenuIndexTags() {
        // tags of article title
        menu_index_tags = $('.menu-target-fix');
        var topOffset = scrollTopValue();
        for (var i = 0; i < menu_index_tags.length; i++) {
            menu_index_tags[i].topHeight = $(menu_index_tags[i]).offset().top + topOffset;
            menu_index_tags[i].id = $(menu_index_tags[i]).attr('id');
        }
    }

    function search(start, end, findValue) {
        if (menu_index_tags.length === 0) return null;
        if (end - start <= 1) {
            if (menu_index_tags[end].topHeight < findValue) {
                return menu_index_tags[end];
            }
            return menu_index_tags[start];
        }

        if (start < end) {
            var middleIndex = parseInt((start + end) / 2);
            var middleValue = menu_index_tags[middleIndex].topHeight;
            if (findValue < middleValue) {
                end = middleIndex;
            } else if (findValue > middleValue) {
                start = middleIndex
            } else {
                return menu_index_tags[middleIndex];
            }
            return search(start, end, findValue)
        }
    }

    function titleTreeType() {
        if ($('#article-index-w').length) {
            if ($(document).width() < 480) {
                $('#index-button').show();
                $('#article-index-w')
                    .removeClass('article-title-list-w mdl-cell--3-col mdl-cell--hide-phone mdl-cell--2-col-tabvar')
                    .addClass('index-card mdl-card mdl-shadow--2dp mdl-cell--hide-desktop mdl-cell--hide-tablet');

                $('.index-card').on('click', function (e) {
                    e.stopPropagation();
                });
                $(document).on('click', function () {
                    $('.index-card').slideUp(200);
                })
            } else {
                $('#index-button').hide();
                $('#article-index-w')
                    .removeClass('index-card mdl-card mdl-shadow--2dp mdl-cell--hide-desktop mdl-cell--hide-tablet')
                    .addClass('article-title-list-w mdl-cell--3-col mdl-cell--hide-phone mdl-cell--2-col-tablet');
            }
        } else {
            $('#index-button').hide();
        }
    }

    function articleTitleTree() {

        titleTreeType();

        var articleTitleList = $('.article-title-list');
        if (articleTitleList.length === 0) return;
        resizeMenuTreeHeight();

        $.titleScrollEnabled = true;
        var innerList = $('.index-menu-list .index-menu-list');
        updateMenuIndexTags();

        function currentItem() {
            return articleTitleList.find('.current')
        }

        function rmCurrent() {
            var current = currentItem();
            if (current.length) {
                current.removeClass('current');
            }
        }

        $mdl_content.scroll(function () {
            if (!$.titleScrollEnabled) return;
            var res = search(0, menu_index_tags.length - 1, scrollTopValue());
            if (!res) return;
            rmCurrent();

            var current = articleTitleList.find('a[href="#' + res.id + '"]');
            //current is a elements
            if (!current.hasClass('current')) {
                current.addClass('current');
                innerList.removeClass('open');
                current.parents('.index-menu-list').addClass('open').slideDown();
                current.next('.index-menu-list').addClass('open').slideDown();
                innerList.not('.open').slideUp();
            }

            titleToShow(current.parent())
        });

        var enabledTimeOut = null;
        $('.index-menu-link').on('click', function (e) {
            e.preventDefault();
            var t = $(this);
            $.titleScrollEnabled = false;
            clearTimeout(enabledTimeOut);

            rmCurrent();
            t.addClass('current');

            innerList.removeClass('open');
            t.parents('.index-menu-list').addClass('open');
            t.parent('.index-menu-item').children('.index-menu-list')
                .addClass('open').stop(false, true).slideDown();
            innerList.not('.open').stop(false, true).slideUp();

            var id = t.attr('href');
            $.gotoAnchorSmooth($(id));
            enabledTimeOut = setTimeout(function () {
                $.titleScrollEnabled = true;
            }, 1000);
        });

        var firstItem = $(".index-menu  .index-menu-item")[0], indexMenu = $('.index-menu');

        function titleToShow($obj) {
            if (articleTitleList.height() >= indexMenu.height()) return;

            var currentTop = currentItem().parent()[0].getBoundingClientRect().top;
            var firstTop = firstItem.getBoundingClientRect().top;

            articleTitleList.stop().animate({scrollTop: currentTop - firstTop - $obj.height()}, 300);
        }
    }

    /**drawer menu control*/
    function drawer() {
        if (drawerMenu.length) {
            menuSwitch.on('click', function () {
                var $t = $(this).is('a') ? $(this) : $(this).parent('a');
                var pLi = $t.parent('li');
                var subList = $t.next('.menu-sub-list');

                menuSwitch.on('click', function (e) {
                    return false;
                });

                if (pLi.hasClass('open')) {
                    pLi.removeClass('open');
                    subList.stop(false, true).slideUp(200);
                } else {
                    drawerMenu.find('.open').not($t.parents('.open')[0]).removeClass('open')
                        .find(' .menu-sub-list').stop(false, true).slideUp(200);

                    pLi.addClass('open');
                    subList.stop(false, true).slideDown(200);
                }
            })
        }
        //close drawer
        $('.close-drawer').on('click', function () {
            $.closeDrawer();
        })
    }

    /**material color class*/
    $.pageNav = function () {
        $('.page-navigator .current a').addClass('mdl-color--primary');
        $('.page-navigator li:not(.current) a').addClass('mdl-color-text--primary');
    };

    /**to_top*/
    function toTop() {
        var toTop = $("#to_top"), footer = $('footer'), fixedBottom = 68;

        if (toTop.length) {
            toTop.click(function () {
                $mdl_content.animate({scrollTop: 0}, 200);
            });
            $mdl_content.scroll(function () {
                var footerBottom = footer.offset().top - $(window).height();

                if (-footerBottom > fixedBottom) {
                    toTop.removeClass('fixed')
                } else {
                    toTop.addClass('fixed')
                }
                init();
            });

            function init() {
                var scroll_top = $mdl_content.scrollTop();
                if (scroll_top > 300) {
                    toTop.removeClass('hide');
                } else {
                    toTop.addClass('hide')
                }
            }

            init();
        }
    }

    /**post-near 没找到 post-near 的直接打印链接地址的api，所以...*/
    $.postNear = function () {
        var $postNear = $('.post-near');
        if ($postNear.length) {
            var pls = $postNear.children('li');
            pls.each(function () {
                var t = $(this);
                var a = t.children('a');
                if (a.length) {
                    t.addClass('enabled');
                }
            })
        }
    };

    $.articleImage = function () {
        $('.post-card img').not('.image-no-show, .image-no-show img, a[data-fancybox="gallery"] img').each(function () {
            var $t = $(this);
            $t.wrap("<a data-fancybox='gallery' href='" + $t.attr('src') + "' data-caption='" + $t.attr('title') + "'></a>");
            $t.attr('title', '').attr('alt', '')
        });

        $('[data-fancybox="gallery"]').fancybox({
            loop: true,
            buttons: [
                "zoom",
                // "share",
                "slideShow",
                "fullScreen",
                // "download",
                "thumbs",
                "close"
            ],
        });
    }

    function articleContentReplace() {
        $('.article-content').each(function () {
            var $t = $(this);
            /**删除文章出现的多余空行*/
            $t.html($t.html().replace(/(<br>){2,}/ig, "<br>"));
            /**a标签block打开*/
            $t.find('a').attr('target', '_block');
            /**包裹table*/
            $t.find('table').wrap('<div class="scroll-bar table-wrap"></div>')


            /**保护内容的样式*/
            if ($t.find('form.protected').length) {
                $t.find('form.protected input[type=submit]').addClass('mdl-button mdl-js-button mdl-button--raised')
                $t.parents('.post-card').addClass('post-card-protected')
            }
        });

        //代码高亮渲染
        try {
            Prism.highlightAll();
        } catch (e) {
        }
    }

    /**访客地图*/
    function revolvermaps() {
        var revo = $('#revolvermaps');
        if (revo.length && revo.css('display') != 'none') {
            var maps = revo.find('.maps-w');
            if (revo.find('script').length == 0) {// Script is eaten by pjax, fuck...
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = maps.data('src') + '?_dc=' + new Date().getTime();
                script.async = true;
                maps.html(script);
            }

            maps.css('height', revo.width());
        }
    }

    /**index button 按钮事件*/
    (function () {
        $('#index-button').on('click', function (e) {
            var card = $('.index-card');
            if (!card.length) return;
            if (card.css('display') === 'none') {
                card.slideDown(200);
            } else {
                card.slideUp(200);
            }

            e.stopPropagation();
        })
    })();

    /**加载更多文章*/
    var oldELoadMore = null;
    var initLoadMore = function () {
        //首页more对象没有变动，无需刷新
        if ($('#load-more').is(oldELoadMore)) {
            return;
        } else {
            oldELoadMore = $('#load-more');
        }

        //已经没有更多了，无需刷新
        if ($('.post-card').length < typechoConf.pageSize || $('#tag-no-more').length) {
            $('#load-more').html('到底了');
            return;
        }

        //从第二页开始获取
        var isLoading = false;
        if (oldELoadMore.length == 0) return;

        oldELoadMore.unbind('click').on('click', function () {
            if (doing()) return;

            $.ajax({
                url: window.location.href + '?page=' + ($('.post-card').length / typechoConf.pageSize + 1),
                type: 'GET',
                dataType: 'html',
                error: function () {
                    done(false, true);
                },
                success: function (data) {
                    if (false == data) {//出错
                        done();
                        return;
                    }

                    var tempData = $('<code></code>').append($(data));
                    if (tempData.find('#no-more').length) {//已无更多
                        done(true);
                        return;
                    }

                    $('.post-card').last().after($(data).hide().fadeIn(300));
                    //刷新新加入post-card的事件和渲染
                    done($('#tag-no-more').length);

                    articleContentReplace();
                    $.articleImage();
                }
            })
        });

        var doing = function () {
            if (isLoading) return true;

            isLoading = true;
            $('#load-more .description').html('请稍等');
            $('#load-more-anim').addClass('spinner');
            return false;
        };

        var done = function (damn, failed) {
            damn = damn || false;
            failed = failed || false;
            isLoading = false;
            $('#load-more-anim').removeClass('spinner');
            if (damn) {
                $('#load-more').html('到底了').unbind('click');
            } else {
                $('#load-more .description').html(failed ? '加载失败，请重试' : '加载更多');
            }
        }
    };

    /**tag随机颜色*/
    var inittagColor = function () {
        var tagA = $('.tag-wrapper a');
        if (tagA.length) {
            var ca = colorBuilder.getHslArray(tagA.length);
            tagA.each(function (i) {
                var color = 'rgb(' + colorBuilder.hslToRgb(ca[i][0], ca[i][1], ca[i][2]).toString() + ')';
                $(this).css('color', 'white').css('background-color', color);
            });
        }

        tagA = $('.tag-cloud a');
        if (tagA.length) {
            var ca = colorBuilder.getHslArray(tagA.length);
            tagA.each(function (i) {
                var color = 'rgb(' + colorBuilder.hslToRgb(ca[i][0], ca[i][1], ca[i][2]).toString() + ')';
                $(this).css('color', 'white').css('background-color', color);
            });
        }
    };
    inittagColor();

    /**初始化 niceScroll*/
    var initNiceScroll = function () {
        if (isMobile()) return;
        $mdl_content.niceScroll({
            cursorcolor: "#d0d0d0",
            horizrailenabled: false,
        });
        $('.page-content').bind('resize', function () {
            $mdl_content.getNiceScroll().resize();
            updateMenuIndexTags();
        });
    };

    /**页面resize*/
    $(window).resize(function () {
        resizeMenuTreeHeight();
        revolvermaps();
        titleTreeType();
    });

    headerStatus();
    drawer();
    toTop();
    revolvermaps();
    titleTooltip();
    initNiceScroll();


    $.completePjax = function () {
        inittagColor();
    };

    $.afterPjax = function () {
        articleContentReplace();
        articleTitleTree();
        $.articleImage();
        $.postNear();
        initLoadMore();
        $.pageNav();
        $.commentsAjax();
        revolvermaps();

        $mdl_content.getNiceScroll().resize();

        $('.post-card').bind('resize', function () {
            $mdl_content.getNiceScroll().resize();
        });
    };
    $.afterPjax();
});

$.commentsAjax = function () {
    restNoPjaxClass();
    $.doingSubmit = false;/*提交控制重置*/

    $('#comment-form').submit(function (event) {
        if (doing()) return false;

        event.preventDefault();
        var isReply = false, subData = $(this).serializeArray();

        $.each(subData, function (i, field) {
            if (field.name == 'parent') {
                isReply = true;
            }
        });

        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: subData,
            error: function () {
                done();
                $.showSnackbar('提交失败！')
            },
            success: function (data) {
                console.log(data);
                done();

                if (!$('#comments', data).length) {
                    var msg = $("<code></code>").append($(data)).find('.container, h1');
                    if (msg.length) msg = msg.html(); else msg = data;
                    $.showSnackbar("提交失败:  " + msg);
                    return false;
                }

                $.showSnackbar('评论成功!');

                var maxId = $('#comments', data).html().match(/id="?comment-\d+/g).join().match(/\d+/g).sort(function (a, b) {
                    return a - b
                }).pop();

                if ($('.page-navigator li').length === 0 //没有分页
                    || $('.page-navigator .prev').length === 0 //在第一页
                    || isReply) {//是回复
                    $('#comments').html($('#comments', data).html());
                    reUpgradePageDem();/*评论区的内容全部替换了,所以刷洗一下MDL输入框组件*/
                    $.articleImage();
                    $.pageNav();
                    $.commentsAjax();

                    $('#mdl-layout-content').animate({
                        scrollTop: $('li[id=li-comment-' + maxId + ']').offset().top + $('#mdl-layout-content').scrollTop()
                    }, 300);

                    return;
                }

                //跳转到第一页 TODO 如果最新评论在最后一页需修改
                var firstPage = $('#comments .page-navigator .prev').next().find('a');
                firstPage.trigger('click');
            }
        });
    });

    function doing() {
        if ($.doingSubmit) return true;
        $.doingSubmit = true;
        $('#comment-form button[type=submit]').addClass('submit-loading')
            .find('.material-icons').html('toys');
        return false;
    }

    function done() {
        $.doingSubmit = false;
        $('#comment-form button[type=submit]').removeClass('submit-loading')
            .find('.material-icons').html('check');
    }
};

function restNoPjaxClass() {
    $('.comment-reply a, .cancel-comment-reply-link').addClass("no-pjax");
}

var titleTooltip = function () {
    $(".article-content .avatars").find("a").each(function (d) {//这里是控制标签
        if ($(this).attr('title')) {
            $(this).mouseover(function (d) {
                var title = $(this).attr('title');
                var url = '';
                $(this).attr('title', '');
                var href = $(this).attr('href');
                if (href && !href.startsWith('#')) {
                    url = '点击传送：' + href;
                }
                $("body").append('<div id="tooltip">' + '<span class="title">' + title + '</span>' + '<br>' + url + "</div>");
                $("#tooltip").css({
                    left: (d.pageX + 16) + "px",
                    top: (d.pageY + 16) + "px",
                }).fadeIn(150)
            }).mouseout(function () {
                $(this).attr('title', $("#tooltip .title").html());
                $("#tooltip").remove();
            }).mousemove(function (d) {
                $("#tooltip").css({
                    left: (d.pageX + 16) + "px",
                    top: (d.pageY + 16) + "px"
                });
                //TODO tooltip有溢出窗口的可能
            })
        }
    });
};

/**重新刷新pge-content下的mdl组件功能.*/
function reUpgradePageDem() {
    var page = $('#page-content');
    page.find('*[class^=mdl]').removeClass('is-upgraded').removeAttr("data-upgraded");
    page.find('.mdl-menu__item-ripple-container').remove();
    page.find('.mdl-js-ripple-effect--ignore-events').removeClass('mdl-js-ripple-effect--ignore-events');

    var mdl_menu_container = page.find('.mdl-menu__container');
    mdl_menu_container.each(function () {
        $(this).after($(this).html());
        $(this).remove()
    });

    componentHandler.upgradeDom();
}
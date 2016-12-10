var $window = $(window),
    $body = $('body');

function pad(n) {
    return n < 10 ? '0' + n : n;
}

function urlParam(name) {
    var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

function createCookie(name, value, expires) {
    var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    if (typeof(expires) !== 'undefined') {
        cookie += '; expires=' + new Date(expires).toUTCString();
    }
    document.cookie = cookie;
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        clearTimeout(timerId);
        timerId = setTimeout(callback, remaining);
    };

    this.clear = function() {
        clearTimeout(timerId);
    };

    this.resume();
}

function setBodyOverflowHidden() {
    var overflowHiddenCnt = typeof($body.attr('data-overflow-hidden')) !== 'undefined' ? parseInt($body.attr('data-overflow-hidden')) + 1 : 1;
    $body.attr('data-overflow-hidden', overflowHiddenCnt);
    if (overflowHiddenCnt === 1) {
        $body.addClass('overflow--hidden');
    }
}

function removeBodyOverflowHidden() {
    var overflowHiddenCnt = parseInt($body.attr('data-overflow-hidden')) - 1;
    $body.attr('data-overflow-hidden', overflowHiddenCnt);
    if (overflowHiddenCnt === 0) {
        $body.removeClass('overflow--hidden');
    }
}

function getSpinner(white) {
    var color = white ? ' spinner__white' : '';
    return $('<div class="spinner' + color + '"><div class="spinner__child spinner__child__1"></div><div class="spinner__child spinner__child__2"></div><div class="spinner__child spinner__child__3"></div><div class="spinner__child spinner__child__4"></div><div class="spinner__child spinner__child__5"></div><div class="spinner__child spinner__child__6"></div><div class="spinner__child spinner__child__7"></div><div class="spinner__child spinner__child__8"></div><div class="spinner__child spinner__child__9"></div><div class="spinner__child spinner__child__10"></div><div class="spinner__child spinner__child__11"></div><div class="spinner__child spinner__child__12"></div></div>');
}

function getBtnSpinner() {
    return $('<div class="btn__spinner"></div>').append(getSpinner(true));
}

function showModal(name) {
    var $modal = $('.modal'),
        $modalContent = $modal.find('[data-modal="' + name + '"]');

    if (!$modal.is(':visible')) {

        updateAfterHide = function() {
            setBodyOverflowHidden();
        };

        $modal.velocity('fadeIn', {
            complete: function() {
                updateAfterHide();
            }
        });
        $modalContent.velocity({
            opacity: '1',
            transformY: '0'
        });
    }
}

function hideModal() {
    var $modal = $('.modal'),
        $modalContent = $modal.find('.modal__content');

    if ($modal.is(':visible')) {

        updateAfterHide = function() {
            removeBodyOverflowHidden();
            $modalContent.removeAttr('style');
        };

        $modal.velocity('fadeOut', {
            complete: function() {
                updateAfterHide();
            }
        });
    }
}

function makeRequest(url, method, data, cbSuccess, cbError) {
    $.ajax({
        url: url,
        method: method,
        data: data,
        complete: function() {

        },
        success: function(res) {
            if (typeof(cbSuccess) !== 'undefined') {
                cbSuccess(res);
            }
        },
        error: function(res) {
            if (typeof(cbError) !== 'undefined') {
                cbError(res);
            }
        }
    });
}

function animateScale($element) {
    $element.velocity({
        scale: "0"
    }, {
        duration: 100,
        complete: function() {
            $element.toggleClass('active');
        }
    }).velocity({
        scale: "1.2"
    }, {
        duration: 150
    }).velocity({
        scale: "1"
    }, {
        duration: 50
    });
}

var Tasks = (function() {
    Tasks.prototype.container = null;
    Tasks.prototype.started = false;
    Tasks.prototype.activeTask = -1;
    Tasks.prototype.result = {};

    function Tasks(containerSelector, data) {
        this.container = $(containerSelector);

        $('#start').on('click', (function(_this) {
            return function(event) {
                _this.started = true;
                _this.nextTask(0);
            };
        })(this));

        $('#tasks-form').on('click', '[data-next-task]', (function(_this) {
            return function(event) {
                var $btn = $(event.target);
                var nextTaskId = $btn.attr('data-next-task') *  1;

                _this.nextTask(nextTaskId);
            };
        })(this));
    }

    Tasks.prototype.hideTask = function(cb) {
        console.log("hide task");

        var $container = this.container.find('[data-task="' + this.activeTask + '"]');

        $container.velocity('fadeOut', {
            complete: function() {
                cb();
            },
            duration: 300,
            easing: 'ease-in-out',
        });
    };

    Tasks.prototype.nextTask = function(taskId) {
        console.log("next task", taskId);

        this.hideTask((function(_this) {
            return function() {
                _this.activeTask = taskId;

                if (_this.activeTask == 0) {
                    _this.displayTask($('[data-task="0"]'));
                } else {
                    _this.getTaskHTML((function(__this) {
                        return function(html) {
                            var $taskContainer = $(html);
                            __this.container.append($taskContainer);

                            switch (__this.activeTask) {
                                case 1:
                                    break;
                                case 2:
                                    break;
                                case 3:
                                    break;
                                default:
                                    console.log("Invalid task id", __this.activeTask);
                            };

                            __this.displayTask($taskContainer);
                        };
                    })(_this));
                }
            };
        })(this));
    };

    Tasks.prototype.displayTask = function($container) {
        $container.velocity('fadeIn', {
            duration: 300,
            easing: 'ease-in-out'
        });
    };

    Tasks.prototype.getTaskHTML = function(cb) {
        console.log("get task HTML", this.activeTask);

        this.getTaskAjax(cb, (function(_this) {
            return function(err) {
                console.log(err);
            };
        })(this));
    };

    Tasks.prototype.getTaskAjax = function(cbSuccess, cbError) {
        $.ajax({
            url: '/html/task/' + this.activeTask,
            method: 'GET',
            complete: function() {

            },
            success: function(res) {
                if (typeof(cbSuccess) !== 'undefined') {
                    cbSuccess(res);
                }
            },
            error: function(res) {
                if (typeof(cbError) !== 'undefined') {
                    cbError(res);
                }
            }
        });
    };

    Tasks.prototype.getTaskTwo = function() {
        return "<span>2</span>";
    };

    Tasks.prototype.getTaskThree = function() {
        return "<span>3</span>";
    };

    Tasks.prototype.getTaskFour = function() {
        return "<span>4</span>";
    };

    return Tasks;
})();

$(document).ready(function() {

    //=================================================================
    // Modal close
    //=================================================================
    $('.modal').on('click', function(event) {
        var $this = $(this),
            triggerClose = $('.modal, .modal__close, .modal__content, .modal__cancel').toArray();
        if (triggerClose.indexOf(event.target) === -1) {
            return;
        }
        hideModal();
    });

    //=================================================================
    // Checkbox functionality
    //=================================================================
    $('input[type="checkbox"]').on('change', function() {
        var $this = $(this),
            $checkbox = $this.parent();
        animateScale($checkbox);
    });

    //=================================================================
    // Radio functionality
    //=================================================================
    $('input[type="radio"]').on('change', function() {
        var $this = $(this),
            $radio = $this.parent(),
            group = $this.attr('name'),
            $prev = $('input[name="' + group + '"][type="radio"]:not(:checked)');
        if ($prev.length) {
            $prev.parent().removeClass('active');
        }
        animateScale($radio);
    });

    //=================================================================
    // Esc key listener - hide modal
    //=================================================================
    $(document).on('keyup', function(event) {
        if (event.keyCode !== 27) {
            return;
        }
        hideModal();
    });

    //=================================================================
    // Scroll to id functionality
    //=================================================================
    $("a").click(function(e) {
        var target = $(this).attr('href');
        if (target[0] === "#") {
            e.preventDefault();
            if (target.length === 1 && typeof($(this).attr('data-scroll-up')) !== 'undefined') {
                $body
                    .velocity("scroll", {
                        duration: 1000,
                        easing: "swing"
                    });
            } else {
                $(target)
                    .velocity("scroll", {
                        duration: 1000,
                        easing: "swing"
                    });
            }
        }
    });

    //=================================================================
    // Fastclick
    //=================================================================
    FastClick.attach(document.body);

});

var $window = $(window),
    $body = $('body');

if (typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

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

var answerChars = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
    9: "i",
    10: "j"
};

var Tasks = (function() {
    Tasks.prototype.container = null;
    Tasks.prototype.started = false;
    Tasks.prototype.activeTask = -1;
    Tasks.prototype.activeTaskScreen = -1;
    Tasks.prototype.totalScreens = 1;
    Tasks.prototype.data = {};

    function Tasks(containerSelector, data) {
        this.container = $(containerSelector);

        $('#start').on('click', (function(_this) {
            return function(event) {
                _this.started = true;
                _this.nextTask(0);
            };
        })(this));

        $('#tasks-form').on('click', '#save', (function(_this) {
            return function(event) {
                _this.getResultsFour();

                $.ajax({
                    url: '/submit',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(_this.data),
                    complete: function() {

                    },
                    success: (function(__this) {
                        return function(res) {
                            __this.nextTask(100);
                        };
                    })(_this),
                    error: function(res) {
                        console.log(res);
                    }
                });
            };
        })(this));

        $('#tasks-form').on('click', '[data-next-task]', (function(_this) {
            return function(event) {
                var $btn = $(event.target);
                var nextTaskId = $btn.attr('data-next-task') *  1;

                _this.nextTask(nextTaskId);
            };
        })(this));

        $('#tasks-form').on('click', '[data-next-screen]', (function(_this) {
            return function(event) {
                var $btn = $(event.target);
                var nextScreenId = $btn.attr('data-next-screen') *  1;

                _this.nextScreen(nextScreenId);
            };
        })(this));
    }

    Tasks.prototype.validateHideTask = function(cb) {
        var $container = this.container.find('[data-task="' + this.activeTask + '"]');

        switch (this.activeTask) {
            case 0:
                this.validateTaskZero();
                break;
            default:
                console.log('Nothing to validate');
        };

        if (this.container.find('.error').length > 0) {
            return;
        }

        this.hideTask($container, cb);
    };

    Tasks.prototype.validateChecked = function(selector) {
        var $el = $(selector);
        var $field = $el.closest('.field');

        if (!$el.is(':checked')) {
            $field.addClass('error');

            if (typeof($field.attr('data-validate-listener')) === 'undefined') {
                $field.attr('data-validate-listener', true);
                $field.on('change', selector, (function(_this) {
                    return function(event) {
                        _this.validateChecked(selector);
                    };
                })(this));
            }
        } else if ($field.hasClass('error')) {
            $field.removeClass('error');
        }
    };

    Tasks.prototype.validateSelect2 = function(selector) {
        var $el = $(selector);

        if (!$el.val()) {
            $el.addClass('error');

            if (typeof($el.attr('data-validate-listener')) === 'undefined') {
                $el.attr('data-validate-listener', true);
                $el.on('change', (function(_this) {
                    return function(event) {
                        _this.validateSelect2(selector);
                    };
                })(this));
            }
        } else if ($el.hasClass('error')) {
            $el.removeClass('error');
        }
    };

    Tasks.prototype.validateInput = function(selector) {
        var $el = $(selector);

        if ($el.val().trim() === '') {
            $el.addClass('error');

            if (typeof($el.attr('data-validate-listener')) === 'undefined') {
                $el.attr('data-validate-listener', true);
                $el.on('blur', (function(_this) {
                    return function(event) {
                        _this.validateInput(selector);
                    };
                })(this));
            }
        } else if ($el.hasClass('error')) {
            $el.removeClass('error');
        }
    };

    Tasks.prototype.validateTaskZero = function() {
        this.validateChecked('[name="gender"]');

        this.validateInput('#age');

        this.validateSelect2('#school');
    };

    Tasks.prototype.hideTask = function($container, cb, animation) {
        animation = typeof(animation) !== 'undefined' ? animation : 'fadeOut';

        switch (this.activeTask) {
            case 0:
                this.getResultsZero();
                break;
            case 1:
                this.getResultsOne();
                break;
            case 2:
                this.getResultsTwo();
                break;
            case 3:
                this.getResultsThree();
                break;
            default:
                console.log('Nothing to validate');
        };

        $container.velocity(animation, {
            complete: (function(_this) {
                return function() {
                    $container.remove();

                    if (_this.activeTask === 3 &&  _this.activeTaskScreen === _this.totalScreens) {
                        $('.container__sm.container__lg').removeClass('container__lg');
                    }

                    cb();
                };
            })(this),
            duration: 300,
            easing: 'ease-in-out',
        });
    };

    Tasks.prototype.getResultsZero = function() {
        this.data.age = $('#age').val() * 1;
        this.data.sex = $('[name="gender"]').val();
        this.data.school_id = $('#school').val() *  1;
        this.data.results = [];
    };

    Tasks.prototype.getResultsOne = function() {
        if (this.activeTaskScreen === 1) {
            this.data.results.push({
                id: 1,
                data: []
            });

            return;
        }

        var questions = $('.questionsList li');

        for (var i = 0; i < questions.length; i++) {
            var answer = $(questions[i]).find('input[type="radio"]:checked');

            if (answer.length > 0) {
                this.data.results[this.data.results.length - 1].data.push(answerChars[answer.val()]);
            } else {
                this.data.results[this.data.results.length - 1].data.push('');
            }
        }
    };

    Tasks.prototype.getResultsTwo = function() {
        if (this.activeTaskScreen === 1) {
            this.data.results.push({
                id: 2,
                data: []
            });

            return;
        } else if ((this.activeTaskScreen - 1) % 2 !== 0) {
            return;
        }

        this.data.results[this.data.results.length - 1].data.push($('#answer').val());
    };

    Tasks.prototype.getResultsThree = function() {
        if (this.activeTaskScreen === 1) {
            this.data.results.push({
                id: 3,
                data: []
            });

            return;
        } else if ((this.activeTaskScreen - 1) % 2 !== 0) {
            return;
        }

        var answers = $('[data-screen="' + this.activeTaskScreen + '"] .answersList input[type="text"]');
        var res = [];

        for (var i = 0; i < answers.length; i++) {
            res.push($(answers[i]).val());
        }

        this.data.results[this.data.results.length - 1].data.push(res);
    };

    Tasks.prototype.getResultsFour = function() {
        this.data.slept = $('#slept').is(':checked');
    };

    Tasks.prototype.nextScreen = function(screenId) {
        this.hideTask($('[data-screen="' + this.activeTaskScreen + '"]'), (function(_this) {
            return function() {
                _this.activeTaskScreen = screenId;

                _this.displayTask($('[data-screen="' + _this.activeTaskScreen + '"]'), 'slideDown', (function(__this) {
                    return function() {
                        switch (__this.activeTask) {
                            case 2:
                                if (__this.activeTaskScreen % 2 !== 0) {
                                    break;
                                }

                                __this.setProgress(__this.activeTaskScreen / 2);
                                __this.animateTextSequence($('[data-screen="' + __this.activeTaskScreen + '"] .sequence--text li'));
                                break;
                            case 3:
                                if (__this.activeTaskScreen % 2 !== 0) {
                                    break;
                                }

                                if (__this.activeTaskScreen === 2) {
                                    $('.container__sm').addClass('container__lg');
                                }

                                __this.setProgress(__this.activeTaskScreen / 2);
                                __this.animateImageSequence($('[data-screen="' + __this.activeTaskScreen + '"] .sequence--images li'));
                                break;
                            default:
                                console.log("Invalid task id", __this.activeTask);
                        };
                    };
                })(_this));
            };
        })(this), 'slideUp');
    };

    Tasks.prototype.nextTask = function(taskId) {
        this.validateHideTask((function(_this) {
            return function() {
                _this.activeTask = taskId;
                _this.activeTaskScreen = 1;

                if (_this.activeTask == 0) {
                    _this.displayTask($('[data-task="0"]'));
                    return;
                }

                if (_this.activeTask == 99) {
                    _this.displayTask($('[data-task="99"]'));
                    return;
                }

                if (_this.activeTask == 100) {
                    _this.displayTask($('[data-task="100"]'));
                    return;
                }

                _this.getTaskHTML((function(__this) {
                    return function(html) {
                        var $taskContainer = $(html);

                        __this.totalScreens = $taskContainer.find('[data-screen]').length;
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

                        $('[data-screen="1"]').show();
                        __this.displayTask($taskContainer);
                    };
                })(_this));
            };
        })(this));
    };

    Tasks.prototype.displayTask = function($container, animation, cb) {
        animation = typeof(animation) !== 'undefined' ? animation : 'fadeIn';

        $container.velocity(animation, {
            complete: function() {
                if (typeof(cb) === 'undefined') {
                    return;
                }

                $container.find('input:first').focus();

                cb();
            },
            duration: 300,
            easing: 'ease-in-out'
        });
    };

    Tasks.prototype.getTaskHTML = function(cb) {
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

    Tasks.prototype.setProgress = function(active) {
        var text = '(' + active + '/' + ((this.totalScreens - 1) / 2) + ')';
        $('.progress').text(text)
    };

    Tasks.prototype.animateTextSequence = function(sequence) {
        var seq = [];

        for (var i = 0; i < sequence.length; i++) {
            var seqOptions = {
                e: $(sequence[i]),
                p: 'transition.expandIn',
                o: {
                    delay: 1000,
                    display: null,
                    duration: 200,
                    easing: 'ease-in-out'
                }
            };

            if (i === sequence.length - 1) {
                seqOptions.o.complete = (function(_this) {
                    return function() {
                        setTimeout((function(__this) {
                            return function() {
                                __this.nextScreen(__this.activeTaskScreen + 1);
                            };
                        })(_this), 5000);
                    };
                })(this);
            }

            seq.push(seqOptions);
        }

        $.Velocity.RunSequence(seq, {});
    };

    Tasks.prototype.animateImageSequence = function(sequence) {
        var seq = [];

        for (var i = 0; i < sequence.length; i++) {
            var seqOptions = {
                e: $(sequence[i]),
                p: 'transition.expandIn',
                o: {
                    delay: 1000,
                    display: null,
                    duration: 200,
                    easing: 'ease-in-out'
                }
            };

            if (i === sequence.length - 1) {
                seqOptions.o.complete = (function(_this) {
                    return function() {
                        setTimeout((function(__this) {
                            return function() {
                                __this.nextScreen(__this.activeTaskScreen + 1);
                            };
                        })(_this), 5000);
                    };
                })(this);
            }

            seq.push(seqOptions);
        }

        $.Velocity.RunSequence(seq, {});
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
    $('#tasks-form').on('change', 'input[type="checkbox"]', function() {
        var $this = $(this),
            $checkbox = $this.parent();
        animateScale($checkbox);
    });

    //=================================================================
    // Radio functionality
    //=================================================================
    $('#tasks-form').on('change', 'input[type="radio"]', function() {
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
    $('#tasks-form').on('click', 'a', function(e) {
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

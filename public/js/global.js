var $window = $(window),
    $body = $('body'),
    test = null;

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

function getSpinner() {
    return $('<div class="spinner"><div class="spinner__child spinner__child__1"></div><div class="spinner__child spinner__child__2"></div><div class="spinner__child spinner__child__3"></div><div class="spinner__child spinner__child__4"></div><div class="spinner__child spinner__child__5"></div><div class="spinner__child spinner__child__6"></div><div class="spinner__child spinner__child__7"></div><div class="spinner__child spinner__child__8"></div><div class="spinner__child spinner__child__9"></div><div class="spinner__child spinner__child__10"></div><div class="spinner__child spinner__child__11"></div><div class="spinner__child spinner__child__12"></div></div>');
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
    Tasks.prototype.dates = [];

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
                _this.getResultsNinetyNine();

                $.ajax({
                    url: '/submit',
                    type: 'POST',
                    headers: {
                        'x-secret': '54c3c3db0b3a8c92479f6cabe3bac98b'
                    },
                    contentType: 'application/json',
                    data: JSON.stringify(_this.data),
                    complete: function() {

                    },
                    success: (function(__this) {
                        return function(res) {
                            __this.started = false;
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

        if (this.dates.length > 0 && this.dates[this.dates.length - 1].end == '') {
            this.dates[this.dates.length - 1].end = new Date().toISOString();
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
            case 4:
                this.getResultsOne();
                break;
            case 2:
                this.getResultsTwo();
                break;
            case 5:
                this.getResultsTwo();
                break;
            case 3:
                this.getResultsThree();
                break;
            case 6:
                this.getResultsThree();
                break;
            default:
                console.log('Nothing to validate');
        };

        if (animation === 'fadeOut') {
            var $spinner = $('<div class="spinner--absolute"></div>').append(getSpinner());
            $('body').append($spinner);
        }

        $container.velocity(animation, {
            complete: (function(_this) {
                return function() {
                    $container.remove();

                    if ((_this.activeTask === 2 || _this.activeTask === 5) &&  _this.activeTaskScreen === _this.totalScreens) {
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
        this.data.sex = $('[name="gender"]:checked').val();
        this.data.school_id = $('#school').val() *  1;
        this.data.results = [];
    };

    Tasks.prototype.getResultsOne = function() {
        var id = 1;

        if ($('[data-task="4"]').length > 0) {
          id = 4;
        }

        if (this.activeTaskScreen === 1) {
            this.data.results.push({
                id: id,
                data: {
                    answers: [],
                    dates: []
                }
            });

            return;
        } else if (this.activeTaskScreen === 2) {
            return;
        }

        var questions = $('[data-task="' + id + '"] .questionsList li');

        for (var i = 0; i < questions.length; i++) {
            var answer = $(questions[i]).find('input[type="radio"]:checked');

            if (answer.length > 0) {
                this.data.results[this.data.results.length - 1].data.answers.push(answerChars[answer.val()]);
            } else {
                this.data.results[this.data.results.length - 1].data.answers.push('');
            }
        }

        this.data.results[this.data.results.length - 1].data.dates = this.dates;
    };

    Tasks.prototype.getResultsTwo = function() {
      var id = 2;

      if ($('[data-task="5"]').length > 0) {
        id = 5;
      }

        if (this.activeTaskScreen === 1) {
            this.data.results.push({
                id: id,
                data: {
                    answers: [],
                    dates: []
                }
            });

            return;
        } else if ((this.activeTaskScreen - 1) % 2 !== 0) {
            return;
        }

        var answers = $('[data-task="' + id + '"] [data-screen="' + this.activeTaskScreen + '"] .answersList input[type="text"]');
        var res = [];

        for (var i = 0; i < answers.length; i++) {
            res.push($(answers[i]).val());
        }

        this.data.results[this.data.results.length - 1].data.answers.push(res);
        this.data.results[this.data.results.length - 1].data.dates = this.dates;
    };

    Tasks.prototype.getResultsThree = function() {
      var id = 3;

      if ($('[data-task="6"]').length > 0) {
        id = 6;
      }

        if (this.activeTaskScreen === 1) {
            this.data.results.push({
                id: id,
                data: {
                    answers: [],
                    dates: []
                }
            });

            return;
        } else if ((this.activeTaskScreen - 1) % 2 !== 0) {
            return;
        }

        this.data.results[this.data.results.length - 1].data.answers.push($('[data-task="' + id + '"] [data-screen="' + this.activeTaskScreen + '"] input').val());
        this.data.results[this.data.results.length - 1].data.dates = this.dates;
    };

    Tasks.prototype.getResultsNinetyNine = function() {
        this.data.slept = $('#slept').is(':checked');
        this.data.json_questionnaire = [];
        this.data.email = $('#email').val();

        var questions = $('[data-task="99"] .questionsList input')
        for (var i = 0; i < questions.length; i++) {
            this.data.json_questionnaire.push($(questions[i]).val());
        }
    };

    Tasks.prototype.nextScreen = function(screenId) {
        if (this.dates.length > 0 && this.dates[this.dates.length - 1].end == '') {
            this.dates[this.dates.length - 1].end = new Date().toISOString();
        }

        this.hideTask($('[data-screen="' + this.activeTaskScreen + '"]'), (function(_this) {
            return function() {
                _this.activeTaskScreen = screenId;

                _this.displayTask($('[data-screen="' + _this.activeTaskScreen + '"]'), 'slideDown', (function(__this) {
                    return function() {
                        switch (__this.activeTask) {
                            case 1:
                                if (__this.activeTaskScreen > 2) {
                                    __this.dates.push({
                                        start: new Date().toISOString(),
                                        end: ''
                                    });
                                }

                                if (__this.activeTaskScreen !== 2) {
                                    break;
                                }

                                __this.timeoutNextScreen(60000);
                                __this.animateProgressBar(60000);
                                break;
                            case 4:
                                if (__this.activeTaskScreen > 2) {
                                    __this.dates.push({
                                        start: new Date().toISOString(),
                                        end: ''
                                    });
                                }

                                if (__this.activeTaskScreen !== 2) {
                                    break;
                                }

                                __this.timeoutNextScreen(70000);
                                __this.animateProgressBar(70000);
                                break;
                            case 2:
                                if (__this.activeTaskScreen % 2 !== 0) {
                                    if (__this.activeTaskScreen > 1) {
                                        __this.dates.push({
                                            start: new Date().toISOString(),
                                            end: ''
                                        });
                                    }
                                    break;
                                }

                                if (__this.activeTaskScreen === 2) {
                                    $('.container__sm').addClass('container__lg');
                                }

                                __this.setProgress(__this.activeTaskScreen / 2);
                                __this.animateImageSequence($('[data-screen="' + __this.activeTaskScreen + '"] .sequence--images li'));
                                break;
                            case 5:
                                if (__this.activeTaskScreen % 2 !== 0) {
                                    if (__this.activeTaskScreen > 1) {
                                        __this.dates.push({
                                            start: new Date().toISOString(),
                                            end: ''
                                        });
                                    }
                                    break;
                                }

                                if (__this.activeTaskScreen === 2) {
                                    $('.container__sm').addClass('container__lg');
                                }

                                __this.setProgress(__this.activeTaskScreen / 2);
                                __this.animateImageSequence($('[data-screen="' + __this.activeTaskScreen + '"] .sequence--images li'));
                                break;
                            case 3:
                                if (__this.activeTaskScreen % 2 !== 0) {
                                    if (__this.activeTaskScreen > 1) {
                                        __this.dates.push({
                                            start: new Date().toISOString(),
                                            end: ''
                                        });
                                    }
                                    break;
                                }

                                __this.setProgress(__this.activeTaskScreen / 2);
                                __this.animateTextSequence($('[data-screen="' + __this.activeTaskScreen + '"] .sequence--text li'));
                                break;
                            case 6:
                                if (__this.activeTaskScreen % 2 !== 0) {
                                    if (__this.activeTaskScreen > 1) {
                                        __this.dates.push({
                                            start: new Date().toISOString(),
                                            end: ''
                                        });
                                    }
                                    break;
                                }

                                __this.setProgress(__this.activeTaskScreen / 2);
                                __this.animateTextSequence($('[data-screen="' + __this.activeTaskScreen + '"] .sequence--text li'));
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

                        __this.dates = [];
                        __this.totalScreens = $taskContainer.find('[data-screen]').length;
                        __this.container.append($taskContainer);

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
                if (animation === 'fadeIn' &&  $('.spinner--absolute').length > 0) {
                    $('.spinner--absolute').remove();
                }

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

    Tasks.prototype.animateProgressBar = function(duration) {
        $('.progressBar').velocity({
            width: '100%'
        }, {
            complete: function($el) {
                $('.progressBar').removeAttr('style');
            },
            duration: duration,
            easing: 'linear'
        });
    };

    Tasks.prototype.setProgress = function(active) {
        var text = '(' + active + '/' + ((this.totalScreens - 1) / 2) + ')';
        $('.progress').text(text)
    };

    Tasks.prototype.timeoutNextScreen = function(delay) {
        setTimeout((function(_this) {
            return function() {
                _this.nextScreen(_this.activeTaskScreen + 1);
            };
        })(this), delay);
    };

    Tasks.prototype.animateTextSequence = function(sequence) {
        var seq = [],
            animDuration = 200,
            animDelay = 1000,
            timeout = 5000;

        for (var i = 0; i < sequence.length; i++) {
            var seqOptions = {
                e: $(sequence[i]),
                p: 'transition.expandIn',
                o: {
                    delay: animDelay,
                    display: null,
                    duration: animDuration,
                    easing: 'ease-in-out'
                }
            };

            if (i === sequence.length - 1) {
                seqOptions.o.complete = (function(_this) {
                    return function() {
                        _this.timeoutNextScreen(timeout);
                    };
                })(this);
            }

            seq.push(seqOptions);
        }

        this.animateProgressBar(sequence.length * (animDuration + animDelay) + timeout);

        $.Velocity.RunSequence(seq, {});
    };

    Tasks.prototype.animateImageSequence = function(sequence) {
        var seq = [],
            animDuration = 200,
            animDelay = 1000,
            timeout = 1000 * sequence.length;

        for (var i = 0; i < sequence.length; i++) {
            var seqOptions = {
                e: $(sequence[i]),
                p: 'transition.expandIn',
                o: {
                    delay: animDelay,
                    display: null,
                    duration: animDuration,
                    easing: 'ease-in-out'
                }
            };

            if (i === sequence.length - 1) {
                seqOptions.o.complete = (function(_this) {
                    return function() {
                        _this.timeoutNextScreen(timeout);
                    };
                })(this);
            }

            seq.push(seqOptions);
        }

        this.animateProgressBar(sequence.length * (animDuration + animDelay) + timeout);

        $.Velocity.RunSequence(seq, {});
    };

    return Tasks;
})();

(function($) {

    if ($('#results').length === 0) {
      if (!is_desktop) {
          return false;
      } else if ($window.width() < 1024) {
          $('.progressBar').remove();
          // $('#tasks-form').replaceWith($('<section class="container__sm table__cell"><div class="box"><div class="box__body"><p class="text__paragraph">Omlouvám se, ale pro srovnatelné podmínky je nutné dotazník vyplnit na počítači s rozlišením minimálně 1024px na šířku.</p></div></div></section>'));

          return false;
      }

      test = new Tasks('#tasks-form');
    }

    $(window).on('beforeunload copy paste', function(event) {
        if (test && test.started) {
            return false;
        }
    });

    $('#start').on('click', function(event) {
        confirmUnload = true;
    });

    $('#save').on('click', function(event) {
        confirmUnload = false;
    });

    var $school = $('#school');

    $school.on('select2:selecting', function(event) {
        if ($(window).width() >= 768) {
            return;
        }

        var $this = $(event.currentTarget);
        var contentPadding = parseInt($this.closest('.content').css('padding-left')),
            boxBodyPadding = parseInt($this.closest('.box__body').css('padding-left')),
            rowMargin = parseInt($this.closest('.row').css('margin-left'));

        var width = $(window).width() - (contentPadding + boxBodyPadding + rowMargin) * 2;

        $this.closest('.field__container').css('width', width);
    }).select2({
        placeholder: 'Vyber školu',
        templateResult: function(result, container) {
            if (!result.id) {
                return result.text;
            }

            container.className += ' needsclick';
            return result.text;
        }
    });

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

    var textResults = {
      1: ['c', 'a', 'b', 'c', 'a'],
      4: ['a', 'c', 'c', 'b', 'c']
    };

    $('[data-type="text"]').each(function(index, element) {
      var $e = $(element);
      var id = parseInt($e.data('id'));
      var answer = $e.data('answer');
      var text = '';

      for (var i = 0; i < answer.length && i < textResults[id].length; i++) {
        if (answer[i] === textResults[id][i]) {
          text += answer[i];
        } else {
          text += '<span class="text--red">' + answer[i] + '</span>';
        }

        if (i < answer.length - 1 && i < textResults[id].length - 1) {
          text += ', ';
        }
      }

      $e.append(text);
    });

    $('[data-type="images"]').each(function(index, element) {
      var $e = $(element);
      var total = $e.data('caption').split(', ');
      var answered = $e.data('answered');
      var error = false;

      if (total.length !== answered) {
        error = true;
      }

      if (error) {
        $e.closest('td').addClass('error');
      }
    });

    var numResults = {
      3: ['3412', '2785', '92354', '81230', '145927', '204385', '9231456', '5427803', '01593714', '52647381'],
      6: ['5489', '3751', '27390', '11623', '856018', '791363', '4374165', '6052913', '12602605', '63758492']
    };

    $('[data-type="numbers"]').each(function(index, element) {
      var $e = $(element);
      var id = parseInt($e.closest('[data-id]').data('id'));
      var answer = $e.data('answer').toString().replace(/[^\d]/g, '');
      var text = '';
      var error = false;

      for (var i = 0; i < answer.length && i < numResults[id][index % 10].length; i++) {
        if (answer[i] === numResults[id][index % 10][i]) {
          text += answer[i];
        } else {
          error = true;
          text += '<span class="text--red">' + answer[i] + '</span>';
        }

        if (i < answer.length - 1 && i < numResults[id][index % 10].length - 1) {
          text += ', ';
        }
      }

      if (!error && answer.length !== numResults[id][index % 10].length) {
        error = true;
      }

      if (error) {
        $e.closest('td').addClass('error');
      }

      $e.append(text);
    });

    //=================================================================
    // Fastclick
    //=================================================================
    FastClick.attach(document.body);

})(jQuery);

(() => {
    var __webpack_modules__ = {
        41: function(module) {
            (function(global, factory) {
                true ? module.exports = factory() : 0;
            })(0, (function() {
                "use strict";
                var root = document;
                var createText = root.createTextNode.bind(root);
                function setProperty(el, varName, value) {
                    el.style.setProperty(varName, value);
                }
                function appendChild(el, child) {
                    return el.appendChild(child);
                }
                function createElement(parent, key, text, whitespace) {
                    var el = root.createElement("span");
                    key && (el.className = key);
                    if (text) {
                        !whitespace && el.setAttribute("data-" + key, text);
                        el.textContent = text;
                    }
                    return parent && appendChild(parent, el) || el;
                }
                function getData(el, key) {
                    return el.getAttribute("data-" + key);
                }
                function $(e, parent) {
                    return !e || e.length == 0 ? [] : e.nodeName ? [ e ] : [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e));
                }
                function Array2D(len) {
                    var a = [];
                    for (;len--; ) a[len] = [];
                    return a;
                }
                function each(items, fn) {
                    items && items.some(fn);
                }
                function selectFrom(obj) {
                    return function(key) {
                        return obj[key];
                    };
                }
                function index(element, key, items) {
                    var prefix = "--" + key;
                    var cssVar = prefix + "-index";
                    each(items, (function(items, i) {
                        if (Array.isArray(items)) each(items, (function(item) {
                            setProperty(item, cssVar, i);
                        })); else setProperty(items, cssVar, i);
                    }));
                    setProperty(element, prefix + "-total", items.length);
                }
                var plugins = {};
                function resolvePlugins(by, parent, deps) {
                    var index = deps.indexOf(by);
                    if (index == -1) {
                        deps.unshift(by);
                        each(plugins[by].depends, (function(p) {
                            resolvePlugins(p, by, deps);
                        }));
                    } else {
                        var indexOfParent = deps.indexOf(parent);
                        deps.splice(index, 1);
                        deps.splice(indexOfParent, 0, by);
                    }
                    return deps;
                }
                function createPlugin(by, depends, key, split) {
                    return {
                        by,
                        depends,
                        key,
                        split
                    };
                }
                function resolve(by) {
                    return resolvePlugins(by, 0, []).map(selectFrom(plugins));
                }
                function add(opts) {
                    plugins[opts.by] = opts;
                }
                function splitText(el, key, splitOn, includePrevious, preserveWhitespace) {
                    el.normalize();
                    var elements = [];
                    var F = document.createDocumentFragment();
                    if (includePrevious) elements.push(el.previousSibling);
                    var allElements = [];
                    $(el.childNodes).some((function(next) {
                        if (next.tagName && !next.hasChildNodes()) {
                            allElements.push(next);
                            return;
                        }
                        if (next.childNodes && next.childNodes.length) {
                            allElements.push(next);
                            elements.push.apply(elements, splitText(next, key, splitOn, includePrevious, preserveWhitespace));
                            return;
                        }
                        var wholeText = next.wholeText || "";
                        var contents = wholeText.trim();
                        if (contents.length) {
                            if (wholeText[0] === " ") allElements.push(createText(" "));
                            each(contents.split(splitOn), (function(splitText, i) {
                                if (i && preserveWhitespace) allElements.push(createElement(F, "whitespace", " ", preserveWhitespace));
                                var splitEl = createElement(F, key, splitText);
                                elements.push(splitEl);
                                allElements.push(splitEl);
                            }));
                            if (wholeText[wholeText.length - 1] === " ") allElements.push(createText(" "));
                        }
                    }));
                    each(allElements, (function(el) {
                        appendChild(F, el);
                    }));
                    el.innerHTML = "";
                    appendChild(el, F);
                    return elements;
                }
                var _ = 0;
                function copy(dest, src) {
                    for (var k in src) dest[k] = src[k];
                    return dest;
                }
                var WORDS = "words";
                var wordPlugin = createPlugin(WORDS, _, "word", (function(el) {
                    return splitText(el, "word", /\s+/, 0, 1);
                }));
                var CHARS = "chars";
                var charPlugin = createPlugin(CHARS, [ WORDS ], "char", (function(el, options, ctx) {
                    var results = [];
                    each(ctx[WORDS], (function(word, i) {
                        results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
                    }));
                    return results;
                }));
                function Splitting(opts) {
                    opts = opts || {};
                    var key = opts.key;
                    return $(opts.target || "[data-splitting]").map((function(el) {
                        var ctx = el["🍌"];
                        if (!opts.force && ctx) return ctx;
                        ctx = el["🍌"] = {
                            el
                        };
                        var items = resolve(opts.by || getData(el, "splitting") || CHARS);
                        var opts2 = copy({}, opts);
                        each(items, (function(plugin) {
                            if (plugin.split) {
                                var pluginBy = plugin.by;
                                var key2 = (key ? "-" + key : "") + plugin.key;
                                var results = plugin.split(el, opts2, ctx);
                                key2 && index(el, key2, results);
                                ctx[pluginBy] = results;
                                el.classList.add(pluginBy);
                            }
                        }));
                        el.classList.add("splitting");
                        return ctx;
                    }));
                }
                function html(opts) {
                    opts = opts || {};
                    var parent = opts.target = createElement();
                    parent.innerHTML = opts.content;
                    Splitting(opts);
                    return parent.outerHTML;
                }
                Splitting.html = html;
                Splitting.add = add;
                function detectGrid(el, options, side) {
                    var items = $(options.matching || el.children, el);
                    var c = {};
                    each(items, (function(w) {
                        var val = Math.round(w[side]);
                        (c[val] || (c[val] = [])).push(w);
                    }));
                    return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
                }
                function byNumber(a, b) {
                    return a - b;
                }
                var linePlugin = createPlugin("lines", [ WORDS ], "line", (function(el, options, ctx) {
                    return detectGrid(el, {
                        matching: ctx[WORDS]
                    }, "offsetTop");
                }));
                var itemPlugin = createPlugin("items", _, "item", (function(el, options) {
                    return $(options.matching || el.children, el);
                }));
                var rowPlugin = createPlugin("rows", _, "row", (function(el, options) {
                    return detectGrid(el, options, "offsetTop");
                }));
                var columnPlugin = createPlugin("cols", _, "col", (function(el, options) {
                    return detectGrid(el, options, "offsetLeft");
                }));
                var gridPlugin = createPlugin("grid", [ "rows", "cols" ]);
                var LAYOUT = "layout";
                var layoutPlugin = createPlugin(LAYOUT, _, _, (function(el, opts) {
                    var rows = opts.rows = +(opts.rows || getData(el, "rows") || 1);
                    var columns = opts.columns = +(opts.columns || getData(el, "columns") || 1);
                    opts.image = opts.image || getData(el, "image") || el.currentSrc || el.src;
                    if (opts.image) {
                        var img = $("img", el)[0];
                        opts.image = img && (img.currentSrc || img.src);
                    }
                    if (opts.image) setProperty(el, "background-image", "url(" + opts.image + ")");
                    var totalCells = rows * columns;
                    var elements = [];
                    var container = createElement(_, "cell-grid");
                    while (totalCells--) {
                        var cell = createElement(container, "cell");
                        createElement(cell, "cell-inner");
                        elements.push(cell);
                    }
                    appendChild(el, container);
                    return elements;
                }));
                var cellRowPlugin = createPlugin("cellRows", [ LAYOUT ], "row", (function(el, opts, ctx) {
                    var rowCount = opts.rows;
                    var result = Array2D(rowCount);
                    each(ctx[LAYOUT], (function(cell, i, src) {
                        result[Math.floor(i / (src.length / rowCount))].push(cell);
                    }));
                    return result;
                }));
                var cellColumnPlugin = createPlugin("cellColumns", [ LAYOUT ], "col", (function(el, opts, ctx) {
                    var columnCount = opts.columns;
                    var result = Array2D(columnCount);
                    each(ctx[LAYOUT], (function(cell, i) {
                        result[i % columnCount].push(cell);
                    }));
                    return result;
                }));
                var cellPlugin = createPlugin("cells", [ "cellRows", "cellColumns" ], "cell", (function(el, opt, ctx) {
                    return ctx[LAYOUT];
                }));
                add(wordPlugin);
                add(charPlugin);
                add(linePlugin);
                add(itemPlugin);
                add(rowPlugin);
                add(columnPlugin);
                add(gridPlugin);
                add(layoutPlugin);
                add(cellRowPlugin);
                add(cellColumnPlugin);
                add(cellPlugin);
                return Splitting;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const modules_flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function functions_FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        var splitting = __webpack_require__(41);
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                    let uniqParams = uniqArray(Array.from(items).map((function(item) {
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    })));
                    uniqParams.forEach((uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter((function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        }));
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }));
                } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                    this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                    return;
                }
                if (paramsWatch.threshold === "prx") {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                this.observer = new IntersectionObserver(((entries, observer) => {
                    entries.forEach((entry => {
                        this.scrollWatcherCallback(entry, observer);
                    }));
                }), configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach((item => this.observer.observe(item)));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
            }
        }
        modules_flsModules.watcher = new ScrollWatcher({});
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        window["FLS"] = true;
        splitting();
        isWebp();
        menuInit();
    })();
})();
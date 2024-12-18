window.lazyLoadOptions = { elements_selector: ".lazy", threshold: 1200 };
window.addEventListener(
    "LazyLoad::Initialized",
    function (event) {
        window.lazyLoadInstance = event.detail.instance;
    },
    !1
);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.defaults({ ease: Linear.easeNone });
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
function Grow() {
    var self = this;
    this.desktop = {
        scrollTweenObject: null,
        animationActive: !1,
        animations: [],
        initScrollTween: function () {
            self.desktop.viewport = document.querySelector("#viewport");
            self.desktop.world = document.querySelector("#world");
            self.desktop.bee = document.querySelector("#bee");
            gsap.set(self.desktop.bee, { xPercent: -50, yPercent: -50 });
            self.desktop.setX = gsap.quickSetter(self.desktop.world, "x", "px");
            self.desktop.setY = gsap.quickSetter(self.desktop.world, "y", "px");
            self.desktop.setOrigin = gsap.quickSetter(self.desktop.world, "transformOrigin");
            self.desktop.beeProps = gsap.getProperty(self.desktop.bee);
        },  
        refreshScrollTween: function () {
            self.desktop.vw = window.innerWidth;
            self.desktop.vh = window.innerHeight;
            self.desktop.worldWidth = self.desktop.world.offsetWidth;
            self.desktop.worldHeight = self.desktop.world.offsetHeight;
            self.desktop.clampX = gsap.utils.clamp(0, self.desktop.worldWidth - self.desktop.vw);
            self.desktop.clampY = gsap.utils.clamp(0, self.desktop.worldHeight - self.desktop.vh);
            if ($("body").hasClass("scrollPathDisabled")) {
                return !1;
            }
            var progress = 0;
            if (self.desktop.scrollTweenObject != null) {
                progress = self.desktop.scrollTweenObject.progress();
                self.desktop.scrollTweenObject.totalProgress(0).clear();
            }
            self.desktop.scrollTweenObject = self.desktop.createScrollTween();
            self.desktop.scrollTweenObject.progress(progress);
        },
        createScrollTween: function () {
            var scrollTweenObject = gsap.timeline({
                scrollTrigger: {
                    trigger: "#viewport",
                    pin: "#viewport",
                    start: "top top",
                    id: "scene",
                    markers: true,
                    scrub: !0,
                    end: function () {
                        return "+=" + self.desktop.worldHeight;
                    },
                },
            });
            scrollTweenObject.to(self.desktop.bee, {
                motionPath: { path: "#scrollPath", align: "#scrollPath", autoRotate: !0, start: 1, end: 0 },
                ease: "linear",
                onUpdate: function () {
                    const x = self.desktop.beeProps("x");
                    const y = self.desktop.beeProps("y");
                    self.desktop.setOrigin(x + "px " + y + "px");
                    self.desktop.setX(-self.desktop.clampX(x - self.desktop.vw / 2));
                    self.desktop.setY(-self.desktop.clampY(y - self.desktop.vh / 2));
                },
            });
            return scrollTweenObject;
        },
        screen1: function () {
            var screen1 = new TimelineMax();
            screen1.fromTo("#line1_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 400 })
            .fromTo("#line1_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 600 });
            self.desktop.animations[1] = screen1;
            return screen1;
        },
        screen2: function () {
            var screen2 = new TimelineMax();
            screen2
                .fromTo("#line2_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 75 })
                .fromTo("#line2_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                .fromTo("#line2_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 425 })
                .fromTo("#line2_4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 })
                .fromTo("#line2_5", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 });
            screen2.cleanUpObjects = [];
            var criteria = document.querySelectorAll(".screen2__criteria__item");
            var criteriaDuration = 250 / (criteria.length * 4);
            criteria.forEach(function (each, index) {
                var iconBorder = each.querySelector(".screen2__criteria__item__icon__border");
                var iconTick = each.querySelector(".screen2__criteria__item__icon__tick");
                var text = each.querySelector(".screen2__criteria__item__text");
                var line = each.querySelector(".screen3__criteria__item__after__line");
                screen2.cleanUpObjects.push(iconBorder, iconTick, text, line);
                screen2
                    .fromTo(iconBorder, { drawSVG: "0%" }, { drawSVG: "100%", duration: criteriaDuration })
                    .fromTo(iconTick, { opacity: 0 }, { opacity: 1, duration: criteriaDuration })
                    .fromTo(text, { xPercent: 10, opacity: 0 }, { xPercent: 0, opacity: 1, duration: criteriaDuration })
                    .fromTo(line, { xPercent: 10, opacity: 0 }, { xPercent: 0, opacity: 1, duration: criteriaDuration });
            });
            screen2.fromTo(".screen2", {}, { duration: 0 });
            self.desktop.animations[2] = screen2;
            return screen2;
        },
        screen3: function () {
            var screen3 = new TimelineMax();
            screen3
                .fromTo("#line3_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 350 })
                .fromTo("#line3_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 225 })
                .fromTo("#line3_3", { drawSVG: "0%", fill: "none" }, { drawSVG: "100%", fill: "#ffbd62", duration: 225 })
                .fromTo("#line3_4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 });
            screen3.cleanUpObjects = ["#line3_3"];
            self.desktop.animations[3] = screen3;
            return screen3;
        },
        screen4: function () {
            var screen4 = new TimelineMax();
            screen4.cleanUpObjects = [];
            screen4
                .fromTo("#line4_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 65 })
                .fromTo("#line4_2-1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 75 })
                .fromTo("#line4_2-2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 500 })
                .fromTo("#line4_2-3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 75 })
                .fromTo("#line4_2-3__fill", { opacity: 0 }, { opacity: 1, duration: 10 }, "-=10");
            var kpiOne = document.querySelector(".screen4__kpi--one");
            if (kpiOne) {
                var kpiStrokePaths = kpiOne.querySelectorAll(".screen4__kpi__icon path");
                var fillPaths = kpiOne.querySelectorAll(".screen4__kpi__icon path.fill_path");
                var kpiText = kpiOne.querySelector(".screen4__kpi__text");
                screen4
                    .add("kpiOne")
                    .fromTo(kpiStrokePaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 40 })
                    .fromTo(fillPaths, { fill: "#ffffff" }, { fill: "#ffc107", duration: 40 }, "kpiOne")
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 40 }, "kpiOne");
                kpiStrokePaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                fillPaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                screen4.cleanUpObjects.push(kpiText);
            }
            screen4.fromTo("#line4_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 10 });
            var kpiTwo = document.querySelector(".screen4__kpi--two");
            if (kpiTwo) {
                var kpiStrokePaths = kpiTwo.querySelectorAll(".screen4__kpi__icon path");
                var fillPaths = kpiTwo.querySelectorAll(".screen4__kpi__icon path.fill_path");
                var kpiText = kpiTwo.querySelector(".screen4__kpi__text");
                screen4
                    .add("kpiTwo")
                    .fromTo(kpiStrokePaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 40 })
                    .fromTo(fillPaths, { fill: "#ffffff" }, { fill: "#ffc107", duration: 40 }, "kpiTwo")
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 40 }, "kpiTwo");
                kpiStrokePaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                fillPaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                screen4.cleanUpObjects.push(kpiText);
            }
            screen4.fromTo("#line4_4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 70 }).fromTo("#line4_4__fill", { opacity: 0 }, { opacity: 1, duration: 5 });
            var kpiThree = document.querySelector(".screen4__kpi--three");
            if (kpiThree) {
                var kpiStrokePaths = kpiThree.querySelectorAll(".screen4__kpi__icon path");
                var fillPaths = kpiThree.querySelectorAll(".screen4__kpi__icon path.fill_path");
                var kpiText = kpiThree.querySelector(".screen4__kpi__text");
                screen4
                    .add("kpiThree")
                    .fromTo(kpiStrokePaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 40 })
                    .fromTo(fillPaths, { fill: "#ffffff" }, { fill: "#ffc107", duration: 40 }, "kpiThree")
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 40 }, "kpiThree");
                kpiStrokePaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                fillPaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                screen4.cleanUpObjects.push(kpiText);
            }
            screen4.fromTo("#line4_5", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 });
            self.desktop.animations[4] = screen4;
            return screen4;
        },
        screen5: function () {
            var screen5 = new TimelineMax();
            screen5.fromTo("#line5_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }).fromTo("#line5_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 950 });
            self.desktop.animations[5] = screen5;
            return screen5;
        },
        screen6: function () {
            var screen6 = new TimelineMax();
            screen6.fromTo("#line6_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1000 });
            self.desktop.animations[6] = screen6;
            return screen6;
        },
        screen7: function () {
            var screen7 = new TimelineMax();
            screen7
                .add("group1")
                .fromTo("#line7_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 })
                .fromTo(".screen7-logo-border-1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group1+=100")
                .fromTo(".screen7-logo-border-2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group1+=100")
                .add("group2")
                .fromTo("#line7_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 350 })
                .fromTo(".screen7-logo-border-3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=150")
                .fromTo(".screen7-logo-border-4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=150")
                .fromTo(".screen7-logo-border-5", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=160")
                .fromTo(".screen7-logo-border-6", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=160")
                .fromTo(".screen7-logo-border-9", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=170")
                .fromTo(".screen7-logo-border-10", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=170")
                .fromTo(".screen7-logo-border-desktop-7", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=180")
                .fromTo(".screen7-logo-border-desktop-8", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=180")
                .fromTo(".screen7-logo-border-15", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=220")
                .fromTo(".screen7-logo-border-16", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group2+=220")
                .add("group3")
                .fromTo("#line7_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 350 })
                .fromTo(".screen7-logo-border-desktop-13", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=200")
                .fromTo(".screen7-logo-border-desktop-14", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=200")
                .fromTo(".screen7-logo-border-desktop-11", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=210")
                .fromTo(".screen7-logo-border-desktop-12", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=210")
                .fromTo(".screen7-logo-border-17", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=220")
                .fromTo(".screen7-logo-border-18", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=220")
                .fromTo(".screen7-logo-border-desktop-19", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=230")
                .fromTo(".screen7-logo-border-desktop-20", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=230")
                .fromTo(".screen7-logo-border-desktop-21", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=240")
                .fromTo(".screen7-logo-border-desktop-22", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, "group3+=240")
                .fromTo("#line7_4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 });
            screen7.cleanUpObjects = [
                ".screen7-logo-border-1",
                ".screen7-logo-border-2",
                ".screen7-logo-border-3",
                ".screen7-logo-border-4",
                ".screen7-logo-border-5",
                ".screen7-logo-border-6",
                ".screen7-logo-border-9",
                ".screen7-logo-border-10",
                ".screen7-logo-border-15",
                ,
                ".screen7-logo-border-16",
                ".screen7-logo-border-17",
                ".screen7-logo-border-18",
            ];
            self.desktop.animations[7] = screen7;
            return screen7;
        },
        screen8: function () {
            var screen8 = new TimelineMax();
            screen8
                .fromTo("#line8_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 400 })
                .fromTo("#line8_2", { drawSVG: "0%", fill: "#E8E8E8" }, { drawSVG: "100%", fill: "#ffbd62", duration: 400 })
                .fromTo("#line8_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 });
            screen8.cleanUpObjects = ["#line8_2"];
            self.desktop.animations[8] = screen8;
            return screen8;
        },
        screen9: function () {
            var screen9 = new TimelineMax();
            screen9.fromTo("#line9_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 });
            screen9.cleanUpObjects = [];
            var kpisList = document.querySelectorAll(".screen9__kpi");
            kpisList.forEach(function (kpi, index) {
                var kpiPaths = kpi.querySelectorAll(".screen9__kpi__icon path, .screen9__kpi__icon line, .screen9__kpi__icon circle, .screen9__kpi__icon rect");
                var fillPaths = kpi.querySelectorAll('.screen9__kpi__icon [fill="#fff"], .screen9__kpi__icon [fill="#ffffff"], .screen9__kpi__icon [fill="#ffc107"]');
                var kpiText = kpi.querySelector(".screen9__kpi__text span");
                var lineSelector = "#line9_" + (index + 2);
                var kpiLabel = "scr9Kpi" + index;
                var lineDuration = 25;
                if (index == 3) {
                    lineDuration = 100;
                }
                if (index == 7) {
                    lineDuration = 175;
                }
                screen9
                    .add(kpiLabel)
                    .fromTo(kpiPaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 25 })
                    .fromTo(fillPaths, { opacity: 0 }, { opacity: 1, duration: 25 }, kpiLabel)
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 25 }, kpiLabel)
                    .fromTo(lineSelector, { drawSVG: "0%" }, { drawSVG: "100%", duration: lineDuration });
                var textIndex = index + 1;
                var textSelectors = ".screen9__text-" + (textIndex * 2 + 1) + ", .screen9__text-" + (textIndex * 2 + 2);
                var texts = document.querySelectorAll(textSelectors);
                screen9.to(texts, { opacity: 1, pointerEvents: "auto", duration: 5 }, kpiLabel);
                screen9.to(texts, { opacity: 0, pointerEvents: "none", duration: 5 }, kpiLabel + "+=50");
                kpiPaths.forEach(function (item, index) {
                    screen9.cleanUpObjects.push(item);
                });
                fillPaths.forEach(function (item, index) {
                    screen9.cleanUpObjects.push(item);
                });
                texts.forEach(function (item, index) {
                    screen9.cleanUpObjects.push(item);
                });
                screen9.cleanUpObjects.push(kpiText, lineSelector);
            });
            screen9
                .fromTo(".screen9", {}, { duration: 75 })
                .fromTo("#line9_10", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                .fromTo("#line9_11", { drawSVG: "0%", fill: "#ffc107" }, { drawSVG: "100%", fill: "#ffbd62", duration: 75 })
                .fromTo("#line9_12", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 });
            screen9.fromTo(".screen9", {}, { duration: 25 });
            self.desktop.animations[9] = screen9;
            return screen9;
        },
        screen10: function () {
            var screen10 = new TimelineMax();
            screen10
                .fromTo("#line10_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 })
                .fromTo("#line10_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 })
                .fromTo("#line10_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 500 });
            self.desktop.animations[10] = screen10;
            return screen10;
        },
        screen11: function () {
            var screen11 = new TimelineMax();
            screen11.cleanUpObjects = [];
            screen11.fromTo("#line11_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 }).add("kpisStart").fromTo("#line11_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 700 });
            var eachKPIDelay = 75;
            var kpisList = document.querySelectorAll(".screen11__kpi");
            kpisList.forEach(function (kpi, index) {
                var startTime = Math.floor(index / 2) * eachKPIDelay;
                var startLabel = "kpisStart+=" + startTime;
                var kpiPaths = kpi.querySelectorAll(".screen11__kpi__icon path");
                var fillPathsWhite = kpi.querySelectorAll('.screen11__kpi__icon [fill="#fff"], .screen11__kpi__icon [fill="#ffffff"]');
                var fillPathsBlue = kpi.querySelectorAll('.screen11__kpi__icon [fill="#ffc107"]');
                screen11
                    .fromTo(kpiPaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 25 }, startLabel)
                    .fromTo(fillPathsBlue, { fill: "#ffffff" }, { fill: "#ffc107", duration: 25 }, startLabel)
                    .fromTo(fillPathsWhite, { fill: "none" }, { fill: "#ffffff", duration: 25 }, startLabel);
                kpiPaths.forEach(function (item, index) {
                    screen11.cleanUpObjects.push(item);
                });
                fillPathsWhite.forEach(function (item, index) {
                    screen11.cleanUpObjects.push(item);
                });
                fillPathsBlue.forEach(function (item, index) {
                    screen11.cleanUpObjects.push(item);
                });
            });
            self.desktop.animations[11] = screen11;
            return screen11;
        },
        screen12: function () {
            var screen12 = new TimelineMax();
            screen12.cleanUpObjects = [];
            screen12.fromTo("#line12_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 25 }).fromTo("#line12_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 });
            var kpisList = document.querySelectorAll(".screen12__kpi");
            kpisList.forEach(function (kpi, index) {
                var kpiPaths = kpi.querySelectorAll(".screen12__kpi__icon path");
                var fillPathsWhite = kpi.querySelectorAll('.screen12__kpi__icon [fill="#fff"], .screen12__kpi__icon [fill="#ffffff"]');
                var fillPathsBlue = kpi.querySelectorAll('.screen12__kpi__icon [fill="#ffc107"]');
                var lineSelector = "#line12_" + (index + 3);
                var kpiLabel = "scr11Kpi" + index;
                var lineDuration = 75;
                if (index == kpisList.length - 1) {
                    lineDuration = 175;
                }
                screen12
                    .add(kpiLabel)
                    .fromTo(kpiPaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 25 })
                    .fromTo(fillPathsBlue, { fill: "#ffffff" }, { fill: "#ffc107", duration: 25 }, kpiLabel)
                    .fromTo(fillPathsWhite, { fill: "#ffc107" }, { fill: "#ffffff", duration: 25 }, kpiLabel)
                    .fromTo(lineSelector, { drawSVG: "0%" }, { drawSVG: "100%", duration: lineDuration });
                if (index == kpisList.length - 1) {
                    screen12.fromTo(lineSelector + "_fill", { fill: "#ffc107" }, { fill: "#ffbd62", duration: 25 }, "-=75");
                }
                kpiPaths.forEach(function (item, index) {
                    screen12.cleanUpObjects.push(item);
                });
                fillPathsWhite.forEach(function (item, index) {
                    screen12.cleanUpObjects.push(item);
                });
                fillPathsBlue.forEach(function (item, index) {
                    screen12.cleanUpObjects.push(item);
                });
                screen12.cleanUpObjects.push(lineSelector);
            });
            screen12.fromTo(".screen12", {}, { duration: 75 });
            self.desktop.animations[12] = screen12;
            return screen12;
        },
        screen13: function () {
            var screen13 = new TimelineMax();
            screen13
                .fromTo("#line13_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 })
                .fromTo("#line13_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 })
                .fromTo("#line13_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 700 });
            screen13.fromTo(".screen13", {}, { duration: 50 });
            self.desktop.animations[13] = screen13;
            return screen13;
        },
        screen14: function () {
            var screen14 = new TimelineMax();
            screen14.fromTo("#line14_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 }).fromTo("#line14_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 900 });
            self.desktop.animations[14] = screen14;
            return screen14;
        },
        screen15: function () {
            var screen15 = new TimelineMax();
            screen15
                .fromTo("#line15_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 75 })
                .fromTo("#line15_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 825 })
                .fromTo("#line15_4", { drawSVG: "0%", fill: "#ffc107" }, { drawSVG: "100%", fill: "#ffbd62", duration: 100 });
            screen15.cleanUpObjects = ["#line15_4"];
            self.desktop.animations[15] = screen15;
            return screen15;
        },
        registerAnimations: function () {
            var master = gsap.timeline({
                scrollTrigger: {
                    trigger: ".scene1",
                    id: "main",
                    scrub: !0,
                    start: "top top",
                    end: function () {
                        return "+=" + self.desktop.worldHeight;
                    },
                },
            });
            var screen1 = self.desktop.screen1();
            var screen2 = self.desktop.screen2();
            var screen3 = self.desktop.screen3();
            var screen4 = self.desktop.screen4();
            var screen5 = self.desktop.screen5();
            var screen6 = self.desktop.screen6();
            var screen7 = self.desktop.screen7();
            var screen8 = self.desktop.screen8();
            var screen9 = self.desktop.screen9();
            var screen10 = self.desktop.screen10();
            var screen11 = self.desktop.screen11();
            var screen12 = self.desktop.screen12();
            var screen13 = self.desktop.screen13();
            var screen14 = self.desktop.screen14();
            var screen15 = self.desktop.screen15();
            screen1.duration(350);
            screen2.duration(1250);
            screen3.duration(1000);
            screen4.duration(1100);
            screen5.duration(650);
            screen6.duration(300);
            screen7.duration(700);
            screen8.duration(200);
            screen9.duration(2600);
            screen10.duration(350);
            screen11.duration(1600);
            screen12.duration(1250);
            screen13.duration(2100);
            screen14.duration(600);
            screen15.duration(800);
            var buffer = new TimelineMax();
            buffer.fromTo(".screen15", {}, { duration: 1000 });
            buffer.duration(200);
            master.add(screen1, "screen1");
            master.add(screen2, "screen2");
            master.add(screen3, "screen3");
            master.add(screen4, "screen4");
            master.add(screen5, "screen5");
            master.add(screen6, "screen6");
            master.add(screen7, "screen7");
            master.add(screen8, "screen8");
            master.add(screen9, "screen9");
            master.add(screen10, "screen10");
            master.add(screen11, "screen11");
            master.add(screen12, "screen12");
            master.add(screen13, "screen13");
            master.add(screen14, "screen14");
            master.add(screen15, "screen15");
            master.add(buffer, "buffer");
            master.fromTo(
                ".contact-options",
                {
                    xPercent: -100,
                    onStart: function () {
                        gsap.set(".contact-options", { className: "contact-options anim-initialized" });
                    },
                },
                { xPercent: 0, duration: 100 },
                "screen2+=10"
            );
            self.desktop.master = master;
            self.desktop.animationActive = !0;
            if (document.body.className.indexOf("laInit") !== -1) {
                document.body.className += " laInit";
            }
            document.body.classList.add("laInit");
            return master;
        },
        killAnimations: function () {
            if (self.desktop.scrollTweenObject != null) {
                self.desktop.scrollTweenObject.totalProgress(0).clear();
                self.desktop.scrollTweenObject.scrollTrigger.kill(!0);
                self.desktop.scrollTweenObject.kill();
            }
            self.desktop.master.scrollTrigger.kill(!0);
            self.desktop.master.kill(!0);
            gsap.set(self.desktop.viewport, { clearProps: !0 });
            gsap.set(self.desktop.world, { clearProps: !0 });
            self.desktop.animations.forEach(function (item, index) {
                if (typeof self.desktop.animations[index].cleanUpObjects != "undefined") {
                    gsap.set(self.desktop.animations[index].cleanUpObjects, { clearProps: !0 });
                }
            });
            self.desktop.animationActive = !1;
        },
    };

    // Mobile Animtion 

    
    (this.mobile = {
        animationActive: !1,
        animations: [],
        screen1Animations: function () {
            var screen1 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen1", scrub: !0, start: "top top", end: "bottom center", id: "screen1" } })
                .fromTo("#mline1_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 400 })
                .fromTo("#mline1_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 500 })
                .fromTo("#mline1_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 });
            self.mobile.animations[1] = screen1;
        },
        screen2Animations: function () {
            var screen2 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen2", scrub: !0, start: "top center", end: "bottom center", id: "screen2" } })
                .fromTo("#mline2_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 300 })
                .fromTo("#mline2_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                .fromTo("#mline2_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 300 });
            screen2.cleanUpObjects = [];
            var criteria = document.querySelectorAll(".screen2__criteria__item");
            var criteriaDuration = 300 / (criteria.length * 4);
            criteria.forEach(function (each, index) {
                var iconBorder = each.querySelector(".screen2__criteria__item__icon__border");
                var iconTick = each.querySelector(".screen2__criteria__item__icon__tick");
                var text = each.querySelector(".screen2__criteria__item__text");
                var line = each.querySelector(".screen3__criteria__item__after__line");
                screen2.cleanUpObjects.push(iconBorder, iconTick, text, line);
                screen2
                    .fromTo(iconBorder, { drawSVG: "0%" }, { drawSVG: "100%", duration: criteriaDuration })
                    .fromTo(iconTick, { opacity: 0 }, { opacity: 1, duration: criteriaDuration })
                    .fromTo(text, { xPercent: 10, opacity: 0 }, { xPercent: 0, opacity: 1, duration: criteriaDuration })
                    .fromTo(line, { xPercent: 10, opacity: 0 }, { xPercent: 0, opacity: 1, duration: criteriaDuration });
            });
            self.mobile.animations[2] = screen2;
        },
        screen3Animations: function () {
            var screen3 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen3", scrub: !0, start: "top center", end: "bottom center", id: "screen3" } })
                .fromTo("#mline3_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 })
                .fromTo("#mline3_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 })
                .fromTo("#line3_3", { drawSVG: "0%", fill: "none" }, { drawSVG: "100%", fill: "#ffbd62", duration: 250 })
                .fromTo("#mline3_4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 });
            screen3.cleanUpObjects = ["#line3_3"];
            self.mobile.animations[3] = screen3;
        },
        screen4Animations: function () {
            var screen4 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen4", scrub: !0, start: "top center", end: "bottom center", id: "screen4" } })
                .fromTo("#mline4_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 })
                .fromTo("#mline4_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 })
                .fromTo("#mline4_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 300 })
                .fromTo("#mline4_3__fill", { opacity: 0 }, { opacity: 1, duration: 50 });
            screen4.cleanUpObjects = [];
            var kpiOne = document.querySelector(".screen4__kpi--one");
            if (kpiOne) {
                var kpiStrokePaths = kpiOne.querySelectorAll(".screen4__kpi__icon path");
                var fillPaths = kpiOne.querySelectorAll(".screen4__kpi__icon path.fill_path");
                var kpiText = kpiOne.querySelector(".screen4__kpi__text");
                screen4
                    .add("kpiOne")
                    .fromTo(kpiStrokePaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                    .fromTo(fillPaths, { fill: "#ffffff" }, { fill: "#ffc107", duration: 100 }, "kpiOne")
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 100 }, "kpiOne");
                kpiStrokePaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                }); 
                fillPaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                screen4.cleanUpObjects.push(kpiText);
            }
            screen4.fromTo("#mline4_4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 });
            var kpiTwo = document.querySelector(".screen4__kpi--two");
            if (kpiTwo) {
                var kpiStrokePaths = kpiTwo.querySelectorAll(".screen4__kpi__icon path");
                var fillPaths = kpiTwo.querySelectorAll(".screen4__kpi__icon path.fill_path");
                var kpiText = kpiTwo.querySelector(".screen4__kpi__text");
                screen4
                    .add("kpiTwo")
                    .fromTo(kpiStrokePaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                    .fromTo(fillPaths, { fill: "#ffffff" }, { fill: "#ffc107", duration: 100 }, "kpiTwo")
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 100 }, "kpiTwo");
                kpiStrokePaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                fillPaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                screen4.cleanUpObjects.push(kpiText);
            }
            screen4.fromTo("#mline4_5", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 }).fromTo("#mline4_5__fill", { opacity: 0 }, { opacity: 1, duration: 50 });
            var kpiThree = document.querySelector(".screen4__kpi--three");
            if (kpiThree) {
                var kpiStrokePaths = kpiThree.querySelectorAll(".screen4__kpi__icon path");
                var fillPaths = kpiThree.querySelectorAll(".screen4__kpi__icon path.fill_path");
                var kpiText = kpiThree.querySelector(".screen4__kpi__text");
                screen4
                    .add("kpiThree")
                    .fromTo(kpiStrokePaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                    .fromTo(fillPaths, { fill: "#ffffff" }, { fill: "#ffc107", duration: 100 }, "kpiThree")
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 100 }, "kpiThree");
                kpiStrokePaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                fillPaths.forEach(function (item, index) {
                    screen4.cleanUpObjects.push(item);
                });
                screen4.cleanUpObjects.push(kpiText);
            }
            screen4.fromTo("#mline4_6", { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 });
            self.mobile.animations[4] = screen4;
        },
        screen5Animations: function () {
            var screen5 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen5", scrub: !0, start: "top center", end: "bottom center", id: "screen5" } })
                .fromTo("#mline5_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                .fromTo("#mline5_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 900 });
            self.mobile.animations[5] = screen5;
        },
        screen6Animations: function () {
            var screen6 = gsap.timeline({ scrollTrigger: { trigger: ".screen6", scrub: !0, start: "top center", end: "bottom center", id: "screen6" } }).fromTo("#mline6_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1000 });
            self.mobile.animations[6] = screen6;
        },
        screen7Animations: function () {
            var screen7 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen7", scrub: !0, start: "top center", end: "bottom center", id: "screen7" } })
                .fromTo("#mline7_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1100 })
                .fromTo(".screen7-logo-border-1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 50)
                .fromTo(".screen7-logo-border-2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 50)
                .fromTo(".screen7-logo-border-3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 75)
                .fromTo(".screen7-logo-border-4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 75)
                .fromTo(".screen7-logo-border-5", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 125)
                .fromTo(".screen7-logo-border-6", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 125)
                .fromTo(".screen7-logo-border-mobile-7", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 175)
                .fromTo(".screen7-logo-border-mobile-8", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 175)
                .fromTo(".screen7-logo-border-9", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 200)
                .fromTo(".screen7-logo-border-10", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 200)
                .fromTo(".screen7-logo-border-mobile-11", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 225)
                .fromTo(".screen7-logo-border-mobile-12", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 225)
                .fromTo(".screen7-logo-border-mobile-13", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 300)
                .fromTo(".screen7-logo-border-mobile-14", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 300)
                .fromTo(".screen7-logo-border-15", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 400)
                .fromTo(".screen7-logo-border-16", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 400)
                .fromTo(".screen7-logo-border-17", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 600)
                .fromTo(".screen7-logo-border-18", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 600)
                .fromTo(".screen7-logo-border-mobile-19", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 675)
                .fromTo(".screen7-logo-border-mobile-20", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 675)
                .fromTo(".screen7-logo-border-mobile-21", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 775)
                .fromTo(".screen7-logo-border-mobile-22", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 }, 775);
            screen7.cleanUpObjects = [
                ".screen7-logo-border-1",
                ".screen7-logo-border-2",
                ".screen7-logo-border-3",
                ".screen7-logo-border-4",
                ".screen7-logo-border-5",
                ".screen7-logo-border-6",
                ".screen7-logo-border-9",
                ".screen7-logo-border-10",
                ".screen7-logo-border-15",
                ,
                ".screen7-logo-border-16",
                ".screen7-logo-border-17",
                ".screen7-logo-border-18",
            ];
            self.mobile.animations[7] = screen7;
        },
        screen8Animations: function () {
            var screen8 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen8", scrub: !0, start: "top center", end: "bottom center", id: "screen8" } })
                .fromTo("#mline8_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 400 })
                .fromTo("#line8_2", { drawSVG: "0%", fill: "#E8E8E8" }, { drawSVG: "100%", fill: "#ffbd62", duration: 400 })
                .fromTo("#mline8_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 });
            screen8.cleanUpObjects = ["#line8_2"];
            self.mobile.animations[8] = screen8;
        },
        screen9Animations: function () {
            var screen9 = gsap.timeline({ scrollTrigger: { trigger: ".screen9", scrub: !0, start: "top center", end: "bottom center", id: "screen9" } }).fromTo("#mline9_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 300 });
            screen9.cleanUpObjects = [];
            var kpisList = document.querySelectorAll(".screen9__kpi");
            kpisList.forEach(function (kpi, index) {
                var kpiPaths = kpi.querySelectorAll(".screen9__kpi__icon path, .screen9__kpi__icon line, .screen9__kpi__icon circle, .screen9__kpi__icon rect");
                var fillPaths = kpi.querySelectorAll('.screen9__kpi__icon [fill="#fff"], .screen9__kpi__icon [fill="#ffffff"], .screen9__kpi__icon [fill="#ffc107"]');
                var kpiText = kpi.querySelector(".screen9__kpi__text span");
                var lineSelector = "#mline9_" + (index + 2);
                var kpiLabel = "scr9Kpi" + index;
                screen9
                    .add(kpiLabel)
                    .fromTo(kpiPaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 })
                    .fromTo(fillPaths, { opacity: 0 }, { opacity: 1, duration: 100 }, kpiLabel)
                    .fromTo(kpiText, { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 100 }, kpiLabel)
                    .fromTo(lineSelector, { drawSVG: "0%" }, { drawSVG: "100%", duration: 200 });
                kpiPaths.forEach(function (item, index) {
                    screen9.cleanUpObjects.push(item);
                });
                fillPaths.forEach(function (item, index) {
                    screen9.cleanUpObjects.push(item);
                });
                screen9.cleanUpObjects.push(kpiText, lineSelector);
            });
            self.mobile.animations[9] = screen9;
        },
        screen10Animations: function () {
            var screen10 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen10", scrub: !0, start: "top center", end: "bottom center", id: "screen10" } })
                .fromTo("#mline10_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 })
                .fromTo("#mline10_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 })
                .fromTo("#mline10_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 500 });
            self.mobile.animations[10] = screen10;
        },
        screen11Animations: function () {
            var screen11 = gsap.timeline({ scrollTrigger: { trigger: ".screen11", scrub: !0, start: "top center", end: "bottom center", id: "screen11" } }).fromTo("#mline11_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 });
            screen11.cleanUpObjects = [];
            var kpisList = document.querySelectorAll(".screen11__kpi");
            kpisList.forEach(function (kpi, index) {
                var kpiPaths = kpi.querySelectorAll(".screen11__kpi__icon path");
                var fillPathsWhite = kpi.querySelectorAll('.screen11__kpi__icon [fill="#fff"], .screen11__kpi__icon [fill="#ffffff"]');
                var fillPathsBlue = kpi.querySelectorAll('.screen11__kpi__icon [fill="#ffc107"]');
                var lineSelector = "#mline11_" + (index + 2);
                var kpiLabel = "scr11Kpi" + index;
                var lineDuration = 75;
                if (index == kpisList.length - 1) {
                    lineDuration = 100;
                }
                screen11
                    .add(kpiLabel)
                    .fromTo(kpiPaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 25 })
                    .fromTo(fillPathsBlue, { fill: "#ffffff" }, { fill: "#ffc107", duration: 25 }, kpiLabel)
                    .fromTo(fillPathsWhite, { fill: "none" }, { fill: "#ffffff", duration: 25 }, kpiLabel)
                    .fromTo(lineSelector, { drawSVG: "0%" }, { drawSVG: "100%", duration: lineDuration });
                kpiPaths.forEach(function (item, index) {
                    screen11.cleanUpObjects.push(item);
                });
                fillPathsWhite.forEach(function (item, index) {
                    screen11.cleanUpObjects.push(item);
                });
                fillPathsBlue.forEach(function (item, index) {
                    screen11.cleanUpObjects.push(item);
                });
                screen11.cleanUpObjects.push(lineSelector);
            });
            self.mobile.animations[11] = screen11;
        },
        screen12Animations: function () {
            var screen12 = gsap.timeline({ scrollTrigger: { trigger: ".screen12", scrub: !0, start: "top center", end: "bottom center", id: "screen12" } }).fromTo("#mline12_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 100 });
            screen12.cleanUpObjects = [];
            var kpisList = document.querySelectorAll(".screen12__kpi");
            kpisList.forEach(function (kpi, index) {
                var kpiPaths = kpi.querySelectorAll(".screen12__kpi__icon path");
                var fillPathsWhite = kpi.querySelectorAll('.screen12__kpi__icon [fill="#fff"], .screen12__kpi__icon [fill="#ffffff"]');
                var fillPathsBlue = kpi.querySelectorAll('.screen12__kpi__icon [fill="#ffc107"]');
                var lineSelector = "#mline12_" + (index + 2);
                var kpiLabel = "scr12Kpi" + index;
                var lineDuration = 75;
                if (index == kpisList.length - 1) {
                    lineDuration = 100;
                }
                screen12
                    .add(kpiLabel)
                    .fromTo(kpiPaths, { drawSVG: "0%" }, { drawSVG: "100%", duration: 25 })
                    .fromTo(fillPathsBlue, { fill: "#ffffff" }, { fill: "#ffc107", duration: 25 }, kpiLabel)
                    .fromTo(fillPathsWhite, { fill: "#ffc107" }, { fill: "#ffffff", duration: 25 }, kpiLabel)
                    .fromTo(lineSelector, { drawSVG: "0%" }, { drawSVG: "100%", duration: lineDuration });
                if (index == kpisList.length - 1) {
                    screen12.fromTo(lineSelector + "_fill", { fill: "#ffc107" }, { fill: "#ffbd62", duration: 25 }, "-=50");
                }
                kpiPaths.forEach(function (item, index) {
                    screen12.cleanUpObjects.push(item);
                });
                fillPathsWhite.forEach(function (item, index) {
                    screen12.cleanUpObjects.push(item);
                });
                fillPathsBlue.forEach(function (item, index) {
                    screen12.cleanUpObjects.push(item);
                });
                screen12.cleanUpObjects.push(lineSelector);
            });
            self.mobile.animations[12] = screen12;
        },
        screen13Animations: function () {
            var screen13 = gsap.timeline({ scrollTrigger: { trigger: ".screen13", scrub: !0, start: "top center", end: "bottom center", id: "screen13" } }).fromTo("#mline13_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 });
            screen13.cleanUpObjects = [];
            self.mobile.animations[13] = screen13;
        },
        screen14Animations: function () {
            var screen14 = gsap.timeline({ scrollTrigger: { trigger: ".screen14", scrub: !0, start: "top center", end: "bottom center", id: "screen14" } }).fromTo("#mline14_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 250 });
            screen14.cleanUpObjects = [];
            self.mobile.animations[14] = screen14;
        },
        screen15Animations: function () {
            var screen15 = gsap
                .timeline({ scrollTrigger: { trigger: ".screen15", scrub: !0, start: "top center", end: "bottom bottom", id: "screen15" } })
                .fromTo("#mline15_1", { drawSVG: "0%" }, { drawSVG: "100%", duration: 150 })
                .fromTo("#mline15_2", { drawSVG: "0%" }, { drawSVG: "100%", duration: 50 })
                .fromTo("#mline15_3", { drawSVG: "0%" }, { drawSVG: "100%", duration: 600 })
                .fromTo("#line15_4", { drawSVG: "0%", fill: "#ffc107" }, { drawSVG: "100%", fill: "#ffbd62", duration: 200 })
                .fromTo(".screen15", {}, { duration: 50 });
            screen15.cleanUpObjects = ["#line15_4"];
            self.mobile.animations[15] = screen15;
        },
        registerAnimations: function () {
            self.mobile.screen1Animations();
            self.mobile.screen2Animations();
            self.mobile.screen3Animations();
            self.mobile.screen4Animations();
            self.mobile.screen5Animations();
            self.mobile.screen6Animations();
            self.mobile.screen7Animations();
            self.mobile.screen8Animations();
            self.mobile.screen9Animations();
            self.mobile.screen10Animations();
            self.mobile.screen11Animations();
            self.mobile.screen12Animations();
            self.mobile.screen13Animations();
            self.mobile.screen14Animations();
            self.mobile.screen15Animations();
            self.mobile.animationActive = !0;
            if (document.body.className.indexOf("laInit") !== -1) {
                document.body.className += " laInit";
            }
            document.body.classList.add("laInit");
        },
        killAnimations: function () {
            self.mobile.animations.forEach(function (item, index) {
                if (self.mobile.animations[index].scrollTrigger != null) {
                    self.mobile.animations[index].scrollTrigger.kill(!0);
                }
                self.mobile.animations[index].kill(!0);
                if (typeof self.mobile.animations[index].cleanUpObjects != "undefined") {
                    gsap.set(self.mobile.animations[index].cleanUpObjects, { clearProps: !0 });
                }
            });
            self.mobile.animationActive = !1;
        },
    }),

        (this.contact = {
            activeTab: 1,
            popUpOpen: !1,
            popUp: !1,
            // init: function () {
            //     self.contact.registerEvents();
            // },
            showPopUp: function () {
                self.contact.popUpOpen = !0;
                $("#contact-popup").addClass("open");
                setTimeout(function () {
                    $(".contact-popup__field__each[data-tab=1]").find(".contact-popup__field__input").eq(0).focus();
                }, 300);
            },
            closePopUp: function () {
                self.contact.popUpOpen = !1;
                $("#contact-popup").removeClass("open");
                setTimeout(function () {
                    if (self.contact.activeTab != 1) {
                        $(".contact-popup__fields").attr("data-active", 1);
                        $(".contact-popup__field__each").removeClass("done").removeClass("active");
                        $(".contact-popup__field__each[data-tab=1]").removeClass("done").addClass("active");
                        $(".contact-popup__back").removeClass("active");
                        $(".contact-popup__next").removeClass("final");
                        self.contact.activeTab = 1;
                    }
                    $(".contact-popup__content").show();
                    $(".contact-popup__result").hide();
                }, 300);
            },
            goBack: function () {
                if (self.contact.activeTab != 1) {
                    self.contact.switchToTab(self.contact.activeTab - 1);
                }
            },
            switchToTab: function (tab) {
                $(".contact-popup__fields").attr("data-active", tab);
                var currentTabDiv = $(".contact-popup__field__each.active");
                var activeTabDiv = $(".contact-popup__field__each[data-tab=" + tab + "]");
                if (self.contact.activeTab > tab) {
                    currentTabDiv.removeClass("active");
                    activeTabDiv.removeClass("done").addClass("active");
                } else {
                    currentTabDiv.addClass("done").removeClass("active");
                    activeTabDiv.addClass("active");
                }
                if (tab != 1) {
                    $(".contact-popup__back").addClass("active");
                } else {
                    $(".contact-popup__back").removeClass("active");
                }
                if (tab != 5) {
                    setTimeout(function () {
                        activeTabDiv.find(".contact-popup__field__input").eq(0).focus();
                    }, 300);
                }
                if (tab == 6) {
                    $(".contact-popup__next").addClass("final");
                } else {
                    $(".contact-popup__next").removeClass("final");
                }
                self.contact.activeTab = tab;
            },
            submitTab: function () {
                $(".contact-popup__next__btn").removeClass("field-error");
                if (self.contact.activeTab == 1) {
                    var input = $(".contact-popup__field__input[name=name]");
                    if (input.val().trim() == "") {
                        input.addClass("error");
                    } else {
                        self.contact.switchToTab(2);
                    }
                } else if (self.contact.activeTab == 2) {
                    var input = $(".contact-popup__field__input[name=email]");
                    var email = input.val();
                    var isemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
                    var unwantedEmailRegex = /^[a-z0-9](\.?[a-z0-9]){3,}@(g(oogle)?mail)|(hotmail)|(icloud)|(live)|(outlook)\.com$/i;
                    var isUnwanted = unwantedEmailRegex.test(email);
                    var formResult = $("#growthStrategyForm").find(".form-result");
                    if (!isemail) {
                        input.addClass("error");
                    } 
                    // else if (isUnwanted) {
                    //     input.addClass("error");
                    //     formResult.html("We're more likely to reply if you enter a work email address :)");
                    //     formResult.addClass("field-error").slideDown(300);
                    //     $(".contact-popup__next__btn").addClass("field-error");
                    // } 
                    else {
                        formResult.slideUp(300);
                        self.contact.switchToTab(3);
                    }
                } else if (self.contact.activeTab == 3) {
                    var input = $(".contact-popup__field__input[name=phone]");
                    var phoneNumber = input.val();
                    var isnum = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(phoneNumber);
                    if (!isnum) {
                        input.addClass("error");
                    } else {
                        self.contact.switchToTab(4);
                    }
                } 
                // else if (self.contact.activeTab == 4) {
                //     var input = $(".contact-popup__field__input[name=company]");
                //     if (input.val().trim() == "") {
                //         input.addClass("error");
                //     } else {
                //         self.contact.switchToTab(5);
                //     }
                // } 
                else if (self.contact.activeTab == 4) {
                    self.contact.switchToTab(6);
                }
            },
            submitForm: function (formElement) {
                if (self.contact.activeTab != 6) {
                    return !1;
                }
                var form = $(formElement);
                var formResult = form.find(".form-result");
                var formContent = form.find(".form-content");
                var submitBtn = form.find(".submit-btn");
                formResult.removeClass("field-error").slideUp(300);
                var data = form.serialize();
                var original = submitBtn.attr("data-original");
                        var sending = submitBtn.attr("data-sending");
                        submitBtn.val(sending);
                        submitBtn.attr("disabled", "disabled");
                        var noOfDots = 0;
                        var dot = ".";
                        var displayText = "";
                        var buttonDotInterval = setInterval(function () {
                            noOfDots = (noOfDots + 1) % 4;
                            displayText = sending + dot.repeat(noOfDots);
                            submitBtn.val(displayText);
                        }, 300);
                         $.post('https://pingmedia.in/landing/lead.php', data, function (response) {
                            response = JSON.parse(response);
                            console.log(response);
                            formResult.html(response.info);
                            clearInterval(buttonDotInterval);
                            if (response.status) {
                                form[0].reset();
                                formContent.slideUp(300);
                            } else {
                                formResult.addClass("field-error");
                            }
                            formResult.slideDown(300);
                            submitBtn.val(original);
                            submitBtn.removeAttr("disabled");
                        });
                // grecaptcha.ready(function () {
                //     grecaptcha.execute(captchaSiteKey, { action: "submit" }).then(function (token) {
                        
                //         data.grecToken = token;
                        
                       
                //     });
                // });
            },
            registerEvents: function () {
                if (typeof $ != undefined) {
                    // var grecaptchaScriptAdded = !1;
                    // function addGrepcaptchaScript() {
                    //     if (!grecaptchaScriptAdded) {
                    //         grecaptchaScriptAdded = !0;
                    //         var cb = null;
                    //         var src = "https://www.google.com/recaptcha/api.js?render=" + captchaSiteKey;
                    //         var jsId = btoa(src);
                    //         if (!document.getElementById(jsId)) {
                    //             var ref = window.document.getElementsByTagName("body")[0];
                    //             var script = window.document.createElement("script");
                    //             script.id = jsId;
                    //             script.type = "text/javascript";
                    //             script.src = src;
                    //             script.async = !0;
                    //             ref.appendChild(script);
                    //             if (cb && typeof cb === "function") {
                    //                 script.onload = cb;
                    //             }
                    //             return script;
                    //         }
                    //     } else {
                    //         $(document).off("focus", "form", addGrepcaptchaScript);
                    //     }
                    // }
                    // $(document).on("focus", "form", addGrepcaptchaScript);
                    $(document).on("click", ".show-contact-cta", function (e) {
                        var screen = $(this).attr("data-screen");
                        var text = $(this).text();
                        if (typeof screen != "undefined") {
                            $('#growthStrategyForm [name="fromScreen"]').val(screen);
                        } else {
                            $('#growthStrategyForm [name="fromScreen"]').val("");
                        }
                        if (typeof text != "undefined") {
                            text = text.trim();
                            $('#growthStrategyForm [name="linkText"]').val(text);
                        } else {
                            $('#growthStrategyForm [name="linkText"]').val("");
                        }
                        self.contact.showPopUp();
                    });
                    $(document).on("click", ".contact-popup__close", function (e) {
                        self.contact.closePopUp();
                    });
                    $(document).keydown(function (e) {
                        var keycode = event.keyCode ? event.keyCode : event.which;
                        if (keycode == "27") {
                            e.preventDefault();
                            self.contact.closePopUp();
                        }
                    });
                    $(document).on("click", ".contact-popup__back__btn", function (e) {
                        self.contact.goBack();
                    });
                    $(document).on("click", ".contact-popup__next__btn", function (e) {
                        self.contact.submitTab();
                    });
                    $(document).on("submit", "#growthStrategyForm", function (e) {
                        e.preventDefault();
                        self.contact.submitForm(this);
                    });
                    $(document).on("focus", ".contact-popup__field__input", function (e) {
                        $(this).removeClass("error");
                    });
                    $(document).keydown(".contact-popup__field__input", function (e) {
                        var keycode = event.keyCode ? event.keyCode : event.which;
                        if (keycode == "13") {
                            if (self.contact.activeTab != 6) {
                                e.preventDefault();
                                self.contact.submitTab();
                            }
                        }
                        if (keycode == "9") {
                            if (self.contact.activeTab != 6) {
                                e.preventDefault();
                                self.contact.submitTab();
                            }
                        }
                    });
                } else {
                    setTimeout(function () {
                        //self.contact.registerEvents();
                    }, 1000);
                }
            },
        });
}
var GrowObj = new Grow();
GrowObj.desktop.initScrollTween();
GrowObj.contact.registerEvents();
var onResize = debounce(function () {
    if (window.innerWidth <= 1120) {
        if (GrowObj.desktop.animationActive) {
            GrowObj.desktop.killAnimations();
        }
        if (!GrowObj.mobile.animationActive) {
            GrowObj.mobile.registerAnimations();
        }
    } else {
        GrowObj.desktop.refreshScrollTween();
        if (GrowObj.mobile.animationActive) {
            GrowObj.mobile.killAnimations();
        }
        if (!GrowObj.desktop.animationActive) {
            GrowObj.desktop.registerAnimations();
        }
    }
}, 300);
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
$.fn.serializeObject = function () {
    var self = this,
        json = {},
        push_counters = {},
        patterns = { validate: /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/, key: /[a-zA-Z0-9_]+|(?=\[\])/g, push: /^$/, fixed: /^\d+$/, named: /^[a-zA-Z0-9_]+$/ };
    this.build = function (base, key, value) {
        base[key] = value;
        return base;
    };
    this.push_counter = function (key) {
        if (push_counters[key] === undefined) {
            push_counters[key] = 0;
        }
        return push_counters[key]++;
    };
    $.each($(this).serializeArray(), function () {
        if (!patterns.validate.test(this.name)) {
            return;
        }
        var k,
            keys = this.name.match(patterns.key),
            merge = this.value,
            reverse_key = this.name;
        while ((k = keys.pop()) !== undefined) {
            reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), "");
            if (k.match(patterns.push)) {
                merge = self.build([], self.push_counter(reverse_key), merge);
            } else if (k.match(patterns.fixed)) {
                merge = self.build([], k, merge);
            } else if (k.match(patterns.named)) {
                merge = self.build({}, k, merge);
            }
        }
        json = $.extend(!0, json, merge);
    });
    return json;
};
window.addEventListener("resize", onResize);
onResize();
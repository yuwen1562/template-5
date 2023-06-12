$(document).ready(function () {
  rainBackground();
  brandTop5();
  top5Carousel()
  dash();
  salesTotal()
  salesAnalyze();
  circleLiquid();
  categorySale();
  shoesSaleChart();
  clothesSaleChart();
  hatsSaleChart();
  saleLineChart();
});

// 背景雨
function rainBackground() {
  const c = $(".rain")[0];
  const ctx = c.getContext("2d"); //取得canvas上下文
  const w = (c.width = window.innerWidth);
  const h = (c.height = window.innerHeight);
  //設置canvas寬、高

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function RainDrop() {}
  //雨滴對象(繪製雨滴動畫的關鍵)
  RainDrop.prototype = {
    init: function () {
      this.x = random(0, w); //雨滴的位置x
      this.y = h; //雨滴的位置y
      this.color = "hsl(180, 100%, 50%)"; //雨滴顏色(長方形的填充色)
      this.vy = random(4, 5); //雨滴落下速度
      this.hit = 0; //落下的最大值
      this.size = 2; //長方形寬度
    },
    draw: function () {
      if (this.y > this.hit) {
        const linearGradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x,
          this.y + this.size * 30
        );
        // 設置起始顏色
        linearGradient.addColorStop(0, "#14789c");
        // 設置終止顏色
        linearGradient.addColorStop(1, "#090723");
        // 設置填充樣式
        ctx.fillStyle = linearGradient;
        ctx.fillRect(this.x, this.y, this.size, this.size * 50); //繪製長方形，通過多次疊加長方形，形成雨滴落下效果
      }
      this.update(); //更新位置
    },
    update: function () {
      if (this.y > this.hit) {
        this.y -= this.vy; //未到達底部，增加雨滴y座標
      } else {
        this.init();
      }
    },
  };

  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  }

  //初始化一個雨滴

  let rs = [];
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      const r = new RainDrop();
      r.init();
      rs.push(r);
    }, i * 300);
  }

  function anim() {
    ctx.clearRect(0, 0, w, h); //填充背景色，注意不要用clearRect，否則會清空前面的雨滴，導致不能產生疊加效果
    for (let i = 0; i < rs.length; i++) {
      rs[i].draw(); //繪製雨滴
    }
    requestAnimationFrame(anim); //控制動畫幀
  }

  window.addEventListener("resize", resize);
  //啟動動畫
  anim();
}

//品牌銷售Top5(動態增加li + 塞資料)
function brandTop5() {
  for (let i = 0; i < 4; i++) {
    $("#record").clone().appendTo($(".top5 > ul")).removeAttr("id");

    for (let j = 0; j < top5Data.length; j++) {
      const obj = top5Data[j];
      // console.log("obj =", obj);
      const ele = $(".top5 > ul").children().eq(j).children().eq(1);
      // console.log("ele =", ele);
      if (ele.length == 0) continue;
      const brand = ele.find("> .brand").html(obj.brand);
      // console.log("brand =", brand)
      ele.find("> .count").html(obj.count);
      ele.find("> .percent").html(`${obj.percent}%`);
      if (obj.upAndDown == "up") {
        ele
          .find("> .upAndDown")
          .html(
            "<img style='vertical-align: unset' src='./img/up.png'></img>"
          );
      } else if (obj.upAndDown == "down") {
        ele.find("> .upAndDown").html("<img src='./img/down.png'></img>");
      } else console.log("upAndDown error");
    }
  }
}

//品牌銷售Top5(動態切換圖片產生輪播效果)
function top5Carousel(){
  console.log("$('.top5 > ul > li')",$('.top5 > ul > li'))
  const top5Ele = $('.top5 > ul > li')
  const top5EleLength = top5Ele.length
  let i = 0
  setInterval(function () {
    //被選取者改變成橘色
    top5Ele.eq(i).find('.greenCircle').css({
      'background': 'url(./img/orange.png) no-repeat center',
      'background-size': '100%'
    })
    top5Ele.eq(i).find('.greenBorder').css({
      'background': 'url(./img/border2.png) no-repeat center',
      'background-size': 'contain'
    })

    //其他改變回綠色
    top5Ele.eq(i).siblings().find('.greenCircle').css({
      'background': 'url(./img/green.png) no-repeat center',
      'background-size': '100%'
    })
    top5Ele.eq(i).siblings().find('.greenBorder').css({
      'background': 'url(./img/border.png) no-repeat center',
      'background-size': 'contain'
    })

    i++
    if (i == top5EleLength) {
        i = 0
    }
}, 3000)
}

// 中間虛線
function dash() {
  const canvas = $(".dash")[0];
  const ctx = canvas.getContext("2d");
  // console.log("$('.middle') =", $(".middle"));
  const w = (canvas.width = $(".middle")[0].clientWidth);
  const h = (canvas.height = ($(".middle")[0].clientHeight / 3) * 2);
  ctx.lineWidth = 3;
  ctx.setLineDash([3, 3]);
  ctx.fillStyle = "#93f8fb";
  ctx.shadowOffsetX = 0;
  // 陰影的Y偏移
  ctx.shadowOffsetY = 0;
  // 陰影顏色
  ctx.shadowColor = "#93f8fb";
  // 陰影的模糊半徑
  ctx.shadowBlur = 15;
  ctx.save(); //初始化

  // 繪製第一條曲線
  ctx.beginPath();
  const grid1 = ctx.createLinearGradient((w / 11) * 2, h / 3, (w / 5) * 2, h);
  grid1.addColorStop(0, "#54e2e6");
  grid1.addColorStop(1, "#065261");
  ctx.strokeStyle = grid1;
  ctx.moveTo((w / 5) * 2, h);
  ctx.quadraticCurveTo(w / 5, (h / 6) * 5, (w / 11) * 2, h / 3);
  ctx.stroke();

  // 繪製第一條曲線上的圓光效果
  ctx.beginPath();
  ctx.moveTo((w / 11) * 2, h / 3);
  ctx.arc((w / 11) * 2, h / 3, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();

  // 繪製第二條曲線
  ctx.beginPath();
  const grid2 = ctx.createLinearGradient(
    (w / 11) * 3.3,
    h / 2,
    (w / 3) * 1.1,
    (h / 6) * 5
  );
  grid2.addColorStop(0, "#e08d03");
  grid2.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grid2;
  ctx.moveTo((w / 3) * 1.1, (h / 6) * 5);
  ctx.quadraticCurveTo((w / 5) * 1.5, (h / 6) * 4.2, (w / 11) * 3.3, h / 2);
  ctx.stroke();

  //繪製第二條曲線上的圓光效果
  ctx.beginPath();
  ctx.moveTo((w / 11) * 3.3, h / 2);
  ctx.arc((w / 11) * 3.3, h / 2, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();

  //繪製第三條曲線
  ctx.beginPath();
  const grid3 = ctx.createLinearGradient(
    (w / 3) * 1.4,
    h / 5,
    (w / 5) * 2,
    h / 2
  );
  grid3.addColorStop(0, "#e08d03");
  grid3.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grid3;
  ctx.moveTo((w / 5) * 2, h / 2);
  ctx.quadraticCurveTo((w / 3) * 1.2, (h / 4) * 1.4, (w / 3) * 1.4, h / 5);
  ctx.stroke();

  //繪製第三條曲線上的圓光效果
  ctx.beginPath();
  ctx.moveTo((w / 3) * 1.4, h / 5);
  ctx.arc((w / 3) * 1.4, h / 5, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();

  //繪製第四條曲線
  ctx.beginPath();
  const grid4 = ctx.createLinearGradient(
    (w / 5) * 3.1,
    (h / 3) * 1.2,
    (w / 5) * 3.2,
    (h / 2) * 1.5
  );
  grid4.addColorStop(0, "#e08d03");
  grid4.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grid4;
  ctx.moveTo((w / 5) * 3.2, (h / 2) * 1.5);
  ctx.quadraticCurveTo(
    (w / 5) * 3.35,
    (h / 2) * 1.2,
    (w / 5) * 3.1,
    (h / 3) * 1.2
  );
  ctx.stroke();

  //繪製第四條曲線上的圓光效果
  ctx.beginPath();
  ctx.moveTo((w / 5) * 3.1, (h / 3) * 1.2);
  ctx.arc((w / 5) * 3.1, (h / 3) * 1.2, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();

  //繪製第五條曲線
  ctx.beginPath();
  const grid5 = ctx.createLinearGradient(
    (w / 5) * 3.3,
    h / 4,
    (w / 5) * 3.2,
    (h / 2) * 1.9
  );
  grid5.addColorStop(0, "#e08d03");
  grid5.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grid5;
  ctx.moveTo((w / 5) * 3.03, (h / 2) * 1.9);
  ctx.quadraticCurveTo((w / 5) * 3.8, (h / 2) * 1.2, (w / 5) * 3.3, h / 4);
  ctx.stroke();

  //繪製第五條曲線上的圓光效果
  ctx.beginPath();
  ctx.moveTo((w / 5) * 3.3, h / 4);
  ctx.arc((w / 5) * 3.3, h / 4, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();

  //繪製第六條曲線
  ctx.beginPath();
  const grid6 = ctx.createLinearGradient(
    (w / 5) * 3.8,
    (h / 2) * 1.2,
    (w / 5) * 2.9,
    h
  );
  grid6.addColorStop(0, "#e08d03");
  grid6.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grid6;
  ctx.moveTo((w / 5) * 2.9, h);
  ctx.quadraticCurveTo(
    (w / 5) * 3.7,
    (h / 2) * 1.6,
    (w / 5) * 3.8,
    (h / 2) * 1.2
  );
  ctx.stroke();

  //繪製第六條曲線上的圓光效果
  ctx.beginPath();
  ctx.moveTo((w / 5) * 3.8, (h / 2) * 1.2);
  ctx.arc((w / 5) * 3.8, (h / 2) * 1.2, 5, 0, Math.PI * 2);
  ctx.fill();
}

//中間數字
function salesTotal(){
  $('.saleYear > .saleNum').html(toCurrency(salesTotalData.totalYear))
  $('.saleMonth > .saleNum').html(toCurrency(salesTotalData.totalMonth))
  $('.saleWeek > .saleNum').html(toCurrency(salesTotalData.totalWeek))
  $('.saleDay > .saleNum').html(toCurrency(salesTotalData.totalDay))
  $('.cloud > .totelNum').html(toCurrency(salesTotalData.total))
}

//銷售分析
function salesAnalyze() {
  $("#targetNum").html(`$ ${toCurrency(salesAnalyzeData.target)}`).addClass("green");
  $("#actualNum").html(`$ ${toCurrency(salesAnalyzeData.actual)}`).addClass("orange");
  $("#totalNum").html(`$ ${toCurrency(salesAnalyzeData.total)}`).addClass("orange");
}

//數字轉千分位
function toCurrency(num){
  var parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

//水波圖
function circleLiquid() {
  const $this = $("#liquidChartLeft");
  const $this2 = $("#liquidChartRight");

  function liquidChart(el, index) {
    // console.log("this =", el);
    const width = $(el).data("width");
    const height = $(el).data("height");

    const radius = width / 2;

    const displayText = $(el).data("display-text");
    const numberCurrent = $(el).data("number-current");
    const numberMax = $(el).data("number-max");
    const displayPercent = $(el).data("display-percent");

    const circleColor = $(el).data("circle-color");
    const textColor = $(el).data("text-color");
    const waveTextColor = $(el).data("wave-text-color");
    const waveColor = $(el).data("wave-color");
    const borderWidth = $(el).data("border-width");
    const borderColor = $(el).data("border-color");
    const textVertPosition = $(el).data("text-vert-position");
    const textHorzPosition = $(el).data("text-horz-position");
    const waveAnimateTime = $(el).data("wave-animate-time");
    // var overlayImage = $(el).data("overlay-image");
    // var overlayImageHeight = $(el).data("overlay-image-height");
    // var overlayImageWidth = $(el).data("overlay-image-width");

    const chartPadding = $(el).data("chart-padding");
    /*off center in case a handle is ever given to a cup*/
    // console.log("chartPadding =", chartPadding);

    const options = {
      displayPercent: displayPercent,
      displayText: displayText,
      circleColor: circleColor,
      textColor: textColor,
      waveTextColor: waveTextColor,
      waveColor: waveColor,
      borderWidth: borderWidth,
      borderColor: borderColor,
      circleThickness: 0,
      textVertPosition: textVertPosition,
      textHorzPosition: textHorzPosition,
      waveAnimateTime: waveAnimateTime,
    };

    let config1 = liquidFillGaugeDefaultSettings();
    config1 = $.extend(config1, options);

    const chart = d3
      .select(el)
      .append("svg:svg")
      .attr("class", "chart")
      .attr("width", width)
      .attr("height", height)
      .style("padding", chartPadding + "px")
      .attr("id", "fillgauge" + index);

    chart
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", radius - 2)
      .attr("fill", circleColor)
      .attr("stroke", borderColor)
      .attr("stroke-width", borderWidth);

    loadLiquidFillGauge("fillgauge" + index, numberCurrent, numberMax, config1);
  }

  liquidChart($this[0], 0);
  liquidChart($this2[0], 1);

  function liquidFillGaugeDefaultSettings() {
    return {
      minValue: 0, // The gauge minimum value.
      maxValue: 100, // The gauge maximum value.
      circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
      circleFillGap: 0, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
      circleColor: "#178BCA", // The color of the outer circle.
      waveHeight: 0.3, // The wave height as a percentage of the radius of the wave circle.
      waveCount: 1, // The number of full waves per width of the wave circle.
      waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
      waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
      waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
      waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
      waveAnimate: true, // Controls if the wave scrolls or is static.
      waveColor: "#178BCA", // The color of the fill wave.
      waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
      textVertPosition: 0.5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
      textSize: 0.5, // The relative height of the text to display in the wave circle. 1 = 50%
      valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
      displayPercent: true, // If true, a % symbol is displayed after the value.
      textColor: "#045681", // The color of the value text when the wave does not overlap it.
      waveTextColor: "#A4DBf8", // The color of the value text when the wave overlaps it.
      borderWidth: 4,
      borderColor: "#0ac1c7",
    };
  }

  function loadLiquidFillGauge(elementId, numberCurrent, numberMax, config) {
    if (config == null) config = liquidFillGaugeDefaultSettings();

    //value as it is

    const value = (numberCurrent / numberMax) * 100;

    let textValue = numberCurrent;

    if (config.displayPercent) {
      textValue = (numberCurrent / numberMax) * 100;
    }

    const gauge = d3.select("#" + elementId);
    const radius =
      Math.min(
        parseInt(gauge.style("width")),
        parseInt(gauge.style("height"))
      ) / 2;
    const locationX = parseInt(gauge.style("width")) / 2 - radius;
    const locationY = parseInt(gauge.style("height")) / 2 - radius;
    const fillPercent =
      Math.max(config.minValue, Math.min(config.maxValue, value)) /
      config.maxValue;

    let waveHeightScale;
    if (config.waveHeightScaling) {
      waveHeightScale = d3
        .scaleSqrt()
        .range([0, config.waveHeight, 0])
        .domain([0, 50, 100]);
    } else {
      waveHeightScale = d3
        .scaleSqrt()
        .range([config.waveHeight, config.waveHeight])
        .domain([0, 100]);
    }

    const textPixels = (config.textSize * radius) / 2;
    const textFinalValue = parseFloat(textValue).toFixed(2);
    const textStartValue = config.valueCountUp
      ? config.minValue
      : textFinalValue;
    const percentText = config.displayPercent ? "%" : "";
    const circleThickness = config.circleThickness * radius;
    const circleFillGap = config.circleFillGap * radius;
    const fillCircleMargin = circleThickness + circleFillGap;
    const fillCircleRadius = radius - fillCircleMargin;
    const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

    const waveLength = (fillCircleRadius * 2) / config.waveCount;
    const waveClipCount = 1 + config.waveCount;
    const waveClipWidth = waveLength * waveClipCount;

    let text1;
    let text2;

    // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
    let textRounder = function (value) {
      return Math.round(value);
    };
    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
      textRounder = function (value) {
        return parseFloat(value).toFixed(1);
      };
    }
    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
      textRounder = function (value) {
        return parseFloat(value).toFixed(2);
      };
    }

    // Data for building the clip wave area.
    const data = [];
    for (let i = 0; i <= 40 * waveClipCount; i++) {
      data.push({ x: i / (40 * waveClipCount), y: i / 40 });
    }

    // Scales for drawing the outer circle.
    const gaugeCircleX = d3
      .scaleSqrt()
      .range([0, 2 * Math.PI])
      .domain([0, 1]);
    const gaugeCircleY = d3.scaleSqrt().range([0, radius]).domain([0, radius]);

    // Scales for controlling the size of the clipping path.
    const waveScaleX = d3
      .scaleLinear()
      .range([0, waveClipWidth])
      .domain([0, 1]);
    const waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);

    // Scales for controlling the position of the clipping path.
    const waveRiseScale = d3
      .scaleLinear()
      // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
      // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
      // circle at 100%.
      .range([
        fillCircleMargin + fillCircleRadius * 2 + waveHeight,
        fillCircleMargin - waveHeight,
      ])
      .domain([0, 1]);
    const waveAnimateScale = d3
      .scaleLinear()
      .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
      .domain([0, 1]);

    // Scale for controlling the position of the text within the gauge.
    const textRiseScaleY = d3
      .scaleLinear()
      .range([
        fillCircleMargin + fillCircleRadius * 2,
        fillCircleMargin + textPixels * 0.7,
      ])
      .domain([0, 1]);

    // Center the gauge within the parent SVG.
    const gaugeGroup = gauge
      .append("g")
      .attr("transform", "translate(" + locationX + "," + locationY + ")");

    // Draw the outer circle.
    // const gaugeCircleArc = d3.svg
    const gaugeCircleArc = d3
      .arc()
      .startAngle(gaugeCircleX(0))
      .endAngle(gaugeCircleX(1))
      .outerRadius(gaugeCircleY(radius))
      .innerRadius(gaugeCircleY(radius - circleThickness));
    gaugeGroup
      .append("path")
      .attr("d", gaugeCircleArc)
      .style("fill", config.circleColor)
      .style("stroke", config.bordercolor)
      .style("stroke-width", config.border)
      .attr("transform", "translate(" + radius + "," + radius + ")");

    const textLeftPlacement = parseInt(radius + config.textHorzPosition, 10);

    if (config.displayText) {
      // Text where the wave does not overlap.
      text1 = gaugeGroup
        .append("text")
        .text(textRounder(textStartValue) + percentText)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.textColor)
        .attr(
          "transform",
          "translate(" +
            textLeftPlacement +
            "," +
            textRiseScaleY(config.textVertPosition) +
            ")"
        );
    }

    // The clipping wave area.
    // const clipArea = d3.svg
    const clipArea = d3
      .area()
      .x(function (d) {
        return waveScaleX(d.x);
      })
      .y0(function (d) {
        return waveScaleY(
          Math.sin(
            Math.PI * 2 * config.waveOffset * -1 +
              Math.PI * 2 * (1 - config.waveCount) +
              d.y * 2 * Math.PI
          )
        );
      })
      .y1(function (d) {
        return fillCircleRadius * 2 + waveHeight;
      });
    const waveGroup = gaugeGroup
      .append("defs")
      .append("clipPath")
      .attr("id", "clipWave" + elementId);
    const wave = waveGroup
      .append("path")
      .datum(data)
      .attr("d", clipArea)
      .attr("T", 0);

    // The inner circle with the clipping wave attached.
    const fillCircleGroup = gaugeGroup
      .append("g")
      .attr("clip-path", "url(#clipWave" + elementId + ")");
    fillCircleGroup
      .append("circle")
      .attr("cx", radius)
      .attr("cy", radius)
      .attr("r", fillCircleRadius - 2)
      .style("fill", config.waveColor);

    if (config.displayText) {
      // Text where the wave does overlap.
      text2 = fillCircleGroup
        .append("text")
        .text(textRounder(textStartValue) + percentText)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.waveTextColor)
        .attr(
          "transform",
          "translate(" +
            textLeftPlacement +
            "," +
            textRiseScaleY(config.textVertPosition) +
            ")"
        );
    }

    // Make the value count up.
    if (config.valueCountUp) {
      const textTween = function () {
        const i = d3.interpolate(this.textContent, textFinalValue);
        return function (t) {
          this.textContent = textRounder(i(t)) + percentText;
        };
      };
      if (config.displayText) {
        text1
          .transition()
          .duration(config.waveRiseTime)
          .tween("text", textTween);
        text2
          .transition()
          .duration(config.waveRiseTime)
          .tween("text", textTween);
      }
    }

    // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
    const waveGroupXPosition =
      fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
    if (config.waveRise) {
      waveGroup
        .attr(
          "transform",
          "translate(" + waveGroupXPosition + "," + waveRiseScale(0) + ")"
        )
        .transition()
        .duration(config.waveRiseTime)
        .attr(
          "transform",
          "translate(" +
            waveGroupXPosition +
            "," +
            waveRiseScale(fillPercent) +
            ")"
        )
        .on("start", function () {
          wave.attr("transform", "translate(1,0)");
        }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
    } else {
      waveGroup.attr(
        "transform",
        "translate(" +
          waveGroupXPosition +
          "," +
          waveRiseScale(fillPercent) +
          ")"
      );
    }

    if (config.waveAnimate) animateWave();

    function animateWave() {
      wave.attr(
        "transform",
        "translate(" + waveAnimateScale(wave.attr("T")) + ",0)"
      );
      wave
        .transition()
        .duration(config.waveAnimateTime * (1 - wave.attr("T")))
        .ease(d3.easeLinear)
        .attr("transform", "translate(" + waveAnimateScale(1) + ",0)")
        .attr("T", 1)
        .on("end", function () {
          wave.attr("T", 0);
          animateWave(config.waveAnimateTime);
        });
    }

    function GaugeUpdater() {
      this.update = function (value) {
        const newFinalValue = parseFloat(value).toFixed(2);
        const textRounderUpdater = function (value) {
          return Math.round(value);
        };
        if (
          parseFloat(newFinalValue) !=
          parseFloat(textRounderUpdater(newFinalValue))
        ) {
          textRounderUpdater = function (value) {
            return parseFloat(value).toFixed(1);
          };
        }
        if (
          parseFloat(newFinalValue) !=
          parseFloat(textRounderUpdater(newFinalValue))
        ) {
          textRounderUpdater = function (value) {
            return parseFloat(value).toFixed(2);
          };
        }

        const textTween = function () {
          const i = d3.interpolate(
            this.textContent,
            parseFloat(value).toFixed(2)
          );
          return function (t) {
            this.textContent = textRounderUpdater(i(t)) + percentText;
          };
        };

        text1
          .transition()
          .duration(config.waveRiseTime)
          .tween("text", textTween);
        text2
          .transition()
          .duration(config.waveRiseTime)
          .tween("text", textTween);

        const fillPercent =
          Math.max(config.minValue, Math.min(config.maxValue, value)) /
          config.maxValue;
        const waveHeight =
          fillCircleRadius * waveHeightScale(fillPercent * 100);
        const waveRiseScale = d3
          .scaleLinear()
          // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
          // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
          // circle at 100%.
          .range([
            fillCircleMargin + fillCircleRadius * 2 + waveHeight,
            fillCircleMargin - waveHeight,
          ])
          .domain([0, 1]);
        const newHeight = waveRiseScale(fillPercent);
        const waveScaleX = d3
          .scaleLinear()
          .range([0, waveClipWidth])
          .domain([0, 1]);
        const waveScaleY = d3
          .scaleLinear()
          .range([0, waveHeight])
          .domain([0, 1]);
        let newClipArea;
        if (config.waveHeightScaling) {
          newClipArea = d3.svg
            .area()
            .x(function (d) {
              return waveScaleX(d.x);
            })
            .y0(function (d) {
              return waveScaleY(
                Math.sin(
                  Math.PI * 2 * config.waveOffset * -1 +
                    Math.PI * 2 * (1 - config.waveCount) +
                    d.y * 2 * Math.PI
                )
              );
            })
            .y1(function (d) {
              return fillCircleRadius * 2 + waveHeight;
            });
        } else {
          newClipArea = clipArea;
        }

        const newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
        wave
          .transition()
          .duration(0)
          .transition()
          .duration(
            config.waveAnimate
              ? config.waveAnimateTime * (1 - wave.attr("T"))
              : config.waveRiseTime
          )
          .ease(d3.easeLinear)
          .attr("d", newClipArea)
          .attr("transform", "translate(" + newWavePosition + ",0)")
          .attr("T", "1")
          .each("end", function () {
            if (config.waveAnimate) {
              wave.attr(
                "transform",
                "translate(" + waveAnimateScale(0) + ",0)"
              );
              animateWave(config.waveAnimateTime);
            }
          });
        waveGroup
          .transition()
          .duration(config.waveRiseTime)
          .attr(
            "transform",
            "translate(" + waveGroupXPosition + "," + newHeight + ")"
          );
      };
    }

    return new GaugeUpdater();
  }
}

//分類銷售分析-值
function categorySale() {
  $(".shoesNum").html(toCurrency(categorySales.shoes));
  $(".clothesNum").html(toCurrency(categorySales.clothes));
  $(".hatsNum").html(toCurrency(categorySales.hats));

  $(".shoes > .chartPercent").html(shoesSalesChartData[0].finish + "%");
  $(".clothes > .chartPercent").html(clothesSalesChartData[0].finish + "%");
  $(".hats > .chartPercent").html(hatsSalesChartData[0].finish + "%");
}

//分類銷售分析-鞋
function shoesSaleChart() {
  const root = am5.Root.new("shoesChart");

  // Set themes
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.horizontalLayout,
      arrangeTooltips: false,
    })
  );

  root._logo.dispose();

  // Create axes
  const yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
      }),
    })
  );

  const yRenderer = yAxis.get("renderer");
  yRenderer.grid.template.set("forceHidden", true);
  yRenderer.labels.template.set("forceHidden", true);

  yAxis.data.setAll(shoesSalesChartData);

  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      calculateTotals: true,
      min: 0,
      max: 100,
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 80,
      }),
    })
  );

  const xRenderer = xAxis.get("renderer");
  xRenderer.grid.template.set("forceHidden", true);
  xRenderer.labels.template.set("forceHidden", true);

  // Add series
  function createSeries(field, name, color, icon, inlegend) {
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        name: name,
        valueXField: field,
        categoryYField: "category",
        sequencedInterpolation: true,
        fill: color,
        stroke: color,
        clustered: false,
      })
    );

    series.columns.template.setAll({
      height: 50,
      fillOpacity: 0,
      strokeOpacity: 0,
    });

    if (icon) {
      series.columns.template.set(
        "fillPattern",
        am5.PathPattern.new(root, {
          color: color,
          repetition: "repeat-x",
          width: 25,
          height: 50,
          fillOpacity: 0,
          svgPath: icon,
        })
      );
    }

    series.data.setAll(shoesSalesChartData);
    series.appear();

    return series;
  }

  const finishColor = am5.color("#0ac1c7");
  const placeholderColor = am5.color(0xeeeeee);

  const finishIcon =
    "M11,11Q2,11,2,18L2,36Q2,44,11,44Q20,44,20,36L20,18Q20,11,11,11Z";

  createSeries("finishMax", "shoes", placeholderColor, finishIcon, false);
  createSeries("finish", "shoes", finishColor, finishIcon, true);

  // Make stuff animate on load
  chart.appear(1000, 100); //appear(持續時間-毫秒, 延遲時間-毫秒)
}

//分類銷售分析-衣
function clothesSaleChart() {
  const root = am5.Root.new("clothesChart");

  // Set themes
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.horizontalLayout,
      arrangeTooltips: false,
    })
  );

  root._logo.dispose();

  // Create axes
  const yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
      }),
    })
  );

  const yRenderer = yAxis.get("renderer");
  yRenderer.grid.template.set("forceHidden", true);
  yRenderer.labels.template.set("forceHidden", true);

  yAxis.data.setAll(clothesSalesChartData);

  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      calculateTotals: true,
      min: 0,
      max: 100,
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 80,
      }),
    })
  );

  const xRenderer = xAxis.get("renderer");
  xRenderer.grid.template.set("forceHidden", true);
  xRenderer.labels.template.set("forceHidden", true);

  // Add series
  function createSeries(field, name, color, icon, inlegend) {
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        name: name,
        valueXField: field,
        categoryYField: "category",
        sequencedInterpolation: true,
        fill: color,
        stroke: color,
        clustered: false,
      })
    );

    series.columns.template.setAll({
      height: 50,
      fillOpacity: 0,
      strokeOpacity: 0,
    });

    if (icon) {
      series.columns.template.set(
        "fillPattern",
        am5.PathPattern.new(root, {
          color: color,
          repetition: "repeat-x",
          width: 25,
          height: 50,
          fillOpacity: 0,
          svgPath: icon,
        })
      );
    }

    series.data.setAll(clothesSalesChartData);
    series.appear();

    return series;
  }

  const finishColor = am5.color("#0ac1c7");
  const placeholderColor = am5.color(0xeeeeee);

  const finishIcon =
    "M11,11Q2,11,2,18L2,36Q2,44,11,44Q20,44,20,36L20,18Q20,11,11,11Z";

  createSeries("finishMax", "clothes", placeholderColor, finishIcon, false);
  createSeries("finish", "clothes", finishColor, finishIcon, true);

  // Make stuff animate on load
  chart.appear(1000, 100); //appear(持續時間-毫秒, 延遲時間-毫秒)
}

//分類銷售分析-帽
function hatsSaleChart() {
  const root = am5.Root.new("hatsChart");

  // Set themes
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.horizontalLayout,
      arrangeTooltips: false,
    })
  );

  root._logo.dispose();

  // Create axes
  const yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
      }),
    })
  );

  const yRenderer = yAxis.get("renderer");
  yRenderer.grid.template.set("forceHidden", true);
  yRenderer.labels.template.set("forceHidden", true);

  yAxis.data.setAll(hatsSalesChartData);

  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      calculateTotals: true,
      min: 0,
      max: 100,
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 80,
      }),
    })
  );

  const xRenderer = xAxis.get("renderer");
  xRenderer.grid.template.set("forceHidden", true);
  xRenderer.labels.template.set("forceHidden", true);

  // Add series
  function createSeries(field, name, color, icon, inlegend) {
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        name: name,
        valueXField: field,
        categoryYField: "category",
        sequencedInterpolation: true,
        fill: color,
        stroke: color,
        clustered: false,
      })
    );

    series.columns.template.setAll({
      height: 50,
      fillOpacity: 0,
      strokeOpacity: 0,
    });

    if (icon) {
      series.columns.template.set(
        "fillPattern",
        am5.PathPattern.new(root, {
          color: color,
          repetition: "repeat-x",
          width: 25,
          height: 50,
          fillOpacity: 0,
          svgPath: icon,
        })
      );
    }

    series.data.setAll(hatsSalesChartData);
    series.appear();

    return series;
  }

  const finishColor = am5.color("#0ac1c7");
  const placeholderColor = am5.color(0xeeeeee);

  const finishIcon =
    "M11,11Q2,11,2,18L2,36Q2,44,11,44Q20,44,20,36L20,18Q20,11,11,11Z";

  createSeries("finishMax", "hats", placeholderColor, finishIcon, false);
  createSeries("finish", "hats", finishColor, finishIcon, true);

  // Make stuff animate on load
  chart.appear(1000, 100); //appear(持續時間-毫秒, 延遲時間-毫秒)
}

//右下
function saleLineChart() {
  Highcharts.chart("saleLineChart", {
    chart: {
      type: "area",
      backgroundColor: "rgba(0, 0, 0, 0)",
      height: "35%",
      width: "500",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
      title: {
        text: null,
      },
      labels: {
        style: {
          color: "#ffffff",
        },
      },
      lineWidth: 0,
    },
    yAxis: {
      labels: {
        style: {
          color: "#ffffff",
        },
      },
      title: {
        enabled: false,
      },
      gridLineWidth: 0,
      offset: -20, //y軸偏移量
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "{point.name}: {point.y}",
    },
    series: [
      {
        data: lineChartFakeData,
        color: {
          linearGradient: {
            x1: 1, //漸變的起始水平位置(0左,1右)
            x2: 1, //漸變的結束水平位置(0左,1右)
            y1: 0, //漸變的開始垂直位置(0頂,1底)
            y2: 1, //漸變的開始垂直位置(0頂,1底)
          },
          stops: [
            [0, "rgba(10, 193, 199,0.5)"], //開始
            [1, "rgba(10, 193, 199,0)"], //結束
          ],
        },
      },
    ],
  });
}

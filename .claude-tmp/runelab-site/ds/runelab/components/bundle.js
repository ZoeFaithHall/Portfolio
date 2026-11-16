/* @ds-bundle: {"format":4,"namespace":"RuneLab","components":[{"name":"Label"},{"name":"Button"},{"name":"StatusMark"},{"name":"SpecTable"},{"name":"PillarDial"}]} */
(function () {
  var PILLARS = ["Power", "Pay", "Time", "Care", "Accountability", "Safety"];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* PillarDial: returns an SVG string. scores = {Power: 0-100, ...}; met = threshold for a pillar to count as met. */
  function pillarDial(scores, opts) {
    opts = opts || {};
    var met = opts.met == null ? 70 : opts.met;
    var caption = opts.caption || "OVERALL";
    var cx = 180, cy = 180, R = 132, TICKS = 14, GAP = 0.16;
    var seg = (Math.PI * 2) / 6, out = [], total = 0, n = 0;
    out.push('<svg class="rl-dial" viewBox="-80 0 520 360" role="img" aria-label="' + esc(opts.label || "Pillar scores") + '">');
    PILLARS.forEach(function (p, i) {
      var v = Math.max(0, Math.min(100, Number(scores[p]) || 0)); total += v; n++;
      var a0 = -Math.PI / 2 + i * seg + GAP / 2, a1 = a0 + seg - GAP;
      var filled = Math.round((v / 100) * TICKS);
      for (var k = 0; k < TICKS; k++) {
        var a = a0 + (k / (TICKS - 1)) * (a1 - a0);
        var cls = k < filled ? (v >= met ? "t-on" : "t-mid") : "t-off";
        var len = k === 0 || k === TICKS - 1 ? 18 : 12;
        out.push('<line class="' + cls + '" stroke-width="2" x1="' + (cx + Math.cos(a) * R).toFixed(1) + '" y1="' + (cy + Math.sin(a) * R).toFixed(1) +
          '" x2="' + (cx + Math.cos(a) * (R - len)).toFixed(1) + '" y2="' + (cy + Math.sin(a) * (R - len)).toFixed(1) + '"/>');
      }
      var am = (a0 + a1) / 2, lr = R + 18;
      var anchor = Math.abs(Math.cos(am)) < 0.2 ? "middle" : (Math.cos(am) > 0 ? "start" : "end");
      out.push('<text class="lbl" text-anchor="' + anchor + '" dominant-baseline="middle" x="' + (cx + Math.cos(am) * lr).toFixed(1) + '" y="' + (cy + Math.sin(am) * lr).toFixed(1) + '">' + p.toUpperCase() + " " + v + "</text>");
    });
    var avg = Math.round(total / n);
    out.push('<text class="fig" text-anchor="middle" x="' + cx + '" y="' + (cy + 14) + '">' + avg + "</text>");
    out.push('<text class="cap" text-anchor="middle" x="' + cx + '" y="' + (cy + 38) + '">' + esc(caption) + "</text>");
    out.push("</svg>");
    return out.join("");
  }

  window.RuneLab = { PILLARS: PILLARS, pillarDial: pillarDial };
})();

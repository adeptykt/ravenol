function number_format(number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        toFixedFix = function (n, prec) {
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            var k = Math.pow(10, prec);
            return Math.round(n * k) / k;
        },
        s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

String.prototype.toLocal = function() {
  const two = (s) => ("0" + s).slice(-2)
  var d = new Date(this)
  return d.getDate() + "." + two(d.getMonth() + 1) + "." + two(d.getFullYear())
}

String.prototype.toLocalLong = function() {
  var d = new Date(this)
  return d.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
}

String.prototype.duration = function() {
  const two = (s) => ("0" + s).slice(-2)
  const regex = /PT(\d{1,2}H|)(\d{1,2}M|)(\d{1,2}S)/
  const find = regex.exec(this)

  return '' + (find[1] ? parseInt(find[1]) + ':' : '') + (find[2] ? two(parseInt(find[2])) + ':' : '') + (find[3] ? two(parseInt(find[3])) : '')
}

Number.prototype.rub = function() {
  let str = number_format(this, 0, '.', '\u00A0')
  return str + '\u00A0\u20BD'
}

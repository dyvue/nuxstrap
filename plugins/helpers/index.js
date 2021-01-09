import moment from 'moment-timezone'

const currency = {
  idr(num) {
    var number_string = num.toString(),
      remain = number_string.length % 3,
      rupiah = number_string.substr(0, remain),
      thousands = number_string.substr(remain).match(/\d{3}/g)
    if (thousands) {
      let separator = remain ? "." : ""
      rupiah += separator + thousands.join(".")
    }
    return "Rp" + rupiah
  }
}

const date = (format, value) => {
  if (value && format) {
    let date_time = new Date(String(value))
    date_time = moment(date_time).utc().format(format)
    return date_time
  }
}

const cutdesc = (text, length) => {
  return text.slice(0, length) + " ..."
}

const _helpers = {
  currency,
  date,
  cutdesc
}

export default ({}, inject) => {
  inject("helpers", _helpers)
}

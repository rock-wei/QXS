const chavy = init()
const cookieName = 'WPS'
const KEY_signhomeurl = 'chavy_signhomeurl_wps'
const KEY_signhomeheader = 'chavy_signhomeheader_wps'
const KEY_signwxurl = 'chavy_signwxurl_wps'
const KEY_signwxheader = 'chavy_signwxheader_wps'

if ($request && $request.method != 'OPTIONS' && $request.url.match(/act_list/)) {
  const VAL_signhomeurl = $request.url
  const VAL_signhomeheader = JSON.stringify($request.headers)
  if (VAL_signhomeurl) chavy.setdata(VAL_signhomeurl, KEY_signhomeurl)
  if (VAL_signhomeheader) chavy.setdata(VAL_signhomeheader, KEY_signhomeheader)
  chavy.msg(cookieName, `獲取Cookie: 成功 (APP)`, ``)
} else if ($request && $request.method != 'OPTIONS' && $request.url.match(/sign_up/)) {
  const VAL_signwxurl = $request.url
  const VAL_signwxheader = JSON.stringify($request.headers)
  if (VAL_signwxurl) chavy.setdata(VAL_signwxurl, KEY_signwxurl)
  if (VAL_signwxheader) chavy.setdata(VAL_signwxheader, KEY_signwxheader)
  chavy.msg(cookieName, `獲取Cookie: 成功 (小程序)`, ``)
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chavy.done()

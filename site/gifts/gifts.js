(function () {
  var order = { high: 0, medium: 1, low: 2 };
  var status = document.getElementById('status');
  var list = document.getElementById('list');
  var updated = document.getElementById('updated');

  function el(tag, text, cls) {
    var e = document.createElement(tag);
    if (text != null) e.textContent = String(text);
    if (cls) e.className = cls;
    return e;
  }
  function safeUrl(u) {
    try {
      var p = new URL(u, location.href);
      return (p.protocol === 'https:' || p.protocol === 'http:') ? p.href : null;
    } catch (e) { return null; }
  }
  function card(it) {
    var li = el('li', null, 'card');
    var h = el('h3');
    var href = it.url ? safeUrl(it.url) : null;
    if (href) {
      var a = el('a', it.name);
      a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
      h.appendChild(a);
    } else {
      h.textContent = String(it.name);
    }
    li.appendChild(h);
    var pr = order.hasOwnProperty(it.priority) ? it.priority : 'low';
    var meta = el('p', null, 'prob');
    meta.appendChild(el('strong', pr.charAt(0).toUpperCase() + pr.slice(1) + ' priority'));
    if (it.price) meta.appendChild(document.createTextNode(' · ' + it.price));
    li.appendChild(meta);
    if (it.description) li.appendChild(el('p', it.description));
    if (it.category) {
      var ul = el('ul', null, 'tags');
      ul.appendChild(el('li', it.category));
      li.appendChild(ul);
    }
    return li;
  }

  fetch('/gifts.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) {
      var items = (d && Array.isArray(d.items) ? d.items : []).filter(function (i) { return i && i.name; });
      if (d && d.updated) updated.textContent = 'Last updated: ' + d.updated;
      if (!items.length) { status.textContent = 'Nothing on the list yet. Check back soon.'; return; }
      items.map(function (it, i) { return [it, i]; }).sort(function (a, b) {
        var x = order.hasOwnProperty(a[0].priority) ? order[a[0].priority] : 2;
        var y = order.hasOwnProperty(b[0].priority) ? order[b[0].priority] : 2;
        return x - y || a[1] - b[1];
      }).forEach(function (p) { list.appendChild(card(p[0])); });
      status.hidden = true;
    })
    .catch(function () {
      status.textContent = 'Sorry, the list could not be loaded. Please try again later.';
    });
})();

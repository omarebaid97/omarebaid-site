(function () {
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
    if (it.price) li.appendChild(el('p', it.price, 'prob'));
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
      items.forEach(function (it) { list.appendChild(card(it)); });
      status.hidden = true;
    })
    .catch(function () {
      status.textContent = 'Sorry, the list could not be loaded. Please try again later.';
    });
})();

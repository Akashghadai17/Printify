// Subscription
async function subscribePlan(plan) {
    const token = localStorage.getItem('token');
    if (!token) { alert('Please login to subscribe.'); window.location.href = '/login'; return; }
    const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) loadSubscription();
}

async function cancelSubscription() {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch('/api/my-subscription', {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) {
        document.getElementById('sub-notice').classList.add('hidden');
        document.getElementById('cancel-sub-btn').classList.add('hidden');
        const sel = document.getElementById('packageType');
        sel.disabled = false;
        sel.value = 'One-time';
    }
}

async function loadSubscription() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch('/api/my-subscription', { headers: { 'Authorization': 'Bearer ' + token } });
    const sub = await res.json();
    if (sub) {
        const sel = document.getElementById('packageType');
        sel.value = sub.plan;
        sel.disabled = true;
        const remaining = sub.pagesAllowed - sub.pagesUsed;
        const expiry = new Date(sub.endDate).toLocaleDateString('en-IN');
        document.getElementById('sub-notice-text').textContent =
            'Active ' + sub.plan + ' plan — ' + remaining + ' pages left — expires ' + expiry;
        document.getElementById('sub-notice').classList.remove('hidden');
        document.getElementById('cancel-sub-btn').classList.remove('hidden');
        if (typeof updatePrice === 'function') updatePrice();
    }
}

loadSubscription();

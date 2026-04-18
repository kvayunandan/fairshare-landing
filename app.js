document.addEventListener('DOMContentLoaded', function () {
    var FORMSPREE_URL = 'https://formspree.io/f/mvzdaldl';

    var form = document.getElementById('signup-form');
    var successMessage = document.getElementById('success-message');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = document.getElementById('email').value.trim();
        if (!email) return;

        var selectedFeature = document.querySelector('input[name="feature"]:checked');
        var feature = selectedFeature ? selectedFeature.value : 'none';

        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;

        var data = {
            email: email,
            feature: feature,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            source: document.referrer || 'direct'
        };

        fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(function (response) {
            if (response.ok) {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                submitBtn.textContent = 'Try Again';
                submitBtn.disabled = false;
            }
        })
        .catch(function () {
            submitBtn.textContent = 'Try Again';
            submitBtn.disabled = false;
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});

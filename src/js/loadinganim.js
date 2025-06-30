    // Hide loading animation when page is loaded
    window.addEventListener('load', function() {
      document.documentElement.classList.add('loaded');
      setTimeout(function() {
        document.getElementById('loading-animation').style.display = 'none';
      }, 500);
    });
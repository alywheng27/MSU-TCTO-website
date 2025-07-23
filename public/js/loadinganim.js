    // Hide loading animation when page is loaded
    window.addEventListener('load', function() {
      document.documentElement.classList.add('loaded');
      setTimeout(function() {
        const loadingAnimation = document.getElementById('loading-animation');
        if (loadingAnimation) {
          loadingAnimation.style.display = 'none';
        }
      }, 500);
    }); 
// import React, { useEffect } from 'react'

export default function Scripts() {
   
        const script = document.createElement('script');
        script.src = "/assets/js/vendor/jquery-3.5.1.min.js";
        script.src = "/assets/js/vendor/popper.min.js";
        script.src = "/assets/js/vendor/bootstrap.min.js";
        script.src = "/assets/js/vendor/jquery-migrate-3.3.0.min.js";
        script.src = "/assets/js/vendor/modernizr-3.11.2.min.js";
        script.src = "/assets/js/plugins/swiper-bundle.min.js";
        script.src = "/assets/js/plugins/countdownTimer.min.js";
        script.src = "/assets/js/plugins/scrollup.js";
        script.src = "/assets/js/plugins/jquery.zoom.min.js";
        script.src = "/assets/js/plugins/slick.min.js";
        script.src = "/assets/js/plugins/infiniteslidev2.js";
        script.src = "/assets/js/plugins/chat-pro.js";
        script.src = "/assets/js/vendor/index.js";
        script.src = "/assets/js/demo-5.js";
        // script.src = "/assets/js/vendor/jquery.magnific-popup.min.js";
        // script.src = "/assets/js/plugins/jquery.sticky-sidebar.js";
        
        script.async = true;
        document.body.appendChild(script);
      


}

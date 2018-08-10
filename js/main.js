$(document).ready(function(){

	particlesJS("particles-js", {"particles":{"number":{"value":30,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":10,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":280,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":3,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":20,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});

	$('form').on('submit', sendForm);

    function sendForm (e) {

        e.preventDefault();
        var $form = $(this);
        var hasError = false;
        var $nameInput = $form.find('input[name="name"]');
        var $phoneInput = $form.find('input[name="phone"]');
        var $mailInput = $form.find('input[name="mail"]');
        var $reasonInput = $form.find('input[name="reason"]');
        var valPhone = $phoneInput.length > 0 ? $phoneInput.val() : '';
        var valName = $nameInput.length > 0 ? $nameInput.val() : '';
        var valMail = $mailInput.length > 0 ? $mailInput.val() : '';

        if (valPhone == '') {
            $phoneInput.addClass('invalid_text_field');
            hasError = true;
        }

        if (valMail == '') {
            $mailInput.addClass('invalid_text_field');
            hasError = true;
        }

        if (valName == '') {
            $nameInput.addClass('invalid_text_field');
            hasError = true;
        }

        setTimeout(function(){
            $form.find('.invalid_text_field').removeClass('invalid_text_field');
        }, 3000);

        if (hasError) {
            return false;
        }

        var obj = {
            phone: valPhone,
            name: valName,
            mail: valMail,
        };

        $.ajax({
            type: "POST",
            url: "/mailpost.php",
            data: obj,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            beforeSend: function(){
            },
            success: function(html){
                $phoneInput.val("");
                $nameInput.val("");
                $mailInput.val("");
                $.fancybox.close(true);
                $.fancybox.open({src: '#hidden-thanks', type: 'inline',});
                setTimeout(function() {
                	$.fancybox.close(true);
                }, 3000);
            },
        });
    }

});
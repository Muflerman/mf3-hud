$(document).ready(function () {
    function handleStatusAnimation(selector, value) {
        const icon = $(selector).find('i');
        if (value <= 20) {
            icon.removeClass('warning-low').addClass('warning-critical');
        } else if (value <= 50) {
            icon.removeClass('warning-critical').addClass('warning-low');
        } else {
            icon.removeClass('warning-low warning-critical');
        }
    }

    function updatePlayerHUD(data) {
        // Health Box
        if (data.health < 100) {
            $('#health-box').fadeIn('slow');
            $('#health').css('height', data.health + "%");
            handleStatusAnimation('#health-box', data.health);
        } else { $('#health-box').fadeOut('slow'); }

        // Armor Box (Ahora es un cuadro como la vida)
        if (data.armor > 0) {
            $('#armor-box').fadeIn('slow');
            $('#armor').css('height', data.armor + "%");
            handleStatusAnimation('#armor-box', data.armor);
        } else { $('#armor-box').fadeOut('slow'); }

        // Thirst Box
        if (data.thirst < 100) {
            $('#thirst-box').fadeIn('slow');
            $('#thirst').css('height', data.thirst + "%");
            handleStatusAnimation('#thirst-box', data.thirst);
        } else { $('#thirst-box').fadeOut('slow'); }

        // Hunger Box
        if (data.hunger < 100) {
            $('#hunger-box').fadeIn('slow');
            $('#hunger').css('height', data.hunger + "%");
            handleStatusAnimation('#hunger-box', data.hunger);
        } else { $('#hunger-box').fadeOut('slow'); }

        // Stamina Bar (Horizontal abajo)
        $('#stamina-bar').show();
        $('#stamina').css('width', data.stamina + "%");

        // Microphone Bar (Vertical izquierda)
        let voiceLevel = (data.voice / 6) * 100; // Asumiendo max 6.0
        $('#voice-fill').css('height', voiceLevel + "%");

        if (data.talking) {
            $('#voice-fill').addClass('talking-fill');
            $('#voice-vertical-container').css('border-color', "rgba(255, 234, 0, 0.8)"); // Amarillo
        } else {
            $('#voice-fill').removeClass('talking-fill');
            $('#voice-vertical-container').css('border-color', "rgba(255, 255, 255, 0.1)"); // Blanco/Transparente
        }
    }

    function updateVehicleHUD(data) {
        // Padded speed 000
        let speedStr = data.speed.toString().padStart(3, '0');
        $('#speed').text(speedStr);

        // Fuel percentage (Solo en la caja de info ahora)
        $('#fuel-val').text(data.fuel + "%");

        // Gear logic (Marchas en la barra vertical)
        if (data.gear === 0) {
            $('#gear-val').text("R").addClass('reverse');
            $('.gear-segment').removeClass('active').addClass('reverse-active');
        } else {
            $('#gear-val').text(data.gear).removeClass('reverse');
            $('.gear-segment').removeClass('reverse-active');
            $('.gear-segment').each(function (index) {
                if (index < data.gear) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }

        // Dynamic speed feeling (Blur & Scale)
        let blur = Math.min(data.speed / 40, 8); // Max blur 8px
        let scale = 1 + (Math.min(data.speed / 250, 0.15)); // Max scale 1.15
        $('#speed-main').css({
            'text-shadow': `0 0 ${10 + blur}px rgba(224, 232, 255, ${0.4 + (blur / 10)})`,
            'transform': `scale(${scale})`
        });

        // Map Border Glow intensity based on speed
        let mapGlow = Math.min(data.speed / 15, 30); // Max 30px glow at 450 kmh
        $('#minimap-border').css({
            'box-shadow': `0 0 ${15 + mapGlow}px rgba(224, 232, 255, ${0.4 + (mapGlow / 50)}), inset 0 0 ${10 + (mapGlow / 2)}px rgba(224, 232, 255, 0.1)`
        });

        if (data.sirens) {
            $('#minimap-border').addClass('sirens-active');
        } else {
            $('#minimap-border').removeClass('sirens-active');
        }

        $('#street1').text(data.street1);

        // Seatbelt logic
        const seatbeltActive = data.seatbelt === true || data.belt === true;
        const currentSeatbeltState = $('#seatbelt-info').hasClass('active');

        if (seatbeltActive) {
            if (!currentSeatbeltState) {
                $('#seatbelt-info').addClass('active');
                $('#seatbelt-info i').removeClass('fa-user-slash').addClass('fa-user-check');
            }
        } else {
            if (currentSeatbeltState) {
                $('#seatbelt-info').removeClass('active');
                $('#seatbelt-info i').removeClass('fa-user-check').addClass('fa-user-slash');
            }
        }

        // Engine status color logic (example)
        if (data.engine < 30) {
            $('.fa-engine-warning').css('color', '#ff3232');
        } else {
            $('.fa-engine-warning').css('color', '#ffffff');
        }
    }

    window.addEventListener('message', function (event) {
        const data = event.data;
        if (data.action == 'showPlayerHUD') {
            $('body').fadeIn('slow')
        } else if (data.action == 'hidePlayerHUD') {
            $('body').fadeOut('slow')
        } else if (data.action == 'updatePlayerHUD') {
            updatePlayerHUD(data)
        } else if (data.action == 'showVehicleHUD') {
            $('#vehicle-hud-container').fadeIn('slow');
            $('#minimap-border').fadeIn('slow');
            $('#player-hud-wrapper').addClass('map-active');
            $('#vehicle-hud-container').addClass('map-active');
        } else if (data.action == 'hideVehicleHUD') {
            $('#vehicle-hud-container').fadeOut('slow');
            $('#minimap-border').fadeOut('slow');
            $('#player-hud-wrapper').removeClass('map-active');
            $('#vehicle-hud-container').removeClass('map-active');
        } else if (data.action == 'updateVehicleHUD') {
            updateVehicleHUD(data);
            $('#minimap-border').fadeIn('slow');
            $('#player-hud-wrapper').addClass('map-active');
            $('#vehicle-hud-container').addClass('map-active');
        }
    })
});
$(document).ready(() => {


    /******************/
    /*** Iniciar chat grafikprint ***/
    /******************/

    let $userName = "Saúl";

    // Iniciar chatbot
    $("#form-start").on("submit", (event) => {
        event.preventDefault();
        $userName = $("#username").val();
        $("#landing").slideUp(300);
        setTimeout(() => {
            $("#start-chat").html("Continuar chat")
        }, 300);
    });




    /*****************/
    /*** CHAT DE USUARIO***/
    /*****************/


    // Publicar un mensaje en el foro
    function $postMessage() {
        $("#message").find("br").remove();
        let $message = $("#message").html().trim(); // obtener texto del cuadro de texto
        $message = $message.replace(/<div>/, "<br>").replace(/<div>/g, "").replace(/<\/div>/g, "<br>").replace(/<br>/g, " ").trim();
        if ($message) { // si el texto no está vacío
            const html = `<div class="post post-user">${$message + timeStamp()}</span></div>`; // convertir publicación a html
            $("#message-board").append(html); // agregar publicación al tablero
            $scrollDown(); //permanecer en la parte inferior del chat
            botReply($message);
        };
        $("#message").empty();
    };

    //boton chat
    $("#message").on("keyup", (event) => {
        if (event.which === 13) $postMessage(); // Usa enter para enviar acuerdate de que este es para enviar usaste #send on click !!
    }).on("focus", () => {
        $("#message").addClass("focus");
    }).on("blur", () => {
        $("#message").removeClass("focus");
    });
    $("#send").on("click", $postMessage);




    /**********************/
    /*** RESPUESTA AUTOMATICA ***/
    /**********************/


    function botReply(userMessage) {
        const reply = generateReply(userMessage);
        if (typeof reply === "string") postBotReply(reply);
        else reply.forEach((str) => postBotReply(str));
    };

    function generateReply(userMessage) {
        const message = userMessage.toLowerCase();
        let reply = [`Lo siento no puedo entender tu pregunta`, `intentalo de nuevo`];

        // Preguntas
        if (/^Hola$|^hol?a|^Buenas tardes|^buenas tardes|^hoa|^ola/.test(message)) reply = [`Hola!, en que puedo ayudarte ${$userName}?`, `Si necesitas el precio de algun producto solo escribelo y yo te lo dare, por ejemplo "tabloide"`];
        else if (/tabloide/.test(message)) reply = [`Manejamos 3 tipos de tabloides`, `Couche Grueso $12`, `Couche Delgado $12`, `Adhesivo $17`];
        else if (/Lona|lonas|lona|lona de un metro cuadrado|lona de metro cuadrado|Lona de 1 metro cuadrado|lona con bastilla y ojillos/.test(message)) reply = [`El precio de la lona de 1 metro cuadrado es de $120`, `Incluyendo la Bastilla y ojillos`];
        else if (/Ayuda|tengo una duda|tengo un problema con mi producto|duda|problema con mi producto|ayuda/.test(message)) reply = [`Si necesitas hablar con alguien referente a productos puedes comunicarte por whatsapp o por correo`, `81 8064 2708`, `info@grafikprint.mx`, `imprenta.grafikprint.mx`];

        else if (/impresion normal/.test(message)) reply = [`La impresion normal tiene un precio de $2 en blanco y negro`, `$6 Color`];
        else if (/Adios|adios|bye|salu/.test(message)) reply = [`Hasta Luego!`];
        else if (/Gracias|gracias|muchas gracias|Muchas Gracias/.test(message)) reply = [`No hay de que!, aqui estare si necesitas algo más`];

        return reply;
    };

    function postBotReply(reply) {
        const html = `<div class="post post-bot">${reply + timeStamp()}</div>`;
        const timeTyping = 500 + Math.floor(Math.random() * 2000);
        $("#message-board").append(html);
        $scrollDown();
    };



    /******************/
    /*** MARCAS DE TIEMPO ***/
    /******************/


    function timeStamp() {
        const timestamp = new Date();
        const hours = timestamp.getHours();
        let minutes = timestamp.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        const html = `<span class="timestamp">${hours}:${minutes}</span>`;
        return html;
    };




    /***************/
    /*** chat grafik ***/
    /***************/


    //Boton de volver
    $("#back-button").on("click", () => {
        $("#landing").show();
    });


    // Menu - Navegacion
    $("#nav-icon").on("click", () => {
        $("#nav-container").show();
    });

    $("#nav-container").on("mouseleave", () => {
        $("#nav-container").hide();
    });

    $(".nav-link").on("click", () => {
        $("#nav-container").slideToggle(200);
    });

    // Limpiar chat
    $("#clear-history").on("click", () => {
        $("#message-board").empty();
        $("#message").empty();
    });

    // salir
    $("#sign-out").on("click", () => {
        $("#message-board").empty();
        $("#message").empty();
        $("#landing").show();
        $("#username").val("");
        $("#start-chat").html("Preguntanos!");
    });




    /*********************/
    /***bajar al final***/
    /*********************/


    function $scrollDown() {
        const $container = $("#message-board");
        const $maxHeight = $container.height();
        const $scrollHeight = $container[0].scrollHeight;
        if ($scrollHeight > $maxHeight) $container.scrollTop($scrollHeight);
    }



});
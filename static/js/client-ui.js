/**
 * Created by Sebastian on 12/07/2014.
 */

function toggleLiveResizing () {
    $.each( $.layout.config.borderPanes, function (i, pane) {
        var o = myLayout.options[ pane ];
        o.livePaneResizing = !o.livePaneResizing;
    });
};

function toggleStateManagement ( skipAlert, mode ) {
    if (!$.layout.plugins.stateManagement) return;

    var options	= myLayout.options.stateManagement
        ,	enabled	= options.enabled // current setting
        ;
    if ($.type( mode ) === "boolean") {
        if (enabled === mode) return; // already correct
        enabled	= options.enabled = mode
    }
    else
        enabled	= options.enabled = !enabled; // toggle option

    if (!enabled) { // if disabling state management...
        myLayout.deleteCookie(); // ...clear cookie so will NOT be found on next refresh
        if (!skipAlert)
            alert('This layout will reload as the options specify \nwhen the page is refreshed.');
    }
    else if (!skipAlert)
        alert('This layout will save & restore its last state \nwhen the page is refreshed.');

    // update text on button
    var $Btn = $('#btnToggleState'), text = $Btn.html();
    if (enabled)
        $Btn.html( text.replace(/Enable/i, "Disable") );
    else
        $Btn.html( text.replace(/Disable/i, "Enable") );
};

// set EVERY 'state' here so will undo ALL layout changes
// used by the 'Reset State' button: myLayout.loadState( stateResetSettings )
var stateResetSettings = {
    north__size:		"auto"
    ,	north__initClosed:	false
    ,	north__initHidden:	false
    ,	south__size:		"auto"
    ,	south__initClosed:	false
    ,	south__initHidden:	false
    ,	west__size:			200
    ,	west__initClosed:	false
    ,	west__initHidden:	false
    ,	east__size:			300
    ,	east__initClosed:	false
    ,	east__initHidden:	false
};

var myLayout;

$(document).ready(function () {

    $('#editor').load('markdown.md',
        function(data) {
            var editor = new Editor({
                status: false,
                tools: false
            });
            editor.render();
        }
    );



    //button fade animations on column hover:

    //center column
    $(".ui-layout-center").hover(function() {
        //mouse on the item

        $(".edit-button").animate({opacity: 1}, 400);
        $(".edit-shadow").animate({opacity: 0}, 400);
    }, function() {
        //mouse off the item
        $(".edit-button").animate({opacity: 0.2}, 400);
        $(".edit-shadow").animate({opacity: 0.4}, 400);
    });

    //left column
    $(".ui-layout-west").hover(function() {
        //mouse on the item
        $(".plus-button").animate({opacity: 1}, 400);
        $("plus-shadow").animate({opacity: 0}, 400);
    }, function() {
        //mouse off the item
        $(".plus-button").animate({opacity: 0.2}, 400);
        $(".plus-shadow").animate({opacity: 0.4}, 400);
    });





//    var text = editor.codemirror.getValue();

    // this layout could be created with NO OPTIONS - but showing some here just as a sample...
    // myLayout = $('body').layout(); -- syntax with No Options

    myLayout = $('body').layout({

        //	reference only - these options are NOT required because 'true' is the default
        closable:					true	// pane can open & close
        ,	resizable:					true	// when open, pane can be resized
        ,	slidable:					true	// when closed, pane can 'slide' open over other panes - closes on mouse-out
        ,	livePaneResizing:			true

        //	some resizing/toggling settings
        ,	north__slidable:			false	// OVERRIDE the pane-default of 'slidable=true'
        ,	north__togglerLength_closed: '100%'	// toggle-button is full-width of resizer-bar
        ,	north__spacing_closed:		20		// big resizer-bar when open (zero height)
        ,	north__resizable:			false	// OVERRIDE the pane-default of 'resizable=true'
        ,	north__closable:			false	// not closable
        ,   north__size:                45

        ,	south__resizable:			false	// OVERRIDE the pane-default of 'resizable=true'
        ,	south__spacing_open:		0		// no resizer-bar when open (zero height)
        ,	south__spacing_closed:		20		// big resizer-bar when open (zero height)

        //	some pane-size settings
        ,	west__minSize:				100
        ,	east__size:					450
        ,	east__minSize:				250
        ,	east__closable:			false	// not closable
        ,	east__maxSize:				.5 // 50% of layout width
        ,	center__minWidth:			100

        //	some pane animation settings
        ,	west__animatePaneSizing:	false
        ,	west__fxSpeed_size:			"fast"	// 'fast' animation when resizing west-pane
        ,	west__fxSpeed_open:			1000	// 1-second animation when opening west-pane
        ,	west__fxSettings_open:		{ easing: "easeOutBounce" } // 'bounce' effect when opening
        ,	west__fxName_close:			"none"	// NO animation when closing west-pane

        //	enable showOverflow on west-pane so CSS popups will overlap north pane
        ,	west__showOverflowOnHover:	true

        //	enable state management
        ,	stateManagement__enabled:	true // automatic cookie load & save enabled by default

        ,	showDebugMessages:			true // log and/or display messages from debugging & testing code
    });

    // if there is no state-cookie, then DISABLE state management initially
    var cookieExists = !$.isEmptyObject( myLayout.readCookie() );
    if (!cookieExists) toggleStateManagement( true, false );

    myLayout
        // add event to the 'Close' button in the East pane dynamically...
//        .bindButton('#btnCloseEast', 'close', 'east')
//
//        // add event to the 'Toggle South' buttons in Center AND South panes dynamically...
//        .bindButton('.south-toggler', 'toggle', 'south')
//
//        // add MULTIPLE events to the 'Open All Panes' button in the Center pane dynamically...
//        .bindButton('#openAllPanes', 'open', 'north')
//        .bindButton('#openAllPanes', 'open', 'south')
//        .bindButton('#openAllPanes', 'open', 'west')
//        .bindButton('#openAllPanes', 'open', 'east')
//
//        // add MULTIPLE events to the 'Close All Panes' button in the Center pane dynamically...
//        .bindButton('#closeAllPanes', 'close', 'north')
//        .bindButton('#closeAllPanes', 'close', 'south')
//        .bindButton('#closeAllPanes', 'close', 'west')
//        .bindButton('#closeAllPanes', 'close', 'east')
//
//        // add MULTIPLE events to the 'Toggle All Panes' button in the Center pane dynamically...
//        .bindButton('#toggleAllPanes', 'toggle', 'north')
//        .bindButton('#toggleAllPanes', 'toggle', 'south')
//        .bindButton('#toggleAllPanes', 'toggle', 'west')
//        .bindButton('#toggleAllPanes', 'toggle', 'east')
    ;


    /*
     *	DISABLE TEXT-SELECTION WHEN DRAGGING (or even _trying_ to drag!)
     *	this functionality will be included in RC30.80
     */
    $.layout.disableTextSelection = function(){
        var $d	= $(document)
            ,	s	= 'textSelectionDisabled'
            ,	x	= 'textSelectionInitialized'
            ;
        if ($.fn.disableSelection) {
            if (!$d.data(x)) // document hasn't been initialized yet
                $d.on('mouseup', $.layout.enableTextSelection ).data(x, true);
            if (!$d.data(s))
                $d.disableSelection().data(s, true);
        }
        //console.log('$.layout.disableTextSelection');
    };
    $.layout.enableTextSelection = function(){
        var $d	= $(document)
            ,	s	= 'textSelectionDisabled';
        if ($.fn.enableSelection && $d.data(s))
            $d.enableSelection().data(s, false);
        //console.log('$.layout.enableTextSelection');
    };
    $(".ui-layout-resizer")
        .disableSelection() // affects only the resizer element
        .on('mousedown', $.layout.disableTextSelection ); // affects entire document

});

document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
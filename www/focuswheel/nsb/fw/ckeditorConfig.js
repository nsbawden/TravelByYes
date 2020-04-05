CKEDITOR.editorConfig = function (config) {
    //config.uiColor = 'gold';
    config.uiColor = '#AADC6E';
    config.height = 2000;
    config.bodyClass = 'pgdyn';
    config.allowedContent = true;
    config.font_names = '' +
        'PT serif;Open sans;Arial/Arial, Helvetica, sans-serif;' +
        'Times New Roman/Times New Roman, Times, serif;' +
        'Verdana';
    config.extraPlugins = 'stylesheetparser,magicline,tableresize';
    config.stylesheetParser_validSelectors = /^\.ckdyn\s+(div|blockquote|h1|p|span)\.\w+/;
    config.stylesSet = [
        // Block-level styles
        //{ name : 'Blue Title', element : 'h2', styles : { 'color' : 'Blue' } },
        //{ name : 'Red Title' , element : 'h3', styles : { 'color' : 'Red' } },
        {name: 'title', element: 'h1', attributes: { class: 'title'} },
        { name: '#', element: 'div', attributes: { class: 'nbr'} },

        // Inline styles
        //{ name : 'CSS Style', element : 'span', attributes : { 'class' : 'my_style' } },
        {name: 'subscribe link', element: 'pnxa', attributes: { class: 'subscribeBtn pnx_protected', title: 'subscribe', href: 'javascript:;' }, type: CKEDITOR.STYLE_INLINE },
        { name: 'login link', element: 'pnxa', attributes: { class: 'loginBtn', title: 'login or create account', href: 'javascript:;' }, type: CKEDITOR.STYLE_INLINE },
	    { name: 'Marker: Yellow', element: 'span', styles: { 'background-color': 'Yellow'} }
    ];
    
};
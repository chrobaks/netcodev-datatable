class DataTableConf
{
    static getConf (config)
    {
        const defaultConf = {
            dataTable       : [],
            dataTableCache  : [],
            dataTableClone  : "",
            dataIndex       : 0,
            dataConfig      : {
                dataStep  : 1,
                maxStep   : 0,
                maxLen    : 0,
                stepLen   : 0,
                actualLen   : 0,
                rowLen: 0,
            },
            arrToggleList : [],
            arrRowList    : [],
            arrRowIndex   : [],
            arrColType    : {},
            objSortList   : {},
            urlGetParam   : [],
            searchDate    : {start : [], end : [], show : false},
            dom           : {container : null},
            domId         : {
                btnNext : 'btn-step-forward', 
                btnBack : 'btn-step-back', 
                btnStep : 'btn-step', 
                btnSearch     : 'btn-search', 
                btnShowList   : 'btn-show-list',
                btnShowSelct  : 'btn-show-selection',
                btnRstSelct   : 'btn-reset-selection',
                btnContLen    : 'btn-content-length',
                btnConlToggle : 'btn-col-toggle',
                contentInfo   : 'dataTable-content-info', 
                maxStep       : 'dataTable-max-step', 
                colToggleList : 'dataTable-toggle-list-column', 
                colSearchList : 'dataTable-toggle-list-search', 
                inptContentLength : 'inpt-content-length',
                inptStep : 'inpt-step', 
                wrapper : 'dataTable-wrapper', 
                header : 'dataTable-header', 
                content : 'dataTable-content',
                colToggleWrapper : 'dataTable-col-toggle-wrapper'
            },
            tpl : {
                "columnHeader" : '<div class="col-header-wrapper"><div class="col-header-label">{%column%}</div><div class="order-box-container"><span class="svg-arrow-item" data-arrow-id="up"><svg class="svg-arrow" viewBox="0 0 640 640" width="10" height="10"><defs><path d="M160.01 320.01L0.02 640.02L320.03 640.01L640.02 640L480.03 320L320.01 0.01L160.01 320.01Z" id="bbbJpxd7D"></path></defs><g><g><g><use xlink:href="#bbbJpxd7D" opacity="1" fill="#30bf2d" fill-opacity="1"></use><g><use xlink:href="#bbbJpxd7D" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></span><span class="svg-arrow-item" data-arrow-id="down"><svg class="svg-arrow" viewBox="0 0 640 640" width="10" height="10"><defs><path d="M480.02 320L640 0L320 0.01L0 0.02L160 320.01L320.01 640.01L480.02 320Z" id="a4wj2R4nkY"></path></defs><g><g><g><use xlink:href="#a4wj2R4nkY" opacity="1" fill="#30bf2d" fill-opacity="1"></use><g><use xlink:href="#a4wj2R4nkY" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></span></div></div>',
                "columnSearch" : '<input type="text" value="" placeholder="Suchbegriff eingeben.."/><br/><button class="btn-search">Suche</button><br/>',
                "columnToggleList" : '<span>{%column%}</span><input type="radio" checked="checked"/>',
                "searchToggleList" : '<span>{%column%}</span>',
                "rowIndex" : '<span class="rowIndex">{%rowIndex%}</span>',
            }
        };

        return Object.assign(defaultConf,config);
    }
}
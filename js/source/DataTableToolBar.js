class DataTableToolBar
{
    constructor(DataTable) {
        this.DataTable = DataTable;
        this.config    = DataTable.config;
    }

    setToolbarEvent ()
    {
        const listBtnSearch = this.config.dom.container.getElementsByClassName('btn-search');
        // Date menu
        const listInptDate = this.config.dom.container.getElementsByClassName('inpt-date');
        const selctList = this.config.dom.container.getElementsByClassName('slct-date');
        const menu  = this.config.dom.container.getElementsByClassName('date-menu')[0];
        
        this.config.dom.btnShowList.onclick = () => { this.DataTable.setDataTableCache(true); };
        this.config.dom.btnShowSelct.onclick = () => { this.DataTable.setDataTableCache(false); };
        this.config.dom.btnRstSelct.onclick = () => { this.DataTable.View.resetActiveSelection(); };
        
        for (let i = 0; i < listBtnSearch.length;i++) {
            listBtnSearch[i].onclick = () => {
                const dateParent = listBtnSearch[i].parentElement;
                const srchConf = {val:null, index:null, type:''};

                if (dateParent.classList.contains('dataTable-search-wrapper-str')) {
                    srchConf.val = dateParent.getElementsByClassName('inpt-search')[0].value.trim();
                    srchConf.index = dateParent.getElementsByClassName('inpt-search')[0].dataset.colIndex;
                    srchConf.type = 'string';
                } else {
                    srchConf.val = dateParent.getElementsByClassName('inpt-date')[0].value.trim();
                    srchConf.index = dateParent.getElementsByClassName('inpt-date')[0].dataset.colIndex;
                    srchConf.type = 'date';

                    if (dateParent.getElementsByClassName('inpt-date')[1].value.trim()) {
                        srchConf.dateEnd = dateParent.getElementsByClassName('inpt-date')[1].value.trim();
                    }
                    menu.style.display = "none";
                }

                if (srchConf.val && srchConf.index >= 0) {
                    this.DataTable.setSearchDataTable(srchConf);
                } else {
                    alert('Kein Suchbegriff gefunden.');
                }
            };
        }
        this.config.dom.btnNext.onclick = () => {this.setStep(1);};
        this.config.dom.btnBack.onclick = () => {this.setStep(0);};
        this.config.dom.btnStep.onclick = () => {
            let intVal = DataTableUtile.getValidInpt({
                inpt : this.config.dom.inptStep,
                max  : this.config.dataConfig.maxStep,
                default : this.config.dataConfig.dataStep
            });
            if (intVal !== null) { 
                this.config.dataConfig.dataStep = intVal;
                this.setStep(intVal, 0); 
            }
        };
        this.config.dom.btnContLen.onclick = () => {
            let intVal = DataTableUtile.getValidInpt({
                inpt : this.config.dom.inptContentLength,
                max  : this.config.dataConfig.maxLen,
                default : this.config.dataConfig.stepLen
            });
            if (intVal !== null) { 
                this.config.dom.inptStep.value = 1;
                this.config.dataConfig.dataStep = 1;
                this.DataTable.setRequest("contlen=" + intVal);
                this.DataTable.setUrlGetParam("contlen", intVal);
            }
        };

        //Dropdowns
        document.querySelectorAll('.dataTable-col-toggle-wrapper').forEach( (wrapper) => {
            wrapper.onmouseenter = () => { wrapper.getElementsByClassName('dataTable-col-toggle-list')[0].style.display = 'block' };
            wrapper.onmouseleave = () => { wrapper.getElementsByClassName('dataTable-col-toggle-list')[0].style.display = 'none' };
        });
        
        // Date input
        for (let i = 0; i < listInptDate.length;i++) {
            listInptDate[i].onfocus = () => {
                menu.style.display = 'block';
                menu.dataset.dateId = (listInptDate[i].classList.contains('date-start')) ? 'start' : 'end';
                
                if (this.config.searchDate[menu.dataset.dateId].length > 2) {
                    for (let d = 0; d < this.config.searchDate[menu.dataset.dateId].length; d++) {
                        this.config.dom.container.getElementsByClassName('slct-date')[d].value = this.config.searchDate[menu.dataset.dateId][d];
                    }
                } else {
                    for (let d = 0; d < 3; d++) { this.config.dom.container.getElementsByClassName('slct-date')[d].value = ""; }
                }
            };
            listInptDate[i].onblur = () => { if (!this.config.searchDate.show) { menu.style.display = 'none'; } };
        }
        // Date select
        for (let i = 0; i < selctList.length;i++) {
            selctList[i].onchange = () => {
                const index = (selctList[i].classList.contains('date-day')) ? 0 : ((selctList[i].classList.contains('date-month')) ? 1 : 2);
                const dateId = selctList[i].parentElement.dataset.dateId;
                this.config.searchDate[dateId][index] = selctList[i].value;

                if (this.config.searchDate[dateId].length > 2) {
                    this.config.dom.container.getElementsByClassName('date-' + dateId)[0].value = this.config.searchDate[dateId].join('.');
                    this.config.dom.container.getElementsByClassName('date-' + dateId)[0].focus();
                }
            };
        }
        this.config.dom.container.getElementsByClassName('dataTable-search-wrapper-date')[0].onmouseenter = () => { this.config.searchDate.show = true; };
        this.config.dom.container.getElementsByClassName('dataTable-search-wrapper-date')[0].onmouseleave = () => { this.config.searchDate.show = false; };
    };

    setStep (next, isOneStep = 1)
    {
        if (!isOneStep || next && this.config.dataConfig.dataStep+1 <= this.config.dataConfig.maxStep || !next && this.config.dataConfig.dataStep-1 > 0) {
            this.config.dataConfig.dataStep = (next) ? ((isOneStep) ? this.config.dataConfig.dataStep+1 : next) : this.config.dataConfig.dataStep-1;
            const filter = (!this.config.urlGetParam.length) ? 'step=' + this.config.dataConfig.dataStep : 'step=' + this.config.dataConfig.dataStep + "&" + this.config.urlGetParam.join('&');
            if (isOneStep){
                this.config.dom.inptStep.value = this.config.dataConfig.dataStep;
            }
            this.DataTable.setRequest(filter); 
        }
    }

    setToolbarInfo ()
    {
        this.config.dom.contentInfo.innerHTML = this.config.dataConfig.actualLen + " / " + this.config.dataConfig.maxLen;
        this.config.dom.inptContentLength.value = this.config.dataConfig.stepLen;
        this.config.dom.maxStep.innerHTML = this.config.dataConfig.maxStep;
        this.config.dom.inptStep.value = this.config.dataConfig.dataStep;
        // Set date select option values
        if (this.config.dom.container.getElementsByClassName('slct-date').length && this.config.dom.container.getElementsByClassName('slct-date')[0].getElementsByTagName('option').length < 2) {
            this.DataTable.View.setDateSelcectOption();
        }
    }
}
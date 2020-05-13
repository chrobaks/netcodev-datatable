class DataTableView
{
    constructor(DataTable, config) {
        this.DataTable = DataTable;
        this.config    = config;
    }

    setHeader (arrData)
    {
        const tr = document.createElement("tr");
        const stickyBox = document.createElement("th");
        stickyBox.classList.add('th-sticky');
        stickyBox.appendChild(document.createTextNode("Zeile"));
        tr.appendChild(stickyBox);
        arrData.map((colVal) => { 
            this.setColumn(tr, colVal, "col-header"); 
            this.setColumnToggleList(this.config.dom.colToggleList, colVal);
            this.setSearchToggleList(this.config.dom.colSearchList, colVal);
            this.config.dataIndex++; 
        });
        this.config.dom.header.appendChild(tr);
        this.config.dataIndex = 0;
    }

    setContent (val)
    {
        let colIndex = 0;
        let rowIndex = (this.config.dataConfig.stepLen == this.config.dataConfig.actualLen) 
            ? this.config.dataIndex + 1 
            : (this.config.dataConfig.actualLen - this.config.dataConfig.rowLen) + (this.config.dataIndex);
        
        const tr = document.createElement("tr");
        const stickyBox = document.createElement("td");
        stickyBox.innerHTML = this.config.tpl.rowIndex.replace('{%rowIndex%}', rowIndex);
        stickyBox.classList.add('td-sticky');
        tr.className = "data-row";
        tr.setAttribute(tr.className + '-index', (this.config.arrRowIndex.length) ? this.config.arrRowIndex[this.config.dataIndex] : this.config.dataIndex);
        tr.appendChild(stickyBox);
        val.map((colVal) => {  this.setColumn(tr, colVal, "data-col", colIndex++);  });
        this.config.dom.content.appendChild(tr); 
        this.config.dataIndex++; 
    }

    setContentUpdate (activList)
    {
        let index = 0;
        this.config.dom.content.querySelectorAll('.data-row').forEach( (row) => {
            if (activList.length) {
                if (activList.indexOf(index) === -1) { row.style.display = 'none'; }
                index++;
            } else {
                row.removeAttribute('style');
            } 
        });
        this.resetOrder();
    }

    setContentSelection ()
    {
        let setOk = false;

        if (this.config.arrRowList.length) {
            this.config.dom.content.querySelectorAll('.data-row').forEach( (row) => {
                if (this.config.arrRowList.indexOf(row.dataset.rowIndex) === -1) { 
                    row.style.display = 'none'; 
                } else {
                    row.classList.toggle('active');
                }
            });
            setOk = true;
        }

        return setOk;
    }

    setColumn (parent, val, css, colIndex = -1)
    {
        const col = (css === 'col-header') ? document.createElement("th") : document.createElement("td");

        if (css === 'col-header') {
            col.innerHTML = this.config.tpl.columnHeader.replace("{%column%}", val);
        } else {
            col.appendChild(document.createTextNode(val));
        }
        
        if (css) {
            col.className = css;
            if (css === 'col-header') {
                col.setAttribute('data-col-index', this.config.dataIndex);
                
            }
            if (css === 'data-col') {
                col.setAttribute('data-col-index', colIndex);
                if (this.config.arrToggleList.indexOf(colIndex + "") !== -1) {
                    col.style.display = "none";
                }
            }
        }       
        parent.appendChild(col);  
    }

    setColumnUpdate (colIndex, hide)
    {
        this.config.dom.content.querySelectorAll('.data-row').forEach( (row) => {
            if (hide) {
                this.config.dom.header.getElementsByClassName("col-header")[colIndex].style.display = "none";
                row.getElementsByClassName("data-col")[colIndex].style.display = "none";
            } else {
                this.config.dom.header.getElementsByClassName("col-header")[colIndex].removeAttribute('style');
                row.getElementsByClassName("data-col")[colIndex].removeAttribute('style');
            }
        });
    }

    setColumnToggleList (parent, val)
    {
        const col = document.createElement("div");
        col.setAttribute('data-col-index', this.config.dataIndex);
        col.className = 'col-toggle-list';
        col.innerHTML = this.config.tpl.columnToggleList.replace("{%column%}", val);      
        parent.appendChild(col); 
        col.onclick = () => {this.DataTable.Event.colToggleEvent(col);}
    }
    
    setSearchToggleList (parent, val) 
    {
        const col = document.createElement("div");
        const index = this.config.dataIndex;
        col.setAttribute('data-col-index', index);
        col.className = 'col-toggle-list';
        col.innerHTML = this.config.tpl.searchToggleList.replace("{%column%}", val);      
        parent.appendChild(col); 
        col.onclick = () => { this.DataTable.Event.searchToggleEvent(col, index); };
    }

    setDateSelcectOption ()
    {
        const y = new Date();
        // Day
        let dOpt = '<option value="">Tag</option>';
        for (let i = 1; i <=31; i++) { let d = (i<10) ? "0" + i : i; dOpt += '<option value="'+d+'">'+d+'</option>'; }
        this.config.dom.container.querySelectorAll('.slct-date.date-day').forEach((slct) => { slct.innerHTML = dOpt; });
        // Month
        let mOpt = '<option value="">Monat</option>';
        for (let i = 1; i <=12; i++) { let d = (i<10) ? "0" + i : i;  mOpt += '<option value="'+d+'">'+d+'</option>'; }
        this.config.dom.container.querySelectorAll('.slct-date.date-month').forEach((slct) => { slct.innerHTML = mOpt; });
        // Year
        let yOpt = '<option value="">Jahr</option>';
        for (let i = 2000; i <=y.getFullYear(); i++) { let d = (i<10) ? "0" + i : i; yOpt += '<option value="'+d+'">'+d+'</option>'; }
        this.config.dom.container.querySelectorAll('.slct-date.date-year').forEach((slct) => { slct.innerHTML = yOpt; });
    }

    getColumnType (colIndex)
    {
        let res = {date:0, str:0};

        this.config.dom.content.querySelectorAll('.data-row').forEach( (row) => 
        { 
            const colVal = row.getElementsByClassName("data-col")[colIndex].innerHTML.trim();

            if (/^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(colVal)) {
                res.date++;
            } else {
                res.str++;
            }
        });

        return (res.str < 1 && res.date) ? 'date' : "string";
    }

    getClosest (selector, obj)
    {
        if (obj.parentElement.hasAttribute("class") && obj.parentElement.getAttribute("class") === selector) {
            return obj.parentElement;
        } else {
            if (obj.parentElement.nodeName.toLowerCase() !== 'body') {
                return this.getClosest(selector, obj.parentElement)
            } else {
                return null;
            }
        }
    }

    toggleDataRow (obj, reset = false)
    {
        if (!reset) {
            if (obj.classList.contains('active')) {
                let index = 0;
                this.config.arrRowList.map((val) => {
                    if (val === obj.dataset.rowIndex) {
                        this.config.arrRowList.splice(index, 1);
                        return false;
                    }
                    index++;
                });
            } else {
                this.config.arrRowList.push(obj.dataset.rowIndex);
            } 
            obj.classList.toggle('active');
        } else {
            if (obj.classList.contains('active')) {
                obj.classList.toggle('active');
            }
        }
    }

    resetOrder ()
    {
        if (this.config.dom.header.querySelector('span.svg-arrow-item.active')) {
            this.config.dom.header.querySelector('span.svg-arrow-item.active').classList.toggle('active');
            this.config.objSortList = {};
        }
    }

    resetActiveSelection ()
    {
        if (this.config.arrRowList.length) {
            this.config.dom.content.querySelectorAll('.data-row').forEach( (row) => { this.toggleDataRow(row, true); });
            this.config.arrRowList = [];
        }
    }
}
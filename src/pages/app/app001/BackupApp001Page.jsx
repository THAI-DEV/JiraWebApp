{
  /* <AccordionTab header="Page (Optional)">
          <div className="grid">
            <div className="col-3">
              <label className="font-bold block mb-2">Page No</label>
              <InputNumber
                className="w-full"
                inputId="minmax-buttons"
                value={pageNo}
                onValueChange={(e) => setPageNo(e.value)}
                mode="decimal"
                showButtons
                min={0}
                max={100}
              />
            </div>

            <div className="col-2">
              <label className="font-bold block mb-2">Row Per Page</label>
              <InputNumber
                className="w-full"
                inputId="minmax-buttons"
                value={rowPerPage}
                onValueChange={(e) => setRowPerPage(e.value)}
                mode="decimal"
                showButtons
                min={0}
                max={100}
              />
            </div>
            <div className="col-2">
              <label htmlFor="">ccc</label>

              <div className="col-2">0 = all page</div>
            </div>
          </div>
        </AccordionTab> */
}

/*
  if (assignee.code == null && reporter.code == null && project.code == null) {
       showPopupMsg(
         'warn',
         'Warning',
        'ควรระบุ Assignee, Reporter หรือ Project อย่างน้อย 1 อย่าง เพราะอาจจะได้ข้อมูลที่มากเกินไป',
         10000,
       );
     }
*/

/*
  useEffect(() => {
    // console.log('Use Effect');

    let id = null;
    if (isAutoRefresh) {
      setCountdown(defaultAutoRefreshVal - 1);
      id = setInterval(() => {
        // console.log('Call Interval : ' + id);

        autoBtn.current.click();
      }, 1000 * defaultAutoRefreshVal); // 1 minute

      // console.log('Set Interval : ' + id);
    }
    return () => {
      if (id != null) {
        clearInterval(id);
        // console.log('Clear Interval : ' + id);
      }
    };
  }, [isAutoRefresh]);

*/

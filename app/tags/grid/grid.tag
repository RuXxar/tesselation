<tesselation-grid>
  <yield from="grid"/>

  <script>
    var tag = this;
    var columns = tag.opts.columns;


    function setColumns(columns) {
      document.querySelectorAll('tesselation-grid > *').forEach((element) = > {
        element.style.width = (100 / columns) + "%";
    })
      ;


      tag.update();
    }

    function addElementToRowAndColumn() {
    }

    tag.on('mount', function () {
//      setColumns(tag.opts.columns);
      addElementToRowAndColumn();
    });

  </script>

  <style>
    tesselation-grid {
      position: relative;
      width: 1280px;
      column-count: 3;
      display: block;
    }

    tesselation-grid > *:nth-child(1n) {
      width: 100px;
      vertical-align: top;
      display: inline-block;
    }

  </style>

</tesselation-grid>


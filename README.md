<h1>Introduction to d3.js</h1>
<h3>by Mike Taptich</h3>

<p>This two-part introduction to <a href="http://d3js.org/" target="_blank">d3.js</a> is intended for beginners, even those with limited exposure to <a href="http://www.codecademy.com/en/tracks/javascript" target="_blank">JavaScript</a> -- the language used by web browsers.  We will cover some of the basic concepts and applications of d3 and use these new tools to make interactive graphs and maps.</p>

<p> If you are not familiar with d3's capabilities, here is a list of my favorite data visualization in d3.js in no particular order:</p>
  <ul>
    <li>Victor Powell's visual explanation of the <a href="http://setosa.io/pythagorean/" target="_blank">Pythagorean Theorem</a>.</li>
    <li>Anything that <a href="http://bost.ocks.org/mike/" target="_blank">Mike Bostock</a> creates <a href="http://bl.ocks.org/mbostock" target="_blank">as examples</a> or at the <a href="http://www.nytimes.com/interactive/2013/09/25/sports/americas-cup-course.html" target="_blank">New York Times</a>.</li>
    <li><a href="http://air.nullschool.net/" target="_blank">This</a> crazy map showing wind speeds in Tokyo, Japan.</li>
    <li>Mike Barry and Brian Card's visualizations of <a href="http://mbtaviz.github.io/" target="_blank">subway ridership in Boston</a>.</li>
    <li>Square's crazy fast <a href="http://square.github.io/crossfilter/" target="_blank">filtering library</a> applied to airplaine data.</li>
    <li>For the life of me, I can't find the original source, but creating networks using click and drag mouse events (<a href="http://ce11gsi.appspot.com/stylesheets/process_LCA.html" target="_blank">I used this in one of my engineering classes as an example</a>). </li>
    <li><a href="http://bost.ocks.org/mike/nations/" target="_blank">Wealth and Health of Nations</a> by Mike Bostock again but made famous by <a href="http://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen" target="_blank">Tom Carden of Gapminder</a>. </li>
    <li>This way of visualizing multivariate data by <a href="http://benjiec.github.io/scatter-matrix/demo/demo.html" target="_blank">benjiec</a>.</li>
    <li>Gridlock vs. bottlenecks explained by <a href="http://setosa.io/blog/2014/09/02/gridlock/" target="_blank">Lewis Lehe</a>.</li>
    <li>Jason Davies animated <a href="http://www.jasondavies.com/animated-bezier/" target="_blank">Bezier</a> curves. </li>
    <li>All the <a href="https://github.com/mbostock/d3/wiki/Gallery#basic-charts" target="_blank">basic charts</a> that I use in my research from the d3.js example page.</li>

  </ul>


  <h2>OGR2OGR & Topojson</h2>
  <p>Download the Gdal library <a href="http://www.kyngchaos.com/software/frameworks#gdal_complete" target="_blank">here</a>. </p>
   <pre><code>ogr2ogr -f GeoJSON state_pol.json state_pol.shp
topojson  -o state_pol_topo.json --properties STPOSTAL state_pol.json </code></pre>

<p><a href="http://mtaptich.github.io/d3-lessons/" >Click to Begin!</button> </p>

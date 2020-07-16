//apis and external json files
const censusTractMapURL = fetch("./nyc_tracts2020_clipped.json");
const responseRateURLBrooklyn = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=RESP_DATE,GEO_ID,CRRALL,CRRINT,DRRALL,DRRINT,NAME&in=county:047&in=state:36&for=tract:*&key=97309691bae4d51923378713db7ff6909d26028d"
);
const responseRateURLStatenIsland = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=RESP_DATE,GEO_ID,CRRALL,CRRINT,DRRALL,DRRINT,NAME&in=county:085&in=state:36&for=tract:*&key=97309691bae4d51923378713db7ff6909d26028d"
);
const responseRateURLQueens = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=RESP_DATE,GEO_ID,CRRALL,CRRINT,DRRALL,DRRINT,NAME&in=county:081&in=state:36&for=tract:*&key=97309691bae4d51923378713db7ff6909d26028d"
);
const responseRateURLBronx = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=RESP_DATE,GEO_ID,CRRALL,CRRINT,DRRALL,DRRINT,NAME&in=county:005&in=state:36&for=tract:*&key=97309691bae4d51923378713db7ff6909d26028d"
);
const responseRateURLManhattan = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=RESP_DATE,GEO_ID,CRRALL,CRRINT,DRRALL,DRRINT,NAME&in=county:061&in=state:36&for=tract:*&key=97309691bae4d51923378713db7ff6909d26028d"
);
const nycBoroughMapURL = fetch("./nybb.json");

const cityAPI = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=RESP_DATE,CRRALL&for=place:51000&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);
const statenIslandAPI = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=GEO_ID,NAME,CRRALL,DRRALL,CRRINT,DRRINT,RESP_DATE&for=county:085&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);
const brooklynAPI = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=GEO_ID,NAME,CRRALL,DRRALL,CRRINT,DRRINT,RESP_DATE&for=county:047&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const manhattanAPI = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=GEO_ID,NAME,CRRALL,DRRALL,CRRINT,DRRINT,RESP_DATE&for=county:061&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const bronxAPI = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=GEO_ID,NAME,CRRALL,DRRALL,CRRINT,DRRINT,RESP_DATE&for=county:005&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const queensAPI = fetch(
  "https://api.census.gov/data/2020/dec/responserate?get=GEO_ID,NAME,CRRALL,DRRALL,CRRINT,DRRINT,RESP_DATE&for=county:081&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const statenIsland2010API = fetch(
  "https://api.census.gov/data/2010/dec/responserate?get=GEO_ID,FSRR2010&for=county:085&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const brooklyn2010API = fetch(
  "https://api.census.gov/data/2010/dec/responserate?get=GEO_ID,FSRR2010&for=county:047&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const manhattan2010API = fetch(
  "https://api.census.gov/data/2010/dec/responserate?get=GEO_ID,FSRR2010&for=county:061&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const bronx2010API = fetch(
  "https://api.census.gov/data/2010/dec/responserate?get=GEO_ID,FSRR2010&for=county:005&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

const queens2010API = fetch(
  "https://api.census.gov/data/2010/dec/responserate?get=GEO_ID,FSRR2010&for=county:081&in=state:36&key=97309691bae4d51923378713db7ff6909d26028d"
);

//globals
let width = 600,
  height = 700,
  centered;
const margin = { bottom: 50, top: 50, left: 10, right: 10 };
const colors = ["#ea0029", "#ff9b8e", "#9dbfe0", "#0084c0"];
const noDataColor = "#c8ebce";

const nycdMapURL = fetch("./nycd.json");
Promise.all([
  censusTractMapURL,
  responseRateURLBrooklyn,
  responseRateURLStatenIsland,
  responseRateURLQueens,
  responseRateURLBronx,
  responseRateURLManhattan,
  nycBoroughMapURL,
  statenIslandAPI,
  brooklynAPI,
  manhattanAPI,
  bronxAPI,
  queensAPI,
  statenIsland2010API,
  brooklyn2010API,
  manhattan2010API,
  bronx2010API,
  queens2010API,
  nycdMapURL,
])
  .then((values) => {
    return Promise.all(values.map((resp) => resp.json()));
  })
  .then(
    ([
      nycCensuTractMapData,
      brooklynData,
      statenIslandData,
      queensData,
      bronxData,
      manhattanData,
      nycBoroughMapData,
      statenIslandAllData,
      brooklynAllData,
      manhattanAllData,
      bronxAllData,
      queensAllData,
      statenIsland2010AllData,
      brooklyn2010AllData,
      manhattan2010AllData,
      bronx2010AllData,
      queens2010AllData,
      nycdMapData,
    ]) => {
      nycMap = topojson.feature(nycCensuTractMapData, {
        type: "GeometryCollection",
        geometries:
          nycCensuTractMapData.objects.nyc_tracts2020_clipped.geometries,
      });

      nycBoroughMap = topojson.feature(nycBoroughMapData, {
        type: "GeometryCollection",
        geometries: nycBoroughMapData.objects.nybb.geometries,
      });

      nycdMap = topojson.feature(nycdMapData, {
        type: "GeometryCollection",
        geometries: nycdMapData.objects.nycd.geometries,
      });

      const cdNames = [
        {
          Location: "Riverdale",
          CD: 208,
        },
        {
          Location: "Williamsbridge",
          CD: 212,
        },
        {
          Location: "Throgs Neck",
          CD: 210,
        },
        {
          Location: "Pelham Parkway",
          CD: 211,
        },
        {
          Location: "Morrisania",
          CD: 203,
        },
        {
          Location: "East Tremont",
          CD: 206,
        },
        {
          Location: "Bedford Park",
          CD: 207,
        },
        {
          Location: "University Heights",
          CD: 205,
        },
        {
          Location: "Concourse/Highbridge",
          CD: 204,
        },
        {
          Location: "Unionport/Soundview",
          CD: 209,
        },
        {
          Location: "Mott Haven",
          CD: 201,
        },
        {
          Location: "Hunts Point",
          CD: 202,
        },
        {
          Location: "Washington Heights",
          CD: 112,
        },
        {
          Location: "Manhattanville",
          CD: 109,
        },
        {
          Location: "Central Harlem",
          CD: 110,
        },
        {
          Location: "East Harlem",
          CD: 111,
        },
        {
          Location: "Upper East Side",
          CD: 108,
        },
        {
          Location: "Upper West Side",
          CD: 107,
        },
        {
          Location: "Chelsea/Clinton",
          CD: 104,
        },
        {
          Location: "Midtown Business District",
          CD: 105,
        },
        {
          Location: "Murray Hill/Stuyvesant",
          CD: 106,
        },
        {
          Location: "Lower East Side",
          CD: 103,
        },
        {
          Location: "Battery Park/Tribeca",
          CD: 101,
        },
        {
          Location: "Greenwich Village",
          CD: 102,
        },
        {
          Location: "Tottenville",
          CD: 503,
        },
        {
          Location: "South Beach",
          CD: 502,
        },
        {
          Location: "St. George",
          CD: 501,
        },
        {
          Location: "Williamsburg/Greenpoint",
          CD: 301,
        },
        {
          Location: "Bushwick",
          CD: 304,
        },
        {
          Location: "Bedford Stuyvesant",
          CD: 303,
        },
        {
          Location: "Fort Greene/Brooklyn Hts",
          CD: 302,
        },
        {
          Location: "Park Slope",
          CD: 306,
        },
        {
          Location: "Crown Heights North",
          CD: 308,
        },
        {
          Location: "Brownsville",
          CD: 316,
        },
        {
          Location: "East New York",
          CD: 305,
        },
        {
          Location: "Canarsie",
          CD: 318,
        },
        {
          Location: "East Flatbush",
          CD: 317,
        },
        {
          Location: "Crown Heights South",
          CD: 309,
        },
        {
          Location: "Sunset Park",
          CD: 307,
        },
        {
          Location: "Bay Ridge",
          CD: 310,
        },
        {
          Location: "Borough Park",
          CD: 312,
        },
        {
          Location: "Flatbush/Midwood",
          CD: 314,
        },
        {
          Location: "Sheepshead Bay",
          CD: 315,
        },
        {
          Location: "Bensonhurst",
          CD: 311,
        },
        {
          Location: "Coney Island",
          CD: 313,
        },
        {
          Location: "Astoria",
          CD: 401,
        },
        {
          Location: "Jackson Heights",
          CD: 403,
        },
        {
          Location: "Flushing",
          CD: 407,
        },
        {
          Location: "Bayside",
          CD: 411,
        },
        {
          Location: "Queens Village",
          CD: 413,
        },
        {
          Location: "Fresh Meadows/Briarwood",
          CD: 408,
        },
        {
          Location: "Elmhurst/Corona",
          CD: 404,
        },
        {
          Location: "Rego Park/Forest Hills",
          CD: 406,
        },
        {
          Location: "Sunnyside/Woodside",
          CD: 402,
        },
        {
          Location: "Ridgewood/Glendale",
          CD: 405,
        },
        {
          Location: "Woodhaven",
          CD: 409,
        },
        {
          Location: "Jamaica/St. Albans",
          CD: 412,
        },
        {
          Location: "Howard Beach",
          CD: 410,
        },
        {
          Location: "The Rockaways",
          CD: 414,
        },
        {
          Location: "Bronx",
          CD: 36005,
        },
        {
          Location: "Brooklyn",
          CD: 36047,
        },
        {
          Location: "Manhattan",
          CD: 36061,
        },
        {
          Location: "Queens",
          CD: 36081,
        },
        {
          Location: "Staten Island",
          CD: 36085,
        },
        {
          Location: "New York City",
          CD: 3651000,
        },
      ];
      nycdMap.features.forEach((feature) => {
        cdNames.forEach((name) => {
          if (feature.properties.BoroCD == name.CD) {
            feature.properties.Name = name.Location;
          }
        });
      });

      //this is the date the data was retrieved
      let {
        [1]: { [0]: dateRetrieved },
      } = brooklynData;

      let dateRetrievedSpan = document.querySelectorAll(".date-retrieved");
      for (let i = 0; i < dateRetrievedSpan.length; i++) {
        dateRetrievedSpan[i].textContent = dateRetrieved;
      }

      //consolidate the 2010 borough data
      let tenConsolidatedData = statenIsland2010AllData.concat(
        brooklyn2010AllData,
        manhattan2010AllData,
        bronx2010AllData,
        queens2010AllData
      );
      //consolide the 2020 borough data
      let twentyConsolidedData = statenIslandAllData.concat(
        brooklynAllData,
        manhattanAllData,
        bronxAllData,
        queensAllData
      );
      //this function removes the odd indices
      const removeOddArrays = (array) => {
        for (i = 0; i < array.length; i++) {
          array.splice(i, 1);
        }
      };
      //now we run both the 2010 and 2020 array through the function to strip out the odd indices
      removeOddArrays(tenConsolidatedData);
      removeOddArrays(twentyConsolidedData);

      //ny cd numbers with names
      const responseRateMap = () => {
        //projection for ct map
        const projection = d3.geoMercator().fitSize([width, height], nycMap);

        const flipY = d3.geoTransform({
          point: function (x, y) {
            this.stream.point(x, -y);
          },
        });

        //projection for borough map
        const boroughProjection = d3
          .geoIdentity()
          .reflectY(true)
          .fitSize([width, height], nycBoroughMap);

        // ct geopath
        const geoPath = d3.geoPath().projection(projection);

        //borough geoPath
        const boroughGeoPath = d3.geoPath().projection(boroughProjection);

        //zoom
        const zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);

        let instructionParagraphs = document.querySelectorAll(
          ".instruction-paragraph"
        );

        //this is the function that removes active class from the scroll instruction for the map. It is called in the zoom function
        const removeScrollInstruction = () => {
          instructionParagraphs[0].classList.remove(
            "instruction-paragraph-active"
          );
          if (
            !instructionParagraphs[1].classList.contains("function-executed")
          ) {
            instructionParagraphs[1].classList.add(
              "instruction-paragraph-active"
            );
          }
        };

        //function to remove active class from map instructing drag
        const removeDragInstruction = () => {
          instructionParagraphs[1].classList.remove(
            "instruction-paragraph-active"
          );
          instructionParagraphs[1].classList.add("function-executed");
        };

        const svgMap = d3
          .select(".map-wrapper svg")
          .attr("width", width)
          .attr("height", height)
          .on("mousedown", removeDragInstruction);

        // draw census tract map
        d3.select(".map-wrapper svg")
          .attr("class", "map")
          .append("g")
          .attr("class", "ct-map")
          .selectAll("path")
          .data(nycMap.features)
          .enter()
          .append("path")
          .attr("d", geoPath)
          .attr("data-tract", (d) => {
            return d.properties.TRACT;
          })
          .attr("data-county", (d) => {
            return d.properties.COUNTY;
          });
        // .style("stroke", "white")
        // .style("stroke-width", "0.5px");

        //draw the cd map
        d3.select(".map-wrapper svg")
          .append("g")
          .attr("class", "cd-map")
          .selectAll("path")
          .data(nycdMap.features)
          .enter()
          .append("path")
          .attr("d", boroughGeoPath)
          .attr("data-cd", (d) => {
            return d.properties.BoroCD;
          })
          .style("stroke", "gray")
          .style("stroke-width", "0.5px")
          .style("stroke-dasharray", "0.5px")
          .style("opacity", 0);

        //add cd labels from the newly added cdNames
        d3.select(".map-wrapper svg")
          .append("g")
          .attr("class", "cd-labels")
          .selectAll("text")
          .data(nycdMap.features)
          .enter()
          .append("text")
          .text((d) => {
            return d.properties.Name;
          })
          .attr("transform", (d) => {
            return "translate(" + boroughGeoPath.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .style("fill-opacity", 0)
          .style("font-size", "3px")
          .style("fill", "gray");

        //draw borough map
        d3.select(".map-wrapper svg")
          .append("g")
          .attr("class", "borough-map")
          .selectAll("path")
          .data(nycBoroughMap.features)
          .enter()
          .append("path")
          .attr("class", "zoomed-out")
          .attr("d", boroughGeoPath)
          .style("stroke", "gray")
          .style("stroke-width", 1)
          .style("fill", noDataColor)
          .attr("data-boro", (d) => {
            return d.properties.BoroName;
          });

        //add borough labels
        d3.select(".map-wrapper svg")
          .append("g")
          .attr("class", "boro-labels")
          .selectAll("text")
          .data(nycBoroughMap.features)
          .enter()
          .append("text")
          .text((d) => {
            return d.properties.BoroName;
          })
          .attr("transform", (d) => {
            return "translate(" + boroughGeoPath.centroid(d) + ")";
          })
          .attr("text-anchor", "middle");

        d3.select(".map-wrapper svg").call(zoom);

        // let's color the borough map

        let boroughPaths = document.querySelectorAll(
          ".map-wrapper .borough-map path"
        );

        function zoomed(event) {
          d3.selectAll(".map-wrapper .map g") // To prevent stroke width from scaling
            .attr("transform", d3.event.transform);
          let k = d3.event.transform.k;
          let boroLabels = document.querySelectorAll(
            ".map-wrapper .map .boro-labels text"
          );
          for (let i = 0; i < boroughPaths.length; i++) {
            if (k > 1) {
              removeScrollInstruction();
            }
            if (k > 1.4) {
              boroughPaths[
                i
              ].style.cssText = `transition:fill-opacity 1s ease;fill-opacity:0;`;
              boroughPaths[i].classList.remove("zoomed-out");
              boroLabels[i].style.opacity = 0.5;
            } else {
              boroughPathColors();
              boroLabels[i].style.opacity = 1;
              boroughPaths[i].classList.add("zoomed-out");
            }
            if (k > 1.8) {
              boroLabels[i].style.opacity = 0;
            } else {
              boroLabels[i].style.opactiy = 0.5;
            }
          }

          let cdLabels = document.querySelectorAll(
            ".map-wrapper .map .cd-labels text"
          );
          let cdPaths = document.querySelectorAll(
            ".map-wrapper .map .cd-map path"
          );

          for (let i = 0; i < cdLabels.length; i++) {
            if (k > 3) {
              cdLabels[i].style.fillOpacity = 1;
              cdPaths[i].style.opacity = 1;
            } else {
              cdLabels[i].style.fillOpacity = 0;
              cdPaths[i].style.opacity = 0;
            }
          }
        }

        let ctPaths = document.querySelectorAll(
          ".map-wrapper svg .ct-map path"
        );
        //bind the response rate data from each county with the map
        brooklynData.forEach((datum) => {
          let matchingPaths = document.querySelectorAll(
            `.map-wrapper svg .ct-map path[data-tract='${datum[9]}']`
          );
          matchingPaths.forEach((path) => {
            if (path.dataset.county == "047") {
              path.dataset.responseRate = datum[2];
              path.dataset.internetRate = datum[3];
              path.dataset.countryAndTract = datum[6];
            }
          });
        });

        statenIslandData.forEach((datum) => {
          let matchingPaths = document.querySelectorAll(
            `.map-wrapper svg path[data-tract='${datum[9]}']`
          );
          matchingPaths.forEach((path) => {
            if (path.dataset.county == "085") {
              path.dataset.responseRate = datum[2];
              path.dataset.internetRate = datum[3];
              path.dataset.countryAndTract = datum[6];
            }
          });
        });

        queensData.forEach((datum) => {
          let matchingPaths = document.querySelectorAll(
            `.map-wrapper svg path[data-tract='${datum[9]}']`
          );
          matchingPaths.forEach((path) => {
            if (path.dataset.county == "081") {
              path.dataset.responseRate = datum[2];
              path.dataset.internetRate = datum[3];
              path.dataset.countryAndTract = datum[6];
            }
          });
        });

        bronxData.forEach((datum) => {
          let matchingPaths = document.querySelectorAll(
            `.map-wrapper svg path[data-tract='${datum[9]}']`
          );
          matchingPaths.forEach((path) => {
            if (path.dataset.county == "005") {
              path.dataset.responseRate = datum[2];
              path.dataset.internetRate = datum[3];
              path.dataset.countryAndTract = datum[6];
            }
          });
        });

        manhattanData.forEach((datum) => {
          let matchingPaths = document.querySelectorAll(
            `.map-wrapper svg path[data-tract='${datum[9]}']`
          );
          matchingPaths.forEach((path) => {
            if (path.dataset.county == "061") {
              path.dataset.responseRate = datum[2];
              path.dataset.internetRate = datum[3];
              path.dataset.countryAndTract = datum[6];
            }
          });
        });

        //bind data to borough map
        boroughPaths.forEach((path) => {
          if (path.dataset.boro == "Staten Island") {
            path.dataset.responseRate = statenIslandAllData[1][2];
          }
          if (path.dataset.boro == "Manhattan") {
            path.dataset.responseRate = manhattanAllData[1][2];
          }
          if (path.dataset.boro == "Brooklyn") {
            path.dataset.responseRate = brooklynAllData[1][2];
          }
          if (path.dataset.boro == "Bronx") {
            path.dataset.responseRate = bronxAllData[1][2];
          }
          if (path.dataset.boro == "Queens") {
            path.dataset.responseRate = queensAllData[1][2];
          }
        });

        //adding colors to borough map based on data
        //this is wrapped in a function so it can be called within the zoom function

        const boroughPathColors = () => {
          boroughPaths.forEach((path) => {
            if (path.dataset.responseRate == null) {
              path.style.fill = noDataColor;
              path.style.cssText = "transition: fill-opacity 1s ease";
            }

            if (
              path.dataset.responseRate > 0 &&
              path.dataset.responseRate <= 25
            ) {
              path.style.fill = colors[0];
              path.style.cssText = `transition: fill-opacity 1s ease; fill:${colors[0]};fill-opacity:1`;
            }
            if (
              path.dataset.responseRate >= 25 &&
              path.dataset.responseRate <= 50
            ) {
              path.style.fill = colors[1];
              path.style.cssText = `transition: fill-opacity 1s ease; fill:${colors[1]};fill-opacity:1`;
            }
            if (
              path.dataset.responseRate >= 50 &&
              path.dataset.responseRate <= 75
            ) {
              path.style.fill = colors[2];
              path.style.cssText = `transition: fill-opacity 1s ease; fill:${colors[2]};fill-opacity:1`;
            }
            if (
              path.dataset.responseRate >= 75 &&
              path.dataset.responseRate <= 100
            ) {
              path.style.fill = colors[3];
              path.style.cssText = `transition: fill-opacity 1s ease; fill:${colors[3]};fill-opacity:1`;
            }
          });
        };

        boroughPathColors();

        //node list of ct map paths

        ctPaths.forEach((path) => {
          //apply colors
          if (path.dataset.responseRate == null) {
            path.style.fill = noDataColor;
          }

          if (
            path.dataset.responseRate > 0 &&
            path.dataset.responseRate <= 25
          ) {
            path.style.fill = colors[0];
          }
          if (
            path.dataset.responseRate >= 25 &&
            path.dataset.responseRate <= 50
          ) {
            path.style.fill = colors[1];
          }
          if (
            path.dataset.responseRate >= 50 &&
            path.dataset.responseRate <= 75
          ) {
            path.style.fill = colors[2];
          }
          if (
            path.dataset.responseRate >= 75 &&
            path.dataset.responseRate <= 100
          ) {
            path.style.fill = colors[3];
          }

          let tooltip = document.querySelector(".tooltip");
          path.addEventListener("mouseenter", (event) => {
            tooltip.style.display = "block";
            tooltip.style.left = `${event.clientX + 20}px`;
            tooltip.style.top = `${event.clientY}px`;
            tooltip.innerHTML = `<div><i style="background-color:${
              event.target.style.fill
            }"></i><span>${event.target.dataset.countryAndTract}</span></div>
          <p>Overall Response Rate: ${
            event.target.dataset.responseRate + "%"
          }</p><p>Internet Response Rate: ${
              event.target.dataset.internetRate + "%"
            }</p>`;
            if (event.target.dataset.responseRate == null) {
              tooltip.innerHTML = `<i style="background-color:${event.target.style.fill}"></i><span>No available data</span>`;
            }
          });

          path.addEventListener("mouseleave", (event) => {
            tooltip.style = null;
          });
        });

        // legend colors

        let legendIcons = document.querySelectorAll(".legend-wrapper i");
        for (let i = 0; i < legendIcons.length; i++) {
          legendIcons[i].style.backgroundColor = colors[i];
        }

        //selecting the zoom in and zoom out icons
        let zoomOutIcon = document.querySelector(".zoom-out-icon");

        //zoom-out when clicking the zoom out icon
        const zoomOut = () => {
          svgMap
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity,
              d3.zoomTransform(svgMap.node()).invert([width / 2, height / 2])
            );
        };

        zoomOutIcon.addEventListener("click", zoomOut);

        //end of response rate map function
      };

      const responseRateBarChart = () => {
        let xDomain = [];
        for (i = 0; i < tenConsolidatedData.length; i++) {
          xDomain.push(tenConsolidatedData[i][3]);
        }

        //bar chart height

        const barChartHeight = height - 300;

        const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(xDomain)
          .padding(0.5);

        const yScale = d3
          .scaleLinear()
          .range([barChartHeight, 0])
          .domain([0, 70]);

        const barChartSVG = d3
          .select(".bar-chart-wrapper svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", barChartHeight + margin.bottom + margin.top);

        // 2010 bars
        const bars = barChartSVG
          .append("g")
          .attr("class", "bars bars-2010")
          .selectAll("rect")
          .data(tenConsolidatedData)
          .enter()
          .append("rect")
          .attr("x", (d) => {
            return xScale(d[3]);
          })
          .attr("width", (d) => {
            return xScale.bandwidth() / 1.2;
          })
          .attr("transform", `translate(${margin.left + 30},${margin.bottom})`)
          .attr("y", (d) => {
            return yScale(d[1]);
          })
          .style("height", (d) => barChartHeight - yScale(d[1]) + "px")
          .style("fill", colors[0]);

        //2010 labels
        barChartSVG
          .append("g")
          .attr("class", "labels-2010")
          .selectAll("text")
          .data(tenConsolidatedData)
          .enter()
          .append("text")
          .text((d) => {
            return d[1] + "%";
          })
          .attr("x", (d) => {
            return xScale(d[3]) + xScale.bandwidth() / 1.2 + 18;
          })
          .attr("y", (d) => {
            return yScale(d[1]);
          })
          .attr("dy", "15%")
          .attr("text-anchor", "middle")
          .style("fill", "white");

        //2020 bars
        barChartSVG
          .append("g")
          .attr("class", "bars bars-2020")
          .selectAll("rect")
          .data(twentyConsolidedData)
          .enter()
          .append("rect")
          .attr("x", (d) => {
            return xScale(d[8]) + 25;
          })
          .attr("width", (d) => {
            return xScale.bandwidth() / 1.2;
          })
          .attr("transform", `translate(${margin.left + 30},${margin.bottom})`)
          .attr("y", height - 310)
          .style("height", "10px")
          .style("fill", colors[3]);

        //2020 labels
        barChartSVG
          .append("g")
          .attr("class", "labels-2020")
          .selectAll("text")
          .data(twentyConsolidedData)
          .enter()
          .append("text")
          .text((d) => {
            return d[2] + "%";
          })
          .attr("x", (d) => {
            return xScale(d[8]) + xScale.bandwidth() / 1.2 + 42;
          })
          .attr("y", (d) => {
            return yScale(d[2]);
          })
          .attr("dy", "15%")
          .attr("text-anchor", "middle")
          .style("fill", "white")
          .style("opacity", 0);

        //xAxis
        barChartSVG
          .append("g")
          .attr("class", "x-axis")
          .call(d3.axisBottom(xScale).tickSize([0]))
          .attr(
            "transform",
            `translate(${margin.left + 30},${barChartHeight + margin.bottom})`
          );

        const xAxisLabels = document.querySelectorAll(".x-axis .tick text");
        for (let i = 0; i < xAxisLabels.length; i++) {
          if (xAxisLabels[i].textContent == "085") {
            xAxisLabels[i].textContent = "Staten Island";
          }
          if (xAxisLabels[i].textContent == "047") {
            xAxisLabels[i].textContent = "Brooklyn";
          }
          if (xAxisLabels[i].textContent == "005") {
            xAxisLabels[i].textContent = "Bronx";
          }
          if (xAxisLabels[i].textContent == "061") {
            xAxisLabels[i].textContent = "Manhattan";
          }
          if (xAxisLabels[i].textContent == "081") {
            xAxisLabels[i].textContent = "Queens";
          }
        }

        //legend

        const legendIcon = document.querySelectorAll(
          ".bar-chart-wrapper .legend-wrapper i"
        );
        legendIcon[0].style.backgroundColor = colors[0];
        legendIcon[1].style.backgroundColor = colors[3];

        //intersection obvserver
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                d3.selectAll(".bars-2020 rect")
                  .style("height", (d) => barChartHeight - yScale(d[2]) + "px")
                  .style("y", (d) => {
                    return yScale(d[2]) + "px";
                  });

                d3.selectAll(".labels-2020 text").style("opacity", 1);
              }
            });
          },
          { threshold: 0.7 }
        );
        observer.observe(document.querySelector(".bar-chart-wrapper"));
        // end of function
      };

      //run the functions
      responseRateBarChart();
      responseRateMap();

      //await ends here
    }
  )
  .catch((error) => console.log(error.message));

//this js is for the census tract snapshot section

//data
const nyc_average = [{ average: 51.6 }];
const manhattanCensusComparison_low = [
  {
    county_census_tract: "Tract 84, New York",
    census_tract: "Tract 84",
    response_rate: 21.5,
  },
  {
    county_census_tract: "Tract 82, New York",
    census_tract: "Tract 82",
    response_rate: 47.6,
  },
  {
    county_census_tract: "Tract 109, New York",
    census_tract: "Tract 109",
    response_rate: 38.4,
  },
  {
    county_census_tract: "Tract 113, New York",
    census_tract: "Tract 113",
    response_rate: 36.3,
  },
  {
    county_census_tract: "Tract 96, New York",
    census_tract: "Tract 96",
    response_rate: 24.6,
  },
  {
    county_census_tract: "Tract 76, New York",
    census_tract: "Tract 76",
    response_rate: 36.7,
  },
];

const manhattanCensusComparison_high = [
  {
    county_census_tract: "Tract 275, New York",
    census_tract: "Tract 275",
    response_rate: 72.6,
  },
  {
    county_census_tract: "Tract 287, New York",
    census_tract: "Tract 287",
    response_rate: 63.7,
  },
  {
    county_census_tract: "Tract 273, New York",
    census_tract: "Tract 273",
    response_rate: 71.4,
  },
  {
    county_census_tract: "Tract 265, New York",
    census_tract: "Tract 265",
    response_rate: 63.7,
  },
  {
    county_census_tract: "Tract 255, New York",
    census_tract: "Tract 255",
    response_rate: 61.6,
  },
];
const queensCensusComparison_low = [
  {
    county_census_tract: "Tract 199.01, Queens",
    census_tract: "Tract 199.01",
    response_rate: 28.3
  },
  {
    county_census_tract: "Tract 189, Queens",
    census_tract: "Tract 189",
    response_rate: 53.5
  },
  {
    county_census_tract: "Tract 187, Queens",
    census_tract: "Tract 187",
    response_rate: 47.5
  },
  {
    county_census_tract: "Tract 179.01, Queens",
    census_tract: "Tract 179.01",
    response_rate: 56.1
  },
  {
    county_census_tract: "Tract 185.01, Queens",
    census_tract: "Tract 185.01",
    response_rate: 63.2
  },
  {
    county_census_tract: "Tract 185.02, Queens",
    census_tract: "Tract 185.02",
    response_rate: 64.3
  }
]

const queensCensusComparison_high = [
  {
    county_census_tract: "Tract 1291.03, Queens",
    census_tract: "Tract 1291.03",
    response_rate: 72.6,
  },
  {
    county_census_tract: "Tract 1291.02, Queens",
    census_tract: "Tract 1291.02",
    response_rate: 69.6,
  },
  {
    county_census_tract: "Tract 1291.04, Queens",
    census_tract: "Tract 1291.04",
    response_rate: 65.4,
  },
  {
    county_census_tract: "Tract 1367, Queens",
    census_tract: "Tract 1367",
    response_rate: 67.7,
  },
];

const brooklynCensusComparison_low = [
  {
    county_census_tract: "Tract 46, Kings",
    census_tract: "Tract 46",
    response_rate: 47.5,
  },
  {
    county_census_tract: "Tract 44, Kings",
    census_tract: "Tract 44",
    response_rate: 64,
  },
  {
    county_census_tract: "Tract 64, Kings",
    census_tract: "Tract 64",
    response_rate: 54.5,
  },
  {
    county_census_tract: "Tract 62, Kings",
    census_tract: "Tract 62",
    response_rate: 56,
  },
];

const brooklynCensusComparison_high = [
  {
    county_census_tract: "Tract 656, Kings",
    census_tract: "Tract 656",
    response_rate: 68.8,
  },
  {
    county_census_tract: "Tract 654, Kings",
    census_tract: "Tract 654",
    response_rate: 60.6,
  },
  {
    county_census_tract: "Tract 652, Kings",
    census_tract: "Tract 652",
    response_rate: 53.1,
  },
  {
    county_census_tract: "Tract 646, Kings",
    census_tract: "Tract 646",
    response_rate: 53.9,
  },
  {
    county_census_tract: "Tract 640, Kings",
    census_tract: "Tract 640",
    response_rate: 49.5,
  },
  {
    county_census_tract: "Tract 636, Kings",
    census_tract: "Tract 636",
    response_rate: 57.1,
  },
];

const statenIslandCensusComparison_low = [
  {
    county_census_tract: "Tract 27, Richmond",
    census_tract: "Tract 27",
    response_rate: 25.8,
  },
  {
    county_census_tract: "Tract 21, Richmond",
    census_tract: "Tract 21",
    response_rate: 41.8,
  },
  {
    county_census_tract: "Tract 6, Richmond",
    census_tract: "Tract 6",
    response_rate: 54.7,
  },
  {
    county_census_tract: "Tract 29, Richmond",
    census_tract: "Tract 29",
    response_rate: 37.7,
  },
  {
    county_census_tract: "Tract 40.01, Richmond",
    census_tract: "Tract 40.01",
    response_rate: 51.3,
  },
];

const statenIslandCensusComparison_high = [
  {
    county_census_tract: "Tract 156.02, Richmond",
    census_tract: "Tract 156.02",
    response_rate: 72.6,
  },
  {
    county_census_tract: "Tract 156.03, Richmond",
    census_tract: "Tract 156.03",
    response_rate: 56.4,
  },
  {
    county_census_tract: "Tract 156.01, Richmond",
    census_tract: "Tract 156.01",
    response_rate: 65,
  },
  {
    county_census_tract: "Tract 170.11, Richmond",
    census_tract: "Tract 170.11",
    response_rate: 62.1,
  },
  {
    county_census_tract: "Tract 176, Richmond",
    census_tract: "Tract 176",
    response_rate: 57.9,
  },
];

const bronxCensusComparison_low = [
  {
    county_census_tract: "Tract 398, Bronx",
    census_tract: "Tract 398",
    response_rate: 35.8,
  },
  {
    county_census_tract: "Tract 386, Bronx",
    census_tract: "Tract 386",
    response_rate: 47.4,
  },
  {
    county_census_tract: "Tract 404, Bronx",
    census_tract: "Tract 404",
    response_rate: 39.3,
  },
  {
    county_census_tract: "Tract 396, Bronx",
    census_tract: "Tract 396",
    response_rate: 38.7,
  },
  {
    county_census_tract: "Tract 388, Bronx",
    census_tract: "Tract 388",
    response_rate: 39.8,
  },
];

const bronxCensusComparison_high = [
  {
    county_census_tract: "Tract 462.03, Bronx",
    census_tract: "Tract 462.03",
    response_rate: 74.2,
  },
  {
    county_census_tract: "Tract 462.04, Bronx",
    census_tract: "Tract 462.04",
    response_rate: 74.5,
  },
  {
    county_census_tract: "Tract 462.06, Bronx",
    census_tract: "Tract 462.06",
    response_rate: 48.6,
  },
  {
    county_census_tract: "Tract 462.07, Bronx",
    census_tract: "Tract 462.07",
    response_rate: 59.5,
  },
  {
    county_census_tract: "Tract 462.09, Bronx",
    census_tract: "Tract 462.09",
    response_rate: 44.3,
  },
];

// function that makes the charts. paramaters is the name of the data object and the class name we are adding in the html, which tells the js where to draw the chart
const createTractComparisonChart = (data, tract_class) => {
  let max;
  if (
    d3.max(data, (d) => {
      return d.response_rate;
    }) > nyc_average[0].average
  ) {
    max =
      d3.max(data, (d) => {
        return d.response_rate;
      }) + 7;
  } else {
    max = nyc_average[0].average + 5;
  }
  const xScale = d3
    .scaleLinear()
    .range([0, width - 50])
    .domain([0, max]);

  const yScale = d3
    .scaleBand()
    .range([0, height - 400])
    .domain(
      data.map((d) => {
        return d.census_tract;
      })
    );

  let comparisonChart = d3
    .select(`.tract-outlier-wrapper.${tract_class} svg`)
    .attr("width", width + margin.left + margin.right + 60)
    .attr("height", height - 400 + margin.top);

  let cityWideLine = comparisonChart
    .append("g")
    .attr("class", "nyc-average-line")
    .selectAll("line")
    .data(nyc_average)
    .enter()
    .append("line")
    .attr("x1", (d) => {
      return xScale(d.average) + margin.left + 70;
    })
    .attr("x2", (d) => {
      return xScale(d.average) + margin.left + 70;
    })
    .attr("y1", 0)
    .attr("y2", height - 400)
    .style("stroke-width", "3px")
    .style("stroke", "#6bbe7f")
    .style("stroke-dasharray", "3px");

  const lines = comparisonChart
    .append("g")
    .attr("class", "lines")
    .selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d) => {
      return margin.left + 85;
    })
    .attr("x2", (d) => {
      return xScale(d.response_rate) + margin.left + 50;
    })
    .attr("y1", (d) => {
      return yScale(d.census_tract) + yScale.bandwidth() / 2;
    })
    .attr("y2", (d) => {
      return yScale(d.census_tract) + yScale.bandwidth() / 2;
    })
    .style("stroke-width", "1px")
    .style("stroke", "lightgray");

  const comparisonCircles = comparisonChart
    .append("g")
    .attr("class", `${tract_class}-circles`)
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      return xScale(d.response_rate) + margin.left + 70;
    })
    .attr("cy", (d) => {
      return yScale(d.census_tract) + yScale.bandwidth() / 2;
    })
    .attr("r", 25)
    .attr("data-response-rate", (d) => {
      return d.response_rate;
    })
    .attr("data-census-tract", (d) => {
      return d.census_tract;
    });

  const comparisonLabels = comparisonChart
    .append("g")
    .attr("class", `${tract_class}-labels`)
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => {
      return d.response_rate + "%";
    })
    .attr("x", (d) => {
      return xScale(d.response_rate) + margin.left + 125;
    })
    .attr("y", (d) => {
      return yScale(d.census_tract) + yScale.bandwidth() / 2 + 5;
    })
    .attr("text-anchor", "middle");

  let yAxis = comparisonChart
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left + 80},0)`)
    .call(d3.axisLeft(yScale).tickSize(0))
    .call((g) => g.select(".domain").remove());

  let xAxis = comparisonChart
    .append("g")
    .attr("class", "x-axis")
    .call(
      d3
        .axisBottom(xScale)
        .tickFormat((d) => d + "%")
        .tickSizeOuter(0)
    )
    .attr("transform", `translate(${margin.left + 70},${height - 400})`);

  //adding colors

  let circles = document.querySelectorAll(`.${tract_class}-circles circle`);
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].dataset.responseRate == null) {
      circles[i].style.fill = noDataColor;
    }

    if (
      circles[i].dataset.responseRate > 0 &&
      circles[i].dataset.responseRate <= 25
    ) {
      circles[i].style.fill = colors[0];
    }
    if (
      circles[i].dataset.responseRate >= 25 &&
      circles[i].dataset.responseRate <= 50
    ) {
      circles[i].style.fill = colors[1];
    }
    if (
      circles[i].dataset.responseRate >= 50 &&
      circles[i].dataset.responseRate <= 75
    ) {
      circles[i].style.fill = colors[2];
    }
    if (
      circles[i].dataset.responseRate >= 75 &&
      circles[i].dataset.responseRate <= 100
    ) {
      circles[i].style.fill = colors[3];
    }
  }

  //adding colors to the legend

  let legendIcons = document.querySelectorAll(
    `.${tract_class} .legend-wrapper i`
  );

  for (let i = 0; i < legendIcons.length; i++) {
    if (!legendIcons[i].classList.contains("nyc-average-icon")) {
      legendIcons[i].style.backgroundColor = colors[i];
    }
  }
};

const tractButtons = document.querySelectorAll('.tract-container img')
tractButtons.forEach(button=>{
  button.addEventListener("click",event=>{
    let tractOutlierWrapper = document.querySelector('.tract-outlier-wrapper')
    tractOutlierWrapper.classList.add(`${event.target.dataset.tract}`)
    let inputData = event.target.dataset.data
  createTractComparisonChart(inputData, `${event.target.dataset.tract}`)
  })
})

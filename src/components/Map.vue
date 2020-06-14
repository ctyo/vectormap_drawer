<template>
  <div class="wrapper">
    <div id="map"></div>
    <div id="control">
      <select name=”mapstyle”>
        <option
          v-for="m in mapstyles"
          v-bind:value="m.id"
          v-bind:key="m.id"
        >
          {{ m.id }}
        </option>
      </select>
      <br>
      <input
        id="tile"
        type="text"
        placeholder="tile style"
        v-bind:value=style
      >
      <input
        id="token"
        type="text"
        v-bind:value=token
      >

      <hr>

      <p>input</p>
      <textarea
        v-model="input"
        @change="inputChange"
      ></textarea>

      <p>geojson</p>
      <textarea v-model="geojson"></textarea>

    </div>

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import polyline from "@mapbox/polyline";
import Geohash from "latlon-geohash";

export default {
  name: "Map",
  mounted: function() {
    // パラメーター処理
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
    }

    if (this.$route.query.style) {
      this.style = this.$route.query.style;
    }

    if (this.$route.query.input) {
      this.input = this.$route.query.input;
    }

    this.drawMap();
  },
  methods: {
    drawMap() {
      mapboxgl.accessToken = this.token;

      // eslint-disable-next-line no-unused-vars
      this.map = new mapboxgl.Map({
        container: "map",
        style: this.style,
        center: [139.767, 35.681],
        zoom: 11
      });
      this.map.on("load", () => {
        let geojson = {
          type: "FeatureCollection",
          features: []
        };
        this.map
          .addSource("trace", { type: "geojson", data: geojson })
          .addLayer({
            id: "trace-point",
            type: "symbol",
            source: "trace",
            layout: {
              "icon-image": "rocket-15",
              "icon-allow-overlap": true,
              "icon-size": 2
            },
            filter: ["==", "$type", "Point"]
          })
          .addLayer({
            id: "trace-line",
            type: "line",
            source: "trace",
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "red",
              "line-width": 5
            },
            filter: ["==", "$type", "LineString"]
          })
          .addLayer({
            id: "trace-geohash",
            type: "fill",
            source: "trace",
            paint: {
              "fill-color": "lightgreen",
              "fill-opacity": 0.5
            },
            filter: ["==", "$type", "Polygon"]
          })
          .addLayer({
            id: "trace-label",
            type: "symbol",
            source: "trace",
            layout: {
              "text-field": "{name}\n",
              "text-size": 12,
              "symbol-placement": "point"
            },
            paint: {
              "text-color": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                "rgba(255,0,0,0.75)",
                "rgba(255,0,0,0.75)"
              ],
              "text-halo-color": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                "rgba(255,255,0,0.75)",
                "rgba(255,255,255,0.75)"
              ],
              "text-halo-width": 2,
              "text-halo-blur": 0
            }
          });

        this.inputChange();
      });
    },
    inputChange() {
      let geojson = {
        type: "FeatureCollection",
        features: []
      };

      const input = this.input.split("\n");
      input.map(line => {
        if (line === "" || line === "\n") {
          return;
        }

        if (line.split(",").length === 2) {
          // 緯度経度行
          const point = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [line.split(",")[1] * 1, line.split(",")[0] * 1]
            },
            properties: {
              name: line,
              "marker-color": "#3bb2d0",
              "marker-size": "large",
              "marker-symbol": "rocket"
            }
          };
          geojson.features.push(point);
        } else if (line.length < 12) {
          // ここはだいたい決め打ちにしてるので...
          const nesw = Geohash.bounds(line);
          const polygon = {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [nesw.ne.lon, nesw.sw.lat],
                  [nesw.ne.lon, nesw.ne.lat],
                  [nesw.sw.lon, nesw.ne.lat],
                  [nesw.sw.lon, nesw.sw.lat]
                ]
              ]
            },
            properties: {
              name: line
            }
          };
          geojson.features.push(polygon);
        } else {
          const linestring = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: polyline.decode(line).map(p => {
                return [p[1], p[0]];
              })
            },
            properties: {
              name: line
            }
          };
          geojson.features.push(linestring);
        }
      });
      this.geojson = JSON.stringify(geojson, null, 2);
      this.map.getSource("trace").setData(geojson);
      this.changeUrl();
    },
    changeUrl() {
      this.$router.push({
        path: "/",
        query: {
          token: this.token !== this.mapstyles[0].token ? this.token : "",
          style: this.style !== this.mapstyles[0].style ? this.style : "",
          input: this.input
        }
      });
    }
  },
  data() {
    return {
      map: null,
      mapstyles: [
        {
          id: "mapbox",
          token:
            "pk.eyJ1IjoiY3R5byIsImEiOiJjanF2cTNjMm8weHVjNDJrOGV2anp3NDFwIn0.4pGtZ9Run1--9FR8NBkuqg",
          style: "mapbox://styles/mapbox/streets-v11"
        }
      ],
      token:
        "pk.eyJ1IjoiY3R5byIsImEiOiJjanF2cTNjMm8weHVjNDJrOGV2anp3NDFwIn0.4pGtZ9Run1--9FR8NBkuqg",
      style: "mapbox://styles/mapbox/streets-v11",
      input:
        "35.7094313,139.7130015\n" +
        "35.6590845,139.6552845\n" +
        "35.6563709,139.7610576\n" +
        "eixxEqiftYaaD|jQhgHcyA??\n" +
        "xn774\n" +
        "xn7784\n" +
        "xn777\n" +
        "xn774fk",
      geojson: "{}"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  height: 100%;
}
#map {
  width: calc(100% - 300px);
  height: 100%;
}
#control {
  width: 300px;
  height: 100%;
  overflow: scroll;
}
#control::-webkit-scrollbar {
  display: none;
}
#control > input,
#control > textarea {
  width: 90%;
}

#control > textarea {
  min-height: 300px;
  resize: vertical;
}
</style>

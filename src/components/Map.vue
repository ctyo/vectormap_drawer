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

export default {
  name: "Map",
  mounted: function() {
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
        this.map.addSource("trace", { type: "geojson", data: geojson });
        this.map.addLayer({
          id: "trace",
          type: "circle",
          source: "trace"
        });
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
              title: line
            }
          };
          geojson.features.push(point);
        } else if (line.length >= 12) {
          // geohash
          console.log("geohash");
          console.log(line);
        } else {
          console.log("polyline");
          console.log(line);
        }
      });
      this.geojson = JSON.stringify(geojson, null, 2);
      console.dir(this.map.getSource("trace"));
      this.map.getSource("trace").setData(geojson);
    }
  },
  data() {
    return {
      map: null,
      mapstyles: [
        {
          id: "mapbox",
          token: "pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw",
          style: "mapbox://styles/mapbox/streets-v11"
        }
      ],
      token: "pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw",
      style: "mapbox://styles/mapbox/streets-v11",
      input:
        "35.7094313,139.7130015\n" +
        "35.6590845,139.6552845\n" +
        "35.6563709,139.7610576",
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

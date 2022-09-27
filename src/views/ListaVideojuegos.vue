<template>
  <v-container fluid>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="2">
          <v-btn color="green" @click="AbrirDialogo('agregar')">
            Agregar
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="blue"
            @click="AbrirDialogo('editar')"
            :disabled="btnEditarDisabled"
          >
            Editar
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="orange"
            @click="Eliminar"
            :disabled="btnEliminarDisabled"
            >Eliminar
          </v-btn>
        </v-col>
        <v-col cols="2"> </v-col>
        <v-col cols="4">
          <v-text-field v-model="search" label="Buscar"> </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        show-select
        :search="search"
        v-model="selected"
        item-key="IdVideojuego"
      >
        <template v-slot:item.Consolas="{ item }">
          <div>
            {{ NombresConsolas(item) }}
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="mostrarDialogo" width="800" persistent>
      <v-card>
        <v-app-bar color="primary" dark>
          <v-row justify="end">
            <v-col> <h2>Agregar Videojuego</h2> </v-col>
            <v-col align="right">
              <v-icon @click="(mostrarDialogo = false), (videojuego = {})"
                >mdi-close</v-icon
              >
            </v-col>
          </v-row>
        </v-app-bar>
        <v-card-text>
          <v-text-field label="Titulo" v-model="Titulo"> </v-text-field>
          <v-text-field label="Descripcion" v-model="Descripcion">
          </v-text-field>
          <v-text-field label="Año" v-model="Año" type> </v-text-field>
          <v-text-field
            label="Calificacion"
            v-model="Calificacion"
          ></v-text-field>
          <v-text-field label="Genero" v-model="Genero"></v-text-field>
          <v-select
            label="Consolas"
            v-model="Consolas"
            :items="consolasExistentes"
            multiple
            item-text="Nombre"
            item-value="IdConsola"
            @change="ChangeConsolas"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row justify="end">
              <v-btn color="secondary">Cancelar</v-btn>
              <!-- <v-spacer></v-spacer> -->
              <v-col cols="1"></v-col>
              <v-btn color="primary" @click="Aceptar(accion)">Aceptar</v-btn>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Axios from "axios";
export default {
  name: "ListaVideojuegos",
  created() {
    Axios.get("https://localhost:44375/api/Consola/GetConsolas").then((res) => {
      this.consolasExistentes = res.data;
    });
    Axios.get("https://localhost:44375/api/videojuego/GetVideojuegos").then(
      (result) => {
        this.items = result.data;
      }
    );
  },

  data() {
    return {
      mostrarDialogo: false,
      search: "",
      consolasExistentes: [],
      consolasSelected: [],
      accion: "",
      IdVideojuego: null,
      Titulo: "",
      Descripcion: "",
      Año: null,
      Calificacion: null,
      Genero: "",
      Consolas: [],
      selected: [],
      headers: [
        {
          text: "Titulo",
          value: "Titulo",
        },
        {
          text: "Descripcion",
          value: "Descripcion",
        },
        {
          text: "Año",
          value: "Año",
        },
        {
          text: "Calificacion",
          value: "Calificacion",
        },
        {
          text: "Genero",
          value: "Genero",
        },
        {
          text: "Consolas",
          value: "Consolas",
        },
      ],
      items: [],
    };
  },
  methods: {
    NombresConsolas(item) {
      var consolas = "";
      if (item.Consolas != null) {
        item.Consolas.forEach((consola) => {
          consolas += consola.Nombre + ", ";
        });
      }
      return consolas;
    },
    AbrirDialogo(accion) {
      this.accion = "agregar";
      this.Titulo = "";
      this.Descripcion = "";
      this.Año = null;
      this.Calificacion = null;
      this.Genero = "";
      this.Consolas = [];

      if (accion == "editar") {
        this.accion = "editar";
        this.IdVideojuego = this.selected[0].IdVideojuego;
        this.Titulo = this.selected[0].Titulo;
        this.Descripcion = this.selected[0].Descripcion;
        this.Año = this.selected[0].Año;
        this.Calificacion = this.selected[0].Calificacion;
        this.Genero = this.selected[0].Genero;
        this.Consolas = this.selected[0].Consolas;
        this.consolasSelected = this.selected[0].Consolas;
      }
      this.mostrarDialogo = true;
    },
    Aceptar() {
      if (this.accion == "agregar") {
        Axios.post("https://localhost:44375/api/videojuego/Insertar", {
          Titulo: this.Titulo,
          Descripcion: this.Descripcion,
          Año: this.Año,
          Calificacion: this.Calificacion,
          Genero: this.Genero,
          Consolas: this.Consolas,
        })
          .then((res) => {
            alert(res.data);
            this.mostrarDialogo = false;
            this.ObtenerVideojuegos();
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.accion == "editar") {
        Axios.put("https://localhost:44375/api/videojuego/Actualizar", {
          IdVideojuego: this.IdVideojuego,
          Titulo: this.Titulo,
          Descripcion: this.Descripcion,
          Año: this.Año,
          Calificacion: this.Calificacion,
          Genero: this.Genero,
          Consolas: this.Consolas,
        })
          .then((res) => {
            alert(res.data);
            this.mostrarDialogo = false;
            this.selected = [];
            this.ObtenerVideojuegos();
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    ObtenerVideojuegos() {
      Axios.get("https://localhost:44375/api/videojuego/GetVideojuegos").then(
        (result) => {
          this.items = result.data;
        }
      );
    },
    Eliminar() {
      Axios.post(
        "https://localhost:44375/api/videojuego/Eliminar",
        this.selected
      ).then((res) => {
        alert(res.data);
        this.ObtenerVideojuegos();
      });
    },
    ChangeConsolas() {
      var consolas = [];
      this.Consolas.forEach((consola) => {
        consolas.push({
          IdConsola: consola,
        });
      });
      this.Consolas = consolas;
    },
  },
  computed: {
    btnEditarDisabled() {
      if (this.selected.length == 1) {
        return false;
      }
      return true;
    },
    btnEliminarDisabled() {
      if (this.selected.length > 0) {
        return false;
      }
      return true;
    },
  },
};
</script>

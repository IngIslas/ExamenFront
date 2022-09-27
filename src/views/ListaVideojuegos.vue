<template>
  <v-container fluid>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="2">
          <v-btn color="green" @click="AbrirDialogo"> Agregar </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="blue"> Editar </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="orange">Eliminar </v-btn>
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
      >
        <template v-slot:item.Consolas="{ item }">
          <div>
            {{ Consolas(item) }}
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
              <v-icon @click="mostrarDialogo = false">mdi-close</v-icon>
            </v-col>
          </v-row>
        </v-app-bar>
        <v-card-text>
          <v-text-field label="Titulo" v-model="videojuego.Titulo">
          </v-text-field>
          <v-text-field label="Descripcion" v-model="videojuego.Descripcion">
          </v-text-field>
          <v-text-field label="Año" v-model="videojuego.Año" type>
          </v-text-field>
          <v-text-field
            label="Calificacion"
            v-model="videojuego.Calificacion"
          ></v-text-field>
          <v-text-field
            label="Genero"
            v-model="videojuego.Genero"
          ></v-text-field>
          <v-select
            label="Consolas"
            v-model="videojuego.Consolas"
            :items="consolas"
            multiple
            item-text="Nombre"
            item-value="IdConsola"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row justify="end">
              <v-btn color="secondary">Cancelar</v-btn>
              <!-- <v-spacer></v-spacer> -->
              <v-col cols="1"></v-col>
              <v-btn color="primary" @click="Insertar">Aceptar</v-btn>
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
      this.consolas = res.data;
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
      consolas: [],
      videojuego: {
        Titulo: "",
        Descripcion: "",
        Año: null,
        Calificacion: null,
        Genero: "",
        Consolas: [],
      },
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
    Consolas(item) {
      var consolas = "";
      item.Consolas.forEach((consola) => {
        consolas += consola.Nombre + ", ";
      });
      return consolas;
    },
    AbrirDialogo() {
      this.mostrarDialogo = true;
    },
    Insertar() {
        console.log(this.videojuego)
        var consolas=[]
        this.videojuego.Consolas.forEach(consola=>{
            consolas.push({IdConsola:consola})
        })
        this.videojuego.Consolas= consolas;
      Axios.post(
        "https://localhost:44375/api/videojuego/Insertar",
        this.videojuego
      )
        .then((res) => {
          alert(res.data);
        })
        .catch((error) => {
          alert(error);
        });
      this.videojuego = {};
    },
  },
};
</script>

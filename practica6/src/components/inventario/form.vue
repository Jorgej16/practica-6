<template>
  <div>
    <q-btn @click="agregarEmpleado" color="teal">
      <q-icon left size="3em" name="fas fa-credit-card" />
      <div>ADD</div>
    </q-btn>
    <q-dialog v-model="modalCreate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">ADD</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
                <div class="col">
                  <q-input
                    v-model="facId"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="FactID"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="productId"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="productId"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="quantity"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="quantity"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="price"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="price"
                  />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="AGREGAr" @click="save" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../api/api";
export default {
  components: {},
  data() {
    return {
            facId: "",
            productId: "",
            quantity: "",
            price: "",
        data: []
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.data = await api.getData();
    },
    async save() {
        await api.create({
          facId: this.facId,
          productId: this.productId,
          quantity: this.quantity,
          price: this.price,
        }).then(response => {
          if (response.data.status == 0) {
            this.triggerWarning();
          }
          if (response.data.status == 1) {
            this.triggerPositive();
            setTimeout(this.loadOnce, 1000);
          } else {
            this.triggernegative();
          }
        });
        this.cleamImpus();
    },
    loadOnce:function(){
      location.reload();
    },
    triggerPositive() {
      this.$q.notify({
        type: "positive",
        message: `Empleado Guardado Correctamente`,
        position: "center"
      });
    },
    triggerWarning() {
      this.$q.notify({
        type: "warning",
        message: `Este Empleado ya Existe.`,
        position: "center"
      });
    },
    triggernegative() {
      this.$q.notify({
        type: "negative",
        message: `No Fue Posible Agregar El Empleado`,
        position: "center"
      });
    },
    cleamImpus() {
      this.modalCreate = false;
      this.empleado.nombre = "";
      this.empleado.cedula = "";
      this.empleado.clave = "";
      this.empleado.tanda = "";
      this.empleado.comision = "";
      this.empleado.fechaIngreso = "";
      this.empleado.estado = "";
    },
    agregarEmpleado() {
      this.modalCreate = true;
    }
  }
};
</script>
<style scoped>
.q-btn {
  margin: 10px 5px 0px 0px;
}
.card {
  max-width: 100%;
  margin: 20px 25px;
}
</style>

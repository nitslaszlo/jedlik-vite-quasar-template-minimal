<script setup lang="ts">
  import ColorChecker from "../components/ColorChecker.vue";
  import Counter from "../components/Counter.vue";
  import HelloWorld from "../components/HelloWorld.vue";

  interface IReactiveData {
    felkialtojelDarab: number;
    nev: string;
    xek: string;
    felkialtojelek: string;
    napok: Array<string>;
    inputNap: string;
  }

  const r = reactive<IReactiveData>({
    felkialtojelDarab: 3,
    nev: "Jedlik Ányos",
    xek: "",
    felkialtojelek: "!!!",
    napok: ["hétfő", "kedd", "szerda"],
    inputNap: "",
  });

  setInterval(() => {
    let wrongCharPos = -1;
    for (let i = 0; i < r.xek.length; i++) {
      if (r.xek[i].toLowerCase() !== "x") {
        wrongCharPos = i;
        break;
      }
    }
    if (wrongCharPos !== -1) {
      if (r.xek.length <= 10) {
        r.xek = r.xek.replace(r.xek[wrongCharPos], "X");
      } else {
        r.xek = r.xek.replace(r.xek[wrongCharPos], "");
      }
    } else {
      if (r.xek.length < 10) {
        r.xek += "X";
      } else if (r.xek.length > 10) {
        r.xek = r.xek.slice(0, -1);
      }
    }
  }, 3000);

  const iNap = computed(() => r.inputNap.toLowerCase());

  watchEffect(() => (r.felkialtojelek = "!".repeat(r.felkialtojelDarab)));

  function onClick(művelet: string) {
    if (művelet === "+") {
      r.felkialtojelDarab++;
    } else if (művelet === "-") {
      r.felkialtojelDarab--;
    }
  }

  function napEllenorzese(): boolean {
    const joNapok: string[] = [
      "",
      "hétfő",
      "kedd",
      "szerda",
      "csütörtök",
      "péntek",
      "szombat",
      "vasárnap",
    ];
    return joNapok.includes(iNap.value);
  }

  function joNapHozzadni(nap: string) {
    return iNap.value !== "" && napEllenorzese() && !r.napok.includes(nap);
  }

  function hozzadNap(): void {
    r.napok.push(iNap.value);
    r.inputNap = "";
  }

  function joNapTorolni(nap: string): boolean {
    return r.napok.includes(nap);
  }

  function torolNap(): void {
    r.napok = r.napok.filter((i) => i !== iNap.value);
    r.inputNap = "";
  }
</script>

<template>
  <q-page>
    <q-form>
      <HelloWorld msg="Hello World!!!" />

      <Counter :initial="10" />

      <ColorChecker />

      <div class="row">
        <div class="col-xs-12 col-md-6 q-pa-md">
          <q-input
            v-model="r.nev"
            counter
            hide-hint
            hint="Up to 20 characters are allowed!"
            label="Type your name!"
            outlined
            :rules="[(v:string) => v.length <= 20 || 'Max 20 characters!']"
            type="text"
          />
          <q-input
            v-model="r.xek"
            counter
            hide-hint
            hint="Up to 10 'x' characters are allowed!"
            label="Max 10 eX!"
            outlined
            :rules="[(v:String) => v.length <= 10 || 'Error: max 10 X!']"
            type="text"
          />
          <q-banner class="bg-positive shadow-6 q-my-md" rounded>
            <q-icon name="mdi-import" size="30px" />
            Hello {{ r.nev }} {{ r.xek }} {{ r.felkialtojelek }}
          </q-banner>
          <q-banner class="bg-secondary shadow-6" rounded>
            <q-icon name="mdi-alert-box-outline" size="30px" />
            Number of exclamation marks: {{ r.felkialtojelDarab }}
          </q-banner>
          <div class="row justify-center q-my-md">
            <q-btn
              class="q-mr-md"
              color="green-8"
              :disable="r.felkialtojelDarab == 10"
              label="Plus"
              @click="onClick('+')"
            />
            <q-btn
              class="q-mr-md"
              color="red-8"
              :disable="r.felkialtojelDarab == 1"
              label="Minus"
              @click="onClick('-')"
            />
          </div>
        </div>

        <div class="col-xs-12 col-md-6 q-pa-md">
          <q-banner class="bg-positive shadow-6 q-my-md" rounded>
            <ol class="pa-3">
              <li v-for="nap in r.napok" :key="nap">{{ nap }}</li>
            </ol>
          </q-banner>
          <q-input
            v-model="r.inputNap"
            counter
            hide-hint
            :hint="napEllenorzese() ? '' : 'Enter a name for a day!'"
            label="Please name the day!"
            outlined
            :rules="[(v: string) => napEllenorzese() || 'Make sure you spell it correctly!']"
            type="text"
          />
          <div class="row justify-center q-my-md">
            <q-btn
              class="q-mr-md"
              color="green-8"
              :disabled="!joNapHozzadni(iNap)"
              label="Add day"
              @click="hozzadNap()"
            />
            <q-btn
              class="q-mr-md"
              color="red-8"
              :disabled="!joNapTorolni(iNap)"
              label="Delete day"
              @click="torolNap()"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-center">
          <q-btn color="info full-width" label="Go to About page" no-caps to="/about" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tabs from "../ui/tabs";
import editmap from "../logic/editmap";
import filebase64 from "../../util/filebase64";
import reset_sector_map from "../logic/editpanel_reset_sector_map";
import basemaps from "../logic/basemaps";
import save_geom from "../logic/save_geom";
import add_infrastructure from "../logic/add_infrastructure";
import modal from "../ui/modal";

export default {
  data() {
    return {
      zonemodel: {
        id: null,
        title_ru: null,
        title_kz: null,
        title_en: null,
        status: null,
        zone_time: null,
        zone_type: null,
        description_ru: null,
        description_kz: null,
        description_en: null,
        region_description_ru: null,
        region_description_kz: null,
        region_description_en: null,
        contacts_ru: null,
        contacts_kz: null,
        contacts_en: null,

        files: null,
        videos: null,
        photos: null,

        new_photos: {
          ru: [],
          kz: [],
          en: []
        },
        new_video: {
          name_ru: "",
          name_kz: "",
          name_en: "",
          src_ru: "",
          src_kz: "",
          src_en: ""
        },
        new_files: {
          ru: [],
          kz: [],
          en: []
        },

        budget_allocated: null,
        budget_need: null,
        level: null
      },

      selected_image: "",
      selected_video: ""
    };
  },

  components: {
    tabs,
    editmap,
    reset_sector_map,
    basemaps,
    save_geom,
    add_infrastructure,
    modal
  },

  computed: mapGetters([
    "lang",
    "profile",
    "edited_zone",
    "infrastructures",
    "objects",
    "show_on_map_geom",
    "image_modal",
    "video_modal",
    "new_infrastructure"
  ]),

  methods: {
    ...mapActions([
      "update_zone",
      "set_basemap",
      "show_on_map",
      "set_infrastructures",
      "set_objects",
      "set_infrastructures_list",
      "set_objects_list",
      "change_ui_visibility",
      "remove_new_infrastructure",
      "remove_all_new_infrastructure",
    ]),

    reset_geom() {
      let geom = this.show_on_map_geom;
      this.show_on_map();
      this.show_on_map(geom);
    },

    select_image(src) {
      this.selected_image = src;
    },

    select_video(src) {
      this.selected_video = src;
    },

    set_photo(
      {
        target: { files }
      },
      lang
    ) {
      if (!files.length) {
        console.log("empty");
        return;
      }
      Object.keys(files).map((key, idx) => {
        filebase64(files[key]).then(result => {
          this.zonemodel.new_photos[lang].push(result);
        });
      });
    },

    set_files(
      {
        target: { files }
      },
      lang
    ) {
      if (!files.length) {
        console.log("empty");
        return;
      }
      Object.keys(files).map((key, idx) => {
        filebase64(files[key]).then(result => {
          this.zonemodel.new_files[lang].push(result);
        });
      });
    },

    onChange(infrastructure, id) {
      this.show_on_map();
      this.show_on_map({
        ...infrastructure, 
        id: id,
      });
    },

    n_inf(inf, id) {
      return {
        ...inf,
        id: id,
      }
    },
  },

  mounted() {
    Object.keys(this.zonemodel)
      .filter(
        it => it != "new_photos" && it != "new_video" && it != "new_files"
      )
      .forEach(it => {
        if (it == "title_ru" || it == "title_kz" || it == "title_en") {
          this.zonemodel[it] = this.edited_zone[it].slice(4);
          return;
        }
        this.zonemodel[it] = this.edited_zone[it];
      });

    this.set_infrastructures_list();
    this.set_objects_list();
    this.set_infrastructures();
    this.set_objects();

    this.remove_all_new_infrastructure();
  }
};
</script>


<template>
  <div class="editpanel_editzone">

    <modal
      v-if="video_modal"
      v-on:close="change_ui_visibility({
        ui_component: 'video_modal',
        ui_component_state: false,
      })">
      <iframe style="border: none" width="520" height="305"
        :src="selected_video">
      </iframe>
    </modal>

    <modal
      v-if="image_modal"
      v-on:close="change_ui_visibility({
        ui_component: 'image_modal',
        ui_component_state: false,
      })">
      <img
        style="object-fit: cover;"
        width="100%"
        height="100%"
        :src="selected_image"
      />
    </modal>

    <h2 class="editpanel_editzone-title" v-text="edited_zone['title_' + lang]"></h2>
    <h3 class="editpanel_editzone-last_title">Предыдущее согласование: {{edited_zone.last_updated_member}}, {{edited_zone.last_updated_date ? edited_zone.last_updated_date.replace('T', ' ').slice(0, 19) : ''}} </h3>


    <div class="editpanel_editzone_reconciliation-buttons">
      <button class="editpanel_editzone_reconciliation-button" v-on:click="update_zone(zonemodel)" 
        v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
      ></button>
    </div>

    <tabs
      :titles_style="{
        'font-size': '14px',
        'padding': '10px',
      }"
      :active_page="0"
    >

      <span slot="tab_title_0">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Справочная информация' : lang == 'en' ? 'Refernce information': 'Анықтамалық ақпарат'"
          ></span>
        </span>
      </span>
      
      <span slot="tab_title_1">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Диаграммы' : lang == 'en' ? 'Diagrams': 'Диаграммалар'"
          ></span>
        </span>        
      </span>
      
      <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Infrastructure': 'Инфрақұрылым'"
          ></span>
        </span>        
      </span>



      <div class="editpanel_editzone-tab editpanel_editzone-container" slot="tab_0">

      
        <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Название' : lang == 'en' ? 'Title' : 'Атауы'"></h3>
        <input class="editpanel_editzone-input"
          v-model="zonemodel['title_' + lang]"
        />
        <h3 class="editpanel_editzone_reconciliation-tab-title"
           v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description' : 'Сипаттама'"
        ></h3>
     
        <wysiwyg v-model="zonemodel['description_' + lang]" />

        <h3 class="editpanel_editzone_reconciliation-tab-title"
           v-text="lang == 'ru' ? 'Описание региона' : lang == 'en' ? 'Region description' : 'Аймақтың сипаттамасы'"
        ></h3>

        <wysiwyg v-model="zonemodel['region_description_' + lang]" />

        <h3 class="editpanel_editzone_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
        ></h3>
        <wysiwyg v-model="zonemodel['contacts_' + lang]" />




        <h3 class="editpanel_editsector_reconciliation-tit"
           v-text="{
            'title_ru': 'Маркетинговые материалы',
            'title_kz': 'Marketing materials',
            'title_en': 'Маркетингтік материалдар',
          }['title_' + lang]"
        ></h3>
        <div>
          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></p>
          <div class="sidebar-market_wrap">
            <div 
              class="sidebar-passport_photo"
               v-if="zonemodel.photos.length"
              v-for="photo in zonemodel.photos"
            >
              <img 
                :src="photo['src_' + lang]"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'image_modal',
                    ui_component_state: true,
                  }),
                  select_image(photo['src_' + lang])"
              />            
            </div>

            <div style="clear: both">
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'ru')" />
                <span class="editpanel_editzone-lang">RU</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'kz')" />
                <span class="editpanel_editzone-lang">KZ</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'en')" />
                <span class="editpanel_editzone-lang">EN</span>
              </div>
            </div>

          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></p>
          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-if="zonemodel.videos.length"
            v-text="lang == 'ru' ? 'Существующие видеоролики' : lang == 'en' ? 'Existing videos' : 'Бар бейне'"></p>
          <div class="sidebar-market_wrap" v-if="zonemodel.videos.length">
            <div
              v-for="video in zonemodel.videos">
              <div 
                class="sidebar-passport_video"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'video_modal',
                    ui_component_state: true,
                  }),
                  select_video(video['src_' + lang])"
              >
              </div>
              <div style="clear: both">
                <p class="editpanel_editzone_reconciliation-tab-title" 
                  v-text="lang == 'ru' ? 'Название видеоролика' : lang == 'en' ? 'Title of the video' : 'Бейне атауы'"></p>
                <input class="editpanel_editzone-input" type="text"
                  v-model="video['name_'+lang]"/>
                <p class="editpanel_editzone_reconciliation-tab-title"
                  :style="{ margin: '0' }"
                  v-text="lang == 'ru' ? 'Ссылка на видео' : lang == 'en' ? 'Link to video' : 'Бейне сілтемесі'"></p>
                <input class="editpanel_editzone-input" type="text"
                  v-model="video['src_'+lang]"/>
              </div>
            </div>
          </div>
          <p class="editpanel_editzone_reconciliation-tab-title" 
              :style="{ margin: 0 }"
              v-text="lang == 'ru' ? 'Добавить видеоролик' : lang == 'en' ? 'Add video' : 'Бейнені қосу'"></p>
          <div class="sidebar-market_wrap">
            <p class="editpanel_editzone_reconciliation-tab-title" 
              v-text="lang == 'ru' ? 'Название видеоролика' : lang == 'en' ? 'Title of the video' : 'Бейне атауы'"></p>
            <input class="editpanel_editzone-input" type="text"
              v-model="zonemodel.new_video['name_'+lang]"/>
            <p class="editpanel_editzone_reconciliation-tab-title" 
              v-text="lang == 'ru' ? 'Ссылка на видео' : lang == 'en' ? 'Link to video' : 'Бейне сілтемесі'"></p>
            <input class="editpanel_editzone-input" type="text"
              v-model="zonemodel.new_video['src_'+lang]"/>
          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></p>
          <div v-if="zonemodel.files.length" class="sidebar-market_file" v-for="file in zonemodel.files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
          <div style="clear: both">
            <div class="editpanel_editzone-add">
              <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'ru')" />
              <span class="editpanel_editzone-lang">RU</span>
            </div>
            <div class="editpanel_editzone-add">
              <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'kz')" />
              <span class="editpanel_editzone-lang">KZ</span>
            </div>
            <div class="editpanel_editzone-add">
              <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'en')" />
              <span class="editpanel_editzone-lang">EN</span>
            </div>
          </div>
        </div>


      </div>

      <div class="editpanel_editzone-tab editpanel_editzone-container" slot="tab_1">
        <h3 class="editpanel_editsector_reconciliation-tit"
          v-text="lang == 'ru' ? 'Объем затраченных средств из бюджета на инфраструктуру' : lang == 'en' ? 'Budget infrastructural expenses' : 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар'"
        ></h3>
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="zonemodel.budget_need"/>
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="zonemodel.budget_allocated"/>
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Соотношение свободных и занятых земель' : lang == 'en' ? 'Free and taken land share' : 'Бос және қабылданған жер үлесі'"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="zonemodel.level"/>
      </div>

      <div class="editpanel_editzone-tab editpanel_editzone-container" slot="tab_2">

        <div class="map-container-inf">
          <editmap class="editpanel_editzone-map"
            :is_sector="'zone'"
          />
          <reset_sector_map 
            :style="{ top: '220px', right: '10px', position: 'absolute' }"
            v-on:click="reset_geom"
          />
          <basemaps class="editpanel_editzone-basemaps" 
            :style="{ bottom: '10px', right: '10px' }"
            v-on:click="set_basemap"/>
          <save_geom class="editpanel_editzone-basemaps" 
            :style="{ position: 'absolute', top: '10px', right: '50px' }" />
        </div>

        <div class="left-col-inf">

          <add_infrastructure/>
          
          <div class="editpanel_members-table">
            <div class="editpanel_members-table_header">
              <div v-text="{
                title_ru: 'Название', 
                title_kz: 'Атауы', 
                title_en: 'Title'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
              <div v-text="{
                title_ru: 'Тип', 
                title_kz: 'Түрі', 
                title_en: 'Type'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
              <div v-text="{
                title_ru: 'Атрибут', 
                title_kz: 'Атрибут', 
                title_en: 'Capacity'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
              <div v-text="{
                title_ru: 'Единица измерения', 
                title_kz: 'Өлшем бірлігі', 
                title_en: 'Unit'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
            </div>
          </div>
          <div class="editpanel_editzone-sectors">
            <div
              class="editpanel_editzone-sector"
              v-if="new_infrastructure"
              v-for="(infrastructure, idx) in new_infrastructure"
              v-on:click="onChange(infrastructure, idx)"
              :class="{'editpanel_editzone-sector--active': n_inf(infrastructure, idx).id == (show_on_map_geom ? show_on_map_geom.id : '')}"
            >
              <div class="editpanel_editzone-table_item">
                <input 
                  class="editpanel_editzone-table_item-input"
                  v-model="infrastructure['title_'+lang]"
                  :style="{ width: '100px' }"
                />
              </div>
              <div class="editpanel_editzone-table_item">
                <select 
                  class="editpanel_editzone-table_item-input"
                  v-model="infrastructure.type"
                  v-on:change="onChange(infrastructure, idx)"
                >
                  <option 
                    :selected="true"
                    value='inf'
                    v-text="lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Infrastructure': 'Инфрақұрылым'"
                  ></option> 
                  <option 
                    value='obj'
                    v-text="lang == 'en' ? 'Object' : 'Объект'"
                  ></option>
                </select>
              </div>
              <div class="editpanel_editzone-table_item">
                <input 
                  type="number"
                  class="editpanel_editzone-table_item-input"
                  v-model="infrastructure.capacity"
                  :style="{ width: '100px' }"
                />
              </div>
              <div class="editpanel_editzone-table_item">
                <input 
                  class="editpanel_editzone-table_item-input"
                  v-model="infrastructure.unit"
                  :style="{ width: '100px' }"
                />
              </div>
              <button class="editpanel_editzone-zone_edit" 
                v-on:click="
                  remove_new_infrastructure(idx)"
              ></button>
            </div>
            <div class="editpanel_editzone-sector"
              v-for="infrastructure in infrastructures"
              v-on:click="show_on_map(infrastructure)"
              :class="{ 'editpanel_editzone-sector--active': infrastructure == show_on_map_geom }">
              <div class="editpanel_editzone-table_item">
                <span 
                  v-text="infrastructure['title_'+lang]"></span>
              </div>
              <div class="editpanel_editzone-table_item">
                <span
                  v-text="lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Infrastructure' : 'Инфрақұрылым'"></span>
              </div>
              <div class="editpanel_editzone-table_item">
                <input 
                   class="editpanel_editzone-table_item-input"
                  v-model="infrastructure.capacity"
                  :style="{ width: '100px' }"
                />
              </div>
              <div class="editpanel_editzone-table_item">
                <input 
                  class="editpanel_editzone-table_item-input"
                  v-model="infrastructure.unit"
                  :style="{ width: '100px' }"
                />
              </div>
            </div>
            <div class="editpanel_editzone-sector"
              v-for="object in objects"
              v-on:click="show_on_map(object)"
              :class="{ 'editpanel_editzone-sector--active': object == show_on_map_geom }">
              <div class="editpanel_editzone-table_item">
                <span
                  v-text="object['title_'+lang]"></span>
              </div>
              <div class="editpanel_editzone-table_item">
                <span
                  v-text="lang == 'en' ? 'Object' : 'Объект'"></span>
              </div>
              <div class="editpanel_editzone-table_item">
                <input 
                  class="editpanel_editzone-table_item-input"
                  v-model="object.capacity"
                  :style="{ width: '100px' }"
                />
              </div>
              <div class="editpanel_editzone-table_item">
                <input
                  class="editpanel_editzone-table_item-input"
                  v-model="object.unit"
                  :style="{ width: '100px' }"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </tabs>
  </div>
</template>

<style>
.left-col-inf {
  position: relative;
  width: 100%;
  top: 7px;
  bottom: 0;
}

.map-container-inf {
  position: relative;
  height: 500px;
  background: #eee;
  width: 100%;
}

.editpanel_editzone {
  position: absolute;
  z-index: 10;
  width: calc(100% - 60px);
  background: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 0;
  margin: 30px;
}

.editpanel_editzone-container {
  padding: 0 20px 20px 20px;
  border-top: 1px solid #eee;
  overflow-y: auto;
  height: calc(100vh - 205px);
}

.editpanel_editzone-title {
  font-size: 18px;
  color: #555;
  font-weight: normal;
  padding: 20px;
  margin: 0;
}

.editpanel_editzone-tab {
  padding: 0 20px;
}

.editpanel_editzone-tab-input_subtitle {
  font-weight: normal;
  font-size: 12px;
  color: #747474;
}

.editpanel_editzone-add {
  width: 92px;
  height: 53px;
  background: #555;
  float: left;
  margin: 5px;
  overflow: hidden;
  color: transparent;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}
.editpanel_editzone-lang {
  position: absolute;
  top: 0;
  color: #fff;
  left: 5px;
  z-index: 2;
  font-size: 12px;
}
.editpanel_editzone-add::before {
  content: "";
  background-image: url("../../assets/images/add-plus-button.svg");
  position: absolute;
  top: 50%;
  opacity: 0.8;
  transform: translate(-50%, -50%);
  height: 25px;
  width: 25px;
  background-size: contain;
  left: 50%;
}
#zone_photo_input {
  opacity: 0;
  cursor: pointer;
  width: 92px;
  height: 53px;
  background: #aaa;
  overflow: hidden;
  color: transparent;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

input[type=file], /* FF, IE7+, chrome (except button) */
  input[type=file]::-webkit-file-upload-button {
  /* chromes and blink button */
  cursor: pointer;
}

.editpanel_editzone-map {
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.mapboxgl-canvas {
  height: 100%;
  width: 100%;
}

.editpanel_editzone-input {
  border: none;
  font-size: 13px;
  outline: none;
  border-bottom: 2px solid #50c7f9;
  width: 100%;
}

.editpanel_editzone-basemaps {
  z-index: 100;
}

.sidebar-passport_photo_meta {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  font-size: 10px;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 13px;
}

.editpanel_editzone_reconciliation-tab-title-active:hover {
  text-decoration: underline;
  cursor: pointer;
}
.editpanel_editzone-last_title {
  font-size: 15px;
  color: #888;
  font-weight: normal;
  margin: 0 20px 20px 20px;
}

.editpanel_editzone-sectors {
  overflow-y: auto;
  padding: 0;
}

.editpanel_editzone-sector {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.editpanel_editzone-sector--active {
  background: #50c7f9;
  color: #fff;
}

.editpanel_editzone-sector:hover {
  cursor: pointer;
}

.editpanel_editzone-table_item {
  position: relative;
  flex: 1;
  padding: 15px 20px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.editpanel_editzone-table_item-input {
  border: none;
  font-size: 12px;
  outline: none;
  border-bottom: 1px solid #aaa;
  width: 100%;
}

.editpanel_editzone-zone_edit {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 15px;
  margin-top: 9px;
  background-color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  background-image: url("../../assets/images/сross-black.svg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.editpanel_editzone-zone_edit:hover {
  background-color: #f1f1f1;
}
</style>

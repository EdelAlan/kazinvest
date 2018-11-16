<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import filebase64 from '../../util/filebase64';
  import modal from "../ui/modal";

  export default {
    data () {
      return {
        selected_image: "",
        selected_video: "",

        sezmodel: {
          advantages_en: null,
          advantages_kz: null,
          advantages_ru: null,
          allocated: null,
          common_en: null,
          common_kz: null,
          common_ru: null,
          contacts_en: null,
          contacts_kz: null,
          contacts_ru: null,
          demand: null,
          id: null,
          title_en: null,
          title_kz: null,
          title_ru: null,
          type: null,

          photos: null,
          videos: null,
          files: null,

          new_photos: {
            ru: [],
            kz: [],
            en: [],
          },
          new_video: {
            name_ru: '',
            name_kz: '',
            name_en: '',
            republic_id: 1,
            src_ru: '',
            src_kz: '',
            src_en: '',
          },
          new_files: {
            ru: [],
            kz: [],
            en: [],
          },
        },

        izmodel: {
          advantages_en: null,
          advantages_kz: null,
          advantages_ru: null,
          allocated: null,
          common_en: null,
          common_kz: null,
          common_ru: null,
          contacts_en: null,
          contacts_kz: null,
          contacts_ru: null,
          demand: null,
          id: null,
          title_en: null,
          title_kz: null,
          title_ru: null,
          type: null,

          photos: null,
          videos: null,
          files: null,

          new_photos: {
            ru: [],
            kz: [],
            en: [],
          },
          new_video: {
            name_ru: '',
            name_kz: '',
            name_en: '',
            republic_id: 1,
            src_ru: '',
            src_kz: '',
            src_en: '',
          },
          new_files: {
            ru: [],
            kz: [],
            en: [],
          },
        },

        adilet: null,

      }
    },

    components: {
      tabs,
      modal,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'republics',
      'links_adilet',
      'image_modal',
      'video_modal',
    ]),

    methods: {
      ...mapActions([
        'set_republics',
        'set_links_adilet',
        'update_republic',
        'update_links_adilet',
        'update_contacts',
        'change_ui_visibility',
      ]),

      select_image(src) {
        this.selected_image = src;
      },

      select_video(src) {
        this.selected_video = src;
      },

      set_photo ({ target: { files }}, lang, type) {
        if (!files.length) {
          console.log('empty')
          return;
        }
        Object.keys(files).map((key, idx) => {
          filebase64(files[key])
          .then(result => {
            switch(type) {
              case 'sez':
                this.sezmodel.new_photos[lang].push(result);
                return;
              break;
              case 'iz':
                this.izmodel.new_photos[lang].push(result);
                return;
              break;
            }
          });
        });
      },

      set_files ({ target: { files }}, lang, type) {
        if (!files.length) {
          console.log('empty')
          return;
        }
        Object.keys(files).map((key, idx) => {
          filebase64(files[key])
          .then(result => {
            switch(type) {
              case 'sez':
                this.sezmodel.new_files[lang].push(result);
                return;
              break;
              case 'iz':
                this.izmodel.new_files[lang].push(result);
                return;
              break;
            }
          });
        });
      },

    },


    async mounted () {
      await this.set_republics({query: 'rep'});
      await this.set_links_adilet();
      this.adilet = this.links_adilet;
      Object.keys(this.sezmodel).filter(it => it != 'new_photos' && it != 'new_video' && it != 'new_files').forEach(it => {
        this.sezmodel[it] = this.republics.filter(it => it.id == 1)[0][it];
      });
      Object.keys(this.izmodel).filter(it => it != 'new_photos' && it != 'new_video' && it != 'new_files').forEach(it => {
        this.izmodel[it] = this.republics.filter(it => it.id == 2)[0][it];
      });
    }

  }
</script>


<template>
  <div class="editpanel_editrepublics">

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
            v-text="lang == 'ru' ? 'СЭЗ РК' : lang == 'en' ? 'SEZ RK': 'АЭА ҚР'"
          ></span>
        </span>
      </span>
      
      <span slot="tab_title_1">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'ИЗ РК' : lang == 'en' ? 'IZ RK': 'ИА ҚР'"
          ></span>
        </span>        
      </span>

      <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="{
              'title_ru': 'Общие положения СЭЗ/ИЗ РК',
              'title_kz': 'Жалпы ережелер ИЗ/СЭЗ ҚР',
              'title_en': 'General provisions of IZ/SEZ RK',
            }['title_' + lang]"
          ></span>
        </span>        
      </span>

      <span slot="tab_title_3">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="{
              'title_ru': 'Контакты АО «НК «KAZAKH INVEST»',
              'title_kz': 'JSC «НК «KAZAKH INVEST» contacts',
              'title_en': 'АҚ «НК «KAZAKH INVEST» байланыстары',
            }['title_' + lang]"
          ></span>
        </span>        
      </span>
      



      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_0">

        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_republic(sezmodel)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>
      
        <h3 class="editpanel_editsector_reconciliation-tit" 
          v-text="{
            'title_ru': 'Преимущества', 
            'title_kz': 'Benefits',
            'title_en': 'Артықшылық',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="sezmodel['advantages_' + lang]" />

        <h3 class="editpanel_editsector_reconciliation-tit"
           v-text="{
            'title_ru': 'Описание',
            'title_kz': 'Description',
            'title_en': 'Сипаттама',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="sezmodel['common_' + lang]" />

        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="sezmodel.demand"/>
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="sezmodel.allocated"/>

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
               v-if="sezmodel.photos.length"
              class="sidebar-passport_photo"
              v-for="photo in sezmodel.photos"
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
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'ru', 'sez')" />
                <span class="editpanel_editzone-lang">RU</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'kz', 'sez')" />
                <span class="editpanel_editzone-lang">KZ</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'en', 'sez')" />
                <span class="editpanel_editzone-lang">EN</span>
              </div>
            </div>

          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></p>
          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-if="sezmodel.videos.length"
            v-text="lang == 'ru' ? 'Существующие видеоролики' : lang == 'en' ? 'Existing videos' : 'Бар бейне'"></p>
          <div class="sidebar-market_wrap" v-if="sezmodel.videos.length">
            <div
              v-for="video in sezmodel.videos">
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
              v-model="sezmodel.new_video['name_'+lang]"/>
            <p class="editpanel_editzone_reconciliation-tab-title" 
              v-text="lang == 'ru' ? 'Ссылка на видео' : lang == 'en' ? 'Link to video' : 'Бейне сілтемесі'"></p>
            <input class="editpanel_editzone-input" type="text"
              v-model="sezmodel.new_video['src_'+lang]"/>
          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></p>
          <div v-if="sezmodel.files.length" class="sidebar-market_file" v-for="file in sezmodel.files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
          <div style="clear: both">
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'ru', 'sez')" />
                <span class="editpanel_editzone-lang">RU</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'kz', 'sez')" />
                <span class="editpanel_editzone-lang">KZ</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'en', 'sez')" />
                <span class="editpanel_editzone-lang">EN</span>
              </div>
            </div>
        </div>


      </div>

      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_1">
        
        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_republic(izmodel)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>
      
        <h3 class="editpanel_editsector_reconciliation-tit" 
          v-text="{
            'title_ru': 'Преимущества', 
            'title_kz': 'Benefits',
            'title_en': 'Артықшылық',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="izmodel['advantages_' + lang]" />

        <h3 class="editpanel_editsector_reconciliation-tit"
           v-text="{
            'title_ru': 'Описание',
            'title_kz': 'Description',
            'title_en': 'Сипаттама',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="izmodel['common_' + lang]" />

        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="izmodel.demand"/>
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="izmodel.allocated"/>

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
               v-if="izmodel.photos.length"
              v-for="photo in izmodel.photos"
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
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'ru', 'iz')" />
                <span class="editpanel_editzone-lang">RU</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'kz', 'iz')" />
                <span class="editpanel_editzone-lang">KZ</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'en', 'iz')" />
                <span class="editpanel_editzone-lang">EN</span>
              </div>
            </div>

          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></p>
          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-if="izmodel.videos.length"
            v-text="lang == 'ru' ? 'Существующие видеоролики' : lang == 'en' ? 'Existing videos' : 'Бар бейне'"></p>
          <div class="sidebar-market_wrap" v-if="izmodel.videos.length">
            <div
              v-for="video in izmodel.videos">
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
              v-model="izmodel.new_video['name_'+lang]"/>
            <p class="editpanel_editzone_reconciliation-tab-title" 
              v-text="lang == 'ru' ? 'Ссылка на видео' : lang == 'en' ? 'Link to video' : 'Бейне сілтемесі'"></p>
            <input class="editpanel_editzone-input" type="text"
              v-model="izmodel.new_video['src_'+lang]"/>
          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></p>
          <div v-if="izmodel.files.length" class="sidebar-market_file" v-for="file in izmodel.files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
          <div style="clear: both">
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'ru', 'iz')" />
                <span class="editpanel_editzone-lang">RU</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'kz', 'iz')" />
                <span class="editpanel_editzone-lang">KZ</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'en', 'iz')" />
                <span class="editpanel_editzone-lang">EN</span>
              </div>
            </div>
        </div>


      </div>

      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_2">

        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_links_adilet(adilet)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>

        <div
          v-for="item in adilet"
        >

          <h3 
            class="editpanel_editsector_reconciliation-tit"
            v-text="{
              'title_ru': 'Ссылка ' + item.id, 
              'title_kz': 'Сілтеме ' + item.id,
              'title_en': 'Link ' + item.id,
            }['title_' + lang]">
          </h3>
          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="{
              'title_ru': 'Ссылка на портал', 
              'title_kz': 'Порталға сілтеме',
              'title_en': 'Link to the portal',
            }['title_' + lang]"
          ></p>
          <input 
            class="editpanel_editzone-input"
            v-model="item['link_' + lang]" />

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="{
              'title_ru': 'Заголовок', 
              'title_kz': 'Тақырып',
              'title_en': 'Headline',
            }['title_' + lang]"
          ></p>
          <input 
            class="editpanel_editzone-input"
            v-model="item['text_' + lang]" />

          <p class="editpanel_editzone_reconciliation-tab-title"
            v-text="{
              'title_ru': 'Описание',
              'title_kz': 'Description',
              'title_en': 'Сипаттама',
            }['title_' + lang]"
          ></p>
          <textarea
            class="editpanel_editzone-input"
            v-model="item['subtext_' + lang]" />
        </div>

      </div>

      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_3">

        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_contacts(sezmodel)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>
      
        <h3 class="editpanel_editzone_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
        ></h3>
        <wysiwyg v-model="sezmodel['contacts_' + lang]" />

      </div>

    </tabs>
  </div>
</template>

<style>

  .left-col-inf {
    width: 100%;
    bottom: 0;
  }

  .map-container-inf {
    position: absolute;
    top: 103px;
    right: 0;
    bottom: 250px;
    background: #eee;
    width: 100%;
  }

  .editpanel_editrepublics {
    position: absolute;
    z-index: 10;
    width: calc(100% - 60px);
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    padding: 0;
    margin: 30px;
  }

  .editpanel_editrepublics-container {
    padding: 0 20px 20px 20px;
    border-top: 1px solid #eee;
    overflow-y: auto;
    height: calc(100vh - 165px);
  }

  .editpanel_editrepublics-title {
    font-size: 18px;
    color: #555;
    font-weight: normal;
    padding: 20px;
    margin: 0;
  }

  .editpanel_editrepublics-tab {
    padding: 0 20px;
  }

  .editpanel_editrepublics-tab-input_subtitle {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }

  .editpanel_editrepublics-add {
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
  .editpanel_editrepublics-lang {
    position: absolute;
    top: 0;
    color: #fff;
    left: 5px;
    z-index: 2;
    font-size: 12px;
  }
  .editpanel_editrepublics-add::before {
    content: '';
    background-image: url("../../assets/images/add-plus-button.svg");
    position: absolute;
    top: 50%;
    opacity: .8;
    transform: translate(-50%, -50%);
    height: 25PX;
    width: 25PX;
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
  input[type=file]::-webkit-file-upload-button { /* chromes and blink button */
      cursor: pointer; 
  }

  .editpanel_editrepublics-map {
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .mapboxgl-canvas {
    height: 100%;
    width: 100%;
  }

  .editpanel_editrepublics-input {
    border: none;
    font-size: 13px;
    outline: none;
    border-bottom: 2px solid #50C7F9;
    width: 100%;
  }

  .editpanel_editrepublics-basemaps {
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
 
</style>

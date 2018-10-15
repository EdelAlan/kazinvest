<script>
  import sidebar_header from './sidebar_header';
  import tabs from '../ui/tabs';
  import passport from './passport';
  import legends from './legends';
  import reference from './reference';
  import passport_anal from './passport_anal';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: {
      tabs,
      sidebar_header,
      legends,
      passport,
      reference,
      passport_anal,
    },

    computed: mapGetters([
      'sidebar_expanded',
      'zones',
      'sectors',
      'lang',
      'selected_sector',
      'passport_anal',
      'passport',
      'zone_filter',
      'republics',
      'active_level',
      'selected_zone',
      'passport_content',
    ]),

    methods: mapActions([
      'set_level',
      'set_passport_title',
      'set_passport_content',
      'change_ui_visibility',
    ]),
  }
</script>


<template>
  <div class="sidebar" 
    :class="{'sidebar--expanded': sidebar_expanded}">
    <sidebar_header class="sidebar-header"></sidebar_header>

    <div class="sidebar-scroll_section">
      <div class="sidebar-section"
        v-if="active_level.id == 2 || active_level.id == 3">
        <legends class="sidebar-legends"></legends>
      </div>

      <div class="sidebar-section sidebar-section--main_content">
        <tabs
          :titles_style="{
            'font-size': '14px',
            'padding': '10px',
          }">
          <span slot="tab_title_0">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title">Справка</span>
            </span>
          </span>
          <span slot="tab_title_1">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title">Cписок</span>
            </span>        
          </span>
          <span slot="tab_title_2">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title">Показатели</span>
            </span>        
          </span>

          <div slot="tab_0">
            <template 
              v-if="active_level.id == 1"> 
              <reference
                v-if="zone_filter[key].checked"
                v-for="republic, key in republics"
                :menu="[{
                  title_ru: 'Преимущества ' + republic['title_' + lang] + ' РК',
                  title_en: 'Преимущества ' + republic['title_' + lang] + ' РК',
                  title_kz: 'Преимущества ' + republic['title_' + lang] + ' РК',
                  passport_content: key == 0 ? 'level_1:sez_advantages' : 'level_1:iz_advantages',
                }, {
                  title_ru: 'Описание ' + republic['title_' + lang] + ' РК',
                  title_en: 'Описание ' + republic['title_' + lang] + ' РК',
                  title_kz: 'Описание ' + republic['title_' + lang] + ' РК',
                  passport_content: key == 0 ? 'level_1:sez_common' : 'level_1:iz_common',
                }, {
                  title_ru: 'Маркетинговые материалы ' + republic['title_' + lang] + ' РК',
                  title_en: 'Маркетинговые материалы ' + republic['title_' + lang] + ' РК',
                  title_kz: 'Маркетинговые материалы ' + republic['title_' + lang] + ' РК',
                  passport_content: key == 0 ? 'level_1:sez_market' : 'level_1:iz_market',
                }]"
              />
              <reference
                :menu="[{
                  title_ru: 'Контакты АО «НК «KAZAKH INVEST»',
                  title_en: 'Контакты АО «НК «KAZAKH INVEST»',
                  title_kz: 'Контакты АО «НК «KAZAKH INVEST»',
                  passport_content: 'level_1:sez_iz_contacts',
                }]"
              />
              <reference
                :menu="[{
                  title_ru: 'Общие положения ИЗ/СЭЗ РК',
                  title_kz: 'Общие положения ИЗ/СЭЗ РК',
                  title_en: 'Общие положения ИЗ/СЭЗ РК',
                  passport_content: 'level_1:sez_iz_polozh',
                }]"
              />
            </template>

            <reference
              v-if="active_level.id == 2"
              :menu="[{
                title_ru: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                title_en: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                title_kz: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                passport_content: 'level_2:zone_description',
              }, {
                title_ru: 'Галерея зоны ' + selected_zone['title_' + lang] + ' РК',
                title_en: 'Галерея зоны ' + selected_zone['title_' + lang] + ' РК',
                title_kz: 'Галерея зоны ' + selected_zone['title_' + lang] + ' РК',
                passport_content: 'level_2:zone_gallery',
              }, {
                title_ru: 'Маркетинговые материалы',
                title_en: 'Маркетинговые материалы',
                title_kz: 'Маркетинговые материалы',
                passport_content: 'level_2:zone_market',
              }, {
                title_ru: 'Контакты',
                title_en: 'Контакты',
                title_kz: 'Контакты',
                passport_content: 'level_2:zone_contacts',
              }]"
            />

            <reference
              v-if="active_level.id == 3"
              :menu="[{
                title_ru: 'Общая информация',
                title_en: 'Общая информация',
                title_kz: 'Общая информация',
                passport_content: 'level_3:sector_common',
              }, {
                title_ru: 'Галерея сектора',
                title_en: 'Галерея сектора',
                title_kz: 'Галерея сектора',
                passport_content: 'level_3:sector_gallery',
              }, {
                title_ru: 'Маркетинговые материалы',
                title_en: 'Маркетинговые материалы',
                title_kz: 'Маркетинговые материалы',
                passport_content: 'level_3:sector_market',
              }, {
                title_ru: 'Контакты',
                title_en: 'Контакты',
                title_kz: 'Контакты',
                passport_content: 'level_3:sector_contacts',
              }]"
            />
          </div>

          <div slot="tab_1">
            <div class="sidebar-item"
              v-for="zone in zones"
              v-if="!sectors"
              @click="
                set_passport_content(''),
                zone.object_count > 0 ? set_level({
                  id: 2,
                  title_ru: zone.title_ru,
                  title_en: zone.title_en,
                  title_kz: zone.title_kz,
                  properties: zone
                }) : null
              ">
              <span class="sidebar-item_title" 
                :title="zone['title_' + lang]"
                v-text="zone['title_' + lang]"></span>
              <span class="sidebar-item_desc" 
                :title="zone.object_count + ' объектов'"
                v-text="zone.object_count + ' объектов'"></span>
            </div>
            <div class="sidebar-item"
              v-if="sectors"
              v-for="sector in sectors"
              :class="{ 'sidebar-item--active': selected_sector && selected_sector.id == sector.id  }"
              @click="
                set_passport_content(''),
                set_passport_title(sector.title_ru),
                set_level({
                  id: 3,
                  title_ru: sector.title_ru,
                  title_en: sector.title_en,
                  title_kz: sector.title_kz,
                  properties: sector
                })
              ">
              <span class="sidebar-item_title"
                :style="{ 
                  'color': sector.color,
                  'filter': 'brightness(80%)',
                }"
                :title="sector['title_' + lang]"
                v-text="sector['title_' + lang]"></span>
              <span class="sidebar-item_desc"
                :title="sector['title_project_' + lang]"
                v-text="sector['title_project_' + lang] || '-'"></span>
            </div>
          </div>

          <div slot="tab_2">


            <reference
              v-if="zone_filter[key].checked && active_level.id == 1"
              v-for="republic, key in republics"
              :menu="[{
                title_ru: 'Цифровые показатели 1 ' + republic['title_' + lang],
                title_en: 'Цифровые показатели 1 ' + republic['title_' + lang],
                title_kz: 'Цифровые показатели 1 ' + republic['title_' + lang],
                passport_content: 'level_1:' + republic.type + ':numeric',
              }, {
                title_ru: 'Диаграммы 1' + republic['title_' + lang],
                title_en: 'Диаграммы 1' + republic['title_' + lang],
                title_kz: 'Диаграммы 1' + republic['title_' + lang],
                passport_content: 'level_1:' + republic.type + ':diagramm',
              }]"
            />
            <reference
              v-if="active_level.id == 2"
              :menu="[{
                title_ru: 'Цифровые показатели 2',
                title_en: 'Цифровые показатели 2',
                title_kz: 'Цифровые показатели 2',
                passport_content: 'level_2:zone:numeric',
              }, {
                title_ru: 'Диаграммы 2',
                title_en: 'Диаграммы 2',
                title_kz: 'Диаграммы 2',
                passport_content: 'level_2:zone:diagramm',
              }]"
            />
            <reference
              v-if="active_level.id == 3"
              :menu="[{
                title_ru: 'Цифровые показатели 3',
                title_en: 'Цифровые показатели 3',
                title_kz: 'Цифровые показатели 3',
                passport_content: 'level_3:sector:numeric',
              }, {
                title_ru: 'Диаграммы 3',
                title_en: 'Диаграммы 3',
                title_kz: 'Диаграммы 3',
                passport_content: 'level_3:sector:diagramm',
              }]"
            />

          </div>
        </tabs>
      </div>
    </div>

    <passport class="sidebar-passport"
      v-if="passport && sidebar_expanded">
      <!-- Инфа о СЭЗ или ИЗ 1 уровнь -->
      <template v-if="active_level.id == 1">
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_advantages'">
          <div v-html="republics[0]['advantages_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_common'">
          <div v-html="republics[0]['common_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:iz_advantages'">
          <div v-html="republics[1]['advantages_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:iz_common'">
          <div v-html="republics[1]['common_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_iz_polozh'">
          <h3>Законодательная база СЭЗ РК</h3>
          <a href="http://adilet.zan.kz/rus/docs/Z1100000469" target="_blank">
            <h4>Закон о СЭЗ</h4>
            <p>
              Настоящий Закон регулирует общественные отношения, возникающие при создании, функционировании и упразднении специальных экономических зон на территории Республики Казахстан
            </p>
          </a>
          <a href="http://adilet.zan.kz/rus/docs/K1700000120" target="_blank">
            <h4>Налоговый кодекс</h4>
            <p>
              Глава 79. НАЛОГООБЛОЖЕНИЕ ЛИЦ, ОСУЩЕСТВЛЯЮЩИХ ДЕЯТЕЛЬНОСТЬ НА ТЕРРИТОРИЯХ СПЕЦИАЛЬНЫХ ЭКОНОМИЧЕСКИХ ЗОН
            </p>
          </a>
          <a href="http://adilet.zan.kz" target="_blank">
            <p>Ссылка на закон</p>
          </a>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:iz_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_iz_contacts'">
          <div v-html="republics[0]['contacts_' + lang]"></div>
        </div>
      </template>

      <!-- Инфа о конкретном СЭЗ или ИЗ 2 уровнь -->
      <template v-if="active_level.id == 2">
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_description'">
          <div v-html="selected_zone['description_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_gallery'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_contacts'">
          <div v-html="selected_zone['contacts_' + lang]"></div>
        </div>
      </template>

      <!-- Инфа о конкретном Сектор 3 уровнь -->
      <template v-if="active_level.id == 3">
        <!-- общая инфа -->
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_gallery'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_contacts'">
          <div v-html="selected_sector['contacts_' + lang]"></div>
        </div>
      </template>




      <!-- Общая инфа о секторе -->
      <div class="sidebar-passport_padding" slot="body" v-if="
        selected_sector 
        && active_level.id == 3 
        && passport_content != 'level_3:sector_gallery'
        && passport_content != 'level_3:sector_market'
        && passport_content != 'level_3:sector_contacts'
        && passport_content != 'level_1:sez:numeric'
        && passport_content != 'level_1:sez:diagramm'
        && passport_content != 'level_1:sez:numeric'
        && passport_content != 'level_1:iz:diagramm'
      ">
        <div class="passport-body_item">
          <span class="passport-body_item_key">Название компании участника</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['title_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Описание</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['title_project_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Стоимость проекта</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.project_price"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Площадь занимаемого участка</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.area"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Текущий статус</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['current_status_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Год</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.project_date"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Продукция</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['products_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Сроки реализации</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['time_realization_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">План работы</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.plan_jobs"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Мощность</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.power"></span>
        </div>
      </div>



      <!-- Показатели -->
      <div slot="body" v-if="passport_content == 'level_1:sez:numeric'">
        <div class="reference-item"
          @click="change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            title_ru: 'СЭЗ цифровые показатели',
            title_en: 'СЭЗ цифровые показатели',
            title_kz: 'СЭЗ цифровые показатели',
          }, {
            title_ru: 'СЭЗ цифровые показатели',
            title_en: 'СЭЗ цифровые показатели',
            title_kz: 'СЭЗ цифровые показатели',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:iz:numeric'">
        <div class="reference-item"
          @click="change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            title_ru: 'ИЗ цифровые показатели',
            title_en: 'ИЗ цифровые показатели',
            title_kz: 'ИЗ цифровые показатели',
          }, {
            title_ru: 'ИЗ цифровые показатели',
            title_en: 'ИЗ цифровые показатели',
            title_kz: 'ИЗ цифровые показатели',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:sez:diagramm'">
        <div class="reference-item"
          @click="change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            title_ru: 'СЭЗ диаграммные данные',
            title_en: 'СЭЗ диаграммные данные',
            title_kz: 'СЭЗ диаграммные данные',
          }, {
            title_ru: 'СЭЗ диаграммные данные',
            title_en: 'СЭЗ диаграммные данные',
            title_kz: 'СЭЗ диаграммные данные',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:iz:diagramm'">
        <div class="reference-item"
          @click="change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            title_ru: 'ИЗ диаграммные данные',
            title_en: 'ИЗ диаграммные данные',
            title_kz: 'ИЗ диаграммные данные',
          }, {
            title_ru: 'ИЗ диаграммные данные',
            title_en: 'ИЗ диаграммные данные',
            title_kz: 'ИЗ диаграммные данные',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

    </passport>


    <passport_anal
      class="sidebar-passport_analytics"
      v-if="passport_anal && sidebar_expanded"
    />
  </div>
</template>


<style>
  .sidebar {
    position: absolute;
    z-index: 10;
    width: 320px;
    height: 100vh;
  }
  .sidebar-scroll_section {
    height: calc(100vh - 210px);
    overflow-y: scroll;
    margin-top: 5px;
  }
  .sidebar-passport {
    position: absolute;
    left: 325px;
    top: 60px;
  }
  .sidebar-passport_analytics {
    position: absolute;
    left: 640px;
    top: 60px;
  }
  .sidebar-header {
    margin: 5px 5px 0 5px;
    border-radius: 3px;
    width: 306px;
  }
  .sidebar-section {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 5px 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }
  .sidebar-section--main_content {
  }
  .sidebar-item {
    border-bottom: 1px solid #eee;
    padding: 10px;
    transition: all 200ms;
    cursor: pointer;
  }
  .sidebar-item:hover {
    background: #f5f5f5;
  }
  .sidebar-item_title {
    font-size: 16px;
    color: #03A0E3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .sidebar-passport_padding {
    padding: 10px;
  }
  .sidebar-item_desc {
    font-size: 14px;
    margin-top: 5px;
    color: #888;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sidebar-info_wrap {
    padding: 0 15px;
  }
  .sidebar-item--active {
    background: #50C7F9;
  }
  .sidebar-item--active .sidebar-item_title {
    color: #fff !important;
    filter: none !important;
  }
  .sidebar-item--active .sidebar-item_desc {
    color: #fff;
  }
  .sidebar-item--active:hover {
    background: #50C7F9;
  }
</style>

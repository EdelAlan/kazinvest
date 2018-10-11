<script>
  import piechart from '../ui/piechart';
  import sidebar_header from './sidebar_header';
  import tabs from '../ui/tabs';
  import passport from './passport';
  import legends from './legends';
  import reference from './reference';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: {
      piechart,
      tabs,
      sidebar_header,
      legends,
      passport,
      reference,
    },

    computed: mapGetters([
      'sidebar_expanded',
      'zones',
      'sectors',
      'lang',
      'selected_sector',
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
                  passport_content: key == 0 ? 'level_1_sez_advantages' : 'level_1_iz_advantages',
                }, {
                  title_ru: 'Описание ' + republic['title_' + lang] + ' РК',
                  title_en: 'Описание ' + republic['title_' + lang] + ' РК',
                  title_kz: 'Описание ' + republic['title_' + lang] + ' РК',
                  passport_content: key == 0 ? 'level_1_sez_common' : 'level_1_iz_common',
                }, {
                  title_ru: 'Общие положения ' + republic['title_' + lang] + ' РК',
                  title_en: 'Общие положения ' + republic['title_' + lang] + ' РК',
                  title_kz: 'Общие положения ' + republic['title_' + lang] + ' РК',
                  passport_content: key == 0 ? 'level_1_sez_polozh' : 'level_1_iz_polozh',
                }, {
                  title_ru: 'Маркетинговые материалы ' + republic['title_' + lang] + ' РК',
                  title_en: 'Маркетинговые материалы ' + republic['title_' + lang] + ' РК',
                  title_kz: 'Маркетинговые материалы ' + republic['title_' + lang] + ' РК',
                  passport_content: key == 0 ? 'level_1_sez_market' : 'level_1_iz_market',
                }]"
              />
              <reference
                :menu="[{
                  title_ru: 'Контакты АО «НК «KAZAKH INVEST»',
                  title_en: 'Контакты АО «НК «KAZAKH INVEST»',
                  title_kz: 'Контакты АО «НК «KAZAKH INVEST»',
                  passport_content: 'level_1_sez_iz_contacts',
                }]"
              />
            </template>

            <reference
              v-if="active_level.id == 2"
              :menu="[{
                title_ru: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                title_en: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                title_kz: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                passport_content: 'level_2_zone_description',
              }, {
                title_ru: 'Галерея зоны ' + selected_zone['title_' + lang] + ' РК',
                title_en: 'Галерея зоны ' + selected_zone['title_' + lang] + ' РК',
                title_kz: 'Галерея зоны ' + selected_zone['title_' + lang] + ' РК',
                passport_content: 'level_2_zone_gallery',
              }, {
                title_ru: 'Маркетинговые материалы',
                title_en: 'Маркетинговые материалы',
                title_kz: 'Маркетинговые материалы',
                passport_content: 'level_2_zone_market',
              }, {
                title_ru: 'Контакты',
                title_en: 'Контакты',
                title_kz: 'Контакты',
                passport_content: 'level_2_zone_contacts',
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
            <!--<piechart
              :sectors="[
                { key: 'Потребность', val: 3203333 },
                { key: 'Выделено', val: 2321321 },
              ]"
            ></piechart>-->
            <reference
              :menu="[{
                title_ru: 'Цифровые показатели',
                title_en: 'Цифровые показатели',
                title_kz: 'Цифровые показатели',
                passport_content: '9999',
              }, {
                title_ru: 'Диаграммы',
                title_en: 'Диаграммы',
                title_kz: 'Диаграммы',
                passport_content: '9999',
              }]"
            />
          </div>
        </tabs>
      </div>
    </div>

    <passport class="sidebar-passport"
      :title="3232"
      v-if="passport && sidebar_expanded">
      <!-- Инфа о СЭЗ или ИЗ 1 уровнь -->
      <template v-if="active_level.id == 1">
        <div slot="body" v-if="passport_content == 'level_1_sez_advantages'">
          <div v-html="republics[0]['advantages_' + lang]"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_sez_common'">
          <div v-html="republics[0]['common_' + lang]"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_sez_polozh'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_sez_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_iz_advantages'">
          <div v-html="republics[1]['advantages_' + lang]"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_iz_common'">
          <div v-html="republics[1]['common_' + lang]"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_iz_polozh'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_iz_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1_sez_iz_contacts'">
          <div v-html="republics[0]['contacts_' + lang]"></div>
        </div>
      </template>

      <!-- Инфа о конкретном СЭЗ или ИЗ 2 уровнь -->
      <template v-if="active_level.id == 2">
        <div slot="body" v-if="passport_content == 'level_2_zone_description'">
          <div v-html="selected_zone['description_' + lang]"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_2_zone_gallery'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_2_zone_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_2_zone_contacts'">
          <div v-html="selected_zone['contacts_' + lang]"></div>
        </div>
      </template>

      <!-- Инфа о конкретном Сектор 3 уровнь -->
      <template v-if="active_level.id == 3">
        <!-- общая инфа -->
        <div slot="body" v-if="passport_content == 'level_3:sector_gallery'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_3:sector_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div slot="body" v-if="passport_content == 'level_3:sector_contacts'">
          <div v-html="selected_sector['contacts_' + lang]"></div>
        </div>
      </template>


      <!-- Общая инфа о секторе -->
      <div slot="body" v-if="
        selected_sector 
        && active_level.id == 3 
        && passport_content != 'level_3:sector_gallery'
        && passport_content != 'level_3:sector_market'
        && passport_content != 'level_3:sector_contacts'
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


    </passport>
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
    left: 330px;
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
    min-height: 300px;
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

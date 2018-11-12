<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import basemaps from '../logic/basemaps';

  export default {
    data () {
      return {
        sectormodel: null,
        investment: {
          investments2014: '',
          investments2015: '',
          investments2016: '',
          investments2017: '',
          investments2018: '',
          production2014: '',
          production2015: '',
          production2016: '',
          production2017: '',
          production2018: '',
          foreign_investments2014: '',
          foreign_investments2015: '',
          foreign_investments2016: '',
          foreign_investments2017: '',
          foreign_investments2018: '',
          number_jobs2014: '',
          number_jobs2015: '',
          number_jobs2016: '',
          number_jobs2017: '',
          number_jobs2018: '',
          taxes2014: '',
          taxes2015: '',
          taxes2016: '',
          taxes2017: '',
          taxes2018: '',
          exports_volume2014: '',
          exports_volume2015: '',
          exports_volume2016: '',
          exports_volume2017: '',
          exports_volume2018: '',
          spent_foreign_investments2014: '',
          spent_foreign_investments2015: '',
          spent_foreign_investments2016: '',
          spent_foreign_investments2017: '',
          spent_foreign_investments2018: '',
        },
      }
    },

    components: {
      tabs,
      editmap,
      basemaps,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'edited_sector_geom',
      'edited_sector',
      'selected_sector',
      "investments",
      "production",
      "foreign_investments",
      "number_jobs",
      "taxes",
      "exports_volume",
      "spent_foreign_investments",
    ]),

    methods: {
      ...mapActions([
        'update_sector',
        'set_basemap',
        'reject_data',
        'set_selected_sector',
        'set_edited_sector_geom',
      ]),

    },

    async mounted () {
      this.sectormodel = await JSON.parse(this.edited_sector.model);
      await this.set_selected_sector(JSON.parse(this.edited_sector.model));
      this.investment = {
        investments2014: this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0] ? this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0].val : 0,
        investments2015: this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0] ? this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0].val : 0,
        investments2016: this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0] ? this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0].val : 0,
        investments2017: this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0] ? this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0].val : 0,
        investments2018: this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0] ? this.investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0].val : 0,

        production2014: this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0] ? this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0].val : 0,
        production2015: this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0] ? this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0].val : 0,
        production2016: this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0] ? this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0].val : 0,
        production2017: this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0] ? this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0].val : 0,
        production2018: this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0] ? this.production.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0].val : 0,

        foreign_investments2014: this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0] ? this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0].val : 0,
        foreign_investments2015: this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0] ? this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0].val : 0,
        foreign_investments2016: this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0] ? this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0].val : 0,
        foreign_investments2017: this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0] ? this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0].val : 0,
        foreign_investments2018: this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0] ? this.foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0].val : 0,

        number_jobs2014: this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0] ? this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0].val : 0,
        number_jobs2015: this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0] ? this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0].val : 0,
        number_jobs2016: this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0] ? this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0].val : 0,
        number_jobs2017: this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0] ? this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0].val : 0,
        number_jobs2018: this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0] ? this.number_jobs.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0].val : 0,
        
        taxes2014: this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0] ? this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0].val : 0,
        taxes2015: this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0] ? this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0].val : 0,
        taxes2016: this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0] ? this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0].val : 0,
        taxes2017: this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0] ? this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0].val : 0,
        taxes2018: this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0] ? this.taxes.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0].val : 0,

        exports_volume2014: this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0] ? this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0].val : 0,
        exports_volume2015: this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0] ? this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0].val : 0,
        exports_volume2016: this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0] ? this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0].val : 0,
        exports_volume2017: this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0] ? this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0].val : 0,
        exports_volume2018: this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0] ? this.exports_volume.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0].val : 0,
        
        spent_foreign_investments2014: this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2014)[0].val : 0,
        spent_foreign_investments2015: this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2015)[0].val : 0,
        spent_foreign_investments2016: this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2016)[0].val : 0,
        spent_foreign_investments2017: this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2017)[0].val : 0,
        spent_foreign_investments2018: this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.selected_sector.id && el.year == 2018)[0].val : 0,
      };
    }
  }
</script>


<template>
  <div>
    <div class="editpanel_editsector_reconciliation">

      <h2 class="editpanel_editsector_reconciliation-title" 
        v-text="{
          'title_ru': 'Существующие данные', 
          'title_kz': 'Бар деректер', 
          'title_en': 'Existing data'
        }['title_' + lang]"
      ></h2>

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
              v-text="lang == 'ru' ? 'Общая информация' : lang == 'en' ? 'General information': 'Жалпы ақпарат'"
            ></span>
          </span>
        </span>
        
        <span slot="tab_title_1">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Цифровые показатели' : lang == 'en' ? 'Digital indicators': 'Сандық көрсеткіштер'"
            ></span>
          </span>        
        </span>
        
        <span slot="tab_title_2">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Галерея' : lang == 'en' ? 'Gallery': 'Галерея'"
            ></span>
          </span>        
        </span>

        <span slot="tab_title_3">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Файлы для скачивания' : lang == 'en' ? 'Files to download': 'Жүктелетін файлдар'"
            ></span>
          </span>        
        </span>















        <div class="editpanel_editsector_reconciliation-tab" slot="tab_0">
          <h3 class="editpanel_editsector_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Общая информация' : lang == 'en' ? 'General information': 'Жалпы ақпарат'"
          ></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Название компании участника' : lang == 'en' ? 'Participant\'s company name': 'Қатысушының компания атауы'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector['title_'+lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description': 'Сипаттама'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector['title_project_'+lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi"
            v-text="lang == 'ru' ? 'Тип проекта' : lang == 'en' ? 'Project type': 'Жобаның түрі'"
          ></p>
          <span class="editpanel_editsector_reconciliation-tab-input-oi"
              v-text="selected_sector.project_type == 1 ? (lang == 'ru' ? 'Действующий' : lang == 'kz' ? 'Ағымдағы жоба' : 'Ongoing') :
                      selected_sector.project_type == 2 ? (lang == 'ru' ? 'На стадии реализации' : lang == 'kz' ? 'Iске асырылуда' : 'Underway') :
                      selected_sector.project_type == 3 ? (lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі') : ''"
            >
          </span>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi"
            v-if="selected_sector.project_type == 3" 
            v-text="lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі'"
          ></p>
          <select 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-if="selected_sector.project_type == 3" 
            v-text="selected_sector.divisible"
          >
            <option 
              value=1
              :selected="selected_sector.divisible == 1"
              v-text="lang == 'ru' ? 'Да' : lang == 'kz' ? 'Иә' : 'Yes'"
            ></option> 
            <option 
              value=0
              :selected="selected_sector.divisible == 0"
              v-text="lang == 'ru' ? 'Нет' : lang == 'kz' ? 'Жоқ' : 'No'"
            ></option>
          </select>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Стоимость проекта' : lang == 'en' ? 'Project price': 'Жобаның құны'"
          ></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector.project_price"/>
        
          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Текущий статус' : lang == 'en' ? 'Current status': 'Ағымдағы күй'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector['current_status_' + lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Год' : lang == 'en' ? 'Year': 'Жыл'"
          ></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector.project_date"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Продукция' : lang == 'en' ? 'Products': 'Өнімдер'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector['products_' + lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Сроки реализации' : lang == 'en' ? 'Implementation period': 'Іске асыру мерзімі'"
        ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector['time_realization_' + lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Рабочие места' : lang == 'en' ? 'Workplaces': 'Жұмыс орындары'"
          ></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector.plan_jobs"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Мощность' : lang == 'en' ? 'Power': 'Қуат'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector.power"/>


          <h3 class="editpanel_editsector_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
          ></h3>

          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="selected_sector['contacts_' + lang]"/>

        </div>

        <div class="editpanel_editsector_reconciliation-tab" slot="tab_1">
          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем вложенных инвестиций' : lang == 'en' ? 'Investments volume' : 'Инвестициялар көлемі'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.investments2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.investments2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.investments2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.investments2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.investments2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем производства' : lang == 'en' ? 'Production volume' : 'Өндіріс көлемі'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.production2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.production2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.production2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.production2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.production2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Прямые иностранные инвестиции' : lang == 'en' ? 'Foreign direct investments' : 'Шетелдік тікелей инвестициялар'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.foreign_investments2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.foreign_investments2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.foreign_investments2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.foreign_investments2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.foreign_investments2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Количество созданных рабочих' : lang == 'en' ? 'Number of jobs created' : 'Жасалған жұмыс орындарының саны'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.number_jobs2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.number_jobs2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.number_jobs2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.number_jobs2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.number_jobs2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем налоговых отчислений' : lang == 'en' ? 'Tax volume' : 'Салықтық аударымдардың сомасы'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.taxes2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.taxes2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.taxes2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.taxes2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.taxes2018"/>


          
          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем экспорта' : lang == 'en' ? 'Export volume' : 'Экспорттың көлемі'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.exports_volume2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.exports_volume2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.exports_volume2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.exports_volume2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.exports_volume2018"/>
          



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом' : lang == 'en' ? 'Attracted foreign investments for 1 tenge spent by the budget' : 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.spent_foreign_investments2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.spent_foreign_investments2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.spent_foreign_investments2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.spent_foreign_investments2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="investment.spent_foreign_investments2018"/>

        </div>

        <div slot="tab_2">
          <h3>Маркетинговые материалы</h3>
        </div>

        <div slot="tab_3">
          <h3>Видео</h3>

          <h3>Фото</h3>
        </div>

      </tabs>
    </div>
    <div class="editpanel_editsector_reconciliation editpanel_editsector_reconciliation-new">

      <h2 class="editpanel_editsector_reconciliation-title" 
        v-text="{
          'title_ru': 'Новые данные', 
          'title_kz': 'Жана деректер', 
          'title_en': 'New data'
        }['title_' + lang]"
      ></h2>
      <button v-on:click="update_sector(sectormodel)"
        v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
      ></button>
      <button v-on:click="reject_data(edited_sector)" 
        v-text="lang == 'ru' ? 'Отклонить' : lang == 'en' ? 'Reject' : 'Қабылдамау'"
      ></button>

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
              v-text="lang == 'ru' ? 'Общая информация' : lang == 'en' ? 'General information': 'Жалпы ақпарат'"
            ></span>
          </span>
        </span>
        
        <span slot="tab_title_1">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Цифровые показатели' : lang == 'en' ? 'Digital indicators': 'Сандық көрсеткіштер'"
            ></span>
          </span>        
        </span>
        
        <span slot="tab_title_2">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Галерея' : lang == 'en' ? 'Gallery': 'Галерея'"
            ></span>
          </span>        
        </span>

        <span slot="tab_title_3">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Файлы для скачивания' : lang == 'en' ? 'Files to download': 'Жүктелетін файлдар'"
            ></span>
          </span>        
        </span>

        <span slot="tab_title_4">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Карта' : lang == 'en' ? 'Map': 'Карта'"
            ></span>
          </span>        
        </span>















        <div class="editpanel_editsector_reconciliation-tab" slot="tab_0">
          <h3 class="editpanel_editsector_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Общая информация' : lang == 'en' ? 'General information': 'Жалпы ақпарат'"
          ></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Название компании участника' : lang == 'en' ? 'Participant\'s company name': 'Қатысушының компания атауы'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel['title_'+lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description': 'Сипаттама'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel['title_project_'+lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi"
            v-text="lang == 'ru' ? 'Тип проекта' : lang == 'en' ? 'Project type': 'Жобаның түрі'"
          ></p>
          <span class="editpanel_editsector_reconciliation-tab-input-oi"
              v-text="sectormodel.project_type == 1 ? (lang == 'ru' ? 'Действующий' : lang == 'kz' ? 'Ағымдағы жоба' : 'Ongoing') :
                      sectormodel.project_type == 2 ? (lang == 'ru' ? 'На стадии реализации' : lang == 'kz' ? 'Iске асырылуда' : 'Underway') :
                      sectormodel.project_type == 3 ? (lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі') : ''"
            >
          </span>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi"
            v-if="sectormodel.project_type == 3" 
            v-text="lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі'"
          ></p>
          <select 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-if="sectormodel.project_type == 3" 
            v-text="sectormodel.divisible"
          >
            <option 
              value=1
              :selected="sectormodel.divisible == 1"
              v-text="lang == 'ru' ? 'Да' : lang == 'kz' ? 'Иә' : 'Yes'"
            ></option> 
            <option 
              value=0
              :selected="sectormodel.divisible == 0"
              v-text="lang == 'ru' ? 'Нет' : lang == 'kz' ? 'Жоқ' : 'No'"
            ></option>
          </select>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Стоимость проекта' : lang == 'en' ? 'Project price': 'Жобаның құны'"
          ></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel.project_price"/>
        
          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Текущий статус' : lang == 'en' ? 'Current status': 'Ағымдағы күй'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel['current_status_' + lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Год' : lang == 'en' ? 'Year': 'Жыл'"
          ></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel.project_date"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Продукция' : lang == 'en' ? 'Products': 'Өнімдер'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel['products_' + lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Сроки реализации' : lang == 'en' ? 'Implementation period': 'Іске асыру мерзімі'"
        ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel['time_realization_' + lang]"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Рабочие места' : lang == 'en' ? 'Workplaces': 'Жұмыс орындары'"
          ></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel.plan_jobs"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title-oi" 
            v-text="lang == 'ru' ? 'Мощность' : lang == 'en' ? 'Power': 'Қуат'"
          ></p>
          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel.power"/>


          <h3 class="editpanel_editsector_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
          ></h3>

          <span 
            class="editpanel_editsector_reconciliation-tab-input-oi"
            v-text="sectormodel['contacts_' + lang]"/>

        </div>

        <div class="editpanel_editsector_reconciliation-tab" slot="tab_1">
          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем вложенных инвестиций' : lang == 'en' ? 'Investments volume' : 'Инвестициялар көлемі'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.investments2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.investments2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.investments2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.investments2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.investments2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем производства' : lang == 'en' ? 'Production volume' : 'Өндіріс көлемі'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.production2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.production2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.production2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.production2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.production2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Прямые иностранные инвестиции' : lang == 'en' ? 'Foreign direct investments' : 'Шетелдік тікелей инвестициялар'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.foreign_investments2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.foreign_investments2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.foreign_investments2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.foreign_investments2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.foreign_investments2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Количество созданных рабочих' : lang == 'en' ? 'Number of jobs created' : 'Жасалған жұмыс орындарының саны'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.number_jobs2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.number_jobs2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.number_jobs2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.number_jobs2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.number_jobs2018"/>



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем налоговых отчислений' : lang == 'en' ? 'Tax volume' : 'Салықтық аударымдардың сомасы'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.taxes2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.taxes2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.taxes2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.taxes2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.taxes2018"/>


          
          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Объем экспорта' : lang == 'en' ? 'Export volume' : 'Экспорттың көлемі'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.exports_volume2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.exports_volume2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.exports_volume2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.exports_volume2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.exports_volume2018"/>
          



          <h3 class="editpanel_editsector_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом' : lang == 'en' ? 'Attracted foreign investments for 1 tenge spent by the budget' : 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды'"></h3>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2014"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.spent_foreign_investments2014"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2015"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.spent_foreign_investments2015"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2016"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.spent_foreign_investments2016"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2017"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.spent_foreign_investments2017"/>

          <p class="editpanel_editsector_reconciliation-tab-input_title" 
            v-text="2018"></p>
          <span type="number" min="0"
            class="editpanel_editsector_reconciliation-tab-input"
            v-text="sectormodel.spent_foreign_investments2018"/>

        </div>

        <div slot="tab_2">
          <h3>Маркетинговые материалы</h3>
        </div>

        <div slot="tab_3">
          <h3>Видео</h3>

          <h3>Фото</h3>
        </div>

        <div slot="tab_4">
          <editmap class="editpanel_editsector_reconciliation-map"
            :is_sector="'admin'"
          />
          <basemaps class="editpanel_editsector_reconciliation-basemaps"
            :style="{ top: '415px', right: '45px' }"
            v-on:click="set_basemap"/>
        </div>

      </tabs>
    </div>
  </div>
</template>

<style>

  .editpanel_editsector_reconciliation {
    position: absolute;
    z-index: 10;
    width: 47%;
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    overflow-y: auto;
    padding: 0;
    margin: 30px;
    height: calc(100vh - 60px);
  }

  .editpanel_editsector_reconciliation-new {
    right: 0px;
  }

  .editpanel_editsector_reconciliation-map {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 165px;
  }

  .editpanel_editsector_reconciliation-basemaps {
    position: fixed;
    z-index: 1000;
  }

  .editpanel_editsector_reconciliation-title {
    font-size: 18px;
    color: #555;
    font-weight: normal;
    padding: 20px;
    margin: 0;
  }

  .editpanel_editsector_reconciliation-tab {
    padding: 0 20px;
  }

  .editpanel_editsector_reconciliation-tab-title {
    font-weight: normal;
    font-size: 16px;
    color: #03A0E3;
  }

  .editpanel_editsector_reconciliation-tab-input {
    width: 150px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editsector_reconciliation-tab-input-oi {
    width: 450px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editsector_reconciliation-tab-input_title {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }
 
</style>

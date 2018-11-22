<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import basemaps from '../logic/basemaps';
  import * as jsdiff from 'diff';
  import modal from "../ui/modal";

  export default {
    data () {
      return {
        new_data: {
          photos: [],
          videos: [],
          files: [],
        },
        old_data: null,
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

        photos: [],
        videos: [],
        files: [],

        selected_image: '',
        selected_video: '',
      }
    },

    components: {
      tabs,
      editmap,
      basemaps,
      modal,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'edited_sector_geom',
      'edited_sector',
      "investments",
      "production",
      "foreign_investments",
      "number_jobs",
      "taxes",
      "exports_volume",
      "spent_foreign_investments",
      'image_modal',
      'video_modal',
    ]),

    methods: {
      ...mapActions([
        'update_sector',
        'set_basemap',
        'reject_data',
        'set_edited_sector_geom',
        'change_ui_visibility',
      ]),

      select_image(src) {
        this.selected_image = src;
      },

      select_video(src) {
        this.selected_video = src;
      },

      open_pdf(file) {
        let pdf_window = window.open("")
        pdf_window.document.write("<iframe width='100%' height='100%' src='"+encodeURI(file)+"'></iframe>")
      },

    },

    mounted () {
      this.old_data = this.edited_sector.old_data;
      this.new_data = this.edited_sector.new_data;
      
      this.investment = {
        investments2014: this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0] ? this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0].val : 0,
        investments2015: this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0] ? this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0].val : 0,
        investments2016: this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0] ? this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0].val : 0,
        investments2017: this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0] ? this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0].val : 0,
        investments2018: this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0] ? this.investments.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0].val : 0,

        production2014: this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0] ? this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0].val : 0,
        production2015: this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0] ? this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0].val : 0,
        production2016: this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0] ? this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0].val : 0,
        production2017: this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0] ? this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0].val : 0,
        production2018: this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0] ? this.production.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0].val : 0,

        foreign_investments2014: this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0] ? this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0].val : 0,
        foreign_investments2015: this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0] ? this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0].val : 0,
        foreign_investments2016: this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0] ? this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0].val : 0,
        foreign_investments2017: this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0] ? this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0].val : 0,
        foreign_investments2018: this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0] ? this.foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0].val : 0,

        number_jobs2014: this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0] ? this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0].val : 0,
        number_jobs2015: this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0] ? this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0].val : 0,
        number_jobs2016: this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0] ? this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0].val : 0,
        number_jobs2017: this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0] ? this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0].val : 0,
        number_jobs2018: this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0] ? this.number_jobs.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0].val : 0,
        
        taxes2014: this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0] ? this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0].val : 0,
        taxes2015: this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0] ? this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0].val : 0,
        taxes2016: this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0] ? this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0].val : 0,
        taxes2017: this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0] ? this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0].val : 0,
        taxes2018: this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0] ? this.taxes.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0].val : 0,

        exports_volume2014: this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0] ? this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0].val : 0,
        exports_volume2015: this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0] ? this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0].val : 0,
        exports_volume2016: this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0] ? this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0].val : 0,
        exports_volume2017: this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0] ? this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0].val : 0,
        exports_volume2018: this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0] ? this.exports_volume.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0].val : 0,
        
        spent_foreign_investments2014: this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2014)[0].val : 0,
        spent_foreign_investments2015: this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2015)[0].val : 0,
        spent_foreign_investments2016: this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2016)[0].val : 0,
        spent_foreign_investments2017: this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2017)[0].val : 0,
        spent_foreign_investments2018: this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0] ? this.spent_foreign_investments.filter(el => el.parent_id == this.new_data.id && el.year == 2018)[0].val : 0,
      };

      if (this.edited_sector.new_data.new_photos) {
        Object.keys(this.edited_sector.new_data.new_photos).filter(lang => lang.length >= 1).forEach(lang => {
          this.edited_sector.new_data.new_photos[lang].filter(photo => photo.length >= 1).forEach(photo => {
            this.photos.push(photo);
          });
        });
      }

      if (this.edited_sector.new_data.new_video) {
        this.videos = this.edited_sector.new_data.new_video;
      }

      if (this.edited_sector.new_data.new_files) {
        Object.keys(this.edited_sector.new_data.new_files).filter(lang => lang.length >= 1).forEach(lang => {
          this.edited_sector.new_data.new_files[lang].filter(file => file.length >= 1).forEach(file => {
            this.files.push(file);
          });
        });
      }


      [{
        old: String(this.old_data.project_price),
        new: String(this.new_data.project_price),
        el: '#compare_project_price',
      }, {
        old: String(this.old_data.project_date),
        new: String(this.new_data.project_date),
        el: '#compare_project_date',
      }, {
        old: String(this.old_data.power),
        new: String(this.new_data.power),
        el: '#compare_power',
      }, {
        old: String(this.old_data.plan_jobs),
        new: String(this.new_data.plan_jobs),
        el: '#compare_plan_jobs',
      }, {
        old: String(this.old_data.investments2014),
        new: String(this.new_data.investments2014),
        el: '#compare_investments2014',
      }, {
        old: String(this.old_data.investments2015),
        new: String(this.new_data.investments2015),
        el: '#compare_investments2015',
      }, {
        old: String(this.old_data.investments2016),
        new: String(this.new_data.investments2016),
        el: '#compare_investments2016',
      }, {
        old: String(this.old_data.investments2017),
        new: String(this.new_data.investments2017),
        el: '#compare_investments2017',
      }, {
        old: String(this.old_data.investments2018),
        new: String(this.new_data.investments2018),
        el: '#compare_investments2018',
      }, {
        old: String(this.old_data.production2014),
        new: String(this.new_data.production2014),
        el: '#compare_production2014',
      }, {
        old: String(this.old_data.production2015),
        new: String(this.new_data.production2015),
        el: '#compare_production2015',
      }, {
        old: String(this.old_data.production2016),
        new: String(this.new_data.production2016),
        el: '#compare_production2016',
      }, {
        old: String(this.old_data.production2017),
        new: String(this.new_data.production2017),
        el: '#compare_production2017',
      }, {
        old: String(this.old_data.production2018),
        new: String(this.new_data.production2018),
        el: '#compare_production2018',
      }, {
        old: String(this.old_data.foreign_investments2014),
        new: String(this.new_data.foreign_investments2014),
        el: '#compare_foreign_investments2014',
      }, {
        old: String(this.old_data.foreign_investments2015),
        new: String(this.new_data.foreign_investments2015),
        el: '#compare_foreign_investments2015',
      }, {
        old: String(this.old_data.foreign_investments2016),
        new: String(this.new_data.foreign_investments2016),
        el: '#compare_foreign_investments2016',
      }, {
        old: String(this.old_data.foreign_investments2017),
        new: String(this.new_data.foreign_investments2017),
        el: '#compare_foreign_investments2017',
      }, {
        old: String(this.old_data.foreign_investments2018),
        new: String(this.new_data.foreign_investments2018),
        el: '#compare_foreign_investments2018',
      }, {
        old: String(this.old_data.number_jobs2014),
        new: String(this.new_data.number_jobs2014),
        el: '#compare_number_jobs2014',
      }, {
        old: String(this.old_data.number_jobs2015),
        new: String(this.new_data.number_jobs2015),
        el: '#compare_number_jobs2015',
      }, {
        old: String(this.old_data.number_jobs2016),
        new: String(this.new_data.number_jobs2016),
        el: '#compare_number_jobs2016',
      }, {
        old: String(this.old_data.number_jobs2017),
        new: String(this.new_data.number_jobs2017),
        el: '#compare_number_jobs2017',
      }, {
        old: String(this.old_data.number_jobs2018),
        new: String(this.new_data.number_jobs2018),
        el: '#compare_number_jobs2018',
      }, {
        old: String(this.old_data.taxes2014),
        new: String(this.new_data.taxes2014),
        el: '#compare_taxes2014',
      }, {
        old: String(this.old_data.taxes2015),
        new: String(this.new_data.taxes2015),
        el: '#compare_taxes2015',
      }, {
        old: String(this.old_data.taxes2016),
        new: String(this.new_data.taxes2016),
        el: '#compare_taxes2016',
      }, {
        old: String(this.old_data.taxes2017),
        new: String(this.new_data.taxes2017),
        el: '#compare_taxes2017',
      }, {
        old: String(this.old_data.taxes2018),
        new: String(this.new_data.taxes2018),
        el: '#compare_taxes2018',
      }, {
        old: String(this.old_data.exports_volume2014),
        new: String(this.new_data.exports_volume2014),
        el: '#compare_exports_volume2014',
      }, {
        old: String(this.old_data.exports_volume2015),
        new: String(this.new_data.exports_volume2015),
        el: '#compare_exports_volume2015',
      }, {
        old: String(this.old_data.exports_volume2016),
        new: String(this.new_data.exports_volume2016),
        el: '#compare_exports_volume2016',
      }, {
        old: String(this.old_data.exports_volume2017),
        new: String(this.new_data.exports_volume2017),
        el: '#compare_exports_volume2017',
      }, {
        old: String(this.old_data.exports_volume2018),
        new: String(this.new_data.exports_volume2018),
        el: '#compare_exports_volume2018',
      }, {
        old: String(this.old_data.spent_foreign_investments2014),
        new: String(this.new_data.spent_foreign_investments2014),
        el: '#compare_spent_foreign_investments2014',
      }, {
        old: String(this.old_data.spent_foreign_investments2015),
        new: String(this.new_data.spent_foreign_investments2015),
        el: '#compare_spent_foreign_investments2015',
      }, {
        old: String(this.old_data.spent_foreign_investments2016),
        new: String(this.new_data.spent_foreign_investments2016),
        el: '#compare_spent_foreign_investments2016',
      }, {
        old: String(this.old_data.spent_foreign_investments2017),
        new: String(this.new_data.spent_foreign_investments2017),
        el: '#compare_spent_foreign_investments2017',
      }, {
        old: String(this.old_data.spent_foreign_investments2018),
        new: String(this.new_data.spent_foreign_investments2018),
        el: '#compare_spent_foreign_investments2018',
      }, {
        old: String(this.old_data.current_status_ru),
        new: String(this.new_data.current_status_ru),
        el: '#compare_current_status_ru',
      }, {
        old: String(this.old_data.current_status_kz),
        new: String(this.new_data.current_status_kz),
        el: '#compare_current_status_kz',
      }, {
        old: String(this.old_data.current_status_en),
        new: String(this.new_data.current_status_en),
        el: '#compare_current_status_en',
      }, {
        old: String(this.old_data.title_project_ru),
        new: String(this.new_data.title_project_ru),
        el: '#compare_title_project_ru',
      }, {
        old: String(this.old_data.title_project_kz),
        new: String(this.new_data.title_project_kz),
        el: '#compare_title_project_kz',
      }, {
        old: String(this.old_data.title_project_en),
        new: String(this.new_data.title_project_en),
        el: '#compare_title_project_en',
      }, {
        old: String(this.old_data.title_ru),
        new: String(this.new_data.title_ru),
        el: '#compare_title_ru',
      }, {
        old: String(this.old_data.title_kz),
        new: String(this.new_data.title_kz),
        el: '#compare_title_kz',
      }, {
        old: String(this.old_data.title_en),
        new: String(this.new_data.title_en),
        el: '#compare_title_en',
      }, {
        old: String(this.old_data.products_ru),
        new: String(this.new_data.products_ru),
        el: '#compare_products_ru',
      }, {
        old: String(this.old_data.products_kz),
        new: String(this.new_data.products_kz),
        el: '#compare_products_kz',
      }, {
        old: String(this.old_data.products_en),
        new: String(this.new_data.products_en),
        el: '#compare_products_en',
      }, {
        old: String(this.old_data.time_realization_ru),
        new: String(this.new_data.time_realization_ru),
        el: '#compare_time_realization_ru',
      }, {
        old: String(this.old_data.time_realization_kz),
        new: String(this.new_data.time_realization_kz),
        el: '#compare_time_realization_kz',
      }, {
        old: String(this.old_data.time_realization_en),
        new: String(this.new_data.time_realization_en),
        el: '#compare_time_realization_en',
      }, {
        old: String(this.old_data.contacts_ru),
        new: String(this.new_data.contacts_ru),
        el: '#compare_contacts_ru',
      }, {
        old: String(this.old_data.contacts_kz),
        new: String(this.new_data.contacts_kz),
        el: '#compare_contacts_kz',
      }, {
        old: String(this.old_data.contacts_en),
        new: String(this.new_data.contacts_en),
        el: '#compare_contacts_en',
      }].forEach(it => {
        let color = '', 
          span = null,
          diff = jsdiff.diffWords(it.old, it.new),
          display = document.querySelector(it.el),
          fragment = document.createDocumentFragment();
        diff.forEach(part => {
          span = document.createElement('span');
          span.style.background = part.added ? '#0ACF00' : part.removed ? '#FF6440' : '#fff';
          span.style.color = part.added ? '#fff' : part.removed ? '#fff' : '#000';
          span.appendChild(document.createTextNode(part.value));
          fragment.appendChild(span);
        });
        display.appendChild(fragment);
      });

    }
  }
</script>


<template>
  <div class="editpanel_editzone_reconciliation">

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

    <h2 class="editpanel_editinf_reconciliation-title" 
      v-text="({
        title_ru: 'Новые данные: ', 
        title_kz: 'Жана деректер: ', 
        title_en: 'New data: '
      }['title_' + lang])
      + edited_sector.member_firstname + ' ' 
      + edited_sector.member_lastname + 
      ' (' + edited_sector.member_id + '), ' + edited_sector.timestamp.replace('T', ' ').slice(0, 19)"
    ></h2>
    <h3 class="editpanel_editzone-last_title" 
      v-text="'Предыдущее согласование: ' + edited_sector.last_updated_member + ', ' 
      + edited_sector.last_updated_date.replace('T', ' ').slice(0, 19)"
    ></h3>

    <div class="editpanel_editzone_reconciliation-buttons">
      <button class="editpanel_editzone_reconciliation-button" v-on:click="update_sector(new_data)" 
        v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
      ></button>
      <button class="editpanel_editzone_reconciliation-button" v-on:click="reject_data(edited_sector)" 
        v-text="lang == 'ru' ? 'Отклонить' : lang == 'en' ? 'Reject' : 'Қабылдамау'"
      ></button>
    </div>


    <div class="editpanel_editzone_reconciliation-container">
      
  
      

      <h3 class="editpanel_editsector_reconciliation-tit" v-text="lang == 'ru' ? 'Общее' : lang == 'en' ? 'Common' : 'Общее'"></h3>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Название компании участника' : lang == 'en' ? 'Participant\'s company name': 'Қатысушының компания атауы'"></h2>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_title_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_title_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_title_en"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description': 'Сипаттама'"></h2>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_title_project_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_title_project_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_title_project_en"></div>


      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Тип проекта' : lang == 'en' ? 'Project type': 'Жобаның түрі'"></h2>
        
      <template v-if="new_data">
        <div v-if="new_data.project_type !== new_data.project_type">
          <div class="editpanel_editzone_reconcilation-value">
            <span style="color: #fff; background: rgb(255, 100, 64)"  v-text="new_data.project_type == 1 ? (lang == 'ru' ? 'Действующий' : lang == 'kz' ? 'Ағымдағы жоба' : 'Ongoing') :
              new_data.project_type == 2 ? (lang == 'ru' ? 'На стадии реализации' : lang == 'kz' ? 'Iске асырылуда' : 'Underway') :
              new_data.project_type == 3 ? (lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі') : ''"
            ></span>
            <span style="color: #fff; background: rgb(10, 207, 0)" v-text="new_data.project_type == 1 ? (lang == 'ru' ? 'Действующий' : lang == 'kz' ? 'Ағымдағы жоба' : 'Ongoing') :
              new_data.project_type == 2 ? (lang == 'ru' ? 'На стадии реализации' : lang == 'kz' ? 'Iске асырылуда' : 'Underway') :
              new_data.project_type == 3 ? (lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі') : ''"
            ></span>
          </div>
        </div>

        <div v-else>
          <div class="editpanel_editzone_reconcilation-value"
            v-text="new_data.project_type == 1 ? (lang == 'ru' ? 'Действующий' : lang == 'kz' ? 'Ағымдағы жоба' : 'Ongoing') :
              new_data.project_type == 2 ? (lang == 'ru' ? 'На стадии реализации' : lang == 'kz' ? 'Iске асырылуда' : 'Underway') :
              new_data.project_type == 3 ? (lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі') : ''"
          ></div>
        </div>

        <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі'"
          v-if="new_data.project_type == 3"></h2>
        <select 
          class="editpanel_editsector_reconciliation-tab-input-oi"
          v-if="new_data.project_type == 3" 
          v-text="new_data.divisible"
        >
          <option 
            value=1
            :selected="new_data.divisible == 1"
            v-text="lang == 'ru' ? 'Да' : lang == 'kz' ? 'Иә' : 'Yes'"
          ></option> 
          <option 
            value=0
            :selected="new_data.divisible == 0"
            v-text="lang == 'ru' ? 'Нет' : lang == 'kz' ? 'Жоқ' : 'No'"
          ></option>
        </select>

      </template>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Стоимость проекта' : lang == 'en' ? 'Project price': 'Жобаның құны'"></h2>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_project_price"></div>
      
      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Текущий статус' : lang == 'en' ? 'Current status': 'Ағымдағы күй'"></h2>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_current_status_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_current_status_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_current_status_en"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Год' : lang == 'en' ? 'Year': 'Жыл'"></h2>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_project_date"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Продукция' : lang == 'en' ? 'Products': 'Өнімдер'"></h2>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_products_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_products_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_products_en"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Сроки реализации' : lang == 'en' ? 'Implementation period': 'Іске асыру мерзімі'"></h2>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_time_realization_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_time_realization_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_time_realization_en"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Рабочие места' : lang == 'en' ? 'Workplaces': 'Жұмыс орындары'"></h2>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_plan_jobs"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Мощность' : lang == 'en' ? 'Power': 'Қуат'"></h2>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_power"></div>
    
      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"></h2>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_contacts__ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_contacts__kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value"  id="compare_contacts__en"></div>


      <h3 class="editpanel_editzone_reconciliation-tab-title"
        v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
        v-if="new_data.photos.length || photos.length"
      ></h3>
      <p class="editpanel_editzone_reconciliation-tab-sub_title" 
        v-if="new_data.photos.length"
        v-text="lang == 'ru' ? 'Существующие фото' : lang == 'en' ? 'Existing photos' : 'Бар суреттер'"></p>
      <div 
        class="sidebar-market_wrap"
        v-if="new_data.photos.length"
      >
            <div 
              class="sidebar-passport_photo"
              v-for="photo in new_data.photos"
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
      </div>
      <p class="editpanel_editzone_reconciliation-tab-sub_title" 
        v-if="photos.length"
        v-text="lang == 'ru' ? 'Новые фото' : lang == 'en' ? 'New photos' : 'Жана суреттер'"></p>
      <div class="sidebar-market_wrap"
        v-if="photos.length"
      >
        <div v-for="photo in photos" class="sidebar-passport_photo">
          <img :src="photo" 
            v-on:click="
              change_ui_visibility({
                ui_component: 'image_modal',
                ui_component_state: true,
              }),
              select_image(photo)"
          />
        </div>
      </div>
      
      <h3 class="editpanel_editzone_reconciliation-tab-title"
        v-text="lang == 'en' ? 'Video' : 'Видео'"
        v-if="new_data.videos.length || videos.length"
      ></h3>
      <p class="editpanel_editzone_reconciliation-tab-sub_title" 
            v-if="new_data.videos.length"
            v-text="lang == 'ru' ? 'Существующие видеоролики' : lang == 'en' ? 'Existing videos' : 'Бар бейне'"></p>
      <div class="sidebar-market_wrap"
        v-if="new_data.videos.length"
      >
        <div v-for="video in new_data.videos" class="sidebar-passport_video">
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
        </div>
      </div>
      <p class="editpanel_editzone_reconciliation-tab-sub_title" 
        v-if="!Array.isArray(videos)"
        v-text="lang == 'ru' ? 'Новые видеоролики' : lang == 'en' ? 'New videos' : 'Жана бейне'"></p>
      <div class="sidebar-market_wrap"
        v-if="!Array.isArray(videos)"
      >
        <div 
          class="sidebar-passport_video"
          v-on:click="
            change_ui_visibility({
              ui_component: 'video_modal',
              ui_component_state: true,
            }),
            select_video(videos['src_' + lang])"
        >
        </div>
      </div>
      

      <h3 class="editpanel_editzone_reconciliation-tab-title"
        v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files' : 'Файлдар'"
        v-if="new_data.files.length || files.length"
      ></h3>
      <p class="editpanel_editzone_reconciliation-tab-sub_title" 
        v-if="new_data.files.length"
        v-text="lang == 'ru' ? 'Существующие файлы' : lang == 'en' ? 'Existing files' : 'Бар файлдар'"></p>
      <div class="sidebar-market_file"
        v-if="new_data.files.length"
      >
        <a v-for="file in new_data.files" :href="file['src_' + lang]" target="_blank">
          <div class="sidebar-market_pdf"></div>
          <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
        </a>
      </div>
      <p class="editpanel_editzone_reconciliation-tab-sub_title" 
        v-if="files.length"
        v-text="lang == 'ru' ? 'Новые файлы' : lang == 'en' ? 'New files' : 'Жана файлдар'"></p>
      <div class="sidebar-market_file"
        v-if="files.length"
      >
        <div v-for="file in files" v-on:click="open_pdf(file)" target="_blank">
          <div class="sidebar-market_pdf"></div>
        </div>
      </div>


      <br>
      <h3 class="editpanel_editsector_reconciliation-tit" v-text="lang == 'ru' ? 'Объем вложенных инвестиций' : lang == 'en' ? 'Investments volume' : 'Инвестициялар көлемі'"></h3>
      
      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2014"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_investments2014"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2015"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_investments2015"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2016"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_investments2016"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2017"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_investments2017"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2018"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_investments2018"></div>


      <br>
      <h3 class="editpanel_editsector_reconciliation-tit"  v-text="lang == 'ru' ? 'Объем производства' : lang == 'en' ? 'Production volume' : 'Өндіріс көлемі'"></h3>
      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2014"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_production2014"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2015"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_production2015"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2016"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_production2016"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2017"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_production2017"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2018"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_production2018"></div>


      <br>
      <h3 class="editpanel_editsector_reconciliation-tit" v-text="lang == 'ru' ? 'Прямые иностранные инвестиции' : lang == 'en' ? 'Foreign direct investments' : 'Шетелдік тікелей инвестициялар'"></h3>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2014"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_foreign_investments2014"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2015"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_foreign_investments2015"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2016"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_foreign_investments2016"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2017"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_foreign_investments2017"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2018"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_foreign_investments2018"></div>


      <br>
      <h3 class="editpanel_editsector_reconciliation-tit" v-text="lang == 'ru' ? 'Количество созданных рабочих' : lang == 'en' ? 'Number of jobs created' : 'Жасалған жұмыс орындарының саны'"></h3>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2014"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_number_jobs2014"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2015"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_number_jobs2015"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2016"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_number_jobs2016"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2017"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_number_jobs2017"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2018"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_number_jobs2018"></div>


      <br>
      <h3 class="editpanel_editsector_reconciliation-tit" v-text="lang == 'ru' ? 'Объем экспорта' : lang == 'en' ? 'Export volume' : 'Экспорттың көлемі'"></h3>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2014"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_taxes2014"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2015"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_taxes2015"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2016"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_taxes2016"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2017"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_taxes2017"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2018"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_taxes2018"></div>


      <br>
      <h3 class="editpanel_editsector_reconciliation-tit" v-text="lang == 'ru' ? 'Объем налоговых отчислений' : lang == 'en' ? 'Tax volume' : 'Салықтық аударымдардың сомасы'"></h3>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2014"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_exports_volume2014"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2015"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_exports_volume2015"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2016"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_exports_volume2016"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2017"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_exports_volume2017"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2018"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_exports_volume2018"></div>


      <br>
      <h3 class="editpanel_editsector_reconciliation-tit" v-text="lang == 'ru' ? 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом' : lang == 'en' ? 'Attracted foreign investments for 1 tenge spent by the budget' : 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды'"></h3>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2014"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_spent_foreign_investments2014"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2015"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_spent_foreign_investments2015"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2016"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_spent_foreign_investments2016"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2017"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_spent_foreign_investments2017"></div>

      <h2 class="editpanel_editzone_reconciliation-tab-title" v-text="2018"></h2>
      <div class="editpanel_editzone_reconcilation-value" id="compare_spent_foreign_investments2018"></div>

      <editmap class="editpanel_editsector_reconciliation-map"
        :is_sector="'admin'"
      />
      <basemaps class="editpanel_editsector_reconciliation-basemaps" v-on:click="set_basemap"/>


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

  .editpanel_editsector_reconciliation-tit {
    font-size: 18px;
    color: #03A0E3;
  }

  .editpanel_editsector_reconciliation-new {
    right: 0px;
  }

  .editpanel_editsector_reconciliation-map {
    position: fixed;
    top: 160px;
    background: #eee;
    right: 34px;
    width: 35%;
    height: 650px;
  }

  .editpanel_editsector_reconciliation-basemaps {
    position: fixed;
    top: 310px;
    background: #eee;
    right: 44px;
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

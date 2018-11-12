<script>
import sidebar_header from "./sidebar_header";
import tabs from "../ui/tabs";
import modal from "../ui/modal";
import passport from "./passport";
import legends from "./legends";
import reference from "./reference";
import passport_anal from "./passport_anal";
import passport_anal_bar from "./passport_anal_bar";
import pdf from "./pdf";
import excel from "./excel";
import XLSX from 'xlsx';
import numseparator from "../../util/numseparator";
import font from "../../assets/js/font.js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    tabs,
    modal,
    sidebar_header,
    legends,
    passport,
    reference,
    passport_anal,
    passport_anal_bar,
    pdf,
    excel,
  },

  data() {
    return {
      selected_video: "",
      selected_image: "",

      investments_sum: 0,
      production_sum: 0,
      foreign_investments_sum: 0,
      number_jobs_sum: 0,
      taxes_sum: 0,
      exports_volume_sum: 0,
      spent_foreign_investments_sum: 0,

      iv2014: 0,
      iv2015: 0,
      iv2016: 0,
      iv2017: 0,
      iv2018: 0,

      pv2014: 0,
      pv2015: 0,
      pv2016: 0,
      pv2017: 0,
      pv2018: 0,

      fdi2014: 0,
      fdi2015: 0,
      fdi2016: 0,
      fdi2017: 0,
      fdi2018: 0,

      fdi2014: 0,
      fdi2015: 0,
      fdi2016: 0,
      fdi2017: 0,
      fdi2018: 0,

      njc2014: 0,
      njc2015: 0,
      njc2016: 0,
      njc2017: 0,
      njc2018: 0,

      fdi2014: 0,
      fdi2015: 0,
      fdi2016: 0,
      fdi2017: 0,
      fdi2018: 0,

      tv2014: 0,
      tv2015: 0,
      tv2016: 0,
      tv2017: 0,
      tv2018: 0,

      ev2014: 0,
      ev2015: 0,
      ev2016: 0,
      ev2017: 0,
      ev2018: 0,

      sfi2014: 0,
      sfi2015: 0,
      sfi2016: 0,
      sfi2017: 0,
      sfi2018: 0,
    };
  },

  async mounted() {
    await this.get_all_investments();
    await this.set_links_adilet();
  },

  computed: {
    ...mapGetters([
      "sidebar_expanded",
      "zones",
      "all_zones",
      "sectors",
      "lang",
      "selected_sector",
      "passport_anal",
      "passport_anal_bar",
      "passport_anal_data",
      "passport_anal_bar_data",
      "passport",
      "zone_filter",
      "republics",
      "active_level",
      "selected_zone",
      "passport_content",
      "profile",
      "investments",
      "investment",
      "production",
      "foreign_investments",
      "number_jobs",
      "taxes",
      "exports_volume",
      "spent_foreign_investments",
      "image_modal",
      "video_modal",
      "zone_sector",
      "links_adilet",
    ]),
  },

  methods: {
    numseparator,

    select_video(src) {
      this.selected_video = src;
    },

    select_image(src) {
      this.selected_image = src;
    },

    ...mapActions([
      "set_level",
      "set_passport_title",
      "set_passport_content",
      "change_ui_visibility",
      "set_passport_anal_data",
      "set_passport_anal_bar_data",
      "set_all_zones",
      "set_sectors",
      "set_foreign_investments",
      "set_investments",
      "set_investment",
      "set_number_jobs",
      "set_production",
      "set_taxes",
      "set_exports_volume",
      "set_spent_foreign_investments",
      "set_zone_sector",
      "set_passport_anal_title",
      "set_links_adilet",
    ]),

    async get_all_investments() {
      await this.set_investments();
      await this.set_investment();
      await this.set_foreign_investments();
      await this.set_production();
      await this.set_number_jobs();
      await this.set_taxes();
      await this.set_exports_volume();
      await this.set_spent_foreign_investments();
    },

    async get_zone_sector() {
      switch (this.passport_content) {
        case "level_1:sez:numeric":
          await this.set_all_zones();
          await this.set_sectors();
          await this.set_zone_sector();
          this.investments_sum = 0;
          this.foreign_investments_sum = 0;
          this.production_sum = 0;
          this.number_jobs_sum = 0;
          this.taxes_sum = 0;
          this.exports_volume_sum = 0;
          this.spent_foreign_investments_sum = 0;
          this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
            zone.sectors.forEach(sector => {
              this.investments_sum += sector.investments.length != 0 ? sector.investments.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.production_sum += sector.production.length != 0 ? sector.production.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.foreign_investments_sum += sector.foreign_investments.length != 0 ? sector.foreign_investments.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.number_jobs_sum += sector.number_jobs.length != 0 ? sector.number_jobs.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.taxes_sum += sector.taxes.length != 0 ? sector.taxes.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.exports_volume_sum += sector.exports_volume.length != 0 ? sector.exports_volume.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.spent_foreign_investments_sum += sector.spent_foreign_investments.length != 0 ? sector.spent_foreign_investments.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;
            });
          });
          break;
        case "level_1:iz:numeric":
          await this.set_all_zones();
          await this.set_sectors();
          await this.set_zone_sector();
          this.investments_sum = 0;
          this.foreign_investments_sum = 0;
          this.production_sum = 0;
          this.number_jobs_sum = 0;
          this.taxes_sum = 0;
          this.exports_volume_sum = 0;
          this.spent_foreign_investments_sum = 0;
          this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
            zone.sectors.forEach(sector => {
              this.investments_sum += sector.investments.length != 0 ? sector.investments.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.production_sum += sector.production.length != 0 ? sector.production.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.foreign_investments_sum += sector.foreign_investments.length != 0 ? sector.foreign_investments.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.number_jobs_sum += sector.number_jobs.length != 0 ? sector.number_jobs.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.taxes_sum += sector.taxes.length != 0 ? sector.taxes.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.exports_volume_sum += sector.exports_volume.length != 0 ? sector.exports_volume.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;

              this.spent_foreign_investments_sum += sector.spent_foreign_investments.length != 0 ? sector.spent_foreign_investments.reduce( (a, it) => {
                  return a + parseInt(it.val,10) 
              }, 0) : 0;
            });
          });
          break;
        case "level_2:numeric":
          this.investments_sum = 0;
          this.foreign_investments_sum = 0;
          this.production_sum = 0;
          this.number_jobs_sum = 0;
          this.taxes_sum = 0;
          this.exports_volume_sum = 0;
          this.spent_foreign_investments_sum = 0;
          this.sectors.forEach(sector => {
            this.investments.forEach(el => {
              if (sector.id == el.parent_id) {
                this.investments_sum += parseInt(el.val,10);
              }
            });
            
            this.foreign_investments.forEach(el => {
              if (sector.id == el.parent_id) {
                this.foreign_investments_sum += parseInt(el.val,10);
              }
            });

            this.production.forEach(el => {
              if (sector.id == el.parent_id) {
                this.production_sum += parseInt(el.val,10);
              }
            });

            this.number_jobs.forEach(el => {
              if (sector.id == el.parent_id) {
                this.number_jobs_sum += parseInt(el.val,10);
              }
            });

            this.taxes.forEach(el => {
              if (sector.id == el.parent_id) {
                this.taxes_sum += parseInt(el.val,10);
              }
            });

            this.exports_volume.forEach(el => {
              if (sector.id == el.parent_id) {
                this.exports_volume_sum += parseInt(el.val,10);
              }
            });

            this.spent_foreign_investments.forEach(el => {
              if (sector.id == el.parent_id) {
                this.spent_foreign_investments_sum += parseInt(el.val,10);
              }
            });
          });
          break;
        case "level_3:numeric":
          this.investments_sum = 0;
          this.foreign_investments_sum = 0;
          this.production_sum = 0;
          this.number_jobs_sum = 0;
          this.taxes_sum = 0;
          this.exports_volume_sum = 0;
          this.spent_foreign_investments_sum = 0;

          this.investments.forEach(el => {
            if (this.selected_sector.id == el.parent_id) {
              this.investments_sum += parseInt(el.val,10);
            }
          });
            
          this.foreign_investments.forEach(el => {
            if (this.selected_sector.id == el.parent_id) {
              this.foreign_investments_sum += parseInt(el.val,10);
            }
          });

          this.production.forEach(el => {
            if (this.selected_sector.id == el.parent_id) {
              this.production_sum += parseInt(el.val,10);
            }
          });

          this.number_jobs.forEach(el => {
            if (this.selected_sector.id == el.parent_id) {
              this.number_jobs_sum += parseInt(el.val,10);
            }
          });

          this.taxes.forEach(el => {
            if (this.selected_sector.id == el.parent_id) {
              this.taxes_sum += parseInt(el.val,10);
            }
          });

          this.exports_volume.forEach(el => {
            if (this.selected_sector.id == el.parent_id) {
              this.exports_volume_sum += parseInt(el.val,10);
            }
          });

          this.spent_foreign_investments.forEach(el => {
            if (this.selected_sector.id == el.parent_id) {
              this.spent_foreign_investments_sum += parseInt(el.val,10);
            }
          });
          break;
      }
    },

    header_pdf(doc) {
      const label_img =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAnmSURBVHgB7Z2JdeQ2EoaheRuANoLhRrDaCExHsO0IhhuBtRGIE4HkCNgTgcYRUI5A4wjQGUgZ/GaJoASjgUKBRxMt8XuPz2OxcP7EfbRS7wgARfdo8xRqIz8skQY2sXLDI9ImVm4wIm1i5YJApE2stUkQaRNrLUaItIl1aiaItIl1KmYQaRNraRiR2u65Z0Sh94+bWCeAE8m8rxCmMjbtOYv1SWWOyUgSpHBeHbrnf0rOL93z7PytIL/PQaysheoy8FL5RSK+XlxcHJSQzpZE8glbqF6sS7WRDmVcoG15qbIc22jVZ9m2AbvHnMXKskRZJekqYJJS5bl8Dfydwsq2ZOVa9XEiHbpq7EGNxLh9CLzOVqzshOoyqVFhkYivajq/M+8o7FuVGVkJZUSqImYHNZ2HyPvKxCUbshGqyxj6iit1GiRVW1ZiZSFUlyE33X+uhebPajpSPyoTtw3KCMR56p677ikDfoi755absnv2kM0dfmyxhCJpRGYOIkLtIm6lE70fU6xI5tqUAr/KBd3bSKvn2VmzjboS2DxPGTNJMWEcBKb/VSuxplB193yL2MzRcZAS6wkeuuf/6qOCvo2omeqmQV9N0nPF+BHic8DNleVvw7hv0VeN26QtAXmjfhtwKxYqIswA9TRXa5NWA/1s+LXJpMb8u/DY3Asy8dpxJxYKsk6MDsTNjj/5875KWZegL+YL9eErIftIRj469ilCaUT8dgXo/n8XiL9GpPt/FqD/Cm8RhxJcOG5jYn22bEXdc/CCEj6RJPE/3zGWyRR74Y++yHuES5b2ZFILiATghNoJ7TSOP5aQSENatPW3e5xbVYi+R6WdhF2ad1xmtY4/BcLClpbdNePntROvEIUT9g1jWxmbSyd+Gueyswn+9shtU1oIMtbY1gG7S8umYfy7s+zcjB1onDC5DoeOpEUjd7G6CP4aSNxriTJ2XAl4shMKf7viZqyGPGN9bV/phKcZ/yrHv1AaJDMvpwfxCdbKsr2MZMZro47jqpLcFZZfXHU2UEbC3pl3MZFSNtUQX1ROQD4LbpcqyuCniP0tIm0AZINXX9unHX8b8PE5KiU4p1l3yDJq4NZxSxm2F7ptcNwr/BVyvkwIu0VaZ8NlXbGQJtLAzuMPZdo13vaJa/NQl7eGp9uLvtOSypcRYV953OyQzunFQl/PNxjH5IYWaSVp1gxDvMpeLOzUiHI7WJMijcRurMmkFtNpR4R9ibTqLsTyYiFNJNrjMPTc7hi7Fn0VQ9VJEQi3xDwCuTQI78OgKrEycWsRLkUv6TRPDRnL7W5Cmki1J9FS3AHvDZbHDfM6wa3bE1xPLKSJ9BjwQ8qd404L3LR4K5Wl9dTCeLsD8jsICaS1FTqfTyykt0nlxMgXlpvYgLKFbPPKlSANlWVfQkYbCE/qnpguFuIitTBL5OirtyvFZ5aORLp23GiprTA9XLWkE2yJv011ecIqhjwxecQtiI4XC7xILQRfciDyexzPrB/5B75tGr1EDr6U+laO3aUZjb5qLFQixr8W4TxNWyYBL1KtFgb8/F2tJgK+DVp8MhXh0io/TJeBSFS/BxcX1UwgXK2eZOabEauVOOZEWvRkA2TL9pWaCcQb/AYLryshXLKP8vrCchQ7jvld8QfAxkBhfjZhlhFbOmn4LzUjXZqfVHzj5UP3/KH6zaDPal5+UuGjRvsuvcdHYDF+7u5UfFczA/ns+Vq8lqxPg0jqdIfIxvJDzc8Sfs5JNYj1D5z2pN8UDmp+Trm3fSwk1jOVqAu1kTsXn7oGiwZ5sVMVObDEnrlz2If3jTR6aaO6f1QqflJ8bf6t5ucnlTffjDbJ3XPqps79FZJ/JEIZsaNDbf9UM4J+AF1EzB665081f3tG/tGHsgu8/9Gl9z/eN+AHvItekgHZZpNSzQTiM/OvC59LgfCQKD6VFBFr8WVkhE9OvCRAzQT4KaRSLQzCk87J830a64nFTe9MDh/8zPwp5vluJotkeVYwYrUYN80/zOfZ/tIX3OB431zNZOboHajgt5nVji19MO4yxyNGzgOCX+ZIF8nxWDMJo0TYC4fFBL8Idz2Is08uWeC3mekE2xf7SHpf88TkUcv4NV4kK0BJBtuUAX9aofsry41kKb4QpKFEPPzKSbOEOZbip4vkRFwLAw5FXsqd5SZ0TMaXWKoqS+uhTskNZB+IW5qmbm65FzqfTyQ1Tiy3CpOcuBioHbcpW7fGMiXMz47bG6G7+UVyxJLuSLoxbrgdpsN+CfqCX9q6QLhUQvaYnxbhqpo+LiqVNfhSeStIp8teLQ3m29KcPKBE2ofC0SJxrIT4xSVS9upUYLpYlZrAxAyr1QQw7iTHwF6dGvRitUinCvhF7cJw0pyeR7x1/wuPm1iPcGrYLTyXlkwIu1ZrgrS2o3bccgNAlwbHg+KUDHM7OEObIulVNp6wxT1DrC3SgDDSbhe4QPxoqG/zY+H40yJO4wlbW++HGzY1+PjYY7zYOeSBWuUE4u1G5dhr8JlSGLvS887e0F8ijp3BrkiEfWlIy/jjfmyxbvy1yhEwYjl2sSqrcuxdaue9hjxzG4+NfV1PbJBdCWyfMOMexEWA/ytzT6VrJiNc2zKQEdJjMo1ldxmwSTkf5cbv0RO3xWfgZwH8FTtcaSI3heOXDtja1Zn0ip1QNXl0MgN8J6k0Nud7xc4A0u9yOEok+JF+adnthHZce+a7WSwklu/Sqhbnen8f+i9O0n2nRBaO25uIG7tEcQKUll0BHp9YNeLcqfcA+upOexLovQ4U8cMCvq5+iDEXKxaOm5KJ/069J/C2gEYNP32lZcCmRZzK404qlGRmXMN/EUhp4t8Yf86zqpsC+E0tNnuPW7FQxl46q7Du1Tg5gfjqa4O3a6/LgB9JQlnhDv5y7ahG7mOiJcHxJhcfT0K/RJ2JiB86Ehd6//FKGGTVnOgo6ExCie43Uiux5k8+/CawKYCTbIYslWyr9hw/23d+QDZG0Yj/LBE34K0ibt2BeYhafWQSxGow/w99uTdsbiJxIG0Rzje+SRIKaZdoZTHrkMVvHCYepptjkCn145uJ2+pk86uh5sBWTicfXw+R5UBWv8MrFGuOtZ6YH99zEonI8SfIqar5wbyf4+fruNMgFPaU36JfhOyE6r7k5+4/P6uwWNRbK9VIjNsy8JrC/NnEIStyLFESsaZM5YTcZisSkaVQhCXWwfOaSlXyOpDpqpeeV4fu+SVXkc4ChGcO6G+SfRiVwJ9CZU62JWqg+8oPyl+yiu65V3Ju1fFVBQfVV3cHtTEPTIkY9omHuA+81+dQks4SpB9TDaE3kRZmBrH0JtKJmCCW3kQ6MSPE0ptIK5Eg1ibS2gjE2kTKBZz5YPZDAf+hhEJt5Icl1rsT6S9PstT/syw8tAAAAABJRU5ErkJggg==";
      doc.setFillColor("#03A0E3");
      doc.rect(0, 0, 595, 40, "F");
      doc.addImage(label_img, "PNG", 30, 9, 22, 22);
      doc.setFillColor("#FFFFFF");
      doc.setFontSize(18);
      doc.setTextColor(255);

      doc.text(
        this.lang == "ru"
          ? "Отчет по проектам / участникам"
          : this.lang == "kz"
            ? "Жоба / қатысушы туралы есеп"
            : "Project / Participant Report",
        62,
        25
      );

      doc.setFontSize(16);
      doc.setTextColor("#484D5E");
    },

    async get_investments() {
      this.iv2014 = 0;
      this.iv2015 = 0;
      this.iv2016 = 0;
      this.iv2017 = 0;
      this.iv2018 = 0;

      this.pv2014 = 0;
      this.pv2015 = 0;
      this.pv2016 = 0;
      this.pv2017 = 0;
      this.pv2018 = 0;

      this.fdi2014 = 0;
      this.fdi2015 = 0;
      this.fdi2016 = 0;
      this.fdi2017 = 0;
      this.fdi2018 = 0;

      this.njc2014 = 0;
      this.njc2015 = 0;
      this.njc2016 = 0;
      this.njc2017 = 0;
      this.njc2018 = 0;

      this.tv2014 = 0;
      this.tv2015 = 0;
      this.tv2016 = 0;
      this.tv2017 = 0;
      this.tv2018 = 0;

      this.ev2014 = 0;
      this.ev2015 = 0;
      this.ev2016 = 0;
      this.ev2017 = 0;
      this.ev2018 = 0;

      this.sfi2014 = 0;
      this.sfi2015 = 0;
      this.sfi2016 = 0;
      this.sfi2017 = 0;
      this.sfi2018 = 0;

      await this.get_all_investments();

      this.investments.forEach(el => {
          this.put_data(el, 'iv');
      });
      this.production.forEach(el => {
          this.put_data(el, 'pv');
      });
      this.foreign_investments.forEach(el => {
          this.put_data(el, 'fdi');
      });
      this.number_jobs.forEach(el => {
          this.put_data(el, 'njc');
      });
      this.taxes.forEach(el => {
          this.put_data(el, 'tv');
      });
      this.exports_volume.forEach(el => {
          this.put_data(el, 'ev');
      });
      this.spent_foreign_investments.forEach(el => {
          this.put_data(el, 'sfi');
      });
    },

    put_data(el, row) {
      switch(row) {
          case 'iv':
            switch(el.year) {
                case 2014:
                    this.iv2014 += parseInt(el.val, 10);
                    break;
                case 2015:
                    this.iv2015 += parseInt(el.val, 10);
                    break;
                case 2016:
                    this.iv2016 += parseInt(el.val, 10);
                    break;
                case 2017:
                    this.iv2017 += parseInt(el.val, 10);
                    break;
                case 2018:
                    this.iv2018 += parseInt(el.val, 10);
                    break;
            }
            break;
          case 'pv':
            switch(el.year) {
                case 2014:
                    this.pv2014 += parseInt(el.val, 10);
                    break;
                case 2015:
                    this.pv2015 += parseInt(el.val, 10);
                    break;
                case 2016:
                    this.pv2016 += parseInt(el.val, 10);
                    break;
                case 2017:
                    this.pv2017 += parseInt(el.val, 10);
                    break;
                case 2018:
                    this.pv2018 += parseInt(el.val, 10);
                    break;
            }
            break;
          case 'fdi':
            switch(el.year) {
                case 2014:
                    this.fdi2014 += parseInt(el.val, 10);
                    break;
                case 2015:
                    this.fdi2015 += parseInt(el.val, 10);
                    break;
                case 2016:
                    this.fdi2016 += parseInt(el.val, 10);
                    break;
                case 2017:
                    this.fdi2017 += parseInt(el.val, 10);
                    break;
                case 2018:
                    this.fdi2018 += parseInt(el.val, 10);
                    break;
            }
            break;
          case 'njc':
            switch(el.year) {
                case 2014:
                    this.njc2014 += parseInt(el.val, 10);
                    break;
                case 2015:
                    this.njc2015 += parseInt(el.val, 10);
                    break;
                case 2016:
                    this.njc2016 += parseInt(el.val, 10);
                    break;
                case 2017:
                    this.njc2017 += parseInt(el.val, 10);
                    break;
                case 2018:
                    this.njc2018 += parseInt(el.val, 10);
                    break;
            }
            break;
          case 'tv':
            switch(el.year) {
                case 2014:
                    this.tv2014 += parseInt(el.val, 10);
                    break;
                case 2015:
                    this.tv2015 += parseInt(el.val, 10);
                    break;
                case 2016:
                    this.tv2016 += parseInt(el.val, 10);
                    break;
                case 2017:
                    this.tv2017 += parseInt(el.val, 10);
                    break;
                case 2018:
                    this.tv2018 += parseInt(el.val, 10);
                    break;
            }
            break;
          case 'ev':
            switch(el.year) {
                case 2014:
                    this.ev2014 += parseInt(el.val, 10);
                    break;
                case 2015:
                    this.ev2015 += parseInt(el.val, 10);
                    break;
                case 2016:
                    this.ev2016 += parseInt(el.val, 10);
                    break;
                case 2017:
                    this.ev2017 += parseInt(el.val, 10);
                    break;
                case 2018:
                    this.ev2018 += parseInt(el.val, 10);
                    break;
            }
            break;
          case 'sfi':
            switch(el.year) {
                case 2014:
                    this.sfi2014 += parseInt(el.val, 10);
                    break;
                case 2015:
                    this.sfi2015 += parseInt(el.val, 10);
                    break;
                case 2016:
                    this.sfi2016 += parseInt(el.val, 10);
                    break;
                case 2017:
                    this.sfi2017 += parseInt(el.val, 10);
                    break;
                case 2018:
                    this.sfi2018 += parseInt(el.val, 10);
                    break;
            }
            break;
      }
		},

    async generate_pdf() {
      await this.get_investments();

      const jsPDF = require("jspdf");
      require("jspdf-autotable");

      const doc = new jsPDF("portrait", "px", [595, 842]);

      const PTSans = font();
      doc.addFileToVFS("PTSans.ttf", PTSans);
      doc.addFont("PTSans.ttf", "PTSans", "normal");
      doc.setFont("PTSans");

      // header
      this.header_pdf(doc);

      doc.text(
        this.lang == "ru"
          ? "Наименование Компании – участника:"
          : this.lang == "kz"
            ? "Қоғамның атауы - қатысушы:"
            : "Name of the Company - participant:",
        30,
        77
      );
      var ttl = this.selected_sector["title_" + this.lang].split(" ");
      if (ttl.length >= 2) {
        var ttl_text = "";
        ttl.forEach((el, i) => {
          if (i % 2 == 0) {
            ttl_text += el + "\n";
          } else {
            ttl_text += el + " ";
          }
        });
        doc.text(ttl_text, 400, 67);
      } else {
        doc.text(ttl, 400, 77);
      }

      doc.text(
        this.lang == "ru"
          ? "Название проекта:"
          : this.lang == "kz"
            ? "Жобаның атауы:"
            : "Project name",
        30,
        152
      );
      var ttlp = this.selected_sector["title_project_" + this.lang].split(" ");
      if (ttlp.length >= 2) {
        var ttlp_text = "";
        ttlp.every((el, i) => {
          if (i % 2 == 0) {
            ttlp_text += el + "\n";
          } else {
            ttlp_text += el + " ";
          }
          if (i > 7) {
            return false;
          } else {
            return true;
          }
        });
        doc.text(ttlp_text, 400, 145);
      } else {
        doc.text(ttlp, 400, 142);
      }

      doc.text(
        this.lang == "ru"
          ? "Выпускаемая продукция:"
          : this.lang == "kz"
            ? "Өнімдер:"
            : "Manufactured products:",
        30,
        232
      );
      var prdcts = this.selected_sector["products_" + this.lang].split(" ");
      if (prdcts.length >= 2) {
        var prdcts_text = "";
        prdcts.every((el, i) => {
          if (i % 2 == 0) {
            prdcts_text += el + "\n";
          } else {
            prdcts_text += el + " ";
          }
          if (i > 19) {
            return false;
          } else {
            return true;
          }
        });
        doc.text(prdcts_text, 400, 227);
      } else {
        doc.text(prdcts, 400, 227);
      }

      doc.text(
        this.lang == "ru" ? "Год:" : this.lang == "kz" ? "Жыл:" : "Year:",
        30,
        397
      );
      doc.text(
        this.selected_sector["project_date"]
          ? this.selected_sector["project_date"]
          : "-",
        400,
        397
      );

      doc.text(
        this.lang == "ru"
          ? "Текущий статус:"
          : this.lang == "kz"
            ? "Ағымдағы күй:"
            : "Current status:",
        30,
        437
      );
      switch (this.selected_sector.project_type) {
        case 1:
          doc.text(
            this.lang == "ru"
              ? "Действующий"
              : this.lang == "kz"
                ? "Әрекеттегі"
                : "Ongoing",
            400,
            437
          );
          break;
        case 2:
          doc.text(
            this.lang == "ru"
              ? "На стадии реализации"
              : this.lang == "kz"
                ? "Іске асыру сатысында"
                : "Underway",
            400,
            437
          );
          break;
        case 3:
          doc.text(
            this.lang == "ru"
              ? "Свободный"
              : this.lang == "kz"
                ? "Еркін"
                : "Free",
            400,
            437
          );
          break;
      }

      doc.text(
        this.lang == "ru"
          ? "Наличие подведенных\r\nинфраструктурных мощностей:"
          : this.lang == "kz"
            ? "Инфрақұрылымдық мүмкіндіктердің болуы:"
            : "Availability of infrastructure capacity:",
        30,
        476
      );
      doc.text("-", 400, 481);

      doc.text(
        this.lang == "ru"
          ? "Стоимость проекта:"
          : this.lang == "kz"
            ? "Жобаның құны:"
            : "Project price:",
        30,
        526
      );
      doc.text(
        this.selected_sector["project_price"]
          ? parseInt(this.selected_sector["project_price"]).toLocaleString("en") +
            (this.lang == "ru"
              ? " Тенге"
              : this.lang == "kz"
                ? " Теңге"
                : " Tenge")
          : "-",
        400,
        526
      );

      doc.text(
        this.lang == "ru"
          ? "Иностранное участие:"
          : this.lang == "kz"
            ? "Шетелдік қатысуы:"
            : "Internetional participation:",
        30,
        570
      );
      var frgn = this.selected_sector["foreign_participation"]
        ? this.selected_sector["foreign_participation"].split(" ")
        : "-";
      if (frgn.length >= 2) {
        var frgn_text = "";
        frgn.forEach((el, i) => {
          if (i % 2 == 0) {
            frgn_text += el + "\n";
          } else {
            frgn_text += el + " ";
          }
        });
        doc.text(frgn_text, 400, 570);
      } else {
        doc.text(frgn, 400, 570);
      }

      doc.text(
        this.lang == "ru"
          ? "Мощность проекта:"
          : this.lang == "kz"
            ? "Жобаның қуаты:"
            : "Project power:",
        30,
        645
      );
      var pwr = this.selected_sector["power"] ? this.selected_sector["power"].split(' ') : "-";
      if (pwr.length >= 2) {
        var pwr_text = "";
        pwr.forEach((el, i) => {
          if (i % 3 == 0 && i != 0) {
            pwr_text += el + "\n";
          } else {
            pwr_text += el + " ";
          }
        });
        doc.text(pwr_text, 400, 645);
      } else {
        doc.text(pwr, 400, 645);
      }

      if (this.selected_sector.project_type == 2) {
        doc.text(
          this.lang == "ru"
            ? "Планируемые рабочие места:"
            : this.lang == "kz"
              ? "Жоспарланған жұмыс орындары:"
              : "Planned jobs:",
          30,
          755
        );
        doc.text(
          this.selected_sector["plan_jobs"]
            ? parseInt(this.selected_sector["plan_jobs"]).toLocaleString("en")
            : "-",
          400,
          755
        );

        doc.text(
          this.lang == "ru"
            ? "Контакты:"
            : this.lang == "kz"
              ? "Байланыс:"
              : "Contacts:",
          30,
          800
        );
        doc.text(
          this.selected_sector["contacts_" + this.lang]
            ? this.selected_sector["contacts_" + this.lang]
            : "-",
          400,
          800
        );

        doc.setDrawColor("#D2D2D2");
        doc.setLineWidth(1);
        doc.line(30, 776, 565, 776);
      } else {
        doc.text(
          this.lang == "ru"
            ? "Контакты:"
            : this.lang == "kz"
              ? "Байланыс:"
              : "Contacts:",
          30,
          755
        );
        doc.text(
          this.selected_sector["contacts_" + this.lang]
            ? this.selected_sector["contacts_" + this.lang]
            : "-",
          400,
          755
        );
      }

      doc.setDrawColor("#D2D2D2");
      doc.setLineWidth(1);
      doc.line(30, 127, 565, 127);
      doc.line(30, 212, 565, 212);
      doc.line(30, 377, 565, 377);
      doc.line(30, 412, 565, 412);
      doc.line(30, 457, 565, 457);
      doc.line(30, 502, 565, 502);
      doc.line(30, 547, 565, 547);
      doc.line(30, 622, 565, 622);
      doc.line(30, 731, 565, 731);
      doc.line(30, 776, 565, 776);

      doc.addPage();

      // header
      this.header_pdf(doc);

      doc.text(
        this.lang == "ru"
          ? "Объем вложенных инвестиций по годам:"
          : this.lang == "kz"
            ? "Жылына салынған инвестициялар көлемі:"
            : "The volume of investments by year:",
        30,
        77
      );
      doc.text(
        this.lang == "ru"
          ? "Объем производства по годам:"
          : this.lang == "kz"
            ? "Жыл сайынғы өнім көлемі:"
            : "The volume of production by year:",
        30,
        160
      );
      doc.text(
        this.lang == "ru"
          ? "Прямые иностранные инвестиций по годам:"
          : this.lang == "kz"
            ? "Жыл сайын шетелдік тікелей инвестициялар:"
            : "Foreign direct investment by year:",
        30,
        235
      );
      doc.text(
        this.lang == "ru"
          ? "Количество рабочих мест по годам:"
          : this.lang == "kz"
            ? "Жыл сайын жұмыс орындарының саны:"
            : "Number of jobs by year:",
        30,
        310
      );
      doc.text(
        this.lang == "ru"
          ? "Объем налоговых отчислений по проектам по годам:"
          : this.lang == "kz"
            ? "Жыл бойынша салық аударымдарының сомасы:"
            : "The amount of tax deductions by year:",
        30,
        390
      );
      doc.text(
        this.lang == "ru" ? "Объем экспорта" : this.lang == "en" ? "Export volume" : "Экспорттың көлемі",
        30,
        470
      );
      doc.text(
        this.lang == "ru" ? "Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом" : this.lang == "en" ? "Attracted foreign investments for 1 tenge spent by the budget" : "Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды",
        30,
        550
      );

      doc.text(
        this.lang == "ru"
          ? "Доля выделенного финансирования по отношению\r\nк общей сумме финансирования СЭЗ/ИЗ РК:"
          : this.lang == "kz"
            ? "ҚР АЭА/ИА қаржыландырудың жалпы сомасына\r\nқатысты бөлінетін қаржыландыру үлесі:"
            : "The share of funding allocated in relation to\r\nthe total amount of financing of the SEZ/IZ:",
        30,
        640
      );
      this.investments_sum = 0;
      this.investments.forEach(el => {
        if (this.selected_sector.id == el.parent_id) {
          this.investments_sum += parseInt(el.val,10);
        }
      });
      if (this.investments_sum) {
        doc.text( ((this.investments_sum * 100)/this.investment).toFixed(2) + '%\r\n('+this.investments_sum.toLocaleString('en')+'/'+this.investment.toLocaleString('en')+')', 400, 640);
      } else {
        doc.text('0%', 460, 640);
      }

      if (this.selected_sector.divisible) {
        switch (this.selected_sector.divisible) {
          case 1:
            doc.text(
              this.lang == "ru"
                ? "Делимый:"
                : this.lang == "kz"
                  ? "Бөліседі:"
                  : "Divisible:",
              30,
              705
            );
            doc.text(
              this.lang == "ru" ? "Да" : this.lang == "kz" ? "Иә" : "Yes",
              460,
              704
            );
            break;
          case 0:
            doc.text(
              this.lang == "ru"
                ? "Делимый:"
                : this.lang == "kz"
                  ? "Бөліседі:"
                  : "Divisible:",
              30,
              705
            );
            doc.text(
              this.lang == "ru" ? "Нет" : this.lang == "kz" ? "Жоқ" : "No",
              460,
              705
            );
            break;
        }
      }

      // table Объем вложенных инвестиций по годам:
      const columns = [2014, 2015, 2016, 2017, 2018];

      var data = [
        [
          this.iv2014.toLocaleString("en") != 0 ? this.iv2014.toLocaleString("en") : '-',
          this.iv2015.toLocaleString("en") != 0 ? this.iv2015.toLocaleString("en") : '-',
          this.iv2016.toLocaleString("en") != 0 ? this.iv2016.toLocaleString("en") : '-',
          this.iv2017.toLocaleString("en") != 0 ? this.iv2017.toLocaleString("en") : '-',
          this.iv2018.toLocaleString("en") != 0 ? this.iv2018.toLocaleString("en") : '-',
        ]
      ];
      doc.autoTable(columns, data, { startY: 92 });

      // table Объем производства по годам:
      data = [
        [
          this.pv2014.toLocaleString("en") != 0 ? this.pv2014.toLocaleString("en") : '-',
          this.pv2015.toLocaleString("en") != 0 ? this.pv2015.toLocaleString("en") : '-',
          this.pv2016.toLocaleString("en") != 0 ? this.pv2016.toLocaleString("en") : '-',
          this.pv2017.toLocaleString("en") != 0 ? this.pv2017.toLocaleString("en") : '-',
          this.pv2018.toLocaleString("en") != 0 ? this.pv2018.toLocaleString("en") : '-',
        ]
      ];
      doc.autoTable(columns, data, {
        startY: doc.autoTable.previous.finalY + 45
      });

      // tbale Прямые иностранные инвестиций по годам:
      data = [
        [
          this.fdi2014.toLocaleString("en") != 0 ? this.fdi2014.toLocaleString("en") : '-',
          this.fdi2015.toLocaleString("en") != 0 ? this.fdi2015.toLocaleString("en") : '-',
          this.fdi2016.toLocaleString("en") != 0 ? this.fdi2016.toLocaleString("en") : '-',
          this.fdi2017.toLocaleString("en") != 0 ? this.fdi2017.toLocaleString("en") : '-',
          this.fdi2018.toLocaleString("en") != 0 ? this.fdi2018.toLocaleString("en") : '-',
        ]
      ];
      doc.autoTable(columns, data, {
        startY: doc.autoTable.previous.finalY + 45
      });

      // table Количество рабочих мест по годам:
      data = [
        [
          this.njc2014.toLocaleString("en") != 0 ? this.njc2014.toLocaleString("en") : '-',
          this.njc2015.toLocaleString("en") != 0 ? this.njc2015.toLocaleString("en") : '-',
          this.njc2016.toLocaleString("en") != 0 ? this.njc2016.toLocaleString("en") : '-',
          this.njc2017.toLocaleString("en") != 0 ? this.njc2017.toLocaleString("en") : '-',
          this.njc2018.toLocaleString("en") != 0 ? this.njc2018.toLocaleString("en") : '-',
        ]
      ];
      doc.autoTable(columns, data, {
        startY: doc.autoTable.previous.finalY + 45
      });

      // table Объем налоговых отчислений по проектам по годам:
      data = [
        [
          this.tv2014.toLocaleString("en") != 0 ? this.tv2014.toLocaleString("en") : '-',
          this.tv2015.toLocaleString("en") != 0 ? this.tv2015.toLocaleString("en") : '-',
          this.tv2016.toLocaleString("en") != 0 ? this.tv2016.toLocaleString("en") : '-',
          this.tv2017.toLocaleString("en") != 0 ? this.tv2017.toLocaleString("en") : '-',
          this.tv2018.toLocaleString("en") != 0 ? this.tv2018.toLocaleString("en") : '-',
        ]
      ];
      doc.autoTable(columns, data, {
        startY: doc.autoTable.previous.finalY + 45
      });

      // table Объем экспорта
      data = [
        [
          this.ev2014.toLocaleString("en") != 0 ? this.ev2014.toLocaleString("en") : '-',
          this.ev2015.toLocaleString("en") != 0 ? this.ev2015.toLocaleString("en") : '-',
          this.ev2016.toLocaleString("en") != 0 ? this.ev2016.toLocaleString("en") : '-',
          this.ev2017.toLocaleString("en") != 0 ? this.ev2017.toLocaleString("en") : '-',
          this.ev2018.toLocaleString("en") != 0 ? this.ev2018.toLocaleString("en") : '-',
        ]
      ];
      doc.autoTable(columns, data, {
        startY: doc.autoTable.previous.finalY + 45
      });

      // table 
      data = [
        [
          this.sfi2014.toLocaleString("en") != 0 ? this.sfi2014.toLocaleString("en") : '-',
          this.sfi2015.toLocaleString("en") != 0 ? this.sfi2015.toLocaleString("en") : '-',
          this.sfi2016.toLocaleString("en") != 0 ? this.sfi2016.toLocaleString("en") : '-',
          this.sfi2017.toLocaleString("en") != 0 ? this.sfi2017.toLocaleString("en") : '-',
          this.sfi2018.toLocaleString("en") != 0 ? this.sfi2018.toLocaleString("en") : '-',
        ]
      ];
      doc.autoTable(columns, data, {
        startY: doc.autoTable.previous.finalY + 45
      });

      doc.line(
        30,
        doc.autoTable.previous.finalY + 25,
        565,
        doc.autoTable.previous.finalY + 25
      );
      doc.line(
        30,
        doc.autoTable.previous.finalY + 85,
        565,
        doc.autoTable.previous.finalY + 85
      );

      doc.save(this.selected_zone["title_" + this.lang] + '_' + this.selected_sector["title_" + this.lang] + ".pdf");
    },

    async generate_excel() {
      await this.get_investments();

      this.investments_sum = 0;
      this.investments.forEach(el => {
        if (this.selected_sector.id == el.parent_id) {
          this.investments_sum += parseInt(el.val,10);
        }
      });

      let project_type;
      switch (this.selected_sector.project_type) {
        case 1:
          project_type = 
            this.lang == "ru"
              ? "Действующий"
              : this.lang == "kz"
                ? "Әрекеттегі"
                : "Ongoing";
          break;
        case 2:
          project_type = this.lang == "ru"
              ? "На стадии реализации"
              : this.lang == "kz"
                ? "Іске асыру сатысында"
                : "Underway";
          break;
        case 3:
          project_type = this.lang == "ru"
              ? "Свободный"
              : this.lang == "kz"
                ? "Еркін"
                : "Free";
          break;
      }
      let divisible;
      switch (this.selected_sector.divisible) {
        case 1:
          divisible = this.lang == "ru" ? "Да" : this.lang == "kz" ? "Иә" : "Yes";
          break;
        case 0:
          divisible = this.lang == "ru" ? "Нет" : this.lang == "kz" ? "Жоқ" : "No";
          break;
      }
      let general_data = [{
        title : this.selected_sector["title_" + this.lang],
        title_project : this.selected_sector["title_project_" + this.lang],
        products: this.selected_sector["products_" + this.lang],
        year: this.selected_sector["project_date"] ? this.selected_sector["project_date"] : "-",
        project_type: project_type,
        project_price: this.selected_sector["project_price"] ? parseInt(this.selected_sector["project_price"]).toLocaleString("en") + (this.lang == "ru" ? " Тенге" : this.lang == "kz" ? " Теңге" : " Tenge") : "-",
        foreign_participation: this.selected_sector["foreign_participation"] ? this.selected_sector["foreign_participation"] : "-",
        power: this.selected_sector["power"] ? this.selected_sector["power"] : "-",
        planned_jobs: this.selected_sector["plan_jobs"] ? parseInt(this.selected_sector["plan_jobs"]).toLocaleString("en") : "-",
        contacts: this.selected_sector["contacts_" + this.lang] ? this.selected_sector["contacts_" + this.lang] : "-",
        divisible: divisible,
        share: ((this.investments_sum * 100)/this.investment).toFixed(2) + '%\r\n('+this.investments_sum.toLocaleString('en')+'/'+this.investment.toLocaleString('en')+')',
      }];

      let header = [[
        this.lang == 'ru' ? 'Название компании участника' : this.lang == 'en' ? 'Participant\'s company name': 'Қатысушының компания атауы',
        this.lang == 'ru' ? 'Описание' : this.lang == 'en' ? 'Description': 'Сипаттама',
        this.lang == "ru" ? "Выпускаемая продукция:" : this.lang == "kz" ? "Өнімдер:" : "Manufactured products:",
        this.lang == "ru" ? "Год:" : this.lang == "kz" ? "Жыл:" : "Year:",
        this.lang == "ru" ? "Текущий статус:" : this.lang == "kz" ? "Ағымдағы күй:" : "Current status:",
        this.lang == "ru" ? "Стоимость проекта:" : this.lang == "kz" ? "Жобаның құны:" : "Project price:",
        this.lang == "ru" ? "Иностранное участие:" : this.lang == "kz" ? "Шетелдік қатысуы:" : "Internetional participation:",
        this.lang == "ru" ? "Мощность проекта:" : this.lang == "kz" ? "Жобаның қуаты:" : "Project power:",
        this.lang == "ru" ? "Планируемые рабочие места:" : this.lang == "kz" ? "Жоспарланған жұмыс орындары:" : "Planned jobs:",
        this.lang == "ru" ? "Контакты:" : this.lang == "kz" ? "Байланыс:" : "Contacts:",
        this.lang == "ru" ? "Делимый:" : this.lang == "kz" ? "Бөліседі:" : "Divisible:",
        this.lang == "ru" ? "Доля выделенного финансирования по отношению\r\nк общей сумме финансирования СЭЗ/ИЗ РК:" : this.lang == "kz" ? "ҚР АЭА/ИА қаржыландырудың жалпы сомасына\r\nқатысты бөлінетін қаржыландыру үлесі:" : "The share of funding allocated in relation to\r\nthe total amount of financing of the SEZ/IZ:",
      ]];

      let investments = [{
        2014: this.iv2014.toLocaleString("en") != 0 ? this.iv2014.toLocaleString("en") : '-',
        2015: this.iv2015.toLocaleString("en") != 0 ? this.iv2015.toLocaleString("en") : '-',
        2016: this.iv2016.toLocaleString("en") != 0 ? this.iv2016.toLocaleString("en") : '-',
        2017: this.iv2017.toLocaleString("en") != 0 ? this.iv2017.toLocaleString("en") : '-',
        2018: this.iv2018.toLocaleString("en") != 0 ? this.iv2018.toLocaleString("en") : '-',
      }];
      let productions = [{
        2014: this.pv2014.toLocaleString("en") != 0 ? this.pv2014.toLocaleString("en") : '-',
        2015: this.pv2015.toLocaleString("en") != 0 ? this.pv2015.toLocaleString("en") : '-',
        2016: this.pv2016.toLocaleString("en") != 0 ? this.pv2016.toLocaleString("en") : '-',
        2017: this.pv2017.toLocaleString("en") != 0 ? this.pv2017.toLocaleString("en") : '-',
        2018: this.pv2018.toLocaleString("en") != 0 ? this.pv2018.toLocaleString("en") : '-',
      }];
      let foreign_investments = [{
        2014: this.fdi2014.toLocaleString("en") != 0 ? this.fdi2014.toLocaleString("en") : '-',
        2015: this.fdi2015.toLocaleString("en") != 0 ? this.fdi2015.toLocaleString("en") : '-',
        2016: this.fdi2016.toLocaleString("en") != 0 ? this.fdi2016.toLocaleString("en") : '-',
        2017: this.fdi2017.toLocaleString("en") != 0 ? this.fdi2017.toLocaleString("en") : '-',
        2018: this.fdi2018.toLocaleString("en") != 0 ? this.fdi2018.toLocaleString("en") : '-',
      }];
      let new_jobs_created = [{
        2014: this.njc2014.toLocaleString("en") != 0 ? this.njc2014.toLocaleString("en") : '-',
        2015: this.njc2015.toLocaleString("en") != 0 ? this.njc2015.toLocaleString("en") : '-',
        2016: this.njc2016.toLocaleString("en") != 0 ? this.njc2016.toLocaleString("en") : '-',
        2017: this.njc2017.toLocaleString("en") != 0 ? this.njc2017.toLocaleString("en") : '-',
        2018: this.njc2018.toLocaleString("en") != 0 ? this.njc2018.toLocaleString("en") : '-',
      }];
      let taxes = [{
        2014: this.tv2014.toLocaleString("en") != 0 ? this.tv2014.toLocaleString("en") : '-',
        2015: this.tv2015.toLocaleString("en") != 0 ? this.tv2015.toLocaleString("en") : '-',
        2016: this.tv2016.toLocaleString("en") != 0 ? this.tv2016.toLocaleString("en") : '-',
        2017: this.tv2017.toLocaleString("en") != 0 ? this.tv2017.toLocaleString("en") : '-',
        2018: this.tv2018.toLocaleString("en") != 0 ? this.tv2018.toLocaleString("en") : '-',
      }];
      let exports_value = [{
        2014: this.ev2014.toLocaleString("en") != 0 ? this.ev2014.toLocaleString("en") : '-',
        2015: this.ev2015.toLocaleString("en") != 0 ? this.ev2015.toLocaleString("en") : '-',
        2016: this.ev2016.toLocaleString("en") != 0 ? this.ev2016.toLocaleString("en") : '-',
        2017: this.ev2017.toLocaleString("en") != 0 ? this.ev2017.toLocaleString("en") : '-',
        2018: this.ev2018.toLocaleString("en") != 0 ? this.ev2018.toLocaleString("en") : '-',
      }];
      let sfi = [{
        2014: this.sfi2014.toLocaleString("en") != 0 ? this.sfi2014.toLocaleString("en") : '-',
        2015: this.sfi2015.toLocaleString("en") != 0 ? this.sfi2015.toLocaleString("en") : '-',
        2016: this.sfi2016.toLocaleString("en") != 0 ? this.sfi2016.toLocaleString("en") : '-',
        2017: this.sfi2017.toLocaleString("en") != 0 ? this.sfi2017.toLocaleString("en") : '-',
        2018: this.sfi2018.toLocaleString("en") != 0 ? this.sfi2018.toLocaleString("en") : '-',
      }];

      let workbook = XLSX.utils.book_new();
      workbook.Props = {
        Title: this.selected_zone["title_" + this.lang] + '_' + this.selected_sector["title_" + this.lang],
        Subject: this.selected_zone["title_" + this.lang] + '_' + this.selected_sector["title_" + this.lang],
        CreatedDate: new Date(),
      };

      let worksheet1 = XLSX.utils.aoa_to_sheet(header);
      XLSX.utils.sheet_add_json(worksheet1, general_data, { skipHeader: true, origin: -1});
      let worksheet2 = XLSX.utils.json_to_sheet(investments);
      let worksheet3 = XLSX.utils.json_to_sheet(productions);
      let worksheet4 = XLSX.utils.json_to_sheet(foreign_investments);
      let worksheet5 = XLSX.utils.json_to_sheet(new_jobs_created);
      let worksheet6 = XLSX.utils.json_to_sheet(taxes);
      let worksheet7 = XLSX.utils.json_to_sheet(exports_value);
      let worksheet8 = XLSX.utils.json_to_sheet(sfi);
      
      XLSX.utils.book_append_sheet(workbook, worksheet1, this.lang == "ru" ? "Отчет по проектам" : this.lang == "kz" ? "Жоба туралы есеп" : "Project Report");
      XLSX.utils.book_append_sheet(workbook, worksheet2, this.lang == "ru" ? "Инвестиции" : this.lang == "kz" ? "Инвестициялар" : "Investments");
      XLSX.utils.book_append_sheet(workbook, worksheet3, this.lang == "ru" ? "Объем производства" : this.lang == "kz" ? "Өнім көлемі" : "Production volume");
      XLSX.utils.book_append_sheet(workbook, worksheet4, this.lang == "ru" ? "Иностранные инвестиции" : this.lang == "kz" ? "Шетелдік инвестициялар" : "Foreign investmentы");
      XLSX.utils.book_append_sheet(workbook, worksheet5, this.lang == "ru" ? "Рабочие места" : this.lang == "kz" ? "Жұмыс орындары" : "Workplaces");
      XLSX.utils.book_append_sheet(workbook, worksheet6, this.lang == "ru" ? "Налоговые отчисления" : this.lang == "kz" ? "Салық аударымдар" : "Tax");
      XLSX.utils.book_append_sheet(workbook, worksheet7, this.lang == "ru" ? "Объем экспорта" : this.lang == "en" ? "Export volume" : "Экспорттың көлемі");
      XLSX.utils.book_append_sheet(workbook, worksheet8, this.lang == "ru" ? "Привлечено иностр. инвестиций" : this.lang == "en" ? "Attracted foreign investments" : "Шетелдік инвестициялар тартылды");

      XLSX.writeFile(workbook, this.selected_zone["title_" + this.lang] + '_' + this.selected_sector["title_" + this.lang] + ".xlsx");
    },
  },

  watch: {
    passport_content: "get_zone_sector"
  }
};
</script>


<template>
  <div class="sidebar" 
    :class="{'sidebar--expanded': sidebar_expanded}">

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
          }"
          :active_page="0"
        >
          <span slot="tab_title_0">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title"
                v-text="lang == 'ru' ? 'Справка' : lang == 'en' ? 'Information': 'Анықтама'"
              ></span>
            </span>
          </span>
          <span slot="tab_title_1">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title"
                v-text="lang == 'ru' ? 'Cписок' : lang == 'en' ? 'List': 'Тізім'"
              ></span>
            </span>        
          </span>
          
          <template v-if="profile">
            <span slot="tab_title_2">
              <span class="sidebar-tab">
                <span class="sidebar-tab_icon"></span>
                <span class="sidebar-tab_title"
                  v-text="lang == 'ru' ? 'Показатели' : lang == 'en' ? 'Indicators': 'Көрсеткіштер'"
                ></span>
              </span>        
            </span>
          </template>

          <div slot="tab_0">
            <template 
              v-if="active_level.id == 1"> 
              <reference
                v-if="zone_filter.length ? zone_filter[0].checked : null"
                :menu="[{
                  title_ru: 'Преимущества ' + republics[0]['title_' + lang] + ' РК',
                  title_en: 'Benefits ' + republics[0]['title_' + lang] + ' RK',
                  title_kz: 'Артықшылық ' + republics[0]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:sez_advantages',
                }]"
              />
              <reference
                :menu="[{
                  title_ru: 'Общие положения СЭЗ/ИЗ РК',
                  title_kz: 'Жалпы ережелер ИЗ/СЭЗ ҚР',
                  title_en: 'General provisions of IZ/SEZ RK',
                  passport_content: 'level_1:sez_iz_polozh',
                }]"
              />
              <reference
                v-if="zone_filter.length ? zone_filter[0].checked : null"
                :menu="[{
                  title_ru: 'Описание ' + republics[0]['title_' + lang] + ' РК',
                  title_en: 'Description ' + republics[0]['title_' + lang] + ' RK',
                  title_kz: 'Сипаттама ' + republics[0]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:sez_common',
                }, {
                  title_ru: 'Маркетинговые материалы ' + republics[0]['title_' + lang] + ' РК',
                  title_en: 'Marketing materials ' + republics[0]['title_' + lang] + ' RK',
                  title_kz: 'Маркетингтік материалдар ' + republics[0]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:sez_market',
                }]"
              />
              <reference
                v-if="zone_filter.length ? zone_filter[1].checked : null"
                :menu="[{
                  title_ru: 'Преимущества ' + republics[1]['title_' + lang] + ' РК',
                  title_en: 'Benefits ' + republics[1]['title_' + lang] + ' RK',
                  title_kz: 'Артықшылық ' + republics[1]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:iz_advantages',
                }, {
                  title_ru: 'Описание ' + republics[1]['title_' + lang] + ' РК',
                  title_en: 'Description ' + republics[1]['title_' + lang] + ' RK',
                  title_kz: 'Сипаттама ' + republics[1]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:iz_common',
                }, {
                  title_ru: 'Маркетинговые материалы ' + republics[1]['title_' + lang] + ' РК',
                  title_en: 'Marketing materials ' + republics[1]['title_' + lang] + ' RK',
                  title_kz: 'Маркетингтік материалдар ' + republics[1]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:iz_market',
                }]"
              />
              <reference
                :menu="[{
                  title_ru: 'Контакты АО «НК «KAZAKH INVEST»',
                  title_en: 'JSC «НК «KAZAKH INVEST» contacts',
                  title_kz: 'АҚ «НК «KAZAKH INVEST» байланыстары',
                  passport_content: 'level_1:sez_iz_contacts',
                }]"
              />
            </template>

            <reference
              v-if="active_level.id == 2"
              :menu="[{
                title_ru: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                title_en: 'Description ' + selected_zone['title_' + lang] + ' RK',
                title_kz: 'Сипаттама ' + selected_zone['title_' + lang] + ' ҚР',
                passport_content: 'level_2:zone_description',
              }, {
                title_ru: 'Описание региона',
                title_en: 'Region description',
                title_kz: 'Аймақ сипаттама',
                passport_content: 'level_2:region_description',
              }, {
                title_ru: 'Маркетинговые материалы',
                title_en: 'Marketing materials',
                title_kz: 'Маркетингтік материалдар',
                passport_content: 'level_2:zone_market',
              }, {
                title_ru: 'Контакты',
                title_en: 'Contacts',
                title_kz: 'Байланыс',
                passport_content: 'level_2:zone_contacts',
              }]"
            />

            <reference
              v-if="active_level.id == 3"
              :menu="[{
                title_ru: 'Общая информация',
                title_en: 'General information',
                title_kz: 'Жалпы ақпарат',
                passport_content: 'level_3:sector_common',
              }, {
                title_ru: 'Маркетинговые материалы',
                title_en: 'Marketing materials',
                title_kz: 'Маркетингтік материалдар',
                passport_content: 'level_3:sector_market',
              }, {
                title_ru: 'Контакты',
                title_en: 'Contacts',
                title_kz: 'Байланыс',
                passport_content: 'level_3:sector_contacts',
              }]"
            />
          </div>

          <div slot="tab_1">
            <div class="sidebar-item"
              v-for="zone in zones"
              v-if="active_level.id == 1"
              @click="
                set_passport_content(''),
                set_level({
                  id: 2,
                  title_ru: zone.title_ru,
                  title_en: zone.title_en,
                  title_kz: zone.title_kz,
                  properties: zone
                })
              ">
              <span class="sidebar-item_title" 
                :title="zone['title_' + lang]"
                v-text="zone['title_' + lang]"></span>
              <span class="sidebar-item_desc" 
                :title="zone.object_count + (lang == 'ru' ? ' объектов' : lang == 'kz' ? ' объект' : ' objects')"
                v-text="zone.object_count + (lang == 'ru' ? ' объектов' : lang == 'kz' ? ' объект' : ' objects')"></span>
            </div>
            <div class="sidebar-item"
              v-if="sectors && active_level.id == 2"
              v-for="sector in sectors"
              :class="{ 'sidebar-item--active': selected_sector && selected_sector.id == sector.id  }"
              @click="
                set_passport_content(''),
                set_passport_title({ title_ru: sector.title_ru, title_kz: sector.title_kz, title_en: sector.title_en }),
                set_level({
                  id: 3,
                  title_ru: sector.title_ru,
                  title_en: sector.title_en,
                  title_kz: sector.title_kz,
                  properties: sector
                })
              ">
              <!-- set_passport_title(sector['title_'+lang]), -->
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
              <span class="sidebar-item_desc"
                :title="sector.area"
                v-text="sector.area + (lang == 'en' ? ' ha' : ' Га') || '-'"></span>
            </div>
          </div>

          <template v-if="profile">
            <div slot="tab_2">
              <reference
                v-if="zone_filter[key].checked && active_level.id == 1"
                v-for="republic, key in republics"
                :menu="[{
                  title_ru: 'Цифровые показатели ' + republic['title_' + lang],
                  title_en: 'Digital indicators ' + republic['title_' + lang],
                  title_kz: 'Сандық көрсеткіштер ' + republic['title_' + lang],
                  passport_content: 'level_1:' + republic.type + ':numeric',
                }, {
                  title_ru: 'Диаграммы ' + republic['title_' + lang],
                  title_en: 'Diagrams ' + republic['title_' + lang],
                  title_kz: 'Диаграммалар ' + republic['title_' + lang],
                  passport_content: 'level_1:' + republic.type + ':diagramm',
                }]"
              />
              <reference
                v-if="active_level.id == 2"
                :menu="[{
                  title_ru: 'Цифровые показатели',
                  title_en: 'Digital indicators',
                  title_kz: 'Сандық көрсеткіштер',
                  passport_content: 'level_2:numeric',
                }, {
                  title_ru: 'Диаграммы',
                  title_en: 'Diagrams',
                  title_kz: 'Диаграммалар',
                  passport_content: 'level_2:diagramm',
                }]"
              />
              <pdf
                v-if="active_level.id == 1 || active_level.id == 2"/>
              <excel
                v-if="active_level.id == 1 || active_level.id == 2"/>
              <reference
                v-if="active_level.id == 3"
                :menu="[{
                  title_ru: 'Цифровые показатели',
                  title_en: 'Digital indicators',
                  title_kz: 'Сандық көрсеткіштер',
                  passport_content: 'level_3:numeric',
                }]"
              />
              <reference
                v-if="zone_filter[key].checked && active_level.id == 1"
                v-for="republic, key in republics"
                :menu="[{
                  title_ru: 'Цифровые показатели ' + republic['title_' + lang],
                  title_en: 'Digital indicators ' + republic['title_' + lang],
                  title_kz: 'Сандық көрсеткіштер ' + republic['title_' + lang],
                  passport_content: 'level_1:' + republic.type + ':numeric',
                }, {
                  title_ru: 'Диаграммы ' + republic['title_' + lang],
                  title_en: 'Diagrams ' + republic['title_' + lang],
                  title_kz: 'Диаграммалар ' + republic['title_' + lang],
                  passport_content: 'level_1:' + republic.type + ':diagramm',
                }]"
              />
              <reference
                v-if="active_level.id == 2"
                :menu="[{
                  title_ru: 'Цифровые показатели',
                  title_en: 'Digital indicators',
                  title_kz: 'Сандық көрсеткіштер',
                  passport_content: 'level_2:numeric',
                }, {
                  title_ru: 'Диаграммы',
                  title_en: 'Diagrams',
                  title_kz: 'Диаграммалар',
                  passport_content: 'level_2:diagramm',
                }]"
              />
              <reference
                v-if="active_level.id == 3"
                :menu="[{
                  title_ru: 'Цифровые показатели',
                  title_en: 'Digital indicators',
                  title_kz: 'Сандық көрсеткіштер',
                  passport_content: 'level_3:numeric',
                }]"
              />

            </div>
          </template>
          
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
        <div slot="body" v-if="passport_content == 'level_1:sez_market'">
          <h2 v-if="republics[0].photos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></h2>
          <div v-if="republics[0].photos.length" class="sidebar-market_wrap">
            <div v-for="photo in republics[0].photos" class="sidebar-passport_photo">
              <img :src="photo['src_' + lang]"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'image_modal',
                    ui_component_state: true,
                  }),
                  select_image(photo['src_' + lang])
              "/>
            </div>
          </div>
          <h2 v-if="republics[0].videos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></h2>
          <div v-if="republics[0].videos.length" class="sidebar-market_wrap">
            <div v-for="video in republics[0].videos" class="sidebar-passport_video"
              v-on:click="
                change_ui_visibility({
                  ui_component: 'video_modal',
                  ui_component_state: true,
                }),
                select_video(video['src_' + lang])
            "></div>
          </div>
          <h2 v-if="republics[0].files.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></h2>
          <div v-if="republics[0].files.length" class="sidebar-market_file" v-for="file in republics[0].files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>          
        </div>
        
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:iz_advantages'">
          <div v-html="republics[1]['advantages_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:iz_common'">
          <div v-html="republics[1]['common_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_iz_polozh'">
          <h3
            v-text="{
              'title_ru': 'Законодательная база СЭЗ РК',
              'title_kz': 'ҚР АЭА заңнамалық базасы',
              'title_en': 'Legislative base of the SEZ RK'
            }['title_' + lang]"
          ></h3>
          <div v-for="link in links_adilet">
            <a
              class="sidebar-link" :href="link['link_'+lang]" target="_blank">
              <h4 
                :style="{ margin: '25px 0 10px 0' }"
                v-text="link['link_'+lang] ? link['text_'+lang] : ''"></h4>
              <p v-text="link['subtext_'+lang]"></p>
            </a>  
          </div>
        </div>
        <div slot="body" v-if="passport_content == 'level_1:iz_market'">
          <h2 v-if="republics[1].photos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></h2>
          <div v-if="republics[1].photos.length" class="sidebar-market_wrap">
            <div v-for="photo in republics[1].photos" class="sidebar-passport_photo">
              <img :src="photo['src_' + lang]"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'image_modal',
                    ui_component_state: true,
                  }),
                  select_image(photo['src_' + lang])
              "/>            
            </div>          
          </div>
          <h2 v-if="republics[1].videos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></h2>
          <div v-if="republics[1].videos.length" class="sidebar-market_wrap">
            <div v-for="video in republics[1].videos" class="sidebar-passport_video"
              v-on:click="
                change_ui_visibility({
                  ui_component: 'video_modal',
                  ui_component_state: true,
                }),
                select_video(video['src_' + lang])
              "
            >
            </div>
          </div>
          <h2 v-if="republics[1].files.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></h2>
          <div v-if="republics[1].files.length" class="sidebar-market_file" v-for="file in republics[1].files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
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

        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:region_description'">
          <div v-html="selected_zone['region_description_' + lang]"></div>
        </div>
        
        <div slot="body" v-if="passport_content == 'level_2:zone_market'">
          <h2 v-if="selected_zone.photos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></h2>
          <div v-if="selected_zone.photos.length" class="sidebar-market_wrap">
            <div v-for="photo in selected_zone.photos" class="sidebar-passport_photo">
              <img :src="photo['src_' + lang]"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'image_modal',
                    ui_component_state: true,
                  }),
                  select_image(photo['src_' + lang])
              "/>            
            </div>           
          </div>
          <h2 v-if="selected_zone.videos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></h2>
          <div v-if="selected_zone.videos.length" class="sidebar-market_wrap">
            <div v-for="video in selected_zone.videos" class="sidebar-passport_video"
              v-on:click="
                change_ui_visibility({
                  ui_component: 'video_modal',
                  ui_component_state: true,
                }),
                select_video(video['src_' + lang])
            "></div>
          </div>
          <h2 v-if="selected_zone.files.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></h2>
          <div class="sidebar-market_file" v-for="file in selected_zone.files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>    
        </div>

        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_contacts'">
          <div v-html="selected_zone['contacts_' + lang]"></div>
        </div>
      </template>

      <!-- Инфа о конкретном Сектор 3 уровнь -->
      <template v-if="active_level.id == 3">
        <!-- общая инфа -->
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_common'">
        </div>
        <div slot="body" v-if="passport_content == 'level_3:sector_market'">
          <h2 v-if="selected_sector.photos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></h2>
          <div v-if="selected_sector.photos.length" class="sidebar-market_wrap">
             <div v-for="photo in selected_sector.photos" class="sidebar-passport_photo">
              <img :src="photo['src_' + lang]"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'image_modal',
                    ui_component_state: true,
                  }),
                  select_image(photo['src_' + lang])
              "/>            
            </div>     
          </div>
          <h2 v-if="selected_sector.videos.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></h2>
          <div v-if="selected_sector.videos.length" class="sidebar-market_wrap">
            <div v-for="video in selected_sector.videos" class="sidebar-passport_video"
              v-on:click="
                change_ui_visibility({
                  ui_component: 'video_modal',
                  ui_component_state: true,
                }),
                select_video(video['src_' + lang])
            "></div>
          </div>
          <h2 v-if="selected_sector.files.length" class="sidebar-passport_subtitle"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></h2>
          <div v-if="selected_sector.files.length" class="sidebar-market_file" v-for="file in selected_sector.files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>        
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_contacts'">
          <div v-html="selected_sector['contacts_' + lang]"></div>
        </div>
      </template>




      <!-- Общая инфа о секторе -->
      <div class="sidebar-passport_padding" slot="body" v-if="
        selected_sector 
        && active_level.id == 3 
        && passport_content != 'level_3:numeric'
        && passport_content != 'level_3:sector_market'
        && passport_content != 'level_3:sector_contacts'
        && passport_content != 'level_1:sez:numeric'
        && passport_content != 'level_1:sez:diagramm'
        && passport_content != 'level_1:sez:numeric'
        && passport_content != 'level_1:iz:diagramm'
      ">
        <div class="passport-body_item"
          v-if="profile"
        >
          <button class="passport-body_item_excel"
            @click="generate_excel">Excel</button>
          <button class="passport-body_item_pdf"
            @click="generate_pdf">PDF</button>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Название компании участника' : lang == 'en' ? 'Participant\'s company name': 'Қатысушының компания атауы'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['title_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description': 'Сипаттама'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['title_project_' + lang]"></span>
        </div>
        <div class="passport-body_item" v-if="selected_sector.divisible == 1">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.divisible == 1 ? (lang == 'ru' ? 'Да' : lang == 'kz' ? 'Иә' : 'Yes') : (lang == 'ru' ? 'Нет' : lang == 'kz' ? 'Жоқ' : 'No')"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Площадь занимаемого участка' : lang == 'en' ? 'Land area': 'Ауданы'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.area + (lang == 'en' ? ' ha': ' Га')"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Текущий статус' : lang == 'en' ? 'Current status': 'Ағымдағы күй'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['current_status_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Год' : lang == 'en' ? 'Year': 'Жыл'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.project_date"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Продукция' : lang == 'en' ? 'Products': 'Өнімдер'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['products_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Сроки реализации' : lang == 'en' ? 'Implementation period': 'Іске асыру мерзімі'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['time_realization_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Рабочие места' : lang == 'en' ? 'Workplaces': 'Жұмыс орындары'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.plan_jobs"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key"
            v-text="lang == 'ru' ? 'Мощность' : lang == 'en' ? 'Power': 'Қуат'"
          ></span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.power"></span>
        </div>
      </div>



      <!-- Показатели -->
      <div slot="body" v-if="passport_content == 'level_1:sez:numeric'">
        <div class="reference-item"
          @click="
          set_passport_anal_bar_data(item.id),
          set_passport_anal_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en }),
          change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': item.id == passport_anal_bar_data }"
          v-for="item in [{
            id: 'sez_iv',
            title_ru: 'Объем вложенных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Инвестициялар көлемі',
            sum: this.numseparator(investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Өндіріс көлемі',
            sum: this.numseparator(production_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Шетелдік тікелей инвестициялар',
            sum: this.numseparator(foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Жасалған жұмыс орындарының саны',
            sum: this.numseparator(number_jobs_sum),
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'sez_tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Салықтық аударымдардың сомасы',
            sum: this.numseparator(taxes_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_ev',
            title_ru: 'Объем экспорта',
            title_en: 'Export volume',
            title_kz: 'Экспорттың көлемі',
            sum: this.numseparator(exports_volume_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_sfi',
            title_ru: 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом',
            title_en: 'Attracted foreign investments for 1 tenge spent by the budget',
            title_kz: 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды',
            sum: this.numseparator(spent_foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:iz:numeric'">
        <div class="reference-item"
          @click="
            set_passport_anal_bar_data(item.id),
            set_passport_anal_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en }),
            change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': item.id == passport_anal_bar_data }"
          v-for="item in [{
            id: 'iz_iv',
            title_ru: 'Объем вложенных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Инвестициялар көлемі',
            sum: this.numseparator(investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Өндіріс көлемі',
            sum: this.numseparator(production_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Шетелдік тікелей инвестициялар',
            sum: this.numseparator(foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Жасалған жұмыс орындарының саны',
            sum: this.numseparator(number_jobs_sum),
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'iz_tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Салықтық аударымдардың сомасы',
            sum: this.numseparator(taxes_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_ev',
            title_ru: 'Объем экспорта',
            title_en: 'Export volume',
            title_kz: 'Экспорттың көлемі',
            sum: this.numseparator(exports_volume_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_sfi',
            title_ru: 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом',
            title_en: 'Attracted foreign investments for 1 tenge spent by the budget',
            title_kz: 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды',
            sum: this.numseparator(spent_foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:sez:diagramm'">
        <div class="reference-item"
          @click="
          set_passport_anal_data(item.id),
          set_passport_anal_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en }),
          change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': item.id == passport_anal_data }"
          v-for="item in [{
            id: 'sez_bie',
            title_ru: 'Объем затраченных средств из бюджета на инфраструктуру',
            title_en: 'Budget infrastructural expenses',
            title_kz: 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар',
          }, {
            id: 'sez_sqi',
            title_ru: 'Информация по количеству участников',
            title_en: 'Information on the number of participants',
            title_kz: 'Қатысушылардың саны туралы ақпарат',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:iz:diagramm'">
        <div class="reference-item"
          @click="
          set_passport_anal_data(item.id),
          set_passport_anal_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en }),
          change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': item.id == passport_anal_data }"
          v-for="item in [{
            id: 'iz_bie',
            title_ru: 'Объем затраченных средств из бюджета на инфраструктуру',
            title_en: 'Budget infrastructural expenses',
            title_kz: 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар',
          }, {
            id: 'iz_sqi',
            title_ru: 'Информация по количеству участников',
            title_en: 'Information on the number of participants',
            title_kz: 'Қатысушылардың саны туралы ақпарат',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>


      <div slot="body" v-if="passport_content == 'level_2:diagramm'">
        <div class="reference-item"
          @click="
          set_passport_anal_data(item.id),
          set_passport_anal_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en }),
          change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'sez_bie',
            title_ru: 'Объем затраченных средств из бюджета на инфраструктуру',
            title_en: 'Budget infrastructural expenses',
            title_kz: 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар',
          }, {
            id: 'sez_sqi',
            title_ru: 'Информация по количеству участников',
            title_en: 'Information on the number of participants',
            title_kz: 'Қатысушылардың саны туралы ақпарат',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

      <div slot="body" v-if="passport_content == 'level_2:numeric'">
        <div class="reference-item"
          @click="
            set_passport_anal_bar_data(item.id),
            set_passport_anal_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en }),
            change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'iv',
            title_ru: 'Объем вложенных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Инвестициялар көлемі',
            sum: this.numseparator(investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Өндіріс көлемі',
            sum: this.numseparator(production_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Шетелдік тікелей инвестициялар',
            sum: this.numseparator(foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Жасалған жұмыс орындарының саны',
            sum: this.numseparator(number_jobs_sum),
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Салықтық аударымдардың сомасы',
            sum: this.numseparator(taxes_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'ev',
            title_ru: 'Объем экспорта',
            title_en: 'Export volume',
            title_kz: 'Экспорттың көлемі',
            sum: this.numseparator(exports_volume_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sfi',
            title_ru: 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом',
            title_en: 'Attracted foreign investments for 1 tenge spent by the budget',
            title_kz: 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды',
            sum: this.numseparator(spent_foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
      </div>


      <div slot="body" v-if="passport_content == 'level_3:numeric'">
        <div class="reference-item"
          @click="set_passport_anal_bar_data(item.id),
            set_passport_anal_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en }),
            change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'iv',
            title_ru: 'Объем вложенных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Инвестициялар көлемі',
            sum: this.numseparator(investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Өндіріс көлемі',
            sum: this.numseparator(production_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Шетелдік тікелей инвестициялар',
            sum: this.numseparator(foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Жасалған жұмыс орындарының саны',
            sum: this.numseparator(number_jobs_sum),
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Салықтық аударымдардың сомасы',
            sum: this.numseparator(taxes_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'ev',
            title_ru: 'Объем экспорта',
            title_en: 'Export volume',
            title_kz: 'Экспорттың көлемі',
            sum: this.numseparator(exports_volume_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sfi',
            title_ru: 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом',
            title_en: 'Attracted foreign investments for 1 tenge spent by the budget',
            title_kz: 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды',
            sum: this.numseparator(spent_foreign_investments_sum),
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
        <div class="sidebar-project_price">
          <span class="reference-item-sum" v-text="numseparator(selected_sector.project_price) + ' ' + (lang == 'ru' ? ' Тенге\n' : lang == 'kz' ? ' Теңге\n' : ' Tenge\n')"></span>
          <span class="reference-item-title" v-text="lang == 'ru' ? 'Стоимость проекта\n' : lang == 'kz' ? 'Жоба бағасы\n' : 'Project price\n'"></span>
        </div>
      </div>

    </passport>


    <passport_anal
      class="sidebar-passport_analytics"
      v-if="passport_anal && sidebar_expanded"
    />

    <passport_anal_bar
      class="sidebar-passport_analytics"
      v-if="passport_anal_bar && sidebar_expanded"
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
  height: calc(100vh - 235px);
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
  left: 660px;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.sidebar-section--main_content {
}
.sidebar-passport_subtitle {
  color: #0075a7;
  font-weight: normal;
  margin: 15px 0 0 10px;
  font-size: 16px;
}
.sidebar-passport_video {
  width: 92px;
  height: 53px;
  background: #000;
  float: left;
  margin: 5px;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}
.sidebar-passport_photo {
  width: 92px;
  height: 53px;
  background: #aaa;
  float: left;
  margin: 5px;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}
.sidebar-passport_photo img {
  height: 100%;
  width: 100%;
}
.sidebar-passport_video::after {
  content: "";
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  background-size: 100%;
  left: 50%;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  background-image: url("../../assets/images/play.svg");
}
.sidebar-market_wrap {
  padding: 5px;
  overflow: hidden;
}
.sidebar-market_file {
  overflow: hidden;
  cursor: pointer;
  padding: 10px;
}
.sidebar-market_file:hover {
  background: #f1f1f1;
}
.sidebar-market_pdf {
  width: 40px;
  float: left;
  height: 40px;
  background: url("../../assets/images/pdf.png");
}
.sidebar-market_pdf_text {
  padding-top: 8px;
}
.sidebar-passport_video img {
  width: 100%;
  height: 100%;
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
  color: #03a0e3;
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
  background: #50c7f9;
}
.sidebar-item--active .sidebar-item_title {
  color: #fff !important;
  filter: none !important;
}
.sidebar-item--active .sidebar-item_desc {
  color: #fff;
}
.sidebar-item--active:hover {
  background: #50c7f9;
}

.sidebar-project_price {
  padding: 15px;
}
.reference-item--active .reference-item-sum {
  color: #fff;
}
.reference-item--active .reference-item-title {
  color: #fff;
}

.sidebar-link {
  color: black;
  text-decoration: none;
}
.sidebar-link:hover {
  text-decoration: underline;
}

</style>

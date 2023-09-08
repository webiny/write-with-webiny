import en from '../locales/en.json'
import fr from '../locales/fr.json'
import { createI18n } from 'vue-i18n'

const messages = {
  en,
  fr
}

const i18n = createI18n({
  locale: 'en',
  messages
})

export default i18n
